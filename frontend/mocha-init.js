require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
require('@babel/polyfill');
require('isomorphic-fetch');
require.extensions['.css'] = function () {
    return null;
};
require.extensions['.png'] = function () {
    return null;
};
require.extensions['.jpg'] = function () {
    return null;
};
require.extensions['.svg'] = function () {
    return null;
};
