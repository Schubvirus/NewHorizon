import Roact from "@rbxts/roact";
import { withHooks } from "@rbxts/roact-hooked";
import CloseButton from "client/Components/CloseButton";
import MoneyModule from "shared/Money";
import Button from "./Components/Button";
import Definitions from "shared/Remotes";

function App() {
	const strokeColor = Color3.fromRGB(255, 88, 219);
	const closeButtonColor = Color3.fromRGB(255, 79, 82);

	const moneyPacks = MoneyModule.moneyPacks;

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
						uiName="MShop"
					/>
				</frame>
				<frame
					Size={new UDim2(0.96, 0, 0.86, 0)}
					Position={new UDim2(0.02, 0, 0.12, 0)}
					BackgroundTransparency={1}
				>
					<uilistlayout HorizontalAlignment={"Center"} VerticalAlignment={"Center"} />

					<frame Size={new UDim2(0.8, 0, 0.9, 0)} BackgroundColor3={Color3.fromRGB(25, 25, 25)}>
						<uicorner CornerRadius={new UDim(0, 5)} />
						<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
						<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
							<uigridlayout
								CellSize={new UDim2(0.45, 0, 0.2, 0)}
								CellPadding={new UDim2(0.05, 0, 0.05, 0)}
								HorizontalAlignment={"Center"}
								VerticalAlignment={"Center"}
								SortOrder={"Name"}
								FillDirection={"Vertical"}
							/>
							{moneyPacks.map((moneyPack) => {
								return (
									<Button
										Text={`${moneyPack.amount}€ - ${moneyPack.price}R$`}
										StrokeColor={strokeColor}
										BackgroundColor3={Color3.fromRGB(35, 35, 35)}
										HoverBackgroundColor3={strokeColor}
										onPress={() => {
											Definitions.Client.BankingSystem.BuyMoney.Call(moneyPack.id);
										}}
									/>
								);
							})}
						</frame>
					</frame>
				</frame>
			</frame>
		</screengui>
	);
}

export default withHooks(App);
