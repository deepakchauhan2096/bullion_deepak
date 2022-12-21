import React, { useState, useEffect } from "react";
// import "./newcombination.css";
// import Navbar from "./Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { Divider } from "@mui/material";

const NewCombination = () => {
  const [data2, setData] = useState();
  const [formValues, setFormValues] = useState([]);
  const [show, setShow] = useState(false);
  const [hit, setHit] = useState(false);
  const [price, setPrice] = useState();
  const [storePriceFromAPI, setStorePriceFromAPI] = useState();
  let show_loading;
  let mj_sell_rate;
  let newcode;
  let troyounce_gold;

  useEffect(() => {
    setShow(false)
    const alldata = () => {
      try {
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/best_value_all`)
          .then((res) => res.json())
          .then((data) => setData(data));
        console.log(data2, "all data");
      } catch (error) {
        console.log(error, "error in api");
      }
    };
    // alldata();

    getPriceFromAPI();
  }, []);

  const getPriceFromAPI = () => {
    // setLoader(true)
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/liveprice`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data supplier > ", data);

        let uniqueElements = [...new Set(data.map((item) => item.metal))];
        console.log(uniqueElements);

        let temp = [];
        uniqueElements.map((el) => {
          temp.push(
            data
              .filter((e) => e.metal == el)
              .filter((e) => Object.keys(e.currency)[0] == "GBP")[0]
          );

          console.log("temp : ", temp);
        });

        setStorePriceFromAPI(temp);
        console.log(storePriceFromAPI, "store price");
      })
      .catch((err) => {
        console.log("err : ", err);
        // alert("getPriceFromAPI API not working");
        // setLoader(false)
      });
    // console.log(data2, "all data");
  };

  const get_vendor_data = (api_address) => {
    setData(null);
    console.log(api_address);
    try {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/${api_address}`)
        .then((res) => res.json())
        .then((data) => setData(data, "all data"));
      console.log(data2, "all data");
      setShow(false);
    } catch (error) {
      console.log(error);
      setShow(false);
    }
  };

  const Select_vendor = (vendor_name) => {
   
    console.log(vendor_name, "vendor");
    if (vendor_name == "BV") {
      get_vendor_data("best_value_all");
    }
    if (vendor_name == "metalor") {
      get_vendor_data("metalor_all");
    }
    if (vendor_name == "Pamp") {
      get_vendor_data("pamp_all");
    }
    if (vendor_name == "vSuisse") {
      get_vendor_data("v_suisse_all");
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 120 },
    { field: "available", headerName: "Available", width: 120 },
    { field: "bbp_margin_per_link", headerName: "Margin Per link", width: 120 },
    { field: "cost_bbp_link", headerName: "Cost Link", width: 120 },
    { field: "live_price_links", headerName: "live Price links", width: 120 },
    { field: "margin_percentage", headerName: "Margin Percentage", width: 120 },
    { field: "metal_cost_api", headerName: "Metal Cost API", width: 120 },
    { field: "mj_code", headerName: "Code", width: 120 },
    { field: "o_competitor", headerName: "Competitor", width: 120 },
    { field: "price_formula", headerName: "Price Formula", width: 120 },
    { field: "price_live_rate", headerName: "Price Live Rate", width: 120 },
    { field: "product_dsc", headerName: "Product Dsc", width: 120 },
    { field: "profit_per_pc", headerName: "Profit Per_Pc", width: 120 },
    { field: "stock_status", headerName: "Stock Status", width: 120 },
    { field: "weight", headerName: "Weight", width: 120 },
  ];

  const rows = data2?.map((row) => ({
    available: row.available,
    bbp_margin_per_link: row.bbp_margin_per_link,
    cost_bbp_link: row.cost_bbp_link,
    id: row.id,
    live_price_links: row.live_price_links,
    margin_percentage: row.margin_percentage,
    metal_cost_api: row.metal_cost_api,
    mj_code: row.mj_code,
    o_competitor: row.o_competitor,
    price_formula: row.price_formula,
    price_live_rate: row.price_live_rate,
    product_dsc: row.product_dsc,
    profit_per_pc: row.profit_per_pc,
    stock_status: row.stock_status,
    weight: row.weight,
  }));

  return (
    <>
      <div style={{ padding: 20 }}>
        {" "}
        <Sidebar />
        <button
          style={{
            padding: 10,
            fontSize: 15,
            width: 120,
            background: "#2F82D6",
            borderRadius: 12,
            margin: 10,
            color: "#fff",
            fontFamily: "roboto",
            border: "none",
          }}
          onClick={getPriceFromAPI}
        >
          Fetch live price
        </button>
        <div style={{ display: "flex", float: "right", padding: 10 }}>
          <table>
            <thead>
              <tr>
                <th style={{ fontSize: "13px", padding: "2%" }}></th>
                {storePriceFromAPI?.map((e) => (
                  <th>
                    <p style={{ fontSize: "13px", padding: "2%" }}>{e.metal}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontSize: "13px", padding: "3%" }}>bid</td>

                {storePriceFromAPI?.map((e) => (
                  <td>
                    <p style={{ fontSize: "13px", paddingLeft: "10%" }}>
                      {e.currency.GBP.bid}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ fontSize: "13px", padding: "3%" }}>Offer</td>

                {storePriceFromAPI?.map((e) => (
                  <td>
                    <p style={{ fontSize: "13px", paddingLeft: "10%" }}>
                      {e.currency.GBP.offer}
                    </p>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        {/* select vendor div */}
        <div>
          <label>Choose a Vendor :</label>
          <select onChange={(e) => {Select_vendor(e.target.value); setShow(true)}}>
            <option selected value="ps">
              Plese select
            </option>
            <option value="BV">BV</option>
            <option value="metalor">Metalor</option>
            <option value="Pamp">Pamp</option>
            <option value="vSuisse">V Suisse</option>
          </select>
        </div>
        <div>
          {data2 ? (
            <DataGrid
              style={{ height: "28rem", width: "100%" }}
              rows={rows}
              columns={columns}
              pageSize={20}
              getRowId={(row) => row.id}
              rowsPerPageOptions={[20]}
              components={{ Toolbar: GridToolbar }}
            />
          ) : (
            <center>
              {!show ? (
                <h4 style={{ margin: "10%",color:"GrayText" }}>Please select a vendor !</h4>
              ) : (
                <h4 style={{ margin: "10%" , color:"blueviolet"}}>Loading...</h4>
              )}
            </center>
          )}
        </div>
      </div>
    </>
  );
};

export default NewCombination;