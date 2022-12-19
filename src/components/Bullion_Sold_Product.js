import React, { useEffect, useState, useContext } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { dataContext } from "../helpers/context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";





const Bullion_Sold_Product = () => {
  const navigate = useNavigate();

  const [alllist, setAllList] = useState();
  const { productValue, setProdctValue } = useContext(dataContext);
  const [open, setOpen] = useState(false);
  const [modal_data, setModal_data] = useState()

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 2,
  };

  useEffect(() => {
    const allListdata = () => {
      fetch(`http://${process.env.REACT_APP_SERVER_IP}:4000/sold_product`)
        .then((res) => res.json())
        .then((data) =>
          setAllList(data)
        );
      console.log(alllist, "alllist");
    };
    allListdata();
  }, [])


  const handleOpen = (cellValues) => {
    setOpen(true);
    console.log(cellValues, "celvalue");
    setModal_data(alllist.find((o) => o.order_id == cellValues.order_id))
    navigate("/View_more", { state: { modal: alllist.find((o) => o.client_id == cellValues.client_id) } });

  };
  const handleClose = () => {
    setOpen(false);
    console.log(modal_data, "modal data")
  };

  const columns = [
    { field: "order_id", headerName: "order_id", width: 100 },
    { field: "client_id", headerName: "client_id", width: 100 },
    { field: "first_name", headerName: "first_name", width: 120 },
    { field: "surname", headerName: "surname", width: 100 },
    { field: "postcode", headerName: "postcode", width: 100 },
    { field: "mobile", headerName: "mobile", width: 120 },
    { field: "email", headerName: "email", width: 100 },
    { field: "products", headerName: "product ct", width: 200 },

    {
      field: "details",
      headerName: "More",
      width: 120,
      renderCell: (cellValues) => (
        <>
          <Button
            title="Click to edit description!"
            style={{ width: "50%", height: "60%" }}
            onClick={() => handleOpen(cellValues.row)}
          >
            Show more
          </Button>
        </>
      ),
    },

  ];



  const rows = alllist?.map((row) => ({
    order_id: row.order_id,
    client_id: row.client_id,
    first_name: row.first_name,
    surname: row.surname,
    postcode: row.postcode,
    products: row.products.products_data?.map((e, index) => e.CT_number),
    mobile: row.mobile,
    email: row.email,
  }));


  return (
    <div className=''>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Details
          </Typography>
          {modal_data ?
            <>

              <h6>Products</h6>
              {modal_data.products.products_data.map((e) => <ul>
                <li>{e.CT_number}</li>
              </ul>)}


            </>
            : null}
          <br />

          <Button style={{ color: "#000" }} onClick={handleClose}>
            OK
          </Button>


        </Box>
      </Modal>

      <Sidebar />


      {alllist ?
        <DataGrid
          style={{ height: "100vh", width: "100%" }}
          rows={rows}
          columns={columns}
          pageSize={20}
          getRowId={(row) => row.order_id}
          rowsPerPageOptions={[20]}
          components={{ Toolbar: GridToolbar }}
          density="compact"
        /> : null}

    </div>
  )
}

export default Bullion_Sold_Product
