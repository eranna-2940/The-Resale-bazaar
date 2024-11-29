import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Spinner, Alert } from 'react-bootstrap';
import Adminnavbar from './Adminnavbar';
import Footer from '../footer';
import Notification from '../Notification';
import Adminpagination from './Adminpagination';
import Adminmenu from './Adminmenu';
function Faqsolution() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState(""); 
  const [replyToId, setReplyToId] = useState(null);
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [notification, setNotification] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
  const [viewRowIndex, setViewRowIndex] = useState(null);

  // Fetch FAQ data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/contact`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setFaqData(res.data);
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

  // Handle reply change
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  // Handle reply submit
  const handleReplySubmit = (email) => {
    if (reply.trim() === "") {
      setNotification({ message: 'Please write a reply before submitting.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/contact/${email}`, { reply })
      .then((res) => {
        if (res.status === 200) {
          // Update the FAQ data with the new reply (optimistic UI)
          setFaqData(faqData.map(item => 
            item.email === email ? { ...item, reply: res.data.reply } : item
          ));
          setReply(""); 
          setReplyToId(null); 
          setShowModal(false); 
          setNotification({ message: 'Reply successfully', type: 'success' });
                setTimeout(() => setNotification(null), 3000);
                window.location.reload(false)
        }
      })
      .catch((err) => {
        setNotification({ message: 'Error while adding product. Please try again filling all the fields', type: 'error' });
        setTimeout(() => setNotification(null), 3000);
        console.error("Error updating reply", err);
        setError("Error updating reply. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyToId(null); // Reset the reply target
  };

  const handleOpenModal = (id) => {
    setReplyToId(id);
    setShowModal(true);
  };

 
  useEffect(() => {
    setCurrentPage(1);
    setViewRowIndex(null);
  }, [pageSize]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableData = faqData.slice(startIndex, endIndex);

  

  return (
    <>
     <div className="fullscreen">
     <Adminnavbar/>
     {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

     <div className="d-md-flex">
        <div className="col-md-2 selleraccordion">
          <Adminmenu />
        </div>
        <div className="col-md-10">
          <div className="fullscreen2">
    <div className="container my-5">
    <div className="fullscreen2">
    <div className="text-center p-3">
                <h6> <i><span className="" style={{ color: "blue", fontSize: "25px" }}>Admin</span></i> Dashboard</h6>
              </div>
              <div className="m-2 ps-md-4">
                <h1 style={{ fontSize: "28px" }}>Faqs</h1>
              </div>
      <main>

      {/* Error handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Table displaying FAQ data */}
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
                <th>Reply</th>
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
                  <td>
                    {item.solution ? (
                      <blockquote className="blockquote">
                        <p className='fs-6'>Replied</p>
                      </blockquote>
                    ) : (
                      <span>Awaiting Response</span>
                    )}
                  </td>
                  <td>
                    {/* Show reply button if no reply exists */}
                   
                      <Button
                        variant="info"
                        onClick={() => handleOpenModal(item.email)}
                        disabled={item.solution}
                      >
                        Reply
                      </Button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Adminpagination
                  stateData={faqData}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setViewRowIndex={setViewRowIndex}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
        </div>
        
      )}

      {/* Pagination controls */}
      {/* <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </Button>
      </div> */}

      {/* Modal for replying */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

          <textarea
            className="form-control"
            value={reply}
            onChange={handleReplyChange}
            placeholder="Write your reply here..."
            rows="4"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleReplySubmit(replyToId)}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Reply"}
          </Button>
        </Modal.Footer>
      </Modal>
      </main>
      </div>
    </div>
    </div>
    </div>
    </div>
    <Footer/>
    </div>
    </>
  );
}

export default Faqsolution;
