import * as React from "react";
// import styles from "./WebpartForm.module.scss";
import type { IWebpartProps, IWebpartFormProps } from "./IWebpartFormProps";
import { useForm } from "react-hook-form";
import FormField from "./FormField/FormField";
import {
  FluentProvider,
  webLightTheme,
  Card,
  CompoundButton,
  Text,
  Divider,
  Table,
  TableHeader,
  TableBody,
} from "@fluentui/react-components";
import { ArrowUpload16Regular } from "@fluentui/react-icons";

const WebpartForm: React.FC<IWebpartProps> = (props) => {
  const { selections } = { ...props };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IWebpartFormProps>({
    mode: "onBlur",
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  console.log("errors: ", errors);
  return (
    <section>
      <FluentProvider theme={webLightTheme}>
        <Card>
          <form onSubmit={onSubmit}>
            <Table>
              <TableHeader>
                {selections.map((item, index) => {
                  return (
                    <FormField
                      key={`${item.text}-${index}`}
                      name={item.option}
                      register={register}
                      label={item.text}
                      includeLabel={true}
                      required={true}
                      variant={item.option}
                    />
                  );
                })}
                <Divider />
              </TableHeader>
              <TableBody>
                <CompoundButton
                  type="submit"
                  icon={<ArrowUpload16Regular />}
                  secondaryContent={"Submit to SharePoint"}
                >
                  <Text>Submit</Text>
                </CompoundButton>
              </TableBody>
            </Table>
          </form>
        </Card>
      </FluentProvider>
    </section>
  );
};

export default WebpartForm;
