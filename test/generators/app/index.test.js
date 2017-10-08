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
      expect(generator.inlineStyleTool).toBeTruthy();
    });

    it('should use "Radium" as inlineStyleTools', () => {
      expect(generator.inlineStyleTools).toBe('radium');
    });

    it('should be postcss support', () => {
      expect(generator.postcss).toBeTruthy();
    });

    it('should be css module support', () => {
      expect(generator.styleModule).toBeTruthy();
    });

    it('should be cssnext support', () => {
      expect(generator.cssnext).toBeTruthy();
    });
  });
});