import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';

interface FormSegmentProps {
  id: string;
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
          id={id}
          className={classNames('input input-bordered w-full', {
            'input-error': !!errorMessage,
          })}
          {...formRegister}
        />
      )}

      {type === 'textArea' && (
        <textarea
          className={classNames('textarea textarea-bordered h-64 w-full resize-none', {
            'textarea-error': !!errorMessage,
          })}
          placeholder={placeholder}
          id={id}
          {...formRegister}
        ></textarea>
      )}
    </div>
  );
};

export default FormSegment;
