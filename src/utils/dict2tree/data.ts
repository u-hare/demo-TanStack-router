import type { Dict2treeType } from "./types";

/**
 * 树结构转换工具函数
 * 将一维数组转换为树结构数组
 *
 * @example
 * const flatData = [
 *   { id: 1, name: 'Node 1', parentId: null },
 *   { id: 2, name: 'Node 1-1', parentId: 1 },
 *   { id: 3, name: 'Node 1-2', parentId: 1 }
 * ]
 * const tree = arrayToTree(flatData)
 */

// ==================== 工具函数 ====================

/**
 * 将一维数组转换为树结构数组（基础版本）
 *
 * @param items 一维数组数据
 * @param options 转换配置选项
 * @returns 树结构数组
 *
 * @example
 * const data = [
 *   { id: 1, name: '中国', parentId: null },
 *   { id: 2, name: '北京', parentId: 1 },
 *   { id: 3, name: '上海', parentId: 1 }
 * ]
 * const tree = arrayToTree(data)
 * // 结果: [{ id: 1, name: '中国', children: [{ id: 2, name: '北京' }, { id: 3, name: '上海' }] }]
 */
export function arrayToTree<T extends Record<string, any>>(
	items: T[],
	options: Dict2treeType.TreeConvertOptions = {},
): Dict2treeType.TreeNode<T>[] {
	if (!Array.isArray(items) || items.length === 0) {
		return [];
	}

	const {
		idKey = "id",
		parentIdKey = "parentId",
		childrenKey = "children",
		rootValue = null,
	} = options;

	// 创建映射表，用于快速查找节点
	const map = new Map<string | number, Dict2treeType.TreeNode<T>>();
	const tree: Dict2treeType.TreeNode<T>[] = [];

	// 第一遍遍历：初始化所有节点
	for (const item of items) {
		const node = {
			...item,
			[childrenKey]: [],
		} as unknown as Dict2treeType.TreeNode<T>;
		map.set(node[idKey], node);
	}

	// 第二遍遍历：构建树结构
	for (const item of items) {
		const node = map.get(item[idKey])!;
		const parentId = item[parentIdKey];

		// 判断是否为根节点
		if (parentId === rootValue || parentId === undefined || parentId === null) {
			tree.push(node);
		} else {
			// 作为子节点添加到父节点
			const parent = map.get(parentId);
			if (parent) {
				parent[childrenKey] = parent[childrenKey] || [];
				parent[childrenKey].push(node);
			} else {
				// 父节点不存在时作为根节点处理
				console.warn(
					`[arrayToTree] 找不到父节点: ${parentId}, 节点ID: ${item[idKey]}`,
				);
				tree.push(node);
			}
		}
	}

	// 可选：移除空的children数组
	const removeEmptyChildren = (
		nodes: Dict2treeType.TreeNode<T>[],
	): Dict2treeType.TreeNode<T>[] => {
		return nodes.map<Dict2treeType.TreeNode<T>>((node) => {
			if (node[childrenKey] && node[childrenKey].length === 0) {
				const { [childrenKey]: _, ...rest } = node;
				return { id: node[idKey], ...rest };
			}
			if (node[childrenKey]) {
				node[childrenKey] = removeEmptyChildren(node[childrenKey]);
			}
			return node;
		});
	};

	return removeEmptyChildren(tree);
}

/**
 * 将一维数组转换为树结构数组（高级版本，支持排序、过滤等）
 *
 * @param items 一维数组数据
 * @param options 高级转换配置选项
 * @returns 树结构数组
 *
 * @example
 * const data = [
 *   { id: 1, name: '中国', parentId: null, order: 2 },
 *   { id: 2, name: '北京', parentId: 1, order: 1 },
 *   { id: 3, name: '上海', parentId: 1, order: 2 }
 * ]
 * const tree = arrayToTreeAdvanced(data, {
 *   sortKey: 'order',
 *   sortOrder: 'asc',
 *   filter: (item) => item.name !== '北京'
 * })
 */
export function arrayToTreeAdvanced<T extends Record<string, any>>(
	items: T[],
	options: Dict2treeType.AdvancedTreeConvertOptions<T> = {},
): Dict2treeType.TreeNode<T>[] {
	if (!Array.isArray(items) || items.length === 0) {
		return [];
	}

	const {
		idKey = "id",
		parentIdKey = "parentId",
		childrenKey = "children",
		rootValue = null,
		sortKey,
		sortOrder = "asc",
		filter,
		preserveEmptyParents = true,
		removeEmptyChildren = false,
	} = options;

	// 应用过滤
	const processedItems = filter ? items.filter(filter) : [...items];

	// 创建映射表
	const map = new Map<string | number, Dict2treeType.TreeNode<T>>();

	// 初始化所有节点
	for (const item of processedItems) {
		const node = {
			...item,
			[childrenKey]: [],
		} as unknown as Dict2treeType.TreeNode<T>;
		map.set(node[idKey], node);
	}

	const tree: Dict2treeType.TreeNode<T>[] = [];

	// 构建树结构
	for (const item of processedItems) {
		const node = map.get(item[idKey])!;
		const parentId = item[parentIdKey];

		if (parentId === rootValue || parentId === undefined || parentId === null) {
			tree.push(node);
		} else {
			const parent = map.get(parentId);
			if (parent) {
				parent[childrenKey] = parent[childrenKey] || [];
				parent[childrenKey].push(node);
			} else if (!preserveEmptyParents) {
				tree.push(node);
			}
		}
	}

	// 递归排序函数
	const sortNodes = (
		nodes: Dict2treeType.TreeNode<T>[],
	): Dict2treeType.TreeNode<T>[] => {
		if (!sortKey) return nodes;

		return [...nodes]
			.map((node) => ({
				...node,
				[childrenKey]: sortNodes(node[childrenKey] || []),
			}))
			.sort((a, b) => {
				const aVal = a[sortKey];
				const bVal = b[sortKey];

				// 处理 undefined 或 null 值
				if (aVal == null && bVal == null) return 0;
				if (aVal == null) return 1;
				if (bVal == null) return -1;

				if (aVal === bVal) return 0;
				const result = aVal > bVal ? 1 : -1;
				return sortOrder === "asc" ? result : -result;
			});
	};

	// 清理空children
	const cleanChildren = (
		nodes: Dict2treeType.TreeNode<T>[],
	): Dict2treeType.TreeNode<T>[] => {
		return nodes
			.map((node) => {
				if (node[childrenKey] && node[childrenKey].length > 0) {
					node[childrenKey] = cleanChildren(node[childrenKey]);
				}
				return node;
			})
			.filter((node) => {
				// 过滤掉空的父节点
				if (!preserveEmptyParents && node[childrenKey]?.length === 0) {
					return false;
				}
				return true;
			})
			.map<Dict2treeType.TreeNode<T>>((node) => {
				// 移除空的children数组
				if (removeEmptyChildren && node[childrenKey]?.length === 0) {
					const { [childrenKey]: _, ...rest } = node;
					return { id: node[idKey], ...rest };
				}
				return node;
			});
	};

	let result = sortNodes(tree);
	result = cleanChildren(result);

	return result;
}

