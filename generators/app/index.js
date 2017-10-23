const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const { mkdirsSync } = require('mkdir');
const { yeoman, config } = require('../../utils/all');
const {firstPrompt, secondPrompt, thirdPrompt} = require('./prompts');
const baseRootPath = path.dirname(require.resolve('../webpack-react-template'));

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  /**
   * prompting of user
   * @returns {Promise.<TResult>} -
   */
  prompting() {
    return this.prompt(firstPrompt).then((answers) => {
      // Make sure to get the correct app name if it is not the default
      if(answers.appName !== yeoman.getAppName()) {
        answers.appName = yeoman.getAppName(answers.appName);
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
    const inlineStyleTools = config.getChoiceByKey('inlineStyleTools', this.inlineStyleTools);
    this._setDependence(packageSettings, true, inlineStyleTools);

    // Add needed loaders if we have special styles
    const styleConfig = config.getChoiceByKey('style', this.style);
    this._setDependence(packageSettings, false, styleConfig);

    // Add postcss module if enabled
    const postcssConfig = config.getChoiceByKey('postcss', 'postcss');
    if (this.postcss) {
      this._setDependence(packageSettings, false, postcssConfig);
    }

    // Add cssnext module if enabled
    const cssnextConfig = config.getChoiceByKey('cssnext', 'cssnext');
    if (this.cssnext) {
      this._setDependence(packageSettings, false, cssnextConfig);
    }

    // Add cssmodules if enabled
    const cssmoduleConfig = config.getChoiceByKey('cssmodules', 'cssmodules');
    if(this.cssmodules) {
      this._setDependence(packageSettings, true, cssmoduleConfig);
    }
    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  }

  writing() {
    const excludeFiles = [
      'node_modules',
      'package.json'
    ];
    fs.readdir(baseRootPath, (err, files) => {
      for (let file of files) {
        if (excludeFiles.indexOf(file) > -1) {
          continue;
        }
        const from = path.join(baseRootPath, file);
        const to = this.destinationPath(file);
        if (file === 'src') {
          // Copy all from src
          this.fs.copy(from, to);
          if (this.inlineStyleTools) {
            this.__copyFromExamples(file, `js/${this.inlineStyleTools}-example.js`, 'index.js')
          }
          if (this.style === 'sass') {
            this.__copyFromExamples(file, 'styles/sass-example.sass', 'styles/main.sass')
          } else if(this.style === 'css') {
            this.__copyFromExamples(file, 'styles/example.css', 'styles/main.css')
          } else if(this.style === 'scss') {
            this.__copyFromExamples(file, 'styles/scss-example.scss', 'styles/main.scss')
          } else if(this.style === 'less') {
            this.__copyFromExamples(file, 'styles/less-example.less', 'styles/main.less')
          }
          if (this.cssmodules) {
            if (this.style === 'css') {
              this.__copyFromExamples(file, 'css-modules/css/css.js', 'index.js');
            } else if (this.style === 'sass') {
              this.__copyFromExamples(file, 'css-modules/sass/sass.js', 'index.js');
            } else if (this.style === 'scss') {
              this.__copyFromExamples(file, 'css-modules/sass/scss.js', 'index.js');
            } else if (this.style === 'less') {
              this.__copyFromExamples(file, 'css-modules/less/less.js', 'index.js');
            }
          } else {
            if (this.style === 'css') {
              this.__copyFromExamples(file, 'js/example.js', 'index.js');
            } else if (this.style === 'sass') {
              this.__copyFromExamples(file, 'js/sass-example.js', 'index.js');
            } else if (this.style === 'scss') {
              this.__copyFromExamples(file, 'js/scss-example.js', 'index.js');
            } else if (this.style === 'less') {
              this.__copyFromExamples(file, 'js/less-example.js', 'index.js');
            }
          }
        } else if (file === 'webpack_cfg' && this.cssmodules) {
          // copy all form webpack_cfg
          this.fs.copy(from, to);
          // replace laoders.js
          this.__copyFromExamples(file, 'loaders/cssmodules/loaders.js', 'loaders.js');
        } else {
          this.fs.copy(from, to);
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
