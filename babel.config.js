module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './js',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
