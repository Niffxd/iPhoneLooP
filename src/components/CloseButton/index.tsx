import { Button } from '@mui/material';
import React, { FunctionComponent } from 'react';

import CrossIcon from '@/assets/icons/cross.svg';

type Variant = 'text' | 'outlined' | 'contained' | undefined;

interface CloseButtonProps {
  color?: string;
  variant?: Variant;
  onClick?: () => void;
}

export const CloseButton: FunctionComponent<CloseButtonProps> = ({
  color,
  onClick,
  variant = 'text',
}) => (
  <Button
    sx={{
      width: 28,
      minWidth: 28,
      maxHeight: 28,
      padding: 0,
      borderRadius: '8px',
    }}
    variant={variant}
    onClick={onClick}
  >
    <CrossIcon color={color} />
  </Button>
);
