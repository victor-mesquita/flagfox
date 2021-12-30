import React, { InputHTMLAttributes, LegacyRef } from 'react';
import cn from 'classnames';
import s from './Input.module.css';

interface Props extends InputHTMLAttributes<any> {
  className?: string;
  icon?: React.ReactNode;
}
const Input = React.forwardRef(
  (props: Props, ref: LegacyRef<HTMLInputElement>) => {
    const { className, children, onChange, icon, ...rest } = props;

    const rootClassName = cn(s.root, {}, className);

    return (
      <label>
        <div className="relative">
          <input
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            ref={ref}
            {...rest}
          />
          {icon && (
            <i className="m-0 cursor-pointer hover:opacity-50 absolute inset-y-0 right-0 flex items-center pr-3">
              {icon}
            </i>
          )}
        </div>
      </label>
    );
  }
);

export default Input;
