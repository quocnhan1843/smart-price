const path = require("path");

const aliases = {
  "@": "src",
};

module.exports = {
  webpack: {},
  jest: {},
  jsconfig: {},
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
  const aliasHasExtension = /\.\w+$/.test(aliasTo);
  module.exports.jest[`^${alias}$`] = aliasHasExtension
    ? `<rootDir>/${aliasTo}`
    : `<rootDir>/${aliasTo}/index.js`;
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
  module.exports.jsconfig[alias + "/*"] = [
    aliasTo + "/*",
    aliasTo + "/*/index.js",
    aliasTo + "/*/index.jsx",
  ];
  module.exports.jsconfig[alias] = aliasTo.includes("/index.")
    ? [aliasTo]
    : [aliasTo + "/index.js", aliasTo + "/index.jsx", aliasTo + "/index.json"];
}

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}
