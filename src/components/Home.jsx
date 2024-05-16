import React, { useState } from 'react';
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "./Home.css";

const Home = ({ db }) => {
    const [userName, setUserName] = useState(""); // New state for the user name

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
            members: [userName]
        })).then(() => window.location.href = "/swarm/" + swarmURL);
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
                <div className="option-label">
                    Join a Swarm
                </div>
                <div className="">
                    {/* Add join swarm logic here */}
                </div>
                <div className="option-button">
                    Join
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
