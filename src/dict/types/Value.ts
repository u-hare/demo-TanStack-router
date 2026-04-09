import type { MessageDescriptor } from "react-intl";

/**
 * 基础字典数据
 */
type BaseData = {
	/**
	 * 标签
	 */
	label: string;
	/**
	 * 值
	 */
	value: string;
	/**
	 * 是否禁用
	 */
	disabled?: boolean;
};
/**
 * 可翻译字典数据
 */
interface TranslateDataextends extends BaseData {
	label: NonNullable<MessageDescriptor["id"]>;
	/**
	 * 是否翻译
	 */
	translate?: boolean;
}
/**
 * 字典数据
 */
export type Value = TranslateDataextends | BaseData;
