import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { clearInterval, setInterval } from "client/utils/timeout";

function App() {
	const [viewMode, setViewMode] = useState<"Small" | "Full">("Small");

	const viewPortFrameRef = Roact.createRef<ViewportFrame>();
	const imageLabelRef = Roact.createRef<ImageLabel>();
	const LocalPlayer = Players.LocalPlayer;
	do {
		wait();
	} while (!LocalPlayer.Character);
	const Character = LocalPlayer.Character as Model;
	const HumanoidRootPart = Character.WaitForChild("HumanoidRootPart") as BasePart;

	const MinimapFolder = Workspace.WaitForChild("Minimap") as Folder;
	const Houses = MinimapFolder.WaitForChild("Houses") as Folder;
	const Roads = MinimapFolder.WaitForChild("Roads") as Folder;
	const CenterPart = MinimapFolder.WaitForChild("Center") as BasePart;

	const camera = Make("Camera", {
		CFrame: new CFrame(0, 0, 0),
		FieldOfView: 1,
		CameraType: Enum.CameraType.Scriptable,
	});
	const fullScreenCamera = Make("Camera", {
		CFrame: new CFrame(CenterPart.Position.add(new Vector3(0, 50000, 0)), CenterPart.Position),
		FieldOfView: 5,
		CameraType: Enum.CameraType.Scriptable,
	});

	/* let dragging = false;
	let dragInput: InputObject;
	let dragStart: Vector3;
	let startPos: Vector3;

	function update(input: InputObject) {
		const delta = input.Position.sub(dragStart);
		const newCFrame = new CFrame(new Vector3(delta.X, 0, 0).Magnitude * 0.1, 0, 0);
		print(newCFrame, fullScreenCamera.CFrame);
		fullScreenCamera.CFrame = newCFrame;
	}

	UserInputService.InputBegan.Connect((input) => {
		if (
			input.UserInputType === Enum.UserInputType.MouseButton1 ||
			input.UserInputType === Enum.UserInputType.Touch
		) {
			dragging = true;
			dragStart = input.Position;
			startPos = fullScreenCamera.CFrame.Position;

			input.GetPropertyChangedSignal("UserInputState").Connect(() => {
				if (input.UserInputState === Enum.UserInputState.End) {
					dragging = false;
				}
			});
		}
	});

	UserInputService.InputChanged.Connect((input) => {
		if (input === dragInput && dragging) {
			update(input);
		}
	}); */

	useEffect(() => {
		const viewPortFrame = viewPortFrameRef.getValue() as ViewportFrame;
		const imageLabel = imageLabelRef.getValue() as ImageLabel;

		for (const house of Houses.GetChildren()) {
			const model = house as BasePart;
			const part = model.Clone();
			part.Transparency = 0.7;
			part.Parent = viewPortFrame;
		}

		for (const road of Roads.GetChildren()) {
			const model = road as BasePart;
			const part = model.Clone();
			part.Transparency = 0.2;
			part.Parent = viewPortFrame;
		}

		const interval = setInterval(() => {
			const newCFrame = new CFrame(
				HumanoidRootPart.Position.add(new Vector3(0, 20000, 0)),
				HumanoidRootPart.Position,
			);

			camera.CFrame = newCFrame;
			if (viewMode === "Small") {
				imageLabel.Rotation = -HumanoidRootPart.Orientation.Y - 90;
			}
		}, 20);
		return () => {
			clearInterval(interval);
		};
	}, [viewPortFrameRef, Houses, Roads, HumanoidRootPart, camera]);

	return (
		<screengui ResetOnSpawn={false}>
			{viewMode === "Small" ? (
				<Roact.Fragment>
					<frame
						Size={new UDim2(0.2, 0, 0.2, 0)}
						Position={new UDim2(0.02, 0, 0.78, 0)}
						BackgroundTransparency={1}
					>
						<uiaspectratioconstraint AspectRatio={1} />
						<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
							<textbutton
								BackgroundTransparency={1}
								Size={new UDim2(1, 0, 1, 0)}
								Text=""
								Event={{
									MouseButton1Click: () => {
										setViewMode("Full");
									},
								}}
							/>
							<viewportframe
								Size={new UDim2(1, 0, 1, 0)}
								Ref={viewPortFrameRef}
								BackgroundTransparency={0.3}
								CurrentCamera={camera}
								Active={true}
								BackgroundColor3={Color3.fromRGB(30, 30, 30)}
							>
								<uicorner CornerRadius={new UDim(1, 0)} />
								<imagelabel
									Position={new UDim2(0.5, 0, 0.5, 0)}
									Size={new UDim2(0.1, 0, 0.1, 0)}
									Ref={imageLabelRef}
									BackgroundTransparency={1}
									Image={"http://www.roblox.com/asset/?id=5485245567"}
								/>
							</viewportframe>
						</frame>
					</frame>
				</Roact.Fragment>
			) : (
				<frame
					BackgroundTransparency={1}
					Size={new UDim2(0.6, 0, 0.7, 0)}
					Position={new UDim2(0.2, 0, 0.15, 0)}
				>
					<textbutton
						BackgroundTransparency={1}
						Size={new UDim2(0.05, 0, 0.05, 0)}
						Position={new UDim2(0.95, 0, 0.02, 0)}
						TextScaled={true}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						Text="X"
						ZIndex={2}
						Event={{
							MouseButton1Click: () => {
								setViewMode("Small");
							},
						}}
					/>
					<textbutton
						Size={new UDim2(1, 0, 1, 0)}
						BackgroundTransparency={1}
						Text=""
						Event={{
							MouseWheelForward: () => {
								fullScreenCamera.FieldOfView -= 0.4;
							},
							MouseWheelBackward: () => {
								fullScreenCamera.FieldOfView += 0.4;
							},
							/* InputChanged: (__element, input) => {
								if (input.UserInputType === Enum.UserInputType.MouseMovement) {
									dragInput = input;
								}
							}, */
						}}
					>
						<viewportframe
							Size={new UDim2(1, 0, 1, 0)}
							Ref={viewPortFrameRef}
							CurrentCamera={fullScreenCamera}
							BackgroundTransparency={0.2}
							BackgroundColor3={Color3.fromRGB(30, 30, 30)}
							Active={true}
						>
							<uicorner CornerRadius={new UDim(0, 8)} />
						</viewportframe>
					</textbutton>
				</frame>
			)}
		</screengui>
	);
}

export default withHooks(App);
