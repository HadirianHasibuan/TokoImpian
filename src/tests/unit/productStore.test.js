import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from '../../src/store/productStore';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('productStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchProducts updates products list', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Sepatu A', price: 100 }] });
    const store = useProductStore();
    await store.fetchProducts();
    expect(store.products.length).toBe(1);
    expect(store.products[0].name).toBe('Sepatu A');
  });
});
