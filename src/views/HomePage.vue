<template>
  <div class="container">
    <HomeCarousel />
    <CardsContainer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeCarousel from '../components/HomeCarousel.vue';
import CardsContainer from '../components/CardsContainer.vue';

export default {
  components: {
    HomeCarousel,
    CardsContainer
  },
  data() {
    return {
      cats: [],
      loading: false,
    };
  },
  created() {
    this.fetchCats();
  },
  methods: {
    ...mapActions(['fetchCats']),
  }
}
</script>