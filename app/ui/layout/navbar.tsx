'use client'
// ^ This turns the component into a client component. Client components allow the use of events like onClick: https://nextjs.org/docs/app/getting-started/server-and-client-components

import { useRouter } from "next/navigation";

export default function Navbar() {
  const isLoggedIn = false;
  const router = useRouter();

  return (
    <nav className="flex flex-row justify-between p-2 w-full h-16 bg-(--color-primary) fixed top-0">
      <div onClick={() => router.push("/")} className="flex justify-center items-center cursor-pointer">
        <img></img>
        <span>HandCrafted Haven</span>
      </div>
      <button onClick={() => router.push("/login")} className="flex justify-center items-center bg-(--color-accent) px-6 py-3 rounded-lg hover:bg-white hover:text-(--color-primary) cursor-pointer">
        {!isLoggedIn &&
          <span>Login</span>
        }
        {isLoggedIn &&
          <span>Logout</span>
        }
      </button>
    </nav>
  )

  function login() {
    
  }

  function logout() {

  }
}