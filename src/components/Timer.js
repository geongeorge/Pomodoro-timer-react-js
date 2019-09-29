import React, {useRef,useState,useEffect} from 'react';
import Sound from 'react-sound';

function formatSeconds(ss) {
    if(ss > 9) return ss;
    //else add zero
    return '0' +ss;
}
function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    return useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

function Timer({updateBreak}) {
    const time25 = 25;
    const time5 = 5;


    
    const [timeval, setTimeval] = useState([time25,0]);
    const [isRunning, setIsRunning] = useState(false);
    const [count, setCount] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [playSound, setPlaySound] = useState(false);

    function setTime(){
        
        if(timeval[1] === 0 && timeval[0] === 0) {
            //timer end
            //breaktime
            // isBreak will only be updated in the next render so changing
            // value now with the opposite of currenrt state
            updateBreak(!isBreak);
            if(!isBreak) {
                // if it is break
                // update count
                document.title = "Break";
                setCount(prev => ++prev)
            } else {
                document.title = "Focus";
            }
            setTimeval([!isBreak?time5:time25,0])
            
            setPlaySound(true);
            setIsRunning(false);
            
            
            setIsBreak(prev => !prev);
            return;
        }
        
        document.title = timeval[0]+" : "+formatSeconds(timeval[1]);

        if(timeval[1] === 0) { 
            //subtract minute and sec
            setTimeval(prev => {
                return [--prev[0], 59]
            })
        } else {

           setTimeval(prev => {
                return [prev[0], --prev[1]]
            })
        }
        
    }

    function removeSound() {
        setPlaySound(false);
    }

        const clearInt = useInterval(setTime,isRunning?1000:null);

    return (
        <div>
            <p className="text-gray-600">
            {isBreak?<span>Break 😌</span>:<span>Focus time 👨‍💻</span>}
            </p>
            <p className="text-gray-600 text-xs italic">
            {isBreak && <span>Get some fresh air</span>}{!isBreak && <span>Work on what's important</span>}
            </p>
            <h2 className="title text-green-300 large-text">{timeval[0]+" : "+formatSeconds(timeval[1])}</h2>
            <p>     
                <button 
                className="text-sm focus:outline-none hover:underline hover:font-bold"
                onClick={e=>setIsRunning(prev=>!prev)}>
                {!isRunning? <>start</>: <>pause</> }
                </button>
            </p>
            <p className="text-sm text-gray-600 mt-3 font-bold">
                Streak:&nbsp; 
                {count===0 ? <>zero</>:<>{count}</>}
            </p>
            {playSound &&
            <Sound
            url="assets/Brrrriiing.mp3"
            playStatus={Sound.status.PLAYING}
            onFinishedPlaying={removeSound}
            />
            }
            
        </div>
    );
}


export default Timer;