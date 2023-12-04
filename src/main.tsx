import "./styles/index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { CssReset } from "@dhis2/ui";
import { Provider } from "@dhis2/app-runtime";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./shared/components/ErrorFallback.tsx";
import { checkAuth, login } from "./shared/utils/auth.ts";

const root = document.getElementById("root") as HTMLElement;
const getServerVersion = async (baseUrl: string, authorization?: string) => {
	const appVersion = await fetch(`${baseUrl}/api/system/info.json`, {
		headers: authorization
			? {
					Authorization: authorization,
			  }
			: undefined,
	})
		.then((res) => res.json())
		.then((systemInfo) => systemInfo.version);

	const [major, minor, patch] = appVersion.split(".");

	return {
		major,
		minor,
		patch,
		full: appVersion,
	};
};

function renderError(error: Error) {
	return ReactDOM.createRoot(root).render(<code>{error.toString()}</code>);
}

const renderProductionApp = async () => {
	const render = (
		baseUrl: string,
		apiVersion: number,
		serverVersion: {
			full: string;
			major: number;
			minor: number;
			patch: number;
		},
	) =>
		ReactDOM.createRoot(root).render(
			<>
				<CssReset />
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Provider
						config={{
							baseUrl,
							apiVersion,
							serverVersion,
						}}
					>
						<App />
					</Provider>
				</ErrorBoundary>
			</>,
		);
	try {
		fetch("./manifest.webapp")
			.then((response) => response.json())
			.then((manifest) => {
				const baseUrl = manifest?.activities?.dhis?.href ?? "";
				getServerVersion(baseUrl)
					.then((serverVersion) => {
						render(baseUrl, serverVersion.minor, serverVersion);
					})
					.catch((error) => {
						renderError(error);
					});
			})
			.catch((error) => {
				renderError(error);
			});
	} catch (error) {
		console.error("Could not read manifest:", error);
	}
};

const renderDevApp = async () => {
	const baseUrl = import.meta.env.VITE_REACT_APP_DHIS2_BASE_URL;
	const username = import.meta.env.VITE_REACT_APP_DHIS2_USERNAME;
	const password = import.meta.env.VITE_REACT_APP_DHIS2_PASSWORD;

	const authorization = `Basic ${btoa(`${username}:${password}`)}`;

	const serverVersion = await getServerVersion(baseUrl, authorization);
	const config = {
		baseUrl,
		serverVersion,
		apiVersion: serverVersion.minor,
	};

	const isAuthenticated = await checkAuth(baseUrl);

	if (!isAuthenticated) {
		await login(baseUrl, { username, password });
	}

	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<CssReset />
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Provider config={config}>
					<App />
				</Provider>
			</ErrorBoundary>
		</React.StrictMode>,
	);
};

if (import.meta.env.PROD) {
	renderProductionApp();
} else {
	renderDevApp();
}
