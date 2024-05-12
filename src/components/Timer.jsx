import React, { useState, useRef, useEffect } from 'react';
import './Timer.css';

import names from '../names.json';

// 2-minute warning
import toast, { Toaster } from 'react-hot-toast';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(10);
    const [timerMinuteSet, setTimerMinuteSet] = useState(timerMinute);
    const [timerSecondSet, setTimerSecondSet] = useState(timerSecond);

    const [isRunning, setIsRunning] = useState(true);
    const [users, setUsers] = useState(names);

    const ref = useRef(null);

    const warningToast = () => toast('2 minutes remaining!');  // May need to generalize?

    useEffect(() => {
        // 2min warning is in a useEffect, bc toast can cause a state update while Timer 
        // is still rendering causing a warning in the console.
        if (time === 120) {
            warningToast();
        }
    }, [time]);
    
    // const remainingTime = (e) => {
    //     const totalTime = Date.parse(e) - Date.parse(new Date());
    //     const hours = Math.floor((totalTime / 1000 / 60 / 60) % 24);
    //     const minutes = Math.floor((totalTime / 1000 / 60) % 60);
    //     const seconds = Math.floor((totalTime / 1000) % 60);
    //     return {
    //         totalTime,
    //         hours,
    //         minutes,
    //         seconds,
    //     };
    // };

    const formatTime = (seconds) => {
        // add leading 0s if needed
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60

        if (hours <= 9) {
            hours = '0' + hours;
        }
        if (minutes <= 9) {
            minutes = '0' + minutes;
        }
        if (seconds <= 9) {
            seconds = '0' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    };

    const clear = (e) => {
        setIsRunning(true)
        setTime(timerMinute * 60 + timerSecond);
        if (ref.current) {
            clearInterval(ref.current);
        }
        start()
    };

    const start = () => {
        const id = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(id); // Clear interval when time reaches 0
                    return 0;
                }
            });
        }, 1000);
        ref.current = id;
    }

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

        // setting names
        //setCurrentUserIndex(previousIndex => (previousIndex + 1) % names.length);
        //setCurrentUser(names[currentUserIndex].name);

        let users2 = users;
        users2.push(users2.shift());
        console.log(users2);
        setUsers(users2);
    };

    const setTimer = () => {
        setTimerMinute(timerMinuteSet);
        setTimerSecond(timerSecondSet);
    }

    const toggleTimer = () => {
        setIsRunning(!isRunning)
        if (isRunning) {
            console.log("Pausing timer")
            clearInterval(ref.current)
        } else {
            if (ref.current) {
                clearInterval(ref.current);
            }
            console.log("Resuming Timer")
            start()
        }
    }

    const queueMembers = names.map((user, index) => {
        if (index > 0) {
            return <p>{user.name}</p>;
        }
    })

    return (
        <div className="timer-wrapper">
            {/* Toaster needed for 2min warning */}
            <Toaster />
            <div className="set-timer">
                {formatTime(timerSecond + timerMinute * 60)}
            </div>
            <div className="timer-text">
                {formatTime(time)}
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
            <button className="timer-button" onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
            <br />
            <button className="timer-button blue large" onClick={reset}>Start</button>

            <div>
                <h1>Current User</h1>
                <p><b>{users[0].name}</b></p>
                <h2>Next</h2>
                {queueMembers}
            </div>
        </div>

    );
};

export default Timer;
