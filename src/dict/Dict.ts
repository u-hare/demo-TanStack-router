import { DictDecorator } from "./decorator";
import type { DictType } from "./types";

/**
 * 字典
 */
export class Dict implements DictType.IDict {
	@DictDecorator.Translate
	async _demo(): Promise<DictType.Value[]> {
		return [
			{
				label: "你好",
				translate: true,
				value: "1",
			},
			{
				label: "66",
				value: "7",
			},
		];
	}
}
