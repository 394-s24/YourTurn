import React, { useState } from 'react';
import { ref, set, child, get, push, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "./Home.css";

const Home = ({ db }) => {
    const [userName, setUserName] = useState(""); // New state for the user name
    const [roomCode, setRoomCode] = useState("");

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const newSwarm = async () => {
        if (!userName) {
            alert("Please enter a name before creating a swarm.");
            return;
        }

        const swarmURL = uuidv4();
        const joinID = makeid(5);
        console.log("created new swarm: ", joinID);

        console.log("WRITING");
        set(ref(db, 'swarms/' + joinID), {
            url: swarmURL,
        }).then(() => set(ref(db, "swarmUrls/" + swarmURL), {
            members: [userName],
            roomCode: joinID,
            timerState: {
                time: 0,
                timerMinute: 0,
                timerSecond: 10,
                isRunning: true,
                stamp: 0
            }
        })).then(() => window.location.href = "/swarm/" + swarmURL);
    }

    const joinSwarm = async () => {
        if (!userName) {
            alert("Please enter a name before creating a swarm.");
            return;
        }

        if (!roomCode) {
            alert("Please enter a valid room code")
        }
        console.log("Joining swarm: ", roomCode);
        const dbRef = ref(db)
        get(child(dbRef, `swarms/${roomCode}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const swarmURL = data.url;
                get(child(dbRef, `swarmUrls/${swarmURL}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        let swarmMembers = data.members;
                        const roomCode = data.roomCode;
                        if (!swarmMembers.includes(userName)) {
                            swarmMembers.push(userName)
                            const updates = {
                                members: swarmMembers,
                                roomCode: roomCode
                            }
                            update(child(dbRef, `swarmUrls/${swarmURL}`), updates)
                                .then(() => window.location.href = "/swarm/" + swarmURL);
                        } else {
                            alert(`swarm already contains member with username ${userName}`)
                        }
                    } else {
                        console.log(`Room code exists but no swarm found`)
                    }
                })
            } else {
                alert(`No Swarm with code ${roomCode} currently active`)
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="home-wrapper">
            <div className="option-label">
                Enter your name:
            </div>
            <textarea
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name here"
                className="name-input"
            />
            <div className="home-option-wrapper">
                <textarea
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    placeholder="Enter room code"
                    className="name-input"
                    maxLength="5"
                />
                <div className="option-button" onClick={joinSwarm}>
                    Join a Swarm
                </div>
            </div>
            <div className="home-option-wrapper">
                <div className="option-button" onClick={newSwarm}>
                    Create new Swarm
                </div>
            </div>
        </div>
    )
}

export default Home;
