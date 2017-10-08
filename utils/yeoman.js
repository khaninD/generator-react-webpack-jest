const path = require('path');
const _ = require('underscore.string');
// Needed directory paths
const baseName = path.basename(process.cwd());
const getBaseDir = () => baseName;

const getAppName = (appName) => {
  if (appName === undefined) {
    appName = getBaseDir();
  };
  return _.slugify(_.humanize(appName));
};

module.exports = {
  getAppName
};