import IncrementIcon from '../../assets/increment.svg';
import DecrementIcon from '../../assets/decrement.svg';
import CrossIcon from '../../assets/cross.svg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './set-timer.css';
import Button from '../../Components/Button/Button';
import { motion, useAnimationControls } from 'framer-motion';

const SetTimer = () => {
    const navigate = useNavigate();
    const minutesControls = useAnimationControls();
    const secondCheckboxControls = useAnimationControls();
    const [minutes, setMinutes] = useState(0);
    const [checkedValues, setCheckedValues] = useState({
        intervals: false,
        breakPerInterval: false
    });

    const shakeValue = 5;

    const handleMinuteButtonsPressed = (value: number) => {

        setMinutes(prevValue => {
            if(prevValue + value > -1){
                return prevValue + value;                
            }
            minutesControls.start('error');
            return 0;            
        });
    }
    const handleCheckboxChange = (e: React.MouseEvent, value:boolean) => {
        const id:string = e.currentTarget.id;

        setCheckedValues(prevValue  => {
            if(prevValue.breakPerInterval && id === 'intervals' && !value)
                return {
                    intervals: false,
                    breakPerInterval: false
                }
            return {
                ...prevValue,
                [id]:value
            };
        });
        
    }

    const handleStartTimer = () => {
        // /timer/countdown
        navigate('/timer/countdown', {state:{time: Date.now() + (minutes*60000), intervals: checkedValues.intervals, breakPerInterval: checkedValues.breakPerInterval, minutes: minutes}});
    }

    return (<>
        <section className='set-timer-wrapper'>
            <motion.section 
            className='set-minutes__wrapper'
            >
                <img className='set-minutes__icon' src={DecrementIcon} onClick={() => handleMinuteButtonsPressed(-1)} />
                <section className='set-minutes__section'>
                    <motion.span 
                    className='set-minutes__value'
                    initial={'default'}
                    variants={{
                        default: {
                            rotate:0,
                            color:'#00000',
                        },
                        error:{
                            rotate: [-shakeValue*2,shakeValue*2,-shakeValue*2,shakeValue*2,-shakeValue*2,shakeValue*2,-shakeValue,0],
                            color:      ['#551010', '#972222', '#972222', '#972222', '#972222','#972222', '#551010', '#000000'],
                            transition:{
                                duration:.3,
                            }
                        }                        
                    }}
                    animate={minutesControls}
                    >{minutes}</motion.span>
                    <span className='set-minutes__sub-title'>minute{minutes == 0 || minutes >1 ? 's' : ''}</span>
                </section>
                <img className='set-minutes__icon' src={IncrementIcon} onClick={() => handleMinuteButtonsPressed(1)}/>
            </motion.section>

            <article className='checkbox-choices__wrapper'>
                <button id='intervals' className='checkbox' onClick={(e) => handleCheckboxChange(e, !checkedValues.intervals)}>
                    <figure className={`checkbox__box checkbox__box--${checkedValues.intervals ?  'checked' : 'unchecked'}`}><img className='checkbox__icon' src={CrossIcon}/></figure>
                    <p className='checkbox__label'>Intervals</p>
                </button>
                <motion.button 
                    id='breakPerInterval' 
                    className='checkbox' 
                    onClick={(e) => handleCheckboxChange(e, !checkedValues.breakPerInterval)}
                    initial={'unchecked'}
                    variants={{
                        unchecked:{
                            opacity:0,
                            pointerEvents:'none',
                            y: '-100%'
                        },
                        checked: {
                            opacity:1,
                            pointerEvents:'all',
                            y: 0
                        }
                }}
                animate={checkedValues.intervals ? 'checked': 'unchecked'}
                transition={{
                    duration:.25,
                }}>
                    <figure className={`checkbox__box checkbox__box--${checkedValues.breakPerInterval ?  'checked' : 'unchecked'}`}><img className='checkbox__icon' src={CrossIcon}/></figure>
                    <p className='checkbox__label'>5 min break / interval</p>
                </motion.button>
            </article>

            <Button buttonType='black' onClick={handleStartTimer} isValidSubmit={minutes>0} content="START TIMER" />

        </section>
    </>);
}

export default SetTimer;