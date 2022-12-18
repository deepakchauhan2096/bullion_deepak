import React from 'react'
import AddNewItems from './AddNewItems'
import AddSuppliers from './Addsuppliers'
import Sidebar from './Sidebar'
import './styles.css'

const UserFormAddSupplier = () => {
  return (
    <>
      <Sidebar />
      <div className='p-4'>
        {/* <AddNewItems /> */}
        <AddSuppliers />
      </div>
    </>
  )
}

export default UserFormAddSupplier