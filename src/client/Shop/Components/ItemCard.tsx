import Roact from "@rbxts/roact";
import itemModule from "shared/Store/ItemHandler";

interface props {
	strokeColor: Color3;
	price: number;
	icon: string;
	name: string;
}

function ItemCard({ strokeColor, price, icon, name }: props) {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={Color3.fromRGB(25, 25, 25)}>
			<uicorner />
			<uistroke LineJoinMode={"Round"} Thickness={2} Color={strokeColor} />
			<imagebutton
				Image={icon}
				Size={new UDim2(0.65, 0, 0.65, 0)}
				Position={new UDim2(0.175, 0, 0.1, 0)}
				BackgroundTransparency={1}
				Event={{
					MouseButton1Click: () => {
						itemModule.purchaseItem(name);
					},
				}}
			>
				<uicorner />
				<uistroke LineJoinMode={"Round"} Thickness={2} Color={Color3.fromRGB(220, 220, 220)} />
			</imagebutton>
			<textlabel
				Text={`${name} - <font color="rgb(46, 186, 18)">${price}</font>€`}
				Size={new UDim2(1, 0, 0.25, 0)}
				Position={new UDim2(0, 0, 0.75, 0)}
				TextScaled={true}
				RichText={true}
				TextXAlignment={"Center"}
				TextYAlignment={"Center"}
				TextColor3={Color3.fromRGB(220, 220, 220)}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}

export = ItemCard;
