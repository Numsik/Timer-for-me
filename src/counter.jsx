import { useState,useRef } from "react";
import alertMp3 from "./music/alert.mp3";


function Timer (){
    const audioRef = useRef(new Audio(alertMp3));
    const [time, setTime] = useState(0);
    const [repeat, setRepeat] = useState(1);
    const [elapsed, setElapsed] = useState(0); 
    const [done, setDone] = useState(false);
    
    const intervalRef = useRef(null);
    const elapsedRef = useRef(null); 
    
    //diky tomuto hraje audio 
    function Playaudio(){
        audioRef.current.play()
        setTimeout(() =>{
            stopaudio();
        },1000)
    }
    function startElepsed(){
        setElapsed(0);
        if (elapsedRef.current) clearInterval(elapsedRef.current);

        elapsedRef.current = setInterval(() =>{
            setElapsed(prev => prev + 1)
        }, 1000)
    };
        

    function stopaudio(){
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    function stopElapsed(){
        if(elapsedRef.current){
            clearInterval(elapsedRef.current);
            elapsedRef.current= null;
        }
    }
    function StartTimer(){
        let count = 0;
        setDone(false);
        startElepsed()


        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }

        intervalRef.current = setInterval(() =>{
            Playaudio();
            setElapsed(0);
            count++;
            if(count >= repeat){
                clearInterval(intervalRef.current);
                setDone(true);
                stopElapsed();
            }

        }, Number(time) * 1000)


     
    }
    function StopTimer(){
        setElapsed(0);
        if(intervalRef.current){
            clearInterval(intervalRef.current)
            intervalRef.current = null;
        }
        stopElapsed();
    }

    return(

        <>
        <h1>Timer</h1>
        <div className="flex">
             <input placeholder="how many seconds?" type="number" onChange={(e) => setTime(e.target.value)}/>
            <input placeholder="how many times ?" type="number" onChange={(e) => setRepeat(e.target.value)}/>
        </div>

        <div className="flex">
            <button onClick={StartTimer}>Start timer</button>
            <button onClick={StopTimer}>Stop</button>
        </div>
       
        <div className="circle">
            <p className="time">{elapsed}</p>
        </div>
        
        {done && <p>Hotovo</p>}
        </>
    )


}
export default Timer;