<template>
  <div class="components">
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
        <div class="demo loading-demo">
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
              <h4>改变图标大小</h4>
              <EmptyTip description="没有数据"/>
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
        <div class="demo loading-demo">
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

export default {
  name: 'demonstration',
  components: {
    Value
  },
  data () {
    return {
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
  width: 1000px;
  margin: 20px auto;
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
      .description {}
      .demo {
        margin: 20px 0;
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
            margin-right: 5px;
            margin-bottom: 5px;
            h4 {
              flex-shrink: 0;
              flex-grow: 0;
              font-weight: normal;
              margin-bottom: 20px;
              color: #999;
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
    p {
      margin: 0;
    }
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
}
</style>
