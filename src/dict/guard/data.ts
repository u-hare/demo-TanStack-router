import * as Dict from "../data";

/**
 * 检查是否为字典键
 * @param key 键
 * @returns 是否为字典键
 */
export function dictKey(key: string): key is keyof typeof Dict {
	return key in Dict;
}
