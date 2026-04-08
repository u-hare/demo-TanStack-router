import type { default as zhCN } from "../json/zh-CN.json";

/**
 * 全局
 */
declare global {
	namespace FormatjsIntl {
		interface Message {
			ids: keyof typeof zhCN;
		}
	}
}
