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
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);

    &-background {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &-content {
      display: grid;
      position: relative;
      width: 600px;
      max-height: 80%;
      padding: 20px;
      background-color: #fff;
      overflow: auto;
      border-radius: 4px;

      @media (max-width: 768px) {
        width: 100%;
        border-radius: 0;
      }

      &-details {
        font-size: 20px;
        margin: 8px 0;
      }
    }
  }
  
  .modal.is-active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close {
    justify-self: end;
  }
  </style>