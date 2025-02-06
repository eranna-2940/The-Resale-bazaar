import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap"; // For styling and modal
import Adminnavbar from "./Adminnavbar";
import Footer from "../footer";
import Notification from "../Notification";
import Adminpagination from "./Adminpagination";
import Scrolltotopbtn from "../Scrolltotopbutton";

function LargeInventoryRequest() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);  // Store selected enquiry to reply to
  const [replyMessage, setReplyMessage] = useState("");  // Store the reply message
  const [showModal, setShowModal] = useState(false);  // Modal visibility state

  useEffect(() => {
    // Fetch data for large inventory enquiries
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/largeinventorycontact`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setInventoryData(res.data);  // Store the enquiry data
        }
      })
      .catch((err) => {
        console.error("Error fetching FAQ data", err);
        setError("Error fetching FAQ data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableData = inventoryData.slice(startIndex, endIndex);

  const handleReplyClick = (enquiry) => {
    setSelectedEnquiry(enquiry);  // Set the selected enquiry to be replied to
    setReplyMessage("");  // Clear previous messages
    setShowModal(true);  // Open the modal for reply
  };

  const handleReplySubmit = () => {
    // Ensure that the reply message is not empty
    if (!replyMessage.trim()) {
        setNotification({
            message: "Please enter a reply message.",
            type: "danger",
          });
      return;
    }

    // Send the reply to backend API
    axios
      .post(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/replyToEnquiry`, {
        enquiryId: selectedEnquiry.id,
        replyMessage: replyMessage,
        userEmail: selectedEnquiry.email,
      })
      .then((response) => {
        // If the reply is sent successfully
        setInventoryData((prevData) =>
          prevData.map((enquiry) =>
            enquiry.id === selectedEnquiry.id
              ? { ...enquiry, solution: replyMessage, status: "Replied" }
              : enquiry
          )
        );
        setShowModal(false);  // Close the modal
        setNotification({
          message: "Reply sent successfully!",
          type: "success",
        });
        setTimeout(() => {
            setNotification(null);
            window.location.reload(false);
           },3000);
      })
      .catch((error) => {
        console.error("Error replying to enquiry:", error);
        setNotification({
          message: "Failed to send reply.",
          type: "danger",
        });
      });
  };

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

      <div className="container my-5">
        <div className="fullscreen2">
          <div className="text-center p-3">
            <h6>
              <i>
                <span
                  className=""
                  style={{ color: "blue", fontSize: "25px" }}
                >
                  Admin
                </span>
              </i>{" "}
              Dashboard
            </h6>
          </div>
          <div className="m-2 ps-md-4">
            <h1 style={{ fontSize: "28px" }}>Large Inventory Enquiries</h1>
          </div>
          <main>
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Enquiry</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.enquiry}</td>
                        <td>{item.status}</td>
                        <td>
                          <Button
                            variant="info"
                            className="w-100"
                            onClick={() => handleReplyClick(item)}
                            disabled={item.status === "Replied"}
                          >
                            Reply
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Adminpagination
                  stateData={inventoryData}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal for replying to enquiry */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="replyMessage">
              <Form.Label>Reply Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReplySubmit}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
      <Scrolltotopbtn />
    </div>
  );
}

export default LargeInventoryRequest;
