import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import App from "./app";
import Definitions from "shared/Remotes";

function mountGui() {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	if (playerGui.FindFirstChild("MShop")) {
		playerGui.WaitForChild("MShop").Destroy();
	}
	Roact.mount(<App />, playerGui, "MShop");
}

Definitions.Client.BankingSystem.OpenShop.Connect(mountGui);
