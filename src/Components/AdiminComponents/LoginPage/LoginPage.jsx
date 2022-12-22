import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postAdminLogin } from '../../../api/Requests/adminRequests/AdminRequests'

import './loginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [frontentError, setFrontError] = useState('')
  const [serverError, setServerError] = useState('')
  const error = {}
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  useEffect(() => {
    if (!email) {
      error.email = 'Email Name is Required !'
    } else if (!regexEmail.test(email)) {
      error.email = 'Email is Not Valid'
    }
    setFrontError(error)
  }, [email])

  useEffect(() => {
    if (!password) {
      error.password = 'Password Name is Required !'
    } else if (password.length <= 6) {
      error.password = 'Password Name must be more than 6 Letters'
    } else if (password.length >= 10) {
      error.password = 'Password Name should not exceed 10 Letters'
    }
    setFrontError(error)
  }, [password])

  const validate = (email, password) => {
    // ----------------------------------- email verification ------------------------------------------ \\
    if (!email) {
      error.email = 'Email Name is Required !'
    } else if (!regexEmail.test(email)) {
      error.email = 'Email is Not Valid'
    }
    // ----------------------------------- password verification ------------------------------------------ \\
    if (!password) {
      error.password = 'Password Name is Required !'
    } else if (password.length <= 4) {
      error.password = 'Password Name must be more than 4 Letters'
    } else if (password.length >= 10) {
      error.password = 'Password Name should not exceed 10 Letters'
    }
    return error;
  }

  const submit = (e) => {
    setFrontError(validate(email, password));
    if (!frontentError.email && !frontentError.password) {

      let adminInformations = { email, password }
      postAdminLogin(adminInformations).then((res) => {
        if (res.data.admin) {
          localStorage.setItem('admin',true)
          navigate('/admin/dashboard')
        } else {
          setServerError(res.data.error)
        }
      })
    } else {

    }
  }

  return (
    <>
      <div className='login-backgroundimage w-full h-full'>
        <div className='flex justify-center align-middle '>
          <form className="rounded-md bg-white p-6 shadow-xl lg:w-1/3 lg:p-10 border mt-20 text-green-600 border-gray-100 ">
            <h1 className="text-2xl text-center font-bold lg:text-4xl">Admin Login</h1>
            <p className="pb-4 text-center text-gray-500 mb-5">Login to access your account</p>
            {serverError ? <div className='text-red-600 text-center mb-3'>{serverError}</div> : <></>}
            <div className="mb-3">
              <label className="text-black"> Email Address </label>
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Info@example.com" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
            </div>
            {frontentError.email ? <div className='text-center text-red-700'>{frontentError.email}</div> : <></>}
            <div>
              <label className="text-black"> Password </label>
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="******" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
            </div>
            {frontentError.password ? <div className='text-center text-red-700'>{frontentError.password}</div> : <></>}
            <div className='flex justify-center'>
              <button onClick={(e) => { submit(e) }} type="button" className="mt-5 w-1/2 rounded-full bg-green-600 p-2  text-center font-semibold text-white outline-none focus:ring">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage