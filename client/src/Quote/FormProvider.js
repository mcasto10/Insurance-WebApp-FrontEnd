import React, { useState, useEffect, createContext, useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Auto");

  const [selections, setSelections] = useState({
    Homeowners: false,
    Auto: true,
    Health: false,
    Motorcycle: false,
    Boat: false,
    RV: false,
    ClassicCar: false,
    Business: false,
    CommericalAuto: false,
  });

  const handleSelectionChange = (key) => {

    setSelections((prevState) => {
      const updatedState = Object.fromEntries(
        Object.keys(prevState).map((stateKey) => [stateKey, stateKey === key])
      );

      return updatedState;
    });
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);


    switch (selectedValue) {
      case "Auto":
      case "Motorcycle":
      case "Boat":
      case "RV":
      case "ClassicCar":
        handleSelectionChange(selectedValue);
        setTotalSteps(7);
        break;
      case "CommericalAuto":
        handleSelectionChange("CommericalAuto");
        setTotalSteps(9);
        break;
      case "Business":
        handleSelectionChange("Business");
        setTotalSteps(10);
        break;
      case "Homeowners":
        handleSelectionChange("Homeowners");
        setTotalSteps(6);
        break;
      default:
        break;
    }
  };


  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, '').slice(0, 5);
    setInputValue(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);

    if (inputValue.trim() === '' || inputValue.length < 5) {
      setHasError(true);
    } else {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setCurrentPage(currentPage + 1);
        setShowProgressBar(true);
      }
    }
  };

  const handlePrevious = () => {
    setInputValue('');
    setHasError(false);

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setInputValue('');
    setHasError(false);

    if (currentStep > 0) {
      setCurrentStep(currentStep + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const formData = {
    currentStep,
    totalSteps,
    currentPage,
    hasError,
    inputValue,
    showProgressBar,
    selectedOption,
    selections,
    setCurrentPage,
    setCurrentStep,
    setShowProgressBar,
    handleChange,
    handlePrevious,
    handleNext,
    handleSelectChange,
    handleSelectionChange,
    handleSubmit,

  };

  return (
    <FormContext.Provider value={formData}>
      {children}
    </FormContext.Provider>
  );
};
