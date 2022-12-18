import React, { useState } from "react";
import Demotable from "./Demotable";
import Productstable from "./Productstable";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";

const View_more = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state.modal);

  console.log("location1 : ", location.state);

  return (
    <>
      <div style={{ padding: "2%" }}>
        <Sidebar />

        <div className="container">
          <center>
            <Button
            onClick={()=>
              navigate("/Order_pdf", {
              state: {
              data: product,
              }
            })
            }
              style={{
                background: "#fff",
                color: "#F79D00",
                border: "0.5px solid #000",
                borderRadius: "20px",
              }}
            >
              GENRATE PDF 📄
            </Button>
          </center>
          <h6 className="product_heading"> CLIENT DETAILS</h6>
          <Demotable data={product} />
        </div>

        <div style={{ margin: "1%" }} className="product_main">
          <h6 className="product_heading">PRODUCT DETAILS</h6>
        </div>

        <Productstable data={product} />
      </div>
    </>
  );
};

export default View_more;
