import React, { useEffect, useRef } from 'react';
import Button from '../components/Button';
import TestComponent from '../components/TestComponent';
import FormPrueba from './../components/FormPrueba';
const RemovableEv = () => {
  const ref = useRef();
  function handleClick({ currentTarget }) {
    // console.log(currentTarget);
    // console.log('doning');
    currentTarget.setAttribute('data-fun', 'done');
  }
  useEffect(() => {
    if (ref?.current?.getAttribute('data-fun') === 'pending') {
      ref?.current?.addEventListener('click', function () {
        handleClick(this);
      });
      // ref.current.setAttribute('data-fun', 'done');
      // console.log(ref.current.getAttribute('data-fun'));
    }

    return () => {
      ref?.current?.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return (
    <button ref={ref} data-fun='pending' onClick={handleClick}>
      text
    </button>
  );
};
const Components = () => {
  return (
    <section>
      Components
      <Button></Button>
      <TestComponent></TestComponent>
      <RemovableEv></RemovableEv>
      <FormPrueba></FormPrueba>
    </section>
  );
};

export default Components;
