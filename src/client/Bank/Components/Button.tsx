import Roact from "@rbxts/roact";
import { useRef, withHooks } from "@rbxts/roact-hooked";
import { TweenService } from "@rbxts/services";

interface props {
	Text: string;
	Size: UDim2;
	Position?: UDim2;
	BackgroundColor3: Color3;
	HoverBackgroundColor3: Color3;
	onPress?: () => void;
}

function Button({ Text, Size, Position, BackgroundColor3, HoverBackgroundColor3, onPress }: props) {
	const ButtonRef = useRef<TextButton>();

	function onHover(isHovered: boolean) {
		const Button = ButtonRef.getValue() as TextButton;
		if (isHovered) {
			TweenService.Create(Button, new TweenInfo(0.1), {
				BackgroundColor3: HoverBackgroundColor3,
			}).Play();
		} else {
			TweenService.Create(Button, new TweenInfo(0.1), {
				BackgroundColor3: BackgroundColor3,
			}).Play();
		}
	}

	return (
		<textbutton
			Text={Text}
			Size={Size}
			Position={Position}
			BackgroundColor3={BackgroundColor3}
			Ref={ButtonRef}
			Event={{
				MouseButton1Click: () => onPress?.(),
				MouseEnter: () => onHover?.(true),
				MouseLeave: () => onHover?.(false),
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
		</textbutton>
	);
}

export = withHooks(Button);
