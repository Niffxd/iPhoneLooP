'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import style from './DeliveryCard.module.css';

export default function DeliveryCard({ option }) {
  const [open, setOpen] = useState(false);
  const deliveryMethod = window.sessionStorage;

  const router = useRouter();
  const pathname = usePathname();

  const dataOptions = {
    mailInService: {
      title: 'Mail-In Service',
      description: [
        'Send us your Phone well wrapped to avoid bumps and knocks.',
        'Once we receive the package you will receive a notification.',
        'As soon as your phone is ready, we will send you a message with the tracking number. Please fill in your details below.',
      ],
      dialog: {
        image: '/mail-in-service.jpg',
        description: [
          'Send your Phone to this address:',
          'Phone Loop',
          '32 Elizabeth Street.',
          'North Perth. 6006',
          '0466618127',
        ],
      },
    },
    walkInService: {
      title: 'Walk-In Service',
      description: [
        'Visit us today!',
        '32 Elizabeth Street. North Perth',
        'We recommend booking to avoid waiting times',
        'Express turnarounds are available',
      ],
      dialog: {
        image: '/walk-in-service.jpg',
        description: [
          'For clients based in Perth who wish to visit us, we are working with appointments to avoid waiting times. Simply book your repair via our website booking page or Whatsapp to confirm your appointment time before heading to us.',
        ],
      },
    },
  };

  const handlerChooseService = () => {
    deliveryMethod.setItem('delivery', option);
    router.push(`${pathname}/confirm-booking`);
  };

  return (
    <div className={style.delivery_card_container}>
      <h3>{dataOptions[option].title}</h3>
      <hr className={style.divider} />
      <ul className={style.ul}>
        {dataOptions[option].description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className={style.buttons_container}>
        <button onClick={() => setOpen(true)}>LEARN MORE</button>
        <button onClick={handlerChooseService}>BOOK NOW</button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent className={style.modal_content}>
          <div
            className={style.modal_image}
            style={{ background: `url(${dataOptions[option].dialog.image})` }}
          ></div>
          {dataOptions[option].dialog.description.map((item, index) => {
            return <DialogContentText key={index}>{item}</DialogContentText>;
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
