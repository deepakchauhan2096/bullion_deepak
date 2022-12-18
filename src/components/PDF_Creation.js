import React, { useEffect, useState, useContext } from 'react'
import ReactPDF, { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Sidebar from './Sidebar'
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table"
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { dataContext } from '../helpers/context'
import logo from '../imgs/muljis_logo.png'
const styles = StyleSheet.create({

    page: {
        padding: "20px"
    },
    table: {
        width: '100%',
        paddingBottom: "30px",
        paddingTop: "30px"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        // borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    detailStyle: {
        borderTop: 'none',
        padding: "10px",
        fontSize: "9px",
        fontWeight: "900",
        color: "black",

    },
    tableStyle: {
        border: 'none'
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontWeight: "900",
        fontSize: "10px"
    },
    // So Declarative and unDRY 
    row1: {
        width: '33%',
    },
    productTableHeading: {
        paddingTop: "7px",
        paddingBottom:"7px",
        paddingLeft:1,
        fontSize: "7px",
        fontWeight: "500",
        backgroundColor: "#D3D3D3",
        color: "#000"
    },
    productTableText: {
        padding: "10px",
        fontSize: "8px"
    },
    productTableTextPre: {
        padding: "10px",
        fontSize: "8px",
        backgroundColor: "yellow",
    },
})


// Create Document Component


function PDF_Creation() {
    const { productValue } = useContext(dataContext);
    const [showInvoice, setShowInvoice] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)

    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    var To_genrate_invoice_number = new Date().toJSON().slice(0,10).replace(/-/g,'');

    const [customer_info, setCustomer_info] = useState(
        {
            "title": "wait..",
            "client_id": "XXXXXXX",
            "first_name": "wait..",
            "surname": "wait..",
            "house_name": "wait..",
            "address_l2": "",
            "city_and_town": "wait..",
            "postcode": "wait..",
            "telephone": "wait..",
            "mobile": "+wait..",
            "email": "wait..",
            "relation_OD": "",
            "name_OD": "",
            "surname_OD": "",
            "comments_OD": "",
            "email_OD": "",
            "mobile_OD": "",
            // other data

            "invoice_num": "",
            "Served_by": "",
            "Bank_amount": 0,
            "Bank_remark": "",
            "Card_amount": 0,
            "Card_remark": "",
            "Cash_amount": 0,
            "Cash_remark": "",
            "Chaque_amount": 0,
            "Chaque_remark": "",
            "Exchange_amount": 0,
            "Exchange_remark": "",
            "Date": "",
            "consent": true
        }
    )
    const [products_info, setProducts_info] = useState([
        {
            "item_id": 4,
            "item": "wait..",
            "TodayDate": "01/10/2022",
            "dropdown": [
                "RING",
                "PENDANT",
                "S CHAIN",
                "H CHAIN ",
                "BRACELET",
                "NECKLACE",
                "EARSTUD",
                "EARRINGS",
                "EARDROPS",
                "BANGLES L",
                "BANGLES C",
                "PONCHA",
                "SET",
                "H SET",
                "P SET",
                "TWIN SET",
                "BRANDS",
                "ANKLETS",
                "ETERNITY",
                "HALF ETERNITY"
            ],
            "product_sub_cat_dropdown": [
                "PLAIN",
                "STONE SET"
            ],
            "supplier_dropdown": [
                "THC",
                "CTS",
                "BAB",
                "DLP",
                "JJ",
                "MJ",
                "OG",
                "PCOG",
                "SUS",
                "GETA",
                "LDSK",
                "LDSK",
                "LDSK",
                "LDSK",
                "LDSK",
                "MB",
                "NLL",
                "NLL",
                "SJ",
                "SJ",
                "SJ",
                "SJ",
                "SJ",
                "AM",
                "SRK",
                "SJ",
                "zes"
            ],
            "Wt_est": 49.13,
            "product_ref": "9375001",
            "price": 121.8813,
            "product_size_dropdown": [
                "F",
                "F+",
                "G",
                "G+",
                "H",
                "H+",
                "I",
                "I+",
                "J",
                "J+",
                "K",
                "K+",
                "L",
                "L+",
                "M",
                "M+",
                "N",
                "N+",
                "O",
                "O+",
                "P",
                "P+",
                "Q",
                "Q+",
                "R",
                "R+",
                "S",
                "S+",
                "T",
                "T+",
                "U",
                "U+",
                "V",
                "V+",
                "W",
                "W+",
                "X",
                "X+",
                "Y",
                "Y+",
                "Z",
                "Z+",
                "Z1",
                "Z1+",
                "Z2",
                "Z2+",
                "Z3",
                "z3+"
            ],
            "item_type_selected": "wait..",
            "product_sub_cat_selected": "wait..",
            "supplier_selected": "wait..",
            "product_size_selected": "wait..",
            "metal_selected": "wait..",
            "notes_selected": ""
        },

    ])
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(() => {
    // setCustomer_info(location.state.customer_info)
    // setProducts_info(location.state.products)
    // }, []);

    // let customer_info = location.state.customer_info
    // let products_info = location.state.products



    const MyDocument = () => (

        <Document>
            <Page size="A4" style={styles.page}>

                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingBottom: "10px",}}>
                    <Image source={logo} style={{ width: "80px", height: "70px" }} />
                    <View>
                        <Text style={{ fontSize: "29px", color: "#CE9100", alignSelf: "center" }}>M U L J I S</Text>
                        <Text style={{ color: "#CE9100", alignSelf: "center" }}>Jewellers</Text>
                       
                        <Text style={{ fontSize: "20px",color: "#CE9100", alignSelf: "center", marginTop:"10%" }}>INVOICE</Text>
                    </View>

                    <Image source="http://data.mjspos.co.uk/wp-content/uploads/2022/10/muljis_logo.jpg" style={{ width: "50 px", height: "50 px" }}></Image>
                </View>

             

                <Table
                    data={[{}]}
                    style={styles.tableStyle}
                >
                    <TableBody style={styles.tableStyle}>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}> {customer_info.first_name} {customer_info.surname}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Date: {utc}</Text>
                        </TableCell>

                    </TableBody>
                </Table>
                <Table
                    data={[{}]}
                >
                    <TableBody>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Order Number:<Text style={styles.justify}>{customer_info.order_id}</Text></Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}>Invoice Number: {customer_info.first_name}/ {To_genrate_invoice_number}/{customer_info.invoice_num + 1} </Text>
                        </TableCell>
                    </TableBody>
                </Table>

                <Table
                    data={[{}]}
                >
                    <TableBody>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}>House :{customer_info.house_name}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}>Served By:{customer_info.Served_by} </Text>

                        </TableCell>
                    </TableBody>
                </Table>

