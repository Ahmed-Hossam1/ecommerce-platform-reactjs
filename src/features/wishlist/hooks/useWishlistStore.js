import { create } from "zustand";
import toast from "react-hot-toast";

const useWishlistStore = create((set, get) => ({
    items: [],

    addToWishlist: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);
        if (exists) {
            toast.error(`${product.name || 'Product'} is already in your wishlist`);
            return;
        }
        set({ items: [...items, product] });
        toast.success(`${product.name || 'Product'} added to wishlist`);
    },

    // Partial implementation — students should complete this
    removeFromWishlist: (productId) => {
        const items = get().items;
        set({ items: items.filter((item) => item.id !== productId) });
        toast.success("Item removed from wishlist");
    },

    isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
    },
}));

export default useWishlistStore;
