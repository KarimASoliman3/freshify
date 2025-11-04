import React from 'react'
import RegisterForm from './_Components/RegisterForm/RegisterForm'

export default function Register() {
  return <>
  <div className='min-h-[60vh] flex flex-col justify-center items-center gap-6'>
          <h1 className='text-4xl font-bold'>Welcome back !</h1>
          <RegisterForm />
      </div>
  </>
}
