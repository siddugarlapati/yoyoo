import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NDAModal = ({ isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ndaContent = `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${new Date()?.toLocaleDateString('en-US')} between the Company and the visiting party ("Visitor").

1. CONFIDENTIAL INFORMATION
The Visitor acknowledges that during their visit, they may be exposed to confidential and proprietary information including but not limited to:
• Business strategies and plans
• Technical specifications and designs
• Financial information and projections
• Customer lists and contact information
• Trade secrets and know-how
• Any other information marked or identified as confidential

2. OBLIGATIONS
The Visitor agrees to:
• Keep all confidential information strictly confidential
• Not disclose any confidential information to third parties
• Use confidential information solely for the purpose of the visit
• Return or destroy any confidential materials upon request

3. DURATION
This agreement shall remain in effect for a period of five (5) years from the date of signing, or until the information becomes publicly available through no breach of this agreement.

4. REMEDIES
The Visitor acknowledges that any breach of this agreement may cause irreparable harm to the Company, and the Company shall be entitled to seek injunctive relief and monetary damages.

5. GOVERNING LAW
This agreement shall be governed by the laws of the jurisdiction in which the Company is located.

By proceeding with the visit, the Visitor acknowledges that they have read, understood, and agree to be bound by the terms of this Non-Disclosure Agreement.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-lg shadow-xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            Non-Disclosure Agreement
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed font-sans">
              {ndaContent}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Shield" size={16} />
            <span>This agreement is legally binding</span>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              iconName="FileText"
              iconPosition="left"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDAModal;