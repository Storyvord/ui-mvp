import Image from "next/image"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between relative bg-[#04052e] p-4">
            <div className="flex items-center">
                <Image
                    width={149}
                    height={48}
                    src="https://storyvord.com/img/logo.svg"
                    alt="Logo"
                    className="h-12 mr-4 lg:ml-24"
                />
            </div>
            <div className="text-white text-md font-josefin font-[15px]">Portfolio</div>
            <div>
                <button className="bg-gradient-to-r from-[#03256c] to-green-500 text-white font-josefin font-[15px] py-1.5 px-10 ml-6 lg:mr-24">
                    Login
                </button>
            </div>
        </nav>
    )
}

export default Navbar