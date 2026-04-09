import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { LoginForm } from "#/components/loginForm";

const numAtom = atom(12);
export const Route = createFileRoute("/_whiteLayout/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const [num, setNum] = useAtom(numAtom);

	return (
		<div>
			<div className="w-96 bg-white p-4 rounded-md shadow-md">
				<LoginForm></LoginForm>
			</div>
			<div>Hello "/login"!</div>
			<div className="flex  gap-2">
				<div>{num}</div>
				<button type="button" onClick={() => setNum(num + 1)}>
					增加
				</button>
			</div>
		</div>
	);
}
