<template>
  <div class="demonstration">
    <el-card>
      <template #header>
        <h3>提示</h3>
      </template>
      <el-form>
        <el-form-item label="加载中">
          <AppLoading/>
        </el-form-item>
        <el-form-item label="提示">
          <FormItemTip>这是一个提示</FormItemTip>
        </el-form-item>
        <el-form-item label="无数据展示">
          <EmptyTip/>
        </el-form-item>
        <el-form-item label="状态灯">
          <ul>
            <li>
              <span>默认：</span>
              <Light/>
            </li>
            <li>
              <span>警告：</span>
              <Light :warn="true"/>
            </li>
            <li>
              <span>危险：</span>
              <Light :danger="true"/>
            </li>
          </ul>
        </el-form-item>
        <!-- <el-form-item label="无数据"> -->
          <!-- <Value/> -->
        <!-- </el-form-item> -->
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <h3>上传</h3>
      </template>
      <el-form>
        <el-form-item label="文件上传">
          <AttachUploader :value="uploaderData.attachValue" @success="handleUploadSuccess($event, '文件')"/>
        </el-form-item>
        <el-form-item label="头像上传">
          <AvatarUploader :value="uploaderData.avatarValue" @success="handleUploadSuccess($event, '头像')"/>
        </el-form-item>
        <el-form-item label="文档导入">
          <ImportButton templatePath="templatePath" templateName="template" action="action"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <h3>表单类</h3>
      </template>
      <el-form>
        <el-form-item label="字典多选框">
          <DictCheckboxGroup code="GENDERS" v-model="selectorData.dictCheckboxValue"/>
        </el-form-item>
        <el-form-item label="单选框">
          <DictRadioGroup code="GENDERS" v-model="selectorData.dictRadioValue"/>
        </el-form-item>
        <el-form-item label="字典下拉选择器">
          <DictSelect code="GENDERS" v-model="selectorData.dictSelectValue"/>
        </el-form-item>
        <el-form-item label="图标下拉选择器">
          <IconSelect ref="iconSelect" v-model:value="selectorData.iconSelectValue"/>
        </el-form-item>
        <el-form-item label="树选择器">
          <MenuSelect v-model="selectorData.menuSelectValue"/>
        </el-form-item>
        <el-form-item label="密码输入框">
          <PasswordInput v-model="selectorData.c"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <h3>其他</h3>
      </template>
      <el-form>
        <el-form-item label="长文本">
          <div class="cell-value">
            <PopoverCellValue :content="other.content"/>
          </div>
        </el-form-item>
        <el-form-item label="富文本" class="form-item-widen">
          <RichEditor height="400px" v-model:value="other.richText"/>
        </el-form-item>
        <el-form-item label="标签" class="form-item-widen">
          <TagCellValue :data="other.tagCellValue" label-key="name"/>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import AttachUploader from '@/components/common/AttachUploader'
import IconSelect from '@/components/common/IconSelect'
import MenuSelect from '@/components/system/menu/MenuSelect'
import PasswordInput from '@/components/common/PasswordInput'
import RichEditor from '@/components/common/RichEditor'
import AvatarUploader from '@/components/common/AvatarUploader'
import Light from '@/components/common/Light'
// import Value from '@/components/common/Value'

export default {
  name: 'demonstration',
  components: {
    Light,
    AvatarUploader,
    RichEditor,
    PasswordInput,
    MenuSelect,
    IconSelect,
    AttachUploader
  },
  data () {
    return {
      // 上传数据
      uploaderData: {
        attachValue: '',
        avatarValue: ''
      },
      // 选择器数据
      selectorData: {
        dictCheckboxValue: [],
        dictRadioValue: '',
        dictSelectValue: '',
        iconSelectValue: '',
        menuSelectValue: '',
        passwordValue: ''
      },
      // 其他
      other: {
        // 长文本
        content: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
        // 富文本
        richText: '',
        // 多标签
        tagCellValue: [{
          name: '标签1'
        }, {
          name: '标签2'
        }, {
          name: '标签3'
        }]
      }
    }
  },
  methods: {
    // 处理文件上传成功
    handleUploadSuccess ({ data }, type) {
      this.$tip.success(`${type}上传成功`)
      if (type === '头像') {
        this.uploaderData.avatarValue = data.fileKey
        return
      }
      this.uploaderData.attachValue = data.fileKey
    }
  }
}
</script>

<style scoped lang="scss">
.demonstration {
  margin: 20px;
  .el-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .el-form-item {
    width: 300px;
    .cell-value {
      height: 20px;
      line-height: 22px;
    }
  }
  .form-item-widen {
    width: 600px;
  }
}
</style>
