import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useIntl } from "react-intl";
import { Atom } from "#/store";

export const Route = createFileRoute("/_demo/language")({
	component: RouteComponent,
});

function RouteComponent() {
	const { formatMessage } = useIntl();
	const [language, setLanguage] = useAtom(Atom.language);
	function switchLanguage() {
		setLanguage(language === "en" ? "zh-CN" : "en");
	}

	return (
		<div>
			<div>Hello "/language"!</div>
			<div>{formatMessage({ id: "你好" })}</div>
			<button type="button" onClick={switchLanguage}>
				切换
			</button>
		</div>
	)
}
