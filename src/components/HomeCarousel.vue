<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    class="carousel"
    @mouseover="stopCarInterval"
    @mouseleave="setCarInterval"
  >
    <div
      ref="inner"
      class="carousel-inner"
      :style="innerStyles"
    >
      <div
        v-for="(cat, index) in getCats"
        :key="index"
        :class="{ active: index === 1 }"
        class="carousel-item"
      >
        <img
          :src="cat.image"
          alt="cat image"
        >
        <div class="carousel-caption">
          <h3>{{ cat.name }}</h3>
        </div>
      </div>
    </div>
    <button
      class="btn-icon carousel-control carousel-control-prev"
      @click="prevCard"
    >
      <chevron-left svg-color="#ff0000" />
    </button>
    <button
      class="btn-icon carousel-control carousel-control-next"
      @click="nextCard"
    >
      <chevron-right svg-color="#ff0000" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronRight from './icons/ChevronRight.vue';

export default {
  components: { ChevronLeft, ChevronRight },
  data() {
    return {
      cats: [],
      innerStyles: {},
      step: '',
      transitioning: false,
      updateInterval: [],
    };
  },
  computed: {
    ...mapGetters(['firstFourCats']),

    getCats() {
      return this.firstFourCats;
    },
  },

  async mounted() {
    this.setStep();
    this.resetTranslate();
    this.setCarInterval();
    this.cats = await this.firstFourCats;
  },

  methods: {
    setCarInterval() {
      this.updateInterval = setInterval(() => {
      this.nextCard()
    }, 3000);
    },

    stopCarInterval() {
      clearInterval(this.updateInterval);
    },

    setStep() {
      // const innerWidth = this.$refs.inner.scrollWidth;
      const innerWidth = 720;
      // const totalCards = this.getCats.length;
      const totalCards = 4;
      this.step = `${innerWidth / totalCards}px`;
    },

    nextCard() {
      if (this.transitioning) return;
      this.transitioning = true;
      this.moveLeft();
      this.afterTransition(() => {
        const card = this.getCats.shift();
        this.getCats.push(card);
        this.resetTranslate();
        this.transitioning = false;
      });
    },

    afterTransition (callback) {
      const listener = () => {
        callback()
        this.$refs.inner.removeEventListener('transitionend', listener)
      };
      this.$refs.inner.addEventListener('transitionend', listener);
    },
    resetTranslate () {
      this.innerStyles = {
        transition: 'none',
        transform: `translateX(-${this.step})`
      };
    },

    prevCard() {
      if (this.transitioning) return;
      this.transitioning = true;
      this.moveRight();
      this.afterTransition(() => {
        const card = this.getCats.pop();
        this.getCats.unshift(card);
        this.resetTranslate();
        this.transitioning = false;
      });
    },

    moveLeft() {
      this.innerStyles = {
        transform: `translateX(-${this.step})
                    translateX(-${this.step})`
      };
    },

    moveRight() {
      this.innerStyles = {
        transform: `translateX(${this.step})
                    translateX(-${this.step})`
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-icon {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
.carousel {
  width: 100%;
  max-width: 720px;
  overflow: hidden;
  position: relative;
  margin-top: 100px;

  &-inner {
    display: flex;
    transition: transform 0.2s;

    .active {
      opacity: 1;
    }
  }

  &-item {
    display: flex;
    justify-content: center;
    position: relative;
    width: 500px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    opacity: 0.4;
    margin-right: 10px;

    img {
      width: 354px;
      height: 244px;
    }
    
    .carousel-caption {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  &-control {
    position: absolute;
    top: 50%;

    &-prev {
      left: 0;
    }

    &-next {
      right: 0;
    }
  }
}
</style>