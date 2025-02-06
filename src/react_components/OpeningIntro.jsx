import {useEffect, useRef} from "react";

import opening from "../assets/opening_intro/opening.mp4";

import opening_bgm from "../assets/opening_intro/opening_bgm.wav";
import opening_en from "../assets/opening_intro/opening_en.wav";
import opening_jp from "../assets/opening_intro/opening_jp.wav";

import {
    useSceneSkipStateStore,
    useIsEnglishStore,
} from "../zustand/GameStateStore";

function OpeningIntro() {
    const openingRef = useRef(null);
    const openingBgmRef = useRef(null);

    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    const isEnglishStore = useIsEnglishStore((state) => state.isEnglishStore);

    useEffect(() => {
        const handleSkip = (event) => {
            if (event.key === "Enter" && openingRef.current.currentTime >= 1) {
                setSceneSkipStateTrue();
            }
        };

        const timeoutId = setTimeout(() => {
            openingBgmRef.current.play();
        }, 19500);

        openingRef.current.onended = setSceneSkipStateTrue;

        window.addEventListener("keydown", handleSkip);

        return () => {
            window.removeEventListener("keydown", handleSkip);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <video
                ref={openingRef}
                src={opening}
                type="video/mp4"
                width="1920px"
                height="1080px"
                autoPlay
                disablePictureInPicture
            />
            <audio
                src={isEnglishStore ? opening_en : opening_jp}
                autoPlay
                type="audio/wav"
            />
            <audio src={opening_bgm} ref={openingBgmRef} type="audio/wav" />
        </>
    );
}

export default OpeningIntro;

export {opening, opening_bgm, opening_en, opening_jp};
