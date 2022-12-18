import React, {
    useContext,
    useState,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from "react";
  import Sidebar from "./Sidebar";
  
  const Client_balance = () => {
    const [allClinetData, setAllClinetData] = useState([]);
    const [renderClient, setRenderclient] = useState([]);
    const [alllist, setAllList] = useState();
    const [bal_dew, setbal_dew] = useState();
    const [total_dew, settotaldew] = useState();
  
    let total_value = 0;
    let paid_value = 0;
    let paid_bal_dew = 0;
    let total_bal_dew = 0;
  
    let color = "#94f7ad";
    let color2 = "#fff";
  
    useEffect(() => {
      const getAllClientData = () => {
        // setLoader(true)
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/getclientdata`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data > ", data.res);
            let temp = data.res?.map((e) => {
              return {
                ...e,
                label: `${e.client_id}_${e.first_name}_${e.mobile}`,
              };
            });
            console.log("temp : ", temp);
            setAllClinetData(temp);
  
            // setLoader(false)
          })
          .catch((err) => {
            alert("API not working");
            // setLoader(false)
            throw Error(err);
          });
  
        // console.log(data2, "all data");
      };
      const allListdata = () => {
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/sold_product`)
          .then((res) => res.json())
          .then((data) => setAllList(data));
        console.log(alllist, "alllist");
      };
      allListdata();
      getAllClientData();
    }, []);
  
    const uniqueIDs = [...new Set(alllist?.map((obj) => obj.client_id))];
  
    const calculate_total = () => {
      alllist.map((t) => {
        paid_bal_dew += Number(t.paid_amount);
        total_bal_dew += Number(t.total_price);
      });
      for (let index = 0; index < uniqueIDs.length; index++) {
        const element = uniqueIDs[index];
  
        alllist.map((e) => {
          if (e.client_id === element && e.paid_amount !== null) {
            paid_value += Number(e.paid_amount);
            total_value += Number(e.total_price);
          }
        });
  
        allClinetData.map((o) => {
          if (o.client_id === element) {
            o.paid_value = paid_value;
            o.total_value = total_value;
          }
        });
        paid_value = 0;
        total_value = 0;
      }
      setbal_dew(paid_bal_dew);
      settotaldew(total_bal_dew);
      setRenderclient(allClinetData);
    };
  
    return (
      <>
        <div style={{ padding: 10 }}>
          <Sidebar />
          <center>
            <h3 style={{ color: "blue", marginTop: "2%" }}>Till Date Balance</h3>
            <h6>Calculated from all orders.</h6>
          </center>
         { renderClient.length <= 1 ?<button
            style={{
              borderRadius: 30,
              background: "#fff",
              color: "blue",
              border: "1px solid",
              margin: "2%",
              padding: "1%",
            }}
            onClick={calculate_total}
          >
            Calculate Ballance 📊
          </button>:null
   } 
          {renderClient.length >= 1 ? (
            <>
              <div style={{ margin: 20 }}>
                <h6> &nbsp; Total Amount: {total_dew}</h6>
                <h6>- Total Paid: {bal_dew}</h6>
                <hr style={{ width:"20%",border:"1px solid black", backgroundColor:"black", opacity: "1",margin:5}}></hr>
                <h6 style={{ color: "red" }}> &nbsp; Unpaid: {total_dew - bal_dew}</h6>
              </div>
              <tr>
                <th>Name</th>
                <th>Client ID</th>
                <th>Mobile</th>
                <th>Total Amount Till Date</th>
                <th>Total Paid Till Date</th>
                <th>Total Ballance Till Date</th>
              </tr>{" "}
            </>
          ) : null}
  
          {renderClient.map((r) => (
            <tr>
              <td>
                {r.first_name} {r.surname}
              </td>
              <td>{r.client_id}</td>
              <td>{r.mobile}</td>
              <td>{r.total_value}</td>
              <td>{r.paid_value}</td>
              {r.total_value - r.paid_value == 0 ? (
                <td style={{ background: color }}>
                  {r.total_value - r.paid_value}
                </td>
              ) : (
                <>
                  {r.total_value - r.paid_value >= 1000 ? (
                    <td style={{ background: "#ff5260" }}>
                      {r.total_value - r.paid_value}
                    </td>
                  ) : (
                    <>
                      {r.total_value - r.paid_value <= 1000 ? (
                        <td style={{ background: "orange" }}>
                          {r.total_value - r.paid_value}
                        </td>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </tr>
          ))}
  
          {/* <button
          onClick={() =>
            console.log(
              alllist,
              uniqueIDs,
              allClinetData,
              paid_value,
              total_value,
             paid_bal_dew,
          total_bal_dew
              ,
              "allClinetData"
            )
          }
        >
          click to console
        </button> */}
        </div>
      </>
    );
  };
  
  export default Client_balance;
  