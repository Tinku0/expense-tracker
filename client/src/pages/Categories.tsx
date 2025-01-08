import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

interface Category {
    _id: string,
    name: string,
    type: string,
    userId: null | string,
    isEdit: boolean
}

const Categories = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const response = await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + 'category/get');
            setCategories(response.data.categories.map((category: Category) => ({ ...category, isEdit: false })));
        } catch (error) {
            toast.error('Failed to fetch categories. Please try again.');
        }
    }

    const handleAdd = async () => {
        const response = await axiosInstance.post(import.meta.env.VITE_API_BASE_URL + 'category/add', {
            name: (document.getElementById('newCategory') as HTMLInputElement).value
        });
        if(response) {
            toast('Category added successfully!');
            (document.getElementById('newCategory') as HTMLInputElement).value = '';
            getCategories()
        }
    }

    const handleEdit = (index: number) => {
        setCategories(categories.map((category, i) => i === index ? { ...category, isEdit: !category.isEdit } : category));
    }

    const handleDelete = (category: Category) => {
        axiosInstance.delete(import.meta.env.VITE_API_BASE_URL + 'category/' + category._id)
            .then(response => {
                if (response) {
                    toast.success('Category deleted successfully!');
                    setCategories(categories.filter(cat => cat._id !== category._id));
                }
            })
            .catch(error => {
                toast.error('Failed to delete category. Please try again.'+error);
            })
    }

    const updateCategory = async (index: number, category: Category) => {
        const name = (document.getElementById(index + 'id') as HTMLInputElement).value;
        if (name === category.name) {
            // No changes, no need to trigger update API
            setCategories(categories.map((cat, i) => i === index ? { ...cat, isEdit: false } : cat));
            return;
        }
        try {
            const response = await axiosInstance.put(import.meta.env.VITE_API_BASE_URL + 'category/' + category._id, { name });
            if (response) {
                toast.success('Category updated successfully!');
            }
            setCategories(categories.map((cat, i) => i === index ? { ...cat, name, isEdit: false } : cat));
        } catch (error) {
            toast.error('Failed to update category. Please try again.');
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold">Categories</h1>
            <div className="flex justify-between w-full space-x-2">
                <input type="text" id='newCategory' placeholder="Enter new category" className="p-2 bg-gray-100 outline-none w-full rounded" />
                <button className="w-28 bg-black text-white rounded" onClick={handleAdd}>Add</button>
            </div>
            {categories.map((category, index) => (
                <div key={category.name} className='rounded flex justify-between items-center p-4 my-2 bg-gray-100'>
                    {!category.isEdit && <p>{category.name}</p>}
                    {category.isEdit && <input id={index + 'id'} type="text" defaultValue={category.name} />}
                    {category.userId && <div className="flex space-x-3">
                        {!category.isEdit && <button onClick={() => handleEdit(index)}><FiEdit2 className="text-lg text-blue-500 transition-all duration-200" /></button>}
                        {category.isEdit && <button onClick={() => updateCategory(index, category)}><FaRegCircleCheck className="text-lg text-green-500 transition-all duration-200" /></button>}
                        <button onClick={() => handleDelete(category)}><MdOutlineDelete className="text-lg text-red-500 transition-all duration-200" /></button>
                    </div>}
                </div>
            ))}
        </div>
    )
}

export default Categories