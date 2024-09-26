import React, { useState } from 'react';
import MyNavbar from '../navbar';
import Footer from '../footer';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Notification from '../Notification';

const ReturnOrder = () => {
  const location = useLocation();
  const product = location.state?.filteredProducts ?? {};
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [returnType, setReturnType] = useState("");
  const [returnMethod, setReturnMethod] = useState("mail");
  const [notification, setNotification] = useState(null);
  
  const handleReturnOrder = () => {
    if (!reason || !returnType || !customerInfo.name || !customerInfo.email) {
      setNotification({ message: 'Please fill in all required fields.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    axios.put(
      `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/returnorders/${product.order_id}`,
      {
        data: {
          customer_info: customerInfo,
          return_status: "requested",
          return_reason: reason,
          return_comment: comments,
          return_type: returnType,
          return_method: returnMethod,
          return_refundable_amount: product.price * product.order_quantity,
          return_date: new Date().toISOString().split('T')[0],
          product:product.name,
        }
      }
    )
    .then(() => {
      setNotification({
        message: `Return request submitted successfully.`,
        type: 'success'
      });
      setTimeout(() => {
        setNotification(null);
        navigate("/orders");
      }, 3000);
    })
    .catch(() => {
      setNotification({ message: 'Failed to submit return request.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    });
  };

  return (
    <div className='fullscreen'>
      <MyNavbar />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      
      <main className='container mt-4'>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="mt-4 mb-3 text-center">Return Request</h3>

            {/* Customer Information */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Customer Information</h5>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={customerInfo.name} 
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={customerInfo.email} 
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phone" 
                    value={customerInfo.phone} 
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Order and Product Information */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Order Information</h5>
                <p><strong>Order Number:</strong> {product.order_id}</p>
                <p><strong>Order Date:</strong> {product.ordered_date}</p>
                <h5 className="card-title">Item Details</h5>
                <p><strong>Product Name:</strong> {product.name}</p>
                <p><strong>Quantity:</strong> {product.order_quantity}</p>
              </div>
            </div>

            {/* Reason for Return */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Reason for Return</h5>
                <form className="mb-3">
                  {[
                    "Wrong item received",
                    "Damaged or defective item",
                    "Item not as described",
                    "Ordered by mistake",
                    "Size or fit issue",
                    "Other"
                  ].map((option, index) => (
                    <div key={index} className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="returnReason" 
                        value={option} 
                        onChange={(e) => setReason(e.target.value)} 
                        required 
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </form>
                <textarea 
                  className="form-control" 
                  placeholder="Additional details (optional)" 
                  rows="3" 
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>

            {/* Return Type */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Return Type</h5>
                <select 
                  className="form-select mb-3" 
                  onChange={(e) => setReturnType(e.target.value)} 
                  required
                >
                  <option value="" disabled selected>Select Return Type</option>
                  <option value="refund">Refund</option>
                  <option value="exchange">Exchange</option>
                  <option value="store-credit">Store Credit</option>
                </select>
              </div>
            </div>

            {/* Return Method */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Return Method</h5>
                <select 
                  className="form-select mb-3" 
                  onChange={(e) => setReturnMethod(e.target.value)} 
                  required
                >
                  <option value="mail">Return by Mail</option>
                  <option value="store">Return In-Store</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="btn btn-primary w-100" 
              type="button" 
              onClick={handleReturnOrder}
            >
              Submit Return Request
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnOrder;
