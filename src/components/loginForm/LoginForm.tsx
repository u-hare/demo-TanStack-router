import { ProForm, ProFormText } from "@ant-design/pro-components";
import { forwardRef } from "react";
import type { LoginFormType } from "./types";

/**
 * 登录表单
 */
export const LoginForm = forwardRef(function LoginForm() {
	return (
		<ProForm<LoginFormType.Data>
			submitter={{
				render(_, [__, submit]) {
					return <div className="text-right">{submit}</div>;
				},
			}}
		>
			<ProFormText name="name" label="用户名" rules={[{ required: true }]} />
			<ProFormText
				fieldProps={{ type: "password" }}
				name="password"
				label="密码"
				rules={[{ required: true }]}
			/>
		</ProForm>
	);
});
