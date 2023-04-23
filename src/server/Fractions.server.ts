import { MessagingService } from "@rbxts/services";
import FractionsModule from "shared/Fractions";
import Definitions from "shared/Remotes";

MessagingService.SubscribeAsync("FractionUpdated", (message) => {
	const data = message.Data;
	if (data && typeIs(data, "string")) {
		FractionsModule.updateFractionData(data);
	}
});

Definitions.Server.FractionSystem.CreateFraction.SetCallback((player: Player, fractionName: string): string => {
	if (FractionsModule.findFraction(fractionName)) return "Fraction Already Exists";
	FractionsModule.createFraction(fractionName, player.UserId);
	return "Fraction Created";
});

Definitions.Server.FractionSystem.InvitePlayer.SetCallback(
	(player: Player, target: Instance, fractionName: string): string => {
		if (!target.IsA("Player")) return "Target Is Not A Player";
		if (player.UserId !== FractionsModule.getFractionOwner(fractionName)) return "You Are Not The Leader";
		if (FractionsModule.getFractionMembers(fractionName).find((userId) => userId === target.UserId))
			return "Player Is Already In The Fraction";
		Definitions.Server.FractionSystem.OpenInviteMenu.Send(target, player, fractionName);
		return "Invite Sent";
	},
);
