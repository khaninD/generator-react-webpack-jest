const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const prompts = require('../../../generators/app/prompts');
const generatorBase = path.join(__dirname, '../../../generators/app');

let generator;

/**
 * Global before load function. Run in the before callbacks
 * @param  {Object} customPrompts List of prompts to use
 * @return {Promise} -
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
  describe('#config', () => {
    it('should be app name === generator-react-webpack-jest', () => {
      expect(generator.appName).toBe('generator-react-webpack-jest');
    });

    it('should use "css" as default style language', () => {
      expect(generator.style).toBe('css');
    });

    it('should not use "inlineStyleTool"', () => {
      expect(generator.inlineStyleTool).toBeFalsy();
    });

    it('should not use inlineStyleTools', () => {
      expect(generator.inlineStyleTools).toBeUndefined();
    });

    it('should be not support postcss', () => {
      expect(generator.postcss).toBeFalsy();
    });

    it('should be not support module ', () => {
      expect(generator.cssmodules).toBeFalsy();
    });

    it('should be not support cssnext', () => {
      expect(generator.cssnext).toBeFalsy();
    });
  });

  describe('#createFiles', () => {
    it('should generate dot files', () => {
      assert.file(['package.json',
        '.babelrc',
        '.eslintrc',
        '.gitignore'
      ]);
    });

    it('should generate project configuration file', () => {
      assert.file('package.json');
      assert.file('server.js');
    });

    it('should generate the webpack configuration files', () => {
      assert.file([
        'webpack.config.js',
        'webpack_cfg/loaders.js',
        'webpack_cfg/webpack.dev.js',
        'webpack_cfg/webpack.prod.js'
      ])
    });

    it('should generate required source files', () => {
      assert.file([
        'src/index.html',
        'src/images/yeoman.png',
        'src/static/favicon.ico',
        'src/styles/main.css'
      ]);
    });

    it('should generate basic tests files', () => {
      assert.file([
        '__test__/index.test.js'
      ])
    })
  });
});

describe('react-webpack-jest:app with inline styles support', () => {
  beforeEach(() => beforeLoad({
    inlineStyleTool: true,
    inlineStyleTools: 'radium'
  }));

  describe('#config', () => {
    it('should be use inlineStyleTool and use radium', () => {
      expect(generator.inlineStyleTool).toBeTruthy();
      expect(generator.inlineStyleTools).toBe('radium');
    })
  });

  describe('#configuring', () => {
    it('should add radium support', () => {
      assert.fileContent('package.json', 'radium');
    })
  });

  describe('#content of index.js', () => {
    it('should use radium', () => {
      assert.fileContent('src/index.js', 'const Component = Radium(Alert);');
    })
  })
});

describe('react-webpack-jest:app with sass language', () => {
  beforeEach(() => beforeLoad({
    style: 'sass'
  }));

  describe('#config', () => {
    it('should be use sass language', () => {
      expect(generator.style).toBe('sass');
    });
  });
// 16:50 START
  describe('#configuring', () => {
    it('should be use sass-loader', () => {
      assert.fileContent('package.json', 'sass-loader');
    });
  });

  describe('#createFiles', () => {
    it('should be generate sass file', () => {
      assert.file('src/styles/main.sass');
    });
  });

  describe('#content of index.js', () => {
    it('should be support sass', () => {
      assert.fileContent('src/index.js', 'import styles from \'./main.sass\';')
    })
  })
});

describe('react-webpack-jest:app with less language', () => {
  beforeEach(() => beforeLoad({
    style: 'less'
  }));

  describe('#config', () => {
    it('should be use sass language', () => {
      expect(generator.style).toBe('less');
    });
  });

  describe('#configuring', () => {
    it('should be use less-loader', () => {
      assert.fileContent('package.json', 'less-loader');
    });
  });

  describe('#createFiles', () => {
    it('should be generate less file', () => {
      assert.file('src/styles/main.less');
    });
  });

  describe('#content of index.js', () => {
    it('should be support less', () => {
      assert.fileContent('src/index.js', 'import styles from \'./main.less\';')
    })
  })
});

describe('react-webpack-jest:app with sass language', () => {
  beforeEach(() => beforeLoad({
    style: 'scss'
  }));

  describe('#config', () => {
    it('should be use scss language', () => {
      expect(generator.style).toBe('scss');
    });
  });

  describe('#configuring', () => {
    it('should be use sass-loader', () => {
      assert.fileContent('package.json', 'sass-loader');
    });
  });

  describe('#createFiles', () => {
    it('should be generate scss file', () => {
      assert.file('src/styles/main.scss');
    });
  });

  describe('#content of index.js', () => {
    it('should be support scss', () => {
      assert.fileContent('src/index.js', 'import styles from \'./main.scss\';')
    })
  })
});

describe('react-webpack-jest:app with support cssmodules (css language)', () => {
  beforeEach(() => beforeLoad({
    cssmodules: true
  }));

  describe('#config', () => {
    it('should be use cssmodules', () => {
      expect(generator.cssmodules).toBeTruthy();
    });
  });

  describe('#configuring', () => {
    it('should be use react-css-modules', () => {
      assert.fileContent('package.json', 'react-css-modules');
    });
  });

  describe('#content of index.js', () => {
    it('should be support react-css-modules', () => {
      assert.fileContent('src/index.js', 'Table = CSSModules(Table, styles);')
    })
  });

  describe('#content of loaders.js', () => {
    it('should be support css modules', () => {
      assert.fileContent('webpack_cfg/loaders.js', 'modules: true')
    })
  })
});

describe('react-webpack-jest:app with support cssmodules (sass language)', () => {
  beforeEach(() => beforeLoad({
    cssmodules: true,
    style: 'sass'
  }));

  describe('#config', () => {
    it('should be use cssmodules', () => {
      expect(generator.cssmodules).toBeTruthy();
    });
  });

  describe('#configuring', () => {
    it('should be use react-css-modules', () => {
      assert.fileContent('package.json', 'react-css-modules');
    });
  });

  describe('#content of index.js', () => {
    it('should be support react-css-modules', () => {
      assert.fileContent('src/index.js', 'Table = CSSModules(Table, styles);')
    });

    it('should be support sass', () => {
      assert.fileContent('src/index.js', 'import styles from \'./main.sass\';')
    })
  });

  describe('#content of loaders.js', () => {
    it('should be support css modules', () => {
      assert.fileContent('webpack_cfg/loaders.js', 'modules: true')
    })
  })
});

describe('#react-webpack-jest:app support postcss', () => {
  beforeEach(() => beforeLoad({
    postcss: true
  }));

  describe('#config', () => {
    it('should be use postcss', () => {
      expect(generator.postcss).toBeTruthy();
    })
  });

  describe('#configuring', () => {
    it('should be support postcss', () => {
      assert.fileContent('package.json', 'postcss-loader')
    });

    it('should be support postcss in loaders', () => {
      assert.fileContent('webpack_cfg/loaders.js', 'postcss-loader')
    })
  });

  describe('#create files', () => {
    it('should be generate postcss.config.js file', () => {
      assert.file('postcss.config.js');
    })
  });
});

describe('#react-webpack-jest:app support nextcss', () => {
  beforeEach(() => beforeLoad({
    cssnext: true
  }));

  describe('#config', () => {
    it('should be use cssnext', () => {
      expect(generator.cssnext).toBeTruthy();
    })
  });

  describe('#configuring', () => {
    it('should be support postcss', () => {
      assert.fileContent('package.json', 'postcss-loader')
    });

    it('should be support cssnext', () => {
      assert.fileContent('package.json', 'postcss-cssnext')
    })
  })
});