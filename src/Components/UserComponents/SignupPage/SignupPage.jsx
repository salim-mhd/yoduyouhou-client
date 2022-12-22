import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postUserRegister } from '../../../api/Requests/userRequests/UserRequsts'

import './signupPage.css'

const SignupPage = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [frontentError, setFrontError] = useState('')
    const error = {}
    const regexFirstName = /^[A-Za-z][A-Za-z]{0,20}$/i;
    const regexLastName = /^[A-Za-z. ][A-Za-z. ]{0,20}$/i;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    useEffect(() => {
        if (!firstName) {
            error.firstName = 'First Name is Required !'
        } else if (!regexFirstName.test(firstName)) {
            error.firstName = 'Name is Not Valid'
        } else if (firstName.length <= 4) {
            error.firstName = 'First Name must be more than 4 Letters'
        } else if (firstName.length >= 10) {
            error.firstName = 'First Name should not exceed 10 Letters'
        }
        setFrontError(error)

    }, [firstName])

    useEffect(() => {
        if (!lastName) {
            error.lastName = 'Last Name is Required !'
        } else if (!regexLastName.test(lastName)) {
            error.lastName = 'Name is Not Valid'
        } else if (lastName.length <= 2) {
            error.lastName = 'Last Name must be more than 2 Letters'
        } else if (lastName.length >= 10) {
            error.lastName = 'Last Name should not exceed 10 Letters'
        }
        setFrontError(error)
    }, [lastName])

    useEffect(() => {
        if (!email) {
            error.email = 'Email Name is Required !'
        } else if (!regexEmail.test(email)) {
            error.email = 'Email is Not Valid'
        }
        setFrontError(error)
    }, [email])

    const validate = (firstName, lastName, email) => {
        // ----------------------------------- first Name verification ------------------------------------------ \\
        if (!firstName) {
            error.firstName = 'First Name is Required !'
        } else if (!regexFirstName.test(firstName)) {
            error.firstName = 'Name is Not Valid'
        } else if (firstName.length <= 4) {
            error.firstName = 'First Name must be more than 4 Letters'
        } else if (firstName.length >= 10) {
            error.firstName = 'First Name should not exceed 10 Letters'
        }
        // ----------------------------------- last name verification ------------------------------------------ \\
        if (!lastName) {
            error.lastName = 'Last Name is Required !'
        } else if (!regexLastName.test(lastName)) {
            error.lastName = 'Name is Not Valid'
        } else if (lastName.length <= 2) {
            error.lastName = 'Last Name must be more than 2 Letters'
        } else if (lastName.length >= 10) {
            error.lastName = 'Last Name should not exceed 10 Letters'
        }
        // ----------------------------------- email verification ------------------------------------------ \\
        if (!email) {
            error.email = 'Email Name is Required !'
        } else if (!regexEmail.test(email)) {
            error.email = 'Email is Not Valid'
        }

        return error;
    }

    const submit = (e) => {
        setFrontError(validate(firstName, lastName, email,));
        if (!frontentError.firstName && !frontentError.lastName && !frontentError.email) {
            let userInformatins = {firstName,lastName,email};
            postUserRegister(userInformatins).then((res)=>{
                localStorage.setItem('user',res.data.res)
                if(res.data.alredyUser){
                    localStorage.setItem('user',res.data.res.firstname)
                    navigate('/dashboard')
                }else{
                    localStorage.setItem('user',res.data.res.firstname)
                    navigate('/dashboard')
                }
            })
        } else {
            e.preventdefault()
        }
    }

    return (
        <>
            <div className='flex justify-center align-middle backgroundimage'>
                <form className="rounded-md bg-white m-10 shadow-xl lg:w-1/3 p-10 border mt-20 text-blue-600 border-gray-100 ">
                    <h1 className="text-2xl text-center font-bold lg:text-4xl">Registration Form</h1>
                    <p className="pb-4 text-center text-gray-500 mb-10">Welcome. Add Your Details</p>

                    <div className="mb-6 flex justify-center">
                        <div className='mr-5'>
                            <label className="text-black"> First Name </label>
                            <input onChange={(e) => { setFirstName(e.target.value) }} type="email" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
                            {frontentError.firstName ? <div className='text-center mt-2 text-red-600'>{frontentError.firstName}</div> : <></>}
                        </div>
                        <div>
                            <label className="text-black"> Last Name </label>
                            <input onChange={(e) => { setLastName(e.target.value) }} type="email" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
                            {frontentError.lastName ? <div className='text-center mt-2 text-red-600'>{frontentError.lastName}</div> : <></>}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="text-black"> Email Address </label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
                        {frontentError.email ? <div className='text-center mt-2 text-red-600'>{frontentError.email}</div> : <></>}
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={(e) => { submit(e) }} type="button" className="mt-5 w-1/2 rounded-full bg-green-600 p-2  text-center font-semibold text-white outline-none focus:ring">Sign up</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignupPage