import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import App from "./app";
import Definitions from "shared/Remotes";

function mountGui() {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	if (playerGui.FindFirstChild("Minimap")) {
		playerGui.WaitForChild("Minimap").Destroy();
	}
	Roact.mount(<App />, playerGui, "Minimap");
}

mountGui();
