import React, { useEffect, useState } from 'react'
import api from '../Api/axios'
import { useNavigate, useParams } from 'react-router-dom'



const AddEmployee = ({ refresh }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [error, setError] = useState({ firstName: '', lastName: '', emailId: '' })

    function addOrUpdate() {
        if (id) {
            return "Update Employee"
        }
        else {
            return "Add New Employee"
        }
    }

    //updating a employee
    const updateEmployee = async (id) => {
        const employee = await api.get(`${id}`)
        setFirstName(employee.data.firstName)
        setLastName(employee.data.lastName)
        setEmailId(employee.data.emailId)

    }
    useEffect(() => {
        if (id)
            updateEmployee(id);
    }, [id])

    //validating the form
    const validate = () => {
        let errorCopy = { ...error }
        let valid = true;
        if (firstName.trim()) {
            errorCopy.firstName = ''
        }
        else {
            errorCopy.firstName = "First Name is required"
            valid = false
        }

        if (lastName.trim()) {
            errorCopy.lastName = ''
        }
        else {
            errorCopy.lastName = "Last Name is required"
            valid = false
        }
        if (emailId.trim()) {
            errorCopy.emailId = ''
        }
        else {
            errorCopy.emailId = "Email is required"
            valid = false
        }

        setError(errorCopy)
        return valid

    }

    //clearing the form
    const clearEmployee = () => {
        setFirstName('')
        setLastName('')
        setEmailId('')
    }

    //add employee details
    let saveEmployee = async () => {
        if (validate()) {
            const employee = { firstName, lastName, emailId }
            if (id) {
                await api.put('/' + `${id}`, { id, ...employee })
                navigate('/')
                refresh();
            }
            else {

                await api.post('', employee);
                navigate('/');
                refresh();
            }
        }


    }

    return (
        <div className=' shadow-sm max-w-2xl flex m-auto '>
            <div className='px-8 py-4 h-[60vh] gap-1.5 '>
                <div className='font-thin text-2xl tracking-wide '>
                    <h1>{addOrUpdate()}</h1>
                </div>
                <div className='mt-3'>
                    <label htmlFor="firstName" className='text-md font-medium'>First Name</label> <br />
                    <input type="text" id='firstName' name='firstName' placeholder='Enter your Firstname'
                        className={`w-120  border border-gray-300  rounded h-10 roun m-0.5 px-2 py-1 text-lg mt-1.5${error.firstName ? 'border border-red-600 focus:outline-none' : ' focus:ring-1 outline-none focus:border-none focus:ring-violet-600'} `}
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className='ml-1 -mt-1 text-red-600'>{error.firstName && error.firstName}</div>

                </div>
                <div className='mt-3'>
                    <label htmlFor="lastName" className=' text-md font-medium'>Last Name</label> <br />
                    <input type="text" id='lastName' name='lastName' placeholder='Enter your Lastname'
                        className={`w-120  border border-gray-300  rounded h-10 roun m-0.5 px-2 py-1 text-lg mt-1.5 ${error.lastName ? 'border border-red-600 focus:outline-none' : ' focus:ring-1 outline-none focus:border-none focus:ring-violet-600'} `}
                        value={lastName} onChange={(e) => setLastName(e.target.value)}

                    />
                    <div className='ml-1 -mt-1 text-red-600'>{error.lastName && error.lastName}</div>

                </div>
                <div className='mt-3'>
                    <label htmlFor="emailId" className='t-md font-medium '>Email</label> <br />
                    <input type="email" name='emailId' id='emailId' placeholder='Enter your Email'
                        className={`w-120  border border-gray-300  rounded h-10 roun m-0.5 px-2 py-1 text-lg mt-1.5 ${error.emailId ? 'border border-red-600 focus:outline-none' : ' focus:ring-1 outline-none focus:border-none focus:ring-violet-600'}`}
                        value={emailId} onChange={(e) => setEmailId(e.target.value)}

                    />
                    <div className='ml-1 -mt-1  text-red-600'>{error.emailId && error.emailId}</div>

                </div>
                <div className='mt-4 space-x-3'>
                    <button className='bg-green-400 hover:bg-green-700 text-lg w-24 text-white px-4 py-3 font-semibold rounded cursor-pointer' type='submit'
                        onClick={saveEmployee}
                    >
                        Save</button>
                    <button className='bg-red-400 hover:bg-red-700 text-lg w-24 text-white px-4 py-3 font-semibold rounded cursor-pointer' type='submit'
                        onClick={clearEmployee}
                    >
                        Clear</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee