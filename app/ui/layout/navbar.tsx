'use client'
import { useSession } from "next-auth/react";
// ^ This turns the component into a client component. Client components allow the use of events like onClick: https://nextjs.org/docs/app/getting-started/server-and-client-components
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const username = session?.user?.name;

  return (
    <nav className="flex flex-row justify-between p-2 w-full h-16 bg-(--color-primary) fixed top-0">
      <div onClick={() => router.push("/")} className="flex justify-center items-center cursor-pointer">
        <img></img>
        <span>HandCrafted Haven</span>
      </div>
      {isLoading
        ? <p>loading</p>
        : <div className="flex flex-row gap-2 items-center justify-center">
            {isLoggedIn && (
              <span>Welcome back {username}</span>
            )}
            <button onClick={handleAuthClick} className="flex justify-center items-center bg-(--color-accent) px-6 py-3 rounded-lg hover:bg-white hover:text-(--color-primary) cursor-pointer">
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
      }
    </nav>
  )

  function handleAuthClick() {
    if (isLoggedIn) {
      signOut({ callbackUrl: "/" });
    } 
    else {
      router.push("/login");
    }
  }

}