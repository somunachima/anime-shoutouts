'use client'

import Image from "next/image"
import {signOut} from "next-auth/react"
import Link from "next/link"

type User = {
  image: string
}

export default function Logged({ image }: User){
    return(
        <li className="flex gap-8 items-center">
          <button onClick={() => signOut()} className="text-sm bg-transparent text-gray-800 py-2 px-6 rounded-xl disabled:opacity-25 border border-gray-800 hover:bg-slate-700 hover:text-white -my-2.5 ml-8">Sign Out</button>

          <Link href={"/dashboard"}>
            <Image
              width={64}
              height={64}
              className="w-14 rounded-full"
              src={image}
              alt=""
              priority
            />
          </Link>

        </li>
    )
}
