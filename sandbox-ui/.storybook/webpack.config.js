const path = require('path')
const awesomeLoader = require.resolve('awesome-typescript-loader')
const reactDocgenLoader = require.resolve('react-docgen-typescript-loader')

const STORIES_PATH = path.join(__dirname, '../src')

const configure = ({ config }) => {
  config.module.rules.push({
    test: /\.(tsx)$/,
    include: [STORIES_PATH],
    use: [
      {
        loader: awesomeLoader,
        options: {
          configFileName: './tsconfig.json',
        },
      },
      {
        loader: reactDocgenLoader,
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}

module.exports = configure
