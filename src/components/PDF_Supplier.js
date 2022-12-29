import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";

import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table"
import Sidebar from './Sidebar'
import logo from './../imgs/muljis_logo.png'

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
        padding: "2px",
        fontSize: "9px",
        fontWeight: "900",
        color: "black",
    },

    detailStyleLeft: {
        borderTop: 'none',
        padding: "2px",
        fontSize: "9px",
        fontWeight: "900",
        color: "black",
        textAlign: "right"
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
        paddingTop: "3px",
        paddingBottom: "3px",
        paddingLeft: 5,
        fontSize: "7px",
        fontWeight: "500",
        backgroundColor: "pink",
        color: "#000",
        borderBottom: "none",
        fontSize: "8px"

    },

    productTableCell: {
        paddingTop: "3px",
        paddingBottom: "3px",
        paddingLeft: 5,
        fontSize: "7px",
        fontWeight: "500",
        backgroundColor: "",
        color: "#000",
        borderBottom: "none"
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
        height: window.innerHeight = "100vh",
    },

    p: {
        color: "black",
        position: "absolute",
        fontSize: "8px",
        padding: "2.5px"

    },

    pr: {
        color: "black",
        position: "absolute",
        fontSize: "8px",
        padding: "2.5px",
        right: 0
    },

    prr: {
        color: "red",
        position: "absolute",
        fontSize: "8px",
        padding: "2.5px",
        fontWeight:600,
        right: 0
    },

    viewTableStartTotal:{
        borderBottom: "0px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0"
    },

    viewTableStart: {
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0"
    },

    viewTable: {
        borderTop: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0"
    },

    viewTableSmall:
    {
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0",
        borderBottom: "1px solid black"
    },

    viewTableSmallEnd:
    {
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0",
        borderBottom: "0px solid black"
    },

    viewTableSmallTotal: {
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0",
        borderBottom: "1px solid black"
    },

    viewTableStartSign:{
        height: "14",
        display: "flex",
        flexDirection: "row",
        margin: "0",
        borderBottom: "0px solid black"
    },


    viewTableLarge: {
        borderTop: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        // borderBottom:"1px solid black",
        height: "80.5px",
        display: "flex",
        flexDirection: "row",
        margin: "0"
    },

    // viewTableLargeClose:{
    //     borderTop: "1px solid black",
    //     borderLeft: "1px solid black",
    //     borderRight: "1px solid black",
    //     borderBottom:"1px solid black",
    //     height: "80.5px",
    //     display: "flex",
    //     flexDirection: "row",
    //     margin: "0"
    // },

    viewTableEnd: {
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        height: "15",
        display: "flex",
        flexDirection: "row",
        margin: "0"
    },


    viewCell: {
        borderRight: "1px solid black",
        height: "14",
        width: "50%"
    },

    viewCellLeft: {
        borderRight: "1px solid black",
        height: "14",
        width: "25%"
    },

    viewCellLeftSmall: {
        borderRight: "1px solid black",
        height: "14",
        width: "33.5%"
    },

    viewCellLarge: {
        borderRight: "1px solid black",
        height: "80px",
        width: "33.33%"
    },


    viewCellLargeLeft: {
        borderRight: "1px solid black",
        height: "80px",
        width: "16.68%"
    },

    viewCellLargeEnd:{
        borderRight: "0px solid black",
        height: "80px",
        width: "33.33%"
    },

    viewCellExtreme: {
        borderRight: "px solid black",
        height: "80px",
        width: "50%"
    },

    viewCellEnd: {
        height: "18",
        width: "50%"
    }




})

