import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
// import pdf from 
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';




function Row(props) {

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell> 
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    </React.Fragment>
  );
}




const Productstable = (props) => {
  const datavalues = props.data
  console.log(datavalues,"demo data 10")
  return (
    <TableContainer component={Paper}>
       <Table aria-label="collapsible table">
        <TableHead>
          <TableRow >
            <TableCell align="left">Product CT</TableCell>
            <TableCell align="left">Unit Price</TableCell>
            <TableCell align="left">GPP</TableCell>
            <TableCell align="left">Per Gm.</TableCell>
            <TableCell align="left">Product Category</TableCell>
            <TableCell align="left">Retail Price</TableCell>
            <TableCell align="left">Supplier Id</TableCell>
            <TableCell align="left">Metal Weight Gm</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
       {datavalues.products.products_data.map((e)=>
       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
       <TableCell align="left">{e.CT_number}</TableCell>
       <TableCell align="left">{e.unit_price}</TableCell>
       <TableCell align="left">{e.gpp}</TableCell>
       <TableCell align="left">{e.per_gm.toString().substring(10, e.per_gm.length - 1)}</TableCell>
       <TableCell align="left">{e.product_category}</TableCell>
       <TableCell align="left">{e.retail_price}</TableCell>
       <TableCell align="left">{e.supplier_idsupplier_id}</TableCell>
       <TableCell align="left">{e.metal_weight_gm}</TableCell>

  



     </TableRow>
       ) }

        </TableBody>
      </Table>
    
      {/* ............................PAYMENT SECTION......................... */}

 <h6 style={{ margin:"1%" }} className='product_heading'>PAYMENT DETAILS</h6>
 <hr></hr>
 {/* <button className="download_invoice">Download Invoice</button> */}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow >

            <TableCell align="left">PRICE</TableCell>
            <TableCell align="left">PAID</TableCell>
            <TableCell align="left">BALANCE</TableCell>
            <TableCell align="left">CASH</TableCell>
            <TableCell align="left">CARD</TableCell>
            <TableCell align="left">BANK</TableCell>
            <TableCell align="left">CHEQUE</TableCell>
            <TableCell align="left">EXCHANGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableCell align="left">{ datavalues.total_price }</TableCell>
        <TableCell align="left">{datavalues.paid_amount}</TableCell>
        <TableCell align="left">{(datavalues.total_price - datavalues.paid_amount)}</TableCell> 
        <TableCell align="left">{datavalues.cash_amount}</TableCell>
        <TableCell align="left">{datavalues.card_amount}</TableCell>
        <TableCell align="left">{datavalues.cank_amount}</TableCell>
        <TableCell align="left">{datavalues.chaque_amount}</TableCell>
        <TableCell align="left">{datavalues.exchange_amount}</TableCell>


        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Productstable