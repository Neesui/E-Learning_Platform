import Category from '../models/CategoriesModel.js';

// Insert a new category
export const postCategory = async (req, res) => {
    
    const { categoryName, description, imageUrl, level } = req.body;

    try {

        // Create a new category instance
        const category = new Category({
            categoryName,
            description,
            imageUrl,
            level
        });

        if(!category){
            return res.status(400).json({error:"Failed to Create Categories"})
        }

        // Save the new category
        const savedCategory = await category.save();

        if(!savedCategory){
            return res.status(400).json({error:"Failed to Saved Categories"})
        }

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error('Error while creating category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Retrieve all categories
export const categoryList = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories.length) {
            return res.status(404).json({ error: 'No categories found' });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error while retrieving categories:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// View category details
export const categoryDetails = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error while retrieving category details:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { categoryName, description, imageUrl, level } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { categoryName, description, imageUrl, level },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error while updating category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category with that ID not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error while deleting category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
