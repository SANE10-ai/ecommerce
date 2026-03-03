import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'

const Navbar = () => {
    const [location, setLocation] = useState(localStorage.getItem('userAddress') || "")
    const [showInput, setShowInput] = useState(false)
    const addressRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addressRef.current && !addressRef.current.contains(event.target)) {
                setShowInput(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

  return (

    <div className='bg-white py-3 shadow-md'>

        <div className='max-w-6xl mx-auto flex justify-between items-center'>
            {/* Logo Section */}

        <div className='flex gap-7 items-center'>

            <Link to={'/'}>
            <h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>S</span>ane<span className='text-blue-500 font-serif'>S</span>tore</h1>
            </Link>

            <div ref={addressRef} className='flex gap-1 cursor-pointer text-gray-700 items-center relative' onClick={()=> setShowInput(true)}>
        
                <MapPin className='text-red-500'/>
                <span className='font-semibold '>{location ? location: "Add Address"}</span>
                <FaCaretDown />

                {showInput && (
                    <div className='absolute top-12 left-0 bg-white shadow-lg p-4 rounded-lg w-64 z-50' 
                        onClick={(e)=> e.stopPropagation()}>
                        <input 
                        
                        type="text"
                        placeholder='Enter your location'
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition'
                        value={location}
                        onChange={(e)=> {
                            setLocation(e.target.value)
                            localStorage.setItem("userAddress", e.target.value)
                        }}

                        />
                    
                    <div className='flex gap-2 mt-2'>

                        <button className='flex-1 bg-red-500 py-2 text-white rounded-lg hover:bg-red-600 transition cursor-pointer' onClick={()=> setShowInput(false)}>Save</button>

                        <button className='flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer' onClick={()=> setShowInput(false)}>Close</button>

                    </div>


                    </div>
                )}

            </div>

        </div>
        <div>
            {/* Menu Section */}

            <nav className='flex gap-7 items-center'>
                <ul className='flex gap-7 items-center text-xl font-semibold' >
                    <NavLink to={'/'} className={({isActive})=> `${isActive ? "border-b-2 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Home</li></NavLink>

                    <NavLink to={'/products'} className={({isActive})=> `${isActive ? "border-b-2 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Products</li></NavLink>

                    <NavLink to={'/about'} className={({isActive})=> `${isActive ? "border-b-2 transition-all border-red-500": "text-black"} cursor-pointer`}><li>About</li></NavLink>

                    <NavLink to={'/contact'} className={({isActive})=> `${isActive ? "border-b-2 transition-all border-red-500": "text-black"} cursor-pointer`}><li>Contact</li></NavLink> 
                </ul>

                <Link to={'/cart'} className='relative'>

                <IoCartOutline className='h-7 w-7' />
                <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>0</span>
                
                </Link>

                <Link to="/login" className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'>
                        Sign In

                    </Link>
            
            </nav>
        </div>
        </div>
    </div>
  )
}

export default Navbar
