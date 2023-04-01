import Slider from '@mui/material/Slider';
import { observer } from 'mobx-react-lite';
import { TicTacToeData, ViewChildProps } from '../utils/types';
import { MainVM } from '../viewModels/Main.VM';

const GamesChoice: React.FC<ViewChildProps<MainVM>> = observer(({ vm }) => {
    return (
        <ul className='w-full flex list-none justify-around flex-wrap gap-5'>
            <li className='w-80 h-[400px]'>
                <form
                    className='bg-white rounded flex flex-col gap-2 justify-between text-black p-5 h-full'
                    onSubmit={(e) => {
                        e.preventDefault();
                        const TicTacToeConfig = vm.session
                            .config as TicTacToeData;
                        vm.handleGameChoice('Tic-Tac-Toe', {
                            gridSize: TicTacToeConfig.gridSize || 3,
                        });
                    }}
                >
                    <h2 className='text-center font-bold mb-4'>Tic-Tac-Toe</h2>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor='gridSize' className='text-center'>
                            Grid size
                        </label>
                        <Slider
                            id='gridSize'
                            aria-label='Grid size'
                            defaultValue={3}
                            onChange={(e, newValue) => {
                                vm.setConfig('Tic-Tac-Toe', {
                                    gridSize: newValue as number,
                                });
                            }}
                            valueLabelDisplay='auto'
                            step={2}
                            marks
                            min={3}
                            max={7}
                        />
                    </div>
                    <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 shrink-0 self-center '>
                        <button
                            type='submit'
                            aria-label='choose game'
                            className=' box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 uppercase'
                        >
                            Start
                        </button>
                    </div>
                </form>
            </li>
            <li className='w-80 h-[400px]'>
                <form
                    className='bg-white rounded flex flex-col gap-2 justify-between h-full text-black p-5'
                    onSubmit={(e) => {
                        e.preventDefault();
                        vm.handleGameChoice('Tsoro Yematatu', {});
                    }}
                >
                    <h2 className='text-center font-bold mb-4'>
                        Tsoro Yematatu
                    </h2>
                    <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 shrink-0 self-center '>
                        <button
                            type='submit'
                            aria-label='choose game'
                            className=' box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 uppercase'
                        >
                            Start
                        </button>
                    </div>
                </form>
            </li>
        </ul>
    );
});

export default GamesChoice;
