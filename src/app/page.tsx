"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const session = useSession();


  return (
    <div>
      Hello User :
      {!session.data ?
        <button onClick={() => signIn()} className="p-4 bg-black text-white">
          Sign In
        </button> : <button onClick={() => signOut()} className="p-4 bg-black text-white">
          Sign Out
        </button>}

    </div>
  );
}
