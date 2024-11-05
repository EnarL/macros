import React from 'react';

interface Food {
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface FoodFormProps {
    newFood: Food;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddFood: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ newFood, handleInputChange, handleAddFood }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                name="name"
                value={newFood.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 mr-2"
            />
            <input
                type="text"
                name="protein"
                value={newFood.protein}
                onChange={handleInputChange}
                placeholder="Protein"
                className="border p-2 mr-2"
            />
            <input
                type="text"
                name="carbs"
                value={newFood.carbs}
                onChange={handleInputChange}
                placeholder="Carbs"
                className="border p-2 mr-2"
            />
            <input
                type="text"
                name="fats"
                value={newFood.fats}
                onChange={handleInputChange}
                placeholder="Fats"
                className="border p-2 mr-2"
            />
            <select
                name="mealType"
                value={newFood.mealType}
                onChange={handleInputChange}
                className="border p-2 mr-2"
            >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
            </select>
            <button onClick={handleAddFood} className="bg-blue-500 text-white p-2">Add Food</button>
        </div>
    );
};

export default FoodForm;