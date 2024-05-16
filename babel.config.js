module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@': './src',
          utils: './src/Helpers/Utils',
          measurements: './src/Helpers/Measurements',
        },
      },
    ],
  ],
};
