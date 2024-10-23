import { motion, useAnimationControls } from 'framer-motion';
import './button.css';
import { useEffect } from 'react';
type Props = {
    content: string,
    buttonType?: string,
    onClick?: () => void,
    isValidSubmit?: boolean,
}

const Button = ({ content='', buttonType='black', onClick, isValidSubmit=true}: Props) => {

    const buttonControls = useAnimationControls();
    const coverColorControls = useAnimationControls();
    const shakeValue = 3;
    const buttonColor = buttonType === 'black' ? '#000000' : buttonType === 'dark-gray' ? '#555555' :  '#EEEEEE';
    const checkClicked = sessionStorage.getItem('clicked');


    const handleButtonClick = () => {
        if (isValidSubmit && onClick != null){
            coverColorControls.start('fadeOut'); 
            sessionStorage.setItem('clicked', 'true');
            setTimeout(() => {
                onClick();
            }, 400)
        }
        else{
            buttonControls.start('error')
        }
    }

    useEffect(()=> {
        setTimeout(() => {
            if(checkClicked === 'true'){
                coverColorControls.start('fadeIn');
                sessionStorage.removeItem('clicked');
            }
        },50)
    },[]);

    return (<>
        <motion.button 
        className={`button`} 
        onClick={handleButtonClick}
        initial={'default'}
        whileHover={'hover'}
        variants={{
            default: {
                rotate:0,
                border: `solid 1px ${buttonColor}`,
                color: buttonColor,
            },
            error: {
                rotate: [-shakeValue*2,shakeValue*2,-shakeValue*2,shakeValue*2,-shakeValue*2,shakeValue*2,-shakeValue,0],
                scale: [1, 1.05, 1],
                borderColor:['#551010', '#972222', '#972222', '#972222', '#972222','#972222', '#551010', buttonColor],
                color:      ['#551010', '#972222', '#972222', '#972222', '#972222','#972222', '#551010', buttonColor],
                transition:{
                    duration: .3
                }
            },
            hover: {
                scale:1.05,
                boxShadow: '3px 3px 5px #00000099',
                transition:{
                    ease: 'easeInOut',
                }
            }
            }}
        animate={buttonControls}>
            {content}
        </motion.button>
        <motion.section 
            className='color-spreader__wrapper'
            initial={checkClicked === 'true' ? 'fadeOut' : 'fadeIn'}
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

export default Button;