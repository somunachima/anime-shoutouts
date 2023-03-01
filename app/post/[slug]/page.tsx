'use client'

import Post from "@/app/components/Post"
import AddComment from "@/app/components/AddComment"
import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { motion } from "framer-motion"

type URL = {
  params: {
    slug: string
  }
}

//Fetch all the comments from the post
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
      queryKey: ["detail-post"],
      queryFn: () => fetchDetails(url.params.slug),
  })
  if (isLoading || !data) return "Loading comments...."
  console.log(data)
  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <motion.div
          key={comment.id}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md gap-2"
        >
          <div className="flex items-center space-between gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div>
            <p className="py-4">{comment.message}</p>
          </div>
        </motion.div>
      ))}
      </div>
  )
}
