import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

interface FormSegmentProps {
  id: string;
  disabled: boolean;
  errorMessage: string | undefined;
  formRegister: UseFormRegisterReturn;
  label: string;
  placeholder: string;
  type?: 'textInput' | 'textArea';
}

const FormSegment: FC<FormSegmentProps> = ({
  errorMessage,
  formRegister,
  id,
  label,
  placeholder,
  disabled,
  type = 'textInput',
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-1">
        <label htmlFor={id} className="text-base font-bold uppercase">
          {label}
        </label>
        <span className="text-xs italic md:text-base">{errorMessage}</span>
      </div>

      {type === 'textInput' && (
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          className={classNames('input input-bordered w-full', {
            'input-error': !!errorMessage,
          })}
          {...formRegister}
        />
      )}

      {type === 'textArea' && (
        <textarea
          disabled={disabled}
          className={classNames(
            'textarea textarea-bordered h-48 w-full resize-none text-base',
            {
              'textarea-error': !!errorMessage,
            },
          )}
          placeholder={placeholder}
          id={id}
          {...formRegister}
        />
      )}
    </div>
  );
};

export default FormSegment;
