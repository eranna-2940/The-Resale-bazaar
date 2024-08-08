import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const AverageReviews = ({ userDetails }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchTotalReviews = async () => {
      try {
        const reviewResponse = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/reviews`);
        if (reviewResponse.data !== "Fail" && reviewResponse.data !== "Error") {
          const productReviews = reviewResponse.data.filter((review) => review.review_productID === userDetails);
          const count = productReviews.length;
          setTotalReviews(count);

          const totalStars = productReviews.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(totalStars / count || 0);
        } else {
          setTotalReviews(0);
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching total reviews:", error);
        setTotalReviews(0);
        setAverageRating(0);
      }
    };

    fetchTotalReviews();
  }, [userDetails]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <FaStar color="white" size={12} />&nbsp;
       <span> {averageRating} | {totalReviews}</span>
    </div>
  );
};

export default AverageReviews;
