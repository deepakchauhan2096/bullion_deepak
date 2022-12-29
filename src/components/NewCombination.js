import React, { useState, useEffect } from "react";
// import "./newcombination.css";
// import Navbar from "./Navbar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { Divider } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { display } from "@mui/system";
import { Transform, Translate } from "@mui/icons-material";

const NewCombination = () => {
  const [data2, setData] = useState();
  const [formValues, setFormValues] = useState([]);
  const [show, setShow] = useState(false);
  const [hit, setHit] = useState(false);
  const [price, setPrice] = useState();
  const [ShowHide, setShowHide] = useState(true)
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
    setShowHide(true)
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



  const onoff = () => {
    setShowHide(s => !s)

  }

  return (
    <>
      <Sidebar />
      <div style={{
        margin: "",
        justifyContent: "flex-end",
        zIndex: "2",
        display: `${ShowHide ? "flex" : "none"}`
      }} >
        {storePriceFromAPI ? <table className="table-modal">
          <thead>

            <tr>
              <th style={{ fontSize: "13px", padding: "0px 20px", textAlign: "center" }}></th>
              {storePriceFromAPI?.map((e) => {
                return <th>
                  <p style={{ fontSize: "13px", margin: "0", textAlign: "center" }}>{e.metal}</p>
                </th>
              })}


            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: "13px", margin: "0", padding: "0px 20px", textAlign: "center" }}>Bid</td>

              {storePriceFromAPI?.map((e) => {
                return <td style={{ background: "#b6f2d5" }}>
                  <p style={{ fontSize: "13px", margin: "0", padding: "0px 20px", textAlign: "center" }}>{e.currency.GBP.bid}</p>
                </td>
              })}
            </tr>
            <tr>
              <td style={{ fontSize: "13px", margin: "0", padding: "0px 20px", textAlign: "center" }}>Offer</td>

              {storePriceFromAPI?.map((e) => {
                return <td style={{ background: "#e6a3a3" }}>
                  <p style={{ fontSize: "13px", margin: "0", padding: "0px 20px", textAlign: "center" }}>{e.currency.GBP.offer}</p>
                </td>
              })}
            </tr>
          </tbody>
        </table> :
          <div style={{ textAlign: "center", display: "flex", margin: "0 auto" }}>
            please wait...
          </div>}

      </div>
      {/* <DragModal /> */}

      <div style={{ position: "relative" }}>
        <button
          className="fixed-button-modal-arrow"
          onClick={onoff}
          title="Full Screen"
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
        <input
          type="button"
          className="fixed-button-modal-bid"
          onClick={getPriceFromAPI}
          title="Update Live Price"
          value='Fetch live price'
        />

        <div style={{ position: "absolute", outline: "none" }} className="fixed-button-bid">
          <label>Choose a Vendor :&nbsp; &nbsp;</label>
          <select onChange={(e) => { Select_vendor(e.target.value); setShow(true) }} title="Please Select A Vender">
            <option selected value="ps">
              Plese select
            </option>
            <option value="BV">BV</option>
            <option value="metalor">Metalor</option>
            <option value="Pamp">Pamp</option>
            <option value="vSuisse">V Suisse</option>
          </select>
        </div>

        {data2 ? (
          <DataGrid
            style={{ height: `${ShowHide ? "92.2413793103vh" : "100vh"}`, width: "100%", position: "absolute", top: "0" }}
            rows={rows}
            columns={columns}
            pageSize={20}
            getRowId={(row) => row.id}
            rowsPerPageOptions={[20]}
            components={{ Toolbar: GridToolbar }}
            density="compact"
          />
        ) : (
          <div>
            {!show ? (
              <div style={{
                color: "GrayText",
                background: "whitesmoke",
                width: "100%",
                height: `${ShowHide ? "92.2413793103vh" : "100vh"}`,
              }}>
                <p
                  style={{
                    padding: "",
                    color: "GrayText",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    // Transform: "translate(-50%,-50%)",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center"

                  }}>
                  Please select a vendor !
                </p>
              </div>
            ) : (
              <div style={{
                color: "GrayText",
                background: "whitesmoke",
                width: "100%",
                height: `${ShowHide ? "92.2413793103vh" : "100vh"}`,
              }}>
              <p
                style={{
                  padding: "",
                  color: "#3596d9",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center"
                }}>
                Loading...
              </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NewCombination;