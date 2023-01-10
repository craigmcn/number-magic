import React, { useId } from 'react';
import css from './switch.module.scss';

interface ISwitchProps {
  id?: string;
  name?: string;
  children: React.ReactNode;
  checked?: boolean;
  onChange: () => void;
}

function Switch({ id, name, children, checked, onChange }: ISwitchProps) {
  const hookId = useId();
  const inputId = id || hookId;

  return (
    <span className={ css.switch }>
      <label>
        <input id={ inputId } name={ name || inputId } type="checkbox" defaultChecked={ checked } onChange={ onChange } />
        <span className={ css.slider }></span>
        { children }
      </label>
    </span>
  );
}

export default Switch;
