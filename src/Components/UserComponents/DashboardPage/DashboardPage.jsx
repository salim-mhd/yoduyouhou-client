import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'


const DashboardPage = () => {

  const [string, setString] = useState('')
  const [reverseString, setReverseString] = useState('');
  const [userData, setUserData] = useState({})
  const [socket, setSoket] = useState(null)


  useEffect(() => {
    setSoket(io('http://yoduyouhou.ml:8800'))
  }, [])

  useEffect(() => {
    socket?.emit('setdata', userData)
  }, [socket, userData])

  const reverseStr = () => {
    setUserData('hey')
    setString('')
    let array = string.split('')
    const regex = /[A-Za-z0-9]/;
    let j = array.length

    for (let i = 0; i <= j; i++) {
      if (regex.test(array[i])) {
        for (j = j - 1; j >= i; j--) {
          if (regex.test(array[j])) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            break;
          } else {
            continue;
          }
        }
      } else {
        continue;
      }
    }
    setReverseString(array)
  }

  return (
    <>
      <div className='flex justify-center align-middle '>
        <div className="rounded-md bg-white p-6 shadow-xl lg:w-1/3 lg:p-10 border mt-20 text-green-600 border-gray-100 ">
          <h1 className="text-2xl text-center font-bold lg:text-4xl mb-5">Enter a String</h1>

          <div className="w-full h-40 bg-gray-300 border-red border-2 rounded-xl mb-5">
            <div className='text-center font-bold text-4xl text-black pt-14'>
              <div>{reverseString}</div>
            </div>
          </div>
          <div>
            <input type="text" onChange={(e) => { setString(e.target.value) }} placeholder='e.g: "!Te$T"' value={string} className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
          </div>

          <div className='flex justify-center'>
            <button onClick={reverseStr} type="button" className="mt-5 w-1/2 rounded-full bg-green-600 p-2  text-center font-semibold text-white outline-none focus:ring">Reverse</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default DashboardPage