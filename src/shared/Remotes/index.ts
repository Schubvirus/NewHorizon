import { DefinitionBuilder, NetBuilder } from "@rbxts/netbuilder";
import { t } from "@rbxts/t";

export = new NetBuilder()
	.BindNamespace(
		"BankingSystem",
		new NetBuilder()
			.BindDefinition(new DefinitionBuilder("Deposit").SetArguments(t.number).SetReturn(t.string).Build())
			.BindDefinition(new DefinitionBuilder("OpenBank").Build())
			.BindDefinition(new DefinitionBuilder("Withdraw").SetArguments(t.number).SetReturn(t.string).Build())
			.BindDefinition(new DefinitionBuilder("GetBalance").SetReturn(t.table).Build())
			.BindDefinition(new DefinitionBuilder("BuyMoney").SetArguments(t.number).SetReturn(t.string).Build())
			.BindDefinition(new DefinitionBuilder("OpenShop").Build())
			.BindDefinition(
				new DefinitionBuilder("Transfer").SetArguments(t.Instance, t.number).SetReturn(t.string).Build(),
			)
			.AsNamespace(),
	)
	.BindNamespace(
		"FractionSystem",
		new NetBuilder()
			.BindDefinition(new DefinitionBuilder("CreateFraction").SetArguments(t.string).SetReturn(t.string).Build())
			.BindDefinition(
				new DefinitionBuilder("InvitePlayer").SetArguments(t.Instance, t.string).SetReturn(t.string).Build(),
			)
			.BindDefinition(new DefinitionBuilder("OpenInviteMenu").SetArguments(t.Instance, t.string).Build())
			.BindDefinition(
				new DefinitionBuilder("KickPlayer").SetArguments(t.Instance, t.string).SetReturn(t.string).Build(),
			)
			.BindDefinition(new DefinitionBuilder("LeaveFraction").SetArguments(t.string).Build())
			.BindDefinition(
				new DefinitionBuilder("DepositInFractionBank").SetArguments(t.number).SetReturn(t.string).Build(),
			)
			.BindDefinition(
				new DefinitionBuilder("WithdrawFromFractionBank").SetArguments(t.number).SetReturn(t.string).Build(),
			)
			.BindDefinition(new DefinitionBuilder("GetFractionBalance").SetReturn(t.number).Build())
			.BindDefinition(new DefinitionBuilder("GetFractionMembers").SetReturn(t.table).Build())
			.BindDefinition(new DefinitionBuilder("GetFractionOwner").SetReturn(t.Instance).Build())
			.BindDefinition(new DefinitionBuilder("GetFractionName").SetReturn(t.string).Build())
			.AsNamespace(),
	)
	.Build();
