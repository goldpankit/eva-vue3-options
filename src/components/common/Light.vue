<template>
  <div class="light" :class="{[`light__${type}`]: true, [`light-size__${size}`]: true}">
    <em><i></i></em>
  </div>
</template>

<script>
export default {
  name: 'Light',
  props: {
    // 类型，不同类型对应不同颜色，取值：default, warn, danger
    type: {
      type: String,
      default: 'default'
    },
    // 尺寸，取值：large, default, small
    size: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style scoped lang="scss">
$cycle-size01: 16px;
$cycle-size02: 6px;
$default-color: #00CC99;
$warn-color: #ffcc33;
$danger-color: #FF3300;
@mixin light-status ($cycle-bg) {
  em {
    background: $cycle-bg;
    i {
      background: lighten($cycle-bg, 30);
    }
  }
}
.light {
  display: inline-block;
  border-radius: 50%;
  em {
    width: $cycle-size01;
    height: $cycle-size01;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      display: block;
      width: $cycle-size02;
      height: $cycle-size02;
      border-radius: 50%;
    }
  }
  // 小号
  &-size__small {
    em {
      width: 12px;
      height: 12px;
      i {
        width: 4px;
        height: 4px;
      }
    }
  }
  // 大号
  &-size__large {
    em {
      width: 20px;
      height: 20px;
      i {
        width: 8px;
        height: 8px;
      }
    }
  }
  // 默认
  &__default {
    @include light-status($default-color);
    animation: shine-normal infinite 1s;
  }
  // 警告
  &__warning {
    @include light-status($warn-color);
    animation: shine-warn infinite .8s;
  }
  // 危险
  &__danger {
    @include light-status($danger-color);
    animation: shine-danger infinite .5s;
  }
}
@keyframes shine-normal {
  0% {
    box-shadow: 0 0 5px darken($default-color, 10);
  }
  25% {
    box-shadow: 0 0 10px darken($default-color, 10);
  }
  50% {
    box-shadow: 0 0 15px darken($default-color, 10);
  }
  100% {
    box-shadow: 0 0 20px darken($default-color, 10);
  }
}
@keyframes shine-warn {
  0% {
    box-shadow: 0 0 5px darken($warn-color, 10);
  }
  25% {
    box-shadow: 0 0 10px darken($warn-color, 10);
  }
  50% {
    box-shadow: 0 0 15px darken($warn-color, 10);
  }
  100% {
    box-shadow: 0 0 20px darken($warn-color, 10);
  }
}
@keyframes shine-danger {
  0% {
    box-shadow: 0 0 5px darken($danger-color, 10);
  }
  25% {
    box-shadow: 0 0 10px darken($danger-color, 10);
  }
  50% {
    box-shadow: 0 0 15px darken($danger-color, 10);
  }
  100% {
    box-shadow: 0 0 20px darken($danger-color, 10);
  }
}
</style>
