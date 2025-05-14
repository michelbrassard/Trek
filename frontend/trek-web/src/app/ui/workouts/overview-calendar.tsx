'use client'

import clsx from 'clsx';
import { startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, format, isSameMonth, isSameDay } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Dumbbell, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import VariableButton from '../buttons/variable-button';
import axios from 'axios';
import Link from 'next/link';
import TonalButton from '../buttons/tonal-button';
import FilledButton from '../buttons/filled-button';

interface WorkoutRow {
    id: string,
    title: string,
    description: string,
    workout: string,
    length: number,
    unit: string,
    date: string
}

export default function WorkoutCalendar() {
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [workouts, setWorkouts] = useState<WorkoutRow[]>([])
    const [view, setView] = useState('month');
    const [calendarDays, setCalendarDays] = useState<Date[]>([])
    const [currentDate, setCurrentDate] = useState<Date>(new Date())

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/api/proxy/workouts", {
                withCredentials: true,
            });
            setWorkouts(response.data);
            const todaysDate = new Date()
            setCurrentDate(todaysDate)
            generateCalendarMonthDays(todaysDate)

          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        };
    
        fetchData();
    }, []);

    const handleViewChange = (type: string) => {
        setView(type)
        if(type === 'month') {
            generateCalendarMonthDays(currentDate)
        }
        else {
            generateCalendarWeekDays(currentDate)
        }
    }

    //weekStartsOn: 1 -> Week starts on monday
    const generateCalendarMonthDays = (date: Date) => {
        const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
        setCalendarDays(eachDayOfInterval({ start, end }))
    }

    const generateCalendarWeekDays = (date: Date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        const end = endOfWeek(date, { weekStartsOn: 1 });
        setCalendarDays(eachDayOfInterval({ start, end }))
    }

    const monthMap: { [key: number]: string } = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    return(
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-1'
        >
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-1'>
                    <TonalButton 
                        isSecondary={true} 
                        onClick={() => {}}
                    >
                        <ChevronLeft size={16} />
                    </TonalButton>
                    <TonalButton 
                        isSecondary={true} 
                        onClick={() => {}}
                    >
                        <ChevronRight size={16} className="my-1"/>
                    </TonalButton>
                </div>
                <div className='flex items-center'>
                    <h2 className='text-lg'>
                        {monthMap[currentDate.getMonth()]}
                    </h2>
                </div>
                <div className='flex flex-row gap-1'>
                    <VariableButton 
                        isSecondary={view !== 'year'} 
                        isFilled={view === 'year'}
                        isPrimary={view === 'year'}
                        onClick={() => handleViewChange('year')}
                    >
                        <p className='text-sm'>Year</p>
                    </VariableButton>
                    <VariableButton 
                        isSecondary={view !== 'month'} 
                        isFilled={view === 'month'}
                        isPrimary={view === 'month'}
                        onClick={() => handleViewChange('month')}
                    >
                        <p className='text-sm'>Month</p>
                    </VariableButton>
                    <VariableButton 
                        isSecondary={view !== 'week'} 
                        isFilled={view === 'week'}
                        isPrimary={view === 'week'}
                        onClick={() => handleViewChange('week')}
                    >
                        <p className='text-sm'>Week</p>
                    </VariableButton>
                </div>
            </div>
            <div className='relative flex flex-row gap-4'>
                <div className="w-full grid grid-cols-7 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                    {week.map((day) => (
                        <div key={day} className="text-center px-4 py-3 text-sm truncate">
                            {day}
                        </div>
                    ))}

                    {/* Days of the month */}
                    {calendarDays.map((day, idx) => (
                        <div
                            key={idx}
                            className={clsx('m-1 p-2 text-sm transition-all rounded-xl hover:cursor-pointer dark:text-white overflow-scroll', 
                                (isSameMonth(day, currentDate) ? 
                                    (isSameDay(day, currentDate) ? 
                                        'bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-700 hover:bg-blue-300'
                                        : 
                                        'bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 hover:dark:bg-neutral-700')
                                    : 
                                    'text-neutral-500 hover:outline outline-neutral-300 dark:outline-neutral-700'
                                ),
                                (isSameDay(day, selectedDate ?? '') && 'outline outline-blue-500'),
                                (view === 'week' ? 'min-h-[500px]' : 'h-28')
                                
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
                                <h1 className='font-bold text-xl'>{format(selectedDate, 'PPP')}</h1>
                                <FilledButton 
                                    isDanger={true}
                                    onClick={() => setSelectedDate(null)}
                                >
                                    <X size={16} />
                                </FilledButton>
                            </div>
                            <div className='flex flex-col gap-2 mt-2'>
                                <FilledButton isPrimary={true}>
                                    <Dumbbell size={16} />
                                    Add Workout
                                </FilledButton>
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
        </motion.div>
    )
}