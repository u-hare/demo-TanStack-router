import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { IntlProvider } from "react-intl";
import { I18n } from "#/i18n";
import { Atom, store } from "#/store";

export const Route = createRootRoute({
	component: () => (
		<JotaiProvider store={store}>
			<RootComponent></RootComponent>
		</JotaiProvider>
	),
});

function RootComponent() {
	const language = useAtomValue(Atom.language);

	return (
		<IntlProvider messages={I18n.messages[language]} locale={language}>
			<Outlet />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</IntlProvider>
	);
}
