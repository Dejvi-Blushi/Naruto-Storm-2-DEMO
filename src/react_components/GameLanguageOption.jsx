import {useState, useEffect, useRef} from "react";

import "./GameLanguageOption.css";

import enter_key from "../assets/key_window/enter_key.png";
import w_key from "../assets/key_window/w_key.png";
import s_key from "../assets/key_window/s_key.png";

import menu_option from "../assets/sfx/menu_option.wav";
import menu_option_select from "../assets/sfx/menu_option_select.wav";

import {
    useSceneSkipStateStore,
    useIsEnglishStore,
} from "../zustand/GameStateStore.jsx";

function GameLanguageOption() {
    const [selectBarToggle, setSelectBarToggle] = useState(false);
    const [keyPressed, setKeyPressed] = useState(true);

    const menuOptionAudioRef = useRef(null);
    const menuOptionSelectAudioRef = useRef(null);
    const sceneFadeoutRef = useRef(null);

    const isSelectBarSpawned = useRef(false);
    const isTimeoutActive = useRef(false);

    const setIsEnglishStoreTrue = useIsEnglishStore(
        (state) => state.setIsEnglishStoreTrue
    );

    const setIsEnglishStoreFalse = useIsEnglishStore(
        (state) => state.setIsEnglishStoreFalse
    );

    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (keyPressed && !isTimeoutActive.current) {
                if (
                    event.key === "w" ||
                    event.key === "s" ||
                    event.key === "W" ||
                    event.key === "S"
                ) {
                    if (!isSelectBarSpawned.current) {
                        isSelectBarSpawned.current = true;
                    }
                    if (!menuOptionAudioRef.paused) {
                        menuOptionAudioRef.current.pause;
                        menuOptionAudioRef.current.currentTime = 0;
                    }
                    menuOptionAudioRef.current.play();
                    setKeyPressed((prevToggle) => !prevToggle);
                    setSelectBarToggle((prevBar) => !prevBar);
                }
            }
        };

        const handleKeyUp = () => {
            setKeyPressed((prevToggle) => !prevToggle);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [keyPressed]);

    useEffect(() => {
        const handleLanguageSelect = (event) => {
            if (event.key === "Enter") {
                menuOptionSelectAudioRef.current.play();

                sceneFadeoutRef.current.className =
                    "language-scene-container-end3";

                if (selectBarToggle) {
                    setIsEnglishStoreFalse();
                } else {
                    setIsEnglishStoreTrue();
                }

                if (!isTimeoutActive.current) {
                    isTimeoutActive.current = true;

                    const timeoutId = setTimeout(() => {
                        setSceneSkipStateTrue();
                    }, 2000);

                    return () => clearTimeout(timeoutId);
                }
            }
        };

        window.addEventListener("keydown", handleLanguageSelect);

        return () => {
            window.removeEventListener("keydown", handleLanguageSelect);
        };
    }, [selectBarToggle]);

    return (
        <div className="language-scene-container3">
            <div className="option-container3">
                <div className="option-label3">Voice Language</div>
                <div className="option-select3">
                    <div
                        className={
                            selectBarToggle
                                ? "language-option-wo-effect3"
                                : "language-option3"
                        }
                        data-text="English"
                    >
                        English
                    </div>
                    <div
                        className={
                            selectBarToggle
                                ? "language-option3"
                                : "language-option-wo-effect3"
                        }
                        data-text="Japanese"
                    >
                        Japanese
                    </div>
                    <div
                        className={(() => {
                            if (isSelectBarSpawned.current) {
                                return selectBarToggle
                                    ? "select-bar-effect-down3"
                                    : "select-bar-effect-up3";
                            } else {
                                return "select-bar-effect3";
                            }
                        })()}
                    ></div>
                </div>
            </div>
            <div className="button-bar-container3">
                <div className="confirm-btn-container3">
                    <img
                        src={enter_key}
                        className="key-all3"
                        draggable="false"
                    />
                    <div>Confirm</div>
                </div>
                <div className="down-btn-container3">
                    <img src={w_key} className="key-all3" draggable="false" />
                    <div>Up</div>
                </div>
                <div className="up-btn-container3">
                    <img src={s_key} className="key-all3" draggable="false" />
                    <div>Down</div>
                </div>
            </div>
            <div ref={sceneFadeoutRef} className=""></div>
            <div className="audio-container3">
                <audio
                    src={menu_option}
                    ref={menuOptionAudioRef}
                    type="audio/wav"
                />
                <audio
                    src={menu_option_select}
                    ref={menuOptionSelectAudioRef}
                    type="audio/wav"
                />
            </div>
        </div>
    );
}
export default GameLanguageOption;
