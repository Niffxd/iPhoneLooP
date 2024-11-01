import { devices } from '@/components/Devices/devices.js';
import CardDevice from '../CardDevice'; // eslint-disable-line
import style from './SelectDevice.module.css';

export default function SelectDevice () {
  return (
    <div className={style.select_device_container}>
      <h1>Select your iPhone Model</h1>
      <div className={style.devices_container}>
        {
          devices.map((device, index) => {
            return (
              <CardDevice key={index} image={device.image} deviceName={device.name} />
            );
          })
        }
      </div>
    </div>
  );
}
