<!--
 * @Author: Json.Xu
 * @Date: 2020-04-29 09:01:58
 * @LastEditTime: 2020-04-29 09:13:02
 * @LastEditors: Json.Xu
 * @Description: 
 * @FilePath: \vue_vuetify_parseserver\src\admin\components\Css9.vue
 -->
<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="thermostat" onclick="void(0);">
      <div class="ring">
        <div class="bottom_overlay"></div>
      </div>
      <div class="control">
        <div class="indicator"></div>
        <div class="temp_outside">56°</div>
        <div class="temp_room">
          19
          <span>°</span>
        </div>
        <div class="temp_room two">
          20
          <span>°</span>
        </div>
        <div class="room">Bedroom</div>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.thermostat {
  position: relative;
  width: 200px;
  height: 200px;
  background: #f2f2f2;
  border-radius: 50%;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    .control {
      .indicator {
        transform: rotate(-20deg);
      }

      .temp_room {
        opacity: 0;
        transform: translateX(-50px) scale(0.5);

        &.two {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }

  .control {
    position: absolute;
    z-index: 5;
    width: 130px;
    height: 130px;
    top: 35px;
    left: 35px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.2);

    .indicator {
      position: absolute;
      width: 1px;
      height: 12px;
      left: 50%;
      top: 0;
      background: #6c6c6c;
      transform-origin: 0 65px;
      transform: rotate(-50deg);
      transition: all 0.5s ease-in-out;
    }

    .temp_outside {
      position: absolute;
      top: 18px;
      left: 6px;
      right: 0;
      text-align: center;
      font-weight: 300;
      font-size: 12px;
      color:blue;
    }

    .temp_room {
      position: absolute;
      top: 34px;
      left: 0;
      right: 0;
      text-align: center;
      font-weight: 400;
      font-size: 60px;
      line-height: 60px;
      color: #873183;
      letter-spacing: -8px;
      padding-right: 12px;
      opacity: 1;
      transform: translateX(0);
      transition: all 0.5s ease-in-out;

      span {
        position: absolute;
        top: 0;
        right: 37px;
        font-size: 20px;
        line-height: 34px;
        padding: 0 0 0 7px;
      }

      &.two {
        letter-spacing: -6px;
        padding-right: 2px;
        opacity: 0;
        color: #98317a;
        transform: translateX(50px) scale(0.5);

        span {
          right: 30px;
        }
      }
    }

    .room {
      position: absolute;
      bottom: 18px;
      left: 0;
      right: 0;
      text-align: center;
      font-weight: 300;
      font-size: 12px;
      color:blue;
    }
  }

  .ring {
    position: absolute;
    width: 180px;
    height: 180px;
    top: 10px;
    left: 10px;
    background: url("../assets/img//thermostat-gradient.jpg") center center
      no-repeat;
    border-radius: 50%;
    box-shadow: inset 2px 4px 4px 0px rgba(0, 0, 0, 0.3);

    .bottom_overlay {
      position: absolute;
      width: 95px;
      height: 95px;
      top: 50%;
      left: 50%;
      background: #f2f2f2;
      transform-origin: 0 0;
      transform: rotate(45deg);
      border-radius: 0 0 95px 0;
    }
  }
}
</style>