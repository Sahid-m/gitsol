import React from "react";
import { Metadata } from "next";
import { UserAuthForm } from "@/components/UserAuthForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account to access your dashboard",
};

export default async function AuthenticationPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return (
    <>
      <div className="container relative flex h-[91vh] flex-col items-center justify-center font-display">
        <div className="flex flex-col items-center justify-center lg:p-8">
          <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
          </div>
          <p className="py-3 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </>
  );
}
