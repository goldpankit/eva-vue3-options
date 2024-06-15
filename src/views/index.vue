<template>
  <div class="home">
    <div class="wrap">
      <h2>欢迎使用伊娃权限系统基础工程</h2>
      <p><em>全职团队长期维护，完全开源免费</em>，请放心使用！不图别的，就爱卷～</p>
      <p>基础工程本身不携带代码生成服务，可以使用我们研发的<em>GoldPanKit</em>（也是免费的）来安装自定义功能和生成增删改查接口及页面，可大大缩短研发成本和周期！</p>
      <div class="use-steps">
        <code>
          <em>npm</em> <em>install</em> goldpankit <em>-g</em>
        </code>
        <code>kit</code>
      </div>
    </div>
    <div class="wrap">
      <h2>你挠头，我掉发</h2>
      <p>进入氛围很哇塞的技术交流群或关注作者抖音，技术永远学不完，但请相信群众的力量！</p>
      <ul class="images-wrap">
        <li>
          <div class="img-wrap">
            <img src="/wechat.png" alt="微信">
          </div>
          <span>添加作者微信，加入交流群</span>
        </li>
        <li>
          <div class="img-wrap">
            <img src="/douyin.png" alt="关注作者">
          </div>
          <span>关注抖音不迷路</span>
        </li>
      </ul>
    </div>
    <div class="wrap history-wrap">
      <h2>GoldPanKit发展历史</h2>
      <p>Eva作为GoldPanKit中的服务，专注后台权限系统解决方案，伴随着KIT共同发展！</p>
      <el-timeline>
        <el-timeline-item timestamp="2018/12" placement="top">
          <el-card>
            <h4>想法诞生</h4>
            <p>在此之前，我在研发一款基于浏览器的操作系统，想用它来实现未来跨硬件且高隐私的数据操作和读取。系统研发完了，但应用过多，没法快速实现，所以想实现一个极速开发平台。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019/3/16" placement="top">
          <el-card>
            <h4>KIT前身发布</h4>
            <p>2019年3月16日正式发布<a href="http://coderd.adjustrd.com" target="_blank">懒猴子CG</a>，而后更名为CodeRd。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/1/18" placement="top">
          <el-card>
            <h4>辞职</h4>
            <p>2021年1月28日辞了工作，回到湖南老家创办公司，把精力全身心投入到产品中。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/3/8" placement="top">
          <el-card>
            <h4>成立公司</h4>
            <p>2021年3月8日成立了桂阳阿茄思特网络技术有限公司，阿茄思特为Adjust的谐音，寓意公司为“调整”而生，简称“AD科技”。注册了公司域名adjustrd.com，后面加了“路”的缩写“rd”，寓意我们愿意不断的去调整目前世界所有不够完善的一切。本想全身心投入，但生活所迫不得不做一些外包项目和带一些学生来养活自己。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023/5/9" placement="top">
          <el-card>
            <h4>获用户投资</h4>
            <p>资金陷入困境，我个人的温饱成了问题。我尝试在交流群中售卖CodeRd股份，获得了崔易、朱晨辉、赵鹏、林郴、常洋、赵浩、曹宝红、侯泽为、李寻飞9人累计4万元的投资款，非常荣幸也非常感谢能得到他们的帮助。将来无论是工作还是继续创业，只要我能赚到钱，我会一一表达感谢和加倍偿还。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023/5/20" placement="top">
          <el-card>
            <h4>获天使轮投资</h4>
            <p>经过2年的摸爬滚打，通过了「清华海峡院」的项目评估，2023年5月20日获得了「清华海峡院北京办公室副主任彭一波」先生10万元资金投入和100万元的资源投入。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023/8/17" placement="top">
          <el-card>
            <h4>正式发布</h4>
            <p>经过3个月的研发，CodeRd进行了全面的重构，采用了新的架构和设计，解决了CodeRd的瓶颈问题，2023年8月17日首次发布KIT v1.1.0。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024/1" placement="top">
          <el-card>
            <h4>用户里程碑</h4>
            <p>虽然KIT刚上线不久，但CodeRd依然在持续运营，2024年1月，CodeRd累计注册用户数超过1万。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024/2/1" placement="top">
          <el-card>
            <h4>扩大团队</h4>
            <p>拿着手头上的积蓄和投资款开始招募团队，组建了一个5人团队，准备做大做强！筹划KIT的商业模式，从全面开放通过售卖服务和插件的方式，到尝试只做付费用户的方式。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024/5/31" placement="top">
          <el-card>
            <h4>缩减团队</h4>
            <p>在尝试两次商业模式的变化后，手头上资金不多了，准备干老本行——接外包！公司团队缩减至了2个人，加上外部优秀的合作人员，差不多团队还有10人。</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024/6/14" placement="top">
          <el-card>
            <h4>全面免费</h4>
            <p>KIT进入了全面免费模式，不再收费。目标只有一个，让KIT真正的好用和被接受！</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="1993/8/13" placement="top">
          <el-card>
            <h4>未来</h4>
            <p>未来就回到初衷，不管投资人怎么想。我只踏踏实实基于KIT提供的服务做好外包项目，没有外包项目时就升级KIT，开发更多的服务和插件。</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="wrap">
      <h2>记得点个Star</h2>
      <p>项目的star少的可怜，可能是因为经常更换仓库地址，不过以后不会再换了！</p>
      <p style="margin-top: 12px;">
        <a href="https://gitee.com/goldpankit/eva-vue2" target="_blank">前端Vue2版开源地址</a>
        <a href="https://gitee.com/goldpankit/eva-vue3-options" target="_blank">前端Vue3版开源地址</a>
        <a href="https://gitee.com/goldpankit/eva-springboot2" target="_blank">Java后端开源地址</a>
      </p>
      <div class="doc-wrap">
        <el-button
          size="large"
          type="primary"
          @click="toDoc"
        >查看技术文档</el-button>
      </div>
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
    width: 800px;
    margin: 80px auto 0 auto;
    &.history-wrap {
      text-align: left;
    }
    & > h2 {
      font-size: 32px;
      color: #555;
      margin-bottom: 20px;
      text-align: center;
    }
    & > p {
      line-height: 30px;
      margin: 0;
      text-align: center;
    }
  }
  // 使用步骤
  .use-steps {
    width: 300px;
    margin: 50px auto 0 auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    background-color: #2e3444;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    line-height: 1.8;
    em {
      color: #FC777D;
      margin: 0;
    }
  }
  // 文档
  .doc-wrap {
    margin: 30px 0 40px 0;
    display: flex;
    justify-content: center;
  }
  // 二维码
  ul.images-wrap {
    width: 550px;
    margin: 50px auto 0 auto;
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      &:first-of-type {
        .img-wrap {
          border-color: #000;
          img {
            width: 195px;
            height: 195px;
          }
        }
      }
      .img-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 240px;
        height: 240px;
        border: 5px solid #222e5e;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        margin-top: 12px;
        font-size: 14px;
        color: #333;
      }
    }
  }
  em,a {
    font-style: normal;
    font-weight: bold;
    margin: 0 10px;
    color: #FC777D;
  }
  .el-button {
    background-color: #2e3444;
    border: 0;
    &.el-button--large {
      width: 200px;
      height: 60px;
      font-size: 16px;
    }
  }
}
</style>
