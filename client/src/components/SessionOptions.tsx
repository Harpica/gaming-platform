import { ViewChildProps } from '../utils/types';
import { MainVM } from '../viewModels/Main.VM';

const SessionOptions: React.FC<ViewChildProps<MainVM>> = ({ vm }) => {
    return (
        <ul className='w-full flex list-none justify-around flex-wrap gap-5'>
            <li
                className='cursor-pointer bg-white text-black font-bold shadow-md rounded px-8 py-8 pt-8 flex flex-col gap-4 self-center min-w-[320px] hover:scale-105 hover:text-indigo-600  hover:stroke-indigo-600 hover:fill-indigo-600 transition-all svg-container'
                onClick={() => {
                    vm.handleCreateOrJoinChoice(true);
                }}
            >
                <div className=' flex justify-center'>
                    <svg
                        className='w-32 h-32 '
                        viewBox='0 0 512 512'
                        version='1.1'
                    >
                        <g
                            id='Page-1'
                            stroke='none'
                            strokeWidth='1'
                            fill='none'
                            fillRule='evenodd'
                            transform='matrix(1.5,0,0,1.5,-128,-128)'
                        >
                            <g
                                id='scheduler'
                                fill='#000000'
                                transform='translate(85.333333,85.333333)'
                            >
                                <path
                                    d='m 170.66667,0 c 94.25659,0 170.66666,76.410069 170.66666,170.66667 0,94.25659 -76.41007,170.66666 -170.66666,170.66666 C 76.410069,341.33333 0,264.92326 0,170.66667 0,76.410069 76.410069,0 170.66667,0 Z m 0,42.666667 c -70.692451,0 -128.000003,57.307552 -128.000003,128.000003 0,70.69244 57.307552,128 128.000003,128 70.69244,0 128,-57.30756 128,-128 0,-70.692451 -57.30756,-128.000003 -128,-128.000003 z M 192,85.333333 191.99933,149.33333 H 256 V 192 L 191.99933,191.99933 192,256 H 149.33333 V 191.99933 L 85.333333,192 V 149.33333 H 149.33333 V 85.333333 Z'
                                    id='Combined-Shape'
                                />
                            </g>
                        </g>
                    </svg>
                </div>
                <p className='pt-7 text-inherit text-center'>
                    Create new gaming session
                </p>
            </li>
            <li
                className='cursor-pointer bg-white text-black font-bold shadow-md rounded px-8 py-8 pt-8 flex flex-col gap-4 self-center min-w-[320px] hover:scale-105 hover:text-indigo-600 transition-all svg-container'
                onClick={() => {
                    vm.handleCreateOrJoinChoice(false);
                }}
            >
                <div className=' flex justify-center'>
                    <svg
                        className='w-32 h-32 '
                        viewBox='0 0 24 24'
                        fill='none'
                        version='1.1'
                    >
                        <path
                            d='m 22.8,11.999999 c 0,5.964719 -4.83528,10.799999 -10.8,10.799999 -5.964672,0 -10.8,-4.83528 -10.8,-10.799999 C 1.2,6.0353276 6.035328,1.2 12,1.2 c 5.96472,0 10.8,4.8353276 10.8,10.799999 z'
                            stroke='#323232'
                            strokeWidth='2.4'
                            id='path449'
                        />
                        <path
                            d='m 14.4,14.399998 2.4,2.400001'
                            stroke='#323232'
                            strokeWidth='2.4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            id='path451'
                        />
                        <path
                            d='m 15.6,11.399999 c 0,2.3196 -1.8804,4.2 -4.2,4.2 -2.3196,0 -4.2,-1.8804 -4.2,-4.2 0,-2.3195997 1.8804,-4.1999995 4.2,-4.1999995 2.3196,0 4.2,1.8803998 4.2,4.1999995 z'
                            stroke='#323232'
                            strokeWidth='2.4'
                            id='path453'
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
