<template>
  <div> Random cat name: {{ getAllCats[2].name }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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