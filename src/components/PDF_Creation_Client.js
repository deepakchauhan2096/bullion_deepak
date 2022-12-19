import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";

import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table"
import Sidebar from './Sidebar'

// Create styles
const styles = StyleSheet.create({

    page: {
        padding: "20px",
        backgroundColor: "#fff",
        color: "white",
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
        paddingBottom: "7px",
        paddingLeft: 1,
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

    viewer: {
        width: window.innerWidth = "100%", //the pdf viewer will take up all of the width and height
        height: window.innerHeight ="100vh",
    },

})

// Create Document Component
function PDF_Creation_Client() {
    return (
        <>
        <Sidebar />
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
                <Page size="A4" style={styles.page}>

                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingBottom: "10px", }}>
                        {/* <Image source={logo} style={{ width: "80px", height: "70px" }} /> */}
                        <View>
                            <Text style={{ fontSize: "29px", color: "#CE9100", alignSelf: "center" }}>M U L J I S</Text>
                            <Text style={{ color: "#CE9100", alignSelf: "center" }}>Jewellers</Text>

                            <Text style={{ fontSize: "20px", color: "#CE9100", alignSelf: "center", marginTop: "10%" }}>INVOICE</Text>
                        </View>

                        {/* <Image source="http://data.mjspos.co.uk/wp-content/uploads/2022/10/muljis_logo.jpg" style={{ width: "50 px", height: "50 px" }}></Image> */}
                    </View>



                    <Table
                        data={[{}]}
                        style={styles.tableStyle}
                    >
                        <TableBody style={styles.tableStyle}>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.bold}> john plus</Text>
                            </TableCell>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.bold}>Date: null</Text>
                            </TableCell>

                        </TableBody>
                    </Table>
                    <Table
                        data={[{}]}
                    >
                        <TableBody>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.bold}>Order Number:<Text style={styles.justify}>1234</Text></Text>
                            </TableCell>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.textbold}>Invoice Number: 1234 </Text>
                            </TableCell>
                        </TableBody>
                    </Table>

                    <Table
                        data={[{}]}
                    >
                        <TableBody>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.textbold}>House :1234</Text>
                            </TableCell>
                            <TableCell style={styles.detailStyle}>
                                <Text style={styles.textbold}>Served By:12345</Text>

                            </TableCell>
                        </TableBody>
                    </Table>

                    <div style={{ marginRight: "50%" }}>

                        <Table
                            data={[{}]}
                        >
                            <TableBody>

                                <TableCell style={styles.detailStyle}>
                                    <Text style={styles.textbold}>Postcode: 1234</Text>

                                </TableCell >



                            </TableBody>
                        </Table>
                        <Table
                            data={[{}]}
                        >
                            <TableBody>
                                <TableCell style={styles.detailStyle}>
                                    <Text style={styles.textbold}>Town City :1234</Text>
                                </TableCell>

                            </TableBody>
                        </Table>
                        <Table
                            data={[{}]}
                        >
                            <TableBody>

                                <TableCell style={styles.detailStyle}>
                                    <Text style={styles.textbold}>Mobile:1234</Text>
                                </TableCell>

                            </TableBody>
                        </Table>


                        <Table
                            data={[{}]}
                        >

                            <TableBody>

                                <TableCell style={styles.detailStyle}>
                                    <Text  >Telephone: 12345678</Text>
                                </TableCell>
                            </TableBody>
                        </Table>
                        <Table
                            data={[{}]}
                        >
                            <TableBody>
                                <TableCell style={styles.detailStyle}>
                                    <Text style={styles.textbold}> EMAIL: deepak@gmail.com</Text>
                                </TableCell>

                            </TableBody>

                        </Table>
                    </div>

                    <Text>  </Text>
                    <div style={{ marginLeft: "60%", marginTop: "-30%", height: "18%" }} >
                        <Table data={[{}]} >
                            <TableHeader>
                                <TableCell style={styles.productTableHeading} >Payment Details</TableCell>
                                <TableCell style={styles.productTableHeading} > Amount</TableCell>
                                <TableCell style={styles.productTableHeading} >Remark</TableCell>
                            </TableHeader>
                            <TableBody>
                                <DataTableCell style={styles.productTableText} getContent={(r) => "BANK"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                            </TableBody>
                        </Table>

                        <Table data={[{}]} >
                            <TableBody>
                                <DataTableCell style={styles.productTableText} getContent={(r) => "CARD"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                            </TableBody>
                        </Table>
                        <Table data={[{}]} >
                            <TableBody>
                                <DataTableCell style={styles.productTableText} getContent={(r) => "CASH"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                            </TableBody>
                        </Table>
                        <Table data={[{}]} >
                            <TableBody>
                                <DataTableCell style={styles.productTableText} getContent={(r) => "CHEQUE"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                            </TableBody>
                        </Table>
                        <Table data={[{}]} >
                            <TableBody>
                                <DataTableCell style={styles.productTableText} getContent={(r) => "EXCHANGE"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => "null"} />
                            </TableBody>
                        </Table>
                        <Table data={[{}]} >
                            <TableBody>
                                <DataTableCell style={styles.productTableTextPre} getContent={(r) => "PREPAID"} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                                <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            </TableBody>
                        </Table>

                    </div>


                    <Text>  </Text>




                    <Table
                    // data={products_info}
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
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            {/* <DataTableCell style={styles.productTableText} getContent={(r) => "1"} />                        */}
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
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
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
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
                            <DataTableCell style={styles.productTableText} getContent={(r) => ""} />
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
                    <Text style={{ fontSize: "9px", color: "blue" }}>FULL TERMS AND CONDITIONS SEE NOTICE</Text>
                    <Text style={{ fontSize: "9px", color: "blue" }} >REFUNDS</Text>
                    <Text style={{ fontSize: "9px", color: "blue" }} >RETURNS CHARGE</Text>

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
        </PDFViewer>
        </>
    );
}
export default PDF_Creation_Client;