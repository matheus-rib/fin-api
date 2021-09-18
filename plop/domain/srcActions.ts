import { ActionType } from 'node-plop'

export default (baseDomainPath: string, baseTemplatePath: string): Array<ActionType> => [
  // Nest Files
  {
    type: 'add',
    path: `${baseDomainPath}/{{name}}s.module.ts`,
    templateFile: `${baseTemplatePath}/module.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainPath}/{{name}}s.controller.ts`,
    templateFile: `${baseTemplatePath}/controller.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainPath}/{{name}}s.provider.ts`,
    templateFile: `${baseTemplatePath}/provider.hbs`,
  },
  // Entity
  {
    type: 'add',
    path: `${baseDomainPath}/entities/{{name}}.entity.ts`,
    templateFile: `${baseTemplatePath}/entity.hbs`,
  },
  // DTO
  {
    type: 'add',
    path: `${baseDomainPath}/dto/Create{{capitalize name}}DTO.ts`,
    templateFile: `${baseTemplatePath}/dto/create.hbs`,
  },
  {
    type: 'add',
    path: `${baseDomainPath}/dto/Edit{{capitalize name}}DTO.ts`,
    templateFile: `${baseTemplatePath}/dto/edit.hbs`,
  },
]