<div style={{marginRight:"50%"}}>

                <Table
                    data={[{}]}
                >
                    <TableBody>
                        
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}>Postcode: {customer_info.postcode}</Text>

                        </TableCell >



                    </TableBody>
                </Table>
                <Table
                    data={[{}]}
                >
                    <TableBody>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}>Town City :{customer_info.city_and_town}</Text>
                        </TableCell>

                    </TableBody>
                </Table>
                <Table
                    data={[{}]}
                >
                    <TableBody>
                        
                        <TableCell  style={styles.detailStyle}>
                        <Text style={styles.textbold}>Mobile: {customer_info.mobile}</Text>
                        </TableCell>

                    </TableBody>
                </Table>


                <Table
                    data={[{}]}
                >

                    <TableBody>

                        <TableCell style={styles.detailStyle}>
                            <Text  >Telephone: {customer_info.telephone}</Text>
                        </TableCell>
                    </TableBody>
                </Table>
                <Table
                    data={[{}]}
                >
                    <TableBody>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.textbold}> EMAIL: {customer_info.email}</Text>
                        </TableCell>

                    </TableBody>

                </Table>
                </div>

                <Text>  </Text>
                <div style={{ marginLeft:"60%", marginTop:"-30%" ,height:"18%"}} >
                <Table  data={[{}]} >
                    <TableHeader>
                        <TableCell style={styles.productTableHeading} >Payment Details</TableCell>
                        <TableCell style={styles.productTableHeading} > Amount</TableCell>
                        <TableCell style={styles.productTableHeading} >Remark</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => "BANK"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Bank_amount}`} />
                        <DataTableCell style={styles.productTableText} getContent={(r) =>`${customer_info.Bank_remark}`} />
                     </TableBody>
                </Table>

                <Table  data={[{}]} >
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => "CARD"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Card_amount}`} />
                        <DataTableCell style={styles.productTableText} getContent={(r) =>`${customer_info.Card_remark}`} />
                     </TableBody>
                </Table>
                <Table  data={[{}]} >
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => "CASH"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Cash_amount}`} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Card_remark}`} />
                     </TableBody>
                </Table>
                <Table  data={[{}]} >
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => "CHEQUE"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Chaque_amount}`} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Chaque_remark}`} />
                     </TableBody>
                </Table>
                <Table  data={[{}]} >
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => "EXCHANGE"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Exchange_amount}`} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${customer_info.Exchange_remark}`} />
                     </TableBody>
                </Table>
                <Table  data={[{}]} >
                    <TableBody>
                        <DataTableCell style={styles.productTableTextPre} getContent={(r) => "PREPAID"} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                     </TableBody>
                </Table>

                </div>


                <Text>  </Text>




                <Table
                    data={products_info}
                >
                    <TableHeader>
                        <TableCell style={styles.productTableHeading} > Bv Formula Price </TableCell>
                        <TableCell style={styles.productTableHeading} >Melalor Price</TableCell>
                        <TableCell style={styles.productTableHeading} > Pamp Formula Price</TableCell>
                        <TableCell style={styles.productTableHeading} >V Suisse Price</TableCell>
                        {/* <TableCell style={styles.productTableHeading} > Qty</TableCell> */}
                        <TableCell style={styles.productTableHeading} >Quantity</TableCell>
                        <TableCell style={styles.productTableHeading} >Code</TableCell>
                        <TableCell style={styles.productTableHeading} >Description</TableCell>
                        {/* <TableCell style={styles.productTableHeading} >Mj Pamp Value</TableCell> */}


                    </TableHeader>
                    <TableBody>

                        <DataTableCell style={styles.productTableText} getContent={(r) => r.bbp_o_competitor_best_value_value} /> 
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.bbp_o_competitor_metalor_value} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.bbp_o_competitor_pamp_value} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.bbp_o_competitor_v_suisse_value} />
                        {/* <DataTableCell style={styles.productTableText} getContent={(r) => "1"} />                        */}
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.quant} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.code} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.description} />
                        {/* <DataTableCell style={styles.productTableText} getContent={(r) => r.mj_pamp_value} /> */}


                    </TableBody>
                </Table>
                <Text>  </Text>
                <Table
                    data={[{}]}
                >

                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "DELIVERY"} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "0"} />

                    </TableBody>

                </Table>

                <Table data={[{}]}>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "TOTAL"} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${location.state.agreePrice}`} />
                    </TableBody>
                </Table>
                <Table data={[{}]}>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "PAID"} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => `${+customer_info.Bank_amount + +customer_info.Card_amount + +customer_info.Cash_amount + +customer_info.Chaque_amount + +customer_info.Exchange_amount}`} />
                    </TableBody>
                </Table>
                <Table data={[{}]}>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "Collected"} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => "Sign"} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                    </TableBody>
                </Table>
                <Text style={{ fontSize:"9px", color:"blue" }}>FULL TERMS AND CONDITIONS SEE NOTICE</Text>
                <Text style={{ fontSize:"9px", color:"blue" }} >REFUNDS</Text>
                <Text style={{ fontSize:"9px", color:"blue" }} >RETURNS CHARGE</Text>

                <View style={{ justifyContent: "center", flexDirection: "column", paddingBottom: "30px" }}>

                    <View style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>PLATINUM</Text></View>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>GOLD</Text></View>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>FINE DIAMONDS</Text></View>
                        <Text style={{ fontSize: "8px", alignSelf: "center" }}>We do not sell or share your personal data with anyone else. (GDPR COMPLIANT)</Text>
                        <Text style={{ fontSize: "8px", alignSelf: "center" }}>216-218 Upper Tooting Road • London • SW17 7EW</Text>
                        <Text style={{ fontSize: "8px", alignSelf: "center" }}>Tel: +44 (0)20 8767 8815 • Email: info@muljis.com •</Text>


                    </View>


                </View>
            </Page>
        </Document>
    );
    return (
        <>
            <Sidebar />

            {showInvoice ? <PDFViewer style={{ height: "80vh", width: "78vw" }}>

                <MyDocument />

            </PDFViewer> : null}

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px"
            }}>
                <Button variant="contained"

                    onClick={() => {
                        // console.log("button : ", formData)
                        //    navigate.goback()
                        navigate(-1)
                    }}
                >Go Back</Button>
                <Button variant="contained"

                    onClick={() => {
                        if (location.state != null) {
                            // console.log("button : ", formData)
                            //    navigate.goback()
                            // navigate(-1)
                            console.log("loc : ", location)
                            let totalPriceTemp = 0;
                            let totalWeightTemp = 0;
                            location.state.products.map((e) => {
                                totalPriceTemp += parseFloat(e.total_price)
                                totalWeightTemp += parseFloat(e.metal_weight_gm)
                            })

                            setTotalPrice(totalPriceTemp);
                            setTotalWeight(totalWeightTemp)
                            setCustomer_info(location.state.customer_info)
                            setProducts_info(location.state.products)
                            setShowInvoice(true)
                        } else {
                            alert("Some Error Occured")
                        }
                    }}
                >Preview Invoice</Button>
                {/* <button onClick={()=>console.log( customer_info.invoice_num ) }>click to console</button> */}

            </div>
        </>
    )
}

export default PDF_Creation