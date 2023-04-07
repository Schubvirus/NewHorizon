import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import App from "./app";
import Definitions from "shared/Remotes";

function mountGui() {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	if (playerGui.FindFirstChild("Bank")) {
		playerGui.WaitForChild("Bank").Destroy();
	}
	Roact.mount(<App />, playerGui, "Bank");
}

Definitions.Client.BankingSystem.OpenBank.Connect(mountGui);
