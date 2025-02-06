import {useEffect, useState} from "react";

import "./SplashScreenLogos.css";

import bng from "../assets/splash_screen/bng.png";
import cc2 from "../assets/splash_screen/cc2.png";
import criware from "../assets/splash_screen/criware.png";

import {useSceneSkipStateStore} from "../zustand/GameStateStore";

function SplashScreenLogos() {
    const logoArr = [bng, cc2, criware];
    const cssArr = ["logo-fade-in4", "logo-stay4", "logo-fade-out4"];

    const [logoState, setLogoState] = useState(0);
    const [cssState, setCssState] = useState(0);

    const setSceneSkipStateTrue = useSceneSkipStateStore(
        (state) => state.setSceneSkipStateTrue
    );

    useEffect(() => {
        const intervalId = setInterval(
            () => {
                if (logoState === 2 && cssState === 2) {
                    clearInterval(intervalId);
                    setSceneSkipStateTrue();
                } else {
                    setCssState((prevCssState) => {
                        if (prevCssState === cssArr.length - 1) {
                            setLogoState((prevLogoState) => {
                                if (prevLogoState === logoArr.length - 1) {
                                    return prevLogoState;
                                } else {
                                    return prevLogoState + 1;
                                }
                            });

                            return 0;
                        } else {
                            return prevCssState + 1;
                        }
                    });
                }
            },
            cssState === 1 ? 3000 : 500
        );

        return () => {
            clearInterval(intervalId);
        };
    }, [cssState]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" && cssState === 1) {
                setCssState((prevCssState) => prevCssState + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [cssState]);

    return (
        <div className="splash-logos-container4">
            <img
                className={cssArr[cssState]}
                src={logoArr[logoState]}
                draggable="false"
            ></img>
        </div>
    );
}

export default SplashScreenLogos;
export {bng, cc2, criware};
