import fileDownload from 'js-file-download'
import constants from '@/core/plugins/consts'
import message from './message'

export default function (response, decode = true, mime = 'application/octet-stream', filename) {
  if (response.headers['content-length'] === '0') {
    message.error('无法下载文件，可能因为数据处理错误导致文件大小为0B')
    return
  <#noparse>}</#noparse>
  if (filename == null) {
    // 下载接口在响应头eva-download-filename中存放文件名称，接口返回的文件名称需采用url encode的方式进行编码
    filename = decode ? decodeURI(response.headers[constants.HEADER_DOWNLOAD_FILENAME])
      : response.headers[constants.HEADER_DOWNLOAD_FILENAME]
  <#noparse>}</#noparse>
  fileDownload(response.data, filename, mime)
<#noparse>}</#noparse>
