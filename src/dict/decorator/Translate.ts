import { I18n } from "#/i18n";
import type { DictType } from "../types";

/**
 * 翻译字典数据
 * @param data 数据
 * @returns 翻译后的数据
 */
function _translate(data: DictType.Value[]): DictType.Value[] {
	const { formatMessage } = I18n.getIntl();

	return data.map((item) => {
		if ("translate" in item && item.translate) {
			return {
				...item,
				label: formatMessage({ id: item.label }),
			};
		}

		return item;
	});
}
/**
 * 翻译字典数据装饰器
 * @param _ 类
 * @param __ 方法名
 * @param descriptor 方法描述符
 * @returns 方法描述符
 */
export function Translate(
	_: unknown,
	__: string,
	descriptor: PropertyDescriptor,
) {
	const originalMethod: DictType.GetValue = descriptor.value;
	descriptor.value = async function (...args: unknown[]) {
		const result = await originalMethod.apply(this, args);

		return _translate(result);
	};
}
