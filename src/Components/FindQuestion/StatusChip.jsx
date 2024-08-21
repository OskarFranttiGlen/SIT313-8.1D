import React from 'react';
import { Chip } from '@nextui-org/react';

const StatusChip = ({ status, statusColors }) => {
  return (
    <Chip 
      size="sm" 
      color={statusColors[status] || 'default'} 
      variant="flat" 
      className="mr-3"
    >
      {status}
    </Chip>
  );
};

export default StatusChip;
