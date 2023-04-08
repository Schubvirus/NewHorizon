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

interface MoneyPack {
	amount: number;
	price: number;
	id: number;
}

const moneyPacks: MoneyPack[] = [
	{
		amount: 2500,
		price: 100,
		id: 1511731964,
	},
	{
		amount: 5000,
		price: 200,
		id: 1514628366,
	},
	{
		amount: 10000,
		price: 400,
		id: 1514628620,
	},
	{
		amount: 20000,
		price: 780,
		id: 1514628884,
	},
	{
		amount: 30000,
		price: 1160,
		id: 1514629195,
	},
	{
		amount: 40000,
		price: 1550,
		id: 1514629488,
	},
	{
		amount: 50000,
		price: 1930,
		id: 1514629774,
	},
];

const MoneyModule = {
	deposit,
	withdraw,
	getBalance,
	transfer,
	moneyPacks,
};

export default MoneyModule;
