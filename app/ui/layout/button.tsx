'use client'
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: "login" | "logout" | "navigate";
  navigateUrl?: string;
}

export default function Button({ action, navigateUrl, ...props }: ButtonProps) {
  const router = useRouter();

  return (
    <button {...props} onClick={clickEvent}>

    </button>
  )

  function clickEvent() {
    switch (action) {
      case "login":
        login();
        break;
      case "logout":
        logout();
        break;
      case "navigate":
        navigate(navigateUrl ?? "");
        break;
    }
  }

  function login() {
    console.log("Login clicked!");
  }

  function logout() {
    console.log("Logout clicked!");
  }

  function navigate(navigateUrl: string) {
    router.push(navigateUrl);
  }
}