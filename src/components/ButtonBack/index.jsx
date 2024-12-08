'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { backIcon } from '@/assets/images/icons/icons.js';

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <Image src={backIcon} alt="button-back" width={32} height={32} />
    </button>
  );
}
