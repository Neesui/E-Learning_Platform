import React from 'react';

function CategoryFilter({ categories = [], onCategorySelect }) {
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    onCategorySelect(selectedCategoryId); // Emit selected category to parent
  };

  return (
    <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category._id}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                {category.categoryName}
              </label>
            </li>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </ul>
    </div>
  );
}

export default CategoryFilter;
