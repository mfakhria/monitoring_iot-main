"use client"
import { User } from "@phosphor-icons/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex md:flex-row md:max-w-6xl md:mx-auto md:justify-between flex-col items-center mt-5 md:pb-12">
            <Image 
            className="bg-white rounded-full w-16 h-16"
            src={"/logo.png"} 
            width="0"
            height="0"
            sizes="100vw" 
            priority alt="Logo"/>
                <ul className="flex flex-row gap-5 md:gap-7 justify-between p-2">
                    <li className="md:text-xl text-gray-200 hover:text-green-500 transition-all"><Link href="/">Home</Link></li>
                    <li className="md:text-xl text-gray-200 hover:text-green-500 transition-all"><Link href="/NilaiSensor">Nilai Sensor</Link></li>
                    <li className="md:text-xl text-gray-200 hover:text-green-500 transition-all"><Link href="/GrafikSensor">Grafik Sensor</Link></li>
                    <li className="md:text-xl text-gray-200 hover:text-green-500 transition-all"><Link href="/Status">Status</Link></li>
                </ul>
            <div>
                <Link href="/Login"> <button className="bg-green-500 md:px-7 md:text-xl text-sm rounded-full p-2 text-white hover:bg-green-600 hover:text-yellow-400"><User size={25}/></button></Link>
            </div>
        </nav>
    )
}

export default Navbar