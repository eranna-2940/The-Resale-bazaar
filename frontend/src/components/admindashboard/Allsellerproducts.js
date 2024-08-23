// import React, { useEffect, useState } from 'react';
// import Adminfooter from './Adminfooter';
// import Adminmenu from './Adminmenu';
// import Adminnavbar from './Adminnavbar';
// import axios from 'axios';
// import Adminpagination from './Adminpagination';
// import Notification from "../Notification";

// const Allsellerproducts = () => {
//   const [sellerProducts, setSellerProducts] = useState({});
//   const [sellers, setSellers] = useState([]);
//   const [activeSeller, setActiveSeller] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [pageSize, setPageSize] = useState(25);
//   const [currentPage, setCurrentPage] = useState(1);

//   const userToken = JSON.parse(sessionStorage.getItem('user-token'));

//   useEffect(() => {
//     const fetchSellersAndProducts = async () => {
//       try {
//         // Fetch all products
//         const productsResponse = await axios.get(
//           `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts`
//         );

//         const products = productsResponse.data;

//         // Extract unique seller IDs from products
//         const sellerIds = [...new Set(products.map(product => product.seller_id))];

//         // Fetch sellers based on the seller IDs
//         const sellersResponse = await axios.get(
//           `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`, {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
//               Accept: "application/json",
//             },
//           }
//         );

//         const allSellers = sellersResponse.data;
//         const filteredSellers = allSellers.filter(seller => sellerIds.includes(seller.user_id));

//         setSellers(filteredSellers);

//         // Group products by seller_id
//         const productsMap = {};
//         filteredSellers.forEach(seller => {
//           productsMap[seller.user_id] = products.filter(product => product.seller_id === seller.user_id);
//         });
//         setSellerProducts(productsMap);
//         if (filteredSellers.length > 0) {
//           setActiveSeller(filteredSellers[0].user_id); // Set the first seller as active by default
//         }
//       } catch (err) {
//         console.log("Error fetching sellers and products:", err);
//       }
//     };

//     fetchSellersAndProducts();
//   }, []);

//   const handleEnableDisable = async (action, sellerId) => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleSellerProductsStatus`,
//         { seller_id: sellerId, action: action },
//       );

//       setNotification({
//         message: `All products of ${sellers.find(s => s.user_id === sellerId)?.firstname} ${sellers.find(s => s.user_id === sellerId)?.lastname} have been ${action}d successfully.`,
//         type: 'success',
//       });

//       setTimeout(() => setNotification(null), 3000);

//       // Refresh product list for the current seller
//       const updatedProducts = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts?seller_id=${sellerId}`);
//       setSellerProducts(prevState => ({
//         ...prevState,
//         [sellerId]: updatedProducts.data,
//       }));

//     } catch (error) {
//       setNotification({
//         message: `Failed to ${action} products. Please try again.`,
//         type: 'error',
//       });

//       setTimeout(() => setNotification(null), 3000);
//       console.error("Error enabling/disabling products:", error);
//     }
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   const tableData = sellerProducts[activeSeller]?.slice(startIndex, endIndex) || [];

