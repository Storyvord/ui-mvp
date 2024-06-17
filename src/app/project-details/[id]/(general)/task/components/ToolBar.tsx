import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { ArrowDownAZIcon, SearchIcon} from 'lucide-react'
import { FC, useState} from 'react'

interface ToolBarProps {
  sortBy: "deadline" | "title" | "status",
  handleSort: (property:"deadline" | "title" | "status") => void,
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
    <div className='flex w-full justify-between mt-4'>
        <div>
            <Button variant="outline" className='flex flex-row' onClick={()=>setFormOpen(!formOpen)}>
                <PlusIcon />
                <span className='font-semibold ml-2'>Create Task</span>
            </Button>
        </div>
        <div className='flex gap-2'>
            <div className='flex'>
                {isSearchVisible && (
                    <Input autoFocus type="text" className='w-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 '  value={searchFilter} onChange={(e)=>setSearchFilter(e.target.value)}/>
                )}
                <Button variant="outline" size="icon" className='focus-visible:ring-0' onClick={handleSearchClick}>
                    <SearchIcon className='w-5 h-5'/>
                </Button>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                        <ArrowDownAZIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-30">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={(value)=>(handleSort(value as "deadline" | "title" | "status"))}>
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