<template>
  <div
    class="modal"
    :class="{ 'is-active': isActive }"
  >
    <div
      class="modal-background"
      @click="closeModal"
    />
    <div class="modal-content">
      <button
        class="btn-close btn-icon"
        @click="closeModal"
      >
        X
      </button>
      <div class="d-flex flex-direction-column">
        <h2 class="align-self-center">
          Confirmation
        </h2>
        <div class="modal-content-details text-center">
          <p>Are you sure you want to addopt <span class="tw-bold">{{ selectedCat.name }}</span>?</p>
        </div>
        <div class="btn-wrapper">
          <button
            class="btn btn-primary"
            @click="adoptKitten"
          >
            Confirm
          </button>
          <button
            class="btn btn-secondary"
            @click="closeModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions } from "vuex";

export default {
  name: 'ModalConfirmation',
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

    adoptKitten() {
      this.removeCatById(this.selectedCat.id);
      this.closeModal();
    },

    closeModal() {
      this.$emit('input', false);
    },
  },
};
  </script>

  <style lang="scss" scoped>
  .modal-content {
    height: 240px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .btn-primary {
      margin-right: 15px;
    }
  }
  </style>