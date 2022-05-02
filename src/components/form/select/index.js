import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


import noop from 'helpers/noop';

function FormSelect({
  changeHandler = noop,
  variant = 'standard',
  fullWidth = true,
  defaultValue = '',
  size = 'small',
  options = [],
  placeholder,
  disabled,
  select,
  error,
  label,
  ...props
}) {
  return (
    <FormControl variant={variant}>
      <Controller
        {...props}
        render={controllerProps => (
          <>
            <InputLabel id={props.name}>{label}</InputLabel>
            <Select
              onChange={event => {
                changeHandler(event);
                controllerProps.field.onChange(event);
              }}
              defaultValue={defaultValue}
              placeholder={placeholder}
              fullWidth={fullWidth}
              disabled={disabled}
              select={select}
              error={error}
              label={label}
              {...props}
            >
              {options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
    </FormControl>
  );
}

export default FormSelect;
