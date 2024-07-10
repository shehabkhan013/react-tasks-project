import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="header w-full bg-black py-3">
        <div className="container flex justify-between items-center">
            <div className="logo"><h4 className='text-white font-mono text-lg font-bold'><Link to="/">TASKS</Link></h4></div>
            <div className="menu flex gap-4 items-center">
                <Link to="/" className="text-white font-mono text-lg font-bold">Home</Link>
                <Link to="/tasks" className="text-white font-mono text-lg font-bold">Task View</Link>
                <Link to="/contact" className="text-white font-mono text-lg font-bold">Conatct</Link>
            </div>
        </div>
    </div>
  )
}

export default Header