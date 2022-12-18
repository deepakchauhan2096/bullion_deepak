import React from 'react'
import AddNewItems from './AddNewItems'
import Sidebar from './Sidebar'


const AddNewItem = () => {
    return (
        <>
            <Sidebar />

            <div className='container-fluid' style={{ backgroundColor: "" }}>
                <AddNewItems />
            </div>
        </>
    )
}

export default AddNewItem