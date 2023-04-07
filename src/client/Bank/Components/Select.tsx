import Roact from "@rbxts/roact";
import Button from "./Button";

interface props {
	setMode: (mode: "Select" | "Deposit" | "Transfer" | "Withdraw") => void;
	BackgroundColor3: Color3;
}

function Select({ setMode, BackgroundColor3 }: props) {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={"Vertical"}
				Padding={new UDim(0.1, 0)}
				VerticalAlignment={"Center"}
				HorizontalAlignment={"Center"}
			/>
			<Button
				Text="Deposit"
				BackgroundColor3={BackgroundColor3}
				HoverBackgroundColor3={Color3.fromRGB(161, 51, 138)}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				onPress={() => setMode("Deposit")}
			/>
			<Button
				Text="Withdraw"
				BackgroundColor3={BackgroundColor3}
				HoverBackgroundColor3={Color3.fromRGB(161, 51, 138)}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				onPress={() => setMode("Withdraw")}
			/>
			<Button
				Text="Transfer"
				BackgroundColor3={BackgroundColor3}
				HoverBackgroundColor3={Color3.fromRGB(161, 51, 138)}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				onPress={() => setMode("Transfer")}
			/>
		</frame>
	);
}

export = Select;
