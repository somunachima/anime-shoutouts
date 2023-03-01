'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export default function AddComment({ id }) {
  return (
      <form className="my-8">
        <h3>Add a comment</h3>
        <div className="flex flex-col my-2">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={tiitle}
            
          />
        </div>
      </form>
    )
}
