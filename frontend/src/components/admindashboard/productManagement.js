import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../Notification";
import Adminnavbar from "./Adminnavbar";
import Adminpagination from "./Adminpagination";
import Footer from "../footer";
import Confirm from "../confirmalertbox";

export default function Productmanagement() {
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  //eslint-disable-next-line no-unused-vars
  const [viewRowIndex, setViewRowIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    location: "",
    color: "",
    alteration: "",
    size: "",
    measurements: "",
    condition: "",
    age: "",
    quantity: "",
    price: "",
    material: "",
    occasion: "",
    type: "",
    brand: "",
    style: "",
    season: "",
    fit: "",
    length: "",
    notes: "",
    image: [],
  });
  const [sizes, setSizes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [deletedImages, setDeletedImages] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);  // To control modal visibility
  const [idToDelete, setIdToDelete] = useState(null);  // Store the product ID to delete


  const userid = sessionStorage.getItem("user-token");

  useEffect(() => {
    setCurrentPage(1);
    setViewRowIndex(null);
  }, [pageSize]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/sellerproducts`
      )
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setFilteredProducts(
            res.data.filter(
              (item) =>
                item.shop_status === "enabled"
            )
          );
        }
      })
      .catch((err) => console.log(err));
  }, [userid]);


  console.log(filteredProducts)
  // const handleMoveToTop = async (id) => {
  //   // Check if the product is already at position 1
  //   const productToMove = filteredProducts.find((product) => product.id === id);
  
  //   if (productToMove && productToMove.position === 1) {
  //     // If already at position 1, show a message and don't call the API
  //     setNotification({
  //       message: "This product is already at the top.",
  //       type: "error",  // You can change to "error" if you want
  //     });
  //     setTimeout(() => setNotification(null), 3000);

  //     return; // Exit the function, no API call needed
  //   }
  
  //   // Update the UI immediately to reflect the product being moved to the top
  //   const updatedProducts = filteredProducts.filter((product) => product.id !== id);
  
  //   // Move the selected product to the top in the frontend
  //   setFilteredProducts([productToMove, ...updatedProducts]);
  
  //   try {
  //     // Send the update to the backend
  //     const response = await fetch(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/moveproducttotop`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to update product order');
  //     } 
  //     setNotification({
  //       message: "product succesufully updated",
  //       type: "success",  // You can change to "error" if you want
  //     });
  //     setTimeout(() => setNotification(null), 3000);
  //     window.location.reload(false)

  
  //     console.log('Product moved to top in the database');
  //   } catch (error) {
  //     console.error('Error moving product to top:', error);
  //   }
  // };
  
  // const [productsToMove, setProductsToMove] = useState([]);  // Track products to move

  // // const handleMoveToTop = async (id) => {
  // //   // Add product to the list of products to move if not already selected
  // //   if (!productsToMove.includes(id)) {
  // //     setProductsToMove([...productsToMove, id]);
  // //   }
  
  // //   // Update the UI immediately for the first move
  // //   const updatedProducts = filteredProducts.filter((product) => product.id !== id);
  // //   setFilteredProducts([productsToMove, ...updatedProducts]);
  
  // //   // If only one product is selected, process it immediately
  // //   if (productsToMove.length === 1) {
  // //     try {
  // //       const response = await fetch(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/moveproducttotop`, {
  // //         method: 'PUT',
  // //         headers: {
  // //           'Content-Type': 'application/json',
  // //         },
  // //         body: JSON.stringify({ id: productsToMove[0] }),
  // //       });
        
  // //       if (!response.ok) {
  // //         throw new Error('Failed to update product order');
  // //       }
        
  // //       setNotification({
  // //         message: "Product successfully updated",
  // //         type: "success",
  // //       });
  // //       setTimeout(() => setNotification(null), 3000);
  // //     } catch (error) {
  // //       console.error('Error moving product to top:', error);
  // //     }
  // //   }
  // // };
  
  // // When multiple products are selected, the backend needs to adjust their positions sequentially
  // const moveMultipleProductsToTop = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/moveproducttotop`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         selectedProductIds: productsToMove, // Ensure this is an array of IDs
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to move products');
  //     }
  
  //     const data = await response.json();
  //     console.log(data.message); // Success message
  
  //   } catch (error) {
  //     console.error('Error moving products:', error);
  //   }
  // };
  
  
  
  
  // const handleCheckboxChange = (e, id) => {
  //   if (e.target.checked) {
  //     // Add the product to the list if not already in it
  //     setProductsToMove((prev) => [...prev, id]);
  //   } else {
  //     // Remove the product from the list
  //     setProductsToMove((prev) => prev.filter((productId) => productId !== id));
  //   }
  // };
  
  const [selectedIds, setSelectedIds] = useState([]);

  // Function to handle checkbox selection
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  // Function to handle moving a list of products to the top
  const handleMoveToTop = async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      setNotification({
        message: "Please select at least one product to move.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Check if any of the selected products are already at the top
    const productsAtTop = filteredProducts.filter(product => ids.includes(product.id) && product.position === 1);

    if (productsAtTop.length > 0) {
      setNotification({
        message: "Some products are already at the top.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Update the UI immediately to reflect the products being moved to the top
    const productsToMove = filteredProducts.filter(product => ids.includes(product.id));
    const otherProducts = filteredProducts.filter(product => !ids.includes(product.id));

    setFilteredProducts([...productsToMove, ...otherProducts]);

    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/moveproducttotop`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product order');
      }

      setNotification({
        message: "Products successfully moved to the top",
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);

      // Optionally refresh the page to ensure data consistency
      window.location.reload(false);
    } catch (error) {
      console.error('Error moving products to top:', error);
      setNotification({
        message: "An error occurred while moving products.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Function to handle moving a single product to the top
  const handleMoveSingleToTop = async (id) => {
    await handleMoveToTop([id]);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableData = filteredProducts.slice(startIndex, endIndex);


  const handleDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);  // Show the confirmation modal
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleproducts/${idToDelete}`)
      .then((response) => {
        window.location.reload(false);  // Reload the page after deletion
      })
      .catch((error) => {
        console.error(error);
      });
    setShowConfirm(false);  // Close the modal
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);  // Hide the modal if user cancels
  };

  const handleEdit = (id, initialData) => {
    setEditingId(id);
    const parsedImage = initialData.image ? JSON.parse(initialData.image) : [];
    setFormData({
      id: initialData.id,
      name: initialData.name,
      description: initialData.description,
      location: initialData.location,
      color: initialData.color,
      alteration: initialData.alteration,
      size: initialData.size,
      measurements: initialData.measurements,
      condition: initialData.condition,
      age: initialData.age,
      quantity: initialData.quantity,
      price: initialData.price,
      material: initialData.material,
      occasion: initialData.occasion,
      type: initialData.type,
      brand: initialData.brand,
      style: initialData.style,
      season: initialData.season,
      fit: initialData.fit,
      length: initialData.length,
      notes: initialData.notes,
      image: parsedImage,
      accepted_by_admin: "true"
    });
    setSizes(getSizesForProductType(initialData.product_type));
  };

  const getSizesForProductType = (producttype) => {
    let newSizes = [];
    if (producttype === "women") {
      newSizes = ["NA", "XS", "S", "M", "L", "XL"];
    } else if (producttype === "kids") {
      newSizes = [
        "NA",
        "0-2 Years",
        "2-4 Years",
        "4-6 Years",
        "6-8 Years",
        "8-10 Years",
        "10-15 Years",
      ];
    } else if (producttype === "jewellery") {
      // Assuming jewellery doesn't have sizes
      newSizes = [];
    }
    return newSizes;
  };

  const [errors, setErrors] = useState({});

  const handleKeyup = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (name === "name" && value.length > 90) {
      newErrors.name = "Product name must be less than 90 characters";
    } else {
      delete newErrors.name;
    }
    setErrors(newErrors);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const capitalizeWords = (str) => {
  //     return str
  //       .split(" ")
  //       .map((word) => {
  //         return word.charAt(0).toUpperCase() + word.slice(1);
  //       })
  //       .join(" ");
  //   };
  //   const capitalizedValue = capitalizeWords(value);

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: capitalizedValue,
  //   }));
  //   handleKeyup(e, capitalizedValue);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Directly set the value without modifying it
    }));
    handleKeyup(e, value); // Pass the value as is
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...formData.image];
    const removedImage = updatedImages.splice(index, 1)[0];
    setFormData((prevData) => ({
      ...prevData,
      image: updatedImages,
    }));

    setDeletedImages((prevDeleted) => [...prevDeleted, removedImage]);
  };


  // const handleSubmitEdit = async (e) => {
  //   e.preventDefault();

  //   // if (formData.image.length < 2) {
  //   //   setErrors((prevErrors) => ({
  //   //     ...prevErrors,
  //   //     image: "You must have at least 2 images or videos.",
  //   //   }));
  //   //   return;
  //   // }

  //   // if (formData.image.length > 6) {
  //   //   setErrors((prevErrors) => ({
  //   //     ...prevErrors,
  //   //     image: "You can only upload up to 6 images or videos.",
  //   //   }));
  //   //   return;
  //   // }
  //   // setDisabled(true)

  //   try {
  //     const formDataToSend = new FormData();

  //     // Filter out empty or null fields from formData
  //     const filteredFormData = {};
  //     Object.keys(formData).forEach((key) => {
  //       if (formData[key]) {
  //         filteredFormData[key] = formData[key];
  //       }
  //     });

  //     // Append non-file form data
  //     Object.keys(filteredFormData).forEach((key) => {
  //       if (key !== 'image') {
  //         formDataToSend.append(key, filteredFormData[key]);
  //       }
  //     });
  //     console.log(filteredFormData)
  //     // Append image files
  //     // filteredFormData.image.forEach((imageObj) => {
  //     //   if (imageObj.file) {
  //     //     formDataToSend.append('images', imageObj.file);
  //     //   }
  //     // });

  //     // Append deleted images
  //     // formDataToSend.append('deletedImages', JSON.stringify(deletedImages));
  //     // eslint-disable-next-line no-unused-vars
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleproducts/${formData.id}`,
  //       formDataToSend,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     setNotification({ message: 'Product updated successfully', type: 'success' });
  //     setTimeout(() => {
  //       setNotification(null);
  //       setDeletedImages([]);
  //       window.location.reload(false); // Reload the page or update state as necessary
  //     }, 1000);

  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //     setDisabled(false);
  //   }
  // };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // Validation for image count
    // if (formData.image.length < 2) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     image: "You must have at least 2 images or videos.",
    //   }));
    //   return;
    // }

    // if (formData.image.length > 6) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     image: "You can only upload up to 6 images or videos.",
    //   }));
    //   return;
    // }

    // setDisabled(true);

    try {
      const formDataToSend = new FormData();

      // Filter out empty or null fields from formData
      const filteredFormData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          filteredFormData[key] = formData[key];
        }
      });

      // Append other non-image fields
      Object.keys(filteredFormData).forEach((key) => {
        if (key !== "image") {
          formDataToSend.append(key, filteredFormData[key]);
        }
      });


      // Append images in the new order
      // filteredFormData.image.forEach((imageObj) => {
      //   // For each image, append its file to the FormData object
      //   if (imageObj.file) {
      //     formDataToSend.append("images", imageObj.file);
      //   }
      // });

      // If there are any deleted images, append them
      // formDataToSend.append("deletedImages", JSON.stringify(deletedImages));

      // Send the request to the backend
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/handleproducts/${formData.id}`,
        filteredFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setNotification({
          message: "Product updated successfully",
          type: "success",
        });

        // Wait for notification to show before reloading
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setDeletedImages([]); // Clear deleted images array
        window.location.reload(false); // Reload page
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setDisabled(false);

      setNotification({
        message: "Failed to update product",
        type: "error",
      });

      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSetCoverPhoto = (index) => {

    const updatedImages = [...formData.image]; // Copy the current images array
    const coverImage = updatedImages[index]; // Get the image to be set as cover

    // Remove the selected image from its current position
    updatedImages.splice(index, 1);

    // Insert the selected image at the front of the array (set as cover)
    updatedImages.unshift(coverImage);

    // Update the formData state with the new image order
    setFormData((prevData) => ({
      ...prevData,
      image: updatedImages, // Update the 'image' array with the new order
    }));
  };
  return (
    <div className="">
      <Adminnavbar />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      <div className="">
        {/* <div className="col-md-2 selleraccordion">
          <Adminmenu />
        </div> */}
        <div className="container">
          <div className="fullscreen2">
            <main>
              <div className="text-center p-3">
                <h6> <i><span className="" style={{ color: "blue", fontSize: "25px" }}>Admin</span></i> Dashboard</h6>
              </div>
              <div className="m-2 ps-md-4">
                <h1 style={{ fontSize: "28px" }}>Product Management</h1>
              </div>

              <div className=" m-md-3 rounded">
                <div className="table-responsive p-md-3">
                <button
        className="btn btn-outline-info m-1"
        onClick={() => handleMoveToTop(selectedIds)}
      >
        Move Selected to Top
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredProducts.length > 0 ? (
    filteredProducts
      .sort((a, b) => {
        // If one product has position 0, it should come last
        if (a.position === 0) return 1;
        if (b.position === 0) return -1;
        return a.position - b.position; // Sort other products by their positions
      })
      .map((item, index) => (
        <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              value={item.id}
              onChange={(e) => handleCheckboxChange(e, item.id)}
            />
          </td>
          <td>{item.id}</td>
          <td style={{ width: "100px", height: "100px" }}>
            <img
              src={JSON.parse(item.image)[0]}
              alt="sellerproduct"
              style={{
                maxWidth: "100%",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </td>
          <td style={{ maxWidth: "200px" }}>{item.name}</td>
          <td>${item.price}.00</td>
          <td>
            {item.accepted_by_admin === "true" ? (
              <span className="text-success" style={{ fontWeight: "600" }}>
                Approved
              </span>
            ) : item.rejection_reason ? (
              <>
                <div>
                  <span className="text-danger" style={{ fontWeight: "600" }}>
                    Rejected
                  </span>
                </div>
                <div>Reason: {item.rejection_reason}</div>
              </>
            ) : (
              <span className="text-warning" style={{ fontWeight: "600" }}>
                ...Pending
              </span>
            )}
          </td>
          <td>
            <button
              className="btn btn-outline-primary m-1"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={() => handleEdit(item.id, item)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger m-1"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-outline-info m-1"
              onClick={() => handleMoveSingleToTop(item.id)}
            >
              Move to Top
            </button>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center">
        No Data To Display
      </td>
    </tr>
  )}
</tbody>


      </table>
                </div>

                <Adminpagination
                  stateData={filteredProducts}
                  setViewRowIndex={setViewRowIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </main>
            {/* <Adminfooter /> */}
          </div>
        </div>

      </div>
      <Footer />
      {/* Modal for editing product */}
      {editingId !== null && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        // onClick={() => setEditingId(null)}  

        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitEdit}>
                  {/* {formData.image !== "NA" && formData.image !== null && (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-bolder">Current Files</label>
                        <div className="d-flex flex-wrap">
                          {formData.image && formData.image.length > 0 ? (
                            formData.image.map((mediaObj, index) => (
                              <div key={index} className="me-2 mb-2 position-relative">
                                {mediaObj.file ? (
                                  mediaObj.type === 'image' ? (
                                    <img
                                      src={mediaObj.preview}
                                      alt={`Product ${index + 1}`}
                                      className="img-thumbnail"
                                      style={{ width: '100px', height: '100px', objectFit: 'contain', alignSelf: "center" }}
                                    />
                                  ) : (
                                    <video
                                      src={mediaObj.preview}
                                      controls
                                      className="img-thumbnail"
                                      style={{ width: '100px', height: '100px', objectFit: 'contain', alignSelf: "center" }}
                                    ></video>
                                  )
                                ) : (
                                  getMediaType(mediaObj) === 'image' ? (
                                    <img
                                      src={mediaObj}
                                      alt={`Product ${index + 1}`}
                                      className="img-thumbnail"
                                      style={{ width: '100px', height: '100px', objectFit: 'contain', alignSelf: "center" }}
                                    />
                                  ) : (
                                    <video
                                      src={mediaObj}
                                      controls
                                      className="img-thumbnail"
                                      style={{ width: '100px', height: '100px', objectFit: 'contain', alignSelf: "center" }}
                                    ></video>
                                  )
                                )}
                                <button
                                  type="button"
                                  className="btn-close rounded-circle bg-white position-absolute top-0 end-0 m-2"
                                  style={{ padding: "5px", fontSize: "16px" }}
                                  aria-label="Close"
                                  onClick={() => handleDeleteImage(index)}
                                ></button>
                              </div>
                            ))
                          ) : (
                            <p>No media available</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="productImages" className="form-label fw-bolder">
                          Add Photo / Video
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="productImages"
                          name="images"
                          multiple
                          onChange={handleImageChange}
                          accept="image/*,video/*"
                        />
                        {errors.image && <p className="text-danger">{errors.image}</p>}
                      </div>
                    </>
                  )} */}
                  {formData.image && formData.image.length > 0 ? (
                    <div className="mb-3">
                      <label className="form-label fw-bolder">Current Files</label>
                      <div className="d-flex flex-wrap">
                        {formData.image.map((mediaObj, index) => {
                          // Log the media object for debugging
                          // console.log('mediaObj:', mediaObj);

                          // Ensure that mediaObj has a URL or preview
                          const preview = mediaObj.preview || mediaObj;

                          // Check if preview is undefined or empty
                          if (!preview) {
                            return <p key={index}>Unsupported media type (no preview)</p>;
                          }

                          // Determine if the media is an image based on file extension
                          const isImage = preview.match(/\.(jpeg|jpg|gif|png)$/i);

                          // Determine if the media is a video based on file extension
                          const isVideo = preview.match(/\.(mp4|webm|ogg|avi|mov|quicktime)$/i);

                          return (
                            <div key={index} className="me-2 mb-2 position-relative">
                              {/* If it's an image, render an image element */}
                              {isImage ? (
                                <>
                                  <img
                                    src={preview}
                                    alt={`Product ${index + 1}`}
                                    className="img-thumbnail"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "contain",
                                      alignSelf: "center",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary position-absolute bottom-0 start-0 m-2"
                                    style={{ zIndex: 10, fontSize: "12px" }}
                                    onClick={() => handleSetCoverPhoto(index)} // Set as cover function
                                  >
                                    Set as Cover
                                  </button>
                                </>) : isVideo ? (
                                  // If it's a video, render a video element
                                  <video
                                    src={preview}
                                    controls
                                    className="img-thumbnail"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "contain",
                                      alignSelf: "center",
                                    }}
                                  ></video>
                                ) : (
                                // If it's neither an image nor video, show an unsupported message
                                <p>Unsupported media type</p>
                              )
                              }

                              {/* Close button for deleting the image or video */}
                              <button
                                type="button"
                                className="btn-close rounded-circle bg-white position-absolute top-0 end-0 m-2"
                                style={{ padding: "5px", fontSize: "16px" }}
                                aria-label="Close"
                                onClick={() => handleDeleteImage(index)} // Handle delete media
                              ></button>
                            </div>
                          );
                        })}
                      </div>
                      {errors.image && <p className="text-danger">{errors.image}</p>}
                    </div>
                  ) : (
                    <p>No media available</p>
                  )}

                  {formData.name !== "NA" && formData.name !== null && (
                    <div className="mb-3">
                      <label htmlFor="productName" className="form-label fw-bolder">
                        Product Name
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="name"
                          placeholder="Product Name"
                          value={formData.name}
                          onChange={(e) => {
                            handleChange(e);
                            handleKeyup(e);
                          }}
                          title="Enter product name less than 90 chars"
                          required
                        />
                        <span className="text-danger fs-4"> &nbsp;*</span>
                        {errors.name && (
                          <span className="text-danger fs-6">
                            {errors.name}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {formData.description !== "NA" && formData.description !== null && (
                    <div className="mb-3">
                      <label
                        htmlFor="productDescription"
                        className="form-label fw-bolder"
                      >

                        Description
                      </label>
                      <div className="d-flex">

                        <textarea
                          className="form-control"
                          id="productDescription"
                          name="description"
                          placeholder="Product Description"
                          value={formData.description}
                          onChange={handleChange}
                          // required
                        />
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}

                  {formData.color !== "NA" && formData.color !== null && (
                    <div className="mb-3">
                      <label htmlFor="productColor" className="form-label fw-bolder">
                        Color
                      </label>
                      <div className="d-flex">

                        <input
                          type="text"
                          className="form-control"
                          id="productColor"
                          name="color"
                          placeholder="Color"
                          value={formData.color}
                          onChange={handleChange}
                          // required
                        />
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.location !== "NA" && formData.location !== null && (
                    <div className="mb-3">
                      <label htmlFor="productLocation" className="form-label fw-bolder">
                        Location
                      </label>
                      <div className="d-flex">

                        <input
                          type="text"
                          className="form-control"
                          id="productLocation"
                          name="location"
                          placeholder="Location"
                          value={formData.location}
                          onChange={handleChange}
                          // required
                        />
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.alteration !== "NA" && (
                    <div className="mb-3">
                      <label htmlFor="productAlteration" className="form-label fw-bolder">
                        Alteration
                      </label>
                      <div className="d-flex">
                        <select
                          id="productAlteration"
                          name="alteration"
                          value={formData.alteration}
                          className="form-select"
                          onChange={handleChange}
                          // required
                        >
                          <option value="">Select Alteration</option>
                          <option value="NA">NA</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.size !== "NA" && (
                    <div className="mb-3">
                      <label htmlFor="productSize" className="form-label fw-bolder fw-bolder">
                        Size
                      </label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          id="productSize"
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                          // required
                        >
                          {sizes.map((size, index) => (
                            <option key={index} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.measurements !== "NA" && formData.measurements !== null && (
                    <div className="mb-3">
                      <label
                        htmlFor="productMeasurements"
                        className="form-label fw-bolder"
                      >
                        Measurements
                      </label>
                      <div className="d-flex">
                        <input
                          type="number"
                          className="form-control"
                          id="productMeasurements"
                          name="measurements"
                          placeholder="In Inches"
                          value={formData.measurements}
                          onChange={handleChange}
                          min={1}
                          // required
                        />
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.condition !== "NA" && (
                    <div className="mb-3">
                      <label htmlFor="productCondition" className="form-label fw-bolder">
                        Condition
                      </label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          id="productCondition"
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          // required
                        >
                          <option value="">Select Condition</option>
                          <option value="NA">NA</option>
                          <option value="Brand New">Brand New</option>
                          <option value="Like New">Like New</option>
                          <option value="Excellent">Used - Excellent</option>
                          <option value="Good">Used - Good</option>
                          <option value="Fair">Used - Fair</option>
                        </select>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}

                      </div>
                    </div>
                  )}
                  {formData.age !== "NA" && (
                    <div className="mb-3">
                      <label htmlFor="productAge" className="form-label fw-bolder">
                        Style
                      </label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          id="productAge"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          // required
                        >
                          <option value="">Select Age</option>
                          <option value="NA">NA</option>
                          <option value="Modern">Modern</option>
                          <option value="00s">00s</option>
                          <option value="90s">90s</option>
                          <option value="80s">80s</option>
                          <option value="80s">80s</option>
                          <option value="60s">60s</option>
                          <option value="50s">50s</option>
                          <option value="Antique">Antique</option>
                        </select>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  {formData.quantity !== "NA" && (
                    <div className="mb-3">
                      <label
                        htmlFor="ProductQuantity"
                        className="form-label fw-bolder"
                      >
                        Quantity
                      </label>
                      <div className="d-flex">
                        {/* <select
                        className="form-select"
                        id="ProductQuantity"
                        name="quantity"
                        placeholder="Enter Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select> */}
                        <input
                          type="number"
                          className="form-control"
                          id="ProductQuantity"
                          name="quantity"
                          placeholder="Enter Quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min="1"
                          max="99"
                          required
                        />
                        <span className="text-danger fs-4"> &nbsp;*</span>
                      </div>
                    </div>
                  )}
                  {formData.price !== "NA" && formData.price !== null && (
                    <div className="mb-3">
                      <label htmlFor="productPrice" className="form-label fw-bolder">
                        Price
                      </label>
                      <div className="d-flex">
                      <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        name="price"
                        placeholder="&#36;"
                        value={formData.price}
                        onChange={handleChange}
                        min="1"
                        pattern="[0-9]+"
                        title="Price must be positive numbers"
                        required
                      />
                      <span className="text-danger fs-4"> &nbsp;*</span>
                      </div>
                    </div>
                  )}
                  {formData.material !== "NA" && (
                    <div className="mb-3">
                      <label htmlFor="productMaterial" className="form-label fw-bolder">
                        Material
                      </label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          id="productMaterial"
                          name="material"
                          value={formData.material}
                          onChange={handleChange}
                          placeholder="Material (eg. Silk,Cotton etc.)"
                          // required
                        >
                          <option value="">Select Material</option>
                          <option value="NA">NA</option>
                          <option value="Silk">Silk</option>
                          <option value="Cotton">Cotton</option>
                          <option value="Crepe">Crepe</option>
                          <option value="Net">Net</option>
                          <option value="Georgette">Georgette</option>
                          <option value="Rayon">Rayon</option>
                          <option value="Polyester">Polyester</option>
                          <option value="Wool">Wool</option>
                          <option value="Linen">Linen</option>
                          <option value="Nylon">Nylon</option>
                          <option value="Denim">Denim</option>
                          <option value="Leather">Leather</option>
                          <option value="Velvet">Velvet</option>
                          <option value="Spandex (Elastane)">
                            Spandex (Elastane)
                          </option>
                        </select>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}

                      </div>
                    </div>
                  )}
                  {/* {formData.occasion !== "NA" && formData.occasion !== null && ( */}
                  <div className="mb-3">
                    <label htmlFor="productOccasion" className="form-label fw-bolder">
                      Occasion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productOccasion"
                      name="occasion"
                      placeholder="Function, Party, Birthdays"
                      value={formData.occasion}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                  {/* )} */}
                  {/* {formData.type !== "NA" && formData.type !== null && ( */}
                  <div className="mb-3">
                    <label htmlFor="productType" className="form-label fw-bolder">
                      Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productType"
                      name="type"
                      placeholder="Designer, Homemade, Repaired"
                      value={formData.type}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                  {/* )} */}
                  {/* {formData.brand !== "NA" && formData.brand !== null  && ( */}
                  <div className="mb-3">
                    <label htmlFor="productBrand" className="form-label fw-bolder">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productBrand"
                      name="brand"
                      placeholder="Enter Brand Name"
                      value={formData.brand}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                  {/* )} */}
                  {/* {formData.style !== "NA" && formData.style !== null && ( */}
                  {/* <div className="mb-3">
                      <label htmlFor="productStyle" className="form-label fw-bolder">
                        Style
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productStyle"
                        name="style"
                        placeholder="Enter Style"
                        value={formData.style}
                        onChange={handleChange}
                        // required
                      />
                    </div> */}
                  {/* )} */}
                  {/* {formData.season !== "NA" && formData.season !== null && ( */}
                  <div className="mb-3">
                    <label htmlFor="productSeason" className="form-label fw-bolder">
                      Season
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productSeason"
                      name="season"
                      placeholder="Summer, Winter, Spring"
                      value={formData.season}
                      onChange={handleChange}
                    // required
                    />
                  </div>
                  {/* )} */}
                  {/* {formData.fit !== "NA" && formData.fit !== null && ( */}
                  {/* <div className="mb-3">
                      <label htmlFor="productFit" className="form-label fw-bolder">
                        Fit
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productFit"
                        name="fit"
                        placeholder="Enter Fit"
                        value={formData.fit}
                        onChange={handleChange}
                        // required
                      />
                    </div> */}
                  {/* )} */}
                  {/* {formData.length !== "NA" && formData.length !== null && ( */}
                  <div className="mb-3">
                    <label htmlFor="productLength" className="form-label fw-bolder">
                      Length
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productLength"
                      name="length"
                      placeholder="In Meters"
                      value={formData.length}
                      onChange={handleChange}
                      min={1}
                    // required
                    />
                  </div>
                  {/* )} */}
                  {formData.notes !== "" && formData.notes !== null && (
                    <div className="mb-3">
                      <label htmlFor="ProductNotes" className="form-label fw-bolder">
                        Notes
                      </label>
                      <div className="d-flex">
                        <textarea
                          className="form-control"
                          id="ProductNotes"
                          name="notes"
                          placeholder="Notes (Optional)"
                          value={formData.notes}
                          onChange={handleChange}
                        // required
                        ></textarea>
                        {/* <span className="text-danger fs-4"> &nbsp;*</span> */}
                      </div>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary" disabled={disabled}>
                    Save Changes
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


app.put('/moveproducttotop', async (req, res) => {
    const { ids } = req.body; // Expecting an array of IDs
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).send({ message: 'Invalid input: IDs must be an array and cannot be empty' });
    }
  
    try {
      // Start a transaction to ensure atomic updates
      await db.query('BEGIN');
  
      // Step 1: Find the highest position currently occupied
      const maxPositionResult = await db.query('SELECT MAX(position) AS maxPosition FROM products WHERE position >= 1');
      const maxPosition = (maxPositionResult[0] && maxPositionResult[0].maxPosition !== null) 
        ? maxPositionResult[0].maxPosition 
        : 0;
  
      // Step 2: Shift all products down to make space for the new products
      await db.query('UPDATE products SET position = position + ? WHERE position >= 1 AND id NOT IN (?)', [ids.length, ids]);
  
      // Step 3: Update the selected products' positions sequentially starting from position 1
      let newPosition = 1;
      for (const id of ids) {
        await db.query('UPDATE products SET position = ? WHERE id = ?', [newPosition, id]);
        newPosition++;
      }
  
      // Step 4: Commit the transaction to apply the changes
      await db.query('COMMIT');
      console.log('Transaction committed successfully');
  
      res.status(200).send({ message: 'Products moved to top successfully' });
    } catch (error) {
      // Rollback the transaction if anything goes wrong
      await db.query('ROLLBACK');
      console.error('Error updating product positions:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  