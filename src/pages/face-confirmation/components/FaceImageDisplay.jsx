import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FaceImageDisplay = ({ faceImage, recognitionConfidence }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-border p-6">
      <div className="flex flex-col items-center space-y-4">
        {/* Face Image Container */}
        <div className="relative">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src={faceImage}
              alt="Recognized visitor face"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Recognition Success Indicator */}
          <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2 shadow-lg">
            <Icon name="CheckCircle" size={24} color="white" strokeWidth={2} />
          </div>
        </div>

        {/* Recognition Confidence */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Shield" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-success">Face Recognition Successful</span>
          </div>
          <div className="text-xs text-text-secondary">
            Confidence: {recognitionConfidence}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceImageDisplay;