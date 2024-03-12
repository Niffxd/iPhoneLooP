import whatsapp from '../../assets/images/icons/whatsapp.svg';
import facebook from '../../assets/images/icons/facebook.svg';
import instagram from '../../assets/images/icons/instagram.svg';
import mail from '../../assets/images/icons/mail.svg';
import location from '../../assets/images/icons/location.svg';

const svgs = {
  whatsapp,
  facebook,
  instagram,
  mail,
  location
};

export const foundSVG = icon => {
  return svgs[icon.toLowerCase()];
};

export const contactItems = [
  {
    name: 'WhatsApp',
    link: 'https://api.whatsapp.com/send?phone=61466618127',
    text: '+61 466 618 127'
  },
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/Phonelooperth/',
    text: 'Phone LooP Perth'
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/phone.loop/',
    text: 'Phone LooP'
  },
  {
    name: 'Location',
    link: 'https://maps.app.goo.gl/w75vFrQviGR1rMCJ8',
    text: 'Mount Hawthorn, Perth'
  },
  {
    name: 'Mail',
    link: 'mailto:nicosanchez675@gmail.com?subject=Ask%20for%20a%20service&body=Tell%20me%20about%20your%20problem%20and%20I%20will%20response%20ASAP!%20%F0%9F%98%83',
    text: 'phonelooperth@gmail.com'
  }
];
