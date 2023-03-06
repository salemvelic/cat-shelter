<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          :src="currentCat.image"
          alt="cat image"
        >
        <div class="carousel-caption">
          <h3>{{ currentCat.name }}</h3>
        </div>
      </div>
      <div
        v-for="(cat, index) in getAllCats"
        :key="index"
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
    <a
      class="carousel-control-prev"
      href="#"
      role="button"
      @click.prevent="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
      />
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#"
      role="button"
      @click.prevent="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
      />
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      cats: [],
      currentIndex: 1,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['firstFourCats']),
  
    getAllCats() {
      return this.firstFourCats;
    },

    currentCat() {
      return this.getAllCats[this.currentIndex];
    },
  },
  created() {
    this.fetchCats();
  },
  methods: {
    ...mapActions(['fetchCats']),

    prev() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.cats.length - 1;
    },
    next() {
      this.currentIndex = this.currentIndex < this.cats.length - 1 ? this.currentIndex + 1 : 0;
    },
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  margin: auto;
  width: 80%;
  height: 300px;
}
.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}
.carousel-item {
  position: absolute;
  display: none;
  transition: opacity 0.6s ease-in-out;
}
.carousel-item.active {
  display: block;
  opacity: 1;
}
.carousel-caption {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}
</style>