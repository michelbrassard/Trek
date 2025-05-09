'use client'

import { useRef, useState } from "react"
import { Search, X } from "lucide-react"
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import SearchedItem from "./searched-item";
import { SearchedAthlete, SearchedCompetition, SearchedWorkout } from "./types";

export default function SearchComponent() {
    const [searchedTerm, setSearchedTerm] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchedData, setSearchedData] = useState<SearchedAthlete[] | SearchedCompetition[] | SearchedWorkout[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchedTerm(value)

        try {
            const response = await axios.get(`http://localhost:3000/api/proxy/search?q=${encodeURIComponent(value)}`, {
                withCredentials: true,
            });
            setSearchedData(response.data.results)
            setLoading(false)
        
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
        //search pages!!! workouts, athletes, competitions, notes, media, resources
    }

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    
    return(
        <div className="md:relative md:w-fit">
            <div
                onClick={handleFocus}
                className="flex flex-row gap-3 items-center m-2 py-2 pl-4 pr-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl hover:cursor-pointer"
            >
                <Search size={16} className="text-neutral-500"/>
                <input
                    ref={inputRef}
                    className={'bg-neutral-100 dark:bg-neutral-900 placeholder-neutral-500 outline-none hover:cursor-pointer'}
                    type={'text'} 
                    name={'search'} 
                    id={'search'} 
                    value={searchedTerm}
                    onChange={handleSearch}
                    placeholder="Search"
                />
                <button 
                    className={clsx("p-0 m-0 transition-all", searchedTerm ? 'opacity-100' : 'opacity-0')}
                    onClick={() => setSearchedTerm('')}
                >
                    <X size={18} className="text-neutral-500"/>
                </button>
            </div>

            <AnimatePresence>
                {searchedTerm && (
                    <motion.div
                        className="backdrop-blur-md bg-neutral-100/60 dark:bg-neutral-900/60 w-[70%] absolute z-10 right-0 md:w-[600px] h-[400px] border border-neutral-200 dark:border-neutral-800 rounded-2xl mx-2 py-3 px-3"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                    {loading ? (
                        <p className="text-center h-full flex items-center justify-center text-xl text-neutral-500">
                            Loading...
                        </p>
                        ) : searchedData.length === 0 ? (
                        <p className="text-center h-full flex items-center justify-center text-xl text-neutral-500">
                            No results found.
                        </p>
                        ) : (
                        <div className="flex flex-col gap-2">
                            {
                                searchedData.map((item) => <SearchedItem item={item} key={item.id} onClick={() => setSearchedTerm('')}/>)
                            }
                        </div>
                    )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}