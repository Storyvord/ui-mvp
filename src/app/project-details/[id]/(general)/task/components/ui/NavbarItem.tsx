import { FC } from 'react'

interface NavbarItemProps {
  text:string, 
  isActive:boolean
}

const NavbarItem: FC<NavbarItemProps> = ({text, isActive}) => {
  return (
    <div className={`px-3 pt-1 text-[14px] transition-colors duration-300 fade-in-20 rounded-t-sm text-gray-500 font-sans hover:bg-gray-200 active:bg-gray-300 ${isActive ? 'border-b-2 border-gray-500 font-bold' : ''}`}>
      <h1>{text}</h1>
    </div>
  )
}

export default NavbarItem