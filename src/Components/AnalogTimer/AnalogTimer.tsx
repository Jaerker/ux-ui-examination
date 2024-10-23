import './analog-timer.css';
import MinutesHandImg from '../../assets/minutes-handle.svg';
import SecondsHandImg from '../../assets/seconds-handle.svg';
import { motion } from 'framer-motion';

type Props = {
    counter: number,
}

const AnalogTimer = ({counter}: Props) => {

    return (<>
        <section className='analog-clock'>
            <section className="analog-clock__frame">
                <motion.img 
                    src={MinutesHandImg} 
                    className="minutes-hand"
                    initial={{
                        y:'-43%',
                        originY: '94%',
                        originX: '50%',
                        rotate: (counter/60000)*6+'deg',
                    }}
                    animate={{
                        rotate: '0deg',
                    }}
                    transition={{
                        duration: (counter/1000),
                        ease:'linear'
                    }}></motion.img>
                <motion.img 
                src={SecondsHandImg} 
                className="seconds-hand"
                initial={{
                    y:'-44%',
                    originY: '96%',
                    originX: '50%',
                    rotate: Math.ceil(counter/1000)*6+'deg',
                }}
                animate={{
                    rotate: Math.ceil(counter/1000)*6+'deg'
                }}
                ></motion.img>
            </section>
        </section>
    </>);
}

export default AnalogTimer;
