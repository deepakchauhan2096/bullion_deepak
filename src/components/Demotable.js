import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Demotable = (props) => {
const datavalues = props.data
console.log(datavalues,"demo data 12")

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 200}} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>CLIENT ID</StyledTableCell>
          <StyledTableCell align="left">NAME</StyledTableCell>
          {/* <StyledTableCell align="left">LAST NAME</StyledTableCell> */}
          <StyledTableCell align="left">POSTCODE</StyledTableCell>
          <StyledTableCell align="left">MOBILE</StyledTableCell>
          <StyledTableCell align="left">EMAIL</StyledTableCell>
          <StyledTableCell align="left">ADDRESS</StyledTableCell>
          {/* <StyledTableCell align="left">TOTAL PAID</StyledTableCell> */}
          <StyledTableCell align="left">CITY</StyledTableCell>
          <StyledTableCell align="left">PAID</StyledTableCell>
          <StyledTableCell align="left">TOTAL</StyledTableCell>
       
        </TableRow>
      </TableHead>
      <TableBody>
       
          <StyledTableRow  sx={{ width: 200 }}>
             <StyledTableCell  align="left">{datavalues.client_id}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.first_name + datavalues.surname}</StyledTableCell>
            {/* <StyledTableCell align="left">{datavalues.surname}</StyledTableCell> */}
            <StyledTableCell align="left">{datavalues.postcode}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.mobile}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.email}</StyledTableCell>
            <StyledTableCell   sx={{ width: 200 }} align="left">{datavalues.house_name}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.city_and_town}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.paid_amount}</StyledTableCell>
            <StyledTableCell align="left">{datavalues.total_price}</StyledTableCell>

          </StyledTableRow>
        
      </TableBody>
    </Table>
  </TableContainer>
            
  );
}
export default Demotable