//   return (
//     <div className="fullscreen">
//       <Adminnavbar />
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}
//       <div className="d-md-flex">
//         <div className="col-md-2 selleraccordion">
//           <Adminmenu />
//         </div>
//         <div className="col-md-10">
//           <div className="fullscreen2">
//             <main>
//               <div className="border m-3 rounded">
//                 <div className="d-flex flex-wrap mb-3">
//                   {sellers.map((seller) => (
//                     <button
//                       key={seller.user_id}
//                       className={`btn btn-secondary me-2 ${activeSeller === seller.user_id ? 'active' : ''}`}
//                       onClick={() => setActiveSeller(seller.user_id)}
//                     >
//                       {`${seller.firstname} ${seller.lastname}`}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="table-responsive p-3">
//                   {activeSeller && (
//                     <>
//                       <button
//                         className="btn btn-danger mb-3"
//                         onClick={() => handleEnableDisable('disable', activeSeller)}
//                       >
//                         Disable All Products for {`${sellers.find(s => s.user_id === activeSeller)?.firstname} ${sellers.find(s => s.user_id === activeSeller)?.lastname}`}
//                       </button>
//                       <button
//                         className="btn btn-success mb-3"
//                         onClick={() => handleEnableDisable('enable', activeSeller)}
//                       >
//                         Enable All Products for {`${sellers.find(s => s.user_id === activeSeller)?.firstname} ${sellers.find(s => s.user_id === activeSeller)?.lastname}`}
//                       </button>
//                     </>
//                   )}
//                   <table
//                     id="dynamic-table"
//                     className="table table-striped table-bordered table-hover dataTable no-footer"
//                     role="grid"
//                     aria-describedby="dynamic-table_info"
//                   >
//                     <thead className="">
//                       <tr role="row">
//                         <th className="p-3">Product Id</th>
//                         <th className="sorting p-3" tabIndex="0" aria-controls="dynamic-table">
//                           Product Image
//                         </th>
//                         <th className="sorting p-3" tabIndex="0" aria-controls="dynamic-table">
//                           Product Name
//                         </th>
//                         <th className="hidden-480 sorting p-3" tabIndex="0" aria-controls="dynamic-table">
//                           Seller Name
//                         </th>
//                         <th className="hidden-480 sorting p-3" tabIndex="0" aria-controls="dynamic-table">
//                           Refund Amount
//                         </th>
//                         <th className="hidden-480 sorting p-3" rowSpan="1" colSpan="1">
//                           Status
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.length > 0 ? (
//                         tableData.map((item, index) => (
//                           <tr key={index}>
//                             <td>{item.id}</td>
//                             <td>
//                               <div className="text-center" style={{ width: '100px', height: '100px' }}>
//                                 <img
//                                   src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${JSON.parse(item.image)[0]}`}
//                                   alt="product"
//                                   style={{ maxWidth: '100%', height: '100px', objectFit: 'contain' }}
//                                 />
//                               </div>
//                             </td>
//                             <td>{item.name}</td>
//                             <td>{`${sellers.find(s => s.user_id === activeSeller)?.firstname} ${sellers.find(s => s.user_id === activeSeller)?.lastname}`}</td>
//                             <td>&#36;{item.refundable_amount}</td>
//                             <td>
//                               {item.status === 'enabled' ? (
//                                 <span className="badge bg-success">Enabled</span>
//                               ) : (
//                                 <span className="badge bg-danger">Disabled</span>
//                               )}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan={12} className="text-center">
//                             No Data To Display
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 <Adminpagination
//                   stateData={sellerProducts[activeSeller] || []}
//                   pageSize={pageSize}
//                   setPageSize={setPageSize}
//                   currentPage={currentPage}
//                   setCurrentPage={setCurrentPage}
//                 />
//               </div>
//             </main>
//             <Adminfooter />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Allsellerproducts;
import React, { useEffect, useState } from 'react';
import Adminfooter from './Adminfooter';
import Adminmenu from './Adminmenu';
import Adminnavbar from './Adminnavbar';
import axios from 'axios';
import Adminpagination from './Adminpagination';
import Notification from "../Notification";

const Allsellerproducts = () => {
  const [sellerProducts, setSellerProducts] = useState({});
  const [sellers, setSellers] = useState([]);
  const [activeSeller, setActiveSeller] = useState(null);
  const [notification, setNotification] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // const userToken = JSON.parse(sessionStorage.getItem('user-token'));

  useEffect(() => {
    const fetchSellersAndProducts = async () => {
      try {
        const productsResponse = await axios.get(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts`
        );
        const products = productsResponse.data;
        const sellerIds = [...new Set(products.map(product => product.seller_id))];

        const sellersResponse = await axios.get(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/user`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              Accept: "application/json",
            },
          }
        );

        const allSellers = sellersResponse.data;
        const filteredSellers = allSellers.filter(seller => sellerIds.includes(seller.user_id));

        setSellers(filteredSellers);

        const productsMap = {};
        filteredSellers.forEach(seller => {
          productsMap[seller.user_id] = products.filter(product => product.seller_id === seller.user_id);
        });
        setSellerProducts(productsMap);
        if (filteredSellers.length > 0) {
          setActiveSeller(filteredSellers[0].user_id);
        }
      } catch (err) {
        console.log("Error fetching sellers and products:", err);
      }
    };

    fetchSellersAndProducts();
  }, []);

  const handleEnableDisableAll = async (action, sellerId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleSellerProductsStatus`,
        { seller_id: sellerId, action: action },
      );

      setNotification({
        message: `All products of ${sellers.find(s => s.user_id === sellerId)?.firstname} ${sellers.find(s => s.user_id === sellerId)?.lastname} have been ${action}d successfully.`,
        type: 'success',
      });
      window.location.reload(false)
      setTimeout(() => setNotification(null), 3000);

      const updatedProducts = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts?seller_id=${sellerId}`);
      setSellerProducts(prevState => ({
        ...prevState,
        [sellerId]: updatedProducts.data,
      }));

    } catch (error) {
      setNotification({
        message: `Failed to ${action} products. Please try again.`,
        type: 'error',
      });

      setTimeout(() => setNotification(null), 3000);
      console.error("Error enabling/disabling products:", error);
    }
  };

  const handleEnableDisableProduct = async (action, productId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleProductStatus`,
        { product_id: productId, action: action },
      );

      setNotification({
        message: `Product has been ${action}d successfully.`,
        type: 'success',
      });
      window.location.reload(false)
      setTimeout(() => setNotification(null), 3000);
      const updatedProducts = await axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts?seller_id=${activeSeller}`);
      setSellerProducts(prevState => ({
        ...prevState,
        [activeSeller]: updatedProducts.data,
      }));

    } catch (error) {
      setNotification({
        message: `Failed to ${action} the product. Please try again.`,
        type: 'error',
      });

      setTimeout(() => setNotification(null), 3000);
      console.error("Error enabling/disabling product:", error);
    }
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableData = sellerProducts[activeSeller]?.slice(startIndex, endIndex) || [];

  return (
    <div className="fullscreen">
      <Adminnavbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="d-md-flex">
        <div className="col-md-2 selleraccordion">
          <Adminmenu />
        </div>
        <div className="col-md-10">
          <div className="fullscreen2">
            <main>
              <div className="border m-3 rounded">
                <ul className="nav nav-tabs mb-3">
                  {sellers.map((seller) => (
                    <li className="nav-item" key={seller.user_id}>
                      <button
                        className={`nav-link ${activeSeller === seller.user_id ? 'active' : ''}`}
                        onClick={() => setActiveSeller(seller.user_id)}
                      >
                        {`${seller.firstname} ${seller.lastname}`}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="table-responsive p-3">
                  {activeSeller && (
                    <div className="mb-3">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleEnableDisableAll('disable', activeSeller)}
                      >
                        <i className="bi bi-x-circle-fill me-1"></i> Disable All Products
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEnableDisableAll('enable', activeSeller)}
                      >
                        <i className="bi bi-check-circle-fill me-1"></i> Enable All Products
                      </button>
                    </div>
                  )}
                  <table
                    id="dynamic-table"
                    className="table table-striped table-bordered table-hover"
                    role="grid"
                    aria-describedby="dynamic-table_info"
                  >
                    <thead>
                      <tr>
                        <th className="p-3">Product Id</th>
                        <th className="sorting p-3">Product Image</th>
                        <th className="sorting p-3">Product Name</th>
                        <th className="sorting p-3">Seller Name</th>
                        <th className="sorting p-3">Price</th>
                        <th className="sorting p-3">Status</th>
                        <th className="sorting p-3">Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length > 0 ? (
                        tableData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>
                              <div className="text-center" style={{ width: '100px', height: '100px' }}>
                                <img
                                  src={`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/images/${JSON.parse(item.image)[0]}`}
                                  alt="product"
                                  style={{ maxWidth: '100%', height: '100px', objectFit: 'contain' }}
                                />
                              </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{`${sellers.find(s => s.user_id === activeSeller)?.firstname} ${sellers.find(s => s.user_id === activeSeller)?.lastname}`}</td>
                            <td>&#36;{item.price}</td>
                            <td>{item.status}</td>
                            <td>
                              <button
                                className={`btn btn-sm ${item.status === 'enabled' ? 'btn-success' : 'btn-danger'}`}
                                onClick={() => handleEnableDisableProduct(item.status === 'enabled' ? 'disable' : 'enable', item.id)}
                              >
                                {item.status === 'enabled' ? 'Enabled' : 'Disabled'}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={12} className="text-center">
                            No Data To Display
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Adminpagination
                  stateData={sellerProducts[activeSeller] || []}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </main>
            <Adminfooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allsellerproducts;
