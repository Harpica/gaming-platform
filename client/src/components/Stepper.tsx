import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import MobileStepper from '@mui/material/MobileStepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import AuthForm from './Auth';
import SessionOptions from './SessionOptions';
import GamesChoice from './GamesChoice';
import { observer } from 'mobx-react-lite';
import { ViewChildProps } from '../utils/types';
import Sessions from './Sessions';
import { MainVM } from '../viewModels/Main.VM';

const LoginStepper: React.FC<ViewChildProps<MainVM>> = observer(({ vm }) => {
    console.log(vm.session.isHost);
    return (
        <>
            <Box className='w-full h-full  grid grid-rows-[minmax(50px,max-content)_1fr]'>
                <Stepper
                    activeStep={vm.activeStep}
                    className='text-xs  h-fit min-h-[50px] bg-white mr-[-50vw] pr-[50vw] ml-[-50vw] pl-[50vw] '
                >
                    {vm.steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { className: string } = {
                            className: 'text-xs',
                        };

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className=' p-3 flex flex-col justify-start h-full overflow-auto'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                            pb: 2,
                        }}
                    >
                        <button
                            type='button'
                            disabled={vm.activeStep === 0}
                            onClick={() => vm.handleBack()}
                            className='w-8 h-8 cursor-pointer disabled:opacity-60 disabled:cursor-default hover:opacity-60 transition-all'
                        >
                            <svg
                                viewBox='0 0 28 28'
                                fill='none'
                                className='stroke-white'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002'
                                    strokeWidth='1.5'
                                    strokeMiterlimit='10'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M8.57 10.7701L7 9.19012L8.57 7.62012'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                    {vm.activeStep === 0 && <AuthForm vm={vm} />}
                    {vm.activeStep === 1 && <SessionOptions vm={vm} />}
                    {vm.activeStep === 2 && !vm.session.isHost && (
                        <Sessions vm={vm} />
                    )}
                    {vm.activeStep === 2 && vm.session.isHost && (
                        <GamesChoice vm={vm} />
                    )}
                </div>
            </Box>
        </>
    );
});

export default LoginStepper;
