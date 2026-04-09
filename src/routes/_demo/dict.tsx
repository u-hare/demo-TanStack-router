import { ProFormSelect } from "@ant-design/pro-components";
import { createFileRoute } from "@tanstack/react-router";
import { useRequest } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";
import { Dict } from "#/dict";
import { Atom } from "#/store";

export const Route = createFileRoute("/_demo/dict")({
	component: RouteComponent,
});

function RouteComponent() {
	const language = useAtomValue(Atom.language);
	const switchLanguage = useSetAtom(Atom.switchLanguage);
	const { data = [] } = useRequest(Dict._demo, {
		refreshDeps: [language],
	});

	return (
		<div>
			<div>{language}</div>
			<button type="button" onClick={switchLanguage}>
				切换语言
			</button>
			<ProFormSelect options={data}></ProFormSelect>
			<div>Hello "/_demo/dict"!</div>
		</div>
	);
}
