import { devices } from '@/components/Device/devices.js';
import DeliveryCard from '@/components/DeliveryCard';
import FAQs from '@/components/FAQs';

export async function generateStaticParams() {
  return devices.map((device) => ({
    device: device.name.replaceAll(' ', '%20'),
  }));
}

export default function Delivery() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Select your service</h2>
      <DeliveryCard option={'walkInService'} />
      <DeliveryCard option={'mailInService'} />
      <FAQs />
    </div>
  );
}
