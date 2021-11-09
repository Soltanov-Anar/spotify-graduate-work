import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  console.group("Status & Session");
  console.log(status);
  console.log(session);
  console.groupEnd();

  if (status === "loading") return <Loader />;

  return (
    <div className="">
      <Head>
        <title>Spotify - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}
