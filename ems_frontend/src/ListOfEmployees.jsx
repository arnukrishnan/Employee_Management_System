import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from './Api/axios';

const ListOfEmployees = ({ employees, refresh }) => {

    let navigate = useNavigate();

    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`)
    }

    const deleteEmployee = async (id) => {
        await api.delete(`/${id}`)
        await refresh();
    }

    return (
        <div>
            <div>
                <button onClick={() => navigate('/add-employee')}
                    className='bg-slate-600 cursor-pointer hover:bg-slate-700 text-white px-2 py-2 rounded-sm tracking-wide text-base w-36 font-semibold ml-4 mt-6 md:text-lg md:w-44 md:ml-8 md:mt-10'>
                    Add Employee
                </button>
            </div>
            <div className='mx-4 mt-4  md:mx-8'>
                <table className='shadow w-full mr-2'>
                    <thead>
                        <tr className='bg-gray-50 tracking-widest font-semibold text-gray-900'>
                            <td className='p-2 text-xs md:p-3 md:text-base'>FIRST NAME</td>
                            <td className='p-2 text-xs md:p-3 md:text-base'>LAST NAME</td>
                            <td className='p-2 text-xs hidden sm:table-cell md:p-3 md:text-base'>EMAIL ID</td>
                            <td className='p-2 text-xs text-right pr-3 md:p-3 md:text-base md:pr-6'>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) =>
                            <tr key={employee.id}>
                                <td className='px-2 h-12 text-base text-gray-900 font-light md:px-3 md:h-16 md:text-lg'>{employee.firstName}</td>
                                <td className='px-2 h-12 text-base text-gray-900 font-light md:px-3 md:h-16 md:text-lg'>{employee.lastName}</td>
                                <td className='px-2 h-12 text-base text-gray-900 font-light hidden sm:table-cell md:px-3 md:h-16 md:text-lg'>{employee.emailId}</td>
                                <td className='px-2 h-12 text-base text-gray-700 font-medium text-right space-x-2 md:px-3 md:h-16 md:text-lg'>
                                    <button onClick={() => { updateEmployee(employee.id) }} className='cursor-pointer'>Edit</button>
                                    <button onClick={() => { deleteEmployee(employee.id) }} className='cursor-pointer'>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListOfEmployees