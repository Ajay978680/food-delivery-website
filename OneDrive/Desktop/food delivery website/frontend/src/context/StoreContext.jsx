import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list,setFoodList] = useState ([])

    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async(itemId) => {
        setCartItems(prev => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });
        if(token)
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find(product => product._id === itemId);
            return item ? total + item.price * cartItems[itemId] : total;
        }, 0);
    };

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+'/api/food/list')
        setFoodList(response.data.data)
    }

    const loadCartData = async (token)=>{
            const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
            setCartItems(response.data.cartData); 
    }

    useEffect (()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token"))
            {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])


    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
