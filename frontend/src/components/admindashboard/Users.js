import React, { useEffect, useMemo, useState } from 'react'
import Adminnavbar from './Adminnavbar'
import Footer from '../footer'
import axios from 'axios';
import UserdetailsCard from './UserdetailsCard';
import Adminmenu from './Adminmenu';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering shops
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
          .get(
            `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/registedusers`
          )
          .then((res) => {
            if (res.data !== "Error" && res.data !== "Fail") {
              setData(res.data);
            }
          });
      }, []);
      const  users = useMemo(() => {
        return data.filter((item) =>
          item.firstname || item.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [searchTerm]);
  return (
    <div>
      <Adminnavbar />
      <div className="d-md-flex">
        <div className="col-md-2 selleraccordion">
          <Adminmenu />
        </div>
        <div className="col-md-10">
      <div>
        <div className="container">
          <div className="fullscreen2">
          <main className="mt-4">
          <div className="d-flex justify-content-end ">
                <input
                  type="text"
                  className="form-control mb-3 rounded-pill "
                  id="Shopnamesearch"
                  style={{ height: "50px" ,width:'250px'}}
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          <div className="text-center p-3">
                <h6>
                  {" "}
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
              <div className="m-2 ps-md-4 d-md-flex justify-content-between me-5">
                <h1 style={{ fontSize: "28px" }}>Users</h1>
                {users && users.length > 0 ?
                <h1 style={{ fontSize: "28px" }}>

                  Total Users : {users.length}
                </h1>
                 : (<></>)}
              </div>
          <div className="accordion" id="shopAccordion">
                  {users.length > 0 ? (
                    users.map((seller, index) => (
                        <div className='shadow m-3 p-3' key={index}>
                            <UserdetailsCard user={seller} />
                        </div>
                    ))
                  ) : (
                    <>
                      <div className="text-center">No users found.</div>
                    </>
                  )}
                </div>
            </main>
            </div>
        </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
