import React, { useState, useRef, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
    const [time, setTime] = useState('00:00:00');
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(10);
    const [timerMinuteSet, setTimerMinuteSet] = useState(timerMinute);
    const [timerSecondSet, setTimerSecondSet] = useState(timerSecond);
    const ref = useRef(null);

    const remainingTime = (e) => {
        const totalTime = Date.parse(e) - Date.parse(new Date());
        const hours = Math.floor((totalTime / 1000 / 60 / 60) % 24);
        const minutes = Math.floor((totalTime / 1000 / 60) % 60);
        const seconds = Math.floor((totalTime / 1000) % 60);
        return {
            totalTime,
            hours,
            minutes,
            seconds,
        };
    };

    const start = (e) => {
        const { totalTime, hours, minutes, seconds } = remainingTime(e);
        if (totalTime >= 0) {
            let displayTime = formatTime(hours, minutes, seconds);
            setTime(displayTime);
        }
    };

    const formatTime = (hours, minutes, seconds) => {
        if (hours + minutes + seconds >= 0) {
            // add leading 0s if needed
            if (hours <= 9) {
                hours = '0' + hours;
            }
            if (minutes <= 9) {
                minutes = '0' + minutes;
            }
            if (seconds <= 9) {
                seconds = '0' + seconds;
            }
        }

        return hours + ':' + minutes + ':' + seconds;
    };

    const clear = (e) => {
        let displayTime = formatTime(0, timerMinute, timerSecond);
        setTime(displayTime);

        if (ref.current) {
            clearInterval(ref.current);
        }
        const id = setInterval(() => {
            start(e);
        }, 1000);
        ref.current = id;
    };

    const setDeadline = () => {
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + timerMinute);
        deadline.setSeconds(deadline.getSeconds() + timerSecond);
        return deadline;
    };

    // useEffect(() => {
    //     clear(setDeadline());
    // }, [timerMinute, timerSecond]);

    const reset = () => {
        clear(setDeadline());
    };

    const setTimer = () => {
        setTimerMinute(timerMinuteSet);
        setTimerSecond(timerSecondSet);
    }

    return (
        <div className="timer-wrapper">
            <div className="set-timer">
                {formatTime(0, timerMinute, timerSecond)}
            </div>
            <div className="timer-text">
                {time}
            </div>
            <form className="set-timer-wrapper">
                <label>
                    Set Minute
                    <span> </span>
                    <input
                        className="set-timer-text"
                        name="setMinute"
                        type="number"
                        min="0"
                        max="59"
                        onChange={(e) => {
                            setTimerMinuteSet(parseInt(e.target.value, 10));
                        }}
                    />
                </label>
                <label>
                    Set Second
                    <span> </span>
                    <input
                        className="set-timer-text"
                        name="setSecond"
                        type="number"
                        min="0"
                        max="59"
                        onChange={(e) => {
                            setTimerSecondSet(parseInt(e.target.value, 10));
                        }}
                    />
                </label>
            </form>
            <button className="timer-button" onClick={setTimer}>Set Time</button>
            <br/>
            <button className="timer-button blue large" onClick={reset}>Start</button>
        </div>
    );
};

export default Timer;
