/**
 * 常量定义
 */
export default {
  // 超级管理员编码
  ROLE_ADMIN: 'admin',
  // 请求头：操作平台
  HEADER_PLATFORM: 'eva-platform',
  // 请求头：登录令牌
  HEADER_TOKEN: 'eva-auth-token',
  // 请求头：操作类型
  HEADER_OPERA_TYPE: 'eva-opera-type',
  // 请求头：下载文件名
  HEADER_DOWNLOAD_FILENAME: 'eva-download-filename',
  // 默认错误提示
  DEFAULT_ERROR_MESSAGE: '操作失败，请稍后重试或联系系统管理员',
  // 系统菜单
  SYSTEM_MENU: {
    // 目录
    TYPE_DIR: 'DIR',
    // 外部链接
    TYPE_EXTERNAL: 'EXTERNAL',
    // IFrame嵌套
    TYPE_IFRAME: 'IFRAME'
  },
  // 排序方式
  ORDER_BY: {
    // 升序
    ASC: 'ASC',
    // 降序
    DESC: 'DESC'
  },
  // 缓存类型
  CACHE_TYPE: {
    // 内存缓存
    MEMORY: 'memory',
    // localStorage缓存
    LOCAL: 'local',
    // sessionStorage缓存
    SESSION: 'session'
  }
}
