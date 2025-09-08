import React from 'react';
import Icon from '../../../components/AppIcon';

const WaitingInstructions = () => {
  const instructions = [
    {
      icon: "Armchair",
      title: "Take a Seat",
      description: "Please make yourself comfortable in our waiting area"
    },
    {
      icon: "Volume2",
      title: "Listen for Updates",
      description: "We\'ll announce when your host is ready to meet you"
    },
    {
      icon: "Smartphone",
      title: "Keep Your Phone Handy",
      description: "Your host may call you directly if needed"
    }
  ];

  return (
    <div className="bg-muted rounded-xl p-8 mb-8">
      <h3 className="text-xl font-semibold text-foreground text-center mb-6">
        While You Wait
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {instructions?.map((instruction, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-card rounded-full mb-4 mx-auto elevated-shadow">
              <Icon name={instruction?.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
            </div>
            
            <h4 className="font-semibold text-foreground mb-2">
              {instruction?.title}
            </h4>
            
            <p className="text-sm text-muted-foreground">
              {instruction?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitingInstructions;