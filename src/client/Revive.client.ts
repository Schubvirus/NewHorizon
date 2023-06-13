import Make from "@rbxts/make";
import { Players } from "@rbxts/services";
import Definitions from "shared/Remotes";

function createPrompt(Part: Instance) {
	Make("ProximityPrompt", {
		Name: "RevivePrompt",
		Parent: Part,
		MaxActivationDistance: 10,
		HoldDuration: 25,
		KeyboardKeyCode: Enum.KeyCode.E,
		RequiresLineOfSight: false,
		ActionText: "Revive",
		Triggered: () => {
			Definitions.Client.PlayerActions.RevivePlayer.Send(Part);
		},
	});
}

Definitions.Client.PlayerActions.CreateRevivePrompt.Connect((Part: Instance) => createPrompt(Part));
