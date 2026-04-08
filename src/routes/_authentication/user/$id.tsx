import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authentication/user/$id")({
	component: RouteComponent,
	loader(e) {
		return {
			id: e.params.id,
		};
	},
});

function RouteComponent() {
	const loaderData = Route.useLoaderData();
	const { id } = loaderData;

	return (
		<div>
			<div>Hello "/_authentication/user/$id"!</div>
			<div>{id}</div>
		</div>
	);
}
