import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import noop from 'helpers/noop';

function FormInput({
  changeHandler = noop,
  variant = 'standard',
  defaultValue = '',
  fullWidth = true,
  placeholder,
  inputProps,
  helperText,
  children,
  disabled,
  error,
  label,
  type,
  size = 'small',
  ...props
}) {
  return (
    <Controller
      {...props}
      defaultValue={defaultValue}
      render={controllerProps => (
        <TextField
          onChange={event => {
            controllerProps.field.onChange(event);
            changeHandler(event);
          }}
          defaultValue={defaultValue}
          children={children}
          placeholder={placeholder}
          InputProps={inputProps}
          helperText={helperText}
          fullWidth={fullWidth}
          disabled={disabled}
          variant={variant}
          error={error}
          label={label}
          type={type}
          size={size}
        />
      )}
    />
  );
}

export default FormInput;
