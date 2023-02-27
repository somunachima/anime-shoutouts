'use client'
import "tailwindcss/tailwind.css";
import AddPost from "./components/AddPost";

export default function Home() {
  return (
    <main>
      <h1 className="text-lg py-50">Hello Next</h1>
      <AddPost />
    </main>
  )
}
