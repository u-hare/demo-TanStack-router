import type { Value } from "./Value";

export type { Value } from "./Value";
/**
 * 获取字典数据
 */
export type GetValue = (...args: unknown[]) => Promise<Value[]>;
/**
 * 字典接口
 */
export interface IDict {
	/**
	 * 模拟数据
	 */
	_demo(): Promise<Value[]>;
}
