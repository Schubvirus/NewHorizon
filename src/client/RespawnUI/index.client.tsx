import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import App from "./app";

const uiName = "RespawnUI";

function mountGui() {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	if (playerGui.FindFirstChild(uiName)) {
		playerGui.WaitForChild(uiName).Destroy();
	}
	Roact.mount(<App name={uiName} />, playerGui, uiName);
}

Players.LocalPlayer.CharacterAdded.Connect((character: Model) => {
	const Humanoid = character.WaitForChild("Humanoid", 1) as Humanoid;

	if (Humanoid) {
		Humanoid.Died.Connect(() => {
			mountGui();
		});
	}
});
