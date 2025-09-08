import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import FilterToolbar from './components/FilterToolbar';
import FloorPlanGrid from './components/FloorPlanGrid';
import BookingModal from './components/BookingModal';
import ZoneDistribution from './components/ZoneDistribution';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const HotDeskSelection = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState('all');
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  // Mock desk data
  const allDesks = [
    {
      id: 'QZ-001',
      name: 'Desk QZ-001',
      zone: 'Quiet Zone',
      status: 'available',
      amenities: ['Dual Monitor', 'Standing Desk', 'Natural Light'],
      availableAt: null
    },
    {
      id: 'QZ-002',
      name: 'Desk QZ-002',
      zone: 'Quiet Zone',
      status: 'occupied',
      amenities: ['Dual Monitor', 'Power Outlet'],
      availableAt: '2:30 PM'
    },
    {
      id: 'QZ-003',
      name: 'Desk QZ-003',
      zone: 'Quiet Zone',
      status: 'available',
      amenities: ['Standing Desk', 'Whiteboard Access'],
      availableAt: null
    },
    {
      id: 'CZ-001',
      name: 'Desk CZ-001',
      zone: 'Collaboration Zone',
      status: 'available',
      amenities: ['Dual Monitor', 'Whiteboard Access', 'Phone Booth Nearby'],
      availableAt: null
    },
    {
      id: 'CZ-002',
      name: 'Desk CZ-002',
      zone: 'Collaboration Zone',
      status: 'occupied',
      amenities: ['Dual Monitor', 'Standing Desk'],
      availableAt: '4:00 PM'
    },
    {
      id: 'CZ-003',
      name: 'Desk CZ-003',
      zone: 'Collaboration Zone',
      status: 'available',
      amenities: ['Whiteboard Access', 'Natural Light'],
      availableAt: null
    },
    {
      id: 'MZ-001',
      name: 'Desk MZ-001',
      zone: 'Meeting Zone',
      status: 'unavailable',
      amenities: ['Dual Monitor', 'Phone Booth Nearby'],
      availableAt: 'Tomorrow'
    },
    {
      id: 'MZ-002',
      name: 'Desk MZ-002',
      zone: 'Meeting Zone',
      status: 'available',
      amenities: ['Standing Desk', 'Whiteboard Access', 'Power Outlet'],
      availableAt: null
    },
    {
      id: 'CAS-001',
      name: 'Desk CAS-001',
      zone: 'Casual Zone',
      status: 'available',
      amenities: ['Natural Light', 'Power Outlet'],
      availableAt: null
    },
    {
      id: 'CAS-002',
      name: 'Desk CAS-002',
      zone: 'Casual Zone',
      status: 'occupied',
      amenities: ['Dual Monitor', 'Standing Desk', 'Natural Light'],
      availableAt: '1:15 PM'
    },
    {
      id: 'QZ-004',
      name: 'Desk QZ-004',
      zone: 'Quiet Zone',
      status: 'available',
      amenities: ['Dual Monitor', 'Power Outlet', 'Natural Light'],
      availableAt: null
    },
    {
      id: 'CZ-004',
      name: 'Desk CZ-004',
      zone: 'Collaboration Zone',
      status: 'available',
      amenities: ['Standing Desk', 'Phone Booth Nearby'],
      availableAt: null
    }
  ];

  // Filter desks based on selected filters
  const filteredDesks = useMemo(() => {
    return allDesks?.filter(desk => {
      const zoneMatch = selectedZone === 'all' || 
        (selectedZone === 'quiet' && desk?.zone === 'Quiet Zone') ||
        (selectedZone === 'collaboration' && desk?.zone === 'Collaboration Zone') ||
        (selectedZone === 'meeting' && desk?.zone === 'Meeting Zone') ||
        (selectedZone === 'casual' && desk?.zone === 'Casual Zone');

      const amenityMatch = selectedAmenities === 'all' ||
        (selectedAmenities === 'dual-monitor' && desk?.amenities?.includes('Dual Monitor')) ||
        (selectedAmenities === 'standing-desk' && desk?.amenities?.includes('Standing Desk')) ||
        (selectedAmenities === 'whiteboard' && desk?.amenities?.includes('Whiteboard Access')) ||
        (selectedAmenities === 'phone-booth' && desk?.amenities?.includes('Phone Booth Nearby'));

      return zoneMatch && amenityMatch;
    });
  }, [selectedZone, selectedAmenities]);

  const availableCount = filteredDesks?.filter(desk => desk?.status === 'available')?.length;

  const handleDeskSelect = (desk) => {
    setSelectedDesk(desk);
    setIsModalOpen(true);
  };

  const handleBookingConfirm = async () => {
    setIsBookingLoading(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsBookingLoading(false);
    setIsModalOpen(false);
    
    // Navigate to booking confirmation with desk data
    navigate('/booking-confirmation', { 
      state: { 
        desk: selectedDesk,
        bookingType: 'hot-desk',
        bookingTime: new Date()?.toISOString()
      }
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDesk(null);
  };

  const handleBackToWelcome = () => {
    navigate('/welcome-check-in');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Select Your Workspace
                </h1>
                <p className="text-muted-foreground">
                  Choose from available hot desks across different zones
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleBackToWelcome}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Welcome
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filter Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FilterToolbar
                  selectedZone={selectedZone}
                  onZoneChange={setSelectedZone}
                  selectedAmenities={selectedAmenities}
                  onAmenitiesChange={setSelectedAmenities}
                  availableCount={availableCount}
                  totalCount={filteredDesks?.length}
                />
              </motion.div>

              {/* Floor Plan Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FloorPlanGrid
                  desks={filteredDesks}
                  onDeskSelect={handleDeskSelect}
                  selectedDesk={selectedDesk}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24"
              >
                <ZoneDistribution desks={filteredDesks} />
              </motion.div>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-card border border-border rounded-lg p-6 shadow-soft"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Info" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact reception for assistance with desk selection
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={16}
                >
                  Call Reception
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                  iconSize={16}
                >
                  Live Chat
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        desk={selectedDesk}
        onConfirm={handleBookingConfirm}
        isLoading={isBookingLoading}
      />
    </div>
  );
};

export default HotDeskSelection;