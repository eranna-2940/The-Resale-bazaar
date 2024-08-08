// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
// import MyNavbar from "./navbar";
// import Footer from "./footer";
// import axios from "axios";
// import { useCart } from "./CartContext";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Reviews from "./Reviews";
// import TotalReviews from "./sellerdashboard/TotalReviews";
// // import { escape } from "../../../Backend/db";
// import Notification from "./Notification";

// const responsive = {
//   extraLargeDesktop: {
//     breakpoint: { min: 1601, max: 2000 },
//     items: 3,
//   },
//   superLargeDesktop: {
//     breakpoint: { max: 1600, min: 1201 },
//     items: 3,
//   },
//   desktop: {
//     breakpoint: { max: 1200, min: 992 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 991, min: 768 },
//     items: 3,
//   },
//   mobile: {
//     breakpoint: { max: 767, min: 0 },
//     items: 2,
//   },
// };

// export default function Productdetails() {
//   const [add, setAdd] = useState("0.00");
//   const [success, setSuccess] = useState(false);

//   const { id } = useParams();
//   const location = useLocation();
//   const { productdetails, admin } = location.state || {};
//   productdetails.userid = sessionStorage.getItem("user-token");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   if (productdetails) {
//     productdetails.userid = sessionStorage.getItem("user-token");
//   }

//   useEffect(() => {
//     if (sessionStorage.getItem("token") !== "admin") {
//       sessionStorage.getItem("user-token") !== null && setIsLoggedIn(true);
//     }
//   }, []);

//   const AmountChange = (e) => {
//     setAdd(e);
//   };
//   const handleChange = (e) => {
//     setAdd(e.target.value); // Update input value on manual input change
//   };

//   // eslint-disable-next-line no-unused-vars
//   // const [values, setValues] = useState({
//   //   accepted_by_admin: "true",
//   //   id: id,
//   // });

//   const handleProductlist = () => {
//     axios
//       .post(
//         `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminaccepted`,
//         { accepted_by_admin: "true", id }
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     alert("Product added to the store successfully");
//     window.location.href = "/Resale-bazaar/acceptproduct";
//   };

//   const { addToCart, addToWishlist, cartItems, wishItems } = useCart();

//   // const handleAddToCart = () => {
//   //   if (cartItems.length > 0) {
//   //     var unique_item = true;
//   //     cartItems.map((item) => {
//   //       if (item.id === productdetails.id) {
//   //         alert("Product already exists in the cart");
//   //         unique_item = false;
//   //         //eslint-disable-next-line array-callback-return
//   //         return;
//   //       }
//   //       return null;
//   //     });
//   //     unique_item && addToCart(productdetails,"main");
//   //   } else {
//   //     addToCart(productdetails,"main");
//   //   }
//   // };

//   // const handleAddToCart = () => {
//   //   const isProductInCart = cartItems.some(
//   //     (item) => item.product_id === productdetails.id
//   //   );
//   //   if (isProductInCart) {
//   //     alert("Product already exists in the cart");
//   //   } else if (isLoggedIn) {
//   //     addToCart(productdetails, "main");
//   //   } else {
//   //     navigate("/login");
//   //   }
//   // };
//   const handleAddToCart = () => {
//     if (isLoggedIn) {
//       if (cartItems.length > 0) {
//         var unique_item = true;
//         cartItems.map((item) => {
//           if (item.product_id === productdetails.id) {
//             setNotification({
//               message: "Product already exists in the cart",
//               type: "error",
//             });
//             setTimeout(() => setNotification(null), 3000);
//             unique_item = false;
//             //eslint-disable-next-line array-callback-return
//             return;
//           }
//           return null;
//         });
//         unique_item && addToCart(productdetails, "main");
//       } else {
//         addToCart(productdetails, "main");
//       }
//     } else {
//       let cartItems =
//         JSON.parse(sessionStorage.getItem("guest_products")) || [];
//       const isProductInCart = cartItems.some(
//         (item) => item.id === productdetails.id
//       );

//       if (isProductInCart) {
//         setNotificatioin({
//           message: "Product already exists in the cart",
//           type: "error",
//         });
//         setTimeout(() => setNotification(null), 3000);
//       } else {
//         cartItems.push({ ...productdetails, quantity: 1 });
//         sessionStorage.setItem("guest_products", JSON.stringify(cartItems));
//         window.location.reload(false);
//       }
//     }
//   };
//   const handleAddToWishlist = () => {
//     const isProductInWishlist = wishItems.some(
//       (item) => item.product_id === productdetails.id
//     );
//     if (isProductInWishlist) {
//       alert("Product already exists in the wishlist");
//       return; // Exit the function early
//     } else if (isLoggedIn) {
//       addToWishlist(productdetails);
//     } else {
//       navigate("/login");
//     }
//   };

//   const productDetailsImgRef = useRef();

//   const activeSubimageRef = useRef();
//   const carouselRef = useRef();
//   // eslint-disable-next-line no-unused-vars
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const updateProductDetailsImg = (newSrc, index) => {
//     productDetailsImgRef.current.src = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${newSrc}`;

//     if (activeSubimageRef.current) {
//       activeSubimageRef.current.style.border = "1px solid grey";
//     }

//     const newActiveSubimage = document.getElementById(`subimage-${index}`);
//     if (newActiveSubimage) {
//       newActiveSubimage.style.border = "3px solid green";

//       activeSubimageRef.current = newActiveSubimage;
//     }
//     setCurrentSlide(index);
//   };

//   const handleProductReject = () => {
//     const rejectReason = prompt("Enter Product Reject Reason");
//     if (rejectReason !== null && rejectReason !== "") {
//       console.log("Reason for rejection:", rejectReason);
//       axios
//         .post(
//           `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminrejection`,
//           { rejectReason, id }
//         )
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       window.location.href = "/Resale-bazaar/acceptproduct";
//     } else {
//       console.log("User canceled the prompt.");
//     }
//   };
//   const datta = JSON.parse(productdetails.image);
//   const firstImage = datta[0];

//   const handleOffer = () => {
//     setSuccess(true);
//     axios
//       .post(
//         `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/offeredproducts`,
//         {
//           product_id: id,
//           offered_buyer_id: sessionStorage.getItem("user-token"),
//           offered_price: add,
//           product_status: "Pending",
//         }
//       )
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => console.log(err));
//   };

