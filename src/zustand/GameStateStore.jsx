import {create} from "zustand";

export const useSceneSkipStateStore = create((set) => ({
    sceneSkipStateStore: false,
    setSceneSkipStateTrue: () => set((state) => ({sceneSkipStateStore: true})),
    setSceneSkipStateFalse: () =>
        set((state) => ({sceneSkipStateStore: false})),
}));

export const useSkipToIntroStateStore = create((set) => ({
    skipToIntroStateStore: false,
    setSkipToIntroStateTrue: () =>
        set((state) => ({skipToIntroStateStore: true})),
    setSkipToIntroStateFalse: () =>
        set((state) => ({skipToIntroStateStore: false})),
}));

export const useQuitGameStateStore = create((set) => ({
    quitGameStateStore: false,
    setQuitGameStateTrue: () => set((state) => ({quitGameStateStore: true})),
    setQuitGameStateFalse: () => set((state) => ({quitGameStateStore: false})),
}));

export const useIsEnglishStore = create((set) => ({
    isEnglishStore: true,
    setIsEnglishStoreTrue: () => set((state) => ({isEnglishStore: true})),
    setIsEnglishStoreFalse: () => set((state) => ({isEnglishStore: false})),
}));
