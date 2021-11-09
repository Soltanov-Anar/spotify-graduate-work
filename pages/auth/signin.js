import { getProviders, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Signin = ({ providers }) => {
  const { data: session, status } = useSession();
  console.log("session", session, status);
  console.log("providers", providers);

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <section className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Spotify - Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="">
          <button
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wide hover:scale-105 hover:bg-[#0db146]"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </section>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
