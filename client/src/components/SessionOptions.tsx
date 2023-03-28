const SessionOptions = () => {
    return (
        <ul className='w-full flex list-none justify-around flex-wrap gap-5'>
            <li className='cursor-pointer bg-white text-black font-bold shadow-md rounded px-8 py-8 pt-8 flex flex-col gap-4 self-center min-w-[320px] hover:scale-105 hover:text-indigo-600  hover:stroke-indigo-600 transition-all svg-container'>
                <div className=' flex justify-center'>
                    <svg
                        className='w-32 h-32 '
                        viewBox='0 0 512 512'
                        version='1.1'
                    >
                        <g
                            id='Page-1'
                            stroke='none'
                            stroke-width='1'
                            fill='none'
                            fill-rule='evenodd'
                        >
                            <g
                                id='scheduler'
                                className='svg-fill'
                                transform='translate(85.333333, 85.333333)'
                            >
                                <path
                                    d='M170.666667,1.42108547e-14 C264.923264,-3.10380131e-15 341.333333,76.4100694 341.333333,170.666667 C341.333333,264.923264 264.923264,341.333333 170.666667,341.333333 C76.4100694,341.333333 2.57539587e-14,264.923264 1.42108547e-14,170.666667 C2.6677507e-15,76.4100694 76.4100694,3.15255107e-14 170.666667,1.42108547e-14 Z M170.666667,42.6666667 C99.9742187,42.6666667 42.6666667,99.9742187 42.6666667,170.666667 C42.6666667,241.359115 99.9742187,298.666667 170.666667,298.666667 C241.359115,298.666667 298.666667,241.359115 298.666667,170.666667 C298.666667,99.9742187 241.359115,42.6666667 170.666667,42.6666667 Z M192,85.3333333 L191.999333,149.333333 L256,149.333333 L256,192 L191.999333,191.999333 L192,256 L149.333333,256 L149.333333,191.999333 L85.3333333,192 L85.3333333,149.333333 L149.333333,149.333333 L149.333333,85.3333333 L192,85.3333333 Z'
                                    id='Combined-Shape'
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                <p className='pt-7 text-inherit text-center'>
                    Create new gaming session
                </p>
            </li>
            <li className='cursor-pointer bg-white text-black font-bold shadow-md rounded px-8 py-8 pt-8 flex flex-col gap-4 self-center min-w-[320px] hover:scale-105 hover:text-indigo-600 transition-all svg-container'>
                <div className=' flex justify-center'>
                    <svg
                        className='w-32 h-32 svg-stroke'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
                            stroke-width='2'
                        />
                        <path
                            d='M14 14L16 16'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                        <path
                            d='M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z'
                            stroke-width='2'
                        />
                    </svg>
                </div>
                <p className='pt-7 text-inherit text-center'>
                    Find and join session
                </p>
            </li>
        </ul>
    );
};

export default SessionOptions;
