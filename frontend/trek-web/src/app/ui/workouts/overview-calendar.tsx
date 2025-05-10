'use client'

import clsx from 'clsx';
import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, format, isSameMonth, isSameDay } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Dumbbell, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../buttons/button';
import axios from 'axios';
import Link from 'next/link';

interface WorkoutRow {
    id: string,
    title: string,
    description: string,
    workout: string,
    length: number,
    unit: string,
    date: string
}

export default function WorkoutCalendar({ currentDate = new Date() }) {
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [workouts, setWorkouts] = useState<WorkoutRow[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/workouts", {
                withCredentials: true,
            });
            setWorkouts(response.data);
            console.log(response.data)
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
    }, []);

    //weekStartsOn: 1 -> Week starts on monday
    const generateCalendarMonthDays = (date: Date) => {
        const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }

    // const generateCalendarWeekDays = (date: Date) => {
    //     const start = startOfWeek(date, { weekStartsOn: 1 });
    //     const end = endOfWeek(date, { weekStartsOn: 1 });
    //     return eachDayOfInterval({ start, end });
    // }

    const monthDays = generateCalendarMonthDays(currentDate);

    return(
        <div className='relative mt-5 flex flex-row gap-4'>
            <div className="w-full grid grid-cols-7 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                {week.map((day) => (
                    <div key={day} className="text-center px-4 py-3">
                        {day}
                    </div>
                ))}

                {/* Days of the month */}
                {monthDays.map((day, idx) => (
                    <div
                        key={idx}
                        className={clsx('m-1 h-28 p-2 text-sm transition-all rounded-xl hover:cursor-pointer dark:text-white overflow-scroll', 
                            (isSameMonth(day, currentDate) ? 
                                (isSameDay(day, currentDate) ? 
                                    'bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-700 hover:bg-blue-300'
                                    : 
                                    'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700')
                                : 
                                'text-neutral-500 hover:outline outline-neutral-300 dark:outline-neutral-700'
                            ),
                            (isSameDay(day, selectedDate ?? '') && 'outline outline-blue-500')
                            
                        )}
                        onClick={() => setSelectedDate(day)}
                    >
                        <div className='flex flex-row justify-between'>
                            <p>{format(day, 'd')}</p>
                        </div>
                        
                        {workouts
                            .filter((workout => isSameDay(new Date(workout.date), day)))
                            .map(filteredWorkout => 
                                <div key={filteredWorkout.id} 
                                    className='max-w-[130px] border-l-2 border-blue-500 my-1 pl-2'
                                >
                                    <p className='truncate'>{filteredWorkout.title}</p>
                                </div>
                        )}
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        className="backdrop-blur-md bg-neutral-100 dark:bg-neutral-900/60 w-[40%] rounded-2xl py-3 px-3"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className='flex flex-row justify-between items-center mb-3'>
                            <h1 className='font-bold text-2xl'>{format(selectedDate, 'PPP')}</h1>
                            <Button 
                                isDanger={true} isFilled={true}
                                onClick={() => setSelectedDate(null)}
                            >
                                Close <X size={22} />
                            </Button>
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <Button isPrimary={true} isFilled={true}>
                                <Dumbbell size={16} />
                                Add Workout
                            </Button>
                        </div>
                        <div className='flex flex-col gap-2 mt-4 overflow-scroll h-[510px] rounded-md'>
                            {workouts
                            .filter((workout => isSameDay(new Date(workout.date), selectedDate)))
                            .map(filteredWorkout => 
                                <motion.div key={filteredWorkout.id}
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1}}
                                    transition={{ duration: 0.2 }}
                                    className='bg-white hover:bg-blue-300 dark:bg-black hover:dark:bg-blue-700 p-2 rounded-lg transition-all'
                                >
                                    <Link href={`/dashboard/workouts/${filteredWorkout.id}`}>
                                        <p className='font-semibold'>{filteredWorkout.title}</p>
                                        <p className='text-sm text-neutral-500'>{filteredWorkout.description}</p>
                                        <p className='text-sm text-neutral-500'>{filteredWorkout.length} {filteredWorkout.unit}</p>
                                    </Link>
                                </motion.div>
                        )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
    )
}