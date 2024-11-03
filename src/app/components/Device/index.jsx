'use client'

import { useState } from 'react';
import { devices } from './devices.js';
import { useParams, useRouter } from 'next/navigation';
import style from './Device.module.css';

export default function Device() {
  const { device } = useParams();
  const router = useRouter();
  
  const [currentPrice, setCurrentPrice] = useState(0);
  const currentDeviceName = device.replaceAll('%20', ' ');

  const handlerSummation = (checked, price) => {
    if (typeof(price) === 'number') {
      if (checked) setCurrentPrice(currentPrice + price);
      else setCurrentPrice(currentPrice - price);
    }
  }

  const handleSubmitForm = e => {
    e.preventDefault();
    console.log('handleSubmitForm')
  }

  const currentDevice = devices.find(device => device.name === currentDeviceName)

  return (
    <div className={style.device_repair_container}>
      <h1>iPhone {currentDeviceName} Repair</h1>
      <br />
      <p>We are experts in repairing iPhones to microchip level including the most advanced faults. <b>We use original recycled and refurbished screens</b>. These screens are either pulled or refurbished in-house to a like-new condition. We have also high quality aftermarket screens. Please read our FAQ's below our pricing and please do not hesitate in submitting a question. Our average repair time is very fast  and it depends on the type of repair required.</p>
      <br />
      <form onSubmit={() => { }} className={style.form_budget}>
        <h4>Select your repairs:</h4>
        {
          currentDevice === undefined
            ? router.push("/services")
            : currentDevice
              .prices.map((repair, index) => {
                return (
                  <div className={style.repair_option_container} key={index}>
                    <label htmlFor={`${repair.name}-name`}>
                      <input type="checkbox" name={`${repair.name}-name`} id={`${repair.name}-id`} onChange={(e) => handlerSummation(e.target.checked, repair.price)} />
                      {repair.name}
                    </label>
                    {
                      typeof (repair.price) === 'number'
                        ? <span>AUD {repair.price}.00</span>
                        : <span>{repair.price}</span>
                    }
                  </div>
                )
              })
        }
        <br />
        <hr />
        <div className={style.total}>
          <span><b>Total</b></span>
          <span><b>AUD {currentPrice}</b></span>
        </div>
        <button
          type='submit'
          className={style.submit_button}
          onClick={(e) => handleSubmitForm(e)}
        >
          Choose your repair service
        </button>
      </form>
    </div>
  );
}
