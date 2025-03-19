interface TrekLogoProps {
    size: number,
    color: string
}

export default function TrekLogo({size, color}: TrekLogoProps) {
    return(
        <div className="flex">
            <svg 
                width={size}
                height={size}
                viewBox="0 0 207 143" //used for scaling, aspect ratio
                className={`w-full h-auto ${color}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 33.3C0 14.9089 14.9089 0 33.3 0H133C138.523 0 143 4.47715 143 10V37H3.69999C1.65654 37 0 35.3435 0 33.3Z" />
                <path d="M105 10C105 4.47715 109.477 0 115 0H133C138.523 0 143 4.47715 143 10V133C143 138.523 138.523 143 133 143H115C109.477 143 105 138.523 105 133V10Z" />
                <path d="M40.289 128.61C32.869 136.03 20.8389 136.03 13.4189 128.61C5.99895 121.19 5.99895 109.16 13.4189 101.74L103.929 11.2302L130.799 38.1002L40.289 128.61Z" />
                <path d="M151 10C151 4.47715 155.477 0 161 0H203.3C205.343 0 207 1.65655 207 3.7C207 22.0911 192.091 37 173.7 37H161C155.477 37 151 32.5228 151 27V10Z" />
            </svg>
        </div>
        
        
    )
}