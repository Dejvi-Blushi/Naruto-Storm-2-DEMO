import {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import SasukePTS from "../r3f/SasukePTS.jsx";
import SasukeHebi from "../r3f/SasukeHebi.jsx";
import SasukeTaka from "../r3f/SasukeTaka.jsx";

import NarutoPTS from "../r3f/NarutoPTS.jsx";
import NarutoS2 from "../r3f/NarutoS2.jsx";
import NarutoSage from "../r3f/NarutoSage.jsx";

import "./PracticeBattle.css";

import mouse_right from "../assets/key_window/mouse_right.png";
import mouse_left from "../assets/key_window/mouse_left.png";
import mouse_wheel from "../assets/key_window/mouse_wheel.png";
import m_key from "../assets/key_window/m_key.png";

import practice_bgm from "../assets/bgm/practice_bgm.wav";

function PracticeBattleComp() {
    const [isMuted, setIsMuted] = useState(false);
    const [keyPressed, setKeyPressed] = useState(true);

    const practiceBgmRef = useRef(null);

    useEffect(() => {
        const musicLoop = () => {
            practiceBgmRef.current.currentTime = 28;
            practiceBgmRef.current.play();
        };

        practiceBgmRef.current.addEventListener("ended", musicLoop);

        return () =>
            practiceBgmRef.current.removeEventListener("ended", musicLoop);
    }, []);

    useEffect(() => {
        const handleMuteToggleDown = (event) => {
            if (keyPressed) {
                if (event.key === "m" || event.key === "M") {
                    if (!isMuted) {
                        const intervalId = setInterval(() => {
                            if (practiceBgmRef.current.volume != 0)
                                practiceBgmRef.current.volume -= 0.03125;
                            else {
                                setIsMuted((prevState) => !prevState);
                                clearInterval(intervalId);
                            }
                        }, 10);
                    } else {
                        const intervalId = setInterval(() => {
                            if (practiceBgmRef.current.volume != 1)
                                practiceBgmRef.current.volume += 0.03125;
                            else {
                                setIsMuted((prevState) => !prevState);
                                clearInterval(intervalId);
                            }
                        }, 10);
                    }

                    setKeyPressed((prevState) => !prevState);
                }
            }
        };

        const handleMuteToggleUp = () => {
            setKeyPressed((prevState) => !prevState);
        };

        window.addEventListener("keydown", handleMuteToggleDown);
        window.addEventListener("keyup", handleMuteToggleUp);

        return () => {
            window.removeEventListener("keydown", handleMuteToggleDown);
            window.removeEventListener("keyup", handleMuteToggleUp);
        };
    }, [isMuted, keyPressed]);

    return (
        <>
            <div className="scene-fadein6"></div>
            <div className="ui-container6">
                <div className="parctice-bar-container6">
                    <div className="mouse-left-container6">
                        <img
                            src={mouse_left}
                            className="key-all6"
                            draggable="false"
                        />
                        <div>Rotate Camera</div>
                    </div>
                    <div className="mouse-right-container6">
                        <img
                            src={mouse_right}
                            className="key-all6"
                            draggable="false"
                        />
                        <div>Move Camera</div>
                    </div>
                    <div className="mouse-wheel-container6">
                        <img
                            src={mouse_wheel}
                            className="key-all6"
                            draggable="false"
                        />
                        <div>Zoom Camera</div>
                    </div>
                    <div className="mute-btn-container6">
                        <img
                            src={m_key}
                            className="key-all6_2"
                            draggable="false"
                        />
                        <div>Toggle BGM On/Off</div>
                    </div>
                </div>
            </div>
            <div className="audio-container6">
                <audio
                    ref={practiceBgmRef}
                    src={practice_bgm}
                    autoPlay
                    type="audio/wav"
                />
            </div>
            <Canvas
                camera={{
                    makeDefault: true,
                    far: 10000,
                    near: 0.1,
                    fov: 22.895,
                    position: [0, 1.4, 4.6],
                    rotation: [-0.087, 0, 0],
                }}
                flat
            >
                <NarutoSage position={[0.75, 0, 0]} />
                <NarutoS2 position={[2.25, 0, 0]} />
                <NarutoPTS position={[3.75, 0, 0]} />
                <SasukeTaka position={[-0.75, 0, 0]} />
                <SasukeHebi position={[-2.25, 0, 0]} />
                <SasukePTS position={[-3.75, 0, 0]} />
                <OrbitControls target={[0, 0.85, 0]} />
                <gridHelper />
            </Canvas>
        </>
    );
}

export default PracticeBattleComp;
