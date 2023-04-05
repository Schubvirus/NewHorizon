import { Workspace, Players } from "@rbxts/services";

const groupId = 7863870;
const minRank = 6;

Workspace.DescendantAdded.Connect((descendant) => {
	if (descendant.IsA("Tool")) {
		const player = Players.GetPlayerFromCharacter(descendant.Parent);
		if (player && descendant.Name.lower() === "building tools") {
			if (player.GetRankInGroup(groupId) < minRank) {
				task.wait();
				descendant.Destroy();
			}
		}
	}
});
