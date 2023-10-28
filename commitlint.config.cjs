module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'feat', 'BREAKING CHANGE', 'ci', 'perf', 'style', 'refactor', 'docs', 'improv', 'chore'],
    ],
  },
};
