import React, { useState , useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { NoEncryption } from "@mui/icons-material";
import styled from "styled-components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const btn = {
  texrDecoration: "none",
};



export default function AddSuppliers() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const[all_suppliers, setAllsuppliers]=useState()
  const [supplier_data, setSupplier_data] = useState({
    supplier_id: "",
    name: "",
    email: "",
    phone_1: "",
    phone_2: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };

  useEffect(()=>{
    fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/all_suppliers`)
    .then((res) => res.json())
    .then((data) =>
    setAllsuppliers(data.rows)
    );
    console.log(all_suppliers,"all suppliers with id")

  },[])

  const handle_update_modal = () => {
    setOpen(true);
    setShow(true);
  };

  const handle_form = (key, value) => {
    try {
        console.log(key, value, "kes value");
        setSupplier_data((prev) => {
            return {
              ...prev,
              [key]: value,
            };
          });
        if(supplier_data.supplier_id != "Supplier ID"||"" ){
            if(key === "supplier_id"){
                let selected_suppplier =  all_suppliers?.find((o)=>o.supplier_id==value)
                console.log(selected_suppplier,"selected supplier")
                setSupplier_data((prev) => {
                    return {
                       supplier_id: selected_suppplier.supplier_id,
                      name: selected_suppplier.supplier_name,
                      email:selected_suppplier.supplier_email,
                      phone_1:selected_suppplier.phone_1,
                      phone_2:selected_suppplier.phone_2
                    };
                  });
            }

          }
    } catch (error) {
        console.log(error)
    }
  };

  const add_supplier = async () => {
    console.log(supplier_data);
    const response = await fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/add_suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier_data),
    });
    const body = await response.text();
    if(body){setOpen(false)}

  };
  const update_suppliers = async () => {
    alert("update request send...")
    console.log(supplier_data);
    if(supplier_data.supplier_id == "Supplier ID"){
        alert("please select valid option")
    }
    else{
        const response = await fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/update_suppliers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(supplier_data),
          });
          const body = await response.text();

          if(body){setOpen(false)}
    }


  };

  const columns = [
    { field: "supplier_id", headerName: "Supplier id", width: 100 },
    { field: "supplier_name", headerName: " Supplier Name", width: 200},
    { field: "supplier_email", headerName: " Email", width: 300},
    { field: "phone_1", headerName: " Phone 1", width: 300},
    { field: "phone_2", headerName: " Phone 2", width: 300},

  ];

  const rows = all_suppliers?.map((row) => ({
    supplier_name:row.supplier_name,
    supplier_id:row.supplier_id,
    supplier_email:row.supplier_email,
    phone_1:row.phone_1,
    phone_2:row.phone_2
  }));

  return (
    <div style={{position:"relative"}}>
      {/* <Button onClick={handleOpen} sx={btn}>Add New Supplier</Button> */}
      <button onClick={handleOpen} className="fixed-button-modal">Add New Supplier</button>
      <button onClick={handle_update_modal} className="fixed-button-modal ">Update Supplier</button>
      {all_suppliers?<DataGrid
          style={{ height: "94vh", width: "100%",position:"absolute",top:"0" }}
          rows={rows}
          columns={columns}
          pageSize={20}
          getRowId={(row) => row.supplier_id}
          rowsPerPageOptions={[20]}
          components={{ Toolbar: GridToolbar }}
          density="compact"
        />:<center><h6>loading...</h6></center>}
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div
            className="container-fluid"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <div className="row  bg-secondary">
              <div className="col-12 text-white py-2 d-flex bar">
                <div>Add Supplier</div>
                <div onClick={handleClose} className="bar-btn">
                  &#x2716;
                </div>
              </div>
            </div>
            <div className="p-4">
              <div
                className="container"
                style={{ backgroundColor: "whitesmoke" }}
              >
                <div className="row">
                  <div className="col-lg-6 py-2">
                    <div className="row g-0">
                      <div className="col-md-6 py-2"></div>
                      <div className="col-md-6 py-2">Add or Updates</div>
                    </div>
                  </div>

                  {show ? (
                    <div className="col-lg-6 py-2">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <p className="form-label">Supplier ID </p>
                        </div>
                        <div className="col-md-8">
                          <select
                            onChange={(e) =>
                              handle_form("supplier_id", e.target.value)
                            }
                            class="form-control rounded-0"
                          >
                            <option selected disabled >Supplier ID</option>
                            {all_suppliers.map((value)=><option>{value.supplier_id}</option>)}
                        
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="col-lg-6 py-2">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <p className="form-label">Name </p>
                      </div>
                      <div className="col-md-8">
                        <input
                          onChange={(e) => handle_form("name", e.target.value)}
                          value={supplier_data.name}
                          type="name"
                          class="form-control rounded-0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 py-2">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <p className="form-label">Email </p>
                      </div>
                      <div className="col-md-8">
                        <input
                        value={supplier_data.email}
                          onChange={(e) => handle_form("email", e.target.value)}
                          type="email"
                          class="form-control rounded-0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 py-2">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <p className="form-label">Phone 1 </p>
                      </div>
                      <div className="col-md-8">
                        <input
                        value={supplier_data.phone_1}
                          onChange={(e) =>
                            handle_form("phone_1", e.target.value)
                          }
                          type="email"
                          class="form-control rounded-0"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 py-2">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <p className="form-label">Phone 2 </p>
                      </div>
                      <div className="col-md-8">
                        <input
                        value={supplier_data.phone_2}
                          onChange={(e) =>
                            handle_form("phone_2", e.target.value)
                          }
                          type="email"
                          class="form-control rounded-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="botton-end">
                  <div className="col-12 form-rows">
                    {!show ? (
                      <button
                        onClick={add_supplier}
                        class="btn btn-secondary rounded-0 px-4"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                      
                        onClick={update_suppliers}
                        type="submit"
                        class="btn btn-secondary rounded-0 px-3"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
