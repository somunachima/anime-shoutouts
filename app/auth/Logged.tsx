'use client'

import Image from "next/image"
import {signOut} from "next-auth/react"
import Link from "next/link"

export default function Logged(){
    return(
        <li className="flex gap-8 items-center">
          <button onClick={() => signOut()} className="text-sm bg-transparent text-gray-800 py-2 px-6 rounded-xl disabled:opacity-25 border border-gray-800 hover:bg-slate-700 hover:text-white -my-2.5 ml-8">Sign Out</button>

          <Link href={"/dashboard"}>
            
          </Link>

        </li>
    )
}
