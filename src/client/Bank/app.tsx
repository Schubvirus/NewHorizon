import Roact from "@rbxts/roact";
import { useState, withHooks } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Defintions from "shared/Remotes";
import CloseButton from "client/Components/CloseButton";
import Deposit from "./Components/Deposit";
import Select from "./Components/Select";
import Withdraw from "./Components/Withdraw";
import Transfer from "./Components/Transfer";

function App() {
	const strokeColor = Color3.fromRGB(255, 88, 219);
	const closeButtonColor = Color3.fromRGB(255, 79, 82);

	const [currentMode, setMode] = useState<"Select" | "Deposit" | "Transfer" | "Withdraw">("Select");

	const WalletValue = Players.LocalPlayer.WaitForChild("Playerdata").WaitForChild("Wallet") as NumberValue;
	const BankValue = Players.LocalPlayer.WaitForChild("Playerdata").WaitForChild("Bank") as NumberValue;

	const [Bank, setBank] = useState(BankValue.Value);
	const [Wallet, setMoney] = useState(WalletValue.Value);

	WalletValue.Changed.Connect((newValue) => {
		setMoney(newValue);
	});

	BankValue.Changed.Connect((newValue) => {
		setBank(newValue);
	});

	return (
		<screengui>
			<frame
				Size={new UDim2(0.6, 0, 0.6, 0)}
				Position={new UDim2(0.2, 0, 0.2, 0)}
				BackgroundColor3={Color3.fromRGB(30, 30, 30)}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
				<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
				<frame Size={new UDim2(1, 0, 0.1, 0)} BackgroundColor3={Color3.fromRGB(25, 25, 25)}>
					<uicorner CornerRadius={new UDim(0, 5)} />
					<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
					<textlabel
						Text="Bank"
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
						uiName="Bank"
					/>
				</frame>
				<frame
					Size={new UDim2(0.96, 0, 0.86, 0)}
					Position={new UDim2(0.02, 0, 0.12, 0)}
					BackgroundTransparency={1}
				>
					<uilistlayout FillDirection={"Horizontal"} />
					<frame Size={new UDim2(0.33, 0, 1, 0)} BackgroundTransparency={1}>
						<uilistlayout Padding={new UDim(0.05, 0)} />
						<textlabel
							Size={new UDim2(0.9, 0, 0.15, 0)}
							BackgroundTransparency={1}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							Text={`Wallet: ${Wallet}€`}
						/>
						<textlabel
							Size={new UDim2(0.9, 0, 0.15, 0)}
							BackgroundTransparency={1}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							Text={`Bank: ${Bank}€`}
						/>
						<textbutton
							Text={"Buy Money"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							BackgroundColor3={Color3.fromRGB(20, 20, 20)}
							BackgroundTransparency={0.2}
							Size={new UDim2(0.9, 0, 0.15, 0)}
							Event={{
								MouseButton1Click: () => {
									Defintions.Client.BankingSystem.OpenShop.Send();
									Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("Bank").Destroy();
								},
							}}
						>
							<uicorner CornerRadius={new UDim(0, 5)} />
						</textbutton>
						{currentMode !== "Select" && (
							<textbutton
								Text={"Back"}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								BackgroundColor3={Color3.fromRGB(20, 20, 20)}
								BackgroundTransparency={0.2}
								Size={new UDim2(0.9, 0, 0.15, 0)}
								Event={{
									MouseButton1Click: () => {
										setMode("Select");
									},
								}}
							>
								<uicorner CornerRadius={new UDim(0, 5)} />
							</textbutton>
						)}
					</frame>
					<frame Size={new UDim2(0.66, 0, 1, 0)} BackgroundTransparency={1}>
						<uilistlayout VerticalAlignment={"Center"} />
						<frame Size={new UDim2(0.5, 0, 0.9, 0)} BackgroundColor3={Color3.fromRGB(25, 25, 25)}>
							<uicorner CornerRadius={new UDim(0, 5)} />
							<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
							{currentMode === "Select" && <Select BackgroundColor3={strokeColor} setMode={setMode} />}
							{currentMode === "Deposit" && <Deposit BackgroundColor3={strokeColor} setMode={setMode} />}
							{currentMode === "Transfer" && (
								<Transfer BackgroundColor3={strokeColor} setMode={setMode} />
							)}
							{currentMode === "Withdraw" && (
								<Withdraw BackgroundColor3={strokeColor} setMode={setMode} />
							)}
						</frame>
					</frame>
				</frame>
			</frame>
		</screengui>
	);
}

export default withHooks(App);
