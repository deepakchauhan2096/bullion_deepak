import React from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const BullionReciept = () => {

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
                    <p className='bg-secondary text-white py-2'>Sales Reciept</p>
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
                                            <td><b>RE INVOICE CLIENT ID</b></td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><b>RE CLIENT ID</b></td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><b>Invoice Number:</b></td>
                                            <td colSpan="2"></td>
                                        </tr>
                                        <tr>
                                            <td><b>SERVED BY</b></td>
                                            <td colSpan="2">
                                                <select class="form-control rounded-0">
                                                    <option>BANK</option>
                                                    <option>CARD</option>
                                                    <option>CASH</option>
                                                    <option>CHEQUE</option>
                                                    <option>EXCHANGE</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>VAT NUMBER</b></td>
                                            <td colSpan="2">GB 372718438</td>
                                        </tr>


                                    </tbody>
                                </table>


                                {/* <table className="table-border">
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
                                </table> */}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 g-0 ">
                                <table className="table-border">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Total</td>
                                            <td>$100.00</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>PAYMENT RECEIVED</td>
                                            <td rowspan="4"></td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>PAYMENT RECEIVED</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>PAYMENT RECEIVED</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>PAYMENT RECEIVED</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 g-0 ">
                                <table className="table-border">
                                    <tbody>
                                        <tr><td rowspan="7">
                                        </td>
                                            <td td rowspan="7">
                                                <table className='table-border'>
                                                    <tbody className='table-border'>
                                                        <tr>
                                                            <td>
                                                                total
                                                            </td>
                                                            <td>
                                                                $100
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                total
                                                            </td>
                                                            <td>
                                                                $100
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                total
                                                            </td>
                                                            <td>
                                                                $100
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                total
                                                            </td>
                                                            <td>
                                                                $100
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
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

export default BullionReciept