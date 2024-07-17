const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'server-url',
    options: {
      'sonar.sources': '.',
      'sonar.inclusions': 'src/**', // Entry point of your code
      'sonar.exclusions': 'src/assets/**', // Entry point of your code which you want to exclude
      // "sonar.exclusions": "src/assets/**,**/*.spec.ts,encryption.service.ts", // Entry point of your code which you want to exclude
      'sonar.language': 'ts',
      'sonar.testExecutionReportPaths': 'reports/ut_report.xml', // Entry point of test report xml file 'sonar.'sonar.
      'typescript.lcov.reportPaths': 'coverage/{project-name}/lcov.info', // Entry point of coverage report lcov file also added project 'coverage/project-name/lcov.info
    },
  },
  () => {}
  // () => process.exit()
);