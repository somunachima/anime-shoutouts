'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

type PostProps = {
  id?: string
}

type Comment = {
  postId?: string
  title: string
}

export default function AddComment({ id } : PostProps) {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let commentToastId: string

  const {mutate} = useMutation(
      async (data: Comment) => axios.post("/api/posts/addComment", {data}), {
        onSuccess: (data) => {
          setTitle("")
          setIsDisabled(false)
          toast.success("Comment has been made 🔥", {id: commentToastId})
          queryClient.invalidateQueries(["comments"])
        },
        onError: (error) => {
          setIsDisabled(false)
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message, {id: commentToastId,
            })
            mutate({ title, postId: id })
          }
        },
      }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading("Adding your comment....")
  }

  return (
      <form className="my-8">
        <h3 className="font-bold text-gray-700">Add a comment</h3>
        <div className="flex flex-col my-2">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            className="p-4 text-lg rounded-md my-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-teal-700"
            type="submit"
          >
            Add Comment ⚡️
          </button>
          <p className={`font-bold text-sm text-gray-400 ${title.length > 300 ? "text-red-700" : "text-gray-400"}`}>{`${title.length}/300`}</p>
        </div>
      </form>
    )
}
