import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../../src/store/cartStore';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('cartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchCart updates cartItems', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Sepatu X' }] });
    const store = useCartStore();
    await store.fetchCart();
    expect(store.cartItems.length).toBe(1);
    expect(store.cartItems[0].name).toBe('Sepatu X');
  });
  
});

