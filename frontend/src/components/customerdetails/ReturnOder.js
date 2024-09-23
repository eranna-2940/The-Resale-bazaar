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
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [notification, setNotification] = useState(null);

  const handleReturnOrder = () => {
    if (!reason) {
      setNotification({ message: 'Please select a reason for return.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Update the order to reflect return request
    axios.put(
      `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/returnorders/${product.order_id}`,
      {
        data: {
          return_status: "requested",
          return_reason: reason,
          return_comment: comments,
          return_refundable_amount: product.price * product.order_quantity,
          return_date: new Date().toISOString().split('T')[0]  // Current date
        }
      }
    )
    .then(() => {
      setNotification({ message: `Return request submitted successfully. Refund amount ${product.price * product.order_quantity} will be processed upon approval.`, type: 'success' });
      setTimeout(() => {
        setNotification(null);
        navigate("/orders");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error submitting return request:", error);
      setNotification({ message: 'Failed to submit return request.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    });
  };

  return (
    <div className='fullscreen'>
      <MyNavbar />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      
      <main className='container mt-4'>
        <h6 className='mt-3 mb-3'>Request Return</h6>
        <div className='d-md-flex justify-content-between bg-light p-2 p-md-4 border'>
          <div>
            <img src={product.image ? JSON.parse(product.image)[0] : 'defaultImagePath'} alt={product.name} width="100" height="100" />
          </div>
          <div>
            <p><b>Name:</b> {product.name}</p>
            <p><b>QTY:</b> {product.order_quantity}</p>
          </div>
          <div>
            <p><b>Color:</b> {product.color}</p>
          </div>
          <div>
            <p><b>Price:</b> ${product.price * product.order_quantity}</p>
          </div>
        </div>

        <h6 className='mt-3 mb-3'>Reason for Return</h6>
        <form className='bg-light p-2 p-md-4 border mb-4' style={{ lineHeight: "35px" }}>
          {[
            { id: "damaged-product", label: "Product is damaged or defective" },
            { id: "wrong-product", label: "Received wrong product" },
            { id: "no-longer-needed", label: "No longer needed" },
            { id: "better-option", label: "Found a better product elsewhere" }
          ].map(({ id, label }) => (
            <div key={id}>
              <input 
                type="radio" 
                name="return" 
                id={id} 
                value={id} 
                style={{ width: "18px", height: "18px" }} 
                onChange={(e) => setReason(e.target.value)} 
              />&nbsp;
              <label htmlFor={id}>{label}</label><br />
            </div>
          ))}

          <textarea 
            className='form-control mt-3' 
            placeholder='Comments (optional)' 
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>

          <button 
            className='btn btn-warning mt-3 mb-3' 
            type="button" 
            onClick={handleReturnOrder}
          >
            Submit Return Request
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnOrder;
