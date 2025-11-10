import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      braceStyle: '1tbs',
      indent: 4,
      commaDangle: 'never' // Disable trailing commas - commas are separators, not terminators
    }
  }
}).append({
  rules: {
    // Vue-specific rules
    'vue/no-multiple-template-root': 'off',
    'vue/max-attributes-per-line': 'off', // Let Vue formatter handle this
    'vue/first-attribute-linebreak': 'off', // Let Vue formatter handle this
    'vue/html-closing-bracket-newline': 'off', // Let Vue formatter handle this
    'vue/html-indent': 'off', // Let Vue formatter handle this
    'vue/singleline-html-element-content-newline': 'off', // Let Vue formatter handle this

    // Stylistic rules that conflict with Vue formatting
    '@stylistic/indent': 'off', // Handled by Vue formatter in .vue files
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/brace-style': 'off', // Conflicts with Vue template formatting

    // TypeScript in Vue files
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/space-before-generic-types': 'off',

    // General rules
    'one-var': ['error', 'consecutive'],
    'curly': ['error', 'multi-or-nest'],
    'max-params': ['error', { max: 1 }]
  }
}, {
  // Vue-specific overrides
  files: ['**/*.vue'],
  languageOptions: {
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.vue'],
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  rules: {
    // Disable stylistic rules for Vue files - let Vue.volar handle formatting
    '@stylistic/indent': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/semi': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/object-curly-spacing': 'off',
    '@stylistic/array-bracket-spacing': 'off',

    // TypeScript issues in Vue
    '@typescript-eslint/no-unused-vars': 'off', // Vue compiler handles this
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-undef': 'off', // Vue auto-imports

    // Disable JavaScript rules that conflict with TypeScript in Vue
    'import/no-unresolved': 'off',
    'import/named': 'off'
  }
})
