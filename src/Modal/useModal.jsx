import { useState } from 'react';

//referenced from this tutorial: https://medium.com/swlh/building-modals-in-react-64d92591f4b

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  function toggleModal() {
    setIsVisible(!isVisible);
  }
return {
    isVisible,
    toggleModal,
  }
};
export default useModal;