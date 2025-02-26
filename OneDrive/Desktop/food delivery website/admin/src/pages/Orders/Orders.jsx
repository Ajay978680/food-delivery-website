import React, { useState, useEffect } from 'react';
import './Orders.css';
import { assets } from '../../../../frontend/src/assets/assets';

const Orders = () => {
  // Load order statuses from localStorage or set default values
  const [orderStatus, setOrderStatus] = useState(() => {
    const savedStatus = localStorage.getItem('orderStatus');
    return savedStatus ? JSON.parse(savedStatus) : {
      john: 'Food Processing',
      ajay: 'Food Processing',
    };
  });

  // Function to handle status change
  const handleStatusChange = (name, status) => {
    const updatedStatus = { ...orderStatus, [name]: status };
    setOrderStatus(updatedStatus);
    localStorage.setItem('orderStatus', JSON.stringify(updatedStatus)); // Save to localStorage
  };

  return (
    <div className='order-container'>
      <h3>Order Dashboard</h3>
      <table className='order-table'>
        <tbody>
          <tr>
            <th></th>
            <th>Items</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>No of Items</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
          <tr>
            <td><img src={assets.parcel_icon} alt="Parcel Icon" className='parcel-icon' /></td>
            <td>
              <p>Veg Salad x 2, Sliced Cake x 4, Clover Salad x 1, Lasagna Rolls x 2, Peri Peri Rolls x 2</p>
            </td>
            <td>John</td>
            <td>13, San Antino, Texas, USA, 78015</td>
            <td>+33445566</td>
            <td>13</td>
            <td><p>$244</p></td>
            <td>
              <select 
                className='options' 
                value={orderStatus.john} 
                onChange={(e) => handleStatusChange('john', e.target.value)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>
          </tr>
          <tr>
            <td><img src={assets.parcel_icon} alt="Parcel Icon" className='parcel-icon' /></td>
            <td>
              <p>Greek Salad x 3, Veg Salad x 2</p>
            </td>
            <td>Ajay Kanna</td>
            <td>1/445, Tirupur, Tamil Nadu, India, 641168</td>
            <td>9576846853</td>
            <td>5</td>
            <td><p>$74</p></td>
            <td>
              <select 
                className='options' 
                value={orderStatus.ajay} 
                onChange={(e) => handleStatusChange('ajay', e.target.value)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
