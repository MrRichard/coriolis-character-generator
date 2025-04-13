// src/components/WizardContainer.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState } from '../lib/types';

interface WizardContainerProps {
  children: React.ReactNode[];
  initialStep?: number;
}

const WizardContainer: React.FC<WizardContainerProps> = ({ 
  children, 
  initialStep = 0
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const [appState, setAppState] = useState<AppState>({
    step: initialStep,
    totalPlayers: 1,
    currentPlayerIndex: 0,
    groupConcept: '',
    groupTalent: '',
    characters: []
  });

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    if (currentStep < children.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
      updateAppState({ step: currentStep + 1 });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
      updateAppState({ step: currentStep - 1 });
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < children.length) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
      updateAppState({ step });
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <div className="wizard-container">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
          className="wizard-step"
        >
          {React.cloneElement(children[currentStep] as React.ReactElement, {
            appState,
            updateAppState,
            goToNextStep,
            goToPreviousStep,
            goToStep,
            isFirstStep: currentStep === 0,
            isLastStep: currentStep === children.length - 1
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WizardContainer;
