import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

const base = (mode: 'production' | 'development'): webpack.Configuration => {
  const isProd = mode === 'production'

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `aframe-vrm.module.js`,
      library: 'vrm',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        },
        {
          test: /\.(glsl|frag|vert)$/,
          use: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ['node_modules']
    },
    // devServer: {
    //   port: 3000,
    //   contentBase: path.resolve(__dirname, './'),
    //   publicPath: '/lib/',
    //   openPage: 'examples/index.html',
    //   watchContentBase: true,
    //   inline: true
    // },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: mode } }),
      ...(isProd
        ? []
        : [new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })])
    ],
    devtool: isProd ? false : 'inline-source-map'
  }
}

export default (env: any, argv: any): webpack.Configuration[] => {
  const isProd = argv.mode === 'production'

  return [
    base(argv.mode),
    merge(base(argv.mode), {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      output: {
        filename: isProd ? 'aframe-vrm.min.js' : `aframe-vrm.js`,
        library: '__aframe_vrm__',
        libraryTarget: 'var'
      },
      externals: {
        aframe: 'AFRAME'
      }
    })
  ]
}
