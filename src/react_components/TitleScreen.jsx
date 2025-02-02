import {useEffect, useRef, useState} from "react";
import {
    useSkipToIntroStateStore,
    useQuitGameStateStore,
    useSceneSkipStateStore,
} from "../zustand/GameStateStore.jsx";
import {Canvas} from "@react-three/fiber";
import {EffectComposer, Bloom} from "@react-three/postprocessing";

import "./TitleScreen.css";

import Sky from "../r3f/TitleSkyMesh.jsx";

import title_logo from "../assets/title_screen/title_logo.png";
import title_diamond from "../assets/title_screen/title_diamond.png";
import title_panel from "../assets/title_screen/title_panel.png";
import title_copyright from "../assets/title_screen/title_copyright.png";
import back_key from "../assets/key_window/back_key.png";
import enter_key from "../assets/key_window/enter_key.png";
import w_key from "../assets/key_window/w_key.png";
import s_key from "../assets/key_window/s_key.png";

import menu_mode_select from "../assets/sfx/menu_mode_select.wav";
import menu_cancel from "../assets/sfx/menu_cancel.wav";
import menu_option from "../assets/sfx/menu_option.wav";
import menu_option_select from "../assets/sfx/menu_option_select.wav";
import menu_window_popup from "../assets/sfx/menu_window_popup.wav";

import title_bgm1 from "../assets/bgm/title_bgm1.wav";
import title_bgm2 from "../assets/bgm/title_bgm2.wav";

