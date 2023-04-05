import Roact from "@rbxts/roact";
import { ReplicatedStorage, Players } from "@rbxts/services";
import App from "./app";

const Network = ReplicatedStorage.WaitForChild("Network") as Folder;
const purchaseItemFunction = Network.WaitForChild("purchase_item") as RemoteFunction;

function mountGui() {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	if (playerGui.FindFirstChild("Shop")) {
		playerGui.WaitForChild("Shop").Destroy();
	}
	Roact.mount(<App />, playerGui, "Shop");
}

purchaseItemFunction.OnClientInvoke = () => {
	mountGui();
};
