<template>
  <div class="container">
    <HomeCarousel />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeCarousel from '../components/HomeCarousel.vue';

export default {
  components: {
    HomeCarousel
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