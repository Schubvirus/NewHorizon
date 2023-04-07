import Roact from "@rbxts/roact";
import Button from "./Button";
import { useRef, useState, withHooks } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import Definitions from "shared/Remotes";

interface props {
	setMode: (mode: "Select" | "Deposit" | "Transfer" | "Withdraw") => void;
	BackgroundColor3: Color3;
}

function Transfer({ setMode, BackgroundColor3 }: props) {
	const textBoxRef = useRef<TextBox>();
	const textBox2Ref = useRef<TextBox>();

	const [errorMessage, setErrorMessage] = useState("");

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={"Vertical"}
				Padding={new UDim(0.1, 0)}
				VerticalAlignment={"Center"}
				HorizontalAlignment={"Center"}
			/>
			<textbox
				Ref={textBoxRef}
				PlaceholderText="Amount"
				Text="100"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				BackgroundColor3={Color3.fromRGB(50, 50, 50)}
				BackgroundTransparency={0.2}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
			</textbox>
			<textbox
				Ref={textBox2Ref}
				PlaceholderText="Target Player"
				Text=""
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				BackgroundColor3={Color3.fromRGB(50, 50, 50)}
				BackgroundTransparency={0.2}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
			</textbox>
			<Button
				Text="Transfer"
				BackgroundColor3={BackgroundColor3}
				HoverBackgroundColor3={Color3.fromRGB(161, 51, 138)}
				Size={new UDim2(0.8, 0, 0.2, 0)}
				onPress={() => {
					const textBox = textBoxRef.getValue() as TextBox;
					const textBox2 = textBox2Ref.getValue() as TextBox;

					if (textBox.Text !== "") {
						const amount = tonumber(textBox.Text) as number;
						const searchedPlayer = Players.FindFirstChild(textBox2.Text) as Player;
						const target = searchedPlayer ? searchedPlayer : undefined;
						if (!target) return setErrorMessage("Player not found!");
						const deposit = Definitions.Client.BankingSystem.Transfer(target, amount);
						if (deposit === "Transfer successful!") {
							setErrorMessage(deposit);
							task.wait(3);
							setMode("Select");
							return;
						}
						setErrorMessage(deposit);
					}
				}}
			/>
			{errorMessage !== "" ? (
				<textlabel
					Text={errorMessage}
					TextScaled={true}
					Size={new UDim2(0.8, 0, 0.2, 0)}
					BackgroundTransparency={1}
					TextColor3={Color3.fromRGB(255, 255, 255)}
				/>
			) : (
				<textlabel Text="" BackgroundTransparency={1} />
			)}
		</frame>
	);
}

export = withHooks(Transfer);
