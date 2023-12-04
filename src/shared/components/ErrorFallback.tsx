import {FallbackProps} from "react-error-boundary";
import {Button, ButtonStrip, colors, IconError24} from "@dhis2/ui";
import {useState} from "react";

export default function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {

		const [showStack, setShowStack] = useState(false);

		return (
				<div style={{minHeight: 400}} className="h-100 w-100 column center align-items-center">
						<div className="size-32">
								<IconError24/>
						</div>
						<h3>{error.name}</h3>
						<p>{error.message}</p>
						{
								showStack && (
										<div style={{
												width: "50%",
												display: "flex",
												justifyContent: "center",
												background: colors.grey100,
												padding: 16,
												margin: 8
										}}>
												<code>
														{error.stack}
												</code>
										</div>
								)
						}
						<ButtonStrip>
								<Button primary onClick={resetErrorBoundary}>Reload</Button>
								<Button
										onClick={() => setShowStack(prevState => !prevState)}>{showStack ? `Hide` : 'Show'} details</Button>
						</ButtonStrip>
				</div>
		)
}
