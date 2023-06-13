import Roact from "@rbxts/roact";
import Shadow from "./Shadow";

interface Props extends Roact.PropsWithChildren {
	Size: UDim2;
	Position: UDim2;
	Title: string;
	GuiName: string;
}

function main({ Size, Position, [Roact.Children]: children }: Props) {
	return (
		<screengui IgnoreGuiInset>
			<frame Size={Size} Position={Position} BackgroundColor3={Color3.fromRGB(30, 30, 30)}>
				<uistroke Color={Color3.fromRGB(20, 20, 20)} Thickness={6} />

				<uicorner />
				<Shadow Zindex={-1} />
				<frame Size={new UDim2(1, 0, 0.1, 0)} BackgroundTransparency={1}></frame>
				<frame
					Size={new UDim2(0.98, 0, 0.88, 0)}
					Position={new UDim2(0.01, 0, 0.11, 0)}
					BackgroundTransparency={1}
				>
					{children}
				</frame>
			</frame>
		</screengui>
	);
}

export default main;
