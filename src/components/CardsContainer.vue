<template>
  <div class="card-container">
    <div
      v-for="cat in getCats"
      :key="cat.id"
      class="card"
    >
      <img
        :src="cat.image"
        :alt="cat.name"
      >
      <div class="card-text">
        <h3>{{ cat.name }}</h3>
        <p>{{ cat.months }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      cats: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['allCats']),

    getCats() {
      return this.allCats;
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 0 auto;
  padding-top: 20px;
}

.card {
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  max-width: 300px;
  overflow: hidden;
  width: 100%;
}

.card img {
  display: block;
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.card-text {
  padding: 20px;
  height: 80px;
}

.card-text h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-text p {
  font-size: 16px;
  line-height: 1.5;
}
</style>