import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../firebase'

function Navbar({ isAuth, setIsAuth }) {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }

  return (
    <nav className='bg-green-900 border-green-200 px-5 fixed top-0 w-full h-16 flex justify-self-center sm:px-4'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link to={'/'} className='flex items-center'>
          {/* <img src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/> */}
          <span className='self-center text-3xl font-bold text-green-100'>
            <b>Code Drops</b>
          </span>
        </Link>
        <div className='flex items-center'>
          {isAuth && (
            <div className='flex'>
              <Link
                to={'/add'}
                className='bg-green-700 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full'
              >
                Add Drop
              </Link>
              <button
                onClick={signUserOut}
                className='ml-2 bg-green-700 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
