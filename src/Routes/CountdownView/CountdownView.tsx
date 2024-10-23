import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
import AnalogTimer from '../../Components/AnalogTimer/AnalogTimer';
import { useEffect, useState } from 'react';
import './countdown-view.css';
import { useLocation, useNavigate } from 'react-router-dom';
import DigitalTimer from '../../Components/DigitalTimer/DigitalTimer';
import TextTimer from '../../Components/TextTimer/TextTimer';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

const CountdownView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const checkClicked = sessionStorage.getItem('clicked');
    const coverColorControls = useAnimationControls();
    const minutes = location.state.time ?? -1; 
    const intervalNumber = sessionStorage.getItem('intervalNumber');

    const [fadeOut, setFadeOut] = useState(false); 
    const [currentView, setCurrentView] = useState(location.state?.menuChoice ?? 'analog');
    const [counter, setCounter] = useState(minutes - Date.now());
    
    const animationSection = {
        
        initial: {
            opacity:0,
            originY:'125%',
            rotate:'45deg',
            
        },
        animate:{            
            opacity:1,
            originY:'125%',
            rotate: '0deg',
        },
        exit:{
            opacity:0,
            rotate: '-45deg'
        },
        transition:{
            duration:1,
            type:'spring',
        }
    }

    useEffect(() => {
        if(typeof(minutes) !== 'number' )
            navigate('/timer/set');
        if(intervalNumber === null && location.state.intervals)
            sessionStorage.setItem('intervalNumber', '1');
    }, []);

    useEffect(()=>{
        setTimeout(() => {
            setCounter(minutes - Date.now());
        },50);
        if(counter <= 300 && !fadeOut){
            setFadeOut(true);
            coverColorControls.start('fadeOut')
            setTimeout(() => {
                sessionStorage.setItem('clicked', 'true');
                if(intervalNumber != null)
                    sessionStorage.setItem('intervalNumber', (parseInt(intervalNumber)+1).toString());
                navigate('/timer/finished', {state:{ ...location.state, countdown:Date.now()+(5*60000)}});
            }, 500)
        }
    },[counter]);
    
    const handleButtonPress = () => {
        navigate('/timer/set');
        sessionStorage.removeItem('intervalNumber');
        sessionStorage.setItem('clicked', 'true');
    }
    
    return (
        <>
            <Header setCurrentView={setCurrentView} />
            <AnimatePresence>
                {currentView === 'analog' && (
                    <motion.section 
                    className='countdown-view__wrapper'
                    initial={checkClicked === 'true' ? animationSection.animate : animationSection.initial}
                    animate={animationSection.animate}
                    exit={animationSection.exit}
                    transition={animationSection.transition}>

                        <AnalogTimer counter = {counter}/>
                    </motion.section>) }
            </AnimatePresence>
            <AnimatePresence>
                {currentView === 'digital' && (
                    <motion.section 
                    className='countdown-view__wrapper'
                    initial={checkClicked === 'true' ? animationSection.animate : animationSection.initial}
                    animate={animationSection.animate}
                    exit={animationSection.exit}
                    transition={animationSection.transition}>
                        <DigitalTimer counter = {counter}/>
                    </motion.section>)}
            </AnimatePresence>
            <AnimatePresence>
                {currentView === 'text' && (
                    <motion.section 
                        className='countdown-view__wrapper'
                        initial={checkClicked === 'true' ? animationSection.animate : animationSection.initial}
                        animate={animationSection.animate}
                        exit={animationSection.exit}
                        transition={animationSection.transition}>
                            <TextTimer counter = {counter}/>
                    </motion.section>)}
            </AnimatePresence>            
            <section className='button-wrapper'>
                
                {intervalNumber && (<h2 className='interval__check'>INTERVAL NR {intervalNumber}</h2>)}

                <Button buttonType='dark-gray' onClick={handleButtonPress} content='ABORT TIMER' />
            </section>

            <motion.section 
            className='color-spreader__wrapper'
            initial={'fadeIn'}
            variants={{
                fadeOut:{
                    opacity: 1,
                },
                fadeIn:{
                    opacity: 0,
                }
            }}
            animate={coverColorControls}
            transition={{
                duration:.25,
                ease:'easeInOut',
            }} />
        </>
    );
}

export default CountdownView;