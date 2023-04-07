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
			.BindDefinition(
				new DefinitionBuilder("Transfer").SetArguments(t.Instance, t.number).SetReturn(t.string).Build(),
			)
			.AsNamespace(),
	)
	.Build();
