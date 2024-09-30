// src/components/FoodList.tsx
import React from 'react';

interface Food {
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface FoodListProps {
    foods: Food[];
    onRemoveFood: (name: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({ foods, onRemoveFood }) => {
    const calculateTotals = (mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks') => {
        return foods.filter(food => food.mealType === mealType).reduce((totals, food) => {
            totals.protein += food.protein;
            totals.carbs += food.carbs;
            totals.fats += food.fats;
            totals.calories += food.calories;
            return totals;
        }, { protein: 0, carbs: 0, fats: 0, calories: 0 });
    };

    const renderFoodList = (mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks') => {
        const totals = calculateTotals(mealType);
        return (
            <div>
                <ul className="food-list">
                    {foods.filter(food => food.mealType === mealType).map((food, index) => (
                        <li key={index} className="food-item">
                            {food.name}: {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fats, {food.calories} calories
                            <button onClick={() => onRemoveFood(food.name)} className="remove-button">&#10060;</button>
                        </li>
                    ))}
                </ul>
                <div className="totals">
                    <strong>Totals:</strong> {totals.protein}g protein, {totals.carbs}g carbs, {totals.fats}g fats, {totals.calories} calories
                </div>
            </div>
        );
    };

    return (
        <div className="food-list-container">
            <h2>Food List</h2>
            <h3>Breakfast</h3>
            {renderFoodList('Breakfast')}
            <h3>Lunch</h3>
            {renderFoodList('Lunch')}
            <h3>Dinner</h3>
            {renderFoodList('Dinner')}
            <h3>Snacks</h3>
            {renderFoodList('Snacks')}
        </div>
    );
};

export default FoodList;