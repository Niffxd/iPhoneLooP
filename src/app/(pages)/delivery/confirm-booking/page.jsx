'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import FAQs from '@/components/FAQs';
import style from './ConfirmBooking.module.css';

export default function ConfirmBooking() {
  const today = new Date(Date.now()).toISOString().substring(0, 10);
  const service = window.sessionStorage;

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(today);
  const [validDate, setValidDate] = useState(true);

  const serviceChosen = service.getItem('delivery');
  const currentDevice = service.getItem('device');
  const services = service.getItem('list')?.split(',');
  const price = service.getItem('price');

  const formInputs = {
    basic: {
      'Customer Info:': {
        'Full Name': 'text',
        Email: 'email',
        Passcode: 'tel',
        'Mobile Number': 'tel',
        'Alternate Phone Number': 'tel',
      },
    },
    walkInService: {
      'Booking Schedule:': {
        Date: 'date',
        Time: 'time',
        Message: 'text',
      },
    },
    mailInService: {
      'Address:': {
        'Address Line 1': 'text',
        'Address Line 2': 'text',
        Postcode: 'text',
        Message: 'text',
      },
    },
  };

  const handleValidationInput = (value, inputType) => {
    switch (inputType) {
      case 'date':
        if (moment(value).isoWeekday() === 7) setValidDate(false);
        else setValidDate(true);
        break;

      case 'time':
        break;

      default:
        break;
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    console.log('Booking');
  };

  const handlerUpdateDate = (e, inputType) => {
    handleValidationInput(e.target.value, inputType);
  };

  useEffect(() => {
    if (
      !window?.sessionStorage ||
      window?.sessionStorage.getItem('device') === null ||
      window?.sessionStorage.getItem('list') === null ||
      window?.sessionStorage.getItem('price') === null ||
      window?.sessionStorage.getItem('delivery') === null
    )
      router.push('/');
  }, []);

  return (
    <div className={style.confirm_booking_container}>
      <h2>iPhone {currentDevice} Repair</h2>
      <h4>Selected Repairs:</h4>
      <ul className={style.ul}>
        {services?.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <form
        onSubmit={handleConfirmBooking}
        className={style.form_confirm_booking}
      >
        {services &&
          Object.entries(formInputs.basic)?.map((section, index) => {
            return (
              <div key={`${index}-section`} className={style.section_container}>
                <h4>{section[0]}</h4>
                {services &&
                  Object.entries(section[1])?.map((input, index) => {
                    return (
                      <label
                        htmlFor={`${input[0]}-name`}
                        key={`${index}-input`}
                      >
                        {`${input[0]}`}
                        <input
                          type={`${input[1]}`}
                          name={`${input[0]}-name`}
                          id={`${input[0]}-id`}
                        />
                      </label>
                    );
                  })}
              </div>
            );
          })}
        {services &&
          Object.entries(formInputs[serviceChosen])?.map((section, index) => {
            return (
              <div key={`${index}-section`} className={style.section_container}>
                <h4>{section[0]}</h4>
                {serviceChosen === 'mailInService'
                  ? services &&
                    Object.entries(section[1]).map((inputType, index) => {
                      return (
                        <label
                          htmlFor={`${inputType[0]}-name`}
                          key={`${index}-inputType`}
                        >
                          {`${inputType[0]}`}
                          <input
                            type={`${inputType[1]}`}
                            name={`${inputType[0]}-name`}
                            id={`${inputType[0]}-id`}
                          />
                        </label>
                      );
                    })
                  : services &&
                    Object.entries(section[1])?.map((inputType, index) => {
                      return (
                        <label
                          htmlFor={`${inputType[0]}-name`}
                          key={`${index}-inputType`}
                        >
                          {`${inputType[0]}`}
                          {inputType[1] === 'date' && (
                            <>
                              <input
                                type={`${inputType[1]}`}
                                name={`${inputType[0]}-name`}
                                id={`${inputType[0]}-id`}
                                value={selectedDate}
                                onChange={(e) =>
                                  handlerUpdateDate(e, inputType[1])
                                }
                              />
                              {!validDate && (
                                <p className={style.warning}>
                                  The current date is a weekend or holiday.
                                  Please change to be able to booking
                                </p>
                              )}
                            </>
                          )}
                          {inputType[1] === 'time' && (
                            <>
                              <select
                                name={`${inputType[0]}-name`}
                                id={`${inputType[0]}-id`}
                              ></select>
                              {!validDate && (
                                <p className={style.warning}>
                                  The current date is a weekend or holiday.
                                  Please change to be able to booking
                                </p>
                              )}
                            </>
                          )}
                          {inputType[1] === 'text' && (
                            <input
                              type={`${inputType[1]}`}
                              name={`${inputType[0]}-name`}
                              id={`${inputType[0]}-id`}
                            />
                          )}
                        </label>
                      );
                    })}
              </div>
            );
          })}
        <br />
        <br />
        <div className={style.total_container}>
          <hr />
          <div className={style.total}>
            <span>
              <b>Total</b>
            </span>
            <span>
              <b>AUD {price}.00</b>
            </span>
          </div>
          <button type="submit" className={style.submit_button}>
            Confirm Booking
          </button>
        </div>
      </form>
      <FAQs />
    </div>
  );
}
