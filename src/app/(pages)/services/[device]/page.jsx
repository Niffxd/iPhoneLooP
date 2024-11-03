import Device from '@/components/Device';
import ButtonBack from '@/components/ButtonBack';
import NavigationContainer from '@/components/NavigationContainer';
import Breadcrumb from '@/components/Breadcrumb';
import FAQs from '@/components/FAQs';

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
