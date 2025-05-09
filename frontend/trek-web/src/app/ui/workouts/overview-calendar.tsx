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
        <div className='relative mt-5'>
            <div className="grid grid-cols-7 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                {week.map((day) => (
                    <div key={day} className="text-center px-4 py-3">
                        {day}
                    </div>
                ))}

                {/* Days of the month */}
                {monthDays.map((day, idx) => (
                    <div
                        key={idx}
                        className={clsx('m-1 h-28 p-2 text-sm transition-all rounded-xl hover:cursor-pointer', 
                            (isSameMonth(day, currentDate) ? 'text-white bg-neutral-800 hover:dark:bg-neutral-700' : 'text-neutral-500 hover:outline outline-neutral-300 dark:outline-neutral-700'),
                            (isSameDay(day, currentDate) && 'dark:bg-blue-800 bg-blue-200 hover:dark:dark:bg-blue-700 hover:bg-blue-300')
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
                                    className='max-w-[130px] border-l-2 my-1 pl-2'
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
                        className="backdrop-blur-md bg-neutral-100/60 dark:bg-neutral-900/60 w-[40%] absolute z-10 right-0 top-1 h-fit border border-neutral-200 dark:border-neutral-800 rounded-2xl mx-2 py-3 px-3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className='flex flex-row justify-between items-center mb-3'>
                            <h1 className='font-bold text-2xl'>{format(selectedDate, 'PPP')}</h1>
                            <Button 
                                isSecondary={true}
                                onClick={() => setSelectedDate(null)}
                            >
                                Close <X size={22} />
                            </Button>
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <Button isPrimary={true}>
                                <Dumbbell size={16} />
                                Add Workout
                            </Button>
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            {workouts
                            .filter((workout => isSameDay(new Date(workout.date), selectedDate)))
                            .map(filteredWorkout => 
                                <Link key={filteredWorkout.id} href={`/dashboard/workouts/${filteredWorkout.id}`} 
                                    className='bg-neutral-800 hover:bg-blue-700 p-2 rounded-lg transition-all'
                                >
                                    <p>{filteredWorkout.title}</p>
                                    <p className='text-sm text-neutral-500'>{filteredWorkout.description}</p>
                                    <p className='text-sm text-neutral-500'>{filteredWorkout.length} {filteredWorkout.unit}</p>
                                </Link>
                        )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
    )
}