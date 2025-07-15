
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () =>{
    const res = await fetch("/api/products");
    const data = await res.json();
    set({products:data.data});


  },
  deleteProduct: async (prid) => {
  try {
    const res = await fetch(`/api/products/${prid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== prid),
    }));
 

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      message: "An error occurred while deleting the product.",
    };
  }
  
},
updateProduct: async (pid, updateProduct) => {
  try {

      if(!updateProduct.image || !updateProduct.price || !updateProduct.name){
      return{
        success:false,message:"fill all fields"
      }
    }
    const res = await fetch(`/api/products/${pid}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Failed to update product" };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
  

    return { success: true, message: data.message || "Product updated successfully" };

  } catch (error) {
    return {
      success: false,
      message: error.message || "There is an error",
    };
  }
}




}));
