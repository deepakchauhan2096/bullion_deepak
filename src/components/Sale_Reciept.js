import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { dataContext } from "../helpers/context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
// import { auth, firebase } from '../../firebase';
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Autocomplete from "@mui/material/Autocomplete";
import { ToWords } from "to-words";
// import {Converter} from "any-number-to-words";
// const converter = new Converter();

const Sale_Reciept = () => {
  const [alllist, setAllList] = useState();
  const [filteredInvoice, setFilteredInvoice] = useState();
  const toWords = new ToWords();
  useEffect(() => {
    const allListdata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/sold_product_bullion`)
        .then((res) => res.json())
        .then((data) => {
          let temp = data?.map((e) => {
            return {
              ...e,
              label: e.invoice_num,
            };
          });
          setAllList(temp);
        });
      console.log(alllist, "alllist");
    };
    allListdata();
  }, []);

  const { globleData, setGlobleData } = useContext(dataContext);

  const [formData, setFormData] = useState({
    title: "Mr",
    client_id: "XXXXXXX",
    first_name: "",
    surname: "",
    house_name: "",
    address_l2: "",
    city_and_town: "",
    postcode: "",
    telephone: "",
    mobile: "",
    email: "",

    // other_details

    consent: true,
  });
  const [otherFormData, setOtherFormData] = useState({
    Invoice_number: "",
    Served_by: "",
    Bank_amount: 0,
    Bank_remark: "",
    Card_amount: 0,
    Card_remark: "",
    Cash_amount: 0,
    Cash_remark: "",
    Chaque_amount: 0,
    Chaque_remark: "",
    Exchange_amount: 0,
    Exchange_remark: "",
  });

  const [formDataError, setFormDataError] = React.useState({
    first_nameErr: false,
    surnameErr: false,
    emailErr: false,
    mobileErr: false,
    telephoneErr: false,
  });
  const [orderData, setOrderData] = useState({
    customer_info: {},
    products: [],
  });
  const [mynumber, setnumber] = useState("7206685433");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceInWord, setTotalPriceInWord] = useState(0);
  const [allClinetData, setAllClinetData] = useState([
    {
      client_id: "2",
      title: "",
      first_name: "",
      surname: "",
      house_name: "",
      address_l2: "",
      city_and_town: "",
      postcode: "",
      telephone: "",
      mobile: "",
      email: "",
      relation_od: "",
      name_od: "",
      surname_od: "",
      comments_od: "",
      email_od: "",
      mobile_od: null,
      consent: true,
      label: "Select Option",
    },
  ]);
  const [todayDate, setTodayDate] = useState("DD/MM/YYYY");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect : ", globleData);
    if (globleData != undefined) {
      setFormData(globleData);
    }

    try {
      // let converNumber = converter.toWords(1000);

      // console.log("coonverNumber : ",converNumber)

      let date = new Date();
      setTodayDate(date.toLocaleDateString());
      const getAllClientData = () => {
        console.log(process.env.REACT_APP_SERVER_IP, "SERVER_IP");
        setLoader(true);
        fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/getclientdata`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data > ", data.res);
            let temp = data.res.map((e) => {
              return {
                ...e,
                label: `${e.client_id}_${e.first_name}_${e.mobile}`,
              };
            });
            console.log("temp : ", temp);
            setAllClinetData(temp);

            setLoader(false);
          })
          .catch((err) => {
            alert("API not working");
            setLoader(false);
            throw Error(err);
          });

        // console.log(data2, "all data");
      };

      getAllClientData();
    } catch (err) {
      setLoader(false);
      alert("Some Error Occurred");
    }
  }, []);

  console.log(globleData, "globleData Plain_J_Invoice");
  console.log("location : ", location.state);
  const Select = styled.select`
    width: 100%;
    padding: 0;
    margin: 0;
  `;
  const Option = styled.option`
    padding: 0;
    margin: 0;
  `;

  function handleChange(key, value) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }
  function handleChangeOtherData(key, value) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }
  let To_Words
  let total_for_db
