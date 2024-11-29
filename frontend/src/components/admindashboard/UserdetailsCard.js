import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product";

export default function UserdetailsCard(props) {
  const users = props.user;
  // eslint-disable-next-line no-unused-vars
  const [allProducts, setAllProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerproductsLength, setSellerproductsLength] = useState(4);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [purchasedproductsLength, setPurchasedproductsLength] = useState(4);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts`
      )
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setAllProducts(res.data);
          setSellerProducts(
            res.data.filter((item) => item.seller_id === users.user_id)
          ); // Initially display first batch
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });

    axios
      .get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updatepayment`
      )
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          // console.log(res.data);
          setPurchasedProducts(
            res.data
          ); // Initially display first batch
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const userOrders = purchasedProducts.filter(
    (order) => order.buyer_id === users.user_id 
  );
  
  
  const mappedOrders = allProducts.map((product) => {
  
    const ordersForProduct = userOrders.filter(
      (order) => order.product_id === product.id
    );
  
   
    if (ordersForProduct.length > 0) {
      return {
        ...product, 
        totalOrders: ordersForProduct.length, 
      };
    }
  
    return null;
  }).filter(Boolean); 
  


  return (
    <div>
      <div className="pb-3">
        <h4>
          {users.firstname} {users.lastname}
        </h4>
      </div>
      <div className="d-md-flex gap-2">
        <div className="col-md-9">
          <div>
            <h5>Products</h5>
          </div>
          <h6>Items Purchased ({mappedOrders && mappedOrders.length > 0 ? mappedOrders.length : 0})</h6>
          {mappedOrders && mappedOrders.length > 0 ? (
            <div>
              
              <div className="product-grid container">
                {mappedOrders
                  .slice(0, purchasedproductsLength)
                  .map((product, index) => (
                    <Product key={index} product={product} admin="home" />
                  ))}
              </div>
              <div className="text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    purchasedproductsLength > 4
                      ? setPurchasedproductsLength(4)
                      : setPurchasedproductsLength(mappedOrders.length);
                  }}
                >
                  {mappedOrders && purchasedproductsLength === 4 ? "View More" : "View Less"}
                </button>
              </div>
            </div>
          ) : (
            <div>Currently, there are no products</div>
          )}
            <h6 className="mt-3">Products as Seller ({sellerProducts && sellerProducts.length > 0 ? sellerProducts.length : 0})</h6>
          {sellerProducts && sellerProducts.length > 0 ? (
            <div>
            
              <div className="product-grid container">
                {sellerProducts
                  .slice(0, sellerproductsLength)
                  .map((product, index) => (
                    <Product key={index} product={product} admin="home" />
                  ))}
              </div>
              <div className="text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    sellerproductsLength > 4
                      ? setSellerproductsLength(4)
                      : setSellerproductsLength(sellerProducts.length);
                  }}
                >
                  {sellerProducts && sellerproductsLength === 4 ? "View More" : "View Less"}
                </button>
              </div>
            </div>
          ) : (
            <div>The seller has no items for sale at the moment.</div>
          )}
        </div>
        <div className="col-md-3">
          <h5>User Details</h5>
          <div>
            <p className="d-flex flex-column">
              {users.email ? (
                <span>
                  <b>Email</b> : {users.email}
                </span>
              ) : (
                <></>
              )}
              {users.phone ? (
                <span>
                  <b>Contact</b> : {users.phone}
                </span>
              ) : (
                <></>
              )}
              {users.shopname ? (
                <span>
                  <b>Store Name</b> : {users.shopname}
                </span>
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
