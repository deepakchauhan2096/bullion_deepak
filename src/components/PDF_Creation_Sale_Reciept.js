import React, { useEffect, useState } from 'react'
import ReactPDF, { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Sidebar from './Sidebar'
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table"
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
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
    letterspacing:{
letterSpacing:"2px"
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontWeight: "300",
        fontSize: "10px"
    },
    // So Declarative and unDRY 👌
    row1: {
        width: '33%',
    },
    row2: {
        width: '15%',
    },
    row3: {
        width: '15%',
    },
    row4: {
        width: '20%',
    },
    row5: {
        width: '27%',
    },
    productTableHeading: {
        padding: "10px",
        fontSize: "9px",
        fontWeight: "900",
        backgroundColor: "grey",
        color: "white"
    },
    productTableText: {
        padding: "11px",
        fontSize: "8px"
    },
})


// Create Document Component


function PDF_Creation_Sale_Reciept() {

    const [showInvoice, setShowInvoice] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)
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
    console.log(location.state,"location state")


    const MyDocument = () => (



        <Document>
            <Page size="A4" style={styles.page}>

                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingBottom: "11px", borderBottom: "2px solid grey" }}>
                    <Image source={logo} style={{ width: "90px", height: "80px" }}></Image>
                    <View>
                        <Text  style={{ fontSize: "28px", color: "#CE9100", alignSelf: "center" }}>M U L J I S</Text>
                        <Text style={{ color: "#CE9100", alignSelf: "center" }}>Jewellers</Text>
                        <Text style={{ fontSize: "20px",color: "#CE9100", alignSelf: "center", marginTop:"5%" }}>SALE RECIEPT</Text>
                    </View>

                    <Image source="http://data.mjspos.co.uk/wp-content/uploads/2022/10/muljis_logo.jpg" style={{ width: "50px", height: "50px" }}></Image>
                </View>

                  <Table
                    data={[{}]}
                    style={styles.tableStyle}
                >
                    <TableBody style={styles.tableStyle}>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}> {customer_info.title} {customer_info.first_name} {customer_info.surname}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>SR Number: {customer_info.sr_number}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Date: {customer_info.TodayDate}</Text>
                        </TableCell>

                    </TableBody>
                </Table> 


                <Table
                    data={[{}]}
                    style={styles.tableStyle}
                >
                    <TableBody style={styles.tableStyle}>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}> House Name: {customer_info.house_name}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>City/Town: {customer_info.city_and_town}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Postcode:{customer_info.postcode}</Text>
                        </TableCell>

                    </TableBody>
                </Table> 



                <Table
                    data={[{}]}
                    style={styles.tableStyle}
                >
                    <TableBody style={styles.tableStyle}>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}> Mobile: {customer_info.mobile}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Email: {customer_info.email}</Text>
                        </TableCell>
                        <TableCell style={styles.detailStyle}>
                            <Text style={styles.bold}>Served By: {customer_info.Served_by.label}</Text>
                        </TableCell>

                    </TableBody>
                </Table> 

                <Text>  </Text>

                {/* <View style={styles.table}>

                    <View style={[styles.bold, styles.row]} wrap={false}>
                        <Text style={styles.row1}>{customer_info.title} {customer_info.first_name} {customer_info.surname}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>SR Number: {customer_info.sr_number}</Text> {customer_info.order_id}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>Date:</Text> {customer_info.TodayDate}</Text>
                    </View>
                    <View style={[styles.bold, styles.row]} wrap={false}>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>House Name:</Text> {customer_info.house_name}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>City/Town:</Text> {customer_info.city_and_town}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>Postcode:</Text> {customer_info.postcode}</Text>
                    </View>
                    <View style={[styles.bold, styles.row]} wrap={false}>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>Mobile:</Text> {customer_info.mobile}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>Email:</Text> {customer_info.email}</Text>
                        <Text style={styles.row1}><Text style={{ fontWeight: "900" }}>Served By:</Text> {customer_info.Served_by.label}</Text>
                    </View>


                </View>  */}


                <Table
                    data={[
                        {
                            payment_name: "Bank",
                            amount: customer_info.cank_amount,
                            remark: customer_info.cank_remark,
                        },
                        {
                            payment_name: "Card",
                            amount: customer_info.card_amount,
                            remark: customer_info.card_remark,
                        },
                        {
                            payment_name: "Cash",
                            amount: customer_info.cash_amount,
                            remark: customer_info.cash_remark,
                        },
                        {
                            payment_name: "Chaque",
                            amount: customer_info.chaque_amount,
                            remark: customer_info.chaque_remark,
                        },
                        {
                            payment_name: "Exchange",
                            amount: customer_info.exchange_amount,
                            remark: customer_info.exchange_remark,
                        },
                    ]}
                >
                    <TableHeader>
                        <TableCell style={styles.productTableHeading} >PAYMENT</TableCell>
                        <TableCell style={styles.productTableHeading} >AMOUNT</TableCell>
                        <TableCell style={styles.productTableHeading} >REMARK</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.payment_name} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.amount} />
                        <DataTableCell style={styles.productTableText} getContent={(r) => r.remark} />
                    </TableBody>

                </Table>
                <Text style={{fontSize:"15px", margin:"0.5%"}} >Total: {customer_info.agreeprice}</Text>
                <Table data={[
                    { data_1: "", data_2: "", data_3: "Total" },
                    { data_1: "1", data_2: "PAYMENT RECEIVED", data_3: "" },
                    { data_1: "", data_2: customer_info.totalPriceInWord, data_3:`€ ${totalPrice}`}
                    ]}>
                    <TableBody>
                        
                        <DataTableCell style={{...styles.productTableText,fontSize:"12px"}} getContent={(r) => r.data_2} />
                        <DataTableCell style={{...styles.productTableText,fontSize:"12px"}} getContent={(r) => r.data_3} />
                    </TableBody>
                </Table>

                <View style={{ justifyContent: "center", flexDirection: "column", paddingBottom: "30px" }}>

                    <View style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "5px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>PLATINUM</Text></View>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "5px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>GOLD</Text></View>
                        <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "5px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>FINE DIAMONDS</Text></View>
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
                            // location.state.products.map((e)=>{
                            //     totalPriceTemp+=parseFloat(e.price)
                            //     totalWeightTemp+=parseFloat(e.Wt_est)
                            // })
                            setTotalPrice(
                                parseFloat(location.state.customer_info.cank_amount) +
                                parseFloat(location.state.customer_info.card_amount) +
                                parseFloat(location.state.customer_info.cash_amount) +
                                parseFloat(location.state.customer_info.chaque_amount) +
                                parseFloat(location.state.customer_info.exchange_amount)
                              );

                            // setTotalPrice(totalPriceTemp);
                            setTotalWeight(totalWeightTemp)
                            setCustomer_info(location.state.customer_info)
                            setProducts_info(location.state.products)
                            setShowInvoice(true)
                        } else {
                            alert("Some Error Occured")
                        }
                    }}
                >Preview Invoice</Button>

            </div>
        </>
    )
}

export default PDF_Creation_Sale_Reciept