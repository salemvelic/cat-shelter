<template>
  <div
    class="modal"
    :class="{ 'is-active': isActive }"
  >
    <div
      class="modal-background"
      @click="close"
    />
    <div class="modal-content">
      <button
        class="btn-close btn-icon"
        @click="close"
      >
        X
      </button>
      <div class="d-flex flex-direction-column">
        <h2 class="align-self-center">
          Kitten details
        </h2>
        <div class="modal-content-details">
          Name: <span class="tw-bold">{{ selectedCat.name }}</span>
        </div>
        <div class="modal-content-details">
          Color: <span class="tw-bold">{{ selectedCat.color }}</span>
        </div>
        <div class="modal-content-details">
          Old: <span class="tw-bold">{{ selectedCat.months }} months</span>
        </div>
        <button
          class="btn btn-primary"
          @click="adoptKitten(selectedCat.id)"
        >
          Adopt a kitten
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions } from "vuex";

export default {
  name: 'ModalCatInfo',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    selectedCat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.value;
    },
  },
  methods: {
    ...mapActions(['removeCatById']),

    adoptKitten(id) {
      this.removeCatById(id);
      this.close();
    },

    close() {
      this.$emit('input', false);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.btn-close {
  justify-self: end;

  &:hover {
    font-weight: 600;
  }
}
</style>