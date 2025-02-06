import {useEffect, useState} from "react";

import game_boot_screen from "../assets/game_boot_screen/game_boot_screen.png";

import {useSceneSkipStateStore} from "../zustand/GameStateStore.jsx";

function GameBootScreen() {
    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    const [isLoading, setIsLoading] = useState(true);

    const preloadImage = game_boot_screen;

    const cacheImage = async (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = (error) => {
                reject(window.alert("Image failed to load:", error));
            };
        });
    };

    useEffect(() => {
        cacheImage(preloadImage).then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setSceneSkipStateTrue();
            }, 2500);
        }
    }, [isLoading]);

    if (isLoading) {
        return <></>;
    }

    return <img src={preloadImage} draggable="false" />;
}

export default GameBootScreen;
