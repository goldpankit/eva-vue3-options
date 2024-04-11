<template>
  <div class="light" :class="{normal: !warn && !danger, warn: !danger && warn, danger, mini: mini}">
    <em><i></i></em>
  </div>
</template>

<script>
export default {
  name: 'Light',
  props: {
    // 警告
    warn: {
      type: Boolean,
      default: false
    },
    // 危险
    danger: {
      type: Boolean,
      default: false
    },
    // 最小尺寸
    mini: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
$cycle-size01: 16px;
$cycle-size02: 6px;
$normal-color: #00CC99;
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
  &.mini {
    em {
      width: 12px;
      height: 12px;
    }
  }
  // 正常
  &.normal {
    @include light-status($normal-color);
    animation: shine-normal infinite 1s;
  }
  // 警告
  &.warn {
    @include light-status($warn-color);
    animation: shine-warn infinite .8s;
  }
  // 危险
  &.danger {
    @include light-status($danger-color);
    animation: shine-danger infinite .5s;
  }
}
@keyframes shine-normal {
  0% {
    box-shadow: 0 0 5px darken($normal-color, 10);
  }
  25% {
    box-shadow: 0 0 10px darken($normal-color, 10);
  }
  50% {
    box-shadow: 0 0 15px darken($normal-color, 10);
  }
  100% {
    box-shadow: 0 0 20px darken($normal-color, 10);
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