/**
 * 将一维数组转换为树结构数组（性能优化版本，适用于大数据量）
 *
 * @param items 一维数组数据
 * @param options 转换配置选项
 * @returns 树结构数组
 */
export function arrayToTreeOptimized<T extends Record<string, any>>(
	items: T[],
	options: Dict2treeType.TreeConvertOptions = {},
): Dict2treeType.TreeNode<T>[] {
	if (!Array.isArray(items) || items.length === 0) {
		return [];
	}

	const {
		idKey = "id",
		parentIdKey = "parentId",
		childrenKey = "children",
		rootValue = null,
	} = options;

	// 使用普通对象代替 Map，性能更好
	const map: Record<string | number, Dict2treeType.TreeNode<T>> = {};
	const tree: Dict2treeType.TreeNode<T>[] = [];

	// 第一遍遍历：创建所有节点
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		map[item[idKey]] = {
			...item,
			[childrenKey]: [],
		} as unknown as Dict2treeType.TreeNode<T>;
	}

	// 第二遍遍历：构建父子关系
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const node = map[item[idKey]];
		const parentId = item[parentIdKey];

		if (parentId === rootValue || parentId === undefined || parentId === null) {
			tree.push(node);
		} else {
			const parent = map[parentId];
			if (parent) {
				parent[childrenKey].push(node);
			} else {
				// 父节点不存在时作为根节点
				tree.push(node);
			}
		}
	}

	return tree;
}

/**
 * 将树结构数组扁平化为一维数组
 *
 * @param tree 树结构数组
 * @param childrenKey 子节点字段名，默认 'children'
 * @returns 扁平化的一维数组
 *
 * @example
 * const tree = [{ id: 1, children: [{ id: 2 }] }]
 * const flat = treeToArray(tree)
 * // 结果: [{ id: 1 }, { id: 2 }]
 */
export function treeToArray<T extends Record<string, any>>(
	tree: Dict2treeType.TreeNode<T>[],
	childrenKey: string = "children",
): T[] {
	if (!Array.isArray(tree) || tree.length === 0) {
		return [];
	}

	const result: T[] = [];

	const traverse = (nodes: Dict2treeType.TreeNode<T>[]) => {
		for (const node of nodes) {
			const { [childrenKey]: children, ...rest } = node;
			result.push(rest as T);
			if (children && children.length > 0) {
				traverse(children);
			}
		}
	};

	traverse(tree);
	return result;
}

/**
 * 在树结构中查找节点
 *
 * @param tree 树结构数组
 * @param predicate 查找条件函数
 * @param childrenKey 子节点字段名，默认 'children'
 * @returns 找到的节点或 null
 */
export function findNodeInTree<T extends Record<string, any>>(
	tree: Dict2treeType.TreeNode<T>[],
	predicate: (node: Dict2treeType.TreeNode<T>) => boolean,
	childrenKey: string = "children",
): Dict2treeType.TreeNode<T> | null {
	if (!Array.isArray(tree) || tree.length === 0) {
		return null;
	}

	for (const node of tree) {
		if (predicate(node)) {
			return node;
		}
		if (node[childrenKey] && node[childrenKey].length > 0) {
			const found = findNodeInTree(node[childrenKey], predicate, childrenKey);
			if (found) return found;
		}
	}

	return null;
}

/**
 * 在树结构中查找节点的路径
 *
 * @param tree 树结构数组
 * @param predicate 查找条件函数
 * @param childrenKey 子节点字段名，默认 'children'
 * @returns 节点路径数组
 */
export function findNodePathInTree<T extends Record<string, any>>(
	tree: Dict2treeType.TreeNode<T>[],
	predicate: (node: Dict2treeType.TreeNode<T>) => boolean,
	childrenKey: string = "children",
): Dict2treeType.TreeNode<T>[] | null {
	if (!Array.isArray(tree) || tree.length === 0) {
		return null;
	}

	const path: Dict2treeType.TreeNode<T>[] = [];

	const traverse = (nodes: Dict2treeType.TreeNode<T>[]): boolean => {
		for (const node of nodes) {
			path.push(node);
			if (predicate(node)) {
				return true;
			}
			if (node[childrenKey] && node[childrenKey].length > 0) {
				if (traverse(node[childrenKey])) {
					return true;
				}
			}
			path.pop();
		}
		return false;
	};

	return traverse(tree) ? path : null;
}
