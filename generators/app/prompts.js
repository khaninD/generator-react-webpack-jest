const utils = require('../../utils/all');
module.exports = {
  firstPrompt: [
    {
      type: 'input',
      name: 'appName',
      message: 'Please set your application name',
      default: utils.yeoman.getAppName()
    },
    {
      type    : 'confirm',
      name    : 'inlineStyleTool',
      message : 'Enable inline styles tools as Radium or ReactCss?',
      default: false
    }
  ],
  secondPrompt: {
    type: 'list',
    name: 'inlineStyleTools',
    message: 'Which inline style tools?',
    choices: utils.config.getChoices('inlineStyleTools'),
    default: utils.config.getDefaultChoice('inlineStyleTools')
  },
  thirdPrompt: [
    {
    type: 'list',
    name: 'style',
    message: 'Which style language do you want to use?',
    choices: utils.config.getChoices('style'),
    default: utils.config.getDefaultChoice('style')
    },
    {
      type    : 'confirm',
      name    : 'cssmodules',
      message : 'Enable css module support? See https://github.com/gajus/react-css-modules for further info',
      default: false
    },
    {
      type    : 'confirm',
      name    : 'postcss',
      message : 'Enable postcss?',
      default: false
    },
    {
      type    : 'confirm',
      name    : 'cssnext',
      message : 'Enable cssnext?',
      default: false
    }
  ]
};