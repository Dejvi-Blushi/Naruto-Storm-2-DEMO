import {useEffect} from "react";

import {
    back_key,
    title_logo,
    title_diamond,
    title_panel,
    title_copyright,
} from "./TitleScreen.jsx";

import select_bar2 from "../assets/title_screen/select_bar_effect2.png";

import title_option from "../assets/title_screen/title_option.png";

import title_option2 from "../assets/title_screen/title_option2.png";

function LoadingScreen2() {
    const preloadTitleScreen = [
        title_logo,
        title_diamond,
        title_panel,
        title_copyright,
        back_key,
        select_bar2,
        title_option,
        title_option2,
    ];

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
            preloadTitleScreen.map((image) => CacheTextures(image))
        ).catch((error) => console.error("Error preloading images:", error));
    }, []);

    return null;
}

export default LoadingScreen2;
