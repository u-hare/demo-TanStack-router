import { default as en } from "./json/en.json";
import { default as zhCN } from "./json/zh-CN.json";

/**
 * 语言资源
 */
export const messages: Record<string, typeof zhCN> = {
	en,
	"zh-CN": zhCN,
};
