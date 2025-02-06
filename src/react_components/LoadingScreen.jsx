import React, {useState, useEffect} from "react";

import "./LoadingScreen.css";

import {enter_key, w_key, s_key} from "./GameLanguageOption.jsx";
import key_bar from "../assets/key_window/key_bar.png";

import select_bar from "../assets/language_option/select_bar_effect.png";
import background_img from "../assets/language_option/language_option.png";

import {bng, cc2, criware} from "./SplashScreenLogos.jsx";

import {useSceneSkipStateStore} from "../zustand/GameStateStore.jsx";

function LoadingScreen() {
    const [percentage, setPercentage] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const preloadLangOption = [
        enter_key,
        w_key,
        s_key,
        key_bar,
        select_bar,
        background_img,
    ];

    const preloadSplashScreen = [bng, cc2, criware];

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

    const CacheTextures = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = (error) =>
                reject(window.alert("Image failed to load:", error));
        });
    };

    useEffect(() => {
        Promise.all(
            preloadLangOption.map((image) => CacheTextures(image))
        ).catch((error) => console.error("Error preloading images:", error));
    }, []);

    useEffect(() => {
        Promise.all(
            preloadSplashScreen.map((image) => CacheTextures(image))
        ).catch((error) => console.error("Error preloading images:", error));
    }, []);

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
