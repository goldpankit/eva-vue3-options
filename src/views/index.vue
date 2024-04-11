<template>
  <div class="home">
    <div class="wrap">
      <h2>欢迎使用伊娃权限系统基础工程</h2>
      <p>伊娃由清华海峡研究院高端装备技术研究中心与清华海峡研究院联合研发，开源版本全职团队长期维护，完全免费，请放心使用！</p>
      <p>基础工程本身不携带代码生成服务，您可以购买GoldPanKit账号开启极速开发模式，可大大缩短研发成本和周期！</p>
      <p style="margin-top: 12px;">
        <a href="https://gitee.com/goldpankit/eva-vue2" target="_blank">前端开源地址</a>
        <a href="https://gitee.com/goldpankit/eva-springboot2" target="_blank">后端开源地址</a>
      </p>
      <div class="doc-wrap">
        <el-button
          type="primary"
          round
          @click="toDoc"
        >查看使用文档</el-button>
      </div>
      <ul class="images-wrap">
        <li>
          <img src="/wechat.png" alt="企业微信">
          <span>加入微信技术交流群</span>
        </li>
        <li>
          <img src="/douyin.png" alt="关注作者">
          <span>关注作者领取GoldPanKit账号</span>
        </li>
      </ul>
      <p class="join-us">加入微信技术交流群并关注作者，可领取 15天 GoldPanKit账号！</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  methods: {
    toDoc () {
      window.open('http://v4.eva.adjustrd.com')
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  color: #777;
  font-size: 16px;
  .wrap {
    margin-top: 80px;
  }
  h2 {
    font-size: 32px;
    color: #555;
    margin-bottom: 20px;
  }
  p {
    line-height: 24px;
    margin: 0;
  }
  .start-up {
    margin-top: 8px;
  }
  // 文档
  .doc-wrap {
    margin: 30px 0 40px 0;
    display: flex;
    justify-content: center;
  }
  // 二维码
  ul.images-wrap {
    width: 520px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      img {
        width: 240px;
        height: 240px;
        border: 1px solid #eee;
        border-radius: 20px;
      }
      span {
        margin-top: 12px;
        font-size: 14px;
        color: #333;
      }
    }
  }
  // 加入我们提示
  .join-us {
    font-weight: bold;
    color: var(--color-danger);
    margin-top: 50px;
  }
  em,a {
    font-style: normal;
    font-weight: bold;
    margin: 0 3px;
    color: var(--color-primary);
  }
}
</style>
