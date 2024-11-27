export interface ThemeDefinition {
  name: string;
  variants: string[];
  palette: string[];
}

export interface Theme {
  name: string;
  variant: string;
  color?: string;
}
