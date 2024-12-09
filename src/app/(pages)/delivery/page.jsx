import DeliveryCard from '@/components/DeliveryCard';
import FAQs from '@/components/FAQs';

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
