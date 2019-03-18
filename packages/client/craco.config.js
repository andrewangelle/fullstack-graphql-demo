const { paths } = require('@craco/craco')

module.exports = {
  webpack: {
    alias: {
      "components": `${paths.appSrc}/components`,
      "store": `${paths.appSrc}/store`,
      "styles": `${paths.appSrc}/styles`,
      "test-utils": `${paths.appSrc}/test-utils/*`,
      "types": `${paths.appSrc}/types`,
      "utils": `${paths.appSrc}/utils`
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^components(.*)$': '<rootDir>/src/components$1',
        '^store(.*)$': '<rootDir>/src/store$1',
        '^styles(.*)$': '<rootDir>/src/styles$1',
        '^test-utils(.*)$': '<rootDir>/src/test-utils$1',
        '^types(.*)$': '<rootDir>/src/types$1',
        '^utils(.*)$': '<rootDir>/src/utils$1',
      }
    }
  }
}