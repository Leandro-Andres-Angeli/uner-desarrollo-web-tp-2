import React from 'react';
import styles from './testStyles.module.css';
const TestComponent = () => {
  console.log(styles);

  const { estilo1, estilo2 } = styles;
  // console.log("estilo 1",estilo1)
  // console.log("estilo 2",estilo1)
  return (
    <div className={` ${estilo1}`}>
      Test Component
      <p className={` ${estilo2}`}> Estilo 2 aplicado </p>
    </div>
  );
};

export default TestComponent;
