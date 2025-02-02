import {useEffect} from "react";

import "./GameBootScreen.css";

import game_boot_screen from "../assets/game_boot_screen/game_boot_screen.png";

import {useSceneSkipStateStore} from "../zustand/GameStateStore.jsx";

function GameBootScreen() {
    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSceneSkipStateTrue();
        }, 2500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <img
            className="game-boot-screen1"
            src={game_boot_screen}
            draggable="false"
        ></img>
    );
}
export default GameBootScreen;
