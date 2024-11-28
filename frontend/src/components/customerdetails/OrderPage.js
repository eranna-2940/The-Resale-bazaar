// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import MyNavbar from '../navbar';
// import Footer from '../footer';

// const OrderPage = () => {
//   const location = useLocation();
//   const { filteredProducts} = location.state || {};
//   const productData = filteredProducts || {}
//   const [orderStages, setOrderStages] = useState([]);

//   // console.log(productData)
//   useEffect(() => {
//     // Example logic to determine order stages based on order data
//     const stages = [
//       { title: 'Order Placed', isCompleted: productData.ordered_date !== null },
//       { title: 'Shipped', isCompleted: productData.shipped_date !== null },
//       { title: 'Arrived', isCompleted:  productData.delivered_date !== null  }, 
//       { title: 'Delivered', isCompleted: productData.delivered_date !== null }
//     ];

//     setOrderStages(stages);
//   }, [productData]);
//   const styles = `
//     .progress-dot-bar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       position: relative;
//     }
//     .progress-dot {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//     }
//     .dot {
//       width: 40px;
//       height: 40px;
//       background-color: #ddd;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//     }
//     .dot.active {
//       background-color: #651FFF;
//     }
//     .connector {
//       height: 6px;
//       background-color: #ddd;
//       flex-grow: 1;
//       position: relative;
//       z-index: 0;
//     }
//     .connector.active {
//       background-color: #651FFF;
//     }
//     .label {
//       font-size: 12px;
//       text-align: center;
//       color: #777;
//       white-space: nowrap;
//       margin-top: -60px;
//     }
//   `;

//   return (
//     <>
//     <MyNavbar/>
//     <div className="container py-5">
//       <style>{styles}</style>
//       <div className="card shadow p-4">
//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col">
//               <h5 className="mb-0">ORDER <span className="text-primary">{productData.order_id}</span></h5>
//               <h1>{productData.name}</h1>
//             </div>
//             <div className="col text-end">
//               <p className="mb-0">Expected Arrival <span className="fw-bold">{productData.expected_arrival_date}</span></p>
//               <p>USPS <span className="fw-bold">{productData.usps_tracking_number}</span></p>
//             </div>
//           </div>

//           <div className="progress-dot-bar mt-4 mb-4">
//             {orderStages.map((stage, index) => (
//               <React.Fragment key={index}>
//                 <div className={`progress-dot ${stage.isCompleted ? 'active' : ''}`}>
//                   <div className={`dot ${stage.isCompleted ? 'active' : ''}`}>
//                     <div className="label">{stage.title}</div>
//                   </div>
//                 </div>
//                 {index < orderStages.length - 1 && (
//                   <div className={`connector ${stage.isCompleted && orderStages[index + 1].isCompleted ? 'active' : ''}`}></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default OrderPage;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import MyNavbar from '../navbar';
// import Footer from '../footer';
// import Scrolltotopbtn from '../Scrolltotopbutton';

// const OrderPage = () => {
//   const location = useLocation();
//   const { filteredProducts} = location.state || {};
//   const productData = filteredProducts || {}
//   const [orderStages, setOrderStages] = useState([]);

//   useEffect(() => {
//     const stages = [
//       { title: 'Order Placed', isCompleted: productData.ordered_date !== null },
//       { title: 'Shipped', isCompleted: productData.shipped_date !== null },
//       { title: 'Arrived', isCompleted:  productData.delivered_date !== null  }, 
//       { title: 'Delivered', isCompleted: productData.delivered_date !== null }
//     ];
//     setOrderStages(stages);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const styles = `
//     .progress-dot-bar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       position: relative;
//     }
//     .progress-dot {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//     }
//     .dot {
//       width: 40px;
//       height: 40px;
//       background-color: #ddd;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//     }
//     .dot.active {
//       background-color: #651FFF;
//     }
//     .connector {
//       height: 6px;
//       background-color: #ddd;
//       flex-grow: 1;
//       position: relative;
//       z-index: 0;
//     }
//     .connector.active {
//       background-color: #651FFF;
//     }
//     .label {
//       font-size: 12px;
//       text-align: center;
//       color: #777;
//       white-space: nowrap;
//       margin-top: -60px;
//     }
//   `;

//   return (
//     <>
//     <MyNavbar/>
//     <div className="container py-5">
//       <style>{styles}</style>
//       <div className="card shadow p-4">
//         <div className="card-body">
//           <div className="row align-items-center">
//             <div className="col">
//               <h5 className="mb-0">ORDER ID &nbsp;<span className="text-primary">{productData.order_id}</span></h5>
//               <h3>{productData.name}</h3>
//             </div>
//             <div className="col text-end">
//               <p className="mb-0">Expected Arrival <span className="fw-bold">{productData.expected_arrival_date}</span></p>
//               <p>USPS <span className="fw-bold">{productData.usps_tracking_number}</span></p>
//             </div>
//           </div>

