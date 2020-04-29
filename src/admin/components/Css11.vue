<!--
 * @Author: Json.Xu
 * @Date: 2020-04-29 13:26:34
 * @LastEditTime: 2020-04-29 13:28:53
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css11.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 400px;position:relative">
    <div class="boxes">
      <div class="box dark" onclick="void(0);">
        <span class="text">First</span>
      </div>
      <div class="box orange" onclick="void(0);">
        <span class="text">Second</span>
      </div>
      <div class="box dark" onclick="void(0);">
        <span class="text">Third</span>
      </div>
      <div class="box orange" onclick="void(0);">
        <span class="text">Fourth</span>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.boxes {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    height: 100%;

    .box {
        position: relative;
        flex: 1 1 auto;
        width: 20%;
        background: grey;
        transition: all .5s ease-in-out;
        cursor: pointer;
        overflow: hidden;

        .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.5);
            font-weight: 700;
            font-size: 30px;
            text-transform: uppercase;
            color: transparent;
            transition: all .5s ease-in-out;
        }

        &.dark {
            background: #34495e;
        }
        &.orange {
            background: #e67e22;
        }

        &:hover {
            width: 100%;

            .text {
                color: #fff;
                transform: translate(-50%, -50%) scale(1);
            }

        }

    }

}
</style>