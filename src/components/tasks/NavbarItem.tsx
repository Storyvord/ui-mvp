import { FC } from 'react'

interface NavbarItemProps {
  text:string, 
  isActive:boolean
}

const NavbarItem: FC<NavbarItemProps> = ({text, isActive}) => {
  return (
    <div className={` cursor-pointer  px-3 py-2 font-semibold rounded-sm ${
      isActive
        ? "text-white border-2 border-black bg-gray-900"
        : " text-gray-500 hover:text-gray-700 border-2 border-gray-500"
    }`}>
      <h1>{text}</h1>
    </div>
  )
}

export default NavbarItem