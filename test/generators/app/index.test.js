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
    })
    .toPromise();
};

describe('react-webpack:app', () => {
  beforeEach(() => beforeLoad());

  describe('test config with customPrompts', () => {
    beforeEach(() => beforeLoad({
      appName: 'myApp',
      inlineStyleTool: false
    }));

    it ('should be app name === my-app', () => {
      console.log(generator.appName);
      expect(generator.appName).toBe('my-app');
    });

    it('should be not use inlineStyleTools', () => {
      expect(generator.inlineStyleTool).toBeFalsy();
      expect(generator.inlineStyleTools).toBeUndefined();
    });
  });

  describe('test config with defaults props', () => {
    it('should be app name === generator-react-webpack-jest', () => {
      expect(generator.appName).toBe('generator-react-webpack-jest');
    });

    it('should use "css" as default style language', () => {
      expect(generator.style).toBe('css');
    });

    it('should use "inlineStyleTool"', () => {
      expect(generator.inlineStyleTool).toBeFalsy();
    });

    it('should use "Radium" as inlineStyleTools', () => {
      expect(generator.inlineStyleTools).toBeUndefined();
    });

    it('should be postcss support', () => {
      expect(generator.postcss).toBeFalsy();
    });

    it('should be css module support', () => {
      expect(generator.cssmodules).toBeTruthy();
    });

    it('should be cssnext support', () => {
      expect(generator.cssnext).toBeFalsy();
    });
  });

  describe('create files', () => {
    it('should generate project configuration file', () => {
      assert.file(['package.json']);
    });
  });

  describe('configuring', () => {
    it('should add css module support', () => {
      assert.fileContent('package.json', 'react-css-modules');
    });
  });

  describe('configuring', () => {
    it('should add css module support', () => {
      assert.fileContent('package.json', 'react-css-modules');
    });
  });
});