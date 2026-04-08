import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication")({
	component: RouteComponent,
	beforeLoad() {
		console.log("beforeLoad");
	},
});

/**
 * 认证布局
 */
function RouteComponent() {
	return (
		<>
			<div>Hello "/_authentication"!</div>
			<Outlet></Outlet>
		</>
	);
}
