import { atom } from "jotai";

/**
 * 语言
 * @default navigator.language
 */
export const language = atom(navigator.language);
