import './digital-timer.css';

type Props = {
    counter: number,
}

const DigitalTimer = ({counter}: Props) => {

    const minutes = Math.floor(Math.ceil(counter/1000)/60)
    const seconds = Math.ceil(counter/1000)-(Math.floor(Math.ceil(counter/1000)/60)*60)

    return (<>
            <h1 className='digital-clock'><span className='digital-clock__minutes'>{minutes < 10 ? '0'+minutes : minutes}</span>: <span className='digital-clock__seconds'>{seconds < 10 ? '0'+seconds : seconds}</span></h1>
        </>);
}

export default DigitalTimer;
