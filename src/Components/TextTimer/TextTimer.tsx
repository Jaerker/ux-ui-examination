import './text-timer.css';

type Props = {
    counter: number,
}

const TextTimer = ({counter}: Props) => {

    const minutes = Math.floor(Math.ceil(counter/1000)/60)
    const seconds = Math.ceil(counter/1000)-(Math.floor(Math.ceil(counter/1000)/60)*60)

    const formatNumToString = (num:number) => {
        let returnValue = ''; 
        let isFinished = false;
        switch(Math.floor(num/10)){
            case 1: {
                isFinished = true;
                switch(num%10){
                    case 0:{ 
                        returnValue = 'tio';
                        break;
                    }
                    case 1:{ 
                        returnValue = 'elva';
                        break;
                    }
                    case 2:{ 
                        returnValue = 'tolv';
                        break;
                    }
                    case 3:{ 
                        returnValue = 'tretton';
                        break;
                    }
                    case 4:{ 
                        returnValue = 'fjorton';
                        break;
                    }
                    case 5:{ 
                        returnValue = 'femton';
                        break;
                    }
                    case 6:{ 
                        returnValue ='sexton';
                        break;
                    }
                    case 7:{ 
                        returnValue = 'sjutton';
                        break;
                    }
                    case 8:{ 
                        returnValue = 'arton';
                        break;
                    }
                    case 9:{ 
                        returnValue = 'nitton';
                        break;
                    }
                }
                break;
            }
            case 2:{ 
                returnValue = 'tjugo';
                break;
            }
            case 3:{ 
                returnValue = 'trettio';
                break;
            }
            case 4:{ 
                returnValue = 'fyrtio';
                break;
            }
            case 5:{ 
                returnValue = 'femtio';
                break;
            }
            case 6:{ 
                returnValue ='sextio';
                break;
            }
            case 7:{ 
                returnValue ='sjuttio';
                break;
            }
            case 8:{ 
                returnValue ='åttio';
                break;
            }
            case 9:{ 
                returnValue = 'nittio';
                break;
            }
            default: {
                
            }
        }
        if(!isFinished){
            switch(num%10){
                case 1:{
                    returnValue += 'en';
                    break;
                }
                case 2:{
                    returnValue += 'två';
                    break;
                }
                case 3:{
                    returnValue += 'tre';
                    break;
                }
                case 4:{
                    returnValue += 'fyra';
                    break;
                }
                case 5:{
                    returnValue += 'fem';
                    break;
                }
                case 6:{
                    returnValue += 'sex';
                    break;
                }
                case 7:{
                    returnValue += 'sju';
                    break;
                }
                case 8:{
                    returnValue += 'åtta';
                    break;
                }
                case 9:{
                    returnValue += 'nio';
                    break;
                }
                case 0:{
                    if(Math.floor(num/10) > 1)
                        returnValue += '';
                    else {
                        returnValue += 'noll';
                    }
                    break;
                }
            }
        }
        return returnValue;

        
    }

    return (<>
        <h1 className='text-clock'>
        {formatNumToString(minutes) === 'noll' ? '': `${formatNumToString(minutes).toUpperCase() +  ' MINUT'}${formatNumToString(minutes) === 'en' ? '' : 'ER'} OCH `}
        {formatNumToString(seconds).toUpperCase()} SEKUND{formatNumToString(seconds) === 'en' ? '' : 'ER'} KVAR
        </h1>
    </>);
}

export default TextTimer;
