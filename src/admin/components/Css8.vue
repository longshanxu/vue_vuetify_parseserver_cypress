<!--
 * @Author: Json.Xu
 * @Date: 2020-04-28 09:15:14
 * @LastEditTime: 2020-04-29 09:02:18
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css8.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="button" onclick="void(0);">
      <span>Hover me</span>
      <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
        <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
      </svg>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    line-height: 58px;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 300;
  }

  .border {
    fill: none;
    stroke-width: 1;
  }

  .bg-line {
    fill: #5ca4ea;
    stroke: #91c9ff;
    transition: all 0.8s ease-in-out;
  }

  .hl-line {
    stroke: #fff;
    stroke-dasharray: 40 480;
    stroke-dashoffset: 40;
    transition: all 0.8s ease-in-out;
  }

  &:hover {
    .bg-line {
      fill: #4f95da;
    }

    .hl-line {
      stroke-dashoffset: -480;
    }
  }
}
</style>