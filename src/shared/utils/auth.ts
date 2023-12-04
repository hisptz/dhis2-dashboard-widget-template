const request = (url: string, options: Record<string, any>) => {
		const abortController = new AbortController();

		const promise: any = new Promise((resolve, reject) => {
				fetch(url, {
						...options,
						credentials: "include",
						headers: {
								"X-Requested-With": "XMLHttpRequest",
								Accept: "application/json",
								...options.headers,
						},
						signal: abortController.signal,
				})
						.then((response) => {
								if (response.status !== 200) {
										reject(`Request failed ${response.statusText}`);
										return;
								}
								try {
										resolve(response.json());
								} catch (e) {
										resolve(response.text());
								}
						})
						.catch((e) => {
								console.error("Network error: ", e);
								reject("Network error");
						});
		});

		promise.abort = () => abortController.abort();
		return promise;
};

export const get = (url: string) => request(url, {method: "GET"});
export const post = (url: string, body: string) =>
		request(url, {
				method: "POST",
				body,
				headers: {
						"Content-Type": "application/x-www-form-urlencoded",
				},
		});

export async function login(baseUrl: string, {username, password}: { username: string, password: string }) {
		window.localStorage.DHIS2_BASE_URL = baseUrl;
		try {
				await post(`${baseUrl}/dhis-web-commons-security/login.action`, `j_username=${encodeURIComponent(username)}&j_password=${encodeURIComponent(password)}`);
		} catch (e) {
				console.error(`Could not login`);
		}
}
export async function checkAuth(baseUrl: string) {
		return get(`${baseUrl}/api/me`).then(() => true).catch(() => false)
}
