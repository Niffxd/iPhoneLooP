import { devices } from '@/components/Device/devices.js';
import Device from '@/components/Device';
import ButtonBack from '@/components/ButtonBack';
import NavigationContainer from '@/components/NavigationContainer';
import Breadcrumb from '@/components/Breadcrumb';
import FAQs from '@/components/FAQs';

export async function generateStaticParams() {
  return devices.map((device) => ({
    device: device.name.replaceAll(' ', '-'),
  }));
}

export default function DeviceContainer() {
  return (
    <>
      <NavigationContainer>
        <ButtonBack />
        <Breadcrumb />
      </NavigationContainer>
      <Device />
      <FAQs />
    </>
  );
}
