import { createIntl } from "react-intl";
import { Atom, store } from "#/store";
import { default as en } from "./json/en.json";
import { default as zhCN } from "./json/zh-CN.json";

/**
 * 语言资源
 */
export const messages: Record<string, typeof zhCN> = {
	en,
	"zh-CN": zhCN,
};
/**
 * 获取intl实例
 */
export function getIntl() {
	const language = store.get(Atom.language);

	return createIntl({
		locale: language,
		messages: messages[language],
	});
}
