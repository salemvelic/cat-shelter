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
    <div>
      <label>
        <input
          v-model="filters.lessThanSixMonths"
          type="checkbox"
        >
        <span
          class="custom-checkbox"
          :class="{ 'checked': filters.lessThanSixMonths }"
        />
        Less than 6 months
      </label>
      <label>
        <input
          v-model="filters.lessThanTwelveMonths"
          type="checkbox"
        >
        <span
          class="custom-checkbox"
          :class="{ 'checked': filters.lessThanTwelveMonths }"
        />
        Less than 12 months
      </label>
      <label>
        <input
          v-model="filters.blackColor"
          type="checkbox"
        >
        <span
          class="custom-checkbox"
          :class="{ 'checked': filters.blackColor }"
        />
        Black color
      </label>
      <label>
        Search:
        <input
          v-model="searchName"
          type="text"
        >
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
        <button @click="removeCat(cat.id)">Take me home</button>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      searchName: "",
      sortBy: "months",
      sortOrder: "asc",
      showAllCats: false,
      filters: {
        lessThanSixMonths: false,
        lessThanTwelveMonths: false,
        blackColor: false,
      },
    };
  },
  computed: {
    ...mapGetters(["allCats"]),

    shouldShowButton() {
      return this.allCats.length > 20 && !this.showAllCats;
    },

    visibleCats() {
      // Copy the cats array so we don't mutate it
      let filteredCats = this.showAllCats ? [...this.allCats] : [...this.allCats].slice(0, 20);

      // Filter by lessThanSixMonths, lessThanTwelveMonths or blackColor value
      filteredCats = filteredCats.filter(cat => {
        return (!this.filters.lessThanSixMonths || cat.months < 6) &&
        (!this.filters.lessThanTwelveMonths || cat.months < 12) &&
        (!this.filters.blackColor || cat.color === 'black')
      });

      // Filter by name based on the value of searchName
      if (this.searchName.length > 1) {
        filteredCats = filteredCats.filter(cat => {
          return cat.name.toLowerCase().includes(this.searchName.toLowerCase());
        });
      }

      filteredCats = this.sortCats(filteredCats);

      return filteredCats;
    },
  },
  methods: {
    ...mapActions(['removeCatById']),

    removeCat(id) {
      this.removeCatById(id);
    },

    sortCats(filteredCats) {

      // Sort by name or age, depending on the value of sortBy
      filteredCats.sort((a, b) => {
        return this.sortBy === "name"
          ? a.name.localeCompare(b.name)
          : a.months - b.months
      });

      // Reverse the array if sortOrder is 'desc'
      if (this.sortOrder === "desc") {
        filteredCats.reverse();
      }

      return filteredCats;
    },

    removeKitten() {},
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