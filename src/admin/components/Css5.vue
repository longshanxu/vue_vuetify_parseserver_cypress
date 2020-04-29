<template>
  <v-row align="center" justify="center" style="height: 300px;">
    <div class="card" onclick="void(0);">
      <div class="flip">
        <div class="front">
          <img src="../assets/img/13-3.jpg" />
        </div>
        <div class="back">
          <img src="../assets/img/13-2.jpg" />
        </div>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  width: 320px;
  height: 180px;
  perspective: 800px;

  &:hover .flip {
    transform: rotateX(180deg) translate3d(0, 0, 0);
    box-shadow: 8px -10px 15px 0 rgba(0, 0, 0, 0.5);
  }

  .flip {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
    perspective: 1000px;
    box-shadow: 8px 10px 15px 0 rgba(0, 0, 0, 0.5);
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffce4e;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;
    text-align: center;
  }

  .front {
    z-index: 2;
    transform: rotateX(0);

    img {
      animation: bike 0.6s ease-in-out infinite;
      transform-origin: 50% 100%;
    }

  }

  .back {
    transform: rotateX(180deg);

    img {
      z-index: 1;
      animation: helicopter 1.5s ease-in-out infinite;
      animation-fill-mode: both;
    }

  }
}

@keyframes bike {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.03);
  }
}

@keyframes street {
  0% {
    transform: translate3d(0, 0, 0) scaleX(1);
  }
  100% {
    transform: translate3d(-210px, 0, 0) scaleX(0.8);
  }
}

@keyframes helicopter {
  0%,
  100% {
    transform: translate3d(0, -5px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}

@keyframes cloud {
  0% {
    transform: translate3d(0, 0, 0) scaleX(1);
  }
  100% {
    transform: translate3d(-210px, 0, 0) scaleX(0.8);
  }
}
</style>