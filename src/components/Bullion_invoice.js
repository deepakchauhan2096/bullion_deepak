import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { dataContext } from "../helpers/context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Auth } from "two-step-auth";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Helmet } from "react-helmet";
import { authentication } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import Autocomplete from "@mui/material/Autocomplete";

const Bullion_invoice = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      showName: handleOpen,
      //   consent: handleChange,
    };
  });
  const { globleData } = useContext(dataContext);

  const FormValue = props.data;
  const agreePrice = props.agreePrice;
  console.log(FormValue, agreePrice, "FormValue");
  let temp_invoice_num;
  let total_paid = 0;

  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  var To_genrate_invoice_number = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "");
  const [formData, setFormData] = useState({
    title: "MR",
    client_id: "Select ",
    first_name: "",
    surname: "",
    house_name: "",
    address_l2: "",
    city_and_town: "",
    postcode: "",
    telephone: "",
    mobile: "+91",
    email: "",

    // other_details

    Invoice_number: "",
    Served_by: "",
    Bank_amount: 0,
    Bank_remark: "No remarks",
    Card_amount: 0,
    Card_remark: "No remarks",
    Cash_amount: 0,
    Cash_remark: "No remarks",
    Chaque_amount: 0,
    Chaque_remark: "No remarks",
    Exchange_amount: 0,
    Exchange_remark: "No remarks",
    Date: utc,
    // total_value,
    // price_value,
    consent: true,
  });
  const [allClinetData, setAllClinetData] = useState([
    {
      client_id: "Select",
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
      mobile_od: "",
      consent: true,
      label: "Select Option",

      Invoice_number: "",
      Served_by: "",
      Bank_amount: 0,
      Bank_remark: "No remarks",
      Card_amount: 0,
      Card_remark: "No remarks",
      Cash_amount: 0,
      Cash_remark: "No remarks",
      Chaque_amount: 0,
      Chaque_remark: "No remarks",
      Exchange_amount: 0,
      Exchange_remark: "No remarks",
      Date: utc,
      total_value: 0,
      paid_value: 0,
    },
  ]);

  const initialState = {
    title: "MR",
    client_id: "Select client",
    first_name: "",
    surname: "",
    house_name: "",
    address_l2: "",
    city_and_town: "",
    postcode: "",
    telephone: "",
    mobile: "+917206685433",
    email: "",

    // other_details

    Invoice_number: "",
    Served_by: "",
    Bank_amount: 0,
    Bank_remark: "No remarks",
    Card_amount: 0,
    Card_remark: "No remarks",
    Cash_amount: 0,
    Cash_remark: "No remarks",
    Chaque_amount: 0,
    Chaque_remark: "No remarks",
    Exchange_amount: 0,
    Exchange_remark: "No remarks",
    Date: utc,
    consent: true,
  };

  const [formDataError, setFormDataError] = React.useState({
    first_nameErr: false,
    surnameErr: false,
    emailErr: false,
    mobileErr: false,
    telephoneErr: false,
    house_nameErr: false,
    city_and_townErr: false,
    postcodeErr: false,
  });
  const [orderData, setOrderData] = useState({
    customer_info: {},
    products: [],
  });
  const [mynumber, setnumber] = useState("7206685433");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [address, setAddress] = useState([]);
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [latest_invoice_count, setLatest_invoice_count] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open_otp, setOpen_otp] = useState(false);
  const [open_emailotp, setEmailopen_otp] = useState(false);
  const [email_otp, setEmailotp] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [clientid, setClientid] = useState([]);
  const [images, setImages] = useState([]);
  const [order_type, setOrder_type] = useState("Inquiry");
  const houseref = useRef();
  const townref = useRef();
  const postcoderef = useRef();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  let postcode_value;
  let totalPriceTemp = 0;
  useEffect(() => {
    console.log("useEffect : ", globleData);
    if (globleData != undefined) {
      setFormData(globleData);
    }

    const client_id = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/sold_product`)
        .then((res) => res.json())
        .then((data) => setClientid(data));
      console.log(clientid, "clientid data");
    };
    const getAllClientData = () => {
      // setLoader(true)
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/getclientdata`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
          console.log(err, "err in");
          // setLoader(false)
          throw Error(err);
        });

      // console.log(data2, "all data");
    };

    const latest_invoice_number = () => {
      fetch(
        `http://${process.env.REACT_APP_SERVER_IP}:4000/get_latest_invoice_numer`
      )
        .then((res) => res.json())
        .then((data) => setLatest_invoice_count(data.rows[0]));
    };
    latest_invoice_number();

    getAllClientData();
    client_id();
  }, []);

  console.log(globleData, "globleData Plain_J_Invoice");
  console.log("location : ", location.state);
  // This function change user data in state(formData)!
  function handleChange(key, value) {
    console.log(value, "value");
    // if (key === "consent") {
    //   value = !formData.consent;
    //   console.log(value, "value");
    // }
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }
  // This is to genrate invisible recaptcha!
  const genrate_recapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit(); 
        },
      },
      authentication
    );
  };
  // self explanatory (send phone otp) !
  const Send_Otp = () => {
    console.log("clicked");
    setOpen_otp(true);
    genrate_recapcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, formData.mobile, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // This function  verify phone otp !
  const verify_otp = () => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        setMessage(true);
        setotp("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(false);
      });
  };
  // This function send email otp
  async function login(emailId) {
    setEmailopen_otp(true);
    let res = await Auth(emailId, "MULJIS");
    console.log(res);
    console.log(res.mail);
    setEmailotp(res.OTP);
    console.log(res.OTP);
    console.log(res.success);
  }
  // This funtion verify email otp !
  const verify_email_otp = () => {
    console.log(email_otp, "&", otp, "email and otp ");
    if (email_otp == otp) {
      setMessage(true);
      setotp("");
    }
    if (email_otp != otp) {
      setMessage(false);
    }
  };

  if (latest_invoice_count?.date !== utc) {
    temp_invoice_num = 0;
  }
  if (latest_invoice_count?.date == utc) {
    temp_invoice_num = latest_invoice_count.invoice_num;
  }

  const refreshPage = () => {
    window.location.reload();
  };
  // This funtion saves data in database!
  const saveDataInDB = () => {
    console.log("formData : ", formData);
    if (formData.images != null || formData.images.length >= 1) {
      setImages(formData.images)
    }
    setLoader(true);
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, images: images, order_type: order_type }),
    })
      // fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
      //     method: "post",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   })
      .then((res) => res.json())
      .then((data) => {
        console.log("save client data > ", data);
        if (data.success == false) {
          alert("API failed (save client data)");
          setLoader(false);
        } else {
          // alert("Data Insert Successfully");

          // setFormData((prev) => {
          //     return { ...prev, client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate }
          // })
          // fetch(`http://${process.env.REACT_APP_SERVER_IP}/createorder`, {
          //   method: "post",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     customer_info: {
          //       ...formData,
          //       client_id: parseInt(data.res.rows[0].client_id),
          //     },
          //     products: FormValue,
          //   }),
          // })
            // .then((res) => res.json())
            // .then((response) => {
            //   console.log("craete order data > ", response);
            //   if (response.success == false) {
            //     alert("API failed (create order)");
            //     setLoader(false);
            //   } else {
                // alert("Order created Successfully");

                // setGlobleData({ ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate })
            //     console.log("trigger");
            //     navigate("/PDF_Creation", {
            //       state: {
            //         products: FormValue,
            //         agreePrice: agreePrice,
            //         customer_info: {
            //           ...formData,
            //           invoice_num: temp_invoice_num,
            //           order_id: parseInt(response.res.rows[0].order_id),
            //           client_id: parseInt(data.res.rows[0].client_id),
            //         },
            //       },
            //     });

            //     setLoader(false);
            //   }
            // })
            // .catch((err) => {
            //   console.log(err, "error last");
            //   alert("API not working (createorder)");
            //   setLoader(false);
            // });

            fetch(
              `http://${process.env.REACT_APP_SERVER_IP}:4000/product_user_data_for_bullion`,
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  customer_info: {
                    ...formData,
                    totalPriceTemp: totalPriceTemp,
                    total_paid: total_paid,
                    invoice_num:
                      formData.first_name +
                      "/" +
                      To_genrate_invoice_number +
                      " /" +
                      (temp_invoice_num + 1),
                    client_id: parseInt(data.res.rows[0].client_id),
                  },
                  products: FormValue,
                  agreePrice:agreePrice,
                  order_type:order_type,
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
                // alert("Order created Successfully");

                // setGlobleData({ ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id), TodayDate: location.state[0].TodayDate })
                console.log("trigger");
                navigate("/PDF_Creation", {
                  state: {
                    products: FormValue,
                    agreePrice:agreePrice,
                    customer_info: {
                      ...formData,
                      invoice_num: temp_invoice_num,
                      order_id: parseInt(response.res.rows[0].order_id),
                      client_id: parseInt(data.res.rows[0].client_id),
                    },
                  },
                });

                setLoader(false);
              }
            })
            .catch((err) => {
              console.log(err, "error last");
              alert("API not working (createorder)");
              setLoader(false);
            });

          if (latest_invoice_count.date != utc) {
            fetch(
              `http://${process.env.REACT_APP_SERVER_IP}:4000/new_invoice_count`,
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  date: utc,
                  invoice_num: latest_invoice_count.invoice_num + 1,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => console.log(data.rows));
          }

          if (latest_invoice_count.date == utc) {
            fetch(
              `http://${process.env.REACT_APP_SERVER_IP}:4000/same_day_invoice_count`,
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  date: utc,
                  invoice_num: latest_invoice_count.invoice_num + 1,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => console.log(data.rows));
          }
        }
      })
      .catch((err) => {
        console.log(err, "error last2");
        alert("API not working (insertclientdata)");
        setLoader(false);
      });

    console.log("end");
  };
  // This function add all price of client payments like bank amount, card amount etc!
  const total_price_calculate = () => {
    FormValue?.map((e) => {
      totalPriceTemp += parseFloat(e.total_price);
    });
    if (typeof formData.Bank_amount != Number) {
      total_paid += Number(formData.Bank_amount);
    }
    if (typeof formData.Card_amount != Number) {
      total_paid += Number(formData.Card_amount);
    }

    if (typeof formData.Cash_amount != Number) {
      total_paid += Number(formData.Cash_amount);
    }
    if (typeof formData.Chaque_amount != Number) {
      total_paid += Number(formData.Chaque_amount);
    }
    if (typeof formData.Exchange_amount != Number) {
      total_paid += Number(formData.Exchange_amount);
    }
  };
  total_price_calculate();

  //   This function convert selected  images to base64.
  const handleImages = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      const element = e.target.files[index];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((current) => [...current, reader.result.toString()]);
      };
      reader.readAsDataURL(element);
    }
  };
  // This function delete whatever, you give it !   
  var to_Delete = "";
  const delete_element = (cellValues) => {
    to_Delete = cellValues;
    var filteredArray = images.filter(function (e) {
      return e !== to_Delete;
    });
    setImages(filteredArray);
    console.log(images);
  };


  const columns = [
    { field: "code", headerName: "ct_number", width: 120 },
    { field: "metal_type", headerName: "metal_type", width: 120 },
    { field: "retail_price", headerName: "retail_price", width: 120 },
    { field: "product_id", headerName: "product_id", width: 120 },
    { field: "total_cost", headerName: "total_cost", width: 120 },
    { field: "purchase_date", headerName: "purchase_date", width: 120 },
  ];

  const rows = FormValue?.map((row) => ({
    code: row.ct_number,
    metal_type: row.metal_type,
    retail_price: row.retail_price,
    product_id: row.product_id,
    total_cost: row.total_cost,
    purchase_date: row.purchase_date,
  }));
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="http://api.addressnow.co.uk/css/addressnow-2.20.min.css?key=er14-mj73-hw81-tf66"
        />
        <script
          type="text/javascript"
          src="http://api.addressnow.co.uk/js/addressnow-2.20.min.js?key=er14-mj73-hw81-tf66"
        ></script>
      </Helmet>

      {/* <Sidebar /> */}
      <div className="">
        {/* modal for phone OTP */}
        <Modal
          open={open_otp}
          onClose={() => setOpen_otp(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "green" }}
            >
              Enter OTP Here.
            </Typography>
            {message === true ? <h6>Phone Number has been verify ✔️</h6> : null}
            {message === false ? <h6>Bad verification code ❌</h6> : null}
            <input value={otp} onChange={(e) => setotp(e.target.value)} />
            <br />

            <Button
              onClick={() => {
                setOpen_otp(false);
                setMessage();
              }}
            >
              Back to edit
            </Button>
            <Button onClick={verify_otp}>Verify</Button>
          </Box>
        </Modal>
        {/* modal for email otp  */}
        <Modal
          open={open_emailotp}
          onClose={() => setEmailopen_otp(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "green" }}
            >
              Enter OTP Here.
            </Typography>
            {message === true ? <h6>Email has been verify ✔️</h6> : null}
            {message === false ? <h6>Bad verification code ❌</h6> : null}
            <input value={otp} onChange={(e) => setotp(e.target.value)} />
            <br />

            <Button
              onClick={() => {
                setEmailopen_otp(false);
                setMessage();
              }}
            >
              Back to edit
            </Button>
            <Button onClick={verify_email_otp}>Verify</Button>
          </Box>
        </Modal>

        {/* modal for procede conformation */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "green" }}
            >
              Do you want to proceed ?
            </Typography>
            {/* <i>name :{formData.first_name} {formData.surname}</i><br/>
           <i>email: {formData.email}</i> <br/>
           <i>town/city: {formData.city_and_town}</i><br/>
           <i>postcode: {formData.postcode}</i> <br/>
           <i>mobile: {formData.mobile}</i> <br/> */}

            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{color:"red"}} >
              back  window to edit.
            </Typography> */}

            <Button onClick={handleClose}>Back to edit </Button>
            <Button
              variant="contained"
              disabled={!formData.consent}
              onClick={() => {
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

                if (formData.house_name == "") {
                  setFormDataError((prev) => {
                    return { ...prev, house_nameErr: true };
                  });
                }
                if (formData.city_and_town == "") {
                  setFormDataError((prev) => {
                    return { ...prev, city_and_townErr: true };
                  });
                }
                if (formData.postcode == "") {
                  setFormDataError((prev) => {
                    return { ...prev, postcodeErr: true };
                  });
                }
                if (
                  formData.first_name !== "" &&
                  formData.surname !== "" &&
                  formData.mobile !== "" &&
                  formData.email !== "" &&
                  formData.house_name !== "" &&
                  formData.city_and_town !== "" &&
                  formData.postcode !== ""
                ) {
                  setOrderData({
                    customer_info: formData,
                    products: location.state,
                  });
                  saveDataInDB();
                } else {
                  alert("Form fill properly and confirm address");
                }
              }}
            >
              Genrate Invoice
            </Button>
          </Box>
        </Modal>

        <div className="">
          <div
            onClick={(e) => {
              setOrder_type(e.target.value);
            }}
            style={{backgroundColor: "#f9f9ef",border:"0.5px solid gray",borderBottom:"0", accentColor:"red"}}

          >
            <input
              defaultChecked="checked"
              style={{
                height: "15px",
                width: "15px",
                margin: "6px"
              }}
              type="radio"
              name="order"
              value="Inquiry"
            />
            <label style={{ fontSize: 17, padding:"0 2px"}}> Inquiry</label>
            <input
              style={{
                height: "15px",
                width: "15px",
                margin: "6px"
              }}
              type="radio"
              name="order"
              value="Order"
            />
            <label style={{ fontSize: 17, padding:"0 2px"}}> Order</label>
          </div>

          <div className="">
            <div className="">
              <div className="col-lg-12 g-0">
                <table className="table-border">
                  <tbody>
                    <tr>
                      <td>
                        <b className='form-label-padding'>CLIENT ID</b>
                        <input
                          type="button"
                          className="button-input"
                          onClick={() => setFormData(initialState)}
                          value="Clear"
                        />

                      </td>
                      <td>
                        {allClinetData?.length >= 0 ? (
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
                                setFormData({ ...newValue, consent: true });
                              }
                            }}
                            sx={{ width: 200 }}
                            renderInput={(params) => (
                                // <input className="input-fields" {...params} title="Select Client" />
                              <TextField  className="input-fields" {...params} label="Select Client" />

                            )}
                          />
                        ) : (
                          <h6>⚠️ API not working, Please Check later..</h6>
                        )}
                      </td>
                      <td>
                        <b className='form-label-padding'>Date:</b>
                      </td>
                      <td colspan="2">
                        <input
                          disabled
                          className="input-fields"
                          value={formData.Date}
                          onChange={(e) => {
                            handleChange("Date", e.target.value);
                          }}
                        />
                      </td>
                      
                    </tr>
                    <tr>
                      <td scope="col">
                        <b className='form-label-padding'>First Name*</b>
                      </td>
                      <td scope="col">
                        <input
                          className="input-fields"
                          type="text"
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
                        />
                      </td>
                      <td>
                        <b className='form-label-padding'>SERVED BY</b>
                      </td>
                      <td colspan="2">
                        <select
                          className="input-fields"
                          value={formData.Served_by}
                          onChange={(e) => {
                            handleChange("Served_by", e.target.value);
                          }}
                        >
                          <option value="please select" selected>
                            Please select
                          </option>
                          <option value="person1">person 1</option>
                          <option value="person2">person 2</option>
                          <option value="person3">person 3</option>
                          <option value="person4">person 4</option>
                        </select>
                      </td>
                      {/* <td>
                      </td> */}

                    </tr>
                    <tr>
                      <td scope="col">
                        <b className='form-label-padding'>Surname*</b>
                      </td>
                      <td scope="col">
                        <input
                          className="input-fields"
                          type="text"
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
                        />
                      </td>
                      <td>
                        <b className='form-label-padding'>VAT NUMBER</b>
                      </td>
                      <td colspan="2">GB 372718438</td>
                      
                    </tr>
                    {/* <tr>
                        <td scope="col">
                          <b>Number</b>
                        </td>
                        <td scope="col">
                          <TextField
                            // value={formData.house_name}
                            onChange={(e) => {
                              handleChange("telephone", e.target.value);
                            }}
                          ></TextField>
                        </td>
                      </tr> */}
                    <tr>
                      <td scope="col">
                        <b className='form-label-padding'>
                          Road/Street &nbsp; &nbsp;{" "}
                          <button
                            title="Click to Refresh!"
                            style={{
                              color: "#000",
                              border: "none",
                            }}
                            onClick={refreshPage}
                          >
                            ⟳
                          </button>
                        </b>
                      </td>
                      <td scope="col" style={{ display: "flex" }}>
                        <input
                          className="input-fields"
                          style={{ width: "100%" }}
                          autocomplete="on"
                          type="text"
                          ref={houseref}
                          id="house_name"
                          value={formData.house_name}
                          onInput={(e) => {
                            console.log("e :>>> ", e);
                            handleChange("house_name", houseref.current.value);
                          }}
                        />
                        <button
                          onClick={() => {
                            console.log(
                              houseref.current.value,
                              "__",
                              townref.current.value,
                              "__",
                              postcoderef.current.value
                            );
                            handleChange("house_name", houseref.current.value);
                            handleChange(
                              "city_and_town",
                              townref.current.value
                            );
                            handleChange("postcode", postcoderef.current.value);
                            alert("Saved ✔️");
                          }}
                        >
                          confirm
                        </button>

                        {/* {address ? (
                            <>
                              <select style={{ width: "60%", margin: "1%" }} onChange={(e)=>{}}>
                                <option disabled selected>
                                  select address{" "}
                                </option>
                                {
                                  <option value={address.address}>
                                    {address.address.line_1},
                                    {address.address.line_2},
                                    {address.address.town_or_city}
                                  </option>
                                }
                              </select>
                            </>
                          ) : null} */}
                      </td>
                      <td className='form-label-padding' style={{background:"#FFFFE0"}}>
                        <b>Payment Details</b>
                      </td>
                      <td className='form-label-padding' style={{background:"#FFFFE0"}}>
                        <b>Amount</b>
                      </td>
                      <td className='form-label-padding' style={{background:"#FFFFE0"}}>
                        <b>Remark</b>
                      </td>

                    </tr>

                    <tr>
                      <td scope="col" className='form-label-padding'>
                        <b>City/Town</b>
                      </td>
                      <td scope="col">
                        <input
                          className="input-fields"
                          style={{ width: "100%" }}
                          ref={townref}
                          id="city_and_town"
                          value={formData.city_and_town}
                          onInput={(e) => {
                            console.log(e.target.value, "address id");
                            handleChange(
                              "city_and_town",
                              townref.current.value
                            );
                          }}
                        />
                      </td>
                      <td className='form-label-padding'><b>Bank</b></td>
                        <td>
                          <input
                            className="input-fields"
                            type="number"
                            step="0.01"
                            value={formData.Bank_amount}
                            onChange={(e) => {
                              handleChange(
                                "Bank_amount",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="input-fields"
                            value={formData.Bank_remark}
                            onChange={(e) => {
                              handleChange("Bank_remark", e.target.value);
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                      <td scope="col"  className='form-label-padding'>
                        <b>Postcode</b>
                      </td>
                      <td scope="col">
                        <input
                          className="input-fields"
                          type="text"
                          style={{ width: "100%" }}
                          ref={postcoderef}
                          id="postcode"
                          value={formData.postcode}
                          onInput={(e) => {
                            console.log(e.target.value, "address id");
                            handleChange("postcode", postcoderef.current.value);
                          }}
                        />
                      </td>
                      <td className='form-label-padding'><b>CARD</b></td>
                        <td>
                          <input
                            className="input-fields"
                            type="number"
                            step="0.01"
                            value={formData.Card_amount}
                            onChange={(e) => {
                              handleChange(
                                "Card_amount",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="input-fields"
                            value={formData.Card_remark}
                            onChange={(e) => {
                              handleChange("Card_remark", e.target.value);
                            }}
                          />
                        </td>
                      
                    </tr>

                    <tr>
                      <td scope="col" className='form-label-padding'>
                        <b>Mobile*</b>
                      </td>
                      <td style={{ display: "flex" }}>
                        <input
                          className="input-fields"
                          type="number"
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
                        />{" "}
                        {formData.mobile.length >= 13 ? (
                          <button className="button-input" onClick={Send_Otp}>Send OTP</button>
                        ) : null}
                      </td>
                      <td className='form-label-padding'><b>CASH</b></td>
                        <td>
                          <input
                            className="input-fields"
                            type="number"
                            step="0.01"
                            value={formData.Cash_amount}
                            onChange={(e) => {
                              handleChange(
                                "Cash_amount",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="input-fields"
                            value={formData.Cash_remark}
                            onChange={(e) => {
                              handleChange("Cash_remark", e.target.value);
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                      <td scope="col" className='form-label-padding'>
                        <b>Email*</b>
                      </td>
                      <td scope="col" style={{display:"flex"}}>
                        <input
                          className="input-fields"
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
                        />
                        {formData.email.length >= 4 ? (
                          <button className="button-input" onClick={() => login(formData.email)}>
                            send OTP
                          </button>
                        ) : null}
                      </td>
                      <td className='form-label-padding'><b>CHEQUE</b></td>
                        <td>
                          <input
                            className="input-fields"
                            type="number"
                            step="0.01"
                            value={formData.Chaque_amount}
                            onChange={(e) => {
                              handleChange(
                                "Chaque_amount",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="input-fields"
                            value={formData.Chaque_remark}
                            onChange={(e) => {
                              handleChange("Chaque_remark", e.target.value);
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                      <td colspan="2">

                      </td>
                      <td className='form-label-padding'><b>EXCHANGE</b></td>
                        <td>
                          <input
                            className="input-fields"
                            type="number"
                            step="0.01"
                            value={formData.Exchange_amount}
                            onChange={(e) => {
                              handleChange(
                                "Exchange_amount",
                                Number(e.target.value)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            className="input-fields"
                            value={formData.Exchange_remark}
                            onChange={(e) => {
                              handleChange("Exchange_remark", e.target.value);
                            }}
                          />
                        </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
            <br />
          </div>
        </div>

        {order_type == "Order" ? (
                    <div 
                    
                      style={{
                        background: "#fff",
                        width: "48%",
                        padding: 5,
                        margin: "0.5%",
                        borderRadius: "0px",
                        border: "0.5px solid #000",
                        
                      }}
                    >
                      <label for="ID_1" style={{color:"blue"}}> ID's Check : {images?.length || formData.images?.length} Selcted </label>
                      <br />
                      <input
                        style={{ margin: "2%" }}
                        type="file"
                        name="ID_1  "
                        multiple
                        onChange={(e) => handleImages(e)}
                      />

                      {/* <button
                        style={{
                          background: "#fff",
                          color: "#1976D2",
                          border: "1px solid",
                        }}
                        onClick={() => console.log(images)}
                      >
                        Show
                      </button> */}
                      {formData.images != null ?
                       (
                        <div>
                          {formData.images.map((e, index) => (
                            <div
                              style={{
                                borderRadius: "10px",
                                border: "1px solid black",
                                margin: "2%",
                              }}
                            >
                              <img
                                src={e}
                                style={{
                                  borderRadius: "10px",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                              {/* <center>
                                <button
                                onClick={()=>delete_element(e)}
                                  style={{
                                    borderRadius: "10px",
                                    background: "#fff",
                                    color: "red",
                                    width: "80%",
                                    border: "none",
                                    margin: "2%",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Delete 🗑️
                                </button>
                              </center> */}
                            </div>
                          ))}
                        </div>
                      ) : null
                      }
                      {images ? (
                        <div>
                          {images.map((e, index) => (
                            <div
                              style={{
                                borderRadius: "10px",
                                border: "1px solid black",
                                margin: "2%",
                              }}
                            >
                              <img
                                src={e}
                                style={{
                                  borderRadius: "10px",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                              <center>
                                <button
                                onClick={()=>delete_element(e)}
                                  style={{
                                    borderRadius: "10px",
                                    background: "#fff",
                                    color: "red",
                                    width: "80%",
                                    border: "none",
                                    margin: "2%",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Delete 🗑️
                                </button>
                              </center>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  

        {/* {FormValue ? (
            <DataGrid
              style={{ height: "28rem", width: "100%" }}
              rows={rows}
              columns={columns}
              pageSize={20}
              getRowId={(row) => row.code}
              rowsPerPageOptions={[20]}
              components={{ Toolbar: GridToolbar }}
            />
          ) : null} */}

        {/* <Button
              variant="contained"
              onClick={() => {
                console.log("button : ", formData);
                //    navigate.goback()
                navigate(-1);
              }}
            >
              Go Back
            </Button> */}
        {/* <Button   onClick={handleOpen}>Next</Button> */}
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <button onClick={()=> console.log(allClinetData) } >click to console</button> */}
      <div id="sign-in-button"></div>
    </>
  );
});

export default Bullion_invoice;
