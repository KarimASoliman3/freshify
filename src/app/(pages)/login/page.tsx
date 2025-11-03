import React from 'react'
import { LoginForm } from './_Components/LoginForm/LoginForm'

export default function Login() {
  return <>
    <div className='min-h-[60vh] flex flex-col justify-center items-center gap-6'>
        <h1 className='text-4xl font-bold'>Welcome back !</h1>
        <LoginForm />
    </div>
  </>
}
