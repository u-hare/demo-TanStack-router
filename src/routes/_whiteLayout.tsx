import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_whiteLayout")({
	component: RouteComponent,
});

/**
 * 白名单布局
 */
function RouteComponent() {
	return (
		<>
			<div>Hello "/_whiteLayout"!</div>
			<Outlet></Outlet>
		</>
	);
}
