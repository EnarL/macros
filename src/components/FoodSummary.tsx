import React from 'react';

interface Food {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface FoodSummaryProps {
    foods: Food[];
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

const FoodSummary: React.FC<FoodSummaryProps> = ({ foods, mealType }) => {
    const filteredFoods = foods.filter(food => food.mealType === mealType);
    const totalProtein = filteredFoods.reduce((sum, food) => sum + food.protein, 0);
    const totalCarbs = filteredFoods.reduce((sum, food) => sum + food.carbs, 0);
    const totalFats = filteredFoods.reduce((sum, food) => sum + food.fats, 0);
    const totalCalories = filteredFoods.reduce((sum, food) => sum + food.calories, 0);

    return (
        <div className="border p-2 mb-4">
            <h3 className="text-xl font-bold">Summary for {mealType}</h3>
            <p>Protein: {totalProtein}g</p>
            <p>Carbs: {totalCarbs}g</p>
            <p>Fats: {totalFats}g</p>
            <p>Calories: {totalCalories}</p>
        </div>
    );
};

export default FoodSummary;