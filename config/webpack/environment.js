const { environment } = require('@rails/webpacker')

const path = require('path');

const customConfig = {
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
            '@stylesheets': path.resolve(__dirname, '..', '..', 'app/javascript/stylesheets'),
            '@pages': path.resolve(__dirname, '..', '..', 'app/javascript/src/pages'),
            '@components': path.resolve(__dirname, '..', '..', 'app/javascript/src/components'),
            '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
        },
    },
};

environment.config.merge(customConfig);

environment.splitChunks()

module.exports = environment
