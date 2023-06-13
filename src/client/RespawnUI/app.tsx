import Roact from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Button from "client/UI/Button";
import { setInterval } from "client/utils/timeout";
import Definitions from "shared/Remotes";

interface props {
	name: string;
}

function getTimeLeft(time: number) {
	return time > 0 ? time - 1 : 0;
}

function App({ name }: props) {
	const [timeLeft, setTimeLeft] = useState(20);

	useEffect(() => {
		const interval = setInterval(() => setTimeLeft(getTimeLeft(timeLeft)), 1000);
		return () => interval.clear();
	}, [timeLeft]);

	return (
		<screengui>
			<frame Size={new UDim2(0.5, 0, 0.2, 0)} Position={new UDim2(0.25, 0, 0.8, 0)} BackgroundTransparency={1}>
				<textlabel
					Size={new UDim2(1, 0, 0.5, 0)}
					BackgroundTransparency={1}
					Text={`You died! You can respawn in ${timeLeft} seconds or wait for a medic to revive you.`}
					TextColor3={new Color3(1, 1, 1)}
					TextScaled={true}
				/>
				{timeLeft === 0 && (
					<Button
						Text="Respawn"
						Size={new UDim2(0.4, 0, 0.2, 0)}
						Position={new UDim2(0.3, 0, 0.65, 0)}
						BackgroundTransparency={1}
						HoverBackgroundTransparency={0}
						HoverBackgroundColor3={Color3.fromRGB(160, 15, 230)}
						StrokeColor={Color3.fromRGB(160, 15, 230)}
						onPress={() => {
							Definitions.Client.PlayerActions.Respawn.Send();
							Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild(name).Destroy();
						}}
					/>
				)}
			</frame>
		</screengui>
	);
}

export default withHooks(App);
