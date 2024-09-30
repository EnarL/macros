// src/App.tsx
import React, { useState, useEffect } from 'react';
import AddFoodForm from "./components/addFoodForm.tsx";
import FoodList from "./components/FoodList.tsx";


interface Food {
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

const App: React.FC = () => {
    const [foods, setFoods] = useState<Food[]>(() => {
        const savedFoods = localStorage.getItem('foods');
        return savedFoods ? JSON.parse(savedFoods) : [];
    });

    useEffect(() => {
        localStorage.setItem('foods', JSON.stringify(foods));
    }, [foods]);

    const handleAddFood = (food: Food) => {
        setFoods([...foods, food]);
    };

    const handleRemoveFood = (name: string) => {
        const newFoods = foods.filter(food => food.name !== name);
        setFoods(newFoods);
    };

    return (
        <div>
            <h1>Macro Tracker</h1>
            <AddFoodForm onAddFood={handleAddFood}/>
            <FoodList foods={foods} onRemoveFood={handleRemoveFood}/>

        </div>
    );
};

export default App;