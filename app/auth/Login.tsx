'use client'

import {signIn} from 'next-auth/react'

export default function Login() {
  return (
      <li className="list-none">
        <button onClick={() => signIn()} className="text-sm bg-slate-900 text-white py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-slate-700 -my-2.5 ml-8">
          Sign In
        </button>
      </li>
  )
}
