import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { PRODUCT_NAME } from '@/constants';
import HomeView from '@/views/HomeView';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import PreorderModal from '@/components/PreorderModal';

// mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const renderHomeView = () => {
  return mount(HomeView, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        }),
      ],
    },
  });
};

describe('HomeView', () => {
  it('should render title', () => {
    const wrapper = renderHomeView();

    const heading = wrapper.find('#cyclone-title');
    expect(heading.exists()).toBeTruthy();
    expect(heading.text()).toContain(PRODUCT_NAME);
  });

  it('should render Product Details button', () => {
    const wrapper = renderHomeView();

    const productDetailsButton = wrapper.find('#product-details-btn');
    expect(productDetailsButton.exists()).toBeTruthy();
  });

  it('should render Preorder Now button', () => {
    const wrapper = renderHomeView();

    const preorderNowButton = wrapper.find('#preorder-btn');
    expect(preorderNowButton.exists()).toBeTruthy();
  });

  it('should open Product Details modal on button click', async () => {
    const wrapper = renderHomeView();
    const productDetailsButton = wrapper.find('#product-details-btn');
    await productDetailsButton.trigger('click');

    const modal = wrapper.findComponent(ProductDetailsModal);
    expect(modal.props('isOpen')).toBeTruthy();
  });

  it('should open Preorder modal on button click', async () => {
    const wrapper = renderHomeView();
    const preorderNowButton = wrapper.find('#preorder-btn');
    await preorderNowButton.trigger('click');

    const modal = wrapper.findComponent(PreorderModal);
    expect(modal.props('isOpen')).toBeTruthy();
  });
});
