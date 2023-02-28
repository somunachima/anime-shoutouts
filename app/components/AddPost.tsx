'use client'
import { useState } from "react"
import { useMutation, userQueryClient } from "@tanstack/react-query"

export default function CreatePost(){
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  //CREATE POST
  const {mutate} = useMutation(
    
  )


  return(
    <form className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        value={title}
        placeholder="What's on your mind?"
        className="p-4 text-1g rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2" >
        <p className={`font-bold text-sm text-gray-400 ${title.length > 300 ? "text-red-700" : "text-gray-400"}`}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-teal-700"
          type="submit"
        >
          Create a post
        </button>
      </div>
    </form>
    )
}
