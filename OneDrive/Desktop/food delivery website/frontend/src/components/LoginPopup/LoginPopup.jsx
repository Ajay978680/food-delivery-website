import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");  
    setLoading(true);  

    // ✅ Check if passwords match before sending request
    if (currState === "Sign Up" && data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    let newUrl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setErrorMessage(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleState = () => {
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
    setData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrorMessage("");
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          
          {/* ✅ Show Confirm Password only for Sign Up */}
          {currState === 'Sign Up' && (
            <input name='confirmPassword' onChange={onChangeHandler} value={data.confirmPassword} type="password" placeholder='Confirm Password' required />
          )}
        </div>

        {/* 🔹 Show error message if passwords don’t match */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type='submit' disabled={loading}>
          {loading ? "Processing..." : currState === 'Login' ? 'Login' : 'Create account'}
        </button>

        <div className="login-popup-condition">
          <label>
            <input type='checkbox' required />
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>

        {currState === 'Login'
          ? <p>Create a new account? <span onClick={toggleState}>Click here</span></p>
          : <p>Already have an account? <span onClick={toggleState}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
