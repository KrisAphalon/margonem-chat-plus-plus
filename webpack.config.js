const webpack = require('webpack')
const path = require('path')
const sass = require('node-sass')
const fs = require('fs')
const childProcess = require('child_process')

const inputScss = fs.readFileSync('res/style.scss').toString()
const resultSI = sass.renderSync({
    data: '$INTERFACE: \'SI\';\n\n' + inputScss,
    outputStyle: 'compressed'
}).css.toString()

const resultNI = sass.renderSync({
    data: '$INTERFACE: \'NI\';\n\n' + inputScss,
    outputStyle: 'compressed'
}).css.toString()


const version = childProcess.execSync('cat version').toString().replace('\n', '')

const CONSTANTS = new webpack.DefinePlugin({
    FILE_PREFIX: JSON.stringify('https://cdn.jsdelivr.net/gh/KrisAphalon/margonem-chat-plus-plus@' + version + '/'),
    VERSION: JSON.stringify(version)
})


const rules = [
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
            }
        }
    }
]

module.exports = [
    {
        name: 'NI',
        mode: 'production',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'chat-plus-plus-NI.js'
        },
        plugins: [
            CONSTANTS,
            new webpack.DefinePlugin({
                INTERFACE: JSON.stringify('NI'),
                BASIC_CSS: JSON.stringify(resultNI)
            })
        ],
        module: {
            rules
        }
    },
    {
        name: 'SI',
        mode: 'production',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'chat-plus-plus-SI.js'
        },
        plugins: [
            CONSTANTS,
            new webpack.DefinePlugin({
                INTERFACE: JSON.stringify('SI'),
                BASIC_CSS: JSON.stringify(resultSI)
            })
        ],
        module: {
            rules
        }
    }
]
