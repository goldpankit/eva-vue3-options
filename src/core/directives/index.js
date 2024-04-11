import vRoles from './v-roles'
import vAnyRoles from './v-any-roles'
import vPermissions from './v-permissions'
import vAnyPermissions from './v-any-permissions'
import vTrim from './v-trim'
import vClipboard from './v-clipboard'
export default {
  install (app) {
    // 角色控制指令
    app.directive('roles', vRoles)
    app.directive('any-roles', vAnyRoles)
    // 权限控制指令
    app.directive('permissions', vPermissions)
    app.directive('any-permissions', vAnyPermissions)
    // 自动去空指令
    app.directive('trim', vTrim)
    // 文本复制
    app.directive('clipboard', vClipboard)
  }
}
