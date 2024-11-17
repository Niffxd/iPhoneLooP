'use client'

import { useParams } from 'next/navigation'
import FAQs from '@/components/FAQs';
import style from './ConfirmBooking.module.css';


export default function ConfirmBooking() {
  const { device } = useParams();

  const currentDevice = device.replaceAll('%20', ' ');
  const services = sessionStorage.getItem('list').split(',');
  const price = sessionStorage.getItem('price')

  const formInputs = {
    "Customer Info:": {
      "Full Name": "text",
      "Email": "email",
      "Passcode": "tel",
      "Mobile Number": "tel",
      "Alternate Phone Number": "tel",
    },
    "Address:": {
      "Address Line 1": "text",
      "Address Line 2": "text",
      "Postcode": "text",
      "Message": "text",
    }
  }

  return (
    <div className={style.confirm_booking_container}>
      <h2>iPhone {currentDevice} Repair</h2>
      <br />
      <h4>Selected Repairs:</h4>
      <br />
      <ul className={style.ul}>
        {services.map((service, index) => <li key={index}>{service}</li>)}
      </ul>
      <form onSubmit={() => console.log('it does')} className={style.form_confirm_booking}>
        {
          Object
            .entries(formInputs)
            .map((section, index) => {
              return (
                <div key={`${index}-section`} className={style.section_container}>
                  <h4>{section[0]}</h4>
                  {Object
                    .entries(section[1])
                    .map((input, index) => {
                      return (
                        <label htmlFor={`${input[0]}-name`} key={`${index}-input`}>
                          {`${input[0]}`}
                          <input type={`${input[1]}`} name={`${input[0]}-name`} id={`${input[0]}-id`} />
                        </label>
                      )
                    })
                  }
                </div>
              )
            })
        }
      </form>
      <br />
      <br />
      <div className={style.total_container}>
        <hr />
        <div className={style.total}>
          <span><b>Total</b></span>
          <span><b>AUD {price}.00</b></span>
        </div>
      </div>
      <FAQs />
    </div>
  )
}
