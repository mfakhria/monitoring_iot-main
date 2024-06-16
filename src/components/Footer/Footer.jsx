"use client"

import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return(
        <>

        {/* Footer */}
        <div className="bg-cyan-900 w-full md:mt-8 md:p-14 p-5 flex flex-col items-center">
            <Image 
            className="bg-white rounded-xl items-center justify-center w-16 h-16"
            src={"/logo.png"} 
            width="0"
            height="0"
            sizes="100vw"
            priority alt="Logo" />
            <h1 className="text-light text-center text-white md:text-base mt-3 md:mt-2 text-sm">Jl. Bojong Sari Rt.04/Rw.10, Ciherang, Kec.Ciomas, Kabupaten Bogor.</h1>
        <div className="flex mt-3 md:mt-4">
            <Link href="https://www.instagram.com/kebun_wangi/" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                <Image className="hover:scale-105" src={"/ig.svg"} width={40} height={40} alt="logo instagram"/>
                </a>
            </Link>
            <Link href="https://www.google.com/maps/place/Joglo+Kebun+Wangi/@-6.5924565,106.7464402,16z/data=!4m6!3m5!1s0x2e69c51ca7e13939:0x61b2bb1045b7ac39!8m2!3d-6.5920058!4d106.746763!16s%2Fg%2F11qh56nqx_?entry=ttu" legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                <Image className="hover:scale-105" src={"/maps.svg"} width={40} height={40} alt="logo instagram"/>
                </a>
            </Link>    
            
        </div>
        </div>

        {/* Copyright */}
        <div className="bg-cyan-950 md:p-5 p-2 w-full">
            <h1 className="text-white text-center text-xs md:text-sm">© ConnectiveMinds Team 2024. Hak Cipta Dilindungi</h1>
        </div>
        </>
    )
}
export default Footer