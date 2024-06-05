import {
  FieldError,
  FieldValues,
  // UseFormClearErrors,
  UseFormRegister,
  // UseFormSetError,
  // UseFormSetValue,
} from "react-hook-form";

export type FormData = string | boolean | number | null;

export type TypeOfInputFields =
  | "Button"
  | "Checkbox"
  | "ChoiceGroup"
  | "ComboBox"
  | "Dropdown"
  | "Label"
  | "Link"
  | "Rating"
  | "SearchBox"
  | "Slider"
  | "SpinButton"
  | "TextField"
  | "Toggle"
  | "";

export type FormFieldProps<T extends FieldValues> = {
  placeholder?: string;
  name: string;
  label?: string;
  includeLabel?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
  valueAsNumber?: boolean;
  required?: boolean;
  variant?: TypeOfInputFields;
};

export type TSelections = {
  index: number;
  option: TypeOfInputFields;
  text: string;
};

export interface IWebpartFormProps {}

export interface IWebpartProps {
  selections: TSelections[];
}
