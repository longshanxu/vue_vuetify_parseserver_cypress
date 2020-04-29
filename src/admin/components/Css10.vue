<template>
  <v-row align="center" justify="center" style="height: 400px;position:relative">
    <div class="frame">
      <div class="plan basic" onclick="void(0);">
        <div class="title">Basic</div>
        <div class="price">
          $5
          <span>per month</span>
        </div>
        <div class="lines">
          <div class="line" style="width: 69px;"></div>
          <div class="line" style="width: 59px;"></div>
          <div class="line" style="width: 66px;"></div>
          <div class="line" style="width: 46px;"></div>
        </div>
      </div>

      <div class="plan pro" onclick="void(0);">
        <div class="title">Pro</div>
        <div class="price">
          $10
          <span>per month</span>
        </div>
        <div class="lines">
          <div class="line" style="width: 69px;"></div>
          <div class="line" style="width: 59px;"></div>
          <div class="line" style="width: 66px;"></div>
          <div class="line" style="width: 46px;"></div>
        </div>
      </div>

      <div class="plan premium" onclick="void(0);">
        <div class="title">Premium</div>
        <div class="price">
          $20
          <span>per month</span>
        </div>
        <div class="lines">
          <div class="line" style="width: 69px;"></div>
          <div class="line" style="width: 59px;"></div>
          <div class="line" style="width: 66px;"></div>
          <div class="line" style="width: 46px;"></div>
        </div>
      </div>

      <div class="datas">
        <div class="data users">
          <div class="text">
            <span class="left">5 Users</span>
            <span class="right">100 Users</span>
          </div>
          <div class="line">
            <div class="fill"></div>
          </div>
        </div>

        <div class="data gb">
          <div class="text">
            <span class="left">20 GB</span>
            <span class="right">200 GB</span>
          </div>
          <div class="line">
            <div class="fill"></div>
          </div>
        </div>

        <div class="data projects">
          <div class="text">
            <span class="left">1 Project</span>
            <span class="right">50 Projects</span>
          </div>
          <div class="line">
            <div class="fill"></div>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$blueLight: #7dd0ed;
$blueDark: #27a6d2;
$transition: all 0.3s ease-in-out;
.frame {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 2px;
  box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.05);
    overflow: hidden;
  background: #E9EDEF;
  color: #5E5E5E;
    font-family: 'Open Sans', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.plan {
  position: absolute;
  width: 110px;
  height: 160px;
  top: 30px;
  left: 25px;
  background: #fff;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  transition: $transition;

  &.basic {
    &:hover {
      ~ .datas .users .fill,
      ~ .datas .gb .fill,
      ~ .datas .projects .fill {
        transform: scaleX(0.05) translate3d(0, 0, 0);
      }
    }
  }

  &.pro {
    left: 145px;

    &:hover {
      ~ .datas .users .fill {
        transform: scaleX(0.3) translate3d(0, 0, 0);
      }
      ~ .datas .gb .fill {
        transform: scaleX(0.7) translate3d(0, 0, 0);
      }
      ~ .datas .projects .fill {
        transform: scaleX(0.5) translate3d(0, 0, 0);
      }
    }
  }

  &.premium {
    left: 265px;

    &:hover {
      ~ .datas .users .fill,
      ~ .datas .gb .fill,
      ~ .datas .projects .fill {
        transform: scaleX(1) translate3d(0, 0, 0);
      }
    }
  }

  &:hover {
    transform: scale(1.1) translate3d(0, 0, 0);
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.1);

    .title {
      background: $blueDark;
    }

    .price {
      color: $blueDark;
    }
  }

  .title {
    height: 36px;
    text-align: center;
    background: $blueLight;
    color: #fff;
    font-weight: 600;
    line-height: 36px;
    font-size: 14px;
    transition: $transition;
  }

  .price {
    color: $blueLight;
    text-align: center;
    font-size: 30px;
    line-height: 30px;
    font-weight: 700;
    padding: 16px 0 17px 0;
    transition: $transition;

    span {
      display: block;
      font-size: 12px;
      line-height: 12px;
      font-weight: 400;
    }
  }

  .line {
    height: 3px;
    background: #e4e4e4;
    margin: 0 auto 7px auto;
  }
}

.datas {
  position: absolute;
  height: 160px;
  width: 380px;
  top: 220px;
  left: 10px;
  background: #fff;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);

  .data {
    margin: 17px 15px 0 15px;

    .text {
      font-size: 12px;
      height: 20px;
      color: #666;

      .left {
        float: left;
      }

      .right {
        float: right;
      }
    }

    .line {
      position: relative;
      z-index: 5;
      width: 100%;
      height: 10px;
      background: #e9edef;
      border-radius: 5px;
      overflow: hidden;

      .fill {
        position: relative;
        z-index: 1;
        height: 10px;
        width: 100%;
        background: $blueLight;
        transform: scaleX(0);
        transform-origin: 0 50%;
        transition: $transition;
        border-radius: 3px;
      }
    }
  }
}
</style>