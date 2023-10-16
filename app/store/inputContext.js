import React, {useState, createContext} from 'react';

const Context = createContext();

export const ContextProvider = ({children}) => {
  const [options, setOptions] = useState({
    activeInputs: {
      ringSizes: false,
      braceletLength: false,
      necklaceLenght: false,
      name: false,
      initialLetter: false,
      singleBirthstone: false,
      multipleBirthStone: false,
      expandableInsideEngraving: false,
      bridalSetInsideEngraving: false,
      signedOutSideEngraving3Letters: false,
      outSideEngraving25Letters: false,
      outsideEngravingZodiac: false,
    },
    ringSizes: null,
    braceletLength: null,
    necklaceLenght: null,
    name: null,
    initialLetter: null,
    singleBirthstone: null,
    multipleBirthStone: null,
    expandableInsideEngraving: {
      isYes: false,
      font: null,
      text: null,
    },
    bridalSetInsideEngraving: {
      isYes: false,
      fontEG: null,
      textEG: null,
      fontWB: null,
      textWB: null,
    },
    signedOutSideEngraving3Letters: {
      isYes: false,
      font: null,
      text: null,
    },
    outSideEngraving25Letters: {
      isYes: false,
      font: null,
      text: null,
    },
    outsideEngravingZodiac: null,
  });

  const value = {
    options,
    setOptions,
  };

  return <Context.Provider value={value}> {children} </Context.Provider>;
};

export default Context;
