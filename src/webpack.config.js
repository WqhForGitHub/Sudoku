const path = require('path')

module.exports = {
    entry: {
        index: './js/index'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts']
    },
    mode: 'development', // 设置mode
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                'ts-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        ]
    }
}