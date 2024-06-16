<template>
  <div class="components">
    <!-- SearchForm/搜索表单 -->
    <el-card>
      <template #header>
        <h3>SearchForm/搜索表单</h3>
      </template>
      <div class="component-wrap">
        <div class="demo title-left">
          <ul>
            <li>
              <h4>默认</h4>
              <SearchForm :model="searchFormData">
                <el-form-item label="姓名">
                  <el-input v-model="searchFormData.name"/>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="searchFormData.sex" placeholder="请选择">
                    <el-option label="男" value="1"/>
                    <el-option label="女" value="2"/>
                  </el-select>
                </el-form-item>
                <template #buttons>
                  <el-button type="primary">搜索</el-button>
                  <el-button>重置</el-button>
                </template>
              </SearchForm>
            </li>
            <li>
              <h4>带展开/收起</h4>
              <SearchForm :model="searchFormData" :collapse="true">
                <el-form-item label="姓名">
                  <el-input v-model="searchFormData.name"/>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="searchFormData.username"/>
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="searchFormData.nickname"/>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="searchFormData.email"/>
                </el-form-item>
                <el-form-item label="手机尾号">
                  <el-input v-model="searchFormData.mobile"/>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="searchFormData.sex" placeholder="请选择">
                    <el-option label="男" value="1"/>
                    <el-option label="女" value="2"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="searchFormData.status" placeholder="请选择">
                    <el-option label="正常" value="1"/>
                    <el-option label="禁用" value="2"/>
                  </el-select>
                </el-form-item>
                <template #buttons>
                  <el-button type="primary">搜索</el-button>
                  <el-button>重置</el-button>
                </template>
              </SearchForm>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- SearchTable/管理表格 -->
    <el-card>
      <template #header>
        <h3>SearchTable/管理表格</h3>
      </template>
      <div class="component-wrap">
        <div class="demo search-table-demo title-left">
          <ul>
            <li style="width: 100%;">
              <h4>默认</h4>
              <TableLayout style="width: 100%;" :fullscreen="searchTableData.table1.fullscreen">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :fullscreen="searchTableData.table1.fullscreen"
                    :data="searchTableData.table1.list"
                    @update:fullscreen="searchTableData.table1.fullscreen = $event"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="年龄" prop="age"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>增加操作按钮</h4>
              <TableLayout style="width: 100%;" :fullscreen="searchTableData.table2.fullscreen">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :fullscreen="searchTableData.table2.fullscreen"
                    :data="searchTableData.table2.list"
                    @update:fullscreen="searchTableData.table2.fullscreen = $event"
                  >
                    <template #toolbar>
                      <el-button type="primary">新建</el-button>
                      <el-button type="danger">批量删除</el-button>
                    </template>
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="年龄" prop="age"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>去掉字体控制、刷新和全屏</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <template #toolbar>
                      <el-button type="primary">新建</el-button>
                      <el-button type="danger">批量删除</el-button>
                    </template>
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>增加数据提示</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    digest="新建数据时请务必确保数据的真实性！"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>增加警告提示</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    digest="当前页存在2条记录信息待不全！"
                    digest-type="warning"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>增加错误提示</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    digest="存在非法数据，为了系统稳定运营，请及时处理！"
                    digest-type="error"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="地址" prop="address"/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>使用tooltip展示超长文本展示</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="用户名" prop="username"/>
                    <el-table-column label="昵称" prop="nickname"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="手机号码" prop="mobile"/>
                    <el-table-column label="邮箱" prop="email"/>
                    <el-table-column label="状态" prop="status"/>
                    <el-table-column label="地址" prop="address" width="150px" show-overflow-tooltip/>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
            <li style="width: 100%;">
              <h4>使用PopoverCellValue展示超长文本展示</h4>
              <TableLayout style="width: 100%;">
                <template #table-wrap>
                  <SearchTable
                    style="width: 100%;"
                    :data="searchTableData.table3.list"
                    :with-fullscreen="false"
                    :with-refresh="false"
                    :with-density="false"
                  >
                    <el-table-column label="姓名" prop="name"/>
                    <el-table-column label="用户名" prop="username"/>
                    <el-table-column label="昵称" prop="nickname"/>
                    <el-table-column label="性别" prop="sex"/>
                    <el-table-column label="手机号码" prop="mobile"/>
                    <el-table-column label="邮箱" prop="email"/>
                    <el-table-column label="状态" prop="status"/>
                    <el-table-column label="地址" prop="address" width="150px">
                      <template #default="{ row }">
                        <PopoverCellValue :content="row.address"/>
                      </template>
                    </el-table-column>
                  </SearchTable>
                </template>
              </TableLayout>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- FormItemTip/表单项提示 -->
    <el-card>
      <template #header>
        <h3>FormItemTip/表单项提示</h3>
      </template>
      <div class="component-wrap">
        <div class="demo">
          <ul>
            <li>
              <h4>基础</h4>
              <el-form>
                <el-form-item label="姓名">
                  <el-input v-model="searchFormData.name"/>
                  <FormItemTip>填写时尽量填写客户真实的姓名！</FormItemTip>
                </el-form-item>
                <el-form-item label="性别">
                  <el-select v-model="searchFormData.sex" placeholder="请选择">
                    <el-option label="男" value="1"/>
                    <el-option label="女" value="2"/>
                    <el-option label="未知" value="3"/>
                  </el-select>
                  <FormItemTip>如已知客户性别，但客户希望保密，请选择“未知”！</FormItemTip>
                </el-form-item>
              </el-form>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- Value/值异步加载 -->
    <el-card>
      <template #header>
        <h3>Value/值异步加载</h3>
      </template>
      <div class="component-wrap">
        <div class="description">
          <p>值异步加载可用于实现统计数据在数据还未加载完成时展示loading效果。</p>
        </div>
        <div class="demo value-demo">
          <ul class="value-list">
            <li>
              <h4>默认</h4>
              <Value :data="valueData" prop="value1"/>
            </li>
            <li>
              <h4>带后缀</h4>
              <Value :data="valueData" prop="value2" suffix="人"/>
            </li>
            <li>
              <h4>带前缀</h4>
              <Value :data="valueData" prop="value4" prefix="增加" suffix="%"/>
            </li>
            <li>
              <h4>改变图标尺寸</h4>
              <Value :data="valueData" prop="value3" icon-size="30px"/>
            </li>
            <li>
              <h4>自定义</h4>
              <Value :data="valueData" prop="value5">
                <template #default="{ value }">
                  <span style="font-size: 12px; color: #333;">新增</span>
                  <em style="color: red;">{{ value }}</em>
                  <span style="font-size: 12px; color: #333;">人，</span>
                  <span style="font-size: 12px; color: #333;">提升</span>
                  <em style="color: red;">{{ value }}</em>
                  <span style="font-size: 12px; color: #333;">%</span>
                </template>
              </Value>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- DataLoading/数据加载中 -->
    <el-card>
      <template #header>
        <h3>DataLoading/数据加载中</h3>
      </template>
      <div class="component-wrap">
        <div class="description">
          <p>DataLoading用于处理数据加载中效果，适用于对异步加载的数据做一个加载中提示。</p>
        </div>
        <div class="demo loading-demo">
          <ul>
            <li>
              <h4>默认</h4>
              <DataLoading/>
            </li>
            <li>
              <h4>添加文字</h4>
              <DataLoading>数据加载中</DataLoading>
            </li>
            <li>
              <h4>改变图标大小</h4>
              <DataLoading icon-size="30px">数据加载中</DataLoading>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- EmptyTip/空提示 -->
    <el-card>
      <template #header>
        <h3>EmptyTip/空提示</h3>
      </template>
      <div class="component-wrap">
        <div class="demo">
          <ul>
            <li>
              <h4>默认</h4>
              <EmptyTip/>
            </li>
            <li>
              <h4>改变图片大小</h4>
              <EmptyTip image-size="100px"/>
            </li>
            <li>
              <h4>改变文字</h4>
              <EmptyTip description="这里空空如也～"/>
            </li>
            <li>
              <h4>自定义</h4>
              <EmptyTip description="">
                <template #default>
                  <p style="color: #999;font-size: 14px;">暂无数据，点击<a href="javascript:;" style="margin-left: 5px;">添加</a></p>
                </template>
              </EmptyTip>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- GlobalWindow/全局窗口 -->
    <el-card>
      <template #header>
        <h3>GlobalWindow/全局窗口</h3>
      </template>
      <div class="component-wrap">
        <div class="demo">
          <ul>
            <li v-for="(demo, key) in globalWindowData" :key="key">
              <h4>{{ demo.title }}</h4>
              <el-button type="primary" @click="globalWindowData[key].visible = true">点击打开</el-button>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- ImportButton/导入按钮 -->
    <el-card>
      <template #header>
        <h3>ImportButton/导入按钮</h3>
      </template>
      <div class="component-wrap">
        <div class="demo loading-demo">
          <ul>
            <li>
              <h4>默认</h4>
              <ImportButton action="#" template-name="下载后的名称.txt" template-path="本地测试文件.txt"/>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- Light/状态灯 -->
    <el-card>
      <template #header>
        <h3>Light/状态灯</h3>
      </template>
      <div class="component-wrap">
        <div class="demo light-demo">
          <ul>
            <li>
              <h4>默认</h4>
              <Light/>
            </li>
            <li>
              <h4>警告灯</h4>
              <Light type="warning"/>
            </li>
            <li>
              <h4>危险灯</h4>
              <Light type="danger"/>
            </li>
            <li>
              <h4>改变尺寸</h4>
              <div>
                <Light size="small" style="margin-right: 30px;"/>
                <Light size="default" style="margin-right: 30px;"/>
                <Light size="large"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- DictSelect & DictRadioGroup & DictCheckboxGroup.vue/字典选择器 -->
    <el-card>
      <template #header>
        <h3>DictSelect & DictRadioGroup & DictCheckboxGroup.vue/字典选择器</h3>
      </template>
      <div class="component-wrap">
        <div class="demo dict-demo">
          <ul>
            <li>
              <h4>下拉选择</h4>
              <DictSelect code="GENDERS" v-model="dictData.value1" style="width: 120px;"/>
              <span class="selected-value">已选：{{ dictData.value1 }}</span>
            </li>
            <li>
              <h4>下拉选择（多选）</h4>
              <DictSelect code="GENDERS" v-model="dictData.value4" :multiple="true" style="width: 150px;"/>
              <span class="selected-value">已选：{{ dictData.value4.join(',') }}</span>
            </li>
            <li>
              <h4>Radio选择</h4>
              <DictRadioGroup code="GENDERS" v-model="dictData.value2"/>
              <span class="selected-value">已选：{{ dictData.value2 }}</span>
            </li>
            <li>
              <h4>Checkbox多选</h4>
              <DictCheckboxGroup code="GENDERS" v-model="dictData.value3"/>
              <span class="selected-value">已选：{{ dictData.value3.join(',') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- Light/状态灯 -->
    <el-card>
      <template #header>
        <h3>ColorsMarking/色块标记</h3>
      </template>
      <div class="component-wrap">
        <div class="description">
          <p>ColorsMarking适用于在表格顶部做色块标记，快速区分出不同颜色的数据行表达的意图。</p>
        </div>
        <div class="demo">
          <ul>
            <li>
              <h4>基础</h4>
              <ColorsMarking :data="[
                { borderColor: '#f56c6c', backgroundColor: '#fde2e2', label: '待收款' },
                { borderColor: '#e6a23c', backgroundColor: '#fdf6ec', label: '待发货' },
                { borderColor: '#ccc', backgroundColor: '#eee', label: '已完成' }
              ]"/>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <GlobalWindow ref="globalWindow1" v-model:visible="globalWindowData.demo1.visible" :title="globalWindowData.demo1.title"/>
    <GlobalWindow ref="globalWindow2" v-model:visible="globalWindowData.demo2.visible" :title="globalWindowData.demo2.title" :with-footer="false"/>
    <GlobalWindow ref="globalWindow3" v-model:visible="globalWindowData.demo3.visible" :title="globalWindowData.demo3.title" width="1000px"/>
    <GlobalWindow ref="globalWindow4" v-model:visible="globalWindowData.demo4.visible" :title="globalWindowData.demo4.title" :close-on-press-escape="true" :wrapper-closable="true"/>
    <GlobalWindow ref="globalWindow5" v-model:visible="globalWindowData.demo5.visible" :title="globalWindowData.demo5.title">
      <template #footer>
        <div style="position: relative;">
          <el-button type="primary">确认操作</el-button>
          <el-button>重置</el-button>
          <el-button>巴拉巴拉</el-button>
          <el-button>巴拉巴拉</el-button>
        </div>
      </template>
    </GlobalWindow>
    <GlobalWindow ref="globalWindow6" v-model:visible="globalWindowData.demo6.visible" :title="globalWindowData.demo6.title" width="1000px" :close-on-press-escape="true" :wrapper-closable="true">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="valueData.value5"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="valueData.value5"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="valueData.value5"/>
        </el-form-item>
      </el-form>
      <el-table>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="address" label="地址"/>
      </el-table>
    </GlobalWindow>
  </div>
</template>

<script>
import Value from '@/components/common/Value'
import Light from "@/components/common/Light.vue";
import ColorsMarking from "@/components/common/ColorsMarking.vue";

export default {
  name: 'demonstration',
  components: {
    ColorsMarking,
    Light,
    Value
  },
  data () {
    return {
      // 搜索表单
      searchFormData: {
        name: null,
        username: null,
        nickname: null,
        email: null,
        mobile: null,
        sex: null,
        status: null,
        address: null
      },
      // 管理表格
      searchTableData: {
        table1: {
          list: [],
          fullscreen: false
        },
        table2: {
          list: [],
          fullscreen: false
        },
        table3: {
          list: [
            {
              id: 1,
              name: '张三',
              username: 'zhangsan',
              nickname: '张三',
              email: 'zhangsan@163.com',
              mobile: '13888888888',
              sex: '男',
              status: '正常',
              address: '湖南省郴州市桂阳县龙潭街道湖南省郴州市桂阳县欧阳海大道'
            },
            {
              id: 2,
              name: '李四',
              username: 'lisi',
              nickname: '李四',
              email: 'lisi@163.com',
              mobile: '13888888888',
              sex: '男',
              status: '正常',
              address: '湖南省郴州市桂阳县欧阳海大道湖南省郴州市桂阳县欧阳海大道'
            },
            {
              id: 3,
              name: '王五',
              username: 'wangwu',
              nickname: '王五',
              email: 'wangwu@163.com',
              mobile: '13888888888',
              sex: '男',
              status: '正常',
              address: '湖南省郴州市桂阳县文化路湖南省郴州市桂阳县欧阳海大道'
            }
          ],
          fullscreen: false
        }
      },
      // 值加载
      valueData: {
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: null,
      },
      // 全局窗口数据
      globalWindowData: {
        demo1: {
          visible: false,
          title: '默认'
        },
        demo2: {
          visible: false,
          title: '没有操作的窗口'
        },
        demo3: {
          visible: false,
          title: '改变窗口尺寸'
        },
        demo4: {
          visible: false,
          title: '按ESC或点击遮罩层关闭'
        },
        demo5: {
          visible: false,
          title: '自定义操作按钮'
        },
        demo6: {
          visible: false,
          title: '自定义窗口内容'
        }
      },
      // 字段选择
      dictData: {
        value1: null,
        value2: null,
        value3: [],
        value4: []
      }
    }
  },
  methods: {
    handleValueData () {
      setTimeout(() => {
        for (const key in this.valueData) {
          this.valueData[key] = Math.floor(Math.random() * 100)
        }
      }, 3000)
    }
  },
  created () {
    this.handleValueData()
  }
}
</script>

<style scoped lang="scss">
.components {
  min-width: 1000px;
  padding: 10px 15px;
  .el-card {
    width: 100%;
    margin-bottom: 20px;
    box-shadow: none;
    font-size: 15px;
    color: #333;
    :deep(.el-card__body) {
      padding: 0;
    }
    .component-wrap {
      padding: 10px 20px;
      // 组件描述
      .description {
        p {
          margin: 0;
        }
      }
      // 组件demo
      .demo {
        margin: 20px 0;
        &.title-left {
          ul li h4 {
            width: 100%;
            text-align: left;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid #ebeef5;
            padding: 20px 50px;
            box-sizing: border-box;
            margin-right: 5px;
            margin-bottom: 5px;
            h4 {
              flex-shrink: 0;
              flex-grow: 0;
              margin-bottom: 20px;
              height: 40px;
              overflow: hidden;
            }
            & > * {
              flex-grow: 1;
            }
          }
        }
      }
    }
  }
  .form-item-widen {
    width: 600px;
  }
  // SearchTable
  .search-table-demo {
    .table-layout {
      padding: 0;
      :deep(.table-content) {
        margin: 0;
        padding: 0;
        .table-wrap {
          padding: 0;
        }
      }
    }
  }
  // Value
  .value-demo {
    .value-list {
      display: flex;
      li {
        .value {
          height: 50px;
          font-size: 30px;
          color: var(--color-primary);
          font-weight: bold;
        }
        label {
          color: #999;
        }
      }
    }
    .el-button {
      margin-top: 20px;
    }
  }
  // Light
  .light-demo {
    .light {
      flex-grow: 0 !important;
    }
  }
  // Dict
  .dict-demo {
    span {
      color: #999;
      font-size: 13px;
      margin-top: 5px;
    }
  }
}
</style>
