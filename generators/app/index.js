const Generator = require('yeoman-generator');
const ReactTmpl = require('webpack-react-template');
const path = require('path');
const fs = require('fs');
const utils = require('../../utils/all');
const {firstPrompt, secondPrompt, thirdPrompt} = require('./prompts');

const baseRootPath = path.dirname(require.resolve('webpack-react-template'));

module.exports = class extends Generator {
  constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
    // Use our plain template as source
    this.sourceRoot(baseRootPath);
  }

  /**
   * prompting of user
   * @returns {Promise.<TResult>}
   */
  prompting() {
    return this.prompt(firstPrompt).then((answers) => {
      // Make sure to get the correct app name if it is not the default
      if(answers.appName !== utils.yeoman.getAppName()) {
        answers.appName = utils.yeoman.getAppName(answers.appName);
      }
      this.appName = answers.appName;
      this.inlineStyleTool = answers.inlineStyleTool;
    }).then(() => {
      if (this.inlineStyleTool) {
        return this.prompt(secondPrompt).then((answers) => {
          this.inlineStyleTools = answers.inlineStyleTools;
        });
      }
    }).then(() => {
      return this.prompt(thirdPrompt).then((answers) => {
        this.style = answers.style;
        this.styleModule = answers.styleModule;
        this.postcss = answers.postcss;
        this.cssnext = answers.cssnext;
      });
    })
  }
};
