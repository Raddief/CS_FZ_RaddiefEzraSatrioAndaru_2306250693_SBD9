import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaShoppingCart, FaSearch, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import './App.css';
import backgroundImage from './assets/anby0.png';

const API_URL = import.meta.env.VITE_API_URL || 'https://sbd-express-raddiefezrasatrioandaru.c2b1zt.easypanel.host';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, formData);
      if (response.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(response.data.payload));
        navigate('/products');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="min-h-screen flex p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex-grow"></div>
      
      <div
        className="bg-white rounded-md w-full max-w-sm p-8 drop-shadow-lg flex flex-col justify-center"
        style={{ 
          fontFamily: "'Poppins', sans-serif",
          marginRight: '10%'
        }}
      >
        <h2 className="text-center text-2xl font-semibold mb-8">Welcome Back!</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-normal text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                <FaUser />
              </span>
              <input
                id="email"
                type="email"
                placeholder="test123@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-8 border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm text-gray-400 placeholder-gray-400"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-normal text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                <FaLock />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Type your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-8 border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm text-gray-400 placeholder-gray-400"
                required
              />
            </div>
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-700 transition"
              >
                Forget password? <span className="font-semibold">Click here</span>
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Login Now
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <span 
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Create a new account
          </span>
        </div>
      </div>
    </div>
  );
};

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryString = new URLSearchParams(formData).toString();
      const response = await axios.post(`${API_URL}/user/register?${queryString}`);
      if (response.status === 201) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex-grow"></div>
      
      <div
        className="bg-white rounded-md w-full max-w-sm p-8 drop-shadow-lg flex flex-col justify-center"
        style={{ 
          fontFamily: "'Poppins', sans-serif",
          marginRight: '10%'
        }}
      >
        <h2 className="text-center text-2xl font-semibold mb-8">Create Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-normal text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                <FaUser />
              </span>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-8 border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm text-gray-400 placeholder-gray-400"
                required
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-normal text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-8 border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm text-gray-400 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-normal text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                <FaLock />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-8 border-b border-gray-300 focus:outline-none focus:border-gray-400 text-sm text-gray-400 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span 
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

const Products = ({ setIsLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/item`);
      setProducts(response.data.payload || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">RaddiefEzraSatrioAndaruShop</div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <FaShoppingCart className="text-2xl text-gray-600 cursor-pointer" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={product.image_url || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-1">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user') !== null;
  });

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/products" /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/register" 
          element={isLoggedIn ? <Navigate to="/products" /> : <Register setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/products" 
          element={isLoggedIn ? <Products setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isLoggedIn ? "/products" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;