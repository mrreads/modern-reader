/* config-overrides.js */
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { 
        '@base-color': '#e54304',
        '@H050': '#fff5f2',
        '@H100': '#facfc3',
        '@H200': '#f5a890',
        '@H300': '#f08460',
        '@H400': '#eb6331',
        '@H500': '#e54304',
        '@H600': '#db4302',
        '@H700': '#c73f00',
        '@H800': '#a83800',
        '@H900': '#802d00',
      }
    }
  })
);