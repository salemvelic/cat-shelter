<template>
  <section class="d-flex flex-direction-column">
    <div class="edit-container">
      <div class="d-flex flex-direction-column">
        <span class="label-title">Sort by</span>
        <label>
          <input
            v-model="sortBy"
            type="radio"
            value="name"
            class="radio-color"
          >
          Name
        </label>
        <label>
          <input
            v-model="sortBy"
            type="radio"
            value="months"
            class="radio-color"
          >
          Age
        </label>
      </div>
      <div class="d-flex flex-direction-column">
        <span class="label-title">Way of sorting</span>
        <label>
          <input
            v-model="sortOrder"
            type="radio"
            value="asc"
            class="radio-color"
          >
          Ascending
        </label>
        <label>
          <input
            v-model="sortOrder"
            type="radio"
            value="desc"
            class="radio-color"
          >
          Descending
        </label>
      </div>
      <div class="d-flex flex-direction-column">
        <span class="label-title">Filter by</span>
        <ul>
          <li class="checkbox">
            <input
              id="check1"
              v-model="filters.lessThanSixMonths"
              class="checkbox-pop"
              type="checkbox"
            >
            <label
              for="check1"
              :class="{ 'checked': filters.lessThanSixMonths }"
            ><span />Less than 6 months</label>
          </li>
          <li class="checkbox">
            <input
              id="check2"
              v-model="filters.lessThanTwelveMonths"
              class="checkbox-pop"
              type="checkbox"
            >
            <label
              for="check2"
              :class="{ 'checked': filters.lessThanTwelveMonths }"
            ><span />Less than 12 months</label>
          </li>
          <li class="checkbox">
            <input
              id="check3"
              v-model="filters.blackColor"
              class="checkbox-pop"
              type="checkbox"
            >
            <label
              for="check3"
              :class="{ 'checked': filters.blackColor }"
            ><span />Black color</label>
          </li>
        </ul>
      </div>
      <div class="search-wrapper">
        <input
          v-model="searchName"
          type="text"
          placeholder="Search cat by name"
        >
      </div>
    </div>
    <div
      v-if="loading"
      class="spinner-loader align-self-center"
    ></div>
    <div v-else>
      <div class="card-container">
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
            <h2 class="card-title text-center">
              {{ cat.name }}
            </h2>
            <div class="d-flex justify-content-between">
              <div>
                <div>Color: {{ cat.color }}</div>
                <div>{{ cat.months }} months young</div>
              </div>
              <button
                class="btn btn-primary"
                @click="adoptKitten(cat.id)"
              >
                Take me home
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="shouldShowButton"
        class="d-flex justify-content-center"
      >
        <button
          class="show-more-button"
          @click="showAllCats = true"
        >
          Show more
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
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

    // If there is more than 20 cats and also there is no other filter or search active show button
    shouldShowButton() {
      return this.allCats.length > 20 && !this.showAllCats && this.searchName.length < 2 && Object.values(this.filters).every(value => value === false);
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
  watch: {
    allCats() {
      if (this.allCats.length > 0) {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loading = true;
  },
  methods: {
    ...mapActions(['removeCatById']),

    adoptKitten(id) {
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
.edit-container {
  display: flex;
  column-gap: 20px;
  margin-top: 30px;
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 20px;
  flex-wrap: wrap;
}

.label-title {
  font-size: 20px;
  margin-bottom: 10px;
}
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
    margin-top: 0;
    margin-bottom: 12px;
  }
}

.show-more-button {
  border: none;
  background: transparent;
  color: #6e52ff;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
}
.spinner-loader {
  margin-top: 20px;
}
</style>