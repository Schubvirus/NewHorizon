import Roact from "@rbxts/roact";
import { useRef, withHooks } from "@rbxts/roact-hooked";
import { TweenService } from "@rbxts/services";

interface Props {
	Text: string;
	Size?: UDim2;
	Position?: UDim2;
	StrokeColor: Color3;
	BackgroundColor3: Color3;
	HoverBackgroundColor3: Color3;
	onPress: () => void;
}

function Button({ Text, Size, Position, BackgroundColor3, HoverBackgroundColor3, StrokeColor, onPress }: Props) {
	const ButtonRef = useRef<TextButton>();

	function onHover(isHovered: boolean) {
		const Button = ButtonRef.getValue() as TextButton;
		if (isHovered) {
			TweenService.Create(Button, new TweenInfo(0.1), {
				BackgroundColor3: HoverBackgroundColor3,
				TextColor3: Color3.fromRGB(240, 240, 240),
			}).Play();
		} else {
			TweenService.Create(Button, new TweenInfo(0.1), {
				BackgroundColor3: BackgroundColor3,
				TextColor3: Color3.fromRGB(255, 255, 255),
			}).Play();
		}
	}

	return (
		<frame Size={Size} Position={Position} BackgroundTransparency={1}>
			<uistroke LineJoinMode={"Round"} Thickness={2} Color={StrokeColor} />
			<uicorner CornerRadius={new UDim(0, 8)} />
			<textbutton
				Text={Text}
				TextScaled={true}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundColor3={BackgroundColor3}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Ref={ButtonRef}
				Event={{
					MouseButton1Click: () => onPress?.(),
					MouseEnter: () => onHover?.(true),
					MouseLeave: () => onHover?.(false),
				}}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<uitextsizeconstraint MaxTextSize={30} />
			</textbutton>
		</frame>
	);
}

export default withHooks(Button);
