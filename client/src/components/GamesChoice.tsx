import Slider from '@mui/material/Slider';
import { observer } from 'mobx-react-lite';
import { MainViewChildProps } from '../utils/types';

const GamesChoice: React.FC<MainViewChildProps> = observer(({ vm }) => {
    return (
        <ul className='w-full flex list-none justify-around flex-wrap gap-5'>
            <li>
                <form
                    className='bg-white rounded flex flex-col gap-2 justify-center w-60 text-black p-5'
                    onSubmit={(e) => {
                        e.preventDefault();
                        vm.handleGameChoice('Tic-Tac-Toe', {
                            gridSize: vm.session.config.gridSize,
                        });
                    }}
                >
                    <h2 className='text-center font-bold mb-4'>Tic-Tac-Toe</h2>
                    <label htmlFor='gridSize' className='text-center'>
                        Grid size
                    </label>
                    <Slider
                        id='gridSize'
                        aria-label='Grid size'
                        defaultValue={3}
                        onChange={(e, newValue) => {
                            vm.session.config.gridSize = newValue as number;
                            console.log(vm.session.config.gridSize);
                        }}
                        valueLabelDisplay='auto'
                        step={1}
                        marks
                        min={3}
                        max={5}
                    />
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
