import { Players } from "@rbxts/services";
import TeamsModule from "shared/Teams";
import Definitions from "shared/Remotes";

//TeamsModule.createTeams();

Players.PlayerAdded.Connect((Player) => {
	Player.CharacterAdded.Connect((Character) => {
		if (Player.Team) {
			TeamsModule.giveTeamTools(Player, Player.Team);
		}
	});
});

Definitions.Server.Teams.ChangeTeam.Connect((Player, Team) => {
	if (!Team.IsA("Team")) return;

	if (!TeamsModule.checkWhitelist(Player, Team)) return;

	TeamsModule.changeTeam(Player, Team);
	TeamsModule.giveTeamTools(Player, Team);
});
