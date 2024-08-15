import { useDefaultStore } from '../store'

class Authorizer {
  // 判断是否为超级管理员
  isSuperAdmin = () => {
    const userInfo = this.#getStore().userInfo
    if (userInfo == null) {
      return false
    }
    return userInfo.isSuperAdmin
  }

  // 判断是否包含所有角色
  hasRoles = (roles) => {
    roles = this.#handleParameter(roles)
    const result = this.#checkRoles(roles)
    if (result !== undefined) {
      return result
    }
    const userInfo = this.#getStore().userInfo
    // 如果是超管，则验证通过
    if (this.isSuperAdmin()) {
      return true
    }
    for (const role of roles) {
      if (userInfo.roles.findIndex(r => r === role) === -1) {
        return false
      }
    }
    return true
  }

  // 判断是否包含任意指定角色
  hasAnyRoles = (roles) => {
    roles = this.#handleParameter(roles)
    const result = this.#checkRoles(roles)
    if (result !== undefined) {
      return result
    }
    const userInfo = this.#getStore().userInfo
    // 如果是超管，则验证通过
    if (this.isSuperAdmin()) {
      return true
    }
    for (const role of roles) {
      if (userInfo.roles.findIndex(r => r === role) > -1) {
        return true
      }
    }
    return false
  }

  // 判断是否包含所有权限
  hasPermissions = (permissions) => {
    permissions = this.#handleParameter(permissions)
    const result = this.#checkPermissions(permissions)
    if (result !== undefined) {
      return result
    }
    const userInfo = this.#getStore().userInfo
    // 如果是超管 && 权限为空，则验证通过
    if (this.isSuperAdmin() && userInfo.permissions.length === 0) {
      return true
    }
    for (const permission of permissions) {
      if (userInfo.permissions.findIndex(p => p === permission) === -1) {
        return false
      }
    }
    return true
  }

  // 判断是否包含任意指定权限
  hasAnyPermissions = (permissions) => {
    permissions = this.#handleParameter(permissions)
    const result = this.#checkPermissions(permissions)
    if (result !== undefined) {
      return result
    }
    const userInfo = this.#getStore().userInfo
    // 如果是超管 && 权限为空，则验证通过
    if (this.isSuperAdmin() && userInfo.permissions.length === 0) {
      return true
    }
    for (const permission of permissions) {
      if (userInfo.permissions.findIndex(p => p === permission) > -1) {
        return true
      }
    }
    return false
  }

  // 验证角色参数
  #checkRoles = roles => {
    if (roles.length === 0) {
      return true
    }
    const userInfo = this.#getStore().userInfo
    if (userInfo == null) {
      return false
    }
  }

  // 验证权限参数
  #checkPermissions = permissions => {
    if (permissions.length === 0) {
      return true
    }
    const userInfo = this.#getStore().userInfo
    if (userInfo == null) {
      return false
    }
  }

  // 处理参数
  #handleParameter = params => {
    if (params == null) {
      return []
    }
    if (typeof params !== 'string' && !(params instanceof Array)) {
      throw new Error('v-roles和v-permissions参数必须是一个字符串或数组')
    }
    if (typeof params === 'string') {
      return [params]
    }
    return params
  }

  // 获取Store
  #getStore () {
    return useDefaultStore()
  }
}

export default new Authorizer()
