'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { PostType } from "../types/Post"
import { motion } from "framer-motion"

type Comment = {
  postId?: string
  title: string
}

type PostProps = {
  id?: string
}

export default function AddComment({ id }: PostProps) {
  let commentToastId: string
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
      async (data: Comment) => {
        return axios.post("/api/posts/addComment", {data})
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["detail-post"])
          setTitle("")
          setIsDisabled(false)
          toast.success("Comment has been made 🔥", {id: commentToastId})
        },
        onError: (error) => {
          setIsDisabled(false)
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message, {id: commentToastId})
          }
        },
      }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading("Adding your comment....", {
      id: commentToastId,
    })
    mutate({ title, postId: id })
  }

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
    >
        <form onSubmit={submitComment} className="my-8">
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
      </motion.div>
    )
}
