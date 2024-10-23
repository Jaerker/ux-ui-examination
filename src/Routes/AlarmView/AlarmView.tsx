import { motion, useAnimationControls } from 'framer-motion';
import AlarmClockImg from '../../assets/alarm-icon.svg';
import PauseImg from '../../assets/pause-icon.svg';
import Button from '../../Components/Button/Button';

import './alarm-view.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



const AlarmView = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const coverColorControls = useAnimationControls();

    const handleButtonPress = () => {
        if(location.state.breakPerInterval)
                navigate('/timer/countdown', {state:{...location.state, time: Date.now() + (location.state.minutes*60000)}})
        else
            navigate('/timer/set');
    }
    const [fadeOut, setFadeOut] = useState(false); 
    const minutes = location.state.countdown;
    const [counter, setCounter] = useState(minutes - Date.now());

    const visualMinutes = Math.floor(Math.ceil(counter/1000)/60)
    const visualSeconds = Math.ceil(counter/1000)-(Math.floor(Math.ceil(counter/1000)/60)*60)

    useEffect(() => {
        if(location.state.intervals){
            if(!location.state.breakPerInterval)
                navigate('/timer/countdown', {state:{...location.state, time: Date.now() + (location.state.minutes*60000)}})
        }
    },[])
    useEffect(()=>{
        setTimeout(() => {
            setCounter(minutes - Date.now());
        },50);
        if(counter <= 300 && !fadeOut && location.state.intervals){
            setFadeOut(true);
            coverColorControls.start('fadeOut')
            setTimeout(() => {
                sessionStorage.setItem('clicked', 'true');
                navigate('/timer/countdown', {state:{ ...location.state, time:Date.now() + (location.state.minutes*60000) }});
            }, 500);
        }
    },[counter]);


    if(location.state?.intervals)
        return (<>
        <motion.section 
        className='alarm-view__wrapper'
        animate={{
            opacity:1,
            scale:[1, 1.05, 1, 1.05, 1],
        }}
        transition={{
            delay:.4,
            duration:1.5,
            repeat: Infinity,
            repeatDelay: 1
        }}>
                <motion.section 
                className="circleOne"
                animate={{
                    opacity:1,
                    scale:[1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                    delay:.3,
                    duration:1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                }}/>
                <motion.section 
                className="circleTwo"
                animate={{
                    opacity:1,
                    scale:[1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                    delay:.2,
                    duration:1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                }}
                />
                <motion.section 
                className="alarm-view__image-wrapper"
                
                animate={{
                    opacity:1,
                    scale:[1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                    delay:.1,
                    duration:1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                }}>
                    <motion.img 
                    className='alarm-view__image' 
                    src={PauseImg} 
                    alt="Pause Icon" 
                    initial={{
                        scale:1,
                    }}
                    animate={{
                        scale:[1, 1.1, 1, 1.1, 1],
                        
                    }}
                    transition={{
                        duration:1.5,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    />
                </motion.section>
        </motion.section>
        <h1 className="alarm-view__caption">Pause, breathe</h1>
        <h2 className='alarm-view__interval-countdown'><span>{visualMinutes < 10 ? '0'+visualMinutes : visualMinutes}</span>: <span>{visualSeconds < 10 ? '0'+visualSeconds : visualSeconds}</span></h2>
        <section className="button-wrapper">
        
            <Button buttonType='gray' onClick={handleButtonPress} content="NO PAUSE, GO NOW!" />
        
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
        </>)

    else
        return (<>

            <motion.section 
            className='alarm-view__wrapper'
            >
                
                <motion.section 
                className='biggest-circle'
                animate={{
                    opacity:1,
                    scale:[1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                    delay:.25,
                    duration:.75,
                    repeat: Infinity,
                    repeatDelay: 1
                }}/>
            <motion.section 
                className="circleOne"
                animate={{
                    opacity:1,
                    scale:[1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                    delay:.2,
                    duration:.75,
                    repeat: Infinity,
                    repeatDelay: 1
                }}/>
                <motion.section 
                    className="circleTwo"
                    animate={{
                        opacity:1,
                        scale:[1, 1.05, 1, 1.05, 1],
                    }}
                    transition={{
                        delay:.15,
                        duration:.75,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}/>
                
                <motion.section 
                    className="alarm-view__image-wrapper"
                    animate={{
                        scale:[1, 1.05, 1, 1.05, 1],
                    }}
                    transition={{
                        delay:.1,
                        duration:.75,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}>
                <motion.img 
                    className='alarm-view__image' 
                    src={AlarmClockImg} 
                    alt="Alarm clock"
                    initial={{
                        scale:1,
                    }}
                    animate={{
                        scale:[1, 1.15, 1],
                        rotate: [0, '-10deg', '17deg', '-10deg', '15deg', '-15deg', '10deg', '-12deg', '10deg','-10deg', '17deg', '-10deg', '15deg', '-15deg', '10deg', '-12deg', '10deg', 0]
                    }}

                    transition={{
                        duration:.75,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}/>
                </motion.section>
                <h1 className="alarm-view__caption">Times up!</h1>
                </motion.section>

            <section className="button-wrapper">

            <Button buttonType='gray' onClick={handleButtonPress} content="SET NEW TIMER" />
                    
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
</>);
}

export default AlarmView;