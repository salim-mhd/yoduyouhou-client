import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { getUserDetails, changeUserStatus, deleteUser, deleteAllUser } from '../../../api/Requests/adminRequests/AdminRequests'

import { io } from 'socket.io-client'

const AdminDashboard = () => {
  const [usersDetals, setUserDetails] = useState([])
  const [socket, setSoket] = useState(null)
  const [check, setCheck] = useState(false)

  useEffect(() => {
    setSoket(io('https://yoduyouhou.ml:8800'))
  }, [])

  useEffect(() => {
    socket?.on('sentToAdmin', arg => {
      setCheck(!check)
    })
    getUserDetails().then((res) => {
      let users = res.data.users
      setUserDetails(users)
    })
  }, [socket, check])

  const getUserDate = () => {
    getUserDetails().then((res) => {
      let users = res.data.users
      setUserDetails(users)
    })
  }

  const blockOrUnbolockUser = (userId) => {
    Swal.fire({
      title: 'Are you sure about status change this User ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        changeUserStatus(userId).then(() => {
          getUserDate()
        })
      }
    })

  }

  const deleteUserDetails = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId).then(() => {
          getUserDate()
        })
      }
    })
  }

  const deleteAllUserDetails = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllUser().then(() => {
          localStorage.removeItem('user')
          getUserDate()
        })
      }
    })
  }


  return (
    <>
      <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div class="flex items-center justify-between pb-6">
          <div>
            <h2 class="font-bold text-xl text-gray-700">User Details</h2>
            <span class="text-xs text-gray-500">View accounts of registered users</span>
          </div>
          <div class="flex items-center justify-between">
            {usersDetals.length != 0 ? <div class="ml-10 space-x-8 lg:ml-40">
              <button onClick={() => { deleteAllUserDetails() }} class='bg-red-600 p-2 ml-5 rounded-full pl-5 pr-5 text-white'>Delete All</button>
            </div> : <></>}

          </div>
        </div>
        {usersDetals.length != 0 ?
          <div class="overflow-y-hidden rounded-lg border">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th class="px-5 py-3">First Name</th>
                    <th class="px-5 py-3">Last Name</th>
                    <th class="px-5 py-3">Email Id</th>
                    <th class="px-5 py-3">Created at</th>
                    <th class="px-5 py-3">Status</th>
                    <th class="px-5 py-3 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody class="text-gray-500">

                  {usersDetals.map((user) => {
                    const my_date = user.createdAt;
                    let date = new Date(my_date).toString().split(' ').splice(0, 5).join(' ');
                    return (
                      <tr>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap font-semibold ">{user.firstname}</p>
                        </td>

                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{user.lastname}</p>
                        </td>

                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{user.email}</p>
                        </td>
                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p class="whitespace-no-wrap">{date}</p>
                        </td>

                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p onClick={() => { blockOrUnbolockUser(user._id) }} class="whitespace-no-wrap m-5">{user.block ? <i class="fa-solid fa-lock text-2xl text-red-600"></i> : <i class="fa-solid fa-lock-open text-2xl text-green-700"></i>}</p>
                        </td>

                        <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <button onClick={() => { deleteUserDetails(user._id) }} class='bg-red-600 p-2 ml-5 rounded-full pl-5 pr-5 text-white'>Delete</button>
                        </td>

                      </tr>
                    )
                  })}


                </tbody>
              </table>
            </div>
          </div> : <div className='flex justify-center align-middle w-full h-96 rounded-lg  border-2 border-black'><div className='mt-40 text-4xl font-semibold'>Sorry !!! Currently No Users</div></div>}
      </div>

    </>
  )
}

export default AdminDashboard