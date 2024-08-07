// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // export default function Finalcheckoutpage() {
// //   // eslint-disable-next-line no-unused-vars
// //   const [product, setProduct] = useState([]);

// //   useEffect(() => {
// //     const token = sessionStorage.getItem("user-token");
// //     if (!token) return;

// //     axios
// //       .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/addcart`)
// //       .then((response) => {
// //         if (response.data !== "Fail" && response.data !== "Error") {
// //           if (sessionStorage.getItem("user-token") !== null) {
// //             const filteredProducts = response.data.filter((item) => item.userid.toString() === sessionStorage.getItem("user-token"));
// //             setProduct(filteredProducts);

// //             // Execute update request for each item in the cart
// //             filteredProducts.forEach((item) => {
// //               axios
// //                 .post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updatepayment`, {
// //                   payment_status: true,
// //                   token,
// //                   product_id: item.product_id,
// //                   main_id: item.id,
// //                   shipment_id: `TRBSID${token}${item.product_id}`,
// //                   order_id : `TRBOID${token}${item.product_id}`,
// //                   ordered_date :  new Date().toLocaleDateString("fr-CA"),
// //                   shipped_date : null,
// //                   delivered_date : null
// //                 })
// //                 .then((res) => {
// //                   alert("Product Purchased Successfully");
// //                   window.location.href = `${process.env.REACT_APP_HOST}3000/Resale-bazaar`;
// //                 })
// //                 .catch((err) => console.log("Error updating payment status:", err));
// //             });
// //           }
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching cart items:", error);
// //       });
// //   }, []);

// //   const [allProducts, setAllProducts] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/allproducts`)
// //       .then((res) => {
// //         if (res.data !== "Fail" && res.data !== "Error") {
// //           setAllProducts(res.data);
// //         }
// //       })
// //       .catch((error) => {
// //         console.log("Error fetching data:", error);
// //       });
// //   }, []);

 

// //   useEffect(() => {
// //     axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updatepayment`)
// //       .then((res) => {
// //         if (res.data !== "Fail" && res.data !== "Error") {
// //           allProducts.forEach((product) => {
// //             const orderCount = res.data.filter((order) => order.product_id === product.id).length;
// //             const updatedQuantity = Math.max(product.quantity - orderCount, 0); // Ensure quantity does not go below zero
// //             axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updateproducts`, {
// //               product_id: parseInt(product.id),
// //               quantity: updatedQuantity
// //             })
// //             .then((response) => {
// //               // Handle response if needed
// //             })
// //             .catch((error) => {
// //               console.error("Error updating product quantity:", error);
// //             });
// //           });
// //         }
// //       })
// //       .catch((error) => {
// //         console.log("Error fetching orders:", error);
// //       });
// //   }, [allProducts]);


// //   return <div>Loading...</div>;
// // }
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Finalcheckoutpage() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const token = sessionStorage.getItem("user-token");
//     if (!token) return;

//     // Fetch cart items with product details in one request
//     axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/fetchCartItemsWithProducts`, {
//       params: { userid: token }
//     })
//       .then((response) => {
//         if (response.data !== "Fail" && response.data !== "Error") {
//           setCartItems(response.data);
          
//           // Update payment status and product quantities in batch
//           const updatePaymentAndQuantities = axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updatePaymentAndQuantities`, {
//             userid: token,
//             cartItems: response.data
//           });

//           updatePaymentAndQuantities
//             .then(() => {
//               alert("Product Purchased Successfully");
//               window.location.href = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_FRONT_END_PORT}/Resale-bazaar`;
//             })
//             .catch((err) => console.log("Error updating payment status and quantities:", err));
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching cart items:", error);
//       });
//   }, []);

//   return <div>Loading...</div>;
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from "./Notification";

export default function Finalcheckoutpage() {
  // eslint-disable-next-line no-unused-vars
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("user-token");
    if (!token) return;

    // Fetch cart items for the logged-in user
    axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/addcart`)
      .then((response) => {
        if (response.data !== "Fail" && response.data !== "Error") {
          const filteredProducts = response.data.filter((item) => item.userid=== token);
          setCartItems(filteredProducts);

          // Proceed to update payment status
          updatePaymentStatus(filteredProducts, token);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePaymentStatus = (products, token) => {
    const paymentRequests = products.map((item) => {
      return axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updatepayment`, {
        payment_status: true,
        token,
        product_id: item.product_id,
        main_id: item.id,
        shipment_id: `TRBSID${token}${item.product_id}${Math.floor(Math.random() * 1000)}`,
        order_id: `TRBOID${token}${item.product_id}${Math.floor(Math.random() * 1000)}`,
        ordered_date: new Date().toLocaleDateString("fr-CA"),
        shipped_date: null,
        delivered_date: null,
        order_quantity: item.quantity,
        order_status: "purchased",
        order_amount: item.quantity * item.price,
        product_name: item.name,
        seller_id: item.seller_id
      });
    });

    Promise.all(paymentRequests)
      .then(() => {
        setNotification({ message: 'Product Purchased Successfully', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
        updateProductQuantities(products); // Update product quantities based on purchased items
      })
      .catch((err) => {
        console.log("Error updating payment status:", err);
        setNotification({ message: 'Error purchasing product', type: 'error' });
      });
  };

  const updateProductQuantities = (purchasedItems) => {
    axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/allproducts`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const updateQuantityRequests = res.data.map((product) => {
            const orderCount = purchasedItems
              .filter((item) => item.product_id === product.id)
              .reduce((total, item) => total + item.quantity, 0); // Sum the quantities from the orders
            const updatedQuantity = Math.max(product.quantity - orderCount, 0); // Update product quantity
            
            return axios.post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/updateproducts`, {
              product_id: parseInt(product.id),
              quantity: updatedQuantity // New quantity after order
            });
          });

          Promise.all(updateQuantityRequests)
            .then(() => {
              console.log("Product quantities updated successfully");
              window.location.href = `${process.env.REACT_APP_HOST}${process.env.REACT_APP_FRONT_END_PORT}/`;
            })
            .catch((error) => {
              console.error("Error updating product quantity:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error fetching all products:", error);
      });
  };


  return (
   
<>
<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
     
      <div className="waviy">
        <span style={{ '--i': 1 }}>L</span>
        <span style={{ '--i': 2 }}>o</span>
        <span style={{ '--i': 3 }}>a</span>
        <span style={{ '--i': 4 }}>d</span>
        <span style={{ '--i': 5 }}>i</span>
        <span style={{ '--i': 6 }}>n</span>
        <span style={{ '--i': 7 }}>g</span>
        <span style={{ '--i': 8 }}>.</span>
        <span style={{ '--i': 9 }}>.</span>
        <span style={{ '--i': 10 }}>.</span>
      </div>
</div>

</>



  );
}
