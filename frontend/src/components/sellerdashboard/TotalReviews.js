import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const TotalReviews = ({ userDetails }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    const fetchTotalReviews = async () => {
      try {
        const reviewResponse = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/reviews`);
        if (reviewResponse.data !== "Fail" && reviewResponse.data !== "Error") {
          const userReviews = reviewResponse.data.filter(
            (review) => userDetails.some((user) => user.userId === review.seller_id)
          );
          const count = userReviews.length;
          setTotalReviews(count);
          
          const stars = userReviews.reduce((acc, review) => acc + review.rating, 0);
          setTotalStars(stars);
        } else {
          // Handle the case where reviewResponse.data is "Fail" or "Error"
          setTotalReviews(0);
          setTotalStars(0);
        }
      } catch (error) {
        console.error("Error fetching total reviews:", error);
        // Handle errors here if needed
        setTotalReviews(0);
        setTotalStars(0);
      }
    };

    fetchTotalReviews();
  }, [userDetails]);

  const calculateAverageRating = () => {
    if (totalReviews === 0) {
      return 0;
    }
    return Math.round((totalStars / (totalReviews * 5)) * 5); // Calculate average rating based on total stars out of 5
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} color={i < rating ? "#E81F00" : "#e4e5e9"} size={20} />
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <>

    <div className="d-flex">
    <div>
      {renderStars(calculateAverageRating())}
      </div>
      <div>
      <span> &nbsp;&nbsp;({totalReviews})</span>
      </div>
    </div>

    </>
  );
};
export default TotalReviews;