module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  settings: {
    next: {
      rootDir: ['functions/*/', 'packages/*/']
    }
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'react/display-name': 'off'
  }
}
