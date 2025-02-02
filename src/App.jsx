import {useState, useEffect} from "react";
import {
    useSceneSkipStateStore,
    useSkipToIntroStateStore,
    useQuitGameStateStore,
} from "./zustand/GameStateStore.jsx";

import GameBootScreen from "./react_components/GameBootScreen.jsx";
import LoadingScreen from "./react_components/LoadingScreen.jsx";
import GameLanguageOption from "./react_components/GameLanguageOption.jsx";
import SplashScreenLogos from "./react_components/SplashScreenLogos.jsx";
import OpeningIntro from "./react_components/OpeningIntro.jsx";
import TitleScreen from "./react_components/TitleScreen.jsx";
import PracticeBattleComp from "./react_components/PracticeBattle.jsx";

function App() {
    const gameSceneArr = [
        <GameBootScreen />,
        <LoadingScreen />,
        <GameLanguageOption />,
        <SplashScreenLogos />,
        <OpeningIntro />,
        <LoadingScreen />,
        <TitleScreen />,
        <PracticeBattleComp />,
    ];

    const [gameStateArr, setGameState] = useState(0);
    const [gameSceneTracker, setGameSceneTracker] = useState(0);

    const sceneSkipStateStore = useSceneSkipStateStore(
        (state) => state.sceneSkipStateStore
    );
    const setSceneSkipStateFalse = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateFalse
    );

    const skipToIntroStateStore = useSkipToIntroStateStore(
        (state) => state.skipToIntroStateStore
    );
    const setSkipToIntroStateFalse = useSkipToIntroStateStore(
        (state) => state.setSkipToIntroStateFalse
    );

    const quitGameStateStore = useQuitGameStateStore(
        (state) => state.quitGameStateStore
    );
    const setQuitGameStateFalse = useQuitGameStateStore(
        (state) => state.setQuitGameStateFalse
    );

    useEffect(() => {
        switch (gameStateArr) {
            case 0:
                if (gameSceneTracker === 1) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 1:
                if (gameSceneTracker === 2) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 2:
                if (gameSceneTracker === 3) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 3:
                if (gameSceneTracker === 4) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 4:
                if (gameSceneTracker === 5) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 5:
                if (gameSceneTracker === 6) {
                    setGameState((prevState) => prevState + 1);
                }
                break;
            case 6:
                if (gameSceneTracker === 4) {
                    setGameState((prevState) => prevState - 2);
                } else if (gameSceneTracker === 0) {
                    setGameState((prevState) => prevState - 6);
                } else {
                    setGameState((prevState) => prevState + 1);
                }
                break;
        }
    }, [gameSceneTracker]);

    useEffect(() => {
        if (sceneSkipStateStore) {
            setGameSceneTracker((prevScene) => prevScene + 1);
            setSceneSkipStateFalse();
        }
    }, [sceneSkipStateStore]);

    useEffect(() => {
        if (skipToIntroStateStore) {
            setGameSceneTracker((prevScene) => prevScene - 2);
            setSkipToIntroStateFalse();
        }
    }, [skipToIntroStateStore]);

    useEffect(() => {
        if (quitGameStateStore) {
            setGameSceneTracker((prevScene) => prevScene - 6);
            setQuitGameStateFalse();
        }
    }, [quitGameStateStore]);

    return <>{gameSceneArr[gameStateArr]}</>;
}

export default App;
