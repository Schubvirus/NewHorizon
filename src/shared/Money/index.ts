function deposit(player: Player, amount: number) {
	const playerData = player.FindFirstChild("Playerdata") as Folder;
	const euro = playerData.FindFirstChild("Wallet") as NumberValue;
	const bank = playerData.FindFirstChild("Bank") as NumberValue;
	if (amount > euro.Value) {
		return "You don't have enough money!";
	}
	euro.Value -= amount;
	bank.Value += amount;
	return "Deposit successful!";
}

function withdraw(player: Player, amount: number) {
	const playerData = player.FindFirstChild("Playerdata") as Folder;
	const euro = playerData.FindFirstChild("Wallet") as NumberValue;
	const bank = playerData.FindFirstChild("Bank") as NumberValue;
	if (amount > bank.Value) {
		return "You don't have enough money!";
	}
	euro.Value += amount;
	bank.Value -= amount;
	return "Withdraw successful!";
}

function getBalance(player: Player) {
	const playerData = player.FindFirstChild("Playerdata") as Folder;
	const bank = playerData.FindFirstChild("Bank") as NumberValue;
	const euro = playerData.FindFirstChild("Wallet") as NumberValue;
	return { bank: bank.Value, euro: euro.Value };
}

function transfer(player: Player, target: Instance, amount: number) {
	const playerData = player.FindFirstChild("Playerdata") as Folder;
	const targetData = target.FindFirstChild("Playerdata") as Folder;
	const bank = playerData.FindFirstChild("Bank") as NumberValue;
	const targetBank = targetData.FindFirstChild("Bank") as NumberValue;
	if (amount > bank.Value) {
		return "You don't have enough money!";
	}
	bank.Value -= amount;
	targetBank.Value += amount;
	return "Transfer successful!";
}

const MoneyModule = {
	deposit,
	withdraw,
	getBalance,
	transfer,
};

export default MoneyModule;
