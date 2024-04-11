import request from '../../core/utils/request'

// 查询
export function fetchPage (data) {
  return request.post('/system/traceLog/page', data, {
    trim: true
  })
}

// 导出Excel
export function exportExcel (data) {
  return request.post('/system/traceLog/exportExcel', data, {
    download: true,
    trim: true
  })
}
