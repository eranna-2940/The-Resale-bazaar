import React, { useState } from 'react';
import MyNavbar from './navbar';
import Footer from './footer';
import Scrolltotopbtn from './Scrolltotopbutton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';
import { useCart } from './CartContext';

const Plans = () => {
    const {isLoggedIn}=useCart()
      const [values,setValues]= useState({
        name:"",
        email:"",
        enquiry:""
      })
        const [notification, setNotification] = useState(null);
      
      const handleChange=(e)=>{
        const {name,value}=e.target;
        setValues({
         ...values,
         [name]:value
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
         axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/largeinventorycontact`,values)
         .then((res)=>{
            if(res.data !== "FAIL" && res.data !== "ERROR"){
                setNotification('data subbmitted successfully')
                setTimeout(() => {
                    setNotification(null);
                    window.location.reload(false);
                   },3000);
            }else {
                setNotification("data failed. Please try after sometime");
                setTimeout(() => setNotification(null), 3000);
              }
         })
         .catch((err) => console.log(err));

      }

      const navigate = useNavigate();

      const handleOptedFreeListing = () => {
        const data = {optedFreelisting : "true"};
        navigate("/register",{state:data});
      }

    return (
        <div className="fullscreen">
            <MyNavbar />
                  {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            
            <main>
                <div className="container mt-5 mb-5">
                    <div className="text-center mb-5">
                        <h5 className="my-3 fs-3">How It Works</h5>
                        <p className="">Turn Your Clothes into Cash in 4 Easy Steps</p>
                    </div>
                    <div className="d-flex flex-wrap">
                        {/* Step 1: Create an account */}
                        <div className="col-12 col-sm-6 col-md-3 text-center mb-4 position-relative">
                            <div className="how-step">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/6210/6210134.png"
                                    alt="Create account pic"
                                    className="img-fluid"
                                    width="130"
                                />
                                <h5 className="">Create an account</h5>
                                <p className='p-2'>
                                    Create your account-it only takes a minute! This is your first step to start selling.
                                </p>
                                <div className="arrow-icon"></div>
                            </div>
                        </div>

                        {/* Step 2: Upload  */}
                        <div className="col-12 col-sm-6 col-md-3 text-center mb-4 position-relative">
                            <div className="how-step">
                                <img
                                    src="https://png.pngtree.com/png-vector/20250113/ourmid/pngtree-a-cloud-with-an-arrow-pointing-up-surrounded-by-multiple-arrows-png-image_15174944.png"
                                    alt="Upload pic"
                                    className="img-fluid"
                                    width="130"
                                />
                                <h5 className="">Upload</h5>
                                <p className='p-2'>
                                    Take clear photos of your clothes, set a price, and upload them to your dashboard. Once uploaded, they’ll appear on our listings page.
                                </p>
                                <div className="arrow-icon1"></div>
                            </div>
                        </div>

                        {/* Step 3: Sell and Rent  */}
                        <div className="col-12 col-sm-6 col-md-3 text-center mb-4 position-relative">
                            <div className="how-step">
                                <img
                                    src="https://cdni.iconscout.com/illustration/premium/thumb/man-selling-cloth-online-illustration-download-in-svg-png-gif-file-formats--work-from-home-clothes-marketplace-seller-e-commerce-pack-shopping-illustrations-5034549.png?f=webp"
                                    alt="Selling cloths pic"
                                    className="img-fluid"
                                    width="130"
                                />
                                <h5 className="">Sell your clothes</h5>
                                <p className='p-2'>
                                    Buyers will see your items and can either message you for details or add them to their cart to make a purchase.
                                </p>
                                <div className="arrow-icon2"></div>
                            </div>
                        </div>

                        {/* Step 4: Payment & Delivery  */}
                        <div className="col-12 col-sm-6 col-md-3 text-center mb-4 position-relative">
                            <div className="how-step">
                                <img
                                    src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-design-of-a-flat-colored-cash-on-delivery-icon-vector-picture-image_10969826.png"
                                    alt="Payment & delivery pic"
                                    className="img-fluid"
                                    width="130"
                                />
                                <h5 className="">Payment & Delivery</h5>
                                <p className='p-2'>
                                    Once a buyer completes the payment, you’ll get a notification to ship the item. Payments are processed securely, so you can sell with confidence.
                                </p>
                                <div className="arrow-icon3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-5">
                    <p className="fs-4" style={{ fontFamily: 'cursive' }}><i>Plans</i></p>
                    <h5 className="my-3 fs-3">Subscription types</h5>

                </div>
                <div className=" container product-card-container mb-5">
                    <div className="d-flex flex-wrap gap-5 justify-content-center">

                        {/* Product Card 1 */}
                        <div className="">
                            <div className="card box-shadow " style={{ width: '20rem' }}>
                                <img
                                    // src="https://sb.kaleidousercontent.com/67418/1279x853/125bd90df6/pexels-karolina-grabowska-5632402.jpg"
                                    src="https://img.freepik.com/premium-photo/shopping-cart-computer-mouse-blue-background_220873-15256.jpg?semt=ais_hybrid"
                                    className="card-img-top"
                                    alt="Product 1"
                                />
                                <div className="card-body" style={{ minHeight: "200px" }}>
                                    <h5 className="card-title">BASIC PLAN</h5>
                                    <ul style={{ lineHeight: "28px" }}>
                                        <li>Post up to 20 listings for free</li>
                                        <li>12% commission taken on items that sell</li>
                                        <li>Direct online payment portals</li>
                                    </ul>
                                </div>
                                <div className='card-footer p-3 d-flex justify-content-center'>
                                    { isLoggedIn ?(
                                         <div className="text-center">
                                    <button style={{ backgroundColor: "#aed6f1 " }} className='btn'>ACTIVE</button>
                                    </div>
                                 ):(
<button style={{ backgroundColor: "#aed6f1 " }} className='btn ' onClick={handleOptedFreeListing}>REGISTER NOW</button>                                 )}
                                    </div>
                                <div className='planprice'>
                                    <h1 className=''>$0.00<span style={{ fontSize: "10px" }}>/20 LISTINGS</span></h1>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,90.7C672,64,768,64,864,85.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>

                                <i className="fa fa-disease"></i>

                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="">
                            <div className="card box-shadow" style={{ width: '20rem' }}>
                                <img

                                    // src="https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-online-shopping-in-haiti-a-mesmerizing-3d-rendering-for-social-media-image_3679717.jpg"
                                    src="https://png.pngtree.com/thumb_back/fh260/background/20230617/pngtree-visualizing-e-commerce-in-argentina-through-3d-rendering-for-social-media-image_3641110.jpg"
                                    className="card-img-top"
                                    alt="Product 2"
                                />
                                <div className="card-body" style={{ minHeight: "200px" }}>
                                    <h5 className="card-title">LARGE INVENTORY</h5>
                                    <ul style={{ lineHeight: "28px" }}>
                                        <li>Set up your own store on our platform!</li>
                                    </ul>


                                </div>
                                <div className='card-footer p-3 d-flex justify-content-center'>
                                    <button style={{ backgroundColor: "#fadbd8" }} className='btn' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">CONTACT US FOR MORE DETAILS</button>
                                </div>
                                <div className='planprice'>
                                    <p className=''>Sell Your Desi Wear & Accessories <br />
                                        Have a large inventory? Set up your store on our platform today!
                                    </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                    <path fill="#ffffff" fillOpacity="1" d="M0,64L48,53.3C96,43,192,21,288,58.7C384,96,480,192,576,218.7C672,245,768,203,864,154.7C960,107,1056,53,1152,32C1248,11,1344,21,1392,26.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>

                                <i className="fa fa-disease"></i>

                            </div>
                        </div>

                    </div>

                </div>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Contact Us</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>

      <div className="modal-body">
        <div className="d-md-flex col-md-12 col-xs-12 mt-3 mb-3">
              <label htmlFor="name" className="col-md-3">
                <b>Your Name</b>
              </label>
              <div className="d-flex col-md-7">
                <input
                  type="text"
                  className="col-md-5 form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  required
                ></input>
                &nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
            <div className="d-md-flex col-md-12 col-xs-12 mt-3 mb-3">
              <label htmlFor="email" className="col-md-3">
                <b>Your Email</b>
              </label>
              <div className="d-flex col-md-7">
                <input
                  type="email"
                  className="form-control col-md-5"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  onChange={handleChange}
                  required
                ></input>
                &nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
            <div className="d-md-flex col-md-12 col-xs-12 mt-3 mb-3">
              <label htmlFor="enquiry" className="col-md-3">
                <b>Your Query</b>
              </label>
              <div className="d-flex col-md-7">
                <textarea
                  id="enquiry"
                  className="col-md-5 form-control"
                  name="enquiry"
                  rows="5"
                  cols="40"
                  placeholder="Enter Your Enquiry"
                  onChange={handleChange}
                  required
                ></textarea>
                &nbsp;<span className="text-danger fs-4">*</span>
              </div>
            </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
      </form>

    </div>
  </div>
</div>
            </main>
            <Footer />
            <Scrolltotopbtn />
        </div>
    );
}

export default Plans;
