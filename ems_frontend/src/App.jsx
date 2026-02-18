import React, { useEffect, useState } from 'react'
import NavBar from './Components/NavBar'
import AddEmployee from './Components/AddEmployee'
import api from './Api/axios'
import ListOfEmployees from './ListOfEmployees'
import { Route, Routes } from 'react-router-dom'

const App = () => {

  const [employees, setEmployees] = useState([])

  const fetchItems = async () => {
    const response = await api.get();
    setEmployees(response.data);
    console.log("items fetched successfully", response.data);
  }


  useEffect(() => { fetchItems() }, [])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<ListOfEmployees employees={employees} refresh={fetchItems} />}></Route>
        <Route path="/add-employee" element={<AddEmployee refresh={fetchItems} />}> </Route>
       <Route path='/update-employee/:id'element={<AddEmployee refresh={fetchItems}/>}> </Route>
      </Routes>
    </>
  )
}

export default App