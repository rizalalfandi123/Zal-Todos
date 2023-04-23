import type { FieldValues, FieldPath, Control } from "react-hook-form";
import type { SxProps, Theme } from "@mui/material/styles";

import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import FormHelperText, { FormHelperTextProps } from "@mui/material/FormHelperText";

import { Controller } from "react-hook-form";

type MuiInputProps = Omit<OutlinedInputProps, "name" | "onChange" | "onBlur" | "value" | "ref">;

interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  slots?: {
    inputProps?: MuiInputProps;
    labelProps?: InputLabelProps;
    formControlProps?: FormControlProps;
    helperProps?: FormHelperTextProps;
  };
}

const inputStyle: SxProps<Theme> = (theme) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
});

const textHelperStyle: SxProps<Theme> = (theme) => ({
  color: theme.palette.error.main,
});

export const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextFieldProps<TFieldValues, TName>
) => {
  const {
    label,
    slots = { inputProps: {}, labelProps: {}, formControlProps: {}, helperProps: {} },
    ...controlProps
  } = props;

  return (
    <Controller
      {...controlProps}
      render={({ field, fieldState }) => {
        const error = Boolean(fieldState.error);

        return (
          <FormControl variant="standard" {...slots.formControlProps}>
            <InputLabel shrink htmlFor={field.name} {...slots.labelProps}>
              {label}
            </InputLabel>

            <OutlinedInput sx={inputStyle} {...slots.inputProps} error={error} inputProps={field}  />

            {error && (
              <FormHelperText id={field.name} sx={textHelperStyle} {...slots.helperProps}>
                {fieldState.error?.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};
