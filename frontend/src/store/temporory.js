updateProduct: async (id, updatedData) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Update failed" };
    }

    // Optional: update state here if needed
    return { success: true, message: result.message || "Product updated" };

  } catch (error) {
    return { success: false, message: error.message || "Server error" };
  }
}
