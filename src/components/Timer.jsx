import React, { useState, useRef, useEffect } from 'react';
import { getDatabase, ref as rref, onValue } from "firebase/database";
import './Timer.css';
import names from '../names.json';
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const Timer = ({ db }) => {
    const [time, setTime] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(10);
    const [timerMinuteSet, setTimerMinuteSet] = useState(timerMinute);
    const [timerSecondSet, setTimerSecondSet] = useState(timerSecond);
    const [isRunning, setIsRunning] = useState(true);
    const [users, setUsers] = useState([""]);
    const [roomCode, setRoomCode] = useState("");

    const ref = useRef(null);
    const params = useParams();

    const db = getFirestore(app);

    useEffect(() => {
        const membersRef = rref(db, 'swarmUrls/' + params.swarmUrl);
        const unsubscribe = onValue(membersRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            setUsers(data.members || []);
            setRoomCode(data.roomCode || []);
        });
        return () => unsubscribe();
    }, [db, params.swarmUrl]);

    const twoMinuteWarning = () => {
        toast('2 minutes remaining!');
        const sound = new Audio('../../public/sounds/twoMinuteWarning.mp3'); 
        sound.play();
    };

    const timerComplete = () => {
        toast('Rotation Over!');
        const sound = new Audio('../../public/sounds/timerComplete.mp3'); 
        sound.play();
    };

    useEffect(() => {
        if (time === 120) {
            twoMinuteWarning();
        }
        if (time === 0) {
            timerComplete();
        }
    }, [time]);

    const formatTime = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        if (hours <= 9) hours = '0' + hours;
        if (minutes <= 9) minutes = '0' + minutes;
        if (seconds <= 9) seconds = '0' + seconds;
        return `${hours}:${minutes}:${seconds}`;
    };

    const clear = () => {
        setIsRunning(true);
        setTime(timerMinute * 60 + timerSecond);
        if (ref.current) {
            clearInterval(ref.current);
        }
        start();
    };

    const start = () => {
        const id = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(id);
                    return 0;
                }
            });
        }, 1000);
        setDoc(doc(db, "countdown"), {
            startAt: ServerValue.TIMESTAMP,
            hours: timerHour,
            minutes: timerMinute,
            seconds: timerSecond,
            running: true,
        });          
        ref.current = id;
    };

    const setDeadline = () => {
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + timerMinute);
        deadline.setSeconds(deadline.getSeconds() + timerSecond);
        return deadline;
    };

    const reset = () => {
        clear(setDeadline());
        let users2 = [...users];
        users2.push(users2.shift());
        setUsers(users2);
    };

    const setTimer = () => {
        setTimerMinute(timerMinuteSet);
        setTimerSecond(timerSecondSet);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
        if (isRunning) {
            clearInterval(ref.current);
        } else {
            if (ref.current) {
                clearInterval(ref.current);
            }
            start();
        }
    };

    const queueMembers = users.slice(1).map((user, index) => (
        <p key={index}>{user}</p>
    ));

    return (
        <div className="timer-wrapper">
            <Toaster />
            <h2>{roomCode}</h2>
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
                <p><b>{users[0]}</b></p>
                <h2>Next</h2>
                {queueMembers}
            </div>
        </div>
    );
};

export default Timer;