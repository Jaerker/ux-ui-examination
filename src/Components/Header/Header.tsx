import './header.css';
import MenuButtonImage from '../../assets/navicon.svg';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    setCurrentView: Dispatch<SetStateAction<string>>;
}

const Header = ({setCurrentView}: Props) => {
    const [open, setOpen] = useState(false);

    const menuWrapper = {
        'open': {
            x:'105vw'
        },
        'closed':{
            x:0
        }
    }
    const menuButton = {
        'open': {
            filter:'brightness(10)',
        },
        'closed':{
            filter:'brightness(1)',
            
        }
    }

    const handleMenuButtonClicked = (e: React.MouseEvent) => {
        let view = e.currentTarget.id;
        setOpen(!open);
        
        setCurrentView(view);
    }
    return (<>
        <button className={`menu-button`} onClick={() => {setOpen(!open)}}>
            <motion.img 
            src={MenuButtonImage} 
            alt="Menu button image" 
            animate={open ? 'open' : 'closed'}
            variants={menuButton}
            initial='closed'
            transition={{
                duration:.45
            }}
            />
        </button>
        <header className='header'>
            <h1 className='header-title'>interval</h1>
            <motion.aside 
                className='menu-wrapper'
                animate={open ? 'open' : 'closed'}
                variants={menuWrapper}
                transition={{
                    duration:.45,
                    type:'spring',
                }}>
                <nav className='menu'>
                    <ul className='menu-list'>
                        <li className='menu-list__item'>
                            <button id='analog' className='list-item__button' onClick={handleMenuButtonClicked}>ANALOG TIMER</button> 
                        </li>
                        <li className='menu-list__item'>
                            <button id='digital' className='list-item__button' onClick={handleMenuButtonClicked}>DIGITAL TIMER</button>
                        </li>
                        <li className='menu-list__item'>
                            <button id='text' className='list-item__button' onClick={handleMenuButtonClicked}>TEXT TIMER</button>
                        </li>
                    </ul>
                </nav>
            </motion.aside>

        </header>
    </>    
    );
}

export default Header;