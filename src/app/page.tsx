import HomeSlider from "@/components/HomeSlider";
import FunnelDevice from "@/components/FunnelDevice";
import WhatCanIRepair from "@/components/WhatCanIRepair";
import Reviews from "@/components/Reviews";
import ReadyForYourRepair from "@/components/ReadyForYourRepair";

export default function Home() {
	return (
		<>
			<HomeSlider />
			<FunnelDevice />
			<WhatCanIRepair />
			<Reviews />
			<ReadyForYourRepair />
		</>
	);
}
