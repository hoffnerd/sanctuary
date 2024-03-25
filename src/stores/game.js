"use client"

import { create } from 'zustand'



export const useMobileStore = create((set) => ({
    panelOpen: "main",
    navBadge_main: 0,
    navBadge_stats: 1,
    navBadge_inventory: 0,
    setPanelOpen: (panelOpen) => set(() => ({ panelOpen })),
    setNavBadge_main: (navBadge_main) => set(() => ({ navBadge_main })),
    setNavBadge_stats: (navBadge_stats) => set(() => ({ navBadge_stats })),
    setNavBadge_inventory: (navBadge_inventory) => set(() => ({ navBadge_inventory })),
}))


export const useDebugModeStore = create((set) => ({
    debugMode: false,
    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
}))



export const useGameSavingStore = create((set) => ({
    gameSaving: false,
    setGameSaving: (gameSaving) => set(() => ({ gameSaving })),
    toggleGameSaving: () => set((state) => ({ gameSaving: !state.gameSaving })),
}))



export const useInGameTimeStore = create((set) => ({
    inGameTime: 0,
    lastSavedTime: 0,
    setInGameTime: (inGameTime) => set(() => ({ inGameTime })),
    setLastSavedTime: (lastSavedTime) => set(() => ({ lastSavedTime })),
}))



export const useResourceStore = create((set) => ({
    e: 0,
    w: 0,
    t: 0,
    q: 0,
    setResource: (key, amount) => set(() => ({ [key]: amount })),
    alterResource: (key, amount) => set((state) => ({ [key]: state[key] + amount })),
}))



const defaultFullScreenDialogStoreState = { 
    isOpen: false,
    isFullScreen: true,
    isBorderNeon: true,
    isTextNeon: true,
    neonColor:"blue",
    className:"",
    title: null,
    description: null,
    content: null,
    closeButtonText: "Close",
    extraCloseFunction: () => {  return; }
}
export const useFullScreenDialogStore = create((set) => ({
    ...defaultFullScreenDialogStoreState,
    toggleIsOpen: () => set((state) => ({ open: !state.open })),
    setDialog: (state) => set(() => ({ ...state })),
    resetDialog: () => set(() => ({ ...defaultFullScreenDialogStoreState })),
}))