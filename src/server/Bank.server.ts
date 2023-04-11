import { Players, Workspace, MarketplaceService } from "@rbxts/services";
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

const moneyPacks = MoneyModule.moneyPacks;

MarketplaceService.ProcessReceipt = (receiptInfo) => {
	const player = Players.GetPlayerByUserId(receiptInfo.PlayerId);
	if (player) {
		const pack = moneyPacks.find((pack) => pack.id === receiptInfo.ProductId);
		if (pack) {
			const Playerdata = player.WaitForChild("Playerdata") as Folder;
			const Wallet = Playerdata.WaitForChild("Wallet") as NumberValue;
			Wallet.Value += pack.amount;
			return Enum.ProductPurchaseDecision.PurchaseGranted;
		}
	}
	return Enum.ProductPurchaseDecision.NotProcessedYet;
};

Definitions.Server.BankingSystem.BuyMoney.SetCallback((player, id) => {
	const pack = moneyPacks.find((pack) => pack.id === id);
	if (pack) {
		const product = MarketplaceService.GetProductInfo(pack.id);
		if (product) {
			MarketplaceService.PromptProductPurchase(player, pack.id);
			return "Prompted Purchase!";
		}
	}
	return "Failed to buy money!";
});

Definitions.Server.BankingSystem.OpenShop.Connect((player) => {
	Definitions.Server.BankingSystem.OpenShop.Send(player);
	return;
});

Definitions.Server.BankingSystem.OpenBank.Connect((player) => {
	Definitions.Server.BankingSystem.OpenBank.Send(player);
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
