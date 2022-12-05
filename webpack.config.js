const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');   // 터미널 명령어를 웹팩에서도 사용할 수 있게 만들어 줌
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dontenv').config();   // dotenvt를 사용하기 위한 과정


module.exports = {   // nodejs 문법 (모듈을. 밖으로 빼냄)
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    // 쓰여있는 내용에 따라서 다르게 빌드를 진행
    // mode: 'development',   // js객체 문법
    entry: {   //entry: 시작점
        main: path.resolve('./src/app.js')
        // 경로 (./src/app.js가 시작점이라는 것)
        // path는 require해서 사용해야 함
        // OS별로 경로를 설정하는 것이 다를 수 있으나, path 모듈을 사용하면 동일하게 경로를 찾을 수 있다
    },
    output: { // output: 번들링한 결과물을 내놓을 위치
        filename: '[name].js',   // name에는 entry의 key값이 자동으로 들어옴
        path: path.resolve('./dist')
    },

    module: {
        rules: [
            {
                // 로더가 처리해야할 파일의 패턴 (정규표현식)
                // 여기서 \는 .을 정규표현식 문법이 아닌 특수문자로, .js$는 .js로 끝나는 모든 파일
                // 원래 정규표현식에서 .의 의미는 모든 문자나 숫자를 뜻함
                test: /\.js$/,    // 이스케이프 기호를 사용
                use: [
                    // 위와 일치하는 패턴의 파일이 전달될 로더를 설정함
                    path.resolve('./myLoader.js')   // myLoader라는 함수로 실행을 시키겠다
                ]
            },

            /* css-loader */
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 여기 추가합니다.
                test: /\.(png|jpg|gif|svg)$/,   // 해당하는 포맷을 가진것을 처리하겠다는 뜻
                // type: 'asset/inline',
                // 인라인을 남기면 무조건 문자열로 바뀌므로 parser를 적용시키고 싶다면 inline을 제거하고 적용시킬 것
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024
                        // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
                        // 변경시켜줄 이미지의 용량을 제한시켜줌 (로딩속도를 컨트롤 하기위함)
                    }
                },
            }
        ]
    },

    /* 플러그인 */
    // 기본적으로 array임
    plugins: [
        new webpack.BannerPlugin({
            banner: '배너입니다!!!' + new Date().toLocaleString()
        }),
        new webpack.DefinePlugin({
            dev: JSON.stringify(process.env.DEV_API),
            pro: JSON.stringify(process.env.PRO_API),
            // pro: 'https://pro.api.com'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'   // 목표한 html파일의 위치
        }),
        new CleanWebpackPlugin()
    ]
}