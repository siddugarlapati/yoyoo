import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FaceCameraView = ({ onClose, employee }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState('initializing'); // 'initializing', 'ready', 'scanning', 'success', 'error'
  const [countdown, setCountdown] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');
  const [cameraPermission, setCameraPermission] = useState('pending'); // 'pending', 'granted', 'denied'

  useEffect(() => {
    initializeCamera();
    return () => {
      if (stream) {
        stream?.getTracks()?.forEach(track => track?.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (recognitionStatus === 'ready') {
      // Start automatic recognition after camera is ready
      const timer = setTimeout(() => {
        startFaceRecognition();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [recognitionStatus]);

  const initializeCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      setCameraPermission('granted');
      setStream(mediaStream);
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef?.current?.play();
          setRecognitionStatus('ready');
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraPermission('denied');
      setRecognitionStatus('error');
      setErrorMessage('Camera access denied. Please enable camera permissions and try again.');
    }
  };

  const startFaceRecognition = async () => {
    if (!videoRef?.current || isRecognizing) return;
    
    setIsRecognizing(true);
    setRecognitionStatus('scanning');
    
    // Simulate face recognition countdown
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Simulate face recognition processing
    await simulateFaceRecognition();
  };

  const simulateFaceRecognition = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful recognition
      const isRecognized = Math.random() > 0.1; // 90% success rate for demo
      
      if (isRecognized) {
        setRecognitionStatus('success');
        // Navigate to workspace confirm screen after success
        setTimeout(() => {
          navigate('/workspace-confirm-booked');
        }, 2000);
      } else {
        setRecognitionStatus('error');
        setErrorMessage('Face not recognized. Please position your face clearly in the frame and try again.');
        setIsRecognizing(false);
      }
    } catch (error) {
      setRecognitionStatus('error');
      setErrorMessage('Recognition failed. Please try again.');
      setIsRecognizing(false);
    }
  };

  const handleRetry = () => {
    setRecognitionStatus('ready');
    setErrorMessage('');
    setCountdown(3);
  };

  const captureFrame = () => {
    if (videoRef?.current && canvasRef?.current) {
      const canvas = canvasRef?.current;
      const context = canvas?.getContext('2d');
      canvas.width = videoRef?.current?.videoWidth;
      canvas.height = videoRef?.current?.videoHeight;
      context?.drawImage(videoRef?.current, 0, 0);
    }
  };

  const getStatusContent = () => {
    switch (recognitionStatus) {
      case 'initializing':
        return {
          title: 'Initializing Camera',
          message: 'Setting up your camera for face recognition...',
          icon: 'Camera',
          color: 'text-primary'
        };
      case 'ready':
        return {
          title: 'Position Your Face',
          message: 'Please look at the camera for quick check-in',
          icon: 'User',
          color: 'text-primary'
        };
      case 'scanning':
        return {
          title: 'Recognizing Face',
          message: `Please stay still... ${countdown > 0 ? countdown : 'Analyzing...'}`,
          icon: 'Scan',
          color: 'text-warning'
        };
      case 'success':
        return {
          title: 'Recognition Successful!',
          message: `Welcome back, ${employee?.firstName}! Redirecting to your workspace...`,
          icon: 'CheckCircle',
          color: 'text-success'
        };
      case 'error':
        return {
          title: 'Recognition Failed',
          message: errorMessage,
          icon: 'AlertCircle',
          color: 'text-destructive'
        };
      default:
        return {
          title: 'Please Wait',
          message: 'Setting up face recognition...',
          icon: 'Clock',
          color: 'text-muted-foreground'
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-xl max-w-4xl mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-primary/10 border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Camera" size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Face Recognition</h3>
              <p className="text-sm text-text-secondary">Quick and secure check-in</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="hover:bg-destructive/10 hover:text-destructive"
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Camera View */}
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                {cameraPermission === 'granted' ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                      onLoad={captureFrame}
                    />
                    
                    {/* Face Detection Overlay */}
                    {recognitionStatus === 'scanning' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-4 border-primary rounded-lg w-64 h-64 animate-pulse">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
                        </div>
                      </div>
                    )}

                    {/* Success Overlay */}
                    {recognitionStatus === 'success' && (
                      <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                        <div className="bg-success text-white rounded-full p-4">
                          <Icon name="Check" size={32} />
                        </div>
                      </div>
                    )}
                  </>
                ) : cameraPermission === 'denied' ? (
                  <div className="w-full h-full flex items-center justify-center text-center p-8">
                    <div>
                      <Icon name="CameraOff" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-text-primary mb-2">Camera Access Required</h4>
                      <p className="text-text-secondary mb-4">
                        Please allow camera access to use face recognition
                      </p>
                      <Button onClick={initializeCamera} iconName="Camera">
                        Enable Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                )}

                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-center font-medium">
                    Please look at the camera for quick check-in
                  </p>
                </div>
              </div>

              {/* Camera Controls */}
              <div className="flex justify-center space-x-2">
                {recognitionStatus === 'error' && (
                  <Button onClick={handleRetry} iconName="RefreshCw" variant="outline">
                    Try Again
                  </Button>
                )}
                {recognitionStatus === 'ready' && !isRecognizing && (
                  <Button onClick={startFaceRecognition} iconName="Scan" className="bg-primary">
                    Start Recognition
                  </Button>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon 
                    name={statusContent?.icon} 
                    size={20} 
                    className={statusContent?.color}
                  />
                  <h4 className="text-lg font-semibold text-text-primary">
                    {statusContent?.title}
                  </h4>
                </div>
                <p className="text-text-secondary">
                  {statusContent?.message}
                </p>
                
                {recognitionStatus === 'scanning' && (
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Employee Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h5 className="font-semibold text-text-primary mb-3">Expected Employee</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-text-primary">{employee?.firstName} {employee?.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ID:</span>
                    <span className="text-text-primary font-mono">{employee?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Department:</span>
                    <span className="text-text-primary">{employee?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Role:</span>
                    <span className="text-text-primary">{employee?.role}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Lightbulb" size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-text-primary">Recognition Tips</span>
                </div>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Position your face clearly in the frame</li>
                  <li>• Ensure good lighting conditions</li>
                  <li>• Remove glasses or masks if possible</li>
                  <li>• Look directly at the camera</li>
                  <li>• Stay still during recognition</li>
                </ul>
              </div>

              {/* Security Info */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-xs text-text-secondary">
                    Your biometric data is processed securely and not stored
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceCameraView;