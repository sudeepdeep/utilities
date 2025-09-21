/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputField {
  name: string;
  type: "text" | "number" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category:
    | "regular"
    | "creative"
    | "developer"
    | "fun"
    | "forms"
    | "components"
    | "regex"
    | "system";
  code: string;
  inputs?: any[];
  output?: string;
  icon?: any;
}

export type Category = {
  id: string;
  name: string;
  tools: Tool[];
};
