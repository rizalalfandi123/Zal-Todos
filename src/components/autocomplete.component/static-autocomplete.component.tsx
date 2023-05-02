import type { FieldValues, FieldPath, Control } from 'react-hook-form';

import { Controller } from 'react-hook-form';
import { useState } from 'react';

import FormControl, { FormControlProps } from '@mui/material/FormControl';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import { outlinedInputStyle, textHelperStyle } from '../text-field.component';

type MuiInputProps = Omit<OutlinedInputProps, 'name' | 'onChange' | 'onBlur' | 'value' | 'ref'>;

interface StaticAutocompleteProps<TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
 name: TName;
 control: Control<TFieldValues>;
 label: string;
 options: TOption[];
 slots?: {
  inputProps?: MuiInputProps;
  labelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  helperProps?: FormHelperTextProps;
  autoCompleteProps?: Omit<AutocompleteProps<TOption, boolean, boolean, boolean>, 'options' | 'renderInput'>;
 };
}

export const StaticAutocomplete = <TOption, TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
 props: StaticAutocompleteProps<TOption, TFieldValues, TName>
) => {
 const [inputValue, setInputValue] = useState<string>('');

 const { label, options, slots = { inputProps: {}, labelProps: {}, formControlProps: {}, helperProps: {}, autoCompleteProps: {} }, ...controlProps } = props;

 return (
  <Controller
   {...controlProps}
   render={({ field, fieldState }) => {
    const error = Boolean(fieldState.error);

    return (
     <Autocomplete<TOption, boolean, boolean, boolean>
      options={options}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
       setInputValue(newInputValue);
      }}
      value={field.value}
      onChange={(_event, newValue) => {
       field.onChange(newValue);
      }}
      onBlur={field.onBlur}
      renderInput={(params) => {
       const { InputProps, InputLabelProps, inputProps, ...restParams } = params;

       return (
        <FormControl variant='standard' {...slots.formControlProps} {...restParams} {...slots.formControlProps}>
         <InputLabel shrink htmlFor={field.name} {...slots.labelProps}>
          {label}
         </InputLabel>

         <OutlinedInput
          sx={outlinedInputStyle}
          {...InputProps}
          error={error}
          inputProps={inputProps}
          inputRef={field.ref}
          name={field.name}
          {...slots.inputProps}
         />

         {error && (
          <FormHelperText id={field.name} sx={textHelperStyle} {...slots.helperProps}>
           {fieldState.error?.message}
          </FormHelperText>
         )}
        </FormControl>
       );
      }}
      {...slots.autoCompleteProps}
     />
    );
   }}
  />
 );
};
