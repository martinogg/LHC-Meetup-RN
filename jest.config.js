module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "setupFiles": ["./setup.js"],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation/.*|rn-placeholder|@expo)"
  ]
}
