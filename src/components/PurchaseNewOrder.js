import React,{useContext} from 'react'

import Sidebar from './Sidebar'
import styled from 'styled-components'


const PurchaseNewOrder = () => {

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
                    <p className='bg-secondary text-white py-2'>Purchase Order New</p>
                </div>
                <form className='p-4' >
                    <div className="container" style={{ backgroundColor: "" }}>
                        <div className="row">
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <thead>
                                        <tr>
                                            <th scope="col">TO SUPPLIER</th>
                                            <th scope="col">NAME</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SUPPLIER ID</td>
                                            <td>
                                                <Select className="dropdown rounded-0" id="exampleFormControlSelect1">
                                                 <Option>1</Option>
                                                 <Option>2</Option>

                                                   
                                                </Select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ADDRESS</td>
                                            <td>AUTO</td>
                                        </tr>
                                        <tr>
                                            <td >EMAIL</td>
                                            <td>AUTO</td>
                                        </tr>
                                        <tr>
                                            <td >TEL</td>
                                            <td>+91XXXXXXXXX</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col" >
                                        <textarea rows="9" className="textarea">NOTES EDITABLE BOX</textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6 g-0">
                                <table className="table-border">
                                    <tbody className=''>
                                        <tr>
                                            <td><b>Date:DOC RAISED</b></td>
                                            <td>AUTO</td>
                                        </tr>
                                        <tr>
                                            <td><b>DATE PO MADE</b></td>
                                            <td><input type="date" /></td>
                                        </tr>
                                        <tr>
                                            <td><b>Purchase Order Number</b></td>
                                            <td>AUTO</td>
                                        </tr>
                                        <tr>
                                            <td><b>DOC RAISED BY</b></td>
                                            <td>DROPDOWN</td>
                                        </tr>
                                        <tr>
                                            <td><b>API PRICE AT TIME OF ORDER</b></td>
                                            <td>MANUAL</td>
                                        </tr>
                                        <tr>
                                            <td>SPOT PRICE AGREED </td>
                                            <td>MANUAL</td>
                                        </tr>
                                        <tr>
                                            <td><b>SPOT PRICE AGREED WITH</b></td>
                                            <td>MANUAL</td>
                                        </tr>
                                        <tr>
                                            <td><b>METHOD</b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>PAYMENT METHOD</b></td>
                                            <td>
                                                <Select className="dropdown rounded-0" id="exampleFormControlSelect1">
                                                    <Option>BANK</Option>
                                                    <Option>CARD</Option>
                                                    <Option>CASH</Option>
                                                    <Option>CHEQUE</Option>
                                                </Select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>PAYMENT METHOD</b></td>
                                            <td>
                                                <input type="date" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="row ">
                            <div className="col-lg-12 g-0">
                                <table class="table-border">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <Select className="dropdown rounded-0" >
                                                    <Option>OUR ITEM ID</Option>
                                                    <Option>CARD</Option>
                                                    <Option>CASH</Option>
                                                    <Option>CHEQUE</Option>
                                                </Select>
                                            </th>
                                            <th scope="col">
                                                <input type='text' className="text-manually" placeholder='MANUALLY'></input>
                                            </th>
                                            <th scope="col">FINESS</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">EXPECTED PRICE</th>
                                            <th scope="col">UNIT PRICE AGREED</th>
                                            <th scope="col">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td >Larry the Bird</td>
                                            <td>@twitter</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Otto</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 pt-2 ">
                                <p><b>EXPECTED PRICE TOTAL :</b>CHECK TO DISCUSS</p>
                                <p><b>AGREED PRICE TOTAL :</b>CHECK TO DISCUSS</p>
                            </div>
                            <div className="col-6 pt-2">
                                <p><b>VAT INCLUDED 0%:</b>CHECK TO DISCUSS</p>
                                <p><b>DELIVERY :</b>CHECK TO DISCUSS</p>
                                <p><b>TOTAL :</b>CHECK TO DISCUSS</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-end g-0 py-2">
                            <button className="btn btn-success rounded-0 pt-2" >ORDER</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 border text-center p-2 bg-danger">PLATINUM</div>
                            <div className="col-4 border text-center p-2 bg-danger">GOLD</div>
                            <div className="col-4 border text-center p-2 bg-danger">FINE DIAMONDS</div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default PurchaseNewOrder