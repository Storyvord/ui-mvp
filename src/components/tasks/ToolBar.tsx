import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { ArrowDownAZIcon, SearchIcon} from 'lucide-react'
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { FC, useState} from 'react'

interface ToolBarProps {
  sortBy:  "id" | "due_date" | "title" | "completed",
  handleSort: (property: "id" | "due_date" | "title" | "completed") => void,
  setFormOpen: (value: boolean) => void,
  formOpen: boolean,
  searchFilter: string,
  setSearchFilter: (value: string) => void,
}

const ToolBar: FC<ToolBarProps> = ({sortBy, handleSort, setFormOpen, formOpen, searchFilter , setSearchFilter}) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchClick = () => {
      setIsSearchVisible(!isSearchVisible);
    };
  

  return (
    <div className='flex flex-wrap w-full justify-between mt-4'>
        <div>
            <button className='flex flex-row items-center text-white rounded-md bg-green-500  py-2 px-3 hover:bg-green-600' onClick={()=>setFormOpen(!formOpen)}>
                <PlusIcon />
                <span className=' ml-2'>Create New Task</span>
            </button> 
        </div>
        <div className='flex gap-2'>
            <div className='flex gap-0'>
                <SearchIcon className=' p-2 h-10 w-10 text-gray-500 border-2 border-r-0 border-gray-900 bg-transparent rounded-l-lg'/>
                <input autoFocus type="text" placeholder='Search' className=' focus:outline-none text-gray-800 hover:text-gray-700 bg-transparent rounded-r-lg px-3 border-2 border-l-0 border-gray-900' value={searchFilter} onChange={(e)=>setSearchFilter(e.target.value)}/>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className='focus:outline-none bg-transparent flex items-center font-semibold gap-2 py-2 px-3 w-auto rounded-md text-gray-500 hover:text-gray-700 border-2 border-gray-900'>
                        <FaSortAmountDown />
                        <span>Sort By</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={(value)=>(handleSort(value as  "due_date" | "title" | "completed"))}>
                        <DropdownMenuRadioItem value="id">date added</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="deadline">deadline</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="title">title</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="status">Project status</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            
        </div>
    </div>
  )
}

export default ToolBar