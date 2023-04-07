import Make from "@rbxts/make";
import { DataStoreService } from "@rbxts/services";

const cashDataStore = DataStoreService.GetDataStore("cashDataStore");

let id = 0;

interface PlayerData {
	Euro: number;
	Bank: number;
	Jailed: number;
}

function dataStoreKey(player: Player) {
	return `user_${player.UserId}`;
}

function loadData(player: Player) {
	id++;
	const data = cashDataStore.GetAsync(dataStoreKey(player)) as unknown as PlayerData;
	Make("Folder", {
		Name: "Playerdata",
		Children: [
			Make("NumberValue", {
				Name: "Wallet",
				Value: data && data.Euro ? data.Euro : 500,
			}),
			Make("NumberValue", {
				Name: "Bank",
				Value: data && data.Bank ? data.Bank : 0,
			}),
			Make("NumberValue", {
				Name: "Jailed",
				Value: data && data.Jailed ? data.Jailed : 0,
			}),
			Make("NumberValue", {
				Name: "ID",
				Value: id,
			}),
		],
		Parent: player,
	});
}

function saveData(player: Player, dataFolder: Folder) {
	const euro = dataFolder.FindFirstChild("Wallet") as NumberValue;
	const jailed = dataFolder.FindFirstChild("Jailed") as NumberValue;
	const bank = dataFolder.FindFirstChild("Bank") as NumberValue;
	const playerData = {
		Euro: euro.Value,
		Jailed: jailed.Value,
		Bank: bank.Value,
	};
	cashDataStore.SetAsync(dataStoreKey(player), playerData);
}

const ServerMoneyModule = {
	loadData,
	saveData,
};

export default ServerMoneyModule;
