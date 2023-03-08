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
        class="card-image"
      >
      <div class="card-content">
        <h2 class="card-title">
          {{ cat.name }}
        </h2>
        <div>Color: {{ cat.color }}</div>
        <div>{{ cat.months }} months young</div>
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
  gap: 25px;
  margin-top: 30px;
}

.card {
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  width: 100%;
  overflow: hidden;

  &-image {
    display: block;
    height: 200px;
    object-fit: cover;
    width: 100%;
  }

  &-content {
    padding: 20px;
    height: 80px;
  }

  &-title {
    margin: 0 10px;
  }
}
</style>