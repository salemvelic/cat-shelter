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
        v-for="(cat, index) in cats"
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