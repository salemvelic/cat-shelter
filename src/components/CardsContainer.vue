<template>
  <section>
    <div class="edit-container">
      <div class="d-flex flex-direction-column">
        <span class="label-title">Sort by</span>
        <label>
          <input
            v-model="sortBy"
            type="radio"
            value="name"
          >
          Name
        </label>
        <label>
          <input
            v-model="sortBy"
            type="radio"
            value="months"
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
        <!-- <label>Search</label> -->
        <input
          v-model="searchName"
          type="text"
          placeholder="Search cat by name"
        >
      </div>
    </div>
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
          <h2 class="card-title">
            {{ cat.name }}
          </h2>
          <div>Color: {{ cat.color }}</div>
          <div>{{ cat.months }} months young</div>
          <button
            class="btn btn-primary"
            @click="adoptKitten(cat.id)"
          >
            Take me home
          </button>
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
  </section>
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
.search-wrapper {
  display: flex;
  align-items: center;

  input {
    background-color: #f9f9f9;
    height: 30px;
    width: 320px;
    border-radius: 15px;
    padding-left: 10px;
  }
}
.edit-container {
  display: flex;
  column-gap: 20px;
  margin-top: 30px;
  padding: 15px 30px 0 30px;
  background-color: #fff;
  border-radius: 20px;
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

.checkbox {
  margin-bottom: 10px;
}
@keyframes pop {
  0% { opacity:0; }
  75% {opacity:1; }
  100% { transform: scale(1.2); }
}
.checkbox-pop {
    display:none;
}
.checkbox-pop + label span {
    display:inline-block;
    width:25px;
    height:19px;
    margin: 0 5px -4px 0; /*layout relationship between check and label*/
    &:before,
    &:after {
      content: "";
      position: absolute;
      z-index: 1;
      width: 1rem;
      height: 1rem;
      background: transparent;
      border: 2px solid #FF4040; 
    }
     &:after {
      z-index: 0;
      border: none;
    }
}

.checkbox-pop:checked + label span {
  &:before {
      animation: pop .3s ease;
      z-index: 100;
      background: #FF4040;
     } 
}
</style>