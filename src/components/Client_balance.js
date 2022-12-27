import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Sidebar from "./Sidebar";

const ClientBalance = () => {
  const [allClinetData, setAllClinetData] = useState([]);
  const [renderClient, setRenderclient] = useState([]);
  const [alllist, setAllList] = useState();
  const [bal_dew, setbal_dew] = useState();
  const [total_dew, settotaldew] = useState();

  let total_value = 0;
  let paid_value = 0;
  let paid_bal_dew = 0;
  let total_bal_dew = 0;

  let color = "tan";
  let color2 = "#ad7c09";

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
      <div>
        <Sidebar />
        <center  >
          <h3
            style={{
              color: "#ad7c09",
              paddingTop: "10px",
              letterSpacing: "1px",
            }}
          >
            Balance Status
          </h3>
          <hr style={{ width: "100%", border: "2px solid #ad7c09" }}></hr>
         
        </center>
        {renderClient.length <= 1 ? (
          <button
            style={{
              borderRadius: 10,
              background: "beige",
              color: "#ad7c09",
              border: "1px solid tan",
              margin: "2%",
              padding: "1%",
            }}
            onClick={calculate_total}
          >
            Calculate Ballance 📊
          </button>
        ) : null}
        {renderClient.length >= 1 ? (
          <>
         
          <div className="total-amount" align="right">
            <h6 style={{ letterSpacing: "1px" }}>Total Amount&emsp;:&emsp;{total_dew}</h6>
            <h6 style={{ letterSpacing: "1px" }}>Total Paid&emsp;&emsp;:&emsp;{bal_dew}
            </h6>
            <hr
              style={{
                width: "22%",
                border: "1px solid black",
                backgroundColor: "black",
                opacity: "1",
              }}
            ></hr>
            <h6
              style={{ color: "red", letterSpacing: "1px", marginTop: "-5px" }}
            >
              {" "} Unpaid &emsp;:&emsp; {total_dew - bal_dew}</h6>
          
        </div>
              <hr style={{border:"1px solid red",width:"100%"}}></hr>
              <h6 style={{ color: "#ad7c09", letterSpacing: "1px",textAlign:"center" }}>
            Calculated from all orders
          </h6>
            <table className="table-border" style={{background:"beige"}}>
              <tr>
                <th className="column-width">Name</th>
                <th className="column-width">Client ID</th>
                <th className="column-width">Mobile</th>
                <th className="column-width">Total Amount Till Date</th>
                <th className="column-width">Total Paid Till Date</th>
                <th className="column-width">Total Ballance Till Date</th>
              </tr>
            </table>{" "}
          </>
        ) : null}

        {renderClient.map((r) => (
          <table className="table-border">
            <tr>
              <td className="column-width" style={{textTransform: "capitalize"}}>
                {r.first_name} {r.surname}
              </td>
              <td className="column-width">{r.client_id}</td>
              <td className="column-width">{r.mobile}</td>
              <td className="column-width">{r.total_value}</td>
              <td className="column-width">{r.paid_value}</td>
              {r.total_value - r.paid_value == 0 ? (
                <td className="column-width">{r.total_value - r.paid_value}</td>
              ) : (
                <>
                  {r.total_value - r.paid_value >= 1000 ? (
                    <td className="column-width">
                      {r.total_value - r.paid_value}
                    </td>
                  ) : (
                    <>
                      {r.total_value - r.paid_value <= 1000 ? (
                        <td
                          className="column-width"
                          style={{ background: "#ded1b1", color: "red" }}
                        >
                          {r.total_value - r.paid_value}
                        </td>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </tr>
          </table>
        ))}
        
      </div>
    </>
  );
};

export default ClientBalance;
