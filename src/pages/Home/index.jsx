import HomeSlider from '../../components/HomeSlider'; // eslint-disable-line
import FunnelDevice from '../../components/FunnelDevice'; // eslint-disable-line
import WhatCanIRepair from '../../components/WhatCanIRepair'; // eslint-disable-line
import Reviews from '../../components/Reviews'; // eslint-disable-line

export default function Home () {
  return (
    <>
      <HomeSlider />
      <FunnelDevice />
      <WhatCanIRepair />
      <Reviews />
    </>
  );
}
