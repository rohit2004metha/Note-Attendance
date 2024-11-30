import React from 'react'
import logo from '../assets/logo.svg'

const Loader = ({message}) => {
    return (
        <div className='flex flex-col h-screen gap-2 items-center justify-center'>
            {/* <div className='w-9 h-9 border-t-4 border-r-4 border-4 border-t-[var(--primary)] border-r-[var(--primary)] border-white  rounded-full animate-spin'></div> */}
            {/* <div className='w-7 h-7 border-t-2 border-2 border-t-[var(--primary)] border-white  rounded-full animate-spin'></div> */}
            {/* <div className='w-7 h-7 border-t-2 border-2 border-t-[var(--primary)] border-white  rounded-full animate-spin'></div> */}
            <img src={logo} className='animate-bounce w-10'/>
            <h2 className='text-[var(--primary)]'>{message}<span className='animate-pulse'>...</span></h2>
        </div>
    )
}

export default Loader
