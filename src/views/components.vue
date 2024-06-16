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
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid #ebeef5;
            border-left: 0;
            padding: 20px 50px;
            &:first-child {
              border-left: 1px solid #ebeef5;
            }
            h4 {
              flex-shrink: 0;
              flex-grow: 0;
              font-weight: normal;
              margin-bottom: 20px;
              color: #999;
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