//   const [userdetails, setUserDetails] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`)
//       .then((res) => {
//         if (res.data !== "Fail" && res.data !== "Error") {
//           // Filter user details where user_id === productdetails.seller_id
//           const filteredUserDetails = res.data.filter(
//             (item) => item.user_id === productdetails.seller_id
//           );
//           // Map filtered details to desired structure
//           const userDetails = filteredUserDetails.map((item) => ({
//             userId: item.user_id,
//             email: item.email,
//             phone: item.phone,
//             name: item.firstname + " " + item.lastname,
//             // Add more fields as needed
//           }));
//           // Set filtered user details to state
//           setUserDetails(userDetails);
//         }
//       })
//       .catch((err) => console.log(err));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [productdetails.seller_id]);
//   const navigates = useNavigate();
//   const handleViewProfile = (sellerId,userdetails) => {
//     console.log(sellerId);
//     // Navigate to seller profile page with sellerId as a parameter
//     navigates(`/sellerprofile/${sellerId}` ,{ state: { userdetails } });  };
 
//   useEffect(() => {
//     const fetchLikeCount = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productdetails.id}/likes`);
//         setLikeCount(response.data.likeCount);
//       } catch (error) {
//         console.error('Error fetching like count:', error);
//       }
//     };
  
//     fetchLikeCount();
//   }, [productdetails.id]);
  
//   const [liked, setLiked] = useState(productdetails.likes);
//   const [likeCount, setLikeCount] = useState(productdetails.likes);
//   // const toggleLike = async (productId, sellerId) => {
//   //   if (!isLoggedIn) {
//   //     navigate('/login');
//   //     return;
//   //   }
  
//   //   if (sellerId.toString() === sessionStorage.getItem('user-token')) {
//   //     alert('You cannot like/dislike your own product.');
//   //     return;
//   //   }
  
//   //   try {
//   //     const currentUserToken = sessionStorage.getItem('user-token');
//   //     const checkLikeUrl = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/likes/check`;
//   //     const checkResponse = await axios.post(checkLikeUrl, { userId: currentUserToken, productId });
  
//   //     let newLikeCount;
//   //     let liked = checkResponse.data.liked;
  
//   //     if (liked) {
//   //       newLikeCount = likeCount - 1;
//   //     } else {
//   //       newLikeCount = likeCount + 1;
//   //     }
  
//   //     const url = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/likes`;
  
//   //     await axios.post(url, {
//   //       productId: productId,
//   //       userId: currentUserToken
//   //     });
  
//   //     setLiked(!liked);
//   //     setLikeCount(newLikeCount);
//   //   } catch (error) {
//   //     console.error('Error updating like count:', error);
//   //   }
//   // };
  
//   const toggleLike = async (productId, sellerId) => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }
  
//     if (sellerId.toString() === sessionStorage.getItem('user-token')) {
//       alert('You cannot like/dislike your own product.');
//       return;
//     }
  
//     try {
//       const currentUserToken = sessionStorage.getItem('user-token');
//       const checkLikeUrl = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/likes/check`;
//       const checkResponse = await axios.post(checkLikeUrl, { userId: currentUserToken, productId });
  
//       let newLikeCount;
//       let liked = checkResponse.data.liked;
  
//       if (liked) {
//         newLikeCount = likeCount - 1;
//       } else {
//         newLikeCount = likeCount + 1;
//       }
  
//       const url = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/likes`;
  
//       await axios.post(url, {
//         productId: productId,
//         userId: currentUserToken
//       });
  
//       setLiked(!liked);
//       setLikeCount(newLikeCount);
  
//       if (!liked) {
//         const redirectToFacebook = window.confirm('Would you like to post in Facebook');
//         if (redirectToFacebook) {
//           window.location.href = 'https://www.facebook.com/login';
//           return;
//         }
//       }
  
//     } catch (error) {
//       console.error('Error updating like count:', error);
//     }
//   };

//   // const [saved, setSaved] = useState(productdetails.saved);
//   // const [savedCount, setSavedCount] = useState(productdetails.saves);

//   // const handleSave = async (productId,sellerId)=>{
//   //   if(!isLoggedIn){
//   //      navigate('/login')
//   //      return;

//   //   }
//   //   if(sellerId.toString() === sessionStorage.getItem('user-token')){
//   //      alert('Your are Owner of this product cannot save')
//   //      return;
//   //   }

//   //   try {

//   //      const currentSavedToken = sessionStorage.getItem('user-token');
//   //      const checkSaveUrl = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saves/check`;
//   //      const checkResponse = await axios.post(checkSaveUrl,{productId,currentSavedToken})
//   //      let isCurrentlySaved = checkResponse.data.saved
//   //      let newSaveCount = savedCount;

//   //      if(isCurrentlySaved){
//   //       newSaveCount  -= 1;
//   //      }else{
//   //       newSaveCount +=1;
//   //      }

//   //      const url = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saves`;
          
//   //      await axios.post(url,{
//   //       productId:productId,
//   //       userId:currentSavedToken
//   //      });
//   //      setSaved(!isCurrentlySaved);
//   //     setSavedCount(newSaveCount);
//   //   }catch (error) {
//   //     console.error('Error updating save:', error);
//   //   }
//   // }

//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const checkSavedStatus = async () => {
//       try {
//         const currentSavedToken = sessionStorage.getItem('user-token');
//         const checkSaveUrl = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saves/check`;
//         const checkResponse = await axios.post(checkSaveUrl, { userId: currentSavedToken, productId: productdetails.id });
//         setSaved(checkResponse.data.saved);
//       } catch (error) {
//         console.error('Error checking save status:', error);
//       }
//     };

//     checkSavedStatus();
//   }, [productdetails.id]);

//   const handleSave = async (productId, sellerId) => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }

//     if (sellerId.toString() === sessionStorage.getItem('user-token')) {
//       alert('You are the owner of this product and cannot save it');
//       return;
//     }

