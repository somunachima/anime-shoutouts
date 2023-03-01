import prisma from '../../../prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: "Please sign in" })
    }
    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    //Add a comment
    try {
      const { title, postId } = req.body.data

      if (!title.length) {
        return res.status(401).json({ message: "Please enter a text" })
      }

      const result = await prisma.comment.create({
          data: {
            message: title,
            userId: prismaUser?.id,
            postId,
          },
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({err: "Error has occured whilst posting this comment"})
    }


  }
}
