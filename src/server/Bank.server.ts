import { Players, Workspace } from "@rbxts/services";
import Definitions from "shared/Remotes";
import MoneyModule from "shared/Money";
import ServerMoneyModule from "shared/Money/server";
Definitions.Server.BankingSystem.Deposit.SetCallback((player, amount) => {
	const _amount = tonumber(amount);
	if (_amount) {
		return MoneyModule.deposit(player, _amount);
	}
	return "Invalid amount!";
});

Definitions.Server.BankingSystem.Withdraw.SetCallback((player, amount) => {
	const _amount = tonumber(amount);
	if (_amount) {
		return MoneyModule.withdraw(player, _amount);
	}
	return "Invalid amount!";
});

Definitions.Server.BankingSystem.GetBalance.SetCallback((player) => {
	return MoneyModule.getBalance(player);
});

Definitions.Server.BankingSystem.Transfer.SetCallback((player, target: Instance, amount: number) => {
	const _amount = tonumber(amount);
	if (_amount) {
		return MoneyModule.transfer(player, target, _amount);
	}
	return "Invalid amount!";
});

Definitions.Server.BankingSystem.OpenBank.Connect((player) => {
	print("OpenBank");
	return;
});

task.spawn(() => {
	for (const item of Workspace.GetChildren()) {
		if (item.IsA("MeshPart") && item.Name === "Open_atm" && item.FindFirstChild("ProximityPrompt")) {
			const prompt = item.FindFirstChild("ProximityPrompt") as ProximityPrompt;
			prompt.Triggered.Connect((plr) => {
				Definitions.Server.BankingSystem.OpenBank.Send(plr);
			});
		}
	}
});

Players.PlayerAdded.Connect((player) => {
	ServerMoneyModule.loadData(player);
});

Players.PlayerRemoving.Connect((player) => {
	ServerMoneyModule.saveData(player, player.FindFirstChild("Playerdata") as Folder);
});
