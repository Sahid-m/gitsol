import { getServerSession } from "next-auth/next";

import { authConfig } from "./authconfig";

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  return session?.user;
}
