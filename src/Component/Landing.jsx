import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import AppCard from "./AppCard";
import Form from "react-bootstrap/Form";

function Landing() {
  const [arr, setArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/item/getdata").then((response) => {
      setArr(response.data);
    });
  }, []);

  const filteredArr = arr.filter(val =>
    val.Model_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <>
      <div className="container">
      <Form className="my-2">
        <Form.Group className="mb-3" controlId="creatorName">
          <Form.Control
            type="text"
            placeholder="Search model"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      </div>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row center parent-element flex-left">
          {filteredArr.length === 0 ? (
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            filteredArr.map((val, index) => (
              <AppCard
                key={index}
                img={val.ThumbNail_Name}
                model_name={val.Model_name}
                creator_name={val.Creator_Name}
                date={val.dateCreated}
                id={val._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
