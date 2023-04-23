import Make from "@rbxts/make";
import { DataStoreService, ServerStorage } from "@rbxts/services";

const DataStore = DataStoreService.GetDataStore("FractionData");

interface Fraction {
	name: string;
	leaderId: number;
	members: number[];
	money: number;
}

function generateInstances(Folder: Folder, Fractions: Fraction[]) {
	for (const fraction of Fractions) {
		if (!fraction.name || !fraction.leaderId || !fraction.members || !fraction.money) continue;
		const Fraction = Make("Folder", {
			Name: fraction.name,
			Parent: Folder,
		});

		const Leader = Make("IntValue", {
			Name: "Leader",
			Value: fraction.leaderId,
			Parent: Fraction,
		});

		const Members = Make("Folder", {
			Name: "Members",
			Parent: Fraction,
		});

		for (const member of fraction.members) {
			const Member = Make("IntValue", {
				Name: tostring(member),
				Value: member,
				Parent: Members,
			});
		}

		const Money = Make("IntValue", {
			Name: "Money",
			Value: fraction.money,
			Parent: Fraction,
		});
	}
}

function loadData() {
	const Folder = Make("Folder", {
		Name: "Fractions",
		Parent: ServerStorage,
	});

	const data = DataStore.GetAsync("Fractions") as unknown as Fraction[];
	if (data) {
		generateInstances(Folder, data);
	}
}

function saveData() {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const Fractions: Fraction[] = [];
		for (const fraction of Folder.GetChildren()) {
			if (fraction.IsA("Folder")) {
				const Leader = fraction.FindFirstChild("Leader") as IntValue;
				const Members = fraction.FindFirstChild("Members") as Folder;
				const Money = fraction.FindFirstChild("Money") as IntValue;
				if (Leader && Members && Money) {
					const members: number[] = [];
					for (const member of Members.GetChildren()) {
						if (member.IsA("IntValue")) {
							members.push(member.Value);
						}
					}
					Fractions.push({
						name: fraction.Name,
						leaderId: Leader.Value,
						members: members,
						money: Money.Value,
					});
				}
			}
		}
		DataStore.SetAsync("Fractions", Fractions);
	}
}

function updateFractionData(fractionName: string) {
	const data = DataStore.GetAsync("Fractions") as unknown as Fraction[];
	if (data) {
		const FractionData = data.find((fraction) => fraction.name === fractionName);
		const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
		if (Folder) {
			const fraction = Folder.FindFirstChild(fractionName) as Folder;
			if (fraction) {
				const Leader = fraction.FindFirstChild("Leader") as IntValue;
				const Members = fraction.FindFirstChild("Members") as Folder;
				const Money = fraction.FindFirstChild("Money") as IntValue;
				if (Leader && Members && Money && FractionData) {
					Leader.Value = FractionData.leaderId;
					Money.Value = FractionData.money;
					for (const member of Members.GetChildren()) {
						if (member.IsA("IntValue")) {
							member.Destroy();
						}
					}
					for (const member of FractionData.members) {
						const Member = Make("IntValue", {
							Name: tostring(member),
							Value: member,
							Parent: Members,
						});
					}
				}
			}
		}
	}
}

function addMember(fractionName: string, userId: number) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Members = fraction.FindFirstChild("Members") as Folder;
			if (Members) {
				const Member = Make("IntValue", {
					Name: tostring(userId),
					Value: userId,
					Parent: Members,
				});
			}
		}
	}
}

function removeMember(fractionName: string, userId: number) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Members = fraction.FindFirstChild("Members") as Folder;
			if (Members) {
				const Member = Members.FindFirstChild(tostring(userId)) as IntValue;
				if (Member) {
					Member.Destroy();
				}
			}
		}
	}
}

function DepositInFractionBank(fractionName: string, amount: number) {
	if (amount <= 0) return "Invalid Amount";
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Money = fraction.FindFirstChild("Money") as IntValue;
			if (Money) {
				Money.Value += amount;
			}
		}
	}
}

function WithdrawFromFractionBank(fractionName: string, amount: number) {
	if (amount <= 0) return "Invalid Amount";
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Money = fraction.FindFirstChild("Money") as IntValue;
			if (Money) {
				if (Money.Value - amount < 0) return "Not Enough Money";
				Money.Value -= amount;
			}
		}
	}
}

function createFraction(fractionName: string, leaderId: number) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) return "Fraction Already Exists";
		const Fraction = Make("Folder", {
			Name: fractionName,
			Parent: Folder,
		});

		const Leader = Make("IntValue", {
			Name: "Leader",
			Value: leaderId,
			Parent: Fraction,
		});

		const Members = Make("Folder", {
			Name: "Members",
			Parent: Fraction,
		});

		const Money = Make("IntValue", {
			Name: "Money",
			Value: 0,
			Parent: Fraction,
		});
	}
}

function findFraction(fractionName: string) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) return fraction;
	}
}

function getFractionOwner(fractionName: string) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Leader = fraction.FindFirstChild("Leader") as IntValue;
			if (Leader) return Leader.Value;
		}
	}
}

function getFractionMembers(fractionName: string): number[] {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Members = fraction.FindFirstChild("Members") as Folder;
			if (Members) {
				const members: number[] = [];
				for (const member of Members.GetChildren()) {
					if (member.IsA("IntValue")) {
						members.push(member.Value);
					}
				}
				return members;
			}
		}
	}
	return [];
}

function getFractionMoney(fractionName: string) {
	const Folder = ServerStorage.FindFirstChild("Fractions") as Folder;
	if (Folder) {
		const fraction = Folder.FindFirstChild(fractionName) as Folder;
		if (fraction) {
			const Money = fraction.FindFirstChild("Money") as IntValue;
			if (Money) return Money.Value;
		}
	}
}

const FractionsModule = {
	loadData,
	saveData,
	updateFractionData,
	addMember,
	removeMember,
	DepositInFractionBank,
	WithdrawFromFractionBank,
	createFraction,
	findFraction,
	getFractionOwner,
	getFractionMembers,
	getFractionMoney,
};

export default FractionsModule;
