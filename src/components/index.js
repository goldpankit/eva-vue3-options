import TableLayout from '@/layouts/TableLayout'
import DictCheckboxGroup from '@/components/common/DictCheckboxGroup'
import DictRadioGroup from '@/components/common/DictRadioGroup'
import DictSelect from '@/components/common/DictSelect'
import EmptyTip from '@/components/common/EmptyTip'
import FormItemTip from '@/components/common/FormItemTip'
import GlobalWindow from '@/components/common/GlobalWindow'
import Icon from '@/components/common/Icon'
import ImportButton from '@/components/common/ImportButton'
import AppLoading from '@/components/common/AppLoading'
import Pagination from '@/components/common/Pagination'
import PopoverCellValue from '@/components/common/PopoverCellValue'
import TagCellValue from '@/components/common/TagCellValue'
import SearchForm from '@/components/common/SearchForm'
import SearchTable from '@/components/common/SearchTable'
export default {
  install (Vue) {
    // 布局组件
    Vue.component('TableLayout', TableLayout)
    // 常用组件
    Vue.component('DictCheckboxGroup', DictCheckboxGroup)
    Vue.component('DictRadioGroup', DictRadioGroup)
    Vue.component('DictSelect', DictSelect)
    Vue.component('EmptyTip', EmptyTip)
    Vue.component('FormItemTip', FormItemTip)
    Vue.component('GlobalWindow', GlobalWindow)
    Vue.component('Icon', Icon)
    Vue.component('ImportButton', ImportButton)
    Vue.component('AppLoading', AppLoading)
    Vue.component('Pagination', Pagination)
    Vue.component('PopoverCellValue', PopoverCellValue)
    Vue.component('TagCellValue', TagCellValue)
    Vue.component('SearchForm', SearchForm)
    Vue.component('SearchTable', SearchTable)
  }
}
