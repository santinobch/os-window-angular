export interface OsTheme {
  theme: string;
  variants: string[];
  palette: string[];
}

export const theme_list: OsTheme[] = [
  {
    theme: 'arc',
    variants: ['light', 'dark'],
    palette: [
      'red',
      'orange',
      'yellow',
      'lime',
      'green',
      'aqua',
      'blue',
      'purple',
      'magenta',
    ],
  },
  {
    theme: 'win98',
    variants: ['classic', 'vaporwave'],
    palette: [
      'red',
      'orange',
      'yellow',
      'lime',
      'green',
      'aqua',
      'blue',
      'purple',
      'magenta',
    ],
  },
];
