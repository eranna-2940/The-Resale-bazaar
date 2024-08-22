import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import MyNavbar from '../navbar';
import Footer from '../footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import TotalReviews from './TotalReviews';
import Product from "../Product";

const SellerProfile = () => {
  const { sellerId } = useParams();
   const location = useLocation();
  const userdetails = location.state.userdetails
  const [sellerDetails, setSellerDetails] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    user_id: sellerId,
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const { name, email, phone, comment } = formData;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      alert("Please fill out all required fields");
      return;
    }

    axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/contactseller`, {
      name,
      email,
      phone,
      comment,
      user_id: sellerId
    })
    .then(res => {
      alert('Data added successfully')
      setFormData({ name: '', email: '', phone: '', comment: '' });
    }).catch(err => {
      console.error('Error posting data:', err);
    });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`)
      .then(res => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const user = res.data.find(item => item.user_id.toString() === sellerId);
          if (user) {
            setSellerDetails({
              userId: user.user_id,
              email: user.email,
              phone: user.phone,
              name: `${user.firstname} ${user.lastname}`,
            });
          }
        }
      })
      .catch(err => console.log(err));

      axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/allproducts`)
      .then(res => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const products = res.data.filter(product => product.seller_id.toString() === sellerId);
          setAllProducts(products);
          const selling = products.filter(product => product.quantity > 0)
          setSellingProducts(selling);
          const sold = products.filter(product => product.quantity === 0)
          setSoldProducts(sold);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);

      });
  }, [sellerId]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/getproducts`)
      .then(res => {
        if (res.data !== "Fail" && res.data !== "Error") {
          console.log(res.data)
          const products = res.data.filter(product => product.like_user_id.toString()=== sellerId);
          console.log(products)
          setLikedProducts(products);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [sellerId]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/getsaveproducts`)
      .then(res => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const products = res.data.filter(product => product.user_id.toString() === sellerId);
          console.log(products)
          setSavedProducts(products);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [sellerId]);
  const renderProducts = (products) => {
    return (
      <div className="d-flex flex-wrap justify-content-center ms-md-5 me-md-5 mb-4 mt-md-3 mt-3 ms-2 me-2">
    
         <div className="product-grid container">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <Product product={product} key={index} admin="women" />
                  ))
                ) : (
                  <h2 style={{ fontSize: "18px" }}>No products to display</h2>
                )}
              </div>
      </div>
    );
  };

  return (
    <>
      <MyNavbar/>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="seller-profile-header border">
              <div className='m-5'>
                <h2 className="seller-name fs-1">
                <i className="bi bi-person-circle fs-1"></i>&nbsp;{sellerDetails.shopname==null||undefined||''?sellerDetails.name:sellerDetails.shopname}
                </h2>
                <p className='ms-5'><TotalReviews userDetails={userdetails} /></p> 

                <button className="btn btn-primary ms-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} id="all-tab" data-bs-toggle="tab" role="tab" onClick={() => setActiveTab('all')}>All</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'selling' ? 'active' : ''}`} id="selling-tab" data-bs-toggle="tab" role="tab" onClick={() => setActiveTab('selling')}>Selling</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'sold' ? 'active' : ''}`} id="sold-tab" data-bs-toggle="tab" role="tab" onClick={() => setActiveTab('sold')}>Sold</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'likes' ? 'active' : ''}`} id="likes-tab" data-bs-toggle="tab" role="tab" onClick={() => setActiveTab('likes')}>Likes</button>
          </li>
          {isLoggedIn ?(
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'saved' ? 'active' : ''}`} id="saved-tab" data-bs-toggle="tab" role="tab" onClick={() => setActiveTab('saved')}>Saved</button>
          </li>
             ):null}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className={`tab-pane fade ${activeTab === 'all' ? 'show active' : ''}`} id="all" role="tabpanel">
            {loading ? <p>Loading...</p> : renderProducts(allProducts)}
          </div>
          <div className={`tab-pane fade ${activeTab === 'selling' ? 'show active' : ''}`} id="selling" role="tabpanel">
            {loading ? <p>Loading...</p> : renderProducts(sellingProducts)}
          </div>
          <div className={`tab-pane fade ${activeTab === 'sold' ? 'show active' : ''}`} id="sold" role="tabpanel">
            {loading ? <p>Loading...</p> : renderProducts(soldProducts)}
          </div>
          <div className={`tab-pane fade ${activeTab === 'likes' ? 'show active' : ''}`} id="likes" role="tabpanel">
            {loading ? <p>Loading...</p> : renderProducts(likedProducts)}
          </div>
         
            <div className={`tab-pane fade ${activeTab === 'saved' ? 'show active' : ''}`} id="saved" role="tabpanel">
            {loading ? <p>Loading...</p> : renderProducts(savedProducts)}
          </div>
       
          
        </div>
      </div>

      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Comment</label>
                  <textarea type="text" className="form-control" id="comment" value={comment} onChange={handleInputChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default SellerProfile;
