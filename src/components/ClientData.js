import React, {  useState,useContext } from 'react'
import Sidebar from './Sidebar'
import { dataContext } from "../helpers/context";
import styled from 'styled-components'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
// import { auth, firebase } from '../../firebase';
import TextField from '@mui/material/TextField';

import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
// import  "firebase/app";

// import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from "firebase/auth";

// const phoneNumber = getPhoneNumberFromUserTextField();




const ClientData = () => {
    const { formValues } = useContext(dataContext);
    const { globleData,setGlobleData } = useContext(dataContext);


    const [formData, setFormData] = useState({
        title: "MR",
        client_id: "XXXXXXX",
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

        relation_OD: "",
        name_OD: "",
        surname_OD: "",
        comments_OD: "",
        email_OD: "",
        mobile_OD: "",
        consent: false

    })

    const [formDataError, setFormDataError] = React.useState({
        first_nameErr: false,
        surnameErr: false,
        emailErr: false,
        mobileErr: false,
        telephoneErr: false
    });
    const [orderData, setOrderData] = useState({ customer_info: {}, products: [] })
    const [mynumber, setnumber] = useState("7206685433");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const [loader, setLoader] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    console.log(globleData, "globleData")
    console.log("location : ", location.state)
    const Select = styled.select`
    width:100%;
    padding:0;
    margin:0;
    `
    const Option = styled.option`
    padding:0;
    margin:0;
    `

    function handleChange(key, value) {
        setFormData((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    //     const configureCaptcha = () => {
    //         window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //             'size': 'invisible',
    //             'callback': (response) => {
    //                 // reCAPTCHA solved, allow signInWithPhoneNumber.
    //                 this.onSignInSubmit();
    //                 console.log("Recaptca varified")
    //             },
    //             defaultCountry: "IN"
    //         });
    //     }


    //     const onSignInSubmit = (e) => {
    //         // e.preventDefault()
    //         configureCaptcha()
    //         const phoneNumber = "+91" + mynumber
    //         console.log(phoneNumber)
    //         const appVerifier = window.recaptchaVerifier;
    //         firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //             .then((confirmationResult) => {
    //                 // SMS sent. Prompt user to type the code from the message, then sign the
    //                 // user in with confirmationResult.confirm(code).
    //                 window.confirmationResult = confirmationResult;
    //                 console.log("OTP has been sent")
    //                 // ...
    //             }).catch((error) => {
    //                 // Error; SMS not sent
    //                 // ...
    //                 console.log("SMS not sent")
    //             });
    //     }
    //     const onSubmitOTP = (e) => {
    //         // e.preventDefault()
    //         const code = this.state.otp
    //         console.log(code)
    //         window.confirmationResult.confirm(code).then((result) => {
    //             // User signed in successfully.
    //             const user = result.user;
    //             console.log(JSON.stringify(user))
    //             alert("User is verified")
    //             // ...
    //         }).catch((error) => {
    //             // User couldn't sign in (bad verification code?)
    //             // ...
    //         });
    //     }



    //    const handleClick = () => {
    //         let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    //         let number = '+917206685433';
    //         firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
    //             let code = prompt('enter the otp', '');
    //             if (code == null) return;
    //             e.confirm(code).then(function (result) {
    //                 console.log(result.user, 'user');
    //                 document.querySelector('label').textContent = result.user.phoneNumber + "Number Verified";

    //             }).catch((error) => {
    //                 console.log("error : ", error)
    //             })

    //         })
    //     }

    // const signin = () => {
    //     // const auth = getAuth();

    //     // console.log("mynumber : ", mynumber, auth)
    //     // console.log("window.recaptchaVerifier : ",window.recaptchaVerifier)
    //     // window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    //     //     'size': 'invisible',
    //     //     'callback': (response) => {
    //     //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     //     //   onSignInSubmit();
    //     //     console.log("done")
    //     //     }
    //     //   }, auth);

    //     // let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    //     //   const appVerifier = window.verify;

    //     // auth.signInWithPhoneNumber(mynumber, verify)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             // window.confirmationResult = confirmationResult;
    //             // ...
    //             console.log("otp sent", confirmationResult)
    //         }).catch((error) => {
    //             // Error; SMS not sent
    //             // ...
    //             console.log("error : ", error)
    //         });


    // }


    // const saveDataInDB =  () => {
    //     console.log("formData : ", formData)

    //     setLoader(true)
    //    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
    //         method: "post",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData)
    //     }
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("save client data > ", data)
    //             if (data.success == false) {
    //                 alert("API failed (save client data)")
    //                 setLoader(false)
    //             } else {
    //                 alert("Data Insert Successfully")


    //                 setFormData((prev) => {
    //                     return { ...prev, client_id: parseInt(data.res.rows[0].client_id) }
    //                 })
    //                 fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/createorder`, {
    //                     method: "post",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({ customer_info: { ...formData, client_id: parseInt(data.res.rows[0].client_id) }, products: location.state })
    //                 }
    //                 )
    //                     .then((res) => res.json())
    //                     .then((response) => {
    //                         console.log("craete order data > ", response)
    //                         if (response.success == false) {
    //                             alert("API failed (create order)")
    //                             setLoader(false)
    //                         } else {
    //                             alert("Order created Successfully")


                               
                                    
    //                                 navigate('/PDF_Creation', { state: { products: location.state, customer_info: { ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id) } } })
                              
    //                             setLoader(false)
    //                         }
    //                     }).catch((err) => {
    //                         console.log(err);
    //                         alert("API not working (createorder)")
    //                         setLoader(false)
    //                     });

    //                 //    navigate('/PDF_Creation',{state:{products:location.state,customer_info:formData}})

    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //             alert("API not working (insertclientdata)")
    //             setLoader(false)
    //         });

    //     console.log("end")
    // }

    const saveDataInDB =  () => {
        console.log("formData : ", formData)

        setLoader(true)
       fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/insertclientdata`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("save client data > ", data)
                if (data.success == false) {
                    alert("API failed (save client data)")
                    setLoader(false)
                } else {
                    alert("Data Insert Successfully")
                    setLoader(false)

                    // setFormData((prev) => {
                    //     return { ...prev, client_id: parseInt(data.res.rows[0].client_id),TodayDate:location.state[0].TodayDate }
                    // })
                    // fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/createorder`, {
                    //     method: "post",
                    //     headers: { "Content-Type": "application/json" },
                    //     body: JSON.stringify({ customer_info: { ...formData, client_id: parseInt(data.res.rows[0].client_id),TodayDate:location.state[0].TodayDate }, products: location.state })
                    // }
                    // )
                    //     .then((res) => res.json())
                    //     .then((response) => {
                    //         console.log("craete order data > ", response)
                    //         if (response.success == false) {
                    //             alert("API failed (create order)")
                    //             setLoader(false)
                    //         } else {
                    //             alert("Order created Successfully")


                    //             setGlobleData({ ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id),TodayDate:location.state[0].TodayDate })
                    //                 console.log("trigger")
                                    // navigate('/PDF_Creation', { state: { products: formValues, customer_info: { ...formData, order_id: parseInt(response.res.rows[0].order_id), client_id: parseInt(data.res.rows[0].client_id),TodayDate:location.state[0].TodayDate } } })
                              
                    //             setLoader(false)
                    //         }
                    //     }).catch((err) => {
                    //         console.log(err);
                    //         alert("API not working (createorder)")
                    //         setLoader(false)
                    //     });

                      navigate('/PDF_Creation',{state:{products:formValues,customer_info:formData}})

                }
            }).catch((err) => {
                console.log(err);
                alert("API not working (insert client data)")
                setLoader(false)
            });

        console.log("end")
    }


    const columns = [

        { field: "code", headerName: "new_code", width: 120 },
        { field: "description", headerName: "discription", width: 120 },
    
        { field: "bm_minted_value", headerName: "BM MINTED", width: 120 },
        { field: "1", headerName: "BM CAST", width: 120 },
        { field: "mj_pamp_value", headerName: "MJ PAMP", width: 120 },

        { field: "quant", headerName: "QNT Value", width: 80 },
        {
          field: "bbp_bv_link_price_value",
          headerName: "BBP BV LINK PRICE",
          width: 150,
        },
        {
          field: "bbp_bv_formula_price_value",
          headerName: "BBP PAMP FORMULA PRICE",
          width: 160,
        },
        {
          field: "bbp_pamp_link_price_value",
          headerName: "BBP PAMP LINK PRICE",
          width: 150,
        },
        {
          field: "bbp_pamp_formula_value",
          headerName: "BBP PAMP FORMULA",
          width: 150,
        },
        { field: "7", headerName: "GBS BV", width: 120 },
        { field: "8", headerName: "GBS UMICO", width: 120 },
        { field: "9", headerName: "GBS PAMP", width: 120 },
        { field: "10", headerName: "OTHER CBV", width: 120 },
        { field: "11", headerName: "OTHER C PAMP", width: 120 },
        { field: "12", headerName: "BM MINTED TABLE ", width: 120 },
        {
          field: "13",
          headerName: "BM COST TABLE",
          width: 120,
        },
      ];
    
      const rows = formValues?.map((row) => ({
        code: row.code,
        description: row.description,
        bm_minted_value: row.bm_minted_value,
        mj_pamp_value: row.mj_pamp_value,
        bbp_bv_link_price_value: row.bbp_bv_link_price_value,
        bbp_bv_formula_price_value: row.bbp_bv_formula_price_value,
        bbp_pamp_link_price_value: row.bbp_pamp_link_price_value,
        bbp_pamp_formula_value: row.bbp_pamp_formula_value,
        quant:row.quant
      }));
    
    return (
        <>
            <Sidebar />
            <div className='container-fluid' style={{ backgroundColor: "" }}>
                <div className="row">
                    <p className='bg-secondary text-white py-2'>Client Data</p>
                </div>

                <form className='p-4' >
                    <div className="container" style={{ backgroundColor: "" }}>
                        <div className="row">
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <tbody>
                                        <tr>

                                            <th><b>Title</b></th>
                                            <th>
                                                <select class="form-control rounded-0" id="exampleFormControlSelect1"
                                                    value={formData.title}
                                                    onChange={(e) => {
                                                        handleChange("title", e.target.value)
                                                    }}
                                                >
                                                    <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>DR</option>
                                                    <option>OTHER</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td ><b>CLINT ID</b></td>
                                            <td >XXXXXXX</td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>First Name*</b></td>
                                            <td scope="col"><TextField
                                                value={formData.first_name}
                                                error={formDataError.first_nameErr}
                                                onChange={(e) => {
                                                    console.log("e : ", e.target.value)
                                                    handleChange("first_name", e.target.value)
                                                    if (e.target.value != "") {
                                                        setFormDataError(prev => {
                                                            // console.log("text : ",text)
                                                            return { ...prev, first_nameErr: false };
                                                        })
                                                    }
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Surname*</b></td>
                                            <td scope="col"><TextField
                                                value={formData.surname}
                                                error={formDataError.surnameErr}
                                                onChange={(e) => {
                                                    handleChange("surname", e.target.value)
                                                    if (e.target.value != "") {
                                                        setFormDataError(prev => {
                                                            // console.log("text : ",text)
                                                            return { ...prev, surnameErr: false };
                                                        })
                                                    }
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>House Name</b></td>
                                            <td scope="col"><TextField
                                                value={formData.house_name}
                                                onChange={(e) => {
                                                    handleChange("house_name", e.target.value)

                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Address L2</b></td>
                                            <td scope="col"><TextField
                                                value={formData.address_l2}
                                                onChange={(e) => {
                                                    handleChange("address_l2", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>City/Town</b></td>
                                            <td scope="col"><TextField
                                                value={formData.city_and_town}
                                                onChange={(e) => {
                                                    handleChange("city_and_town", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Postcode</b></td>
                                            <td scope="col"><TextField
                                                value={formData.postcode}
                                                onChange={(e) => {
                                                    handleChange("postcode", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col">Telephone*</td>
                                            <td scope="col"><TextField
                                                value={formData.telephone}
                                                error={formDataError.telephoneErr}
                                                onChange={(e) => {
                                                    handleChange("telephone", e.target.value)
                                                    if (e.target.value != "") {
                                                        setFormDataError(prev => {
                                                            // console.log("text : ",text)
                                                            return { ...prev, telephoneErr: false };
                                                        })
                                                    }
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Mobile*</b></td>
                                            <td scope="col"><TextField
                                                value={formData.mobile}
                                                error={formDataError.mobileErr}
                                                onChange={(e) => {
                                                    handleChange("mobile", e.target.value)
                                                    if (e.target.value != "") {
                                                        setFormDataError(prev => {
                                                            // console.log("text : ",text)
                                                            return { ...prev, mobileErr: false };
                                                        })
                                                    }
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Email*</b></td>
                                            <td scope="col"><TextField
                                                value={formData.email}
                                                error={formDataError.emailErr}
                                                onChange={(e) => {
                                                    handleChange("email", e.target.value)
                                                    if (e.target.value != "") {
                                                        setFormDataError(prev => {
                                                            // console.log("text : ",text)
                                                            return { ...prev, emailErr: false };
                                                        })
                                                    }
                                                }}
                                            ></TextField></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <tbody>
                                        <tr>
                                            <td colspan="2"><b>Others Details:</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Relation</b></td>
                                            <td ><select class="form-control rounded-0" id="exampleFormControlSelect1"
                                                value={formData.relation_OD}
                                                onChange={(e) => {
                                                    handleChange("relation_OD", e.target.value)
                                                }}
                                            >
                                                <option>PARTNER</option>
                                                <option>WIFE</option>
                                                <option>HUSBAND</option>
                                                <option>FRIEND</option>
                                                <option>EDITABLE AUTO ADD NEW</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td><b>Name</b></td>
                                            <td ><TextField
                                                value={formData.name_OD}
                                                onChange={(e) => {
                                                    handleChange("name_OD", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td><b>Surname</b></td>
                                            <td ><TextField
                                                value={formData.surname_OD}
                                                onChange={(e) => {
                                                    handleChange("surname_OD", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td><b>Comments</b></td>
                                            <td><TextField
                                                value={formData.comments_OD}
                                                onChange={(e) => {
                                                    handleChange("comments_OD", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>
                                        <tr>
                                            <td><b>Mobile</b></td>
                                            <td><TextField></TextField></td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td><TextField
                                                value={formData.email_OD}
                                                onChange={(e) => {
                                                    handleChange("email_OD", e.target.value)
                                                }}
                                            ></TextField></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />

                    </div>
                </form>

                {formValues ? (
                    <DataGrid
                        style={{ height: "28rem", width: "100%" }}
                        rows={rows}
                        columns={columns}
                        pageSize={20}
                        getRowId={(row) => row.code}
                        rowsPerPageOptions={[20]}
                        components={{ Toolbar: GridToolbar }}
                    />
                ) : (
                    <center>
                        <h2>Loading.... </h2>
                    </center>
                )}
                <div className="row" style={{ padding: "30px 0 30px 0" }}>
                    <div className="col-12">
                        <b><input type="checkbox"
                            onClick={(e) => {
                                console.log("checkbox : ", e.target.value)
                                handleChange("consent", !formData.consent)
                            }}
                        ></input> I consent to marketing from Muljis Jewellers by post / <em>email</em> / <em>telephone</em> / <em>whats app</em></b>

                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "25px"
                }}>
                    <Button variant="contained"

                        onClick={() => {
                            console.log("button : ", formData)
                            //    navigate.goback()
                            navigate(-1)
                        }}
                    >Go Back</Button>
                    <Button variant="contained"
                        disabled={!formData.consent}
                        onClick={() => {
                            console.log("button : ", formData)
                            // signin()
                            // signin()
                            // onSignInSubmit()
                            // if(formData)
                            if (formData.first_name == "") {
                                setFormDataError(prev => {
                                    return { ...prev, first_nameErr: true };
                                })
                            }
                            if (formData.surname == "") {
                                setFormDataError(prev => {
                                    return { ...prev, surnameErr: true };
                                })
                            }
                            if (formData.mobile == "+91") {
                                setFormDataError(prev => {
                                    return { ...prev, mobileErr: true };
                                })
                            }
                            if (formData.email == "") {
                                setFormDataError(prev => {
                                    return { ...prev, emailErr: true };
                                })
                            }
                            if (formData.telephone == "") {
                                setFormDataError(prev => {
                                    return { ...prev, telephoneErr: true };
                                })
                            }
                            if (formData.first_name !== "" && formData.surname !== "" && formData.mobile !== "" && formData.email !== "") {

                                setOrderData({ customer_info: formData, products: location.state })
                                saveDataInDB()
                            } else {
                                alert("Form fill properly")
                            }

                           

                        }}
                    >Next</Button>
                </div>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default ClientData