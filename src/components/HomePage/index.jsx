import Image from "next/image";
import Link from "next/link";
import About from "../About/About";

const HomePage = () => {
return (
    <>
    <div className="hero max-w-6xl mx-auto md:py-10 mt-8 md:mb-16 mb-0">
        <div className="flex md:flex-row flex-col">
        <div className="flex flex-col gap-3 y-10 items-center justify-center w-full md:w-auto md:mb-0 mb-4">
            <h1 className="text-white leading-none md:text-8xl text-6xl">
            Monitoring <br /> Hidroponik
            </h1>
            <p className="text-white">
            Website ini dapat memudahkan pengguna untuk <br /> melihat kondisi
            seputar data tanaman hidroponik.
            </p>
            <Link
            href="/NilaiSensor"
            className="bg-green-500 md:px-7 md:text-xl text-sm rounded-full p-4 text-white hover:bg-green-600 hover:scale-105"
            >
            Cek Sekarang !
            </Link>
        </div>
        <div className="flex md:flex-row md:w-full md:px-11 flex-col items-center justify-between p-6 -mt-5 md:mt-4">
            <Image
            src={"/kale.jpg"}
            width="0"
            height="0"
            sizes="100vw"
            className="rounded-full w-full h-auto hover:scale-105"
            alt="Hidroponik"
            priority="high"
            />
        </div>
        </div>
    </div>
    <About/>
    </>
  );
};

export default HomePage;
