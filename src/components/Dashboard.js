import React, { useEffect, useState, useContext, useRef } from "react";
import { dataContext } from "../helpers/context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Bullion_invoice from "./Bullion_invoice";
import Button from "@mui/material/Button";



const Dashboard = () => {
  const navigate = useNavigate();
  const [alllist, setAllList] = useState();
  const [popularlist, setPopularList] = useState();
  const [hit, setHit] = useState(false);
  const [show, setShow] = useState(false);
  const [ispopular, setIspopular] = useState(false);
  const [agreePrice, setAgreePrice] = useState("");
  const { setFormValues } = useContext(dataContext);
  const { formValues } = useContext(dataContext);
  const [body, setBody] = useState([]);
  const [temp_bm, setTemp_bm] = useState()
  const [temp_pamp, setTemp_pamp] = useState()
  const [temp_bvLink, setTemp_bvLink] = useState()
  const [temp_bvFor, setTemp_bvFor] = useState()


  const childRef = useRef();

  let finalArray = [];
  let value2;
  let msgTotal;
  let pamp_for_state;
  let temp_bvLink_for_state;
  let temp_bvFor_state

  let sortedallist = [];



  useEffect(() => {
    const allListdata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/full_products_code`)
        .then((res) => res.json())
        .then((data) =>
          setAllList(
            data.rows.filter((value) => {
              return value.product_code != null;
            })
          )
        );
    };
    allListdata();

    const populardata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/popular_products_code`)
        .then((res) => res.json())
        .then((data) =>
          setPopularList(
            data.rows.filter((value) => {
              return value.product_code != null;
            })
          )
        );
      console.log(popularlist, "popular product list");
    };
    populardata();

    const interval = setInterval(() => {
      setHit(true);
    }, 300000);

    console.log(alllist, "all products list");

    return () => clearInterval(interval);
  }, []);


  var to_Delete = "";
  const delete_element = (cellValues) => {
    console.log("element", cellValues);
    to_Delete = cellValues;
    console.log(to_Delete, "to delete");
    var filteredArray = body.filter(function (e) {
      return e.code !== to_Delete.code;
    });
    setBody(filteredArray);
    console.log(body);
  };

  const insertObject = (jsonbody) => {
    finalArray = [...finalArray, jsonbody];
    setBody((prev) => {
      return [...prev, jsonbody];
    });
    console.log(finalArray, "final");
    console.log(body, "state value");
    setShow(false)
  };
  // function to add product to tsble 
  const change_value = async () => {


    if (value2) {
      if (body?.find((o) => o.code === value2)) {
        alert("Product is selected, please choose diffrent product");
      } else {
        setShow(true)
        console.log(value2, " list value");
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/suppliers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: value2 }),
        });
        const body = await response.text();
        const jsonbody = JSON.parse(body);
        insertObject(jsonbody);
      }
    } else {
      alert("Please select a valid option");
    }

  };
  // This function calculate the total price from eact supplier and quantity. 
  const calculate_total = () => {
    msgTotal = body?.reduce(function (prev, cur) {
      return prev + cur.bbp_o_competitor_pamp_value * 1 * (cur.quant * 1);
    }, 0);
    pamp_for_state = body?.reduce(function (prev, cur) {
      return prev + cur.bbp_o_competitor_best_value_value * 1 * (cur.quant * 1);
    }, 0);
    temp_bvLink_for_state = body?.reduce(function (prev, cur) {
      return prev + cur.bbp_o_competitor_v_suisse_value * 1 * (cur.quant * 1);
    }, 0);
    temp_bvFor_state = body?.reduce(function (prev, cur) {
      return prev + cur.bbp_o_competitor_metalor_value * 1 * (cur.quant * 1);
    }, 0);
    setTemp_bvFor(temp_bvFor_state)
    setTemp_bvLink(temp_bvLink_for_state)
    setTemp_pamp(pamp_for_state)
    setTemp_bm(msgTotal)
    console.log(msgTotal, "bm_minted msgTotal")
    console.log(pamp_for_state, "pamp_for_state ")
    console.log(temp_bvLink_for_state, "temp_bvLink_for_state ")
    console.log(temp_bvFor_state, " temp_bvFor_state")

  }

  const handle_input = (value, cellValues) => {
    const newArr = body.map((obj) => {
      if (obj.code === cellValues.code) {
        return { ...obj, quant: value };
      }
      return obj;
    });
    setBody(newArr)
    console.log(newArr, "newarr");
  };

  const handle_ok = () => {
    // setFormValues(body)
    navigate('/clientdata')
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (cellValues) => (
        <button
          style={{
            padding: 5,
            background: "#ff3d3d",
            color: "#fff",
            borderRadius: 10,
            border: "",
          }}
          onClick={() => {
            delete_element(cellValues.row);
          }}
        >
          Delete
        </button>
      ),
    },
    { field: "code", headerName: "Code", width: 120 },
    { field: "description", headerName: "Discription", width: 120 },

    // { field: "bm_minted_value", headerName: "BM", width: 120 },
    // { field: "1", headerName: "BM CAST", width: 120 },
    { field: "bbp_o_competitor_pamp_value", headerName: "PAMP FORMULA PRICE", width: 120 },
    {
      field: "quantity",
      headerName: "QNT",
      width: 120,
      renderCell: (cellValues) => (
        <>
          <input
            style={{ width: "100%", height: "60%" }}
            onChange={(e) => handle_input(e.target.value, cellValues.row)}
          />
        </>
      ),
    },
    { field: "quant", headerName: "QNT Value", width: 80 },
    {
      field: "bbp_o_competitor_best_value_value",
      headerName: " BV FORMULA  PRICE",
      width: 150,
    },
    {
      field: "bbp_o_competitor_v_suisse_value",
      headerName: "V SUISSE FORMULA PRICE",
      width: 160,
    },
    {
      field: "bbp_o_competitor_metalor_value",
      headerName: "METALOR FORMULA PRICE",
      width: 150,
    },
    // {
    //   field: "bbp_pamp_formula_value",
    //   headerName: "BBP PAMP FORMULA",
    //   width: 150,
    // },
    // { field: "7", headerName: "GBS BV", width: 120 },
    // { field: "8", headerName: "GBS UMICO", width: 120 },
    // { field: "9", headerName: "GBS PAMP", width: 120 },
    // { field: "10", headerName: "OTHER CBV", width: 120 },
    // { field: "11", headerName: "OTHER C PAMP", width: 120 },
    // { field: "12", headerName: "BM MINTED TABLE ", width: 120 },
    // {
    //   field: "13",
    //   headerName: "BM COST TABLE",
    //   width: 120,
    // },
  ];

  const rows = body?.map((row) => ({
    code: row.code,
    description: row.description,
    bm_minted_value: row.bm_minted_value,
    bbp_o_competitor_pamp_value: row.bbp_o_competitor_pamp_value,
    bbp_o_competitor_best_value_value: row.bbp_o_competitor_best_value_value,
    bbp_o_competitor_v_suisse_value: row.bbp_o_competitor_v_suisse_value,
    bbp_o_competitor_metalor_value: row.bbp_o_competitor_metalor_value,
    bbp_pamp_formula_value: row.bbp_pamp_formula_value,
    quant: row.quant
  }));

  let color;
  let color2;
  if (ispopular) {
    color2 = "#66cc66";
    color = "#e6e6e6";
  } else {
    color = "#66cc66";
    color2 = "#e6e6e6";
  }
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar />
      <Bullion_invoice data={body} agreePrice={agreePrice} ref={childRef} />
      <section style={{ background: "beige" }}>
        {ispopular ? (
          <select
            style={{
              width: "200px",
              color: "black",
              height: "26px",
              fontSize: "14px",
              border: "1.5px solid #267ED4",
              padding: 3,
              margin: "0px 0px",
            }}
            onChange={(e) => (value2 = e.target.value)}
          // className="select-option"
          >
            <option selected disabled>
              Popular Option
            </option>
            {popularlist?.map((value) => (
              <>
                <option value={value.product_code}>{value.product_code}</option>
              </>
            ))}
          </select>
        ) : (
          <select
            style={{
              width: "200px",
              color: "black",
              height: "26px",
              fontSize: "14px",
              border: "1.5px solid #267ED4",
              padding: 3,
              margin: "0px 0px",
            }}
            onChange={(e) => (value2 = e.target.value)}
            className="select-option"
          >
            <option selected disabled>
              All Option
            </option>
            {alllist?.map((value) => (
              <>
                <option value={value.product_code}>{value.product_code}</option>
              </>
            ))}
          </select>
        )}


        <button
          onClick={change_value}
          style={{
            height: "26px",
            color: "#fff",
            background: "#267ED4",
            border: "none",
          }}
        >
          Select
        </button>

        <button
          onClick={() => setIspopular(true)}
          style={{
            padding: 2,
            color: "#000",
            border: "none",
            background: color2,
            marginLeft: "1%",
            width: "8%",
            paddingBottom: 1
          }}
        >
          Popular
        </button>
        <button
          onClick={() => setIspopular(false)}
          style={{
            padding: 2,
            color: "#000",
            border: "none",
            background: color,
            width: "8%",
            paddingBottom: 1
          }}
        >
          All
        </button>
        <input
          placeholder="Price"
          style={{
            width: "10%",
            marginLeft: "1%",
            padding: "1px",
            borderRadius: "0px",
            outline: "none",
            border: "0.5px solid #80808050",
            paddingBottom: 0
          }}
          onChange={(e) => setAgreePrice(e.target.value)}
        />
      </section>
      {/* <button
        style={{
          border: "none",
          marginLeft: "0.5%",
          background: "#267ED4",
          color: "#fff",
          padding: 5,
          width: "5%",
          borderRadius: 10,
        }}
        onClick={handle_ok}
      >
        ok
      </button> */}
      {body ? (
        <>
          {!show ? <div> <DataGrid
            style={{ height: "28rem", width: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={20}
            getRowId={(row) => row.code}
            rowsPerPageOptions={[20]}
            components={{ Toolbar: GridToolbar }}
          />
            <h6 style={{ margin: "2% 0" }} >BM Total : &nbsp; {temp_bm}</h6>
            <h6 style={{ margin: "2% 0" }} >PAMP Total : &nbsp; {temp_pamp}</h6>
            <h6 style={{ margin: "2% 0" }} >BV LINK Total : &nbsp; {temp_bvLink}</h6>
            <h6 style={{ margin: "2% 0" }} >BV FORMULA Total : &nbsp; {temp_bm}</h6>
          </div> : <center style={{ marginTop: '20%' }}><h6>Fetching data from api...</h6></center>}
        </>
      ) : (
        <center>
          <h2>Loading.... </h2>
        </center>
      )}


      <br />
      <button
        style={{ marginTop: 20, marginLeft: 0, background: "rgb(38, 126, 212)", color: "#fff",border:"0", padding: "4px 10px" }}
        onClick={() => {
          childRef.current.showName();
        }}
      >
        Next
      </button>
      <button
        style={{ marginTop: 20, marginLeft: 5, background: "#32a852", color: "#fff",border:"0", padding: "4px 10px" }}
        onClick={calculate_total}
      >
        Calculate Total
      </button>
      {/* <button onClick={calculate_total} >click to console</button> */}
    </div>
  );
};

export default Dashboard;
