import { ActionType } from 'node-plop'

export default (baseFactoriesPath: string, baseDomainTestsPath: string, baseTemplatePath: string): Array<ActionType> => [
  // Factory
  {
    type: 'add',
    path: `${baseFactoriesPath}/{{capitalize name}}Factory.ts`,
    templateFile: `${baseTemplatePath}/factories/factory.hbs`,
  },
  // Controller Tests
  {
    type: 'add',
    path: `${baseDomainTestsPath}/index.spec.ts`,
    templateFile: `${baseTemplatePath}/controller/index.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainTestsPath}/show.spec.ts`,
    templateFile: `${baseTemplatePath}/controller/show.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainTestsPath}/store.spec.ts`,
    templateFile: `${baseTemplatePath}/controller/store.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainTestsPath}/edit.spec.ts`,
    templateFile: `${baseTemplatePath}/controller/edit.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainTestsPath}/delete.spec.ts`,
    templateFile: `${baseTemplatePath}/controller/delete.hbs`,
  },
]