// Create Document Component
function PDF_Supplier() {
    return (
        <>
            <Sidebar />
            <PDFViewer style={styles.viewer}>
                <Document>
                    <Page size="A4" style={styles.page}>

                        <View style={{ border: "0px solid red", top: "15px", textAlign: "center", justifyContent: "center", position: "relative", width: "100%", height: "100px" }}>
                            <Image source={logo} style={{ width: "80px", height: "70px" }} />
                            <Text style={{ fontSize: "29px", color: "#CE9100", alignSelf: "center", position: "absolute", top: "25px" }}>M U L J I S</Text>
                            <Text style={{ fontSize: "19px", color: "#CE9100", alignSelf: "center", position: "absolute", top: "55px" }}>Jewellers</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: "20px", color: "#CE9100", alignSelf: "center", margin: "2%" }}>INVOICE</Text>
                        </View>


                        <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>SUPPLIER NAME</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>ORDER REF</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>XXXXXXX</Text>
                            </View>
                        </View>

                        <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>SUPPLIER ID</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>12345</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>DATE ODERED</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                        </View>

                        {/* <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>SURNAME</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>SMITH</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>SERVER BY</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>____</Text>
                            </View>
                        </View> */}

                        {/* <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>NUMBER</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>VAT NUMBER</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                        </View> */}

                        <View style={styles.viewTableLarge}>
                            <View style={styles.viewCellLargeLeft}>
                                <Text style={styles.p}>ADDRESS</Text>
                            </View>
                            <View style={styles.viewCellLarge}>
                                <Text style={styles.p}>XXXXX DBDVDB
                                    EEMNDNMEDNME EDJMENMNEDNM
                                    ENMEDNMENDM</Text>
                            </View>
                            <View style={styles.viewCellLargeLeft}>
                                <Text style={styles.pr}>SUPPLIER</Text>
                            </View>
                            <View style={styles.viewCellLargeEnd}>
                                <Text style={styles.p}>XXXXX DBDVDB
                                    EEMNDNMEDNME EDJMENMNEDNM
                                    ENMEDNMENDM</Text>
                            </View>
                        </View>

                        <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>Tel:</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>Invoice No: </Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>xxxxxx</Text>
                            </View>
                        </View>

                        <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>Email</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>Sales Order</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}></Text>
                            </View>
                        </View>

                        <View style={styles.viewTable}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>Tax Date:</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>Sale Ref</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>1234</Text>
                            </View>
                        </View>
                        <View style={styles.viewTableLarge}>
                            <View style={styles.viewCellLargeLeft}>
                                <Text style={styles.p}>Invoice To:</Text>
                            </View>
                            <View style={styles.viewCellLarge}>
                                <Text style={styles.p}>XXXXX DBDVDB
                                    EEMNDNMEDNME EDJMENMNEDNM
                                    ENMEDNMENDM</Text>
                            </View>
                            <View style={styles.viewCellLargeLeft}>
                                <Text style={styles.pr}>Deliver To:</Text>
                            </View>
                            <View style={styles.viewCellLargeEnd}>
                                <Text style={styles.p}>XXXXX DBDVDB
                                    EEMNDNMEDNME EDJMENMNEDNM
                                    ENMEDNMENDM</Text>
                            </View>
                        </View>
                        <View style={styles.viewTableEnd}>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.p}>Customer Account No:</Text>
                            </View>
                            <View style={styles.viewCell}>
                                <Text style={styles.p}>XXXXXX</Text>
                            </View>
                            <View style={styles.viewCellLeft}>
                                <Text style={styles.pr}>Customer VAT No.</Text>
                            </View>
                            <View style={styles.viewCellEnd}>
                                <Text style={styles.p}>1234</Text>
                            </View>
                        </View>




                        <View><Text>SALE OF CLIENT'S PROPERTY TO MULJIS</Text></View>



                        <Table
                            style={{ tableLayout: "fixed" }}
                            data={[
                                { firstName: "John", lastName: "Smith", dob: "noop", country: "Australia", phoneNumber: "xxx-0000-0000" },
                                { firstName: "John", lastName: "Smith", dob: "noop", country: "Australia", phoneNumber: "xxx-0000-0000" },
                                { firstName: "John", lastName: "Smith", dob: "noop", country: "Australia", phoneNumber: "xxx-0000-0000" }
                            ]}
                        >
                            <TableHeader textAlign={"center"}>
                                <TableCell style={styles.productTableHeading}>
                                    ITEM ID
                                </TableCell>
                                <TableCell style={styles.productTableHeading}>
                                    QTY
                                </TableCell>
                                <TableCell style={styles.productTableHeading}>
                                    UNIT PRICE
                                </TableCell>
                                <TableCell style={styles.productTableHeading}>
                                    Description
                                </TableCell>
                                <TableCell style={styles.productTableHeading}>
                                    Amount
                                </TableCell>
                            </TableHeader>

                            <TableBody>
                                <DataTableCell style={styles.productTableCell} getContent={(r) => r.firstName} />
                                <DataTableCell style={styles.productTableCell} getContent={(r) => r.lastName} />
                                <DataTableCell style={styles.productTableCell} getContent={(r) => r.dob.toLocaleString()} />
                                <DataTableCell style={styles.productTableCell} getContent={(r) => r.country} />
                                <DataTableCell style={styles.productTableCell} getContent={(r) => r.phoneNumber} />
                            </TableBody>
                        </Table>
                        <View style={styles.viewTableStartTotal}>
                            <View style={{width:"width:60%"}}>
                                
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>SUBTOTAL</Text>
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>0</Text>
                            </View>
                        </View>
                        <View style={styles.viewTableStartTotal}>
                            <View style={{width:"width:60%"}}>
                                
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>VAT</Text>
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>12344</Text>
                            </View>
                        </View>
                        <View style={styles.viewTableStart}>
                            <View style={{width:"width:60%"}}>
                                
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>TOTAL</Text>
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>12344</Text>
                            </View>
                        </View>
                        <View style={styles.viewTableStart}>
                            <View style={{width:"width:60%"}}>
                            <Text style={styles.prr}>(Output Tax to be accounted for HM Customs & Excise by the buyer)</Text>
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>OUTPUT Tax</Text>
                            </View>
                            <View style={{width:"20%", borderLeft:"1px solid black"}}>
                                <Text style={styles.p}>12344</Text>
                            </View>
                        </View>














                        {/* <Text>  </Text> */}

                        {/* <Text style={{ fontSize: "9px", color: "blue" }}>FULL TERMS AND CONDITIONS SEE NOTICE</Text>
                        <Text style={{ fontSize: "9px", color: "blue" }} >REFUNDS</Text>
                        <Text style={{ fontSize: "9px", color: "blue" }} >RETURNS CHARGE</Text> */}
                        
                        {/* <Text>  </Text> */}
                        {/* <View style={styles.viewTableStartSign}>
                            <View style={{width:"19%", borderLeft:"0px solid black",color:"red"}}>
                                <Text style={styles.p}>SOLD BY <Text style={{fontSize:"9px"}}>(PRINT NAME):</Text></Text>
                            </View>
                            <View style={{width:"25%", borderBottom:"1px solid black"}}>
                                <Text style={styles.p}>xxxxxxxx</Text>
                            </View>
                            <View style={{width:"25%",borderBottom:"none"}}>
                                <Text style={styles.pr}>SIGNATURE:</Text>
                            </View>
                            <View style={{width:"25%", borderBottom:"1px solid black"}}>
                                <Text style={styles.p}>deepak</Text>
                            </View>
                        </View> */}

                        {/* <View style={styles.viewTableStartSign}>
                            <View style={{width:"19%", borderLeft:"0px solid black",color:"red"}}>
                                
                            </View>
                            <View style={{width:"25%", borderBottom:"0px solid black"}}>
                                
                            </View>
                            <View style={{width:"25%",borderBottom:"none"}}>
                                <Text style={styles.pr}>DATE:</Text>
                            </View>
                            <View style={{width:"25%", borderBottom:"1px solid black"}}>
                                <Text style={styles.p}>xxxxxxxxxx</Text>
                            </View>
                        </View> */}

                        <Text>  </Text>

                        <View style={{ justifyContent: "center", flexDirection: "column", paddingBottom: "30px" }}>
                            <View style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>PLATINUM</Text></View>
                                <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>GOLD</Text></View>
                                <View style={{ alignSelf: "center", width: "100%", backgroundColor: "#A020F0", margin: "1px" }}><Text style={{ fontSize: "10px", color: "#FFA500", alignSelf: "center", padding: "6px", alignSelf: "center" }}>FINE DIAMONDS</Text></View>
                                <Text>  </Text>
                                <Text style={{ fontSize: "8px", alignSelf: "center",color:"black" }}>We do not sell or share your personal data with anyone else. (GDPR COMPLIANT)</Text>
                                <Text style={{ fontSize: "8px", alignSelf: "center",color:"black" }}>216-218 Upper Tooting Road • London • SW17 7EW</Text>
                                <Text style={{ fontSize: "8px", alignSelf: "center",color:"black" }}>Tel: +44 (0)20 8767 8815 • Email: info@muljis.com •</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    );
}
export default PDF_Supplier;