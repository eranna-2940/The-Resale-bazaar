import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import MyNavbar from "../navbar";
import Footer from "../footer";
import axios from "axios";
import { useCart } from "../CartContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Reviews from "../Reviews";
import Scrolltotopbtn from "../Scrolltotopbutton";
import Notification from "../Notification"; 
import TotalReviews from "../sellerdashboard/TotalReviews";

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

export default function Offeredproductdetails() {
  const { id } = useParams();
  const location = useLocation();
  const { productdetails} = location.state || {};

  const {
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

  
  const datta = JSON.parse(productdetails.image);
  const firstImage = datta[0];
  // eslint-disable-next-line react-hooks/exhaustive-deps
 


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
   
  }, [productdetails.seller_id]);
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
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productdetails.product_id}/likes`
      );
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/products/${productdetails.product_id}/likes/user`,
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
              className="position-relative ms-auto me-auto text-center productdetailsimgdiv"
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
                onClick={() => toggleLike(productdetails.product_id)}
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

            {productdetails.quantity === 0 ? (
              <>
                <h5 className="text-danger" style={{ fontWeight: "800" }}>
                  Out of Stock
                </h5>
              </>
            ):(null)}

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