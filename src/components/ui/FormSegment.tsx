import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormSegmentProps {
  id: string;
  errorMessage: string | undefined;
  formRegister: UseFormRegisterReturn;
  label: string;
  placeholder: string;
  type?: 'textInput' | 'textArea';
  small?: boolean;
}

const FormSegment: FC<FormSegmentProps> = ({
  errorMessage,
  formRegister,
  id,
  label,
  placeholder,
  type = 'textInput',
  small = false,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className={`${small ? 'text-sm' : 'text-base'} font-bold uppercase`}
        >
          {label}
        </label>
        <span className={`text-error-contents italic ${small ? 'text-sm' : 'text-base'}`}>
          {errorMessage}
        </span>
      </div>

      {type === 'textInput' ? (
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          className={`input input-bordered w-full ${errorMessage ? 'input-error' : ''} ${
            small ? 'input-sm' : ''
          }`}
          {...formRegister}
        />
      ) : (
        <textarea
          className={`textarea textarea-bordered h-64 w-full resize-none ${
            errorMessage ? 'textarea-error' : ''
          }`}
          placeholder={placeholder}
          id={id}
          {...formRegister}
        ></textarea>
      )}
    </div>
  );
};

export default FormSegment;
