import Roact from "@rbxts/roact";

interface Props extends Roact.PropsWithChildren {
	Small?: boolean;
	Zindex?: number;
}

function shadow({ Small, Zindex }: Props = { Small: false, Zindex: 1 }) {
	return (
		<imagelabel
			BackgroundTransparency={1}
			Size={Small ? new UDim2(1.3, 0, 1.25, 0) : new UDim2(1.4, 0, 1.3, 0)}
			Position={Small ? new UDim2(-0.15, 0, -0.125, 0) : new UDim2(-0.2, 0, -0.15, 0)}
			ZIndex={Zindex}
			Image={"http://www.roblox.com/asset/?id=9664405851"}
		/>
	);
}

export default shadow;
