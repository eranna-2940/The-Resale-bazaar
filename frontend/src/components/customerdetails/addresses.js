import React, { useEffect, useState } from "react";
import axios from "axios";
import MyNavbar from "../navbar";
import Customermenu from "./Customermenu";
import Footer from "../footer";
import Customerbanner from "./Customerbanner";

export default function Addresses() {
  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress,setBillingAddress]=useState([])
  const [editingId, setEditingId] = useState(null);
  const [editingId1, setEditingId1] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    state: "",
    city: "",
    address1: "",
    pincode: "",
  });
  const [formData1, setFormData1] = useState({
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    state: "",
    city: "",
    address1: "",
    pincode: "",
  });
 useEffect (()=>{
         axios.get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveBillingAddress`)
         .then((res)=>{
            if(res.data !== "Fail" && res.data !== "Error"){
              const userid = sessionStorage.getItem("user-token")
                 setBillingAddress(res.data.filter((item)=> item.user_id === parseInt(userid)))
            }
         }).catch((err)=>{
          console.log(err)
         })
 },[billingAddress])
  useEffect(() => {
         axios.get(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveShippingAddress`).then((res)=>{
            if (res.data !== "Fail" && res.data !== "Error") {
              const userid = sessionStorage.getItem("user-token");
              setShippingAddress(
                res.data.filter((item) => item.user_id === parseInt(userid))
              );
            }
          }).catch ((error)=> {
        console.log("Error fetching addresses:", error);
      })

  }, [shippingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData(address);
  };
  const handleEdit1 = (address) => {
    setEditingId1(address.id);
    setFormData1(address);
  };
  const handleDelete = async (addressId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveShippingAddress/${addressId}`
      );
      setShippingAddress(shippingAddress.filter((item) => item.id !== addressId));
      alert("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };
  const handleDelete1 = async (addressId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveBillingAddress/${addressId}`
      );
      setBillingAddress(billingAddress.filter((item) => item.id !== addressId));
      alert("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Update shipping address if editingId is present
      if (editingId) {
        const response = await axios.put(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveShippingAddress/${editingId}`,
          formData
        );
        setShippingAddress(
          shippingAddress.map((item) =>
            item.id === editingId ? response.data : item
          )
        );
      }
  
      // Update billing address if editingId1 is present
      if (editingId1) {
        const response = await axios.put(
          `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/saveBillingAddress/${editingId1}`,
          formData1
        );
        setBillingAddress(
          billingAddress.map((item) =>
            item.id === editingId1 ? response.data : item
          )
        );
      }
  
      alert("Address updated successfully");
  
      // Reset the editing IDs after update
      setEditingId(null);
      setEditingId1(null);
  
      // Optionally clear the form fields after successful submission
      setFormData({
        // Set initial state here (e.g., empty fields)
      });
      setFormData1({
        // Set initial state here (e.g., empty fields)
      });
  
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setEditingId1(null)
  };

  const shippingAddressTable =(shippingAddress)=>{
    return(
 <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Address1</th>
                      <th>Pincode</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingAddress.map((item) => (
                      <tr key={item.id}>
                        {editingId === item.id ? (
                          <>
                            <td>
                              <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={handleSubmit}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.country}</td>
                            <td>{item.state}</td>
                            <td>{item.city}</td>
                            <td>{item.address1}</td>
                            <td>{item.pincode}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    )
  }

  const billingAddressTable =(billingAddress)=>{
    return(
 <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Address1</th>
                      <th>Pincode</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingAddress.map((item) => (
                      <tr key={item.id}>
                        {editingId1 === item.id ? (
                          <>
                            <td>
                              <input
                                type="text"
                                name="firstname"
                                value={formData1.firstname}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="lastname"
                                value={formData1.lastname}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="country"
                                value={formData1.country}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="state"
                                value={formData1.state}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="city"
                                value={formData1.city}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="address1"
                                value={formData1.address1}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="pincode"
                                value={formData1.pincode}
                                onChange={handleInputChange1}
                                className="form-control"
                                required
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={handleSubmit}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.country}</td>
                            <td>{item.state}</td>
                            <td>{item.city}</td>
                            <td>{item.address1}</td>
                            <td>{item.pincode}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit1(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete1(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    )
  }
  return (
    <div className="fullscreen">
      <MyNavbar />
      <main>
        <Customerbanner />
        <div className="d-lg-flex justify-content-around p-2 ps-lg-5 pe-lg-5">
          <div className="col-lg-3 col-xs-12 col-md-12 p-lg-4 p-2">
            <Customermenu />
          </div>

          <div className="col-xs-12 col-md-12 col-lg-9 p-lg-4 p-2">
            {(shippingAddress.length > 0  || billingAddress.length > 0)? (
             
              <div>
              <ul className="nav nav-tabs" id="offersTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="Shipping-Address-tab" data-bs-toggle="tab" data-bs-target="#Shipping-Address" type="button" role="tab" aria-controls="Shipping-Address" aria-selected="true">Shipping Address</button>
                  </li>
                  <li className="nav-item" role="presentation">
                      <button className="nav-link" id="customer-offers-tab" data-bs-toggle="tab" data-bs-target="#customer-offers" type="button" role="tab" aria-controls="customer-offers" aria-selected="false">Billing Address</button>
                  </li>
              </ul>
              <div className="tab-content" id="offersTabsContent">
                  <div className="tab-pane fade show active" id="Shipping-Address" role="tabpanel" aria-labelledby="Shipping-Address-tab">
                      {shippingAddressTable(shippingAddress, true)}
                  </div>
                  <div className="tab-pane fade" id="customer-offers" role="tabpanel" aria-labelledby="customer-offers-tab">
                      {billingAddressTable(billingAddress, false)}
                  </div>
              </div>
          </div>

            ) : (
              <p className="fs-6">No Addresses</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
