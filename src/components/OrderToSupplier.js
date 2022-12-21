import React from 'react'
import Sidebar from './Sidebar'

const OrderToSupplier = () => {
    return (
        <>
            <Sidebar />

         
                <div className='' style={{ height: "100vh", backgroundColor: "", paddingLeft: "0px", paddingRight: "0" }}>
                    <div className="container g-0" style={{ backgroundColor: "beige", height: "100%", position: "relative" }}>

                        <table className="table-border" style={{ backgroundColor: "white" }}>
                            <tbody>
                                <tr>
                                    <th scope="row" colSpan={2}>
                                        <div
                                            style={{ backgroundColor: "beige", borderBottom: "0", accentColor: "red" }}
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
                                            <label style={{ fontSize: 17, padding: "0 2px" }}>New</label>
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
                                            <label style={{ fontSize: 17, padding: "0 2px" }}>Old Update</label>
                                        </div>

                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className='form-label-padding'>Order ID</th>
                                    <td>
                                        <select className="input-fields" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding'>Order By</th>
                                    <td>
                                        <select className="input-fields" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding' scope="row">Order Date</th>
                                    <td><input type="date" class="input-fields" /></td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding'>Qty</th>
                                    <td><input type="text" class="input-fields" /></td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding' scope="row">Supplier Id</th>
                                    <td colspan="">
                                        <select className="input-fields" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding'>Order Method </th>
                                    <td><input type="number" class="input-fields" /></td>
                                </tr>

                                <tr>
                                    <th className='form-label-padding' scope="row">Item Id Supplier </th>
                                    <td colspan="">
                                        <select className="input-fields" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding'>Expected Price</th>
                                    <td><input type="number" class="input-fields" /></td>
                                </tr>

                                <tr>
                                    <th className='form-label-padding' scope="row">Purpose of Order  </th>
                                    <td colspan="">
                                        <select className="input-fields" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding'>Actual Price</th>
                                    <td>
                                        <input type="text" className="input-fields" />
                                    </td>
                                </tr>

                                <tr>
                                    <th className='form-label-padding' scope="row">STOCK Order ID  </th>
                                    <td colspan="">
                                        <input type="text" className="input-fields" />
                                    </td>
                                </tr>
                                <tr>
                                    <th className='form-label-padding' >Current Rate </th>
                                    <td>
                                        <input type="text" className="input-fields" />
                                    </td>
                                </tr>

                                <tr>
                                    <th className='form-label-padding' scope="row">Expected Date of Delivery  </th>
                                    <td colspan="">
                                        <input type="text" className="input-fields" />
                                    </td>
                                </tr>
                                <tr>

                                </tr>
                                <tr>
                                    <th className='form-label-padding' scope="row">Customer Order ID </th>
                                    <td colspan="3">
                                        <input type="number" class="input-fields" />
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        <div className="botton-end">
                            <div className="col-12 form-rows">
                                <button type="submit"
                                    style={{ marginTop: 20, marginLeft: 0, background: "green", color: "#fff", border: 0, padding: "4px 10px" }}
                                >
                                    Add
                                </button>
                                <button
                                    style={{ marginTop: 20, marginLeft: 4, background: "#696969", color: "#fff", border: 0, padding: "4px 10px" }}
                                    type="submit" >
                                    Update
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default OrderToSupplier