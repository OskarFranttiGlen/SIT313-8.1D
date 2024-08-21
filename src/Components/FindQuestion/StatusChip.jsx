import React from 'react';
import { Chip } from '@nextui-org/react';

const StatusChip = ({ status, statusColors }) => {
  return (
    // Chip component to display the status with appropriate styling
    <Chip 
      size="sm" // Small size for the chip
      color={statusColors[status] || 'default'} // Set chip color based on status, default if not found
      variant="flat" // Flat variant for a simple appearance
      className="mr-3" // Add right margin for spacing
    >
      {status} {/* Display the status text inside the chip */}
    </Chip>
  );
};

export default StatusChip;
