module.exports = {
  default: {
    require: [
      'step-definitions/**/*.ts',
      'support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:test-results/cucumber-report.json',
      'html:test-results/cucumber-report.html',
      '@cucumber/pretty-formatter'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true,
    parallel: 1,
    retry: 1
  }
};
