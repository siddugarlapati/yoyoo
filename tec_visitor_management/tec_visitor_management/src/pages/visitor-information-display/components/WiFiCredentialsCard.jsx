import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WiFiCredentialsCard = ({ networkName, password }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
          <Icon name="Wifi" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Wi-Fi Access
        </h3>
      </div>
      <div className="space-y-4">
        {/* Network Name */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-muted-foreground">
              Network Name
            </label>
            <Button
              variant="ghost"
              size="sm"
              iconName={copiedField === 'network' ? 'Check' : 'Copy'}
              iconSize={16}
              onClick={() => handleCopy(networkName, 'network')}
              className="h-8 px-2"
            >
              {copiedField === 'network' ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <p className="text-base font-mono text-foreground break-all">
            {networkName}
          </p>
        </div>
        
        {/* Password */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-muted-foreground">
              Password
            </label>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName={showPassword ? 'EyeOff' : 'Eye'}
                iconSize={16}
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 px-2"
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName={copiedField === 'password' ? 'Check' : 'Copy'}
                iconSize={16}
                onClick={() => handleCopy(password, 'password')}
                className="h-8 px-2"
              >
                {copiedField === 'password' ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          <p className="text-base font-mono text-foreground break-all">
            {showPassword ? password : '•'?.repeat(password?.length)}
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <p className="text-sm text-accent">
            Connect to this network for internet access throughout the building
          </p>
        </div>
      </div>
    </div>
  );
};

export default WiFiCredentialsCard;