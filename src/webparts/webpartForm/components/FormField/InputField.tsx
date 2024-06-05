import * as React from "react";
import { Input } from "@fluentui/react-components";
import { FormFieldProps, TypeOfInputFields } from "../IWebpartFormProps";
import { FieldValues } from "react-hook-form";

const TextAreaInputField = ({
  placeholder,
  name,
  required,
  register,
  valueAsNumber,
}: FormFieldProps<FieldValues>) => {
  return (
    <Input
      type={"text"}
      placeholder={placeholder}
      id={`field_${name}`}
      {...register(name, { required: required, valueAsNumber: valueAsNumber })}
    />
  );
};

const TextInputField = ({
  placeholder,
  name,
  required,
  register,
  valueAsNumber,
}: FormFieldProps<FieldValues>) => {
  return (
    <Input
      type={"text"}
      placeholder={placeholder}
      id={`field_${name}`}
      {...register(name, { required: required, valueAsNumber: valueAsNumber })}
    />
  );
};

interface IInputFieldProps<T> {
  variant?: TypeOfInputFields;
  props: T;
}

const InputField = ({
  props,
  variant,
}: IInputFieldProps<FormFieldProps<FieldValues>>) => {
  switch (variant) {
    case "TextField":
      return <TextInputField {...props} />;
    default:
      return <TextAreaInputField {...props} />;
  }
};

export default InputField;
