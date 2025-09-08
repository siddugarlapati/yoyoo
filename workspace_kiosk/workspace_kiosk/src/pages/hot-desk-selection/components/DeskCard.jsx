import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeskCard = ({ desk, onSelect, isSelected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-white';
      case 'occupied':
        return 'bg-destructive text-white';
      case 'unavailable':
        return 'bg-muted-foreground text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'occupied':
        return 'XCircle';
      case 'unavailable':
        return 'MinusCircle';
      default:
        return 'Circle';
    }
  };

  const isClickable = desk?.status === 'available';

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.02, y: -2 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      className={`
        relative bg-card border-2 rounded-lg p-4 transition-all duration-200
        ${isSelected ? 'border-primary shadow-elevated' : 'border-border shadow-soft'}
        ${isClickable ? 'cursor-pointer hover:shadow-elevated' : 'cursor-not-allowed opacity-75'}
      `}
      onClick={isClickable ? () => onSelect(desk) : undefined}
    >
      {/* Status Badge */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(desk?.status)}`}>
        <div className="flex items-center gap-1">
          <Icon name={getStatusIcon(desk?.status)} size={12} />
          <span className="capitalize">{desk?.status}</span>
        </div>
      </div>
      {/* Desk Info */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {desk?.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>{desk?.zone}</span>
        </div>
      </div>
      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {desk?.amenities?.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
          >
            <Icon name={getAmenityIcon(amenity)} size={12} />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      {/* Action Button */}
      {isClickable && (
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          fullWidth
          iconName={isSelected ? "Check" : "Plus"}
          iconPosition="left"
          iconSize={16}
        >
          {isSelected ? "Selected" : "Select Desk"}
        </Button>
      )}
      {!isClickable && desk?.status === 'occupied' && (
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Available at {desk?.availableAt || "2:30 PM"}
          </span>
        </div>
      )}
    </motion.div>
  );
};

const getAmenityIcon = (amenity) => {
  const iconMap = {
    'Dual Monitor': 'Monitor',
    'Standing Desk': 'ArrowUp',
    'Whiteboard Access': 'PenTool',
    'Phone Booth Nearby': 'Phone',
    'Power Outlet': 'Zap',
    'Natural Light': 'Sun'
  };
  return iconMap?.[amenity] || 'Circle';
};

export default DeskCard;