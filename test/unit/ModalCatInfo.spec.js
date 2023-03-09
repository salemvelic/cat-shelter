/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import ModalCatInfo from '@/components/modals/ModalCatInfo.vue';
import ModalConfirmation from '@/components/modals/ModalConfirmation.vue';

describe('ModalCatInfo.vue', () => {
  it('renders the correct content', () => {
    const selectedCat = {
      name: 'Fluffy',
      color: 'white',
      months: 6,
    };
    const wrapper = shallowMount(ModalCatInfo, {
      propsData: {
        value: true,
        selectedCat,
      },
    });
    expect(wrapper.findAll('.modal-content-details').at(0).text()).toContain(`Name: ${selectedCat.name}`);
    expect(wrapper.findAll('.modal-content-details').at(1).text()).toContain(`Color: ${selectedCat.color}`);
    expect(wrapper.findAll('.modal-content-details').at(2).text()).toContain(`Old: ${selectedCat.months} months`);
  });

  it('emits an input event with false when closeModal is called', () => {
    const wrapper = shallowMount(ModalCatInfo, {
      propsData: {
        value: true,
        selectedCat: {},
      },
    });
    wrapper.vm.closeModal();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([false]);
  });

  it('sets showConfirmation to true and calls closeModal when adoptKitten is called', () => {
    const wrapper = shallowMount(ModalCatInfo, {
      propsData: {
        value: true,
        selectedCat: {},
      },
    });
    wrapper.vm.closeModal = jest.fn();
    wrapper.vm.adoptKitten();
    expect(wrapper.vm.showConfirmation).toBe(true);
    expect(wrapper.vm.closeModal).toHaveBeenCalled();
  });

  it('renders ModalConfirmation with the correct props when showConfirmation is true', async () => {
    const wrapper = shallowMount(ModalCatInfo, {
      propsData: {
        value: true,
        selectedCat: {},
      },
    });
    wrapper.setData({ showConfirmation: true });
    await wrapper.vm.$nextTick(); // Wait for reactivity to update the DOM
    expect(wrapper.findComponent(ModalConfirmation).props().value).toBe(true);
    expect(wrapper.findComponent(ModalConfirmation).props().selectedCat).toEqual({});
  });
});
