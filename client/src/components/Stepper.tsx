import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthForm from './Auth';
import SessionOptions from './SessionOptions';

const steps = [
    'Enter your name for the game',
    'Choose either to create new game session or join one',
    'Choose game',
];

export default function LoginStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box className='w-full h-full grid grid-rows-[50px_1fr]'>
            <Stepper
                className='bg-white mr-[-50vw] pr-[50vw] ml-[-50vw] pl-[50vw] '
                activeStep={activeStep}
            >
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {} = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                <div className=' p-3 flex flex-col justify-start'>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                        }}
                    >
                        <button
                            type='button'
                            disabled={activeStep === 0}
                            onClick={handleBack}
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
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002'
                                    stroke-width='1.5'
                                    stroke-miterlimit='10'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M8.57 10.7701L7 9.19012L8.57 7.62012'
                                    stroke-width='1.5'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1
                                ? 'Finish'
                                : 'Next'}
                        </Button>
                    </Box>
                    {activeStep === 0 && <AuthForm vm={''} />}
                    {activeStep === 1 && <SessionOptions />}
                </div>
            </React.Fragment>
        </Box>
    );
}
