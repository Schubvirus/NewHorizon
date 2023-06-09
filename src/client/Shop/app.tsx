import Roact from "@rbxts/roact";
import { useRef, withHooks } from "@rbxts/roact-hooked";
import { ReplicatedStorage, TweenService } from "@rbxts/services";
import ItemCard from "./Components/ItemCard";
import CloseButton from "client/Components/CloseButton";

function App() {
	const strokeColor = Color3.fromRGB(255, 88, 219);
	const closeButtonColor = Color3.fromRGB(255, 79, 82);

	const buttonFrameRef = useRef() as Roact.Ref<Frame>;
	const textButtonRef = useRef() as Roact.Ref<TextButton>;

	const items = ReplicatedStorage.WaitForChild("Items") as Folder;

	return (
		<screengui>
			<frame
				Size={new UDim2(0.75, 0, 0.75, 0)}
				Position={new UDim2(0.125, 0, 0.125, 0)}
				BackgroundColor3={Color3.fromRGB(30, 30, 30)}
			>
				<uicorner />
				<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
				<frame Size={new UDim2(1, 0, 0.1, 0)} BackgroundColor3={Color3.fromRGB(25, 25, 25)}>
					<uicorner />
					<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
					<textlabel
						Text="Shop"
						Size={new UDim2(0.5, 0, 1, 0)}
						Position={new UDim2(0.01, 0, 0, 0)}
						TextScaled={true}
						TextXAlignment={"Left"}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
					/>
					<CloseButton
						size={new UDim2(0.1, 0, 0.5, 0)}
						position={new UDim2(0.88, 0, 0.25, 0)}
						closeButtonColor={closeButtonColor}
						uiName="Shop"
					/>
				</frame>
				<frame
					Size={new UDim2(0.96, 0, 0.86, 0)}
					Position={new UDim2(0.02, 0, 0.12, 0)}
					BackgroundTransparency={1}
				>
					<uigridlayout CellSize={new UDim2(0.15, 0, 0.25, 0)} CellPadding={new UDim2(0.05, 0, 0.05, 0)} />
					{items.GetChildren().map((item) => {
						const Price = item.FindFirstChild("Price") as IntValue;
						const Name = item.Name;
						const icon = item.FindFirstChild("icon") as StringValue;
						return <ItemCard name={Name} price={Price.Value} icon={icon.Value} strokeColor={strokeColor} />;
					})}
				</frame>
			</frame>
		</screengui>
	);
}

export = withHooks(App);
