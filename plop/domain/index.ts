import { PlopGeneratorConfig } from 'node-plop'
import srcActions from './srcActions'
import testActions from './testActions'

const baseTemplatePath = 'plop/domain/templates'

// src files
const baseDomainSrcPath = 'src/domain/{{name}}s'
const baseTemplateSrcPath = `${baseTemplatePath}/src`

// tests files
const baseFactoryTestsPath = 'tests/factories'
const baseDomainTestsPath = 'tests/functional/domain/{{name}}s/controller'
const baseTemplateTestsPath = `${baseTemplatePath}/tests`

export default {
  description: 'Generate a new Domain',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'Type domain name in singular',
  }],
  actions: [
    ...srcActions(baseDomainSrcPath, baseTemplateSrcPath),
    ...testActions(baseFactoryTestsPath, baseDomainTestsPath, baseTemplateTestsPath),
  ],
} as PlopGeneratorConfig
