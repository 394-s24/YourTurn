import React, { useState, useRef, useEffect } from 'react';
import { getDatabase, ref as rref, onValue, update, child } from "firebase/database";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import './Timer.css';
import names from '../names.json';

const Timer = ({ db }) => {
    // State variables
    const [stamp, setStamp] = useState(0);
    const [time, setTime] = useState(0);
    const [timerMinute, setTimerMinute] = useState(0);
    const [timerSecond, setTimerSecond] = useState(10);
    const [timerMinuteSet, setTimerMinuteSet] = useState(timerMinute);
    const [timerSecondSet, setTimerSecondSet] = useState(timerSecond);
    const [isRunning, setIsRunning] = useState(true);
    const [users, setUsers] = useState([""]);
    const [roomCode, setRoomCode] = useState("");
    const [initialLoad, setInitialLoad] = useState(false);
    const [warningTime, setWarningTime] = useState(2);

    const ref = useRef(null);
    const params = useParams();

    // Effect to load timer state from Firebase
    useEffect(() => {
        const membersRef = rref(db, 'swarmUrls/' + params.swarmUrl);
        const unsubscribe = onValue(membersRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data.members || []);
            setRoomCode(data.roomCode || []);

            const timerState = data.timerState;
            setTime(timerState.time);
            setTimerMinute(timerState.timerMinute);
            setTimerSecond(timerState.timerSecond);
            setIsRunning(timerState.isRunning);
            setStamp(timerState.stamp);

            setInitialLoad(true);

            if (isRunning) {
                tick();
            } else {
                clearInterval(ref.current);
            }
        });

        return () => unsubscribe();
    }, [db, params.swarmUrl, isRunning]);

    // Effect to update Firebase with the new timer state
    useEffect(() => {
        if (initialLoad) {
            updateTimerState();
        }
    }, [timerMinute, timerSecond, isRunning, stamp, initialLoad]);

    // Function to update the timer state in Firebase
    const updateTimerState = () => {
        const dbRef = rref(db);
        const updates = {
            members: users,
            roomCode: roomCode,
            timerState: {
                time: time,
                timerMinute: timerMinute,
                timerSecond: timerSecond,
                isRunning: isRunning,
                stamp: stamp
            }
        };

        if (!Object.values(updates.timerState).includes(undefined)) {
            update(child(dbRef, `swarmUrls/${params.swarmUrl}`), updates)
                .then(() => console.log("updated"))
                .catch((error) => console.error("Update failed:", error));
        } else {
            console.error("Update failed: values argument contains undefined", updates);
        }
    };

    // Effect to handle timer warnings and completion
    useEffect(() => {
        if (time === (warningTime * 60)) {
            twoMinuteWarning();
        }
        if (time === 0) {
            timerComplete();
        }
    }, [time, warningTime]);

    // Timer warning and completion functions
    const twoMinuteWarning = () => {
        toast(`${warningTime} minute(s) remaining!`);
        const sound = new Audio('../../public/sounds/twoMinuteWarning.mp3');
        sound.play();
    };

    const timerComplete = () => {
        toast('Rotation Over!');
        const sound = new Audio('../../public/sounds/timerComplete.mp3');
        sound.play();
    };

    // Function to format time
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

    // Timer control functions
    const start = () => {
        setIsRunning(true);
    };

    const tick = () => {
        clearInterval(ref.current);
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
        ref.current = id;
    };

    const reset = () => {
        setStamp(stamp + 1);
        let users2 = [...users];
        users2.push(users2.shift());
        setUsers(users2);
        setTime(timerMinute * 60 + timerSecond);
        start();
    };

    const setTimer = () => {
        setTimerMinute(timerMinuteSet);
        setTimerSecond(timerSecondSet);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const deleteUser = (index) => {
        let usersCopy = [...users];
        usersCopy.splice(index, 1);
        setUsers(usersCopy);
    };

    const queueMembers = users.slice(1).map((user, index) => (
        <div className="queue-member" key={index}>
            <p>{user}</p>
            <button className="delete-button" onClick={() => deleteUser(index + 1)}>Delete</button>
        </div>
    ));

    // Component render
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
                        onChange={(e) => setTimerMinuteSet(parseInt(e.target.value, 10))}
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
                        onChange={(e) => setTimerSecondSet(parseInt(e.target.value, 10))}
                    />
                </label>
                <label>
                    Set Warning Time (in minutes)
                    <span> </span>
                    <input
                        className="set-timer-text"
                        name="setWarningTime"
                        type="number"
                        min="0"
                        onChange={(e) => setWarningTime(parseInt(e.target.value, 10))}
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
