'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useServiceStore } from '@/stores/service';
import moment from 'moment';
import FAQs from '@/components/FAQs';
import style from './ConfirmBooking.module.css';

export default function ConfirmBooking() {
  const today = new Date(Date.now()).toISOString().substring(0, 10);
  const service = useServiceStore();

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(today); // eslint-disable-line
  const [validDate, setValidDate] = useState(true);

  const serviceChosen = service.delivery;
  const currentDevice = service.device;
  const services = service.listOfRepairments;
  const price = service.price;

  const validateLocation =
    serviceChosen === null ||
    currentDevice === null ||
    services === null ||
    price === null;

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
    if (validateLocation) router.push('/');
  }, []); // eslint-disable-line

  return (
    <div className={style.confirm_booking_container}>
      <h2>iPhone {currentDevice} Repair</h2>
      <h4>Selected Repairs:</h4>
      <ul className={style.ul}>
        {!validateLocation ? (
          services?.map((service, index) => <li key={index}>{service}</li>)
        ) : (
          <>
            <li>
              <i>No services requested.</i>
            </li>
            <li>
              <i>
                Please go home and select one iPhone model and one repair at
                least.
              </i>
            </li>
          </>
        )}
      </ul>
      <form
        onSubmit={handleConfirmBooking}
        className={style.form_confirm_booking}
      >
        {!validateLocation &&
          Object.entries(formInputs.basic)?.map((section, index) => {
            return (
              <div key={`${index}-section`} className={style.section_container}>
                <h4>{section[0]}</h4>
                {!validateLocation &&
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
        {!validateLocation &&
          Object.entries(formInputs[serviceChosen])?.map((section, index) => {
            return (
              <div key={`${index}-section`} className={style.section_container}>
                <h4>{section[0]}</h4>
                {serviceChosen === 'mailInService'
                  ? !validateLocation &&
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
