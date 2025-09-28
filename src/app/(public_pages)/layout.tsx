"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react"
import { useEffect } from "react";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.replace('/dashboard')
    }
  }, [session, router])

  return (
    <>
      {children}
    </>
  )
}