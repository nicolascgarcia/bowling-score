module.exports = {
	env: {
		browser: true,
		es2021: true,
		'jest/globals': true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'jest'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
		'import/no-unresolved': 'off',
		'no-use-before-define': 'off',
		'import/extensions': 'off',
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'react/react-in-jsx-scope': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
};
