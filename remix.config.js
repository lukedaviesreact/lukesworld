/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
    cacheDirectory: './node_modules/.cache/remix',
    ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],

    future: {
        unstable_cssModules: true,
        unstable_vanillaExtract: true,
        unstable_cssSideEffectImports: true,
    },

    // SIDE EFFECTS IMPORTS
    //
    // serverDependenciesToBundle: [
    //   /^@adobe\/react-spectrum/,
    //   /^@react-spectrum/,
    //   /^@spectrum-icons/,
    // ],
    // future: {
    //   unstable_cssSideEffectImports: true,
    // },
};
