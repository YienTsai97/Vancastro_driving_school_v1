import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { getUserByClerkId } from "@/utils/userFetch";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Vancastro Driving School",
  description: "Vancastro Driving School Homepage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const dashboardUser = user && await getUserByClerkId(user.id);

  return (
    <ClerkProvider>
      <Header userRole={dashboardUser ? dashboardUser.role : "not found"} />
      {children}
      <Footer />
    </ClerkProvider>
  );
}
