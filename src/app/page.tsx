"use client"
import ConnectButton from "@/components/ConnectButton";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   if(!localStorage.getItem('userid')) {
  //     router.push('/login');
  //   }
  // });

  return (
    <div>
        <p>Welcome to CollabInn</p>
        <ConnectButton />
      </div>
  )
}

export default Home;