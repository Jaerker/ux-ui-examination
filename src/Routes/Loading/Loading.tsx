import './loading.css';
import LogoImg from '../../assets/logo.svg'
import {useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const Loading = () => {

    const navigate = useNavigate();
    const coverColorControls = useAnimationControls();
    const handleClicked = () => {
        sessionStorage.setItem('clicked', 'true');
        coverColorControls.start('fadeOut');
        setTimeout(() => {
            navigate('/timer/set');
        }, 400);
    }
    useEffect(() => {
        coverColorControls.start('fadeIn');

    },[])

    return (<>

        <section className='loading-wrapper' onClick={handleClicked}>
            <img className='logo-image' src={LogoImg} alt="Company Logo" />
            <h1 className='logo-title'>INTERVAL</h1>
            <p className='logo-subtitle'>For all your timing needs</p>
        </section>
        <motion.section 
            className='color-spreader__wrapper'
            initial={'initial'}
            variants={{
                initial:{
                    backgroundColor:"#000000",
                    opacity: 1,
                },
                fadeOut:{
                    opacity: 1,
                    backgroundColor:"#EEEEEE",
                },
                fadeIn:{
                    opacity: 0,
                    transition:{
                        delay:.5,
                        duration:2
                    }
                }
            }}
            animate={coverColorControls}
            transition={{
                duration:.25,
                ease:'easeInOut',
            }} />
    </>);
}

export default Loading;