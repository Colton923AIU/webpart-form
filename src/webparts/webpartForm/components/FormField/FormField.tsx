import * as React from "react";

import InputField from "./InputField";
import { FormFieldProps } from "../IWebpartFormProps";
import { FieldValues } from "react-hook-form";
import { Text, Field } from "@fluentui/react-components";

const ErrorLabel = (props: FormFieldProps<FieldValues>) => {
  const { required, error, label } = { ...props };
  const message = (required ? "*" : "") + (error ? `- ${error.message}` : "");
  console.log(required, error, label);
  return (
    <label
      id={`form_field_${label}_error_label`}
      htmlFor={`form_field_${label}`}
    >
      <Text>{message}</Text>
    </label>
  );
};

const FormField = (props: FormFieldProps<FieldValues>) => {
  const { includeLabel, label, error, variant } = { ...props };
  return (
    <Field
      label={
        includeLabel ? (
          <label htmlFor={`field_${label}`}>
            <Text>{label}</Text>
          </label>
        ) : null
      }
      key={`form_field_${label}`}
    >
      <InputField variant={variant} props={props} />
      {error?.message ? <ErrorLabel {...props} /> : null}
    </Field>
  );
};

export default FormField;
