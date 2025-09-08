import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QRCodeSection = () => {
  const qrCodes = [
    {
      id: 'wifi',
      title: 'Wi-Fi Quick Connect',
      description: 'Scan to connect to guest network automatically',
      icon: 'Wifi',
      placeholder: 'https://via.placeholder.com/200x200/2563EB/FFFFFF?text=WiFi+QR'
    },
    {
      id: 'map',
      title: 'Building Map',
      description: 'Scan for interactive building navigation',
      icon: 'Map',
      placeholder: 'https://via.placeholder.com/200x200/059669/FFFFFF?text=Map+QR'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full">
          <Icon name="QrCode" size={24} className="text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Quick Access QR Codes
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {qrCodes?.map((qr) => (
          <div key={qr?.id} className="text-center">
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <Image
                src={qr?.placeholder}
                alt={`${qr?.title} QR Code`}
                className="w-32 h-32 mx-auto rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Icon name={qr?.icon} size={18} className="text-primary" />
                <h4 className="text-base font-semibold text-foreground">
                  {qr?.title}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {qr?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-3 bg-warning/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Smartphone" size={16} className="text-warning mt-0.5" />
          <p className="text-sm text-warning">
            Use your phone's camera app to scan these QR codes for quick access
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;