function TitleScreen() {
    const [anyKeyPressed, setAnyKeyPressed] = useState(false);
    const [enterKeyPressed, setEnterKeyPressed] = useState(false);
    const [backKeyPressed, setBackKeyPressed] = useState(false);

    const [selectBarToggle, setSelectBarToggle] = useState(false);
    const [keyPressed, setKeyPressed] = useState(true);

    const titleBgm1Ref = useRef(null);
    const titleBgm2Ref = useRef(null);

    const menuModeSelectSfxRef = useRef(null);
    const menuCancelSfxRef = useRef(null);
    const menuOptionSfxRef = useRef(null);
    const menuOptionSelectSfxRef = useRef(null);
    const menuWindowPopoutSfxRef = useRef(null);

    const isSelectBarSpawned = useRef(false);

    const setSkipToIntroStateTrue = useSkipToIntroStateStore(
        (state) => state.setSkipToIntroStateTrue
    );

    const setQuitGameStateTrue = useQuitGameStateStore(
        (state) => state.setQuitGameStateTrue
    );

    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    useEffect(() => {
        if (!enterKeyPressed && !backKeyPressed) {
            const timeoutId = setTimeout(() => {
                setAnyKeyPressed(true);

                const timeoutId = setTimeout(() => {
                    setSkipToIntroStateTrue();
                }, 1900);

                return () => clearTimeout(timeoutId);
            }, 61260);

            return () => clearTimeout(timeoutId);
        }
    }, [enterKeyPressed, backKeyPressed]);

    useEffect(() => {
        const handleBackKeyDown = (event) => {
            if (
                event.key === "Backspace" &&
                !enterKeyPressed &&
                !anyKeyPressed
            ) {
                setBackKeyPressed((prevState) => !prevState);

                if (!menuCancelSfxRef.paused) {
                    menuCancelSfxRef.current.pause;
                    menuCancelSfxRef.current.currentTime = 0;
                }

                menuCancelSfxRef.current.play();
            }
        };

        window.addEventListener("keydown", handleBackKeyDown);

        return () => {
            window.removeEventListener("keydown", handleBackKeyDown);
        };
    }, [enterKeyPressed, anyKeyPressed]);

    useEffect(() => {
        if (!anyKeyPressed) {
            if (backKeyPressed) {
                const handleKeyDown = (event) => {
                    if (keyPressed) {
                        if (
                            event.key === "w" ||
                            event.key === "s" ||
                            event.key === "W" ||
                            event.key === "S"
                        ) {
                            if (!menuOptionSfxRef.paused) {
                                menuOptionSfxRef.current.pause;
                                menuOptionSfxRef.current.currentTime = 0;
                            }

                            menuOptionSfxRef.current.play();
                            setKeyPressed((prevToggle) => !prevToggle);
                            setSelectBarToggle((prevBar) => !prevBar);
                            isSelectBarSpawned.current = true;
                        }
                    }
                };

                const handleKeyUp = () => {
                    setKeyPressed((prevToggle) => !prevToggle);
                };

                window.addEventListener("keydown", handleKeyDown);
                window.addEventListener("keyup", handleKeyUp);

                const handleQuitGame = (event) => {
                    if (event.key === "Enter") {
                        if (!menuOptionSelectSfxRef.paused) {
                            menuOptionSelectSfxRef.current.pause;
                            menuOptionSelectSfxRef.current.currentTime = 0;
                        }

                        menuOptionSelectSfxRef.current.play();

                        if (selectBarToggle) {
                            setAnyKeyPressed(true);

                            const timeoutId = setTimeout(() => {
                                setQuitGameStateTrue();
                            }, 1900);

                            return () => clearTimeout(timeoutId);
                        } else {
                            setBackKeyPressed((prevState) => !prevState);
                        }
                    }
                };

                window.addEventListener("keydown", handleQuitGame);

                return () => {
                    window.removeEventListener("keydown", handleKeyDown);
                    window.removeEventListener("keydown", handleQuitGame);
                    window.removeEventListener("keyup", handleKeyUp);
                };
            } else {
                setSelectBarToggle(false);
                isSelectBarSpawned.current = false;
            }
        }
    }, [backKeyPressed, keyPressed]);

    useEffect(() => {
        const handleEnterKeyDown = (event) => {
            if (!anyKeyPressed && !backKeyPressed) {
                if (event.key === "Enter" && !enterKeyPressed) {
                    setEnterKeyPressed(true);

                    menuModeSelectSfxRef.current.play();

                    const intervalId = setInterval(() => {
                        if (titleBgm2Ref.current.volume != 1) {
                            titleBgm2Ref.current.volume += 0.03125;
                        } else {
                            clearInterval(intervalId);
                        }
                    }, 50);

                    const timeoutId = setTimeout(() => {
                        menuWindowPopoutSfxRef.current.play();
                    }, 700);

                    const timeoutId2 = setTimeout(() => {
                        setAnyKeyPressed(true);
                    }, 3000);

                    const timetoutId3 = setTimeout(() => {
                        setSceneSkipStateTrue();
                    }, 4900);

                    return () => {
                        clearTimeout(timeoutId);
                        clearTimeout(timeoutId2);
                        clearTimeout(timetoutId3);
                    };
                }
            }
        };

        window.addEventListener("keydown", handleEnterKeyDown);

        return () => {
            window.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, [anyKeyPressed, backKeyPressed, enterKeyPressed]);

    useEffect(() => {
        titleBgm2Ref.current.volume = 0;
    }, []);

    return (
        <>
            <div className="scene-fade-in5"></div>
            {anyKeyPressed && <div className="scene-fade-out5"></div>}
            <div className="main-ui-container5">
                <div className="logo-containers5">
                    <div className="title-logo5">
                        <img src={title_logo} draggable="false" />
                    </div>
                    <div className="title-panel-container5">
                        <img
                            src={title_panel}
                            draggable="false"
                            className={
                                enterKeyPressed
                                    ? "panel-text-fadeout5"
                                    : "panel-text5"
                            }
                        ></img>
                        <img
                            src={title_diamond}
                            draggable="false"
                            className={
                                enterKeyPressed
                                    ? "panel-diamond-fadeout5"
                                    : "panel-diamond5"
                            }
                        />
                    </div>
                    <div className="title-copyright5">
                        <img src={title_copyright} draggable="false" />
                    </div>
                </div>
                {enterKeyPressed ||
                    (!anyKeyPressed && (
                        <>
                            {backKeyPressed ? (
                                <div className="back-button-bar-container5">
                                    <div className="confirm-btn-container5">
                                        <img
                                            src={enter_key}
                                            className="key-all5"
                                            draggable="false"
                                        />
                                        <div>Confirm</div>
                                    </div>
                                    <div className="back-btn-container5">
                                        <img
                                            src={back_key}
                                            className="key-all5"
                                            draggable="false"
                                        />
                                        <div>Back</div>
                                    </div>
                                    <div className="down-btn-container5">
                                        <img
                                            src={w_key}
                                            className="key-all5"
                                            draggable="false"
                                        />
                                        <div>Up</div>
                                    </div>
                                    <div className="up-btn-container5">
                                        <img
                                            src={s_key}
                                            className="key-all5"
                                            draggable="false"
                                        />
                                        <div>Down</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="button-bar-container5">
                                    <div className="quit-btn-container5">
                                        <img
                                            src={back_key}
                                            className="key-all5"
                                        />
                                        <div>Quit Game</div>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
            </div>
            {backKeyPressed && (
                <div className="ui-option-backspace-container5">
                    <div className="ui-option-backspace5">
                        <div className="quit-option-label5">
                            Do you really want to quit?
                        </div>
                        <div className="quit-option-select5">
                            <div
                                data-text="Yes"
                                className={
                                    !selectBarToggle
                                        ? "quit-option-wo-effect5"
                                        : "quit-option5"
                                }
                            >
                                Yes
                            </div>
                            <div
                                data-text="No"
                                className={
                                    selectBarToggle
                                        ? "quit-option-wo-effect5"
                                        : "quit-option5"
                                }
                            >
                                No
                            </div>
                            <div
                                className={(() => {
                                    if (isSelectBarSpawned.current) {
                                        return !selectBarToggle
                                            ? "select-bar-effect-down5"
                                            : "select-bar-effect-up5";
                                    } else {
                                        return "select-bar-effect5";
                                    }
                                })()}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            {enterKeyPressed && (
                <div className="ui-option-enter-container5">
                    <div className="ui-option-enter5">
                        Loading Model Viewer...
                    </div>
                </div>
            )}
            <div className="audio-container5" hidden={true}>
                <div className="bgm-container5">
                    <audio
                        ref={titleBgm1Ref}
                        src={title_bgm1}
                        autoPlay
                        type="audio/wav"
                        loop
                    />
                    <audio
                        ref={titleBgm2Ref}
                        src={title_bgm2}
                        autoPlay
                        type="audio/wav"
                        loop
                    />
                </div>
                <div className="sfx-container5">
                    <audio
                        ref={menuModeSelectSfxRef}
                        src={menu_mode_select}
                        type="audio/wav"
                    />
                    <audio
                        ref={menuCancelSfxRef}
                        src={menu_cancel}
                        type="audio/wav"
                    />
                    <audio
                        src={menu_option}
                        ref={menuOptionSfxRef}
                        type="audio/wav"
                    />
                    <audio
                        src={menu_option_select}
                        ref={menuOptionSelectSfxRef}
                        type="audio/wav"
                    />
                    <audio
                        src={menu_window_popup}
                        ref={menuWindowPopoutSfxRef}
                        type="audio/wav"
                    />
                </div>
            </div>
            <Canvas flat>
                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={1} />
                </EffectComposer>
                <Sky />
            </Canvas>
        </>
    );
}

export default TitleScreen;
