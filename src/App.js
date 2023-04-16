import Sidebar from "./components/Sidebar";
import { useState } from "react";
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link, Routes } from "react-router-dom";
import NewCombination from "./components/NewCombination";
import LinkBBP from "./components/LinkBBP";
import UseFormAddSupplier from "./components/AddSupplier";
import AddNewItem from "./components/AddNewItem";
import Inquiry from "./components/Inquiry";
import OrderToSupplier from "./components/OrderToSupplier";
import PurchaseNewOrder from "./components/PurchaseNewOrder";
import BullionInvoice from "./components/BullionInvoice"
import BullionReciept from "./components/BullionReciept";
import Dashboard from "./components/Dashboard";
import { dataContext } from "./helpers/context";
import ClientData from "./components/ClientData";
import PDF_Creation from "./components/PDF_Creation";
import Client_balance from "./components/Client_balance";
import Bullion_Sold_Product from "./components/Bullion_Sold_Product";
import View_more from "./components/View_more";
import Order_pdf from "./components/Order_pdf";
import FormOrderToSupplier from "./components/ClientPurchase";
import ClientPurchase from "./components/ClientPurchase";
import PDF_Creation_Client from "./components/PDF_Creation_Client";
import Sale_Reciept from "./components/Sale_Reciept";
import PDF_Creation_Sale_Reciept from "./components/PDF_Creation_Sale_Reciept";

const drawerWidth = 280;

  function App() {
    const [formValues, setFormValues] = useState([]);
   




// ***resize code***
  const Section = styled.section`
  margin-top:0px;
  position:relative;
  height:calc(100vh - 64px);
  padding-left:${drawerWidth}px;
  @media (max-width: 600px) {
    padding - left:0;
    }
  `


  return (

  <>
<dataContext.Provider value={{formValues, setFormValues}}>
    <Section >
    <Router>
      <Routes>
        <Route path="/" element={<NewCombination />} />
        <Route path="/listbbp" element={<LinkBBP />} />
        <Route path="/userformaddsupplier" element={<UseFormAddSupplier />} />
        <Route path="/addnewitem" element={<AddNewItem />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/ordertosupplier" element={<OrderToSupplier />} />
        <Route path="/purchaseordernew" element={<PurchaseNewOrder />} />
        <Route path="/BullionInvoice" element={<BullionInvoice />} />
        <Route path="/BullionReciept" element={<BullionReciept />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/clientdata" element={<ClientData />} />
        <Route path="/PDF_Creation" element={<PDF_Creation />} />
        <Route path="/Client_balance" element={ <Client_balance/> }/>
        < Route path ="/Bullion_Sold_Product" element={<Bullion_Sold_Product/>} />
        <Route path="/View_more" element={<View_more/>}/>
        <Route path="/Order_pdf" element={ <Order_pdf/> }/>
        <Route path="/clientpurchase" element={ <ClientPurchase/> }/>
        <Route path="/Sale_Reciept" element={ <Sale_Reciept/> }/>
        <Route path="/PDF_Creation_Sale_Reciept" element={<PDF_Creation_Sale_Reciept />} />
        <Route path="/PDF_Creation_Client" element={ <PDF_Creation_Client /> }/>
        
      </Routes>
    </Router>
  </Section>
  </dataContext.Provider>
</>
  );
}

export default App;
