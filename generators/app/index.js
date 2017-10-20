const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const { mkdirsSync } = require('mkdir');
const { ncp } = require('ncp');
const utils = require('../../utils/all');
const { firstPrompt, secondPrompt, thirdPrompt } = require('./prompts');
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
   * @returns {Promise.<TResult>} -
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
      if (!this.inlineStyleTools) {
        return this.prompt(thirdPrompt).then((answers) => {
          this.style = answers.style;
          this.cssmodules = answers.cssmodules;
          this.postcss = answers.postcss;
          this.cssnext = answers.cssnext;
        });
      }
    })
  }

  /**
   * added dependences to package.json file
   * @param {Object} to -
   * @param {Boolean} env - devDependencies or dependencies
   * @param {Object} dependence -
   * @private
   */
  _setDependence(to, env, dependence) {
    if(dependence) {
      const {packages} = dependence;
      if(packages) {
        for(let dependency of packages) {
          env = (env) ? to.dependencies : to.devDependencies;
          env[dependency.name] = dependency.version;
        }
      }
    }
  }

  __copyFromExamples(filePath, fileName, outputName) {
    const pathToFile = path.join(__dirname, 'examples', fileName);
    this.fs.copy(pathToFile, path.join(filePath, outputName));
  }

  _setLerna(packageSettings, defaultSettings) {
    const lernaVersion = (packageSettings.devDependencies.lerna).slice(1);
    const lernaConfig = {
      lerna: `${lernaVersion}`,
      packages: [
        "generators/*"
      ],
      version: "0.0.0"
    };
    //create packages directory
    mkdirsSync(this.destinationPath('packages'));
    // set postinstall process to scripts
    packageSettings.scripts = Object.assign(defaultSettings.scripts, {postinstall: "lerna bootstrap && npm start"});
    // create lerna.json
    this.fs.writeJSON(this.destinationPath('lerna.json'), lernaConfig);
  }

  configuring() {
    // Generate our package.json. Make sure to also include the required dependencies for styles
    let defaultSettings = this.fs.readJSON(`${baseRootPath}/package.json`);
    let packageSettings = {
      name: this.appName,
      private: true,
      version: '0.0.1',
      description: `${this.appName} - Generated by generator-react-webpack-jest`,
      main: 'src/index.js',
      scripts: defaultSettings.scripts,
      repository: '',
      keywords: [],
      author: 'Your name here',
      devDependencies: defaultSettings.devDependencies,
      dependencies: defaultSettings.dependencies
    };
    if (this.options.lerna) {
      this._setLerna(packageSettings, defaultSettings);
    }
    packageSettings = Object.assign(defaultSettings, packageSettings);
    // Add needed inline styles tools
    const inlineStyleTools = utils.config.getChoiceByKey('inlineStyleTools', this.inlineStyleTools);

    this._setDependence(packageSettings, true, inlineStyleTools);

    // Add needed loaders if we have special styles
    let styleConfig = utils.config.getChoiceByKey('style', this.style);
    this._setDependence(packageSettings, false, styleConfig);

    // Add postcss module if enabled
    let postcssConfig = utils.config.getChoiceByKey('postcss', 'postcss');
    if (this.postcss) {
      this._setDependence(packageSettings, false, postcssConfig);
    }

    // Add cssmodules if enabled
    const cssmoduleConfig = utils.config.getChoiceByKey('cssmodules', 'cssmodules');
    if(this.cssmodules) {
      this._setDependence(packageSettings, true, cssmoduleConfig);
    }
    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  }

  writing() {
    const excludeList = [
      'package.json',
      'node_modules'
    ];
    fs.readdir(this.sourceRoot(), (err, files) => {
      for (let file of files) {
        // Skip file if it's in our exclude list
        if (excludeList.indexOf(file) !== -1) {
          continue;
        }
        const fullPath = path.join(baseRootPath, file);
        const checkDirectory = fs.statSync(fullPath).isDirectory();
        if (checkDirectory) {
          if (file === 'src') {
            // @TODO give out of in helper function
            if (this.inlineStyleTools) {
              this.__copyFromExamples(file, `${this.inlineStyleTools}-example.js`, 'index.js')
            }
            if (this.style === 'sass') {
              this.__copyFromExamples(file, 'sass-example.sass', 'main.sass')
            } else if(this.style === 'css') {
              this.__copyFromExamples(file, 'example.css', 'main.css')
            } else if(this.style === 'scss') {
              this.__copyFromExamples(file, 'scss-example.scss', 'main.scss')
            }
            if (this.cssmodules && this.style === 'css') {
              this.__copyFromExamples(file, 'react-css-modules-example.js', 'index.js');
            } else if (this.cssmodules && this.style === 'sass') {
              this.__copyFromExamples(file, 'sass-reactcssmodules-example.js', 'index.js');
            } else if (this.cssmodules && this.style === 'scss') {
              this.__copyFromExamples(file, 'scss-reactcssmodules-example.js', 'index.js');
            }
          }
          ncp(fullPath, file);
        } else {
          this.fs.copy(fullPath, file);
        }
      }
     });
  }

  install() {
    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: false
      });
    }
  }
};
