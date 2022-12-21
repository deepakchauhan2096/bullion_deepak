import { borderLeft, display } from '@mui/system'
import React from 'react'
import Sidebar from './Sidebar'

const ClientPurchase = () => {
    return (
        <>
            <Sidebar />

            <div className='' style={{ backgroundColor: "white", height: "100vh" }}>
                <div className='' style={{ height: "100vh", backgroundColor: "", paddingLeft: "0px", paddingRight: "0" }}>
                    <div className="g-0" style={{ backgroundColor: "beige", height: "100%", position: "relative" }}>
                        <div className="">
                            <div className="">
                                <div className="col-lg-12 g-0">
                                    <table className="table-border">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <b className='form-label-padding'>CLIENT ID</b>
                                                </td>
                                                <td>
                                                    <select
                                                        className="input-fields"
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
                                                <td>
                                                    <b className='form-label-padding'>Date:</b>
                                                </td>
                                                <td colspan="2">
                                                    <input
                                                        disabled
                                                        className="input-fields"
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
                                                    />
                                                </td>
                                                <td>
                                                    <b className='form-label-padding'>SERVED BY</b>
                                                </td>
                                                <td colspan="2">
                                                    <select
                                                        className="input-fields"
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

                                            </tr>
                                            <tr>
                                                <td scope="col">
                                                    <b className='form-label-padding'>Surname*</b>
                                                </td>
                                                <td scope="col">
                                                    <input
                                                        className="input-fields"
                                                        type="text"
                                                    />
                                                </td>
                                                <td>
                                                    <b className='form-label-padding'>VAT NUMBER</b>
                                                </td>
                                                <td colspan="2">
                                                    <input
                                                        type="number"
                                                        className="input-fields"
                                                        style={{ width: "100%" }}
                                                    />
                                                </td>

                                            </tr>

                                            <tr>
                                                <td scope="col">
                                                    <b className='form-label-padding'>
                                                        Road/Street
                                                    </b>
                                                </td>
                                                <td scope="col" style={{ display: "flex" }}>
                                                    <input
                                                        className="input-fields"
                                                        style={{ width: "100%" }}
                                                    />
                                                </td>
                                                <td className='form-label-padding' style={{ background: "#FFFFE0" }}>
                                                    <b>Payment Details</b>
                                                </td>
                                                <td className='form-label-padding' style={{ background: "#FFFFE0" }}>
                                                    <b>Amount</b>
                                                </td>
                                                <td className='form-label-padding' style={{ background: "#FFFFE0" }}>
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
                                                    />
                                                </td>
                                                <td className='form-label-padding'><b>Bank</b></td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                        type="number"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="col" className='form-label-padding'>
                                                    <b>Postcode</b>
                                                </td>
                                                <td scope="col">
                                                    <input
                                                        className="input-fields"
                                                        type="text"
                                                    />
                                                </td>
                                                <td className='form-label-padding'><b>CARD</b></td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                        type="number"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="input-fields"
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
                                                    />

                                                </td>
                                                <td className='form-label-padding'><b>CASH</b></td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                        type="number"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="col" className='form-label-padding'>
                                                    <b>Email*</b>
                                                </td>
                                                <td scope="col" style={{ display: "flex" }}>
                                                    <input
                                                        className="input-fields"
                                                    />

                                                </td>
                                                <td className='form-label-padding'><b>CHEQUE</b></td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                        type="number"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="input-fields"
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
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="input-fields"
                                                    />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <br />
                                    <table className='table-border'>
                                        <tbody>
                                            <tr className='form-label-padding' style={{ background: "pink" }}>
                                                <th className='form-label-padding'>
                                                    Product ID
                                                </th>
                                                <th className='form-label-padding'>
                                                    Serial no
                                                </th>
                                                <th className='form-label-padding'>
                                                    QTY
                                                </th>
                                                <th className='form-label-padding'>
                                                    Description
                                                </th>
                                                <th className='form-label-padding'>
                                                    Fineness
                                                </th>
                                                <th className='form-label-padding'>
                                                    WT
                                                </th>
                                                <th className='form-label-padding'>
                                                    Total
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                                <td className='form-label-padding' >
                                                    null
                                                </td>
                                                <td className='form-label-padding'>
                                                    null
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colSpan={5}>
                                                    
                                                </td>
                                                <td>
                                                    <b style={{display:"block"}} className='form-label-padding'>Total :</b>
                                                    <b style={{display:"block"}} className='form-label-padding'>Paid :</b>
                                                    <b style={{display:"block"}} className='form-label-padding'>To Pay :</b>
                                                </td>
                                                <td>
                                                    <b style={{display:"block"}} className='form-label-padding'>0</b>
                                                    <b style={{display:"block"}} className='form-label-padding'>0</b>
                                                    <b style={{display:"block"}} className='form-label-padding'>0</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />
                        </div>

                        <div className="botton-end">
                            <div className="col-12 form-rows">
                                <button type="submit"
                                    style={{ marginTop: 20, marginLeft: 0, background: "green", color: "#fff", border: 0, padding: "4px 10px" }}
                                >
                                    MAKE INVOICE
                                </button>
                                {/* <button
                                    style={{ marginTop: 20, marginLeft: 4, background: "#696969", color: "#fff", border: 0, padding: "4px 10px" }}
                                    type="submit" >
                                    Update
                                </button> */}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ClientPurchase