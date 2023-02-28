'use client'

import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import axios from "axios"

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

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  //Toggle
  const [toggle, setToggle] = useState(false)

  //Delete post
  const {mutate} = useMutation(
      async (id: string) => await axios.delete("/api/posts/deletePost", { data:id }),
      {
        onError: (error) => {
          console.log(error)
        },
        onSuccess: (data) => {
          console.log(data)
        },
      }
  )

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-md">
        <div className="flex items-center gap-2">
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
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button className="text-sm font-bold text-red-700 hover:text-red-500">Delete</button>
        </div>
      </div>
      {toggle && <Toggle />}
    </>
  )
}
