const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const prompts = require('../../../generators/app/prompts');
const generatorBase = path.join(__dirname, '../../../generators/app');

let generator;

/**
 * Global before load function. Run in the before callbacks
 * @param  {Object} prompts List of prompts to use
 * @return {Promise}
 */
const beforeLoad = (customPrompts) => {

  return helpers.run(generatorBase)
    .inTmpDir()
    .withOptions({
      'skip-welcome-message': true,
      'skip-install': true
    })
    .withPrompts(customPrompts)
    .on('ready', function(instance) {
      generator = instance;
    });
};

describe('react-webpack:app', () => {

  beforeEach(() => beforeLoad());

  describe('test config with customPrompts', () => {
    beforeEach(() => beforeLoad({
      appName: 'my-react-app',
      inlineStyleTool: false
    }));

    it ('should be app name === my-react-app', () => {
      expect(generator.appName).toBe('my-react-app');
    });

    it('should be not use inlineStyleTools', () => {
      expect(generator.inlineStyleTool).toBeFalsy();
      expect(generator.inlineStyleTools).toBeUndefined();
    });
  });

  describe('test config with customPrompts **IINLINE STYLE**', () => {
    beforeEach(() => beforeLoad({
      inlineStyleTool: true,
      inlineStyleTools: 'radium'
    }));

    it('should be use inlineStyleTool', () => {
      expect(generator.inlineStyleTool).toBeTruthy();
    });

    it('should be use inlineStyleTools', () => {
      expect(generator.inlineStyleTools).toBe('radium');
    });

    it('should add react style support', () => {
      assert.fileContent('package.json', 'radium');
    });
  });

  describe('test config with customPrompts ** STYLES ** ', () => {
    beforeEach(() => beforeLoad({
      style: 'sass',
      cssmodules: true
    }));

    it('should add reactcss modules support', () => {
      assert.fileContent('package.json', 'react-css-modules');
    });

    it('should be use sass', () => {
      expect(generator.style).toBe('sass');
    });

    it('cretae file main.sass', () => {
      assert.file('src/styles/main.sass');
    });

    it('should add sass-loader  support', () => {
      assert.fileContent('package.json', 'sass-loader');
    });

    it('should add sass-loader  support', () => {
      assert.fileContent('src/index.js', 'import styles from \'./main.sass\';');
    });

    describe('test config with SCSS styles', () => {
      beforeEach(() => beforeLoad({
        style: 'scss',
        cssmodules: true
      }));
      it('should be use scss', () => {
        expect(generator.style).toBe('scss');
      });

      it('cretae file main.scss', () => {
        assert.file('src/styles/main.scss');
      });

      it('should add sass-loader  support', () => {
        assert.fileContent('package.json', 'sass-loader');
      });

      it('should add scss-loader  support', () => {
        assert.fileContent('src/index.js', 'import styles from \'./main.scss\';');
      });
    })

    describe('test config with LESS styles', () => {
      beforeEach(() => beforeLoad({
        style: 'less',
        cssmodules: true
      }));
      it('should be use less', () => {
        expect(generator.style).toBe('less');
      });

      it('create main.less file', () => {
        assert.file('src/styles/main.less');
      });

      it('should add sass-loader  support', () => {
        assert.fileContent('package.json', 'less-loader');
      });

      it('should add scss-loader  support', () => {
        assert.fileContent('src/index.js', 'import styles from \'./main.less\';');
      });
    })
  });

  describe('test config with defaults props', () => {
    it('should be app name === generator-react-webpack-jest', () => {
      expect(generator.appName).toBe('generator-react-webpack-jest');
    });

    it('should use "css" as default style language', () => {
      expect(generator.style).toBe('css');
    });

    it('cretae file main.scss', () => {
      assert.file('src/styles/main.css');
    });

    it('should use "inlineStyleTool"', () => {
      expect(generator.inlineStyleTool).toBeFalsy();
    });

    it('should use "Radium" as inlineStyleTools', () => {
      expect(generator.inlineStyleTools).toBeUndefined();
    });

    it('should be not support postcss', () => {
      expect(generator.postcss).toBeFalsy();
    });

    it('should be not support module ', () => {
      expect(generator.cssmodules).toBeFalsy();
    });

    it('should be cssnext support', () => {
      expect(generator.cssnext).toBeFalsy();
    });
  });

  describe('create files', () => {
    it('should generate project configuration files and directories', () => {
      assert.file(['package.json',
        '.babelrc',
        '.eslintrc',
        'server.js',
        '.gitignore',
        'webpack.config.js',
        'src',
        'src/index.html',
        'webpack_cfg/loaders.js',
        'webpack_cfg/webpack.dev.js',
        'webpack_cfg/webpack.prod.js',
        'webpack_cfg'
      ]);
    });
  });
});
