import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Food {
    _id?: string;
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface FoodListProps {
    foods: Food[];
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    handleDeleteFood: (id: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({ foods, mealType, handleDeleteFood }) => {
    const filteredFoods = foods.filter(food => food.mealType === mealType);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">{mealType}</h2>
            <ul>
                {filteredFoods.map(food => (
                    <li key={food._id} className="border p-2 mb-2">
                        {food.name} - {food.protein}g Protein, {food.carbs}g Carbs, {food.fats}g Fats, {food.calories} Calories
                        <button onClick={() => handleDeleteFood(food._id!)} className="bg-blue-500 text-white p-2 ml-2">
                            <DeleteIcon />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;