//     try {
//       const currentSavedToken = sessionStorage.getItem('user-token');
//       const url = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saves`;
//       await axios.post(url, { productId, userId: currentSavedToken });
//       setSaved(!saved); // Toggle the saved state
//     } catch (error) {
//       console.error('Error updating save:', error);
//     }
//   };
//   return (
//     <div className="fullscreen">
//       <MyNavbar />
//       <main>
//         <nav className="p-2 ps-lg-5 pe-lg-5">
//           <Link to="/" className="text-decoration-none text-dark">
//             <i className="bi bi-house-fill"></i>
//           </Link>
//           &nbsp; /{" "}
//           <Link
//             to={"/" + productdetails.product_type}
//             className="text-decoration-none text-dark"
//           >
//             {productdetails.product_type}
//           </Link>
//           /{" "}
//           <Link
//             to={"/" + productdetails.category}
//             className="text-decoration-none text-dark"
//           >
//             {productdetails.category}
//           </Link>{" "}
//           / {productdetails.name}
//         </nav>
//         <div className="p-2 ps-lg-5 pe-lg-5 d-lg-flex">
//           <div className="p-2 ps-lg-4 pe-lg-4 d-flex flex-column  col-lg-5">
//           <div className="position-relative ms-auto me-auto text-center productdetailsimgdiv">
//   <img
//     src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${firstImage}`}
//     alt="product"
//     className="productdetailsimg"
//   />
//   <div onClick={()=>handleSave(productdetails.id,productdetails.seller_id) } style={{ fontSize: '24px', color: saved ? 'red': 'grey', cursor: 'pointer' }}>
//   <i className="bi bi-bookmark-fill position-absolute top-0 end-0 m-2" ></i>
//   </div>
// </div>
//             <div >
//             <div className="ms-5 d-flex gap-2">
//             <div
//   className="heart-icon"
//   onClick={() => toggleLike(productdetails.id, productdetails.seller_id)}
//   style={{ fontSize: '1.5rem', color: liked ? 'red' : 'grey', cursor: 'pointer' }}
// >
//   <i className="bi bi-heart-fill"></i>
// </div>
// <div className="like-count mt-2" style={{ fontSize: '1rem', color: 'black' }}>
//   {likeCount} likes
// </div>

//             </div>
//             </div>

//             <div className="ms-auto me-auto">
//               <Carousel
//                 responsive={responsive}
//                 className=" mt-2 productdetailscarousel"
//                 ref={carouselRef}
//                 beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}
//               >
//                 {datta.map((product, index) => (
//                   <div
//                     className="card m-3"
//                     key={index}
//                     id={`subimage-${index}`}
//                     onClick={() => updateProductDetailsImg(product, index)}
//                     style={{ border: "1px solid grey" }}
//                   >
//                     <img
//                       src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}`}
//                       alt="images"
//                       style={{
//                         cursor: "pointer",
//                         maxWidth: "100%",
//                         height: "110px",
//                         objectFit: "contain",
//                         alignSelf: "center",
//                         padding: "3px",
//                       }}
//                     />
//                   </div>
//                 ))}
//               </Carousel>
//             </div>
//           </div>
//           <div className="ps-md-3 p-2 col-lg-7 detailsdiv">
//             <h1 className="text-secondary fs-2">{productdetails.name}</h1>
//             <p>{productdetails.description}</p>
//             <br />
//             {productdetails.location !== "NA" &&
//             <div className="d-flex col-md-9">
//               <p className=" col-md-4 col-lg-5">
//                 <b>Location</b>
//               </p>
//               <p className=" col-md-8 col-lg-10">: {productdetails.location}</p>
//             </div>
//             }
//             {productdetails.language !== null &&
//               productdetails.language !== "" && (
//                 <div className="d-flex col-md-9">
//                   <p className=" col-md-4 col-lg-5">
//                     <b>Language</b>
//                   </p>
//                   <p className=" col-md-8 col-lg-10">
//                     : {productdetails.language}
//                   </p>
//                 </div>
//               )}
//             {productdetails.color !== "NA" &&
//             <div className="d-flex col-md-9">
//               <p className=" col-md-4 col-lg-5">
//                 <b>Color</b>
//               </p>
//               <p className=" col-md-8 col-lg-10">: {productdetails.color}</p>
//             </div>
//               }
//             {productdetails.alteration !== "NA" &&
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Can it be altered</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-7">
//                   : {productdetails.alteration}
//                 </p>
//               </div>
//             }
//             {productdetails.size !== "NA" &&
//             <div className="d-flex col-md-9">
//               <p className=" col-md-4 col-lg-5">
//                 <b>Size</b>
//               </p>
//               <p className=" col-md-8 col-lg-10">: {productdetails.size}</p>
//             </div>
//              }
//             {productdetails.measurements !== "NA" &&
//                         <div className="d-flex col-md-9">
//                           <p className=" col-md-4 col-lg-5">
//                             <b>Measurements</b>
//                           </p>
//                           <p className=" col-md-8 col-lg-10">
//                             : {productdetails.measurements}
//                           </p>
//                         </div>
//             }
//             {productdetails.material !== null && productdetails.material !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Material</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">
//                   : {productdetails.material}
//                 </p>
//               </div>
//             )}
//             {productdetails.occasion !== null && productdetails.occasion !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Occasion</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">
//                   : {productdetails.occasion}
//                 </p>
//               </div>
//             )}
//             {productdetails.type !== null && productdetails.type !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>type</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.type}</p>
//               </div>
//             )}
//             {productdetails.brand !== null && productdetails.brand !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Brand</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.brand}</p>
//               </div>
//             )}
//             {productdetails.product_condition !== null && productdetails.product_condition !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Product_Condition</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">
//                   : {productdetails.product_condition}
//                 </p>
//               </div>
//             )}
//             {productdetails.style !== null && productdetails.style !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Style</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.style}</p>
//               </div>
//             )}
//             {productdetails.season !== null && productdetails.season !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Season</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.season}</p>
//               </div>
//             )}
//             {productdetails.fit !== null && productdetails.fit !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Fit</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.fit}</p>
//               </div>
//             )}
//             {productdetails.length !== null && productdetails.length !== "NA" && (
//               <div className="d-flex col-md-9">
//                 <p className=" col-md-4 col-lg-5">
//                   <b>Length</b>
//                 </p>
//                 <p className=" col-md-8 col-lg-10">: {productdetails.length}</p>
//               </div>
//             )}
//             {productdetails.measurements !== "NA" &&
//             <div className="d-flex col-md-9">
//               <p className=" col-md-4 col-lg-5">
//                 <b>Condition</b>
//               </p>
//               <p className=" col-md-8  col-lg-10">
//                 : {productdetails.condition}
//               </p>
//             </div>
//             }
//             <div className="d-flex col-md-9">
//               <p className=" col-md-4 col-lg-5">
//                 <b>Product ID</b>
//               </p>
//               <p className=" col-md-8 col-lg-10">: {id}</p>
//             </div>

