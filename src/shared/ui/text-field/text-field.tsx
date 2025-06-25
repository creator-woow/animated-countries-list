import { FC, Ref, useId } from 'react';

import { FormControl, InformationText, Input, InputProps } from 'shared/ui';
import { clsx } from 'shared/lib';

export interface TextFieldProps extends InputProps {
  label?: string;
  errorMessage?: string;
  infoMessage?: string;
  multiline?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export const TextField: FC<TextFieldProps> = ({
  className,
  errorMessage,
  error,
  infoMessage,
  label,
  multiline,
  ref,
  id: idProp,
  ...otherProps
}) => {
  const innerId = useId();
  const id = idProp ?? innerId;

  return (
    <div className={className}>
      <FormControl {...otherProps}>
        {label && (
          <label
            className="text-secondary font-medium mb-[5px] ml-[2px] cursor-pointer"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <Input
          {...otherProps}
          className={clsx(className, {
            ['field-sizing-content']: multiline,
          })}
          error={!!errorMessage || error}
          ref={ref}
          id={id}
        />
        {errorMessage && (
          <InformationText
            className="mt-1"
            error
          >
            {errorMessage}
          </InformationText>
        )}
        {infoMessage && (
          <InformationText
            className="mt-1"
            info
          >
            {infoMessage}
          </InformationText>
        )}
      </FormControl>
    </div>
  );
};
