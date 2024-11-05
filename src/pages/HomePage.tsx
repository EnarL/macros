import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import FoodSummary from '../components/FoodSummary';

interface Food {
    _id?: string;
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    date?: Date;
}

const HomePage: React.FC = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [newFood, setNewFood] = useState<Food>({
        name: '',
        protein: 0,
        carbs: 0,
        fats: 0,
        calories: 0,
        mealType: 'Breakfast',
    });

    useEffect(() => {
        axios.get<Food[]>('http://localhost:3000/foods')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setFoods(response.data);
                } else {
                    console.error('API response is not an array:', response.data);
                }
            })
            .catch(error => console.error('Error fetching foods:', error));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedFood = { ...newFood, [name]: name === 'name' ? value : parseInt(value) || value };

        if (name === 'protein' || name === 'carbs' || name === 'fats') {
            updatedFood.calories = (updatedFood.protein * 4) + (updatedFood.carbs * 4) + (updatedFood.fats * 9);
        }

        setNewFood(updatedFood);
    };

    const handleAddFood = () => {
        axios.post<Food>('http://localhost:3000/foods', newFood)
            .then(response => setFoods([...foods, response.data]))
            .catch(error => console.error('Error adding food:', error));
    };

    const handleDeleteFood = (id: string) => {
        axios.delete(`http://localhost:3000/foods/${id}`)
            .then(() => setFoods(foods.filter(food => food._id !== id)))
            .catch(error => console.error('Error deleting food:', error));
    };

    const mealTypes: ('Breakfast' | 'Lunch' | 'Dinner' | 'Snacks')[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Macro Tracker</h1>
                <FoodForm newFood={newFood} handleInputChange={handleInputChange} handleAddFood={handleAddFood} />
                {mealTypes.map(mealType => (
                    <div key={mealType}>
                        <FoodList foods={foods} mealType={mealType} handleDeleteFood={handleDeleteFood} />
                        <FoodSummary foods={foods} mealType={mealType} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;