import { NodePlopAPI } from 'plop'
import domain from './plop/domain/index'
import capitalize from './plop/helpers/capitalize'

export default function (plop: NodePlopAPI): void {
  plop.setHelper('capitalize', capitalize)
  plop.setGenerator('domain', domain)
}