//           <div className="progress-dot-bar mt-4 mb-4">
//             {orderStages.map((stage, index) => (
//               <React.Fragment key={index}>
//                 <div className={`progress-dot ${stage.isCompleted ? 'active' : ''}`}>
//                   <div className={`dot ${stage.isCompleted ? 'active' : ''}`}>
//                     <div className="label">{stage.title}</div>
//                   </div>
//                 </div>
//                 {index < orderStages.length - 1 && (
//                   <div className={`connector ${stage.isCompleted && orderStages[index + 1].isCompleted ? 'active' : ''}`}></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer/>
//     <Scrolltotopbtn/>
//     </>
//   );
// };

// export default OrderPage;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import MyNavbar from "../navbar";
// import Footer from "../footer";
// import Scrolltotopbtn from "../Scrolltotopbutton";

// const OrderPage = () => {
//   const location = useLocation();
//   const { filteredProducts } = location.state || {};
//   const productData = filteredProducts || {};
//   const [orderStages, setOrderStages] = useState([]);
//   const currentDate = new Date();

//   useEffect(() => {
//     const shippedDate = productData.shipped_date
//       ? new Date(productData.shipped_date)
//       : null;
//     const expectedArrivalDate = productData.expected_arrival_date
//       ? new Date(productData.expected_arrival_date)
//       : null;
//     const deliveredDate = productData.delivered_date
//       ? new Date(productData.delivered_date)
//       : null;

//     const stages = [
//       {
//         title: "Order Placed",
//         date: productData.ordered_date
//           ? new Date(productData.ordered_date)
//           : null,
//         isCompleted: productData.ordered_date !== null,
//       },
//       {
//         title: "Shipped",
//         date: shippedDate,
//         expectedDate: productData.expected_shipped_date
//           ? new Date(productData.expected_shipped_date)
//           : null,
//         isCompleted: shippedDate && shippedDate <= currentDate,
//       },
//       {
//         title: "Arrived",
//         date: expectedArrivalDate,
//         expectedDate: productData.expected_arrival_date
//           ? new Date(productData.expected_arrival_date)
//           : null,
//         isCompleted: shippedDate && expectedArrivalDate > currentDate,
//       },
//       {
//         title: "Delivered",
//         date: deliveredDate,
//         expectedDate: productData.expected_delivered_date
//           ? new Date(productData.expected_delivered_date)
//           : null,
//         isCompleted: deliveredDate && deliveredDate <= currentDate,
//       },
//     ];

//     setOrderStages(stages);
//   }, [productData]);

//   const styles = `
//     .progress-dot-bar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       position: relative;
//     }
//     .progress-dot {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//     }
//     .dot {
//       width: 40px;
//       height: 40px;
//       background-color: #ddd;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       position: relative;
//       z-index: 1;
//       transition: background-color 0.3s;
//     }
//     .dot.active {
//       background-color: #651FFF;
//       color: #fff;
//     }
//     .connector {
//       height: 6px;
//       background-color: #ddd;
//       flex-grow: 1;
//       position: relative;
//       z-index: 0;
//     }
//     .connector.active {
//       background-color: #651FFF;
//     }
//     .label {
//       font-size: 12px;
//       text-align: center;
//       color: #777;
//       white-space: nowrap;
//       margin-top: -60px;
//     }
//     .date {
//       font-size: 12px;
//       color: #333;
//       margin: 20px;
//     }
//   `;

