'use client'

import Image from "next/image"
import { useState } from "react"

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string
  comments?: {
    id: string
    postId: string
    userId: string
  }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps){
  return (
      <div className="bg-white my-8 p-8 rounded-md">
          <div>
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={avatar}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700">{name}</h3>
          </div>
          <div className="my-8">
              <p className="break-all">{title}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
              {/* <Link href={`/post/${id}`}>
                      <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
              </Link> */}
            </div>
      </div>
  )
}
