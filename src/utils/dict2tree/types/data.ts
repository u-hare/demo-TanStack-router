/**
 * 树节点接口
 */
export interface TreeNode<T> {
	/** 节点ID */
	id: string | number;
	/** 子节点列表 */
	children?: TreeNode<T>[];
	/** 其他自定义属性 */
	[key: string]: any;
}

/**
 * 转换配置选项
 */
export interface TreeConvertOptions {
	/** id字段名，默认 'id' */
	idKey?: string;
	/** parentId字段名，默认 'parentId' */
	parentIdKey?: string;
	/** children字段名，默认 'children' */
	childrenKey?: string;
	/** 根节点的parentId值，默认 null */
	rootValue?: string | number | null;
}

/**
 * 高级转换配置选项
 */
export interface AdvancedTreeConvertOptions<T> extends TreeConvertOptions {
	/** 排序字段 */
	sortKey?: string;
	/** 排序顺序 */
	sortOrder?: "asc" | "desc";
	/** 过滤函数 */
	filter?: (item: T) => boolean;
	/** 是否保留没有子节点的父节点，默认 true */
	preserveEmptyParents?: boolean;
	/** 是否移除空的children数组，默认 false */
	removeEmptyChildren?: boolean;
}
