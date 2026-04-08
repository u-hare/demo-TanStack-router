import axios from "axios";

/**
 * 网关
 */
export const gateway = axios.create({
	baseURL: "/",
});
gateway.interceptors.request.use(
	(value) => {
		return value;
	},
	(error) => {
		console.error(error);
	},
);
gateway.interceptors.response.use(
	(value) => {
		return value;
	},
	(error) => {
		console.error(error);
	},
);
