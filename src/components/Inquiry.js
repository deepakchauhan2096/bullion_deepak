import React from 'react'
import Sidebar from './Sidebar'

const Inquiry = () => {
    return (
        <>
            <Sidebar />

            <div className='container-fluid' style={{ backgroundColor: "whitesmoke" }}>
                <div className="row">
                    <p className='bg-secondary text-white py-2'>Inquiry</p>
                </div>
                <form className='p-4' >
                    <div className="container" style={{ backgroundColor: "whitesmoke" }}>
                        <div className="row">
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-12 py-2 form-label">
                                        <input type="radio" className="form-label" value="option1" /> New &nbsp;
                                        <input type="radio" className="form-label" value="option1" /> Old Updates &nbsp;
                                        <input type="radio" className="form-label" value="option1" /> Order  &nbsp;
                                        <input type="radio" className="form-label" value="option1" /> Inquiry &nbsp;
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Order ID / Enquiry ID</p>
                                    </div>
                                    <div className="col-md-6">
                                        <select class="form-control rounded-0" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Customer Id </p>
                                    </div>
                                    <div className="col-md-6">

                                        <select class="form-control rounded-0" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Date </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" class="form-control rounded-0" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Item Id Muljis </p>
                                    </div>
                                    <div className="col-md-6">

                                        <select class="form-control rounded-0" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Expected Price </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" class="form-control rounded-0" id="inputEmail3" />

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>P PRICE </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>TIME DATE PRICE </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>BBP BEST VALUE </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>BBP PAMP </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>BM API OUTLET </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>BM API OUTLET </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>SUGGESTED COMP 1 </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>SUGGESTED COMP 2 </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 -py2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>SUGGESTED COMP 3 </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Expected Date of Delivery </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Selected Brand Name </p>
                                    </div>
                                    <div className="col-md-6">
                                        <select class="form-control rounded-0" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Qty </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 py-2">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <p className='form-label'>Actual Price Agreed </p>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="number" class="form-control rounded-0" id="inputEmail3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="botton-end">
                            <div className="col-12 form-rows">
                                <button type="submit" class="btn btn-secondary rounded-0 px-4">Add</button> <button type="submit" class="btn btn-secondary rounded-0 px-3">Update</button>
                            </div>
                        </div>
                        
                    </div>

                </form>
            </div>
        </>
    )
}

export default Inquiry