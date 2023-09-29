import { getServerSession } from "next-auth";

export default async function Blog() {
  const session = await getServerSession()

  return (
    <div className="mt-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Latest articles
      </h1>
      getServerSession Result
      {session?.user?.name ? (
        <div>{session?.user?.name}</div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
}
