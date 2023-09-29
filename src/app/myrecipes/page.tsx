import Search from "@/components/Search";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedRoute() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="mt-8">
      <h1 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900 ">
        MY RECIPES
      </h1>
      <div className="flex gap-5">
        <Search />
        <div>
          <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold leading-none tracking-tight text-gray-900 ">All (0)</h2>
          <p className="">You don&apos;t have any saved recipes yet. Get cooking!</p>
        </div>
      </div>
    </div>
  )
}
