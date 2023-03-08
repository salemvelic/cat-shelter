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
      <h2>Kitten info</h2>
      <p>Name: {{ selectedCat.name }} </p>
      <p>Color: {{ selectedCat.color }} </p>
      <p>Age: {{ selectedCat.months }} </p>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="close"
    />
  </div>
</template>
  
  <script>
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
    data() {
      return {
        isActive: this.value,
      };
    },
    watch: {
      value(newValue) {
        this.isActive = newValue;
      },
      isActive(newValue) {
        this.$emit('input', newValue);
      },
    },
    methods: {
      close() {
        this.isActive = false;
      },
    },
  };
  </script>
  
  <style scoped>
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
  }
  
  .modal.is-active {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-background {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    position: relative;
    max-width: 80%;
    max-height: 80%;
    padding: 20px;
    background-color: #fff;
    overflow: auto;
  }
  
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
  </style>