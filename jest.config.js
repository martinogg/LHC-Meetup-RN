module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "setupFiles": ["./setup.js"],
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|native-base-shoutem-theme|@shoutem/animation|@shoutem/ui|tcomb-form-native|react-navigation|@react-navigation/.*|rn-placeholder|@expo)"
  ]
}
