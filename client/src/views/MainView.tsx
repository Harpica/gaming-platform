import LoginStepper from '../components/Stepper';

const MainView = () => {
    return (
        <div className='grid justify-center grid-rows-[150px_1fr] grid-cols-[minmax(230px,_1280px)] w-full  h-screen text-white bg-gradient-to-r from-sky-500 to-indigo-500 overflow-hidden'>
            <h1 className='text-5xl p-4 uppercase self-center'>
                Gaming platform
            </h1>
            <LoginStepper />
        </div>
    );
};

export default MainView;
