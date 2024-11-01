'use client'

import { useState } from 'react';
import { devices } from '@/components/Devices/devices.js';
import { useParams } from 'next/navigation';
import style from './Device.module.css';

export default function Device () {
  const { device } = useParams();
  
  const [currentDevice, setCurrentDevice] = useState(device.replaceAll('%20', ' ')); // eslint-disable-line
  const [currentPrice, setCurrentPrice] = useState(0);

  const handlerSummation = (checked, price) => {
    if(checked) setCurrentPrice(currentPrice + price);
    else setCurrentPrice(currentPrice - price);
  }

  const handleSubmitForm = e => {
    e.preventDefault();
    console.log('handleSubmitForm')
  }

  return (
    <div className={style.device_repair_container}>
      <h1>iPhone {currentDevice} Repair</h1>
      <br />
      <p>We are experts in repairing iPhon es to microchip level including the most advanced faults. <b>We use original recycled and refurbished screens</b>. These screens are either pulled or refurbished in-house to a like-new condition. , We have also high quality aftermarket screens. Please read our FAQ&apos;s below our pricing and please do not hesitate in submitting a question. Our average repair time is very fast  and it depends on the type of repair required.</p>
      <br />
      <form onSubmit={() => {}} className={style.form_budget}>
      <h4>Select your repairs:</h4>
        {
          devices.find(device => device.name === currentDevice)
            .prices.map((repair, index) => {
              return (
                <div className={style.repair_option_container} key={index}>
                  <label htmlFor={`${repair.name}-name`}>
                    <input type="checkbox" name={`${repair.name}-name`} id={`${repair.name}-id`} onChange={(e) => handlerSummation(e.target.checked, repair.price)} />
                    {repair.name}
                  </label>
                  {
                    typeof(repair.price) === 'number'
                      ? <p>$ {repair.price}.00</p>
                      : <p>{repair.price}</p>
                  }
                </div>
              )
            })
        }
        <br />
        <hr />
        <div className={style.total}>
          <p><b>Total</b></p>
          <p><b>$ {currentPrice}</b></p>
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
