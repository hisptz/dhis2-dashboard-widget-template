import { CircularLoader, LinearLoader } from "@dhis2/ui";

export function Loader({
	progress,
	text,
}: {
	progress?: number;
	text?: string;
}) {
	return (
		<div
			className="column center align-items-center"
			style={{ minHeight: 600, height: "100%" }}
		>
			{progress ? (
				<LinearLoader amount={progress} />
			) : (
				<CircularLoader small />
			)}
			{text && <h3>{text}</h3>}
		</div>
	);
}
