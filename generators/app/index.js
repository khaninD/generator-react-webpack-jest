const Generator = require('yeoman-generator');
const ReactTmpl = require('webpack-react-template');
const path = require('path');
const fs = require('fs');
const prompts = require('./prompts');
const baseRootPath = path.dirname(require.resolve('webpack-react-template'));

module.exports = class extends Generator {
  constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag

    // Use our plain template as source
    this.sourceRoot(baseRootPath);
  }

  /**
   * prompting of user
   * @returns {Promise.<TResult>}
   */
  prompting() {
    return this.prompt(prompts).then((answers) => {
      // Make sure to get the correct app name if it is not the default
      if(answers.appName !== utils.yeoman.getAppName()) {
        answers.appName = utils.yeoman.getAppName(answers.appName);
      }
      // Set needed global vars for yo
      this.appName = answers.appName;
    });
  }
};
