const { OrganizeImportsMode } = require('typescript');

module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSameLine: true,
  printWidth: 80,
  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-organize-imports',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-classnames',
    'prettier-plugin-merge',
  ],
  endOfLine: 'lf',
  importOrder: [
    '^@angular/cdk/(.*)$',
    '^@angular/(.*)$',

    'assests/',
    'environments/',
    'styles/',

    'classes/',
    'components/',
    'consts/',
    'directives/',
    'models/',
    'services/',
    'themes/',

    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