//   return (
//     <>
//       <MyNavbar />
//       <div className="p-4">
//         <style>{styles}</style>
//         <div className="card shadow p-4">
//           <div className="card-body container">
//             <div className="row align-items-center">
//               <div className="col">
//                 <h5 className="mb-0">
//                   ORDER ID:{" "}
//                   <span className="text-primary">{productData.order_id}</span>
//                 </h5>
//                 <h3>{productData.name}</h3>
//               </div>
//               <div className="col text-end">
//                 <p className="mb-0">
//                   USPS:{" "}
//                   <span className="fw-bold">
//                     {productData.usps_tracking_number}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="progress-dot-bar mt-4 mb-4">
//               {orderStages.map((stage, index) => (
//                 <React.Fragment key={index}>
//                   <div
//                     className={`progress-dot ${
//                       stage.isCompleted ? "active" : ""
//                     }`}
//                   >
//                     <div className={`dot ${stage.isCompleted ? "active" : ""}`}>
//                       <div className="label">
//                         {stage.date ? (
//                           stage.date >= new Date() ? (
//                             // If the date is in the future, display "Expected title : date"
//                             <>
//                               Expected {stage.title}:{" "}
//                               {stage.date.toLocaleDateString()}
//                             </>
//                           ) : (
//                             // If the date is current or past, display "title : date"
//                             <>
//                               {stage.title}: {stage.date.toLocaleDateString()}
//                             </>
//                           )
//                         ) : (
//                           // If no date exists, just display the title without any date
//                           stage.title
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   {index < orderStages.length - 1 && (
//                     <div
//                       className={`connector ${
//                         stage.isCompleted && orderStages[index + 1].isCompleted
//                           ? "active"
//                           : ""
//                       }`}
//                     ></div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//             {/* <div className="mt-2 d-flex justify-content-between">
//                 {orderStages.map((stage, index) => (
//                   stage.date && <div key={index} className="date">{stage.date.toLocaleDateString()}</div>
//                 ))}
//               </div> */}
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <Scrolltotopbtn />
//     </>
//   );
// };

// export default OrderPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyNavbar from "../navbar";
import Footer from "../footer";
import Scrolltotopbtn from "../Scrolltotopbutton";

const OrderPage = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || {};
  const productData = filteredProducts || {};
  const [orderStages, setOrderStages] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    const shippedDate = productData.shipped_date ? new Date(productData.shipped_date) : null;
    const expectedArrivalDate = productData.expected_arrival_date ? new Date(productData.expected_arrival_date) : null;
    const deliveredDate = productData.delivered_date ? new Date(productData.delivered_date) : null;

    const isDelivered = deliveredDate && deliveredDate <= currentDate;

    const stages = [
      {
        title: "Order Placed",
        date: productData.ordered_date ? new Date(productData.ordered_date) : null,
        isCompleted: isDelivered || (productData.ordered_date !== null),
      },
      {
        title: "Shipped",
        date: shippedDate,
        expectedDate: productData.expected_shipped_date ? new Date(productData.expected_shipped_date) : null,
        isCompleted: isDelivered || (shippedDate && shippedDate <= currentDate),
      },
      {
        title: "Arrived",
        date: expectedArrivalDate,
        expectedDate: productData.expected_arrival_date ? new Date(productData.expected_arrival_date) : null,
        isCompleted: isDelivered || (shippedDate && expectedArrivalDate && expectedArrivalDate <= currentDate),
      },
      {
        title: "Delivered",
        date: deliveredDate,
        expectedDate: productData.expected_delivered_date ? new Date(productData.expected_delivered_date) : null,
        isCompleted: isDelivered,
      },
    ];

    setOrderStages(stages);
  }, [productData]);

  const styles = `
    .progress-dot-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .progress-dot {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .dot {
      width: 40px;
      height: 40px;
      background-color: #ddd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      transition: background-color 0.3s;
    }
    .dot.active {
      background-color: #651FFF;
      color: #fff;
    }
    .connector {
      height: 6px;
      background-color: #ddd;
      flex-grow: 1;
      position: relative;
      z-index: 0;
    }
    .connector.active {
      background-color: #651FFF;
    }
    .label {
      font-size: 12px;
      text-align: center;
      color: #777;
      white-space: nowrap;
      margin-top: -60px;
    }
  `;

  return (
    <>
      <MyNavbar />
      <div className="p-4">
        <style>{styles}</style>
        <div className="card shadow p-4">
          <div className="card-body container">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="mb-0">
                  ORDER ID:{" "}
                  <span className="text-primary">{productData.order_id}</span>
                </h5>
                <h3>{productData.name}</h3>
              </div>
              <div className="col text-end">
                <p className="mb-0">
                  USPS:{" "}
                  <span className="fw-bold">
                    {productData.usps_tracking_number}
                  </span>
                </p>
              </div>
            </div>

            <div className="progress-dot-bar mt-4 mb-4">
              {orderStages.map((stage, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`progress-dot ${stage.isCompleted ? "active" : ""}`}
                  >
                    <div className={`dot ${stage.isCompleted ? "active" : ""}`}>
                      <div className="label">
                        {stage.date ? (
                          stage.date >= new Date() ? (
                            <>
                              Expected {stage.title}:{" "}
                              {stage.date.toLocaleDateString()}
                            </>
                          ) : (
                            <>
                              {stage.title}: {stage.date.toLocaleDateString()}
                            </>
                          )
                        ) : (
                          stage.title
                        )}
                      </div>
                    </div>
                  </div>
                  {index < orderStages.length - 1 && (
                    <div
                      className={`connector ${
                        stage.isCompleted && orderStages[index + 1].isCompleted
                          ? "active"
                          : ""
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrolltotopbtn />
    </>
  );
};

export default OrderPage;
