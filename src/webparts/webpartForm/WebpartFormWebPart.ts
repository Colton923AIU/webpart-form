import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneButton,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "WebpartFormWebPartStrings";
import WebpartForm from "./components/WebpartForm";
import {
  IWebpartFormProps,
  TypeOfInputFields,
} from "./components/IWebpartFormProps";

export interface IWebpartFormWebPartProps {
  description: string;
}

export type TFormItem = {
  label: string;
  type: TypeOfInputFields;
};

export type TPropertyPaneFactoryChoices =
  | "TextField"
  | "ChoiceGroup"
  | "Button"
  | "TextAreaInput";

export default class WebpartFormWebPart extends BaseClientSideWebPart<IWebpartFormWebPartProps> {
  private _dropDownFields: any[] = [];
  private _propertyCount: number = 0;
  private _selections: {
    index: number;
    option: (TypeOfInputFields & TPropertyPaneFactoryChoices) | "";
    text: string;
  }[] = [];

  public render(): void {
    const element: React.ReactElement<IWebpartFormProps> = React.createElement(
      WebpartForm,
      {
        selections: this._selections,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected PropertyPaneFactory(tPropertyPane: TPropertyPaneFactoryChoices) {
    const PropertyPaneFormGroup = () => {
      const NewTextPane = this.PropertyPaneFactory("TextField");
      const NewChoicePane = this.PropertyPaneFactory("ChoiceGroup");
      return [NewTextPane, NewChoicePane];
    };

    switch (tPropertyPane) {
      case "TextField": {
        const NewTextPane = PropertyPaneTextField(
          `${this._propertyCount.toString()}-Text`,
          {
            label: `Label ${this._propertyCount}`,
            value: "",
          }
        );
        return NewTextPane;
      }
      case "ChoiceGroup": {
        const NewChoicePane = PropertyPaneDropdown(
          `${this._propertyCount.toString()}-Choice`,
          {
            label: `Choice ${this._propertyCount}`,
            options: [
              { key: "TextInput", text: "Text" },
              { key: "TextAreaInput", text: "Multi-Line Text" },
            ],
            selectedKey: 1,
          }
        );
        return NewChoicePane;
      }
      case "Button": {
        return PropertyPaneButton(this._propertyCount.toString(), {
          text: "Add New Form Input",
          onClick: () => {
            this._propertyCount += 1;
            this._dropDownFields.push(...PropertyPaneFormGroup());
            this.context.propertyPane.refresh();
          },
        });
      }
      default: {
        const DefaultPropertyPane = PropertyPaneTextField(
          this._propertyCount.toString(),
          {
            label: `Form Item ${this._propertyCount}`,
          }
        );
        return DefaultPropertyPane;
      }
    }
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    const index = parseInt(propertyPath) - 1;
    let existingSelection = this._selections[index];
    if (!existingSelection) {
      existingSelection = { index, text: "", option: "" };
    }
    if (propertyPath.includes("Text")) {
      existingSelection.text = newValue;
    } else if (propertyPath.includes("Choice")) {
      existingSelection.option = newValue;
    }

    this._selections[index] = existingSelection;

    if (existingSelection.option !== "" && existingSelection.text !== "") {
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this._dropDownFields.length === 0) {
      const Button = this.PropertyPaneFactory("Button");
      this._dropDownFields.push(Button);
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [...this._dropDownFields],
            },
          ],
        },
      ],
    };
  }
}
