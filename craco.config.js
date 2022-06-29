const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@': resolvePath('./src/')
        },
        configure: {
            target: 'electron-main'
        },
        resolve: {
            fallback: {
                "fs": false,
                "path": false
            },
        }
    },
}