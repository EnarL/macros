// src/components/addFoodForm.tsx
import React, { useState } from 'react';

interface Food {
    name: string;
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface AddFoodFormProps {
    onAddFood: (food: Food) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
    const [name, setName] = useState('');
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fats, setFats] = useState(0);
    const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Breakfast');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const roundedProtein = parseFloat(protein.toFixed(2));
        const roundedCarbs = parseFloat(carbs.toFixed(2));
        const roundedFats = parseFloat(fats.toFixed(2));
        const calories = (roundedProtein * 4) + (roundedCarbs * 4) + (roundedFats * 9);
        onAddFood({ name, protein: roundedProtein, carbs: roundedCarbs, fats: roundedFats, calories, mealType });
        setName('');
        setProtein(0);
        setCarbs(0);
        setFats(0);
        setMealType('Breakfast');
    };

    return (
        <form onSubmit={handleSubmit} className="add-food-form">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Food Name" required className="input-field" />
            <input type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} placeholder="Protein" required className="input-field" />
            <input type="number" value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} placeholder="Carbs" required className="input-field" />
            <input type="number" value={fats} onChange={(e) => setFats(Number(e.target.value))} placeholder="Fats" required className="input-field" />
            <select value={mealType} onChange={(e) => setMealType(e.target.value as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks')} className="select-field">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
            </select>
            <button type="submit" className="submit-button">Add Food</button>
        </form>
    );
};

export default AddFoodForm;