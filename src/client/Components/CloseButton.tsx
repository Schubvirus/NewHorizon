import { TweenService } from "@rbxts/services";
import Roact from "@rbxts/roact";
import { useRef, withHooks } from "@rbxts/roact-hooked";

interface props {
	closeButtonColor: Color3;
	size: UDim2;
	position: UDim2;
	uiName: string;
}

function Button({ closeButtonColor, size, position, uiName }: props) {
	const buttonFrameRef = useRef() as Roact.Ref<Frame>;
	const textButtonRef = useRef() as Roact.Ref<TextButton>;

	return (
		<frame
			Size={size}
			Position={position}
			BackgroundColor3={closeButtonColor}
			BackgroundTransparency={1}
			Ref={buttonFrameRef}
		>
			<uistroke LineJoinMode={"Round"} Thickness={2} Color={closeButtonColor} />
			<uicorner />
			<textbutton
				Text="Close"
				TextScaled={true}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				TextColor3={closeButtonColor}
				Ref={textButtonRef}
				Event={{
					MouseButton1Click: () => {
						game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui").WaitForChild(uiName).Destroy();
					},
					MouseEnter: () => {
						const frame = buttonFrameRef.getValue() as Frame;
						const textButton = textButtonRef.getValue() as TextButton;
						TweenService.Create(frame, new TweenInfo(0.1), {
							BackgroundTransparency: 0,
						}).Play();
						TweenService.Create(textButton, new TweenInfo(0.1), {
							TextColor3: Color3.fromRGB(255, 255, 255),
						}).Play();
					},
					MouseLeave: () => {
						const frame = buttonFrameRef.getValue() as Frame;
						const textButton = textButtonRef.getValue() as TextButton;
						TweenService.Create(frame, new TweenInfo(0.1), {
							BackgroundTransparency: 1,
						}).Play();
						TweenService.Create(textButton, new TweenInfo(0.1), {
							TextColor3: closeButtonColor,
						}).Play();
					},
				}}
			></textbutton>
		</frame>
	);
}

export default withHooks(Button);
