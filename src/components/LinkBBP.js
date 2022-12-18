import React,{useState} from "react";
// import Navbar from "./Navbar";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";

const LinkBBP = () => {

const [data2,setData] = useState()

  // const { data, loading } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 4,
  //   maxColumns: 6,
  // });


  const alldata =()=>{
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all`)
      .then((res) => res.json())
      .then((data) => setData(data));
      console.log(data2.rows)
  }

  var gross_weight = 1000.0;
  var Fineness = 999.999;
  var Weight_Grams_FINE_WT = (gross_weight * Fineness) / 1000;
  // var Troy_Ounce_Gold_Content_OZ

  return (
    <>
    <Sidebar />
    <div style={{padding:20}}>
      <h1>LINK BBP data</h1>
      <table className="over-flow">
        <tr>
          <th>SUPPLIER NAME</th>
          <th>NEW CODE</th>
          <th>SUPPLIER REF</th>
          <th>BAR COIN</th>
          <th>METAL TYPE </th>
          <th>BAR/COIN TYPE -CAST / MINT </th>
          <th>description</th>
          <th>GROSS Weight (Grams)</th>
          <th>Fineness</th>
          <th>FINE Troy Ounce Gold /SILVER Content (OZ)</th>
          <th>Manufacturer</th>
          <th>Dimensions</th>
          <th>BRAND NAME</th>
          <th>Weight (Grams)FINE WT</th>
          <th>Troy Ounce Gold Content (OZ)</th>
          <th>Manufacturer</th>
          <th>Dimensions</th>
          <th>METAL COST VIA API</th>
          <th>BAIRD& pamp% on mc</th>
          <th>UPLIFT FIXED PRICE</th>
          <th>BM OUTLET API PRICE</th>
          <th>Purchase Rate FORMULA BASED</th>
          <th>MJ% MARGIN on PURCHASE COST</th>
          <th>MJ Sell Rate</th>
          <th>PPB BM INTERNAL USE</th>
        </tr>
        <tr>
          <td>BAIRD MINT</td>
          <td>C1000 BM</td>
          <td>GB-481</td>
          <td>BAR</td>
          <td>GOLD</td>
          <td>Cast</td>
          <td>1kg Cast</td>
          <td>1000.000</td>
          <td>999.999</td>
          <td>{(gross_weight * Fineness) / 31.1034768 / 1000}</td>
          <td>Mixed LBMA Approved Refiners</td>
          <td>Mixed</td>
          <td>BAIRD</td>
          <td>{Weight_Grams_FINE_WT}</td>
          <td>{Weight_Grams_FINE_WT / 31.1034768}</td>
          <td>Mixed LBMA Approved Refiners</td>
          <td>Mixed</td>
          <td>47967.25653</td>
          <td>1.2</td>
          <td></td>
          <td>TO UPDATE VIA API</td>
          <td> £48,542.86 </td>
          <td>5.07 </td>
          <td> £51,003.99 </td>
          <td>2,461.12</td>
        </tr>
      </table>
{/* 
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
  
        />
      </div> */}


    </div>
    </>
  );
};

export default LinkBBP;
