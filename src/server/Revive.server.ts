import { Players } from "@rbxts/services";
import Definitions from "shared/Remotes";
import TeamsModule from "shared/Teams";

Players.RespawnTime = math.huge;

const AmbulanceTeam = TeamsModule.getTeamByName("Rettungsdienst");

Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		const humanoid = character.FindFirstChild("Humanoid") as Humanoid;

		humanoid?.Died.Connect(() => {
			const HumanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;
			if (!HumanoidRootPart) return;

			if (!AmbulanceTeam) return;
			const onlineAmbulance = TeamsModule.getActiveTeamPlayers(AmbulanceTeam);

			onlineAmbulance.forEach((player: Player) => {
				Definitions.Server.PlayerActions.CreateRevivePrompt.Send(player, HumanoidRootPart);
			});
		});
	});
});

Definitions.Server.PlayerActions.CreateRevivePrompt.Connect(() => undefined);

AmbulanceTeam?.PlayerAdded.Connect((player) => {
	Players.GetPlayers().forEach((target: Player) => {
		if (!target.Character) return;

		const Humanoid = target.Character.FindFirstChild("Humanoid") as Humanoid;
		if (!Humanoid || Humanoid.Health > 0) return;

		const HumanoidRootPart = target.Character.FindFirstChild("HumanoidRootPart") as BasePart;
		if (!HumanoidRootPart) return;

		Definitions.Server.PlayerActions.CreateRevivePrompt.Send(player, HumanoidRootPart);
	});
});

Definitions.Server.PlayerActions.RevivePlayer.Connect(async (player: Player, targetPart: Instance) => {
	const target = Players.GetPlayerFromCharacter(targetPart.Parent);
	if (!target?.IsA("Player")) return;
	if (!target.Character) return;

	const targetCharacter = target.Character;
	const targetBackpack = target.FindFirstChild("Backpack");

	const targetHumanoidRootPart = targetCharacter.FindFirstChild("HumanoidRootPart") as BasePart;
	if (player.DistanceFromCharacter(targetHumanoidRootPart?.Position) > 50) return;

	const position = new Vector3(
		targetHumanoidRootPart.Position.X,
		targetHumanoidRootPart.Position.Y + 5,
		targetHumanoidRootPart.Position.Z,
	);

	const clonedBackpack = targetBackpack?.Clone();
	target.LoadCharacter();

	while (!target.Character) {
		await task.wait(0.1);
	}

	const newTargetHumanoidRootPart = target.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
	newTargetHumanoidRootPart.CFrame = new CFrame(position);

	if (clonedBackpack) {
		task.wait(1); // wait for Team Tools to load
		targetBackpack?.ClearAllChildren();
		clonedBackpack.GetChildren().forEach((child) => {
			child.Parent = targetBackpack;
		});
	}
});

Definitions.Server.PlayerActions.Respawn.Connect((player) => {
	if (!player.Character) return;
	player.LoadCharacter();
});
