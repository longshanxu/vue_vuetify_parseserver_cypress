<!--
 * @Author: Json.Xu
 * @Date: 2020-04-24 11:12:03
 * @LastEditTime: 2020-04-24 11:15:03
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css1.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="menu-icon" @click="isactive = !isactive" :class="isactive? 'active' : ''">
      <div class="line-1" :class="isactive? '' : 'no-animation'"></div>
      <div class="line-2" :class="isactive? '' : 'no-animation'"></div>
      <div class="line-3" :class="isactive? '' : 'no-animation'"></div>
    </div>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isactive: false
    };
  }
};
</script>

<style lang="scss" scoped>
$menu-icon-line-height: 8px;
$menu-icon-line-space: 14px;
$menu-icon-line-offsetY: $menu-icon-line-height + $menu-icon-line-space;
$menu-icon-height: (3 * $menu-icon-line-height) + (2 * $menu-icon-line-space);
$cubic-bezier-in: cubic-bezier(0.3, 1, 0.7, 1);
$cubic-bezier-out: cubic-bezier(1, 0.7, 1, 0.3);

.menu-icon {
  margin: auto;
  width: 80px;
  height: $menu-icon-height;
  cursor: pointer;
  z-index: 50;

  .line-1,
  .line-2,
  .line-3 {
    height: $menu-icon-line-height;
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s ease-in-out;
  }
  .line-1 {
    animation: animate-line-1-rev 0.7s ease-in-out;
  }
  .line-2 {
    margin: $menu-icon-line-space 0;
    animation: animate-line-2-rev 0.7s ease-in-out;
  }
  .line-3 {
    animation: animate-line-3-rev 0.7s ease-in-out;
  }

  &:hover {
    .line-1,
    .line-2,
    .line-3 {
      background-color: #fff;
    }
  }

  &.active {
    .line-1,
    .line-2,
    .line-3 {
      background-color: #fff;
    }

    .line-1 {
      animation: animate-line-1 0.7s $cubic-bezier-in forwards;
    }
    .line-2 {
      animation: animate-line-2 0.7s $cubic-bezier-in forwards;
    }
    .line-3 {
      animation: animate-line-3 0.7s $cubic-bezier-in forwards;
    }
  }
}

.no-animation {
  -webkit-animation: none !important;
  animation: none !important;
}

@keyframes animate-line-1 {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, $menu-icon-line-offsetY, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, $menu-icon-line-offsetY, 0) rotate(45deg);
  }
}
@keyframes animate-line-2 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes animate-line-3 {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, -$menu-icon-line-offsetY, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, -$menu-icon-line-offsetY, 0) rotate(135deg);
  }
}
@keyframes animate-line-1-rev {
  0% {
    transform: translate3d(0, $menu-icon-line-offsetY, 0) rotate(45deg);
  }
  50% {
    transform: translate3d(0, $menu-icon-line-offsetY, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}
@keyframes animate-line-2-rev {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes animate-line-3-rev {
  0% {
    transform: translate3d(0, -$menu-icon-line-offsetY, 0) rotate(135deg);
  }
  50% {
    transform: translate3d(0, -$menu-icon-line-offsetY, 0) rotate(0);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}
</style>

