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
 const [storePriceFromAPI, setStorePriceFromAPI]=useState()


  let mj_sell_rate;
  let newcode;
  let troyounce_gold;

  useEffect(() => {
    const alldata = () => {
      try {
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all`)
        .then((res) => res.json())
        .then((data) => setData(data.rows));
      console.log(data2, "all data");
        
      } catch (error) {
        console.log(error,"error in api")
      }
     
    };
    alldata();

    const interval = setInterval(() => {
      setHit(true);
    }, 300000);
    getPriceFromAPI()
    return () => clearInterval(interval);
  }, []);

  if (hit === true) {
    const alldata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all`)
        .then((res) => res.json())
        .then((data) => setData(data.rows));
      console.log(data2, "all data");
      console.log("hit is true");
      setHit(false);
      // console.log(formValues, "formvalues");
      // alert(" 😃 Page refresh complete.  ");
    };

    alldata();
  } else {
    console.log("hit is false");
  }

  const update = async (e) => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/update/${newcode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mj_sell_rate: mj_sell_rate,
          troyounce_gold: troyounce_gold,
        }),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };


  var to_Delete = "";
  const delete_element = (element) => {
    console.log("element", element);
    to_Delete = element;
    var filteredArray = formValues.filter(function (e) {
      return e !== to_Delete;
    });
    setFormValues(filteredArray);
    console.log(formValues);
  };



  const getPriceFromAPI = () => {
    // setLoader(true)
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/liveprice`)
    .then((res) => res.json())
    .then((data) => {
      console.log("data supplier > ", data)
      
      let uniqueElements = [...new Set(data.map(item => item.metal))];
      console.log(uniqueElements)
      
      let temp = []
      uniqueElements.map((el) => {
        temp.push(data.filter((e) => e.metal == el).filter((e) => Object.keys(e.currency)[0] == "GBP")[0])
        
        console.log("temp : ", temp)
      })
      
      setStorePriceFromAPI(temp)
   console.log(storePriceFromAPI,"store price")
      
    }).catch((err)=>{
      console.log("err : ",err)
      // alert("getPriceFromAPI API not working");
      // setLoader(false)
    });
    // console.log(data2, "all data");
  };


  const columns = [
    { field: "supplier_id", headerName: "supplier_id", width: 120 },
    { field: "new_code", headerName: "new_code", width: 120 },
    { field: "baird_pamp", headerName: "baird_pamp", width: 120 },
    {
      field: "bar_cast_mint_type",
      headerName: "bar_cast_mint_type",
      width: 120,
    },
    { field: "bar_coin", headerName: "bar_coin", width: 120 },
    { field: "bmoutlet_price", headerName: "bmoutlet_price", width: 120 },
    { field: "brand_name", headerName: "brand_name", width: 120 },
    { field: "dimention_1", headerName: "dimention_1", width: 120 },
    { field: "dimention_2", headerName: "dimention_2", width: 120 },
    { field: "discription", headerName: "discription", width: 120 },
    { field: "fine_troy_ounce", headerName: "fine_troy_ounce", width: 120 },
    { field: "fineness", headerName: "fineness", width: 120 },
    { field: "gross_weight", headerName: "gross_weight", width: 120 },
    { field: "manufacturer_1", headerName: "manufacturer_1", width: 120 },
    { field: "manufacturer_2", headerName: "manufacturer_2", width: 120 },
    { field: "metal_cost_api", headerName: "metal_cost_api", width: 120 },
    { field: "metal_type", headerName: "metal_type", width: 120 },
    { field: "mj_margin", headerName: "mj_margin", width: 120 },
    { field: "mj_sell_rate", headerName: "mj_sell_rate", width: 120 },
    { field: "ppb_internal_use", headerName: "ppb_internal_use", width: 120 },
    {
      field: "purchase_rate_formula",
      headerName: "purchase_rate_formula",
      width: 120,
    },
    { field: "supplier_name", headerName: "supplier_name", width: 120 },
    { field: "supplier_ref", headerName: "supplier_ref", width: 120 },
    { field: "troyounce_gold", headerName: "troyounce_gold", width: 120 },
    {
      field: "uplift_fixed_price",
      headerName: "uplift_fixed_price",
      width: 120,
    },
  ];

  const rows = data2?.map((row) => ({
    new_code: row.new_code,
    supplier_id: row.supplier_id,
    baird_pamp: row.baird_pamp,
    bar_cast_mint_type: row.bar_cast_mint_type,
    bar_coin: row.bar_coin,
    bmoutlet_price: row.bmoutlet_price,
    brand_name: row.brand_name,
    dimention_1: row.dimention_1,
    dimention_2: row.dimention_2,
    fine_troy_ounce: row.fine_troy_ounce,
    fineness: row.fineness,
    gross_weight: row.gross_weight,
    manufacturer_1: row.manufacturer_1,
    manufacturer_2: row.manufacturer_2,
    metal_cost_api: row.metal_cost_api,
    metal_type: row.metal_type,
    mj_margin: row.mj_margin,
    mj_sell_rate: row.mj_sell_rate,
    ppb_internal_use: row.ppb_internal_use,
    purchase_rate_formula: row.purchase_rate_formula,
    supplier_name: row.supplier_name,
    supplier_ref: row.supplier_ref,
    troyounce_gold: row.troyounce_gold,
    uplift_fixed_price: row.uplift_fixed_price,
  }));



  return (
    < >
    <div >
      {" "}
      <Sidebar />


      {/* <button
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
      </button> */}

      {/* <div style={{ display: "flex" , float:"right", padding:10 }}>
            <table>
              <thead>
              
                <tr>
                <th style={{fontSize:"13px"}}></th>
                {storePriceFromAPI?.map((e) => 
                   <th>
                    <p style={{fontSize:"13px",margin:"0"}}>{e.metal}</p>
                    </th>
                  )}
                 
                  
                </tr>
              </thead>
              <tbody>
              <tr>
              <td  style={{fontSize:"13px",margin:"0"}}>bid</td>
              
              {storePriceFromAPI?.map((e) => 
               <td>
                  <p style={{fontSize:"13px",margin:"0"}}>{e.currency.GBP.bid}</p>
                  </td>
                )}
                </tr>
              <tr>
              <td style={{fontSize:"13px",margin:"0"}}>Offer</td>
              
              {storePriceFromAPI?.map((e) => 
           <td>
                  <p style={{fontSize:"13px",margin:"0"}}>{e.currency.GBP.offer}</p>
                  </td>
                )}
                </tr>
              </tbody>
            </table>

          </div> */}


      
      {data2 ? (
        <DataGrid
          style={{ height: "100vh", width: "100%"}}
          rows={rows}
          columns={columns}
          pageSize={20}
          getRowId={(row) => row.supplier_id}
          rowsPerPageOptions={[20]}
          components={{ Toolbar: GridToolbar }}
          density="compact"
        />
      ) : (
        <center>
          <h2>Loading.... </h2>
        </center>
      )}

      </div>
    </>
  );
};

export default NewCombination;
