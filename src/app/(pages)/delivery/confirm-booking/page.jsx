'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useServiceStore } from '@/stores/service';
import { useNotify } from '@/hooks/notify';
import axios from 'axios';
import moment from 'moment';
import FAQs from '@/components/FAQs';
import style from './ConfirmBooking.module.css';

export default function ConfirmBooking() {
  const today = new Date(Date.now()).toISOString().substring(0, 10);
  const service = useServiceStore();
  const notify = useNotify();

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(today);
  const [validDate, setValidDate] = useState(true);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [schedule, setSchedule] = useState([]);

  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternativeNumber, setAlternativeNumber] = useState('');

  const serviceChosen = service.delivery;
  const currentDevice = service.device;
  const services = service.listOfRepairments;
  const price = service.price;

  const validateLocation =
    serviceChosen === null ||
    currentDevice === null ||
    services === null ||
    price === null;

  const allSchedule = [
    moment(selectedDate).isoWeekday() === 6 ? '10:00' : '09:30',
    '10:30',
    '11:30',
    '12:30',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
  ];

  const formInputs = {
    basic: {
      'Customer Info:': {
        'Full Name': 'text',
        Email: 'email',
        Passcode: 'number',
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

  const handleValidationInput = (e, inputType) => {
    const { value } = e.target;
    switch (inputType) {
      case 'date':
        setSelectedDate(value);
        if (moment(value).isoWeekday() === 7) setValidDate(false);
        else setValidDate(true);
        break;

      case 'time':
        setSelectedTime(value);
        break;

      case 'text':
        setSelectedMessage(value);
        break;

      case 'Full Name':
        setFullName(value);
        break;

      case 'Email':
        setEmail(value);
        break;

      case 'Passcode':
        setPasscode(value.substring(0, 6));
        break;

      case 'Mobile Number':
        setMobileNumber(value);
        break;

      case 'Alternate Phone Number':
        setAlternativeNumber(value);
        break;

      default:
        break;
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    postDataToApi();
  };

  async function getDataFromApi() {
    try {
      const events = await axios
        .get('/delivery/confirm-booking/api')
        .then((res) => res.data);

      setSchedule(events);
      setSelectedTime(
        allSchedule.filter(
          (item) => !schedule[selectedDate]?.includes(item),
        )[0],
      );
      setLoadingSchedule(false);
    } catch (e) {
      console.error('Error getting events', e);
    }
  }

  async function postDataToApi() {
    const newAppointment = {
      fullname,
      email,
      passcode: passcode.toString(),
      mobileNumber,
      alternativeNumber,
      selectedDate,
      selectedTime,
      message: selectedMessage,
    };

    try {
      await axios.post('/delivery/confirm-booking/api', newAppointment);
      notify.success('Appointment settled ⭐!');
      setTimeout(() => router.push('/'), 5000);
    } catch (error) {
      notify.error('Something went wrong 🫢');
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    }
  }

  useEffect(() => {
    if (validateLocation) router.push('/');
  }, []); // eslint-disable-line

  useEffect(() => {
    getDataFromApi();
  }, []);

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
                  Object.entries(section[1])?.map((inputType, index) => {
                    return (
                      <label
                        htmlFor={`${inputType[0]}-name`}
                        key={`${index}-input`}
                      >
                        {`${inputType[0]}`}
                        <input
                          type={`${inputType[1]}`}
                          name={`${inputType[0]}-name`}
                          id={`${inputType[0]}-id`}
                          maxLength={inputType[0] === 'Passcode' ? 6 : 30}
                          value={
                            inputType[0] === 'Full Name'
                              ? fullname
                              : inputType[0] === 'Email'
                                ? email
                                : inputType[0] === 'Passcode'
                                  ? passcode
                                  : inputType[0] === 'Mobile Number'
                                    ? mobileNumber
                                    : inputType[0] === 'Alternate Phone Number'
                                      ? alternativeNumber
                                      : ''
                          }
                          placeholder={
                            inputType[0] === 'Full Name'
                              ? 'John Doe'
                              : inputType[0] === 'Email'
                                ? 'johndoe@example.com'
                                : inputType[0] === 'Passcode'
                                  ? '123456'
                                  : '+1 (555) 987-6543'
                          }
                          onChange={(e) =>
                            handleValidationInput(e, `${inputType[0]}`)
                          }
                          required
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
                            required
                          />
                        </label>
                      );
                    })
                  : !validateLocation &&
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
                                min={today}
                                type={`${inputType[1]}`}
                                name={`${inputType[0]}-name`}
                                id={`${inputType[0]}-id`}
                                required
                                value={selectedDate}
                                onChange={(e) =>
                                  handleValidationInput(e, inputType[1])
                                }
                              />
                              {!validDate && (
                                <p className={style.warning}>
                                  The current date it is on weekend or holiday.
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
                                disabled={
                                  !validDate ||
                                  loadingSchedule ||
                                  !allSchedule.filter(
                                    (item) =>
                                      !schedule[selectedDate]?.includes(item),
                                  ).length
                                }
                                required
                                onChange={(e) =>
                                  handleValidationInput(e, inputType[1])
                                }
                              >
                                {!validDate ||
                                loadingSchedule ||
                                !allSchedule.filter(
                                  (item) =>
                                    !schedule[selectedDate]?.includes(item),
                                ).length ? (
                                  <option value="disabled">
                                    {loadingSchedule
                                      ? 'Getting available schedules'
                                      : 'Not available'}
                                  </option>
                                ) : (
                                  <>
                                    {allSchedule
                                      .filter(
                                        (item) =>
                                          !schedule[selectedDate]?.includes(
                                            item,
                                          ),
                                      )
                                      .map((time, index) => {
                                        return (
                                          <option key={index} value={time}>
                                            {time}
                                          </option>
                                        );
                                      })}
                                  </>
                                )}
                              </select>
                            </>
                          )}
                          {inputType[1] === 'text' && (
                            <input
                              style={{
                                height: '100px',
                              }}
                              type={`${inputType[1]}`}
                              name={`${inputType[0]}-name`}
                              id={`${inputType[0]}-id`}
                              placeholder="Hey! Type a note for me"
                              onChange={(e) =>
                                handleValidationInput(e, inputType[1])
                              }
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
