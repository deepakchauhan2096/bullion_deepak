import React from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const BullionInvoice = () => {

    const Select = styled.select`
    width:100%;
    padding:0;
    margin:0;
    `
    const Option = styled.option`
    padding:0;
    margin:0;
    `


    return (
        <>
            <Sidebar />
            <div className='container-fluid' style={{ backgroundColor: "" }}>
                <div className="row">
                    <p className='bg-secondary text-white py-2'>Sale Invoice</p>
                </div>
                <form className='p-4' >
                    <div className="container" style={{ backgroundColor: "" }}>
                        <div className="row">
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <tbody>
                                        <tr>
                                            <td ><b>CLINT ID</b></td>
                                            <td >XXXXXXXX</td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>FIRST NAME</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>SURNAME</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>NUMBER</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>ROAD/STREET</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>TOWN CITY</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>MOBILE</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>EMAIL</b></td>
                                            <td scope="col"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <tbody>
                                        <tr>
                                            <td><b>Date:</b></td>
                                            <td colSpan="2">XXXXXXXX</td>
                                        </tr>
                                        <tr>
                                            <td><b>SR Number:</b></td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><b>SERVED BY</b></td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><b>VAT NUMBER</b></td>
                                            <td colSpan="2">GB 372718438</td>
                                        </tr>
                                        

                                    </tbody>
                                </table>

                                <table className="table-border">
                                    <tbody >
                                        <tr>
                                            <td ><b>BANK</b></td>
                                            <td ><b>Amount</b></td>
                                            <td ><b>Remark</b></td>
                                        </tr>
                                        <tr>
                                            <td >CARD</td>
                                            <td ></td>
                                            <td ></td>
                                        </tr>
                                        <tr>
                                            <td >CASH</td>
                                            <td ></td>
                                            <td ></td>
                                        </tr>
                                        <tr>
                                            <td>CHEQUE</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>EXCHANGE</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 g-0 ">
                            <table className="table-border-unstable">
                                    <tbody>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Serial No.</th>
                                            <th>Auto Description</th>
                                            <th>Editable Description</th>
                                            <th>Qty</th>
                                            <th>Unit price</th>
                                            <th>Gross WT</th>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <td>Scan</td>
                                            <td>auto</td>
                                            <td>Auto Description</td>
                                            <td>Auto</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                        <tr>
                                            <td>Scan</td>
                                            <td>auto</td>
                                            <td>Auto Description</td>
                                            <td>Auto</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                        <tr>
                                            <td>Scan</td>
                                            <td>auto</td>
                                            <td>Auto Description</td>
                                            <td>Auto</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                        <tr>
                                            <td>Scan</td>
                                            <td>auto</td>
                                            <td>Auto Description</td>
                                            <td>Auto</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BullionInvoice