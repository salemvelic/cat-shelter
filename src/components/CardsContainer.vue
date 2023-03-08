<template>
  <div class="card-container">
    <div>
      <label>
        <input
          v-model="sortBy"
          type="radio"
          value="name"
        >
        Sort by Name
      </label>
      <label>
        <input
          v-model="sortBy"
          type="radio"
          value="months"
        >
        Sort by Age
      </label>
    </div>
    <div>
      <label>
        <input
          v-model="sortOrder"
          type="radio"
          value="asc"
        >
        Ascending
      </label>
      <label>
        <input
          v-model="sortOrder"
          type="radio"
          value="desc"
        >
        Descending
      </label>
    </div>

    <div
      v-for="cat in visibleCats"
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
    <div v-if="shouldShowButton">
      <button
        class="show-more-button"
        @click="showAllCats = true"
      >
        Show more
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      sortBy: "months",
      sortOrder: "asc",
      showAllCats: false,
    };
  },
  computed: {
    ...mapGetters(["allCats"]),

    shouldShowButton() {
      return this.allCats.length > 20 && !this.showAllCats;
    },

    visibleCats() {
      return this.showAllCats ? this.sortCats() : this.sortCats().slice(0, 20);
    },
  },
  methods: {
    sortCats() {
      // Copy the cats array so we don't mutate it
      const sortedCats = [...this.allCats];

      // Sort by name or age, depending on the value of sortBy
      sortedCats.sort((a, b) => {
        if (this.sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return a.months - b.months;
        }
      });

      // Reverse the array if sortOrder is 'desc'
      if (this.sortOrder === "desc") {
        sortedCats.reverse();
      }

      return sortedCats;
    },
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

.show-more-button {
  border: none;
  background: transparent;
  color: #007bff;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
}
</style>