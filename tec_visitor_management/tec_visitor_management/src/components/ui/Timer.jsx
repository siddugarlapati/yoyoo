import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Timer = ({ 
  duration = 60, 
  onComplete, 
  onManualOverride,
  showProgress = true,
  showControls = true,
  autoStart = true,
  size = 'default'
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, timeLeft, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleManualOverride = () => {
    setIsRunning(false);
    onManualOverride?.();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-4',
          timer: 'text-2xl',
          button: 'w-8 h-8',
          icon: 16
        };
      case 'lg':
        return {
          container: 'p-8',
          timer: 'text-5xl',
          button: 'w-12 h-12',
          icon: 24
        };
      default:
        return {
          container: 'p-6',
          timer: 'text-4xl',
          button: 'w-10 h-10',
          icon: 20
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`bg-card rounded-lg border border-border shadow-layered ${sizeClasses?.container}`}>
      <div className="text-center space-y-4">
        {/* Timer Display */}
        <div className="relative">
          <div className={`font-mono font-semibold ${sizeClasses?.timer} text-foreground`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {isRunning && !isPaused ? 'Auto-redirect in' : isPaused ? 'Paused' : 'Timer stopped'}
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <div className="flex items-center justify-center space-x-2">
            {!isRunning || isPaused ? (
              <button
                onClick={handleStart}
                className={`${sizeClasses?.button} bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-hover flex items-center justify-center`}
                title="Start timer"
              >
                <Icon name="Play" size={sizeClasses?.icon} />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className={`${sizeClasses?.button} bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg transition-hover flex items-center justify-center`}
                title="Pause timer"
              >
                <Icon name="Pause" size={sizeClasses?.icon} />
              </button>
            )}

            <button
              onClick={handleReset}
              className={`${sizeClasses?.button} bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-hover flex items-center justify-center`}
              title="Reset timer"
            >
              <Icon name="RotateCcw" size={sizeClasses?.icon} />
            </button>

            {onManualOverride && (
              <button
                onClick={handleManualOverride}
                className={`${sizeClasses?.button} bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-hover flex items-center justify-center`}
                title="Skip timer"
              >
                <Icon name="SkipForward" size={sizeClasses?.icon} />
              </button>
            )}
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isRunning && !isPaused 
              ? 'bg-success animate-pulse' 
              : isPaused 
                ? 'bg-warning' :'bg-muted-foreground'
          }`} />
          <span className="text-xs text-muted-foreground font-medium">
            {isRunning && !isPaused 
              ? 'Active' 
              : isPaused 
                ? 'Paused' :'Inactive'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;