//             <p className="text-success fs-4">
//               <b>&#36;{productdetails.price}.00</b>
//             </p>
//             {productdetails.quantity > 0 ? (
//               admin !== "admin" ? (
//                 <>
//                   <div className="">
//                     <div className="d-flex">
//                       <> QTY </>: &nbsp;
//                       <select className="form-select" style={{ width: "90px" }}>
//                         <option value={1}>1</option>
//                       </select>
//                     </div>
//                     {/* <div className="p-lg-2">
//                    <button
//                       type="submit"
//                       className="btn btn-secondary ms-3 ps-lg-5 pe-lg-5"
//                       onClick={handleAddToCart}
//                     >
//                     <b>  ADD TO CART</b>
//                     </button>
//                    </div>
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary mt-3 mb-3 ps-lg-5 pe-lg-5 "
//                     onClick={handleAddToWishlist}
//                   >
//                     <i className="bi bi-heart-fill" /> ADD TO WISHLIST
//                   </button> */}

//                     <div className="container">
//                       {sessionStorage.getItem('token') === "admin" ? null : (
//                         <div className="row ">
//                           <div className="col-12 col-md-7 mb-2 mt-2 ">
//                             <button
//                               type="submit"
//                               className="btn btn-secondary w-100"
//                               onClick={handleAddToCart}
//                             >
//                               <b>ADD TO CART</b>
//                             </button>
//                           </div>
//                           <div className="col-12 col-md-7 mb-2">
//                             <button
//                               type="button"
//                               className="btn btn-outline-secondary w-100"
//                               onClick={handleAddToWishlist}
//                             >
//                               {/* <i className="bi bi-heart-fill" />  */}
//                               <b> ADD TO WISHLIST</b>
//                             </button>
//                           </div>
//                           {/* <div className="col-12 col-md-7 mb-2">
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary w-100"
//                           // onClick={handleAddToWishlist}
//                         >
//                       <b> MAKE OFFER</b>
//                         </button>
//                       </div> */}

//                           {/*Button trigger modal*/}

//                           <div className="col-12 col-md-7 mb-2">
//                             {success ? (
//                               <div className="text-center">
//                                 <i
//                                   className="bi bi-check-lg fs-3"
//                                   style={{ width: "2em" }}
//                                 ></i>
//                                 <button type="button" className="btn mb-2  w-10">
//                                   <b>MAKE OFFER</b>
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="btn mb-2 btn-outline-secondary w-100"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#exampleModal"
//                               >
//                                 <b>MAKE OFFER</b>{" "}
//                               </button>
//                             )}

//                             <div
//                               className="modal fade"
//                               id="exampleModal"
//                               tabIndex="-1"
//                               aria-labelledby="exampleModalLabel"
//                               aria-hidden="true"
//                             >
//                               <div className="modal-dialog modal-dialog-centered">
//                                 <div className="modal-content">
//                                   <div className="modal-header">
//                                     <p className="modal-title fs-5 text-center col-11">
//                                       <b> Make an offer</b>
//                                     </p>
//                                     <div className="col-1">
//                                       <button
//                                         type="button"
//                                         className="btn-close d-lg-hidden col-1 justify-center"
//                                         data-bs-dismiss="modal"
//                                         aria-label="Close"
//                                       ></button>
//                                     </div>
//                                   </div>
//                                   {/*modal box */}
//                                   <div
//                                     className="modal-body"
//                                     style={{ display: success ? "none" : "" }}
//                                   >
//                                     {/* <img
//                                   src=""
//                                   alt="Small Image"
//                                   className="img-fluid mb-3 mx-auto d-block"
//                                 /> */}

//                                     {/* <input
//                                   type="text"
//                                   className="form-control mb-3"
//                                   placeholder="Enter your offer"
//                                 /> */}
//                                     <img
//                                       src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${firstImage}`}
//                                       alt="Small"
//                                       className="img-fluid mb-3 mx-auto d-block"
//                                       style={{
//                                         maxWidth: "100%",
//                                         maxHeight: "150px",
//                                       }} // Adjust the maxHeight as needed
//                                     />
//                                     <span style={{ fontSize: "0.75rem" }}>
//                                       Enter Your Offer
//                                     </span>
//                                     <div class="border p-2 position-relative mb-3">
//                                       <div className="row g-0 align-items-center">
//                                         <div className="col-auto">
//                                           <b className="p-2 fs-5">&#36;</b>
//                                         </div>
//                                         <div className="col">
//                                           <input
//                                             type="text"
//                                             placeholder="40.00"
//                                             value={add}
//                                             onChange={handleChange}
//                                             style={{
//                                               outline: "none",
//                                               border: "none",
//                                             }}
//                                           />
//                                         </div>
//                                         <div className="col-auto">
//                                           <i style={{ fontSize: "0.75rem" }}>
//                                             &#36; 6.29 shipping
//                                           </i>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     <div className="row">
//                                       <div
//                                         onClick={() =>
//                                           AmountChange(
//                                             productdetails.price -
//                                             (productdetails.price * 0.2).toFixed(
//                                               2
//                                             )
//                                           )
//                                         }
//                                         className="col-4 mb-2 position-relative "
//                                         onChange={AmountChange}
//                                       >
//                                         <span
//                                           className="position-absolute start-50 translate-middle-x text-center small"
//                                           style={{
//                                             fontSize: "0.75rem",
//                                             padding: "3px",
//                                           }}
//                                         >
//                                           20% Off
//                                         </span>
//                                         <button
//                                           type="button"
//                                           value="34.00"
//                                           className="btn border-secondary p-3 w-100"
//                                           style={{
//                                             paddingTop: "2rem",
//                                             backgroundColor:
//                                               add === "32.00"
//                                                 ? "rgba(38, 109, 28, 0.19)"
//                                                 : null,
//                                           }}
//                                         >
//                                           <b style={{ fontSize: ".95rem" }}>
//                                             &#36;
//                                             {productdetails.price -
//                                               (productdetails.price * 0.2).toFixed(
//                                                 2
//                                               )}
//                                           </b>
//                                         </button>
//                                       </div>

//                                       <div
//                                         className="col-4 mb-2 position-relative"
//                                         onClick={() =>
//                                           AmountChange(
//                                             productdetails.price -
//                                             (productdetails.price * 0.15).toFixed(
//                                               2
//                                             )
//                                           )
//                                         }
//                                       >
//                                         <span
//                                           className="position-absolute top-0 start-50 translate-middle-x text-center small"
//                                           style={{
//                                             fontSize: "0.75rem",
//                                             padding: "3px",
//                                           }}
//                                         >
//                                           15% Off
//                                         </span>
//                                         <button
//                                           type="button"
//                                           className="btn border-secondary p-3 w-100"
//                                           style={{
//                                             paddingTop: "2rem",
//                                             backgroundColor:
//                                               add === "34.00"
//                                                 ? "rgba(38, 109, 28, 0.19)"
//                                                 : null,
//                                           }}
//                                         >
//                                           <b style={{ fontSize: ".95rem" }}>
//                                             &#36;
//                                             {productdetails.price -
//                                               (productdetails.price * 0.15).toFixed(
//                                                 2
//                                               )}
//                                           </b>
//                                         </button>
//                                       </div>
//                                       <div
//                                         className="col-4 mb-2 position-relative"
//                                         onClick={() =>
//                                           AmountChange(
//                                             productdetails.price -
//                                             (productdetails.price * 0.1).toFixed(
//                                               2
//                                             )
//                                           )
//                                         }
//                                       >
//                                         <span
//                                           className="position-absolute top-0 start-50 translate-middle-x text-center small"
//                                           style={{
//                                             fontSize: "0.75rem",
//                                             padding: "3px",
//                                           }}
//                                         >
//                                           10% Off
//                                         </span>
//                                         <button
//                                           type="button"
//                                           className="btn border-secondary p-3 w-100"
//                                           style={{
//                                             paddingTop: "2rem",
//                                             backgroundColor:
//                                               add === "36.00"
//                                                 ? "rgba(38, 109, 28, 0.19)"
//                                                 : null,
//                                           }}
//                                         >
//                                           <b style={{ fontSize: ".95rem" }}>
//                                             &#36;
//                                             {productdetails.price -
//                                               (productdetails.price * 0.1).toFixed(
//                                                 2
//                                               )}
//                                           </b>
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   {/*success */}
//                                   <div
//                                     className="text-center"
//                                     style={{ display: success ? "" : "none" }}
//                                   >
//                                     <i class="bi bi-check2-circle text-success fs-1"></i>
//                                   </div>
//                                   <div className="modal-footer">
//                                     {isLoggedIn ? (
//                                       <button
//                                         onClick={handleOffer}
//                                         style={{ display: success ? "none" : "" }}
//                                         type="button"
//                                         className="btn btn-secondary w-100"
//                                       >
//                                         Send Offer
//                                       </button>
//                                     ) : (
//                                       <button
//                                         disabled
//                                         type="button"
//                                         className="btn btn-secondary w-100"
//                                       >
//                                         Send Offer
//                                       </button>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>


//                         </div>
//                       )}

//                     </div>
//                   </div>

//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     onClick={handleProductlist}
//                     className="btn  btn-outline-secondary mt-3 mb-3"
//                   >
//                     ADD TO PRODUCT LIST
//                   </button>
//                   &nbsp;
//                   <button
//                     type="button"
//                     className="btn  btn-danger mt-3 mb-3"
//                     onClick={handleProductReject}
//                   >
//                     Reject
//                   </button>
//                 </>
//               )
//             ) : (
//               <>
//                 <h5 className="text-danger" style={{ fontWeight: "800" }}>
//                   Out of Stock
//                 </h5>
//               </>
//             )}
//             <div className="col-12 col-md-7 mt-3">
//               <div className="user-details border shadow-sm p-3 bg-body rounded">
//                 {userdetails.map((user) => (
//                   <>
//                   <div className="d-flex justify-content-between m-2">
//                     <p>
//                       <i className="bi bi-person-circle fs-5"></i>
//                       &nbsp;{user.shopname === "" || null || undefined
//                         ? user.shopname
//                         : user.name}
//                     </p>
//                     <button
//                       className="btn btn-outline-primary"
//                       onClick={() => handleViewProfile(user.userId,userdetails)}
//                     >
//                       Visit Shop
//                     </button>
                    
//                   </div>
//                    <p className="ms-3"><TotalReviews  userDetails={userdetails}/></p>
//                 </>
//                 ))}
//               </div>
//               {productdetails.notes !== null && (
//                 <div className="p-2">
//                   <b>Notes:</b> {productdetails.notes}
//                 </div>
//               )}
//              <Reviews userDetails={userdetails} />

//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import MyNavbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useCart } from "./CartContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Reviews from "./Reviews";
import Scrolltotopbtn from "./Scrolltotopbutton";
import Notification from "./Notification"; 
import TotalReviews from "./sellerdashboard/TotalReviews";

const responsive = {
  extraLargeDesktop: {
    breakpoint: { min: 1601, max: 2000 },
    items: 3,
  },
  superLargeDesktop: {
    breakpoint: { max: 1600, min: 1201 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};

export default function Productdetails() {
  const [add, setAdd] = useState("0.00");
  const [offerAmout, setOfferAmout] = useState("");
  const [success, setSuccess] = useState(false);
  const [offer, setOffer] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { productdetails, admin, userDetails } = location.state || {};

  const {
    addToCart,
    addToWishlist,
    cartItems,
    wishItems,
    notification,
    setNotification,
    isLoggedIn,
    setIsLoggedIn,
  } = useCart();
  const [userdetails, setUserDetails] = useState([]);

  // const [offerAlert,setOfferAlert]=useState(null)

  const navigate = useNavigate();
  //  console.log(isLoggedIn)
  if (productdetails) {
    productdetails.userid = sessionStorage.getItem("user-token");
  }

  useEffect(() => {
    if (sessionStorage.getItem("token") !== "admin") {
      sessionStorage.getItem("user-token") !== null && setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const AmountChange = (e) => {
    setAdd(e);
  };
  const handleChange = (e) => {
    setAdd(e.target.value); // Update input value on manual input change
  };

  const handleProductlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminaccepted`,
        { accepted_by_admin: "true", id }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNotification({
      message: "Product added to the store successfully",
      type: "success",
    });
    setTimeout(() => setNotification(null), 3000);
    window.location.href = "/Resale-bazaar/acceptproduct";
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (cartItems.length > 0) {
        var unique_item = true;
        cartItems.map((item) => {
          if (item.product_id === productdetails.id) {
            setNotification({
              message: "Product already exists in the cart",
              type: "error",
            });
            setTimeout(() => setNotification(null), 3000);
            unique_item = false;
            //eslint-disable-next-line array-callback-return
            return;
          }
          return null;
        });
        unique_item && addToCart(productdetails, "main");
      } else {
        addToCart(productdetails, "main");
      }
    } else {
      let cartItems =
        JSON.parse(sessionStorage.getItem("guest_products")) || [];
      const isProductInCart = cartItems.some(
        (item) => item.id === productdetails.id
      );

      if (isProductInCart) {
        setNotification({
          message: "Product already exists in the cart",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      } else {
        cartItems.push({ ...productdetails, quantity: 1 });
        sessionStorage.setItem("guest_products", JSON.stringify(cartItems));
        window.location.reload(false);
      }
    }
  };

  const handleAddToWishlist = () => {
    const isProductInWishlist = wishItems.some(
      (item) => item.product_id === productdetails.id
    );
    if (isProductInWishlist) {
      setNotification({
        message: "Product already exists in the wishlist",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return; // Exit the function early
    } else if (isLoggedIn) {
      addToWishlist(productdetails);
    } else {
      navigate("/login");
    }
  };
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const productDetailsImgRef = useRef(null);
  const activeSubimageRef = useRef(null);
  const carouselRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateProductDetailsImg = (product, index) => {
    const extension = product.split(".").pop().toLowerCase();
    if (["mp4", "webm", "avi", "mov", "quicktime"].includes(extension)) {
      productDetailsImgRef.current.innerHTML = `
        <video
          src=${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}
          controls
          class="productdetailsimg"
        >
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      productDetailsImgRef.current.innerHTML = `
        <img
          src=${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}
          alt="product"
          class="productdetailsimg"
        />
      `;
    }

    // Reset previous active border to grey
    if (activeSubimageRef.current) {
      activeSubimageRef.current.style.border = "1px solid grey";
    }

    // Set new active border to green
    const newActiveSubimage = document.getElementById(`subimage-${index}`);
    if (newActiveSubimage) {
      newActiveSubimage.style.border = "3px solid green";
      activeSubimageRef.current = newActiveSubimage;
    }

    setCurrentSlide(index);
  };

  const handleProductReject = () => {
    const rejectReason = prompt("Enter Product Reject Reason");
    if (rejectReason !== null && rejectReason !== "") {
      console.log("Reason for rejection:", rejectReason);
      axios
        .post(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/adminrejection`,
          { rejectReason, id }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.href = "/Resale-bazaar/acceptproduct";
    } else {
      console.log("User canceled the prompt.");
    }
  };
  const datta = JSON.parse(productdetails.image);
  const firstImage = datta[0];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOffer = () => {
    if (add === "0.00" || add.length === 0) {
      return null;
    } else {
      setSuccess(true);
      axios
        .post(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/offeredproducts`,
          {
            product_id: id,
            offered_buyer_id: sessionStorage.getItem("user-token"),
            offered_price: add,
            product_status: "Pending",
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const filte = offer.filter(
    (cur) =>
      cur.offered_buyer_id === parseInt(sessionStorage.getItem("user-token"))
  );

  const offerExists = filte.some((curr) => {
    return (
      curr.offered_buyer_id ===
        parseInt(sessionStorage.getItem("user-token")) &&
      curr.product_id === productdetails.id &&
      curr.product_status === "Accepted"
    );
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const filteredUserDetails = res.data.filter(
            (item) => item.user_id === productdetails.seller_id
          );
          const userDetails = filteredUserDetails.map((item) => ({
            userId: item.user_id,
            email: item.email,
            phone: item.phone,
            name: item.firstname + " " + item.lastname,
            shopname: item.shopname,
          }));
          setUserDetails(userDetails);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/offeredproducts`
      )
      .then((e) => {
        if (e.data !== "Fail" && e.data !== "Error") {
          setOffer(e.data);
        }
      })
      .catch((error) => console.log(error));
  }, [offer, handleOffer, productdetails.seller_id]);
  const navigates = useNavigate();
  const handleViewProfile = (sellerId) => {
    navigates(`/sellerprofile/${sellerId}`, { state: { userdetails } });
  };

  useEffect(() => {
    fetchLikeCount();
    checkIfLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productdetails.id}/likes`
      );
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productdetails.id}/likes/user`,
        {
          params: { userId: sessionStorage.getItem("user-token") },
        }
      );
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error checking if liked:", error);
    }
  };

  const toggleLike = async (productId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      let newLikeCount = likeCount;
      // eslint-disable-next-line no-unused-vars
      let action = "";

      if (liked) {
        newLikeCount -= 1;
        await axios.post(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productId}/likes`,
          {
            like_userID: sessionStorage.getItem("user-token"),
            likes: newLikeCount,
            action: "unliked",
          }
        );
        action = "unliked";
      } else {
        newLikeCount += 1;
        await axios.post(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productId}/likes`,
          {
            like_userID: sessionStorage.getItem("user-token"),
            likes: newLikeCount,
            action: "liked",
          }
        );
        // eslint-disable-next-line no-unused-vars
        action = "liked";
      }

      setLiked(!liked);
      setLikeCount(newLikeCount);
    } catch (error) {
      console.error("Error toggling like:", error);
      setNotification({
        message: "Failed to update like status. Please try again later.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="fullscreen">
      <MyNavbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <main>
        <nav className="p-2 ps-lg-5 pe-lg-5">
          <Link to="/" className="text-decoration-none text-dark">
            <i className="bi bi-house-fill"></i>
          </Link>
          &nbsp; /{" "}
          <Link
            to={"/" + productdetails.product_type}
            className="text-decoration-none text-dark"
          >
            {productdetails.product_type}
          </Link>
          /{" "}
          <Link
            to={"/" + productdetails.category}
            className="text-decoration-none text-dark"
          >
            {productdetails.category}
          </Link>{" "}
          / {productdetails.name}
        </nav>
        <div className="p-2 ps-lg-5 pe-lg-5 d-lg-flex">
          <div className="p-2 ps-lg-4 pe-lg-4 d-flex flex-column  col-lg-5">
            <div
              className="ms-auto me-auto text-center productdetailsimgdiv"
              ref={productDetailsImgRef}
            >
              {/* Initial display of firstImage */}
              <img
                src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${firstImage}`}
                alt="product"
                className="productdetailsimg"
              />
            </div>

            <div className="ps-5 ps-md-3 ms-md-4 mt-3">
              <svg
                className={`heart ${liked ? "liked" : ""}`}
                viewBox="0 0 24 24"
                onClick={() => toggleLike(productdetails.id)}
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
              </svg>
              <span className="like-count">{likeCount} likes</span>
            </div>

            <div className="ms-auto me-auto">
      <Carousel
        responsive={responsive}
        className="mt-2 productdetailscarousel"
        ref={carouselRef}
        beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}
      >
        {datta.map((product, index) => (
          <div
            className="card m-3"
            key={index}
            id={`subimage-${index}`}
            onClick={() => updateProductDetailsImg(product, index)}
            style={{
              border:
                currentSlide === index
                  ? '3px solid green'
                  : '1px solid grey',
              position: 'relative',
            }}
          >
            {['mp4', 'webm', 'avi', 'mov', 'quicktime'].includes(
              product.split('.').pop().toLowerCase()
            ) ? (
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '110px',
                }}
              >
                <video
                  style={{
                    cursor: 'pointer',
                    maxWidth: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    alignSelf: 'center',
                    padding: '3px',
                  }}
                  controls
                >
                  <source
                    src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}`}
                    type={`video/${product.split('.').pop().toLowerCase()}`}
                  />
                  Your browser does not support the video tag.
                </video>
                <i
                  className="bi bi-play-btn-fill"
                  style={{
                    position: 'absolute',
                    fontSize: '2rem',
                    color: 'white',
                    pointerEvents: 'none',
                  }}
                ></i>
              </div>
            ) : (
              <img
                src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${product}`}
                alt="Product"
                style={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  height: '110px',
                  objectFit: 'contain',
                  alignSelf: 'center',
                  padding: '3px',
                }}
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
          </div>
          <div className="ps-md-3 p-2 col-lg-7 detailsdiv">
            <h1 className="text-secondary fs-2">{productdetails.name}</h1>
            <p>{productdetails.description}</p>
            <br />
            {productdetails.location !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Location</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.location}
                </p>
              </div>
            )}
            {productdetails.color !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Color</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.color}</p>
              </div>
            )}
            {productdetails.alteration !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Can it be altered</b>
                </p>
                <p className=" col-md-8 col-lg-7">
                  : {productdetails.alteration}
                </p>
              </div>
            )}
            {productdetails.size !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Size</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.size}</p>
              </div>
            )}
            {productdetails.measurements !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Measurements (Inches)</b>
                </p>
                <p className=" col-md-8 col-lg-10">
                  : {productdetails.measurements}
                </p>
              </div>
            )}
            {productdetails.material !== null &&
              productdetails.material !== "NA" && (
                <div className="d-flex col-md-9">
                  <p className=" col-md-4 col-lg-5">
                    <b>Material</b>
                  </p>
                  <p className=" col-md-8 col-lg-10">
                    : {productdetails.material}
                  </p>
                </div>
              )}
            {productdetails.occasion !== null &&
              productdetails.occasion !== "NA" && (
                <div className="d-flex col-md-9">
                  <p className=" col-md-4 col-lg-5">
                    <b>Occasion</b>
                  </p>
                  <p className=" col-md-8 col-lg-10">
                    : {productdetails.occasion}
                  </p>
                </div>
              )}
            {productdetails.type !== null && productdetails.type !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>type</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.type}</p>
              </div>
            )}
            {productdetails.brand !== null && productdetails.brand !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Brand</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.brand}</p>
              </div>
            )}
            {productdetails.style !== null && productdetails.style !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Style</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.style}</p>
              </div>
            )}
            {productdetails.season !== null &&
              productdetails.season !== "NA" && (
                <div className="d-flex col-md-9">
                  <p className=" col-md-4 col-lg-5">
                    <b>Season</b>
                  </p>
                  <p className=" col-md-8 col-lg-10">
                    : {productdetails.season}
                  </p>
                </div>
              )}
            {productdetails.fit !== null && productdetails.fit !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Fit</b>
                </p>
                <p className=" col-md-8 col-lg-10">: {productdetails.fit}</p>
              </div>
            )}
            {productdetails.length !== null &&
              productdetails.length !== "NA" && (
                <div className="d-flex col-md-9">
                  <p className=" col-md-4 col-lg-5">
                    <b>Length (Meters)</b>
                  </p>
                  <p className=" col-md-8 col-lg-10">
                    : {productdetails.length}
                  </p>
                </div>
              )}
            {productdetails.condition !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Condition</b>
                </p>
                <p className=" col-md-8  col-lg-10">
                  : {productdetails.condition}
                </p>
              </div>
            )}
            {productdetails.source !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Source</b>
                </p>
                <p className=" col-md-8  col-lg-10">
                  : {productdetails.source}
                </p>
              </div>
            )}
            {productdetails.age !== "NA" && (
              <div className="d-flex col-md-9">
                <p className=" col-md-4 col-lg-5">
                  <b>Style</b>
                </p>
                <p className=" col-md-8  col-lg-10">: {productdetails.age}</p>
              </div>
            )}
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>Product ID</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {id}</p>
            </div>
            <div className="d-flex col-md-9">
              <p className=" col-md-4 col-lg-5">
                <b>QTY</b>
              </p>
              <p className=" col-md-8 col-lg-10">: {productdetails.quantity}</p>
            </div>

            <p className="text-success fs-4">
              <b>&#36;{productdetails.price}.00</b>
            </p>

            {productdetails.quantity > 0 ? (
              admin !== "admin" ? (
                <>
                  <div className="">
                    <div className="container">
                      {sessionStorage.getItem("token") === "admin" ? null : (
                        <div className="row ">
                          <div className="col-12 col-md-7 mb-2 mt-2 ">
                            <button
                              type="submit"
                              className="btn btn-secondary w-100"
                              onClick={handleAddToCart}
                            >
                              <b>ADD TO CART</b>
                            </button>
                          </div>
                          <div className="col-12 col-md-7 mb-2">
                            <button
                              type="button"
                              className="btn btn-outline-secondary w-100"
                              onClick={handleAddToWishlist}
                            >
                              <b> ADD TO WISHLIST</b>
                            </button>
                          </div>

                          {/*Button trigger modal*/}

                          <div className="col-12 col-md-7 mb-2">
                            {offerExists ? (
                              <div className="text-center">
                                <i
                                  className="bi bi-check-lg fs-3"
                                  style={{ width: "2em" }}
                                ></i>
                                <button
                                  type="button"
                                  className="btn mb-2  w-10"
                                >
                                  <b>MAKE OFFER</b>
                                </button>
                              </div>
                            ) : productdetails.seller_id ===
                              sessionStorage.getItem("user-token") ? (
                              <button
                                onClick={() =>
                                  setNotification({
                                    message: "This Product Belongs to You",
                                    type: "error",
                                  })
                                }
                                type="button"
                                className="btn mb-2 btn-outline-secondary w-100"
                              >
                                <b>MAKE OFFER</b>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn mb-2 btn-outline-secondary w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <b>MAKE OFFER</b>
                              </button>
                            )}

                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <p className="modal-title fs-5 text-center col-11">
                                      <b> Make an offer</b>
                                    </p>
                                    <div className="col-1">
                                      <button
                                        type="button"
                                        className="btn-close d-lg-hidden col-1 justify-center"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                  </div>
                                  {/*modal box */}

                                  {isLoggedIn ? (
                                    <div
                                      className="modal-body"
                                      style={{ display: success ? "none" : "" }}
                                    >
                                      <img
                                        src={`${firstImage}`}
                                        alt="Small"
                                        className="img-fluid mb-3 mx-auto d-block"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "150px",
                                        }}
                                      />
                                      <span style={{ fontSize: "0.75rem" }}>
                                        {/* Enter Your Offer */}
                                        {add === "0.00" || add.length === 0 ? (
                                          <span style={{ color: "red" }}>
                                            Please Select Any One Off
                                          </span>
                                        ) : (
                                          <span>Enter Your Offer</span>
                                        )}
                                      </span>
                                      <div className="border p-2 position-relative mb-3">
                                        <div className="row g-0 align-items-center">
                                          <div className="col-auto">
                                            <b className="p-2 fs-5">&#36;</b>
                                          </div>
                                          <div className="col">
                                            <input
                                              type="text"
                                              placeholder="40.00"
                                              value={add}
                                              onChange={handleChange}
                                              style={{
                                                outline: "none",
                                                border: "none",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div
                                          onClick={() =>
                                            AmountChange(
                                              productdetails.price -
                                                (
                                                  productdetails.price * 0.2
                                                ).toFixed(2)
                                            )
                                          }
                                          className="col-4 mb-2 position-relative "
                                          onChange={AmountChange}
                                        >
                                          <span
                                            className="position-absolute start-50 translate-middle-x text-center small"
                                            style={{
                                              fontSize: "0.75rem",
                                              padding: "3px",
                                            }}
                                          >
                                            20% Off
                                          </span>
                                          <button
                                            onClick={() => setOfferAmout("20%")}
                                            type="button"
                                            value="34.00"
                                            className="btn border-secondary p-3 w-100"
                                            style={{
                                              paddingTop: "2rem",
                                              backgroundColor:
                                                offerAmout === "20%" &&
                                                add.length !== 0
                                                  ? "rgba(38, 109, 28, 0.19)"
                                                  : null,
                                            }}
                                          >
                                            <b style={{ fontSize: ".95rem" }}>
                                              &#36;
                                              {productdetails.price -
                                                (
                                                  productdetails.price * 0.2
                                                ).toFixed(2)}
                                            </b>
                                          </button>
                                        </div>

                                        <div
                                          className="col-4 mb-2 position-relative"
                                          onClick={() =>
                                            AmountChange(
                                              productdetails.price -
                                                (
                                                  productdetails.price * 0.15
                                                ).toFixed(2)
                                            )
                                          }
                                        >
                                          <span
                                            className="position-absolute top-0 start-50 translate-middle-x text-center small"
                                            style={{
                                              fontSize: "0.75rem",
                                              padding: "3px",
                                            }}
                                          >
                                            15% Off
                                          </span>
                                          <button
                                            onClick={() => setOfferAmout("15%")}
                                            type="button"
                                            className="btn border-secondary p-3 w-100"
                                            style={{
                                              paddingTop: "2rem",
                                              backgroundColor:
                                                offerAmout === "15%"
                                                  ? "rgba(38, 109, 28, 0.19)"
                                                  : null,
                                            }}
                                          >
                                            <b style={{ fontSize: ".95rem" }}>
                                              &#36;
                                              {productdetails.price -
                                                (
                                                  productdetails.price * 0.15
                                                ).toFixed(2)}
                                            </b>
                                          </button>
                                        </div>
                                        <div
                                          className="col-4 mb-2 position-relative"
                                          onClick={() =>
                                            AmountChange(
                                              productdetails.price -
                                                (
                                                  productdetails.price * 0.1
                                                ).toFixed(2)
                                            )
                                          }
                                        >
                                          <span
                                            className="position-absolute top-0 start-50 translate-middle-x text-center small"
                                            style={{
                                              fontSize: "0.75rem",
                                              padding: "3px",
                                            }}
                                          >
                                            10% Off
                                          </span>
                                          <button
                                            onClick={() => setOfferAmout("10%")}
                                            type="button"
                                            className="btn border-secondary p-3 w-100"
                                            style={{
                                              paddingTop: "2rem",
                                              backgroundColor:
                                                offerAmout === "10%"
                                                  ? "rgba(38, 109, 28, 0.19)"
                                                  : null,
                                            }}
                                          >
                                            <b style={{ fontSize: ".95rem" }}>
                                              &#36;
                                              {productdetails.price -
                                                (
                                                  productdetails.price * 0.1
                                                ).toFixed(2)}
                                            </b>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                  {/*success */}
                                  <div
                                    className="text-center"
                                    style={{ display: success ? "" : "none" }}
                                  >
                                    <i className="bi bi-check2-circle text-success fs-1"></i>
                                  </div>
                                  <div className="modal-footer">
                                    {isLoggedIn ? (
                                      <button
                                        onClick={handleOffer}
                                        style={{
                                          display: success ? "none" : "",
                                        }}
                                        type="button"
                                        className="btn btn-secondary w-100"
                                      >
                                        Send Offer
                                      </button>
                                    ) : (
                                      <button
                                        disabled
                                        type="button"
                                        className="btn btn-secondary w-100"
                                      >
                                        PLease Login
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleProductlist}
                    className="btn  btn-outline-secondary mt-3 mb-3"
                  >
                    ADD TO PRODUCT LIST
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn  btn-danger mt-3 mb-3"
                    onClick={handleProductReject}
                  >
                    Reject
                  </button>
                </>
              )
            ) : (
              <>
                <h5 className="text-danger" style={{ fontWeight: "800" }}>
                  Out of Stock
                </h5>
              </>
            )}

            <div className="col-12 col-md-7 mt-3">
              <div className="user-details border shadow-sm p-3 bg-body rounded">
                {userdetails.map((user, index) => (
                  <>
                  <div
                    className="d-flex justify-content-between m-2"
                    key={index}
                  >
                    <p>
                      <i className="bi bi-person-circle fs-5"></i>
                      &nbsp;
                      {user.shopname === "" || user.shopname === null || user.shopname === undefined
                        ? user.name
                        : user.shopname}
                    </p>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleViewProfile(user.userId)}
                    >
                      Visit Shop
                    </button>

                  </div>
                  <p className="ms-2"><TotalReviews  userDetails={userdetails}/></p>
</>
                ))}

              </div>
              {productdetails.notes !== null && (
                <div className="p-2">
                  <b>Notes:</b> {productdetails.notes}
                </div>
              )}
              <Reviews userDetails={userdetails} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Scrolltotopbtn />
    </div>
  );
}
