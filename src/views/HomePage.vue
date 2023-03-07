<template>
  <div class="container">
    <HomeCarousel />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters(['allCats']),
  
    getAllCats() {
      return this.allCats;
    }
  },
  created() {
    this.fetchCats();
  },
  methods: {
    ...mapActions(['fetchCats']),
  }
}
</script>