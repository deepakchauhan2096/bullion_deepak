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
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig
} from "react-select";
import { Converter } from "any-number-to-words";
const converter = new Converter();
// import  "firebase/app";

// import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";

// const phoneNumber = getPhoneNumberFromUserTextField();

const Sale_Reciept = () => {
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

    consent: false,
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
      let converNumber = converter.toWords(1000);

      console.log("coonverNumber : ", converNumber);

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
    setOtherFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  const saveDataInDB = () => {
    console.log("formData : ", formData);

    setLoader(true);
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("save client data > ", data);
        if (data.success == false) {
          alert("API failed (save client data)");
          setLoader(false);
        } else {
          alert("Data Insert Successfully");

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
                  totalPriceInWord: converter
                    .toWords(totalPriceInWord)
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
                      totalPriceInWord: converter
                        .toWords(totalPriceInWord)
                        .toUpperCase(),
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

          //    navigate('/PDF_Creation',{state:{products:location.state,customer_info:formData}})
        }
      })
      .catch((err) => {
        console.log(err);
        alert("API not working (insertclientdata)");
        setLoader(false);
      });

    console.log("end");
  };

  const columns = [
    {
      field: "item",
      headerName: "ITEM",
      width: 120,
    },
    {
      field: "item_type",
      headerName: "ITEM TYPE",
      width: 120,
    },
    {
      field: "product_sub_category",
      headerName: "PRODUCT SUB CATEGORY",
      width: 120,
    },
    { field: "Wt_est", headerName: "WT EST", width: 120 },

    {
      field: "ref_su",
      headerName: "REF SU",
      width: 120,
    },
    { field: "product_ref", headerName: "PRODUCT REF", width: 120 },
    { field: "price", headerName: "PRICE", width: 120 },
    {
      field: "product_size",
      headerName: "PRODUCT SIZE",
      width: 120,
    },
    {
      field: "metal_selected",
      headerName: "Metal",
      width: 120,
    },
    {
      field: "TodayDate",
      headerName: "Time & Date",
      width: 120,
    },
    {
      field: "notes_selected",
      headerName: "Notes",
      width: 120,
    },
  ];

  const rows = location.state?.map((row) => ({
    item_id: row.item_id,
    TodayDate: row.TodayDate,
    item: row.item,
    dropdown: row.item_type_selected,
    item_type: row.item_type_selected,
    product_sub_category: row.product_sub_cat_selected,
    ref_su: row.supplier_selected,
    Wt_est: row.Wt_est,
    product_ref: row.product_ref,
    price: row.price,
    product_size_dropdown: row.product_size_selected,
    metal_selected: row.metal_selected,
    notes_selected: row.notes_selected,
    product_size: row.product_size_selected,
  }));

  return (
    <>
      <Sidebar />
      <div
        className=""
        style={{
          backgroundColor: "beige",
          height: "100vh",
          position: "relative",
        }}
      >
        <form className="">
          <div className="container" style={{ backgroundColor: "white" }}>
            <div className="row">
              <div className="col-lg-6 g-0">
                <table
                  className="table-border"
                  style={{ backgroundColor: "white" }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <b className="form-label-padding">CLINT ID</b>
                      </td>
                      <td>
                        <Autocomplete
                          style={{ backgroundColor: "beige" }}
                          disablePortal
                          //  className="input-fields"
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
                              setFormData({ ...newValue, consent: false });
                            }
                          }}
                          sx={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select Client" />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">
                        <b className="form-label-padding">First Name*</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">Surname*</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">Road/Street</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">City/Town</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">Postcode</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">Mobile*</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                        <b className="form-label-padding">Email*</b>
                      </td>
                      <td
                        scope="col"
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      >
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
                  </tbody>
                </table>
              </div>
              <div className="col-lg-6 g-0">
                <table className="table-border">
                  <tbody>
                    <tr>
                      <td>
                        <b className="form-label-padding">Date:</b>
                      </td>
                      <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                        {todayDate}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b className="form-label-padding">Invoice Number:</b>
                      </td>
                      <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                        <b
                          value={otherFormData.Invoice_number}
                          onChange={(e) => {
                            handleChangeOtherData(
                              "Invoice_number",
                              e.target.value
                            );
                          }}
                        >
                          {otherFormData.Invoice_number}
                        </b>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <b className="form-label-padding">SERVED BY</b>
                      </td>
                      <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                        <b className="form-label-padding">
                          {formData.Served_by}
                        </b>
                        {/* <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={[{label:"name1"},{label:"name2"},{label:"name3"},{label:"name4"},]}
                                            // onChange={(e)=>{
                                            //     console.log("ek : ",e)
                                            //     // setFormData()
                                            // }}
                                            // getOptionLabel={(option) => {
                                            //     console.log("option : ",option)
                                            // }}
                                            onChange={(event, newValue) => {
                                                console.log("newValue : ",newValue);
                                                if(newValue!=null){

                                                    handleChangeOtherData("Served_by", newValue)
                                                }
                                              }}
                                            sx={{ width: 200 }}
                                            renderInput={(params) => <TextField {...params} label="Select Option" />}
                                        /> */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="col-lg-24 g-0">
                  <table className="table-border">
                    <tbody>
                      <tr>
                        <td>
                          <b className="form-label-padding">Payment Details</b>
                        </td>
                        <td>
                          <b className="form-label-padding">Amount</b>
                        </td>
                        <td>
                          <b className="form-label-padding">Remark</b>
                        </td>
                      </tr>

                      <tr>
                        <td>BANK</td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Bank_amount}
                            onChange={(e) => {
                              console.log(
                                "Bank_amount : ",
                                typeof e.target.value
                              );
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "Bank_amount",
                                  e.target.value
                                );
                                setTotalPrice(
                                  () =>
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("Bank_amount", 0);
                              }
                            }}
                          >
                            {otherFormData.Bank_amount}
                          </b>
                        </td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Bank_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "Bank_remark",
                                e.target.value
                              );
                            }}
                          >
                            {otherFormData.Bank_remark}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>CARD</td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Card_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "Card_amount",
                                  e.target.value
                                );
                                setTotalPrice(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("Card_amount", 0);
                              }
                            }}
                          >
                            {otherFormData.Card_amount}
                          </b>
                        </td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Card_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "Card_remark",
                                e.target.value
                              );
                            }}
                          >
                            {otherFormData.Card_remark}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>CASH</td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Cash_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "Cash_amount",
                                  e.target.value
                                );
                                setTotalPrice(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("Cash_amount", 0);
                              }
                            }}
                          >
                            {otherFormData.Cash_amount}
                          </b>
                        </td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Cash_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "Cash_remark",
                                e.target.value
                              );
                            }}
                          >
                            {otherFormData.Cash_remark}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>CHEQUE</td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Chaque_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "Chaque_amount",
                                  e.target.value
                                );
                                setTotalPrice(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(e.target.value) +
                                    parseFloat(otherFormData.Exchange_amount)
                                );
                              } else {
                                handleChangeOtherData("Chaque_amount", 0);
                              }
                            }}
                          >
                            {otherFormData.Chaque_amount}
                          </b>
                        </td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Chaque_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "Chaque_remark",
                                e.target.value
                              );
                            }}
                          >
                            {otherFormData.Chaque_remark}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>EXCHANGE</td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Exchange_amount}
                            onChange={(e) => {
                              if (e.target.value != "") {
                                handleChangeOtherData(
                                  "Exchange_amount",
                                  e.target.value
                                );
                                setTotalPrice(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(e.target.value)
                                );
                                setTotalPriceInWord(
                                  () =>
                                    parseFloat(otherFormData.Bank_amount) +
                                    parseFloat(otherFormData.Card_amount) +
                                    parseFloat(otherFormData.Cash_amount) +
                                    parseFloat(otherFormData.Chaque_amount) +
                                    parseFloat(e.target.value)
                                );
                              } else {
                                handleChangeOtherData("Exchange_amount", 0);
                              }
                              // console.log("typeof : ",typeof (parseFloat(otherFormData.Bank_amount)+parseFloat(otherFormData.Card_amount)+parseFloat(otherFormData.Cash_amount)+parseFloat(otherFormData.Chaque_amount)+parseFloat(e.target.value)))
                            }}
                          >
                            {otherFormData.Exchange_amount}
                          </b>
                        </td>
                        <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                          <b
                            value={otherFormData.Exchange_remark}
                            onChange={(e) => {
                              handleChangeOtherData(
                                "Exchange_remark",
                                e.target.value
                              );
                            }}
                          >
                            {otherFormData.Exchange_remark}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-lg-24 g-0">
                <table className="table-border">
                  <tbody>
                    <tr>
                      <td>
                        <b className="form-label-padding"></b>
                      </td>
                      <td>
                        <b className="form-label-padding">Total</b>
                      </td>
                      <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                        <b className="form-label-padding"></b>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>PAYMENT RECEIVED </td>
                      <td
                        style={{ backgroundColor: "rgb(251, 251, 244)" }}
                      ></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        {converter
                          .toWords(
                            parseFloat(otherFormData.Bank_amount) +
                              parseFloat(otherFormData.Card_amount) +
                              parseFloat(otherFormData.Cash_amount) +
                              parseFloat(otherFormData.Chaque_amount) +
                              parseFloat(otherFormData.Exchange_amount)
                          )
                          .toUpperCase()}
                      </td>
                      <td style={{ backgroundColor: "rgb(251, 251, 244)" }}>
                        €
                        {parseFloat(otherFormData.Bank_amount) +
                          parseFloat(otherFormData.Card_amount) +
                          parseFloat(otherFormData.Cash_amount) +
                          parseFloat(otherFormData.Chaque_amount) +
                          parseFloat(otherFormData.Exchange_amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        <div className="row" style={{ padding: "30px 0 30px 0" }}>
          <div className="col-12">
            <b className="form-label-padding">
              <input
                type="checkbox"
                style={{accentColor:"#856108",background:"#856108"}}
                onClick={(e) => {
                  console.log("checkbox : ", e.target.value);
                  handleChange("consent", !formData.consent);
                }}
              ></input>{" "}
              I consent to marketing from Muljis Jewellers by post /{" "}
              <em>email</em> / <em>telephone</em> / <em>whats app</em>
            </b>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "25px",
          }}
        >
          <button
            className="modalbtn"
            onClick={() => {
              console.log("button : ", formData);
              //    navigate.goback()
              navigate(-1);
            }}
          >
            Go Back
          </button>
          <button
            className="modalbtn"
            disabled={!formData.consent}
            onClick={() => {
              console.log(
                "totalPriceInWord : ",
                parseFloat(otherFormData.Bank_amount) +
                  parseFloat(otherFormData.Card_amount) +
                  parseFloat(otherFormData.Cash_amount) +
                  parseFloat(otherFormData.Chaque_amount) +
                  parseFloat(otherFormData.Exchange_amount)
              );
              console.log(parseFloat(otherFormData.Bank_amount));
              console.log(parseFloat(otherFormData.Card_amount));
              console.log(parseFloat(otherFormData.Card_amount));
              console.log(parseFloat(otherFormData.Cash_amount));
              console.log(parseFloat(otherFormData.Chaque_amount));
              console.log(parseFloat(otherFormData.Exchange_amount));
              console.log(otherFormData);
              console.log(
                "convert : ",
                converter.toWords(
                  parseFloat(otherFormData.Bank_amount) +
                    parseFloat(otherFormData.Card_amount) +
                    parseFloat(otherFormData.Cash_amount) +
                    parseFloat(otherFormData.Chaque_amount) +
                    parseFloat(otherFormData.Exchange_amount)
                )
              );
              console.log("button : ", formData);
              // signin()
              // signin()
              // onSignInSubmit()
              // if(formData)
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
          </button>
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
