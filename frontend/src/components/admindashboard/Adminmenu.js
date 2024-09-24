import React from 'react'
import { Link } from 'react-router-dom'

export default function Adminmenu() {
  return (
    <div>      
    <div className="mb-4 menumain">
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
          <button
            className="accordion-button collapsed p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            <div>
              <span>
                {" "}
                <b><i className="bi bi-book-half"></i> Catalog</b>
              </span>
            </div>
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body p-0">
            <ul className="list-group">
              <Link
                to="/acceptproduct"
                className="text-decoration-none text-dark"
              >
                <li className="list-group-item">
                  <i className="bi bi-record-circle"></i> Products
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
    <div className="accordion accordion-flush" id="accordionFlushExample1">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button
            className="accordion-button collapsed p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            <div>
              <span>
                {" "}
                <b><i className="bi bi-book-half"></i> Refund</b>
              </span>
            </div>
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-bs-parent="#accordionFlushExample1"
        >
          <div className="accordion-body p-0">
            <ul className="list-group">
              <Link
                to="/refundsproduct"
                className="text-decoration-none text-dark"
              >
                <li className="list-group-item">
                  <i className="bi bi-record-circle"></i> Refund Products
                </li>
              </Link>
              <Link
                to="/sellerreturnproducts"
                className="text-decoration-none text-dark"
              >
                <li className="list-group-item">
                  <i className="bi bi-record-circle"></i>  Seller Return Products
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="accordion accordion-flush" id="accordionFlushExample2">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingFour">
          <button
            className="accordion-button collapsed p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseFour"
            aria-expanded="false"
            aria-controls="flush-collapseFour"
          >
            <div>
              <span>
                {" "}
                <b><i className="bi bi-book-half"></i> Seller Products</b>
              </span>
            </div>
          </button>
        </h2>
        <div
          id="flush-collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingFour"
          data-bs-parent="#accordionFlushExample2"
        >
          <div className="accordion-body p-0">
            <ul className="list-group">
              <Link
                to="/allsellerproducts"
                className="text-decoration-none text-dark"
              >
                <li className="list-group-item">
                  <i className="bi bi-record-circle"></i> Seller Products
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  </div>
  )
}
