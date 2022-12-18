import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components'

const Boxs = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    background-color: white;
    boxShadow: 24;
    @media (max-width: 600px) {
        width: 95%;
        height:80vh;
        overflow:scroll;
        }
    `

const Button = styled.button`
 border:none;
 background-color:white;
 padding:10px;
 margin:20px 0;
 color:#3596d9;
 border-radius:7px;
 border:1px solid #3596d9;
 &:hover {
    background:;
 }
`





export default function AddNewItems() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data2, setData] = useState();
    const [hit, setHit] = useState(false);




    useEffect(() => {
        const alldata = () => {
          fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all`)
            .then((res) => res.json())
            .then((data) => setData(data.rows));
          console.log(data2, "all data");
        };
        alldata();
    
        const interval = setInterval(() => {
          setHit(true);
        }, 300000);
    
        return () => clearInterval(interval);
      }, []);
    
      if (hit === true) {
        const alldata = () => {
          fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all`)
            .then((res) => res.json())
            .then((data) => setData(data.rows));
          console.log(data2, "all data hhhhhh");
          console.log("hit is true");
          setHit(false);
          // console.log(formValues, "formvalues");
          // alert(" 😃 Page refresh complete.  ");
        };
    
        alldata();
      } else {
        console.log("hit is false");
      }


    return (
        <div>
            <Button onClick={handleOpen} >Add New Item</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Boxs >
                    <div className='container-fluid'>
                        <div className="row  bg-secondary">
                            <div className="col-12 text-white py-2 d-flex bar">
                                <div>Add Item</div>
                                <div onClick={handleClose} className="bar-btn">&#x2716;</div>
                            </div>
                        </div>
                        <form className='p-4'>

                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-6 py-2">
                                            </div>
                                            <div className="col-md-6 py-2">
                                                <input type="radio" className="form-label" value="option1" /> New &nbsp;
                                                <input type="radio" className="form-label" value="option1" checked /> Old Updates
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Item ID Muljis </p>
                                            </div>
                                            <div className="col-md-8">
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
                                            <div className="col-md-4">
                                                <p className='form-label'>Item Id Supplier </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Manufacturer </p>
                                            </div>
                                            <div className="col-md-8">
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
                                            <div className="col-md-4">
                                                <p className='form-label'>Product Type </p>
                                            </div>
                                            <div className="col-md-8">
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
                                            <div className="col-md-4">
                                                <p className='form-label'>Brand </p>
                                            </div>
                                            <div className="col-md-8">
                                                <select class="form-control rounded-0" id="exampleFormControlSelect1">
                                                    <option>BAIRD</option>
                                                    <option>DP TO DO</option>
                                                    <option>PAMP</option>
                                                    <option>METALOR</option>
                                                    <option>CREDIT SUISSE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Metal Type </p>
                                            </div>
                                            <div className="col-md-8">
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
                                            <div className="col-md-4">
                                                <p className='form-label'>Dimensions </p>
                                            </div>
                                            <div className="col-md-8">
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
                                            <div className="col-md-4">
                                                <p className='form-label'>Item Weight(Grams) </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Purchase Price </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Item Weight (OZ) </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Sell Price </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 -py2">
                                        <div className="row g-0">

                                        </div>
                                    </div>
                                    <div className="col-lg-6 py-2">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <p className='form-label'>Link for Live Price </p>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" class="form-control rounded-0" id="inputEmail3" />
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
                </Boxs>
            </Modal>
        </div>
    );
}
