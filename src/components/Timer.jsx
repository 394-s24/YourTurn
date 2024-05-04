import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Timer = () => {
    const [time, setTime] = useState("00:00:00");
    const Ref = useRef(null);

    const remainingTime = (e) => {
        // time from current time to future time
        const totalTime = Date.parse(e) - Date.parse(new Date());
        const hours = Math.floor((totalTime / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((totalTime / 1000 / 60) % 60);
        const seconds = Math.floor((totalTime / 1000) % 60);
        return {
            totalTime,
            hours,
            minutes,
            seconds,
        }
    }

    const start = (e) => {
        let {totalTime, hours, minutes, seconds} = remainingTime(e);
        if (totalTime >= 0) {
            // add leading 0s if needed
            if (hours <= 9) {
                hours = "0" + hours;
            }
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds <= 9) {
                seconds = "0" + seconds;
            }
            setTime(hours + ":" + minutes + ":" + seconds);
        }
    }

    const clear = (e) => {
        // 15 minute switchoff during swarms
        setTime("00:15:00");

        if (Ref.current) {
            clearInterval(Ref.current);
        }
        const id = setInterval(() => {
            start(e);
        }, 1000);
        Ref.current = id;
    }

    const setDeadline = () => {
        // if need more time in current session, add 2 minutes
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 15);
        return deadline;
    }

    useEffect(() => {
        clear(setDeadline());
    }, []);

    const reset = () => {
        clear(setDeadline());
    }

    return (
        <div className="timer">
            {time}
            <button onClick={reset}>reset</button>
        </div>
    );
};

export default Timer;