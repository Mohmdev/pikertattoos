// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  trailingComma: 'none',
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/globals.css',
  tailwindConfig: './tailwind.config.ts',
  // importOrder config
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<TYPES>^(react/(.*)$)|^(react$)',
    '<TYPES>^(next/(.*)$)|^(next$)',
    '^@data/(.*)$',
    '',
    '^(@payloadcms/(.*)$)',
    '^@payload-config$',
    '^@CMS/(.*)$',
    '^@services/(.*)$',
    '^@heros/(.*)$',
    '^@blocks/(.*)$',
    '^@fields/(.*)$',
    '^@access/(.*)$',
    '^@payload-types$',
    '',
    '<THIRD_PARTY_MODULES>',
    '^@lib/(.*)$',
    '^@utils/(.*)$',
    '^@hooks/(.*)$',
    '^@/config/(.*)$',
    '^@/(.*)$',
    '',
    '<TYPES>.*$',
    '<TYPES><THIRD_PARTY_MODULES>',
    '^types$',
    '^@types/(.*)$',
    '',
    '^@providers/(.*)$',
    '^@forms/(.*)$',
    '^@components/(.*)$',
    '^@admin-components/(.*)$',
    '^@dashboard/(.*)$',
    '^@ui/(.*)$',
    '^@graphics/(.*)$',
    '^@icons/(.*)$',
    '',
    '^[./]', // Relative imports
    '^@styles/(.*)$',
    '^@constants'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true
}

export default prettierConfig
