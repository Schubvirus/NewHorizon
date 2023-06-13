import Make from "@rbxts/make";
import { Teams, ServerStorage, MarketplaceService } from "@rbxts/services";

const TeamToolsFolder = ServerStorage.FindFirstChild("TeamTools") as Folder;

interface TeamListItem {
	Name: string;
	Color: Color3;
	AutoAssignable?: boolean;
	groupId?: number;
	groupRank?: number;
	gamePassId?: number;
}

const TeamsList: TeamListItem[] = [
	{
		Name: "Prisoners",
		Color: new Color3(0, 0, 0),
		AutoAssignable: true,
		groupId: 0,
		groupRank: 0,
		gamePassId: 0,
	},
];

function createTeams() {
	TeamsList.forEach((Team) => {
		Make("Team", {
			Name: Team.Name,
			AutoAssignable: Team.AutoAssignable ?? false,
			TeamColor: new BrickColor(Team.Color),
			Parent: Teams,
		});
	});
}

const changeTeam = (Player: Player, Team: Team) => (Player.Team = Team);

const getPlayerTeam = (Player: Player) => Player.Team;

const getActiveTeamPlayers = (Team: Team) => Team.GetPlayers();

const getTeamByName = (TeamName: string): Team | undefined => Teams.WaitForChild(TeamName, 1) as Team | undefined;

function giveTeamTools(Player: Player, Team: Team) {
	TeamToolsFolder.FindFirstChild(Team.Name)
		?.GetChildren()
		.forEach((Tool) => {
			Tool.Clone().Parent = Player.FindFirstChildOfClass("Backpack");
		});
}

function checkWhitelist(Player: Player, Team: Team): Boolean {
	const TeamItem = TeamsList.find((TeamItem) => TeamItem.Name === Team.Name);
	if (!TeamItem) return false;

	if (TeamItem.groupId && TeamItem.groupRank && !(Player.GetRankInGroup(TeamItem.groupId) < TeamItem.groupRank))
		return false;

	if (TeamItem.groupId && !TeamItem.groupRank && !Player.IsInGroup(TeamItem.groupId)) return false;

	if (TeamItem.gamePassId) {
		if (!MarketplaceService.UserOwnsGamePassAsync(Player.UserId, TeamItem.gamePassId)) return false;
	}

	return true;
}

const TeamsModule = {
	createTeams,
	changeTeam,
	getPlayerTeam,
	getActiveTeamPlayers,
	giveTeamTools,
	getTeamByName,
	checkWhitelist,
};

export default TeamsModule;
