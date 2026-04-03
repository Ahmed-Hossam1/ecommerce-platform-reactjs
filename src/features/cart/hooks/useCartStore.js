import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";


const useCartStore = create(persist((set, get) => ({
    items: [],

    addToCart: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
            // Prevent exceeding stock
            if (existingItem.quantity >= product.stock) {
                toast.error(`Cannot add more than ${product.stock} items of this product`);
                return;
            }
            set({
                items: items.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            });
            toast.success(`Increased ${product.name || 'Product'} quantity`);
        } else {
            set({
                items: [...items, { ...product, quantity: 1 }],
            });
            toast.success(`${product.name || 'Product'} added to cart`);
        }
    },

    removeFromCart: (productId) => {
        set({
            items: get().items.filter((item) => item.id !== productId),
        });
        toast.success("Item removed from cart");
    },

    // BUG: This function does NOT prevent quantity from going to 0 or negative.
    // Students must fix this by adding a minimum quantity check (quantity >= 1).
    updateQuantity: (productId, newQuantity) => {
        const items = get().items;
        const item = items.find((i) => i.id === productId);

        if (!item) return;

        // Prevent exceeding stock
        if (newQuantity > item.stock) return;

        if (newQuantity <= 0) {
            set({ items: items.filter((i) => i.id !== productId) })
            return;
        }

        set({
            items: items.map((i) =>
                i.id === productId ? { ...item, quantity: newQuantity } : i
            ),
        });
    },

    clearCart: () => {
        set({ items: [] });
        toast.success("Cart cleared");
    },

    get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    get totalPrice() {
        return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    },

    getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    },
}), { name: "cart-storage" }));

export default useCartStore;


