import Link from "next/link";

export default function Home() {
  return (
    <div>
    <h1 className="text-3xl text-center">Hello sample git page</h1>

    <Link href={"/auth/login"}>Go to login</Link>
    </div>
  );
}
