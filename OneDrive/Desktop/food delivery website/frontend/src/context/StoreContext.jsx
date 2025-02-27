import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [username, setUsername] = useState("");

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    };
    
    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });
        if (token)
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find(product => product._id === itemId);
            return item ? total + item.price * cartItems[itemId] : total;
        }, 0);
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    // New function to add order and initiate Razorpay payment
    const addOrder = async () => {
        if (cartItems && Object.keys(cartItems).length > 0) {
            try {
                const order = {
                    items: cartItems,
                    totalAmount: getTotalCartAmount(),
                    userToken: token
                };
                const response = await axios.post(url + '/api/order/add', order, { headers: { token } });
                setOrders(prevOrders => [...prevOrders, response.data.order]);
                setCartItems({}); // Clear cart after order is placed

                // Initialize Razorpay payment after order creation
                const options = {
                    key: 'rzp_test_XaKxMIz6dgyedW',  // Replace with your Razorpay key_id
                    amount: response.data.order.totalAmount * 100,  // Convert to paise
                    currency: 'INR',
                    name: 'Your Company Name',
                    description: 'Payment for Order',
                    order_id: response.data.order.razorpayOrderId,  // Assuming order response includes razorpayOrderId
                    handler: function (paymentResponse) {
                        alert('Payment successful! Payment ID: ' + paymentResponse.razorpay_payment_id);
                        // Optionally handle payment success here (e.g., update order status)
                    },
                    prefill: {
                        name: username,
                        email: 'customer@example.com',
                        contact: '9876543210'
                    },
                    notes: {
                        address: 'Address for order'
                    },
                };

                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } catch (error) {
                console.error("Failed to place order:", error);
            }
        }
    };

    const clearCart = () => {
        setCartItems({}); // Reset the cart
    };
    

    const fetchOrders = async () => {
        if (token) {
            try {
                const response = await axios.get(url + '/api/order/list', { headers: { token } });
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await fetchOrders(); // Load orders when token is available
            }
        }
        loadData();
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        addOrder,
        orders,
        username,
        clearCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
