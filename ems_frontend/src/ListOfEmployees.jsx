import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from './Api/axios';

const ListOfEmployees = ({employees,refresh}) => {
  
let navigate=useNavigate(); 

const updateEmployee=(id)=>{
  navigate(`/update-employee/${id}`)
}

//deleting a employee
const deleteEmployee=async (id)=>{
  await api.delete(`/${id}`)
  await refresh();
}

  return (
    <div>
      <div>
        <button onClick={()=>navigate('/add-employee')} className='bg-slate-600 cursor-pointer hover:bg-slate-700 text-white px-2 py-2 rounded-sm tracking-wide text-lg w-44 font-semibold ml-8 mt-10'>Add Employee</button>
      </div>
      <div className='mx-8 mt-4'>
        <table className='shadow w-full mr-2 '>
          <thead>       
            <tr className='bg-gray-50 tracking-widest font-semibold text-gray-900'>
              <td className='p-3'>FIRST NAME</td>
              <td className='p-3'>LAST NAME</td>
              <td className='p-3'>EMAIL ID</td>
              <td className='p-3 text-right pr-6'>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {employees.map(
              (employee) =>
                <tr key={employee.id}>
                  <td className='px-3 py h-16 text-lg  text-gray-900 font-light'>{employee.firstName}</td>
                  <td className='px-3 py h-16 text-lg  text-gray-900 font-light'>{employee.lastName}</td>
                  <td className='px-3 py h-16 text-lg  text-gray-900 font-light'>{employee.emailId}</td>
                  <td className='px-3 py h-16 text-lg  text-gray-700 font-medium text-right space-x-2'>
                    <button onClick={()=>{updateEmployee(employee.id)}} className='cursor-pointer'>Edit</button> <button onClick={()=>{deleteEmployee(employee.id)}} className='cursor-pointer'>Delete</button></td>
                </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOfEmployees