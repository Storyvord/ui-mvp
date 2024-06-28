import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between gap-2 relative bg-[#04052e] p-4">
            <div className="flex items-center">
                <Image
                    width={149}
                    height={48}
                    src="https://storyvord.com/img/logo.svg"
                    alt="Logo"
                    className="h-12 mr-4 lg:ml-24"
                />
            </div>
            <Link href="/dashboard/home" className="text-white text-md font-josefin font-[15px]">Dashboard</Link>
            <div>
                <Link href="/auth/sign-in" className="bg-gradient-to-r from-[#03256c] to-green-500 text-white font-josefin font-[15px] px-4 py-1.5 xsm:px-10 lg:mr-24">
                    Login
                </Link>
            </div>
        </nav>
    )
}

export default Navbar