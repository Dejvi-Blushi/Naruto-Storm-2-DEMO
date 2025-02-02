import React, {useState, useEffect} from "react";

import "./LoadingScreen.css";

import {useSceneSkipStateStore} from "../zustand/GameStateStore.jsx";

function LoadingScreen() {
    const [percentage, setPercentage] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                setPercentage((prevState) => {
                    if (prevState >= 100) {
                        clearInterval(intervalId);

                        setIsLoaded(true);

                        return prevState;
                    } else {
                        return prevState + 1;
                    }
                });
            }, 20);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const timeoutId = setTimeout(() => {
                setSceneSkipStateTrue();
            }, 1200);

            return () => clearTimeout(timeoutId);
        }
    }, [isLoaded]);

    const percentageFormat = (num) => {
        const percentageSpaced = num.toString().split("").join(" ");
        return percentageSpaced;
    };

    return (
        <div className="loading-container2">
            <div className="loading-logo-container2">
                <span>L</span>
                <span>&nbsp;</span>
                <span>O</span>
                <span>&nbsp;</span>
                <span>A</span>
                <span>&nbsp;</span>
                <span>D</span>
                <span>&nbsp;</span>
                <span>I</span>
                <span>&nbsp;</span>
                <span>N</span>
                <span>&nbsp;</span>
                <span>G</span>
            </div>
            <div className="percentage-logo-container2">
                {percentageFormat(percentage)} %
            </div>
        </div>
    );
}

export default LoadingScreen;
