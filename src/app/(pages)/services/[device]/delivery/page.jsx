import DeliveryCard from '@/components/DeliveryCard';
import FAQs from '@/components/FAQs';

export default function Delivery() {

  {/* DEPOT COMPONENT */}

  // const { list, price } = window.sessionStorage

  // const currentList = list.split(',')

  // return (
  //   <div>
  //     <ul>
  //       {currentList.map((item, index) => <li key={index}>{item}</li>)}
  //     </ul>
  //     <p>{price}</p>
  //   </div>
  // )

  return (
    <div style={{ padding: 20 }}>
      <h2>Select your service</h2>
      <DeliveryCard option={"mailInService"} />
      <DeliveryCard option={"walkInService"} />
      <FAQs />
    </div>
  )

}
