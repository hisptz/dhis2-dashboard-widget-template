import { useDataQuery } from "@dhis2/app-runtime";
import { Loader } from "./shared/components/Loader.tsx";
import i18n from "@dhis2/d2-i18n";

const query = {
	me: {
		resource: "me",
	},
};

function App() {
	const { data, loading } = useDataQuery<{ me: { name: string } }>(query);

	if (loading) {
		return <Loader />;
	}

	const name = data?.me?.name;

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<h1>{i18n.t("Hello,  {{name}}", { name })}</h1>
			<span>
				{i18n.t("Welcome to your DHIS2 dashboard widget template")}
			</span>
		</div>
	);
}

export default App;
