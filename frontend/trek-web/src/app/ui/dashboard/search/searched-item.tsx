import Link from "next/link"
import { SearchedAthlete, SearchedCompetition, SearchedWorkout } from "./types"
import { Dumbbell, Medal, Users } from "lucide-react";


interface SearchedItemProp {
    item: SearchedAthlete | SearchedCompetition | SearchedWorkout;
    onClick?: () => void;
}

export default function SearchedItem({ item, onClick } : SearchedItemProp) {
    const handleClick = () => {
        if (onClick) onClick();
    };

    const styles = "hover:bg-blue-200 hover:dark:bg-blue-800 transition-all p-2 rounded-md flex flex-row gap-2 items-center justify-between"

    if (item.type === "workout") return (
        <Link href={`/dashboard/workouts/${item.id}`} onClick={handleClick}>
            <div className={styles}>
                <div className="flex flex-row gap-2 items-center">
                    <Dumbbell size={16}/> 
                    <p className="w-[100px] truncate">{item.title}</p>
                    <p className="mx-2 w-[150px] truncate text-neutral-500 text-sm">{item.description}</p>
                    <p className="text-neutral-500 text-sm">{item.length} {item.unit}</p>
                </div>
                
                <p className="text-neutral-500 text-sm">{item.date}</p>
            </div>
        </Link>
    )
    else if (item.type === "competition") return (
        <Link href={`/dashboard/competitions/${item.id}`} onClick={handleClick}>
            <div className={styles}>
                <div className="flex flex-row gap-2 items-center">
                    <Medal size={16}/>
                    <p className="w-[100px] truncate">{item.title}</p>
                    <p className="mx-2 w-[150px] truncate text-neutral-500 text-sm">{item.description}</p>
                    <p className="text-neutral-500 text-sm">{item.location}</p>
                </div>
                <p className="text-neutral-500 text-sm">{item.startDate} - {item.endDate} </p>
            </div>
        </Link>
    )
    return(
        <Link href={`/dashboard/athletes/${item.id}`} onClick={handleClick}>
            <div className={styles}>
                <div className="flex flex-row gap-2 items-center">
                    <Users size={16}/>
                    <p className="w-[150px] truncate">{item.first_name} {item.last_name}</p>
                    <p className="w-[100px] truncate text-neutral-500 text-sm">{item.username}</p>
                    <p className="text-neutral-500 text-sm">{item.phone}</p>
                </div>
                <p className="text-neutral-500 text-sm">{item.email}</p>
            </div>
        </Link>
    )
}