import { atom } from "jotai";

/**
 * 语言
 * @default navigator.language
 */
export const language = atom(navigator.language);
/**
 * 切换语言
 */
export const switchLanguage = atom(language, (get, set) => {
	const _lang = get(language);

	set(language, _lang === "zh-CN" ? "en" : "zh-CN");
});
