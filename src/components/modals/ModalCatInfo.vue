<template>
  <div>
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
            @click="adoptKitten"
          >
            Adopt a kitten
          </button>
        </div>
      </div>
    </div>
    <modal-confirmation
      v-model="showConfirmation"
      :value="showConfirmation"
      :selected-cat="selectedCat"
    />
  </div>
</template>
  
<script>
import ModalConfirmation from './ModalConfirmation.vue';

export default {
  name: 'ModalCatInfo',
  components: { ModalConfirmation },
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
  data() {
    return {
      showConfirmation: false,
    };
  },
  computed: {
    isActive() {
      return this.value;
    },
  },
  methods: {
    adoptKitten() {
      this.closeModal();
      this.showConfirmation = true;
    },
    closeModal() {
      this.$emit('input', false);
    },
  },
};
</script>
