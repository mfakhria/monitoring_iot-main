"use client";

import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div className="p-20">
        <div className="text-center md:mb-16 mb-5">
          <p className="mt-4 text-sm leading-7 text-white font-regular">
            KELOMPOK 2
          </p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-white">
            Meet Our<span className="text-sky-500">Team</span>
          </h3>
        </div>
        <div className="sm:grid grid-cols-2 md:grid-cols-4 col-gap-10 mx-auto">
          <div className="text-center mt-7 md:mt-0">
            <Link href="https://www.instagram.com/ardadwiyana/">
              <Image
                src={"/arda.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                priority="high"
                alt="Arda"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
                Arda Dwiyana
              </p>
              <p className="text-white uppercase text-sm">J0304211190</p>
              <p className="text-white text-base font-extralight">Hardware Engineer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-0">
            <Link href="https://www.instagram.com/aqim.t/">
              <Image
                src={"/aqim.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                priority="high"
                alt="aqim"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
                Aqim Try Kurnia
              </p>
              <p className="text-white uppercase text-sm">J0304211020</p>
              <p className="text-white text-base font-extralight">Hardware Engineer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-0">
            <Link href="https://www.instagram.com/darynrazz/">
              <Image
                src={"/darin.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                priority="high"
                alt="darin"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Daryn Ramadhani Az Zahra
              </p>
              <p className="text-white uppercase text-sm">J0304201117</p>
              <p className="text-white text-base font-extralight">Journal Maker</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-0">
            <Link href="https://www.instagram.com/zahransyf/">
              <Image
                src={"/zahran.jpg"}
                width="0"
                height="0"
                alt="zahran"
                priority="high"
                sizes="100vw"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Khairunnissa Zahran Ansyafa
              </p>
              <p className="text-white uppercase text-sm">J0304211021</p>
              <p className="text-white text-base font-extralight ">Journal Maker</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-7">
            <Link href="https://www.instagram.com/mahatmadi_/">
              <Image
                src={"/ariq.jpg"}
                width="0"
                height="0"
                alt="ariq"
                priority="high"
                sizes="100vw"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Mahatmadi Ariq Mayangkara
              </p>
              <p className="text-white uppercase text-sm">J0304211143</p>
              <p className="text-white text-base font-extralight">Software Engineer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-7">
            <Link href="https://www.instagram.com/mfkh.ri/">
              <Image
                src={"/fakhri.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                alt="fakhri"
                priority="high"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
                Muhammad Fakhri Alauddin
              </p>
              <p className="text-white uppercase text-sm">J0304211121</p>
              <p className="text-white text-base font-extralight">Software Engineer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-7">
            <Link href="https://www.instagram.com/mlhbsyyz._/">
              <Image
                src={"/habsy.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                alt="habsy"
                priority="high"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Muhamad Al Habsy
              </p>
              <p className="text-white uppercase text-sm">J0304211081</p>
              <p className="text-white text-base font-extralight">Designer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-7">
            <Link href="https://www.instagram.com/yana.nrrhman/">
              <Image
                src={"/yana.jpg"}
                width="0"
                height="0"
                alt="yana"
                sizes="100vw"
                priority="high"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Yana Nurrohman
              </p>
              <p className="text-white uppercase text-sm">J0304211075</p>
              <p className="text-white text-base font-extralight">Hardware Engineer</p>
            </Link>
          </div>
          <div className="text-center mt-7 md:mt-7">
            <Link href="#">
              <Image
                src={"/agi.jpg"}
                width="0"
                height="0"
                sizes="100vw"
                alt="agi"
                priority="high"
                className="mb-3 rounded-xl mx-auto h-32 w-32"
              />
              <p className="hover:text-sky-500 text-white font-semibold">
              Hafiz Agi Alfasih
              </p>
              <p className="text-white uppercase text-sm">J0304211144</p>
              <p className="text-white text-base font-extralight">Software Engineer</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
