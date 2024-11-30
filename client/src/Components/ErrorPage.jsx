import React from 'react'
import error from '../assets/error.svg'
import { Link,useLocation } from 'react-router-dom'

const ErrorPage = () => {
  const message = useLocation()
  return (
    <div className='flex flex-col h-screen justify-evenly items-center max-w-5xl px-6'>
      <img src={error} alt="error" />
      <div className='flex flex-col items-center gap-12'>
        <p className="text-2xl">{message?.state?.errorMessage || 'Something went wrong !'}</p>
        <Link to={'/selection'} className='px-8 rounded-lg py-3 bg-[var(--primary)] text-white'>Back to Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage
