import { create } from "zustand";
import toast from "react-hot-toast";

const MAX_COMPARE_ITEMS = 2;

const useCompareStore = create((set, get) => ({
    items: [],

    addToCompare: (product) => {
        const items = get().items;

        if (items.find((item) => item.id === product.id)) {
            toast.error("This product is already in your compare list");
            return;
        }

        if (items.length >= MAX_COMPARE_ITEMS) {
            toast.error("You can only compare 2 products at a time. Remove one first.");
            return;
        }

        set({ items: [...items, product] });
        toast.success(`${product.title || "Product"} added to compare`);
    },

    removeFromCompare: (productId) => {
        set({
            items: get().items.filter((item) => item.id !== productId),
        });
        toast.success("Product removed from compare");
    },

    isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId);
    },
}));

export default useCompareStore;