if (formData.cank_amount || formData.card_amount || formData.cash_amount || formData.chaque_amount || formData.exchange_amount) {
    To_Words=  toWords.convert(
                                   parseFloat(formData.cank_amount) +
                                     parseFloat(formData.card_amount) +
                                     parseFloat(formData.cash_amount) +
                                     parseFloat(formData.chaque_amount) +
                                     parseFloat(formData.exchange_amount)
                                 )
                                 .toUpperCase()
total_for_db =parseFloat(formData.cank_amount) +
parseFloat(formData.card_amount) +
parseFloat(formData.cash_amount) +
parseFloat(formData.chaque_amount) +
parseFloat(formData.exchange_amount)

   
}

  const saveDataInDB = () => {
    console.log("formData : ", formData);

    setLoader(true);
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/update_payment_Details_in_order_bullion_from_sales_reciept`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData,totalPrice:total_for_db}),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("save client data > ", data);
        if (data.success == false) {
          alert("API failed (save client data)");
          setLoader(false);
        } else {
          alert("Data Insert Successfully");

          // setFormData((prev) => {
          //     return { ...prev, client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate }
          // })
          fetch(
            `http://${process.env.REACT_APP_SERVER_IP}:4000/createsalereciept`,
            {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                customer_info: {
                  ...formData,
                  client_id: parseInt(data.res.rows[0].client_id),
                  date: todayDate,
                  ...otherFormData,
                  totalPrice: totalPrice,
                  totalPriceInWord: toWords
                    .convert(totalPrice)
                    .toUpperCase(),
                },
              }),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              console.log("craete order data > ", response);
              if (response.success == false) {
                alert("API failed (create order)");
                setLoader(false);
              } else {
                alert("Order created Successfully");

                // setGlobleData({ ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate })
                console.log("trigger");
                navigate("/PDF_Creation_Sale_Reciept", {
                  state: {
                    customer_info: {
                      ...formData,
                      sr_number: parseInt(response.res.rows[0].sale_reciept_id),
                      TodayDate: todayDate,
                      ...otherFormData,
                      totalPrice: totalPrice,
                      totalPriceInWord: To_Words,
                    },
                  },
                });

                setLoader(false);
              }
            })
            .catch((err) => {
              console.log(err);
              alert("API not working (createorder)");
              setLoader(false);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("API not working (insertclientdata)");
        setLoader(false);
      });

    console.log("end");
  };
  // This function filter invoice based on client id selected!
  const Filter_order_based_on_Clientid = (value) => {
    console.log("in function value", value);
    let filtered_array = [];
    for (let index = 0; index < alllist.length; index++) {
      const element = alllist[index];
      if (value.client_id == element.client_id) {
        filtered_array.push(element);
      }
    }
    setFilteredInvoice(filtered_array);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid" style={{ backgroundColor: "" }}>
        <div className="row">
          <p className="bg-secondary text-white py-2">Sale Reciept</p>
        </div>

        <form className="table-border">
          <div className="container" style={{ backgroundColor: "" }}>
            <div className="row">
              <div className="col-lg-6 g-0">
                <table className="table-border" style={{ height:"100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <b>CLINT ID</b>
                      </td>
                      <td>
                        <Autocomplete
                        style={{ width: "100%" }}
                          disablePortal
                          id="combo-box-demo"
                          options={allClinetData}
                          // onChange={(e)=>{
                          //     console.log("ek : ",e)
                          //     // setFormData()
                          // }}
                          // getOptionLabel={(option) => {
                          //     console.log("option : ",option)
                          // }}
                          value={formData.client_id}
                          onChange={(event, newValue) => {
                            console.log("newValue : ", newValue);
                            if (newValue != null) {
                              Filter_order_based_on_Clientid(newValue);
                            }
                          }}
                          sx={{ width: 200 }}
                          renderInput={(params) => (
                            <TextField  className="input-fields"  {...params} label="Select Client" />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b>First Name*</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.first_name}
                          error={formDataError.first_nameErr}
                          onChange={(e) => {
                            console.log("e : ", e.target.value);
                            handleChange("first_name", e.target.value);
                            if (e.target.value != "") {
                              setFormDataError((prev) => {
                                // console.log("text : ",text)
                                return { ...prev, first_nameErr: false };
                              });
                            }
                          }}
                        >
                          {formData.first_name}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b>Surname*</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.surname}
                          error={formDataError.surnameErr}
                          onChange={(e) => {
                            handleChange("surname", e.target.value);
                            if (e.target.value != "") {
                              setFormDataError((prev) => {
                                // console.log("text : ",text)
                                return { ...prev, surnameErr: false };
                              });
                            }
                          }}
                        >
                          {formData.surname}
                        </b>
                      </td>
                    </tr>

                    <tr>
                      <td scope="col">
                        <b>Road/Street</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.house_name}
                          onChange={(e) => {
                            handleChange("house_name", e.target.value);
                          }}
                        >
                          {formData.house_name}
                        </b>
                      </td>
                    </tr>

                    <tr>
                      <td scope="col">
                        <b>City/Town</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.city_and_town}
                          onChange={(e) => {
                            handleChange("city_and_town", e.target.value);
                          }}
                        >
                          {formData.city_and_town}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b>Postcode</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.postcode}
                          onChange={(e) => {
                            handleChange("postcode", e.target.value);
                          }}
                        >
                          {formData.postcode}
                        </b>
                      </td>
                    </tr>

                    <tr>
                      <td scope="col">
                        <b>Mobile*</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.mobile}
                          error={formDataError.mobileErr}
                          onChange={(e) => {
                            handleChange("mobile", e.target.value);
                            if (e.target.value != "") {
                              setFormDataError((prev) => {
                                // console.log("text : ",text)
                                return { ...prev, mobileErr: false };
                              });
                            }
                          }}
                        >
                          {formData.mobile}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b>Email*</b>
                      </td>
                      <td scope="col">
                        <b
                          value={formData.email}
                          error={formDataError.emailErr}
                          onChange={(e) => {
                            handleChange("email", e.target.value);
                            if (e.target.value != "") {
                              setFormDataError((prev) => {
                                // console.log("text : ",text)
                                return { ...prev, emailErr: false };
                              });
                            }
                          }}
                        >
                          {formData.email}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b>Total Bill</b>
                      </td>
                      <td scope="col">
                        <b value={formData.agreeprice}>{formData.agreeprice}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-6 g-0">
                <table className="table-border">
                  <tbody>
                    <tr>
                      <td>
                        <b>Date:</b>
                      </td>
                      <td>{todayDate}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Invoice Number:</b>
                      </td>
                      <td>
                        {filteredInvoice?.length >= 1 ? (
                          <Autocomplete
                          placeholder="select invoice"
                          style={{ width: "100%" }}
                            disablePortal
                            id="combo-box-demo"
                            options={filteredInvoice}
                            value={formData.invoice_num}
                            onChange={(event, newValue) => {
                              console.log("newValue : ", newValue);
                              if (newValue != null) {
                                setFormData(newValue);
                              }
                            }}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                              <TextField  className="input-fields"  {...params} label="Select Invoice" />
                            )}
                          />
                        ) : (
                          <h6>Please Select client first. </h6>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b>SERVED BY</b>
                      </td>
                      <td>
                        <b>{formData.served_by}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="col-lg-24 g-0">
                  <table className="table-border">
                    <tbody>
                      <tr>
                        <td>
                          <b>Payment Details</b>
                        </td>
                        <td>
                          <b>Amount</b>
                        </td>
                        <td>
                          <b>Remark</b>
                        </td>
                      </tr>

                      <tr>
                        <td>BANK</td>
                        <td>
                          <TextField
                              type="number"
                            value={formData.cank_amount}
                            onChange={(e) => {
                              console.log(
                                "Bank_amount : ",
                                typeof e.target.value
                              );
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "cank_amount",
                                  e.target.value
                                );
                                // setTotalPrice(
                                //   () =>
                                //     parseFloat(e.target.value) +
                                //     parseFloat(otherFormData.Card_amount) +
                                //     parseFloat(otherFormData.Cash_amount) +
                                //     parseFloat(otherFormData.Chaque_amount) +
                                //     parseFloat(otherFormData.Exchange_amount)
                                // );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("cank_amount", 0);
                              }
                            }}
                          >
                            {formData.cank_amount}
                          </TextField>
                        </td>
                        <td>
                          <TextField
                            value={formData.cank_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "cank_remark",
                                e.target.value
                              );
                            }}
                          >
                            {formData.cank_remark}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>CARD</td>
                        <td>
                          <TextField
                             type="number"
                            value={formData.card_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "card_amount",
                                  e.target.value
                                );
                                // setTotalPrice(
                                //   () =>
                                //     parseFloat(formData.Bank_amount) +
                                //     parseFloat(e.target.value) +
                                //     parseFloat(otherFormData.Cash_amount) +
                                //     parseFloat(otherFormData.Chaque_amount) +
                                //     parseFloat(otherFormData.Exchange_amount)
                                // );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(formData.Bank_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("card_amount", 0);
                              }
                            }}
                          >
                            {formData.card_amount}
                          </TextField>
                        </td>
                        <td>
                          <TextField
                            value={formData.card_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "card_remark",
                                e.target.value
                              );
                            }}
                          >
                            {formData.card_remark}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>CASH</td>
                        <td>
                          <TextField
                             type="number"
                            value={formData.cash_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "cash_amount",
                                  e.target.value
                                );
                                // setTotalPrice(
                                //   () =>
                                //     parseFloat(otherFormData.Bank_amount) +
                                //     parseFloat(otherFormData.Card_amount) +
                                //     parseFloat(e.target.value) +
                                //     parseFloat(otherFormData.Chaque_amount) +
                                //     parseFloat(otherFormData.Exchange_amount)
                                // );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("cash_amount", 0);
                              }
                            }}
                          >
                            {formData.cash_amount}
                          </TextField>
                        </td>
                        <td>
                          <TextField
                            value={formData.cash_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "cash_remark",
                                e.target.value
                              );
                            }}
                          >
                            {formData.cash_remark}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>CHEQUE</td>
                        <td>
                          <TextField
                             type="number"
                            value={formData.chaque_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "chaque_amount",
                                  e.target.value
                                );
                                // setTotalPrice(
                                //   () =>
                                //     parseFloat(otherFormData.Bank_amount) +
                                //     parseFloat(otherFormData.Card_amount) +
                                //     parseFloat(otherFormData.Cash_amount) +
                                //     parseFloat(e.target.value) +
                                //     parseFloat(otherFormData.Exchange_amount)
                                // );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("chaque_amount", 0);
                              }
                            }}
                          >
                            {formData.chaque_amount}
                          </TextField>
                        </td>
                        <td>
                          <TextField
                            value={formData.chaque_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "chaque_remark",
                                e.target.value
                              );
                            }}
                          >
                            {formData.chaque_remark}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>EXCHANGE</td>
                        <td>
                          <TextField
                             type="number"
                            value={formData.exchange_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "exchange_amount",
                                  e.target.value
                                );
                                // setTotalPrice(
                                //   () =>
                                //     parseFloat(otherFormData.Bank_amount) +
                                //     parseFloat(otherFormData.Card_amount) +
                                //     parseFloat(otherFormData.Cash_amount) +
                                //     parseFloat(otherFormData.Chaque_amount) +
                                //     parseFloat(e.target.value)
                                // );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(e.target.value)
                                );
                              } else {
                                handleChangeOtherData("exchange_amount", 0);
                              }
                              // console.log("typeof : ",typeof (parseFloat(otherFormData.Bank_amount)+parseFloat(otherFormData.Card_amount)+parseFloat(otherFormData.Cash_amount)+parseFloat(otherFormData.Chaque_amount)+parseFloat(e.target.value)))
                            }}
                          >
                            {formData.exchange_amount}
                          </TextField>
                        </td>
                        <td>
                          <TextField
                            value={formData.exchange_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "exchange_remark",
                                e.target.value
                              );
                            }}
                          >
                            {formData.exchange_remark}
                          </TextField>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div   className="col-lg-24 g-0">
                <table className="table-border">
                  <tbody >
                    <tr>
                      <td>
                        <b></b>
                      </td>
                      <td>
                        <b>Total</b>
                      </td>
                      <td>
                        <b></b>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>PAYMENT RECEIVED </td>
                      <td></td>
                    </tr>
                    <tr >
                      <td></td>

                      {  formData.cank_amount || formData.card_amount || formData.cash_amount || formData.chaque_amount || formData.exchange_amount  ? (
                        <>
                          {" "}
                          <td>
                            {toWords
                              .convert(
                                parseFloat(formData.cank_amount) +
                                  parseFloat(formData.card_amount) +
                                  parseFloat(formData.cash_amount) +
                                  parseFloat(formData.chaque_amount) +
                                  parseFloat(formData.exchange_amount)
                              )
                              .toUpperCase()}
                          </td>
                          <td>
                            €
                            {parseFloat(formData.cank_amount) +
                              parseFloat(formData.card_amount) +
                              parseFloat(formData.cash_amount) +
                              parseFloat(formData.chaque_amount) +
                              parseFloat(formData.exchange_amount)}
                          </td>
                        </>
                      ) : null}
                  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        {/* <div className="row" style={{ padding: "30px 0 30px 0" }}>
          <div className="col-12">
            <b>
              <input
                type="checkbox"
                onClick={(e) => {
                  console.log("checkbox : ", e.target.value);
                  handleChange("consent", !formData.consent);
                }}
              ></input>{" "}
              I consent to marketing from Muljis Jewellers by post /{" "}
              <em>email</em> / <em>telephone</em> / <em>whats app</em>
            </b>
          </div>
        </div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "25px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              console.log("button : ", formData);

              navigate(-1);
            }}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            // disabled={!formData.consent}
            onClick={() => {
              console.log(
                "totalPriceInWord : ",
                parseFloat(formData.cank_amount) +
                  parseFloat(formData.card_amount) +
                  parseFloat(formData.cash_amount) +
                  parseFloat(formData.chaque_amount) +
                  parseFloat(formData.exchange_amount)
              );
              setTotalPrice(
                parseFloat(formData.cank_amount) +
                parseFloat(formData.card_amount) +
                parseFloat(formData.cash_amount) +
                parseFloat(formData.chaque_amount) +
                parseFloat(formData.exchange_amount)
              );
              // console.log("convert : ",converter.toWords(parseFloat(otherFormData.Bank_amount)+parseFloat(otherFormData.Card_amount)+parseFloat(otherFormData.Cash_amount)+parseFloat(otherFormData.Chaque_amount)+parseFloat(otherFormData.Exchange_amount)))
              console.log("button : ", formData);

              if (formData.first_name == "") {
                setFormDataError((prev) => {
                  return { ...prev, first_nameErr: true };
                });
              }
              if (formData.surname == "") {
                setFormDataError((prev) => {
                  return { ...prev, surnameErr: true };
                });
              }
              if (formData.mobile == "+91") {
                setFormDataError((prev) => {
                  return { ...prev, mobileErr: true };
                });
              }
              if (formData.email == "") {
                setFormDataError((prev) => {
                  return { ...prev, emailErr: true };
                });
              }
              if (formData.telephone == "") {
                setFormDataError((prev) => {
                  return { ...prev, telephoneErr: true };
                });
              }
              if (
                formData.first_name !== "" &&
                formData.surname !== "" &&
                formData.mobile !== "" &&
                formData.email !== ""
              ) {
                // setOrderData({ customer_info: formData, products: location.state })
                saveDataInDB();

                // navigate('/PDF_Creation_Sale_Reciept', { state: {customer_info:{...formData,TodayDate:todayDate,...otherFormData,totalPrice:totalPrice,totalPriceInWord:converter.toWords(totalPriceInWord).toUpperCase()}}})
              } else {
                alert("Form fill properly");
              }
            }}
          >
            Next
          </Button>
          {/* <button onClick={()=>console.log(alllist,filteredInvoice)} >click to console</button> */}
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Sale_Reciept;
