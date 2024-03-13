import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar"; 
import "./Quote.css";



export default function ProgressBarStatus4 ({ currentStep, totalSteps }) {    

  const totalStepPercent = Math.ceil((currentStep / (totalSteps - 1)) * 100);

  return (
    <ProgressBar percent={totalStepPercent}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <Step key={index}>
          {({ accomplished }) => (
            <div className={`indexedStep ${accomplished ? 'accomplished' : null}`}>
              {index + 1}
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
}
