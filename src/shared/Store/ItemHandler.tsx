import { ReplicatedStorage, StarterGui } from "@rbxts/services";

const Network = ReplicatedStorage.WaitForChild("Network") as Folder;
const purchaseItemFunction = Network.WaitForChild("purchase_item") as RemoteFunction;

function purchaseItem(name: string) {
	try {
		purchaseItemFunction.InvokeServer(name);
	} catch (err: unknown) {
		if (typeIs(err, "string")) {
			StarterGui.SetCore("SendNotification", {
				Title: "Failed to buy",
				Text: err,
				Duration: 2,
			});
			return;
		}
	}
	return;
}

const itemModule = {
	purchaseItem,
};

export = itemModule;
