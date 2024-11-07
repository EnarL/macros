import React from 'react';
import { Typography, Box } from '@mui/material';

interface Food {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

interface FoodSummaryProps {
    foods: Food[];
    mealType?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
}

const FoodSummary: React.FC<FoodSummaryProps> = ({ foods, mealType }) => {
    const filteredFoods = mealType ? foods.filter(food => food.mealType === mealType) : foods;
    const totalProtein = filteredFoods.reduce((sum, food) => sum + food.protein, 0);
    const totalCarbs = filteredFoods.reduce((sum, food) => sum + food.carbs, 0);
    const totalFats = filteredFoods.reduce((sum, food) => sum + food.fats, 0);
    const totalCalories = filteredFoods.reduce((sum, food) => sum + food.calories, 0);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Protein: {totalProtein}g</Typography>
            <Typography>Carbs: {totalCarbs}g</Typography>
            <Typography>Fats: {totalFats}g</Typography>
            <Typography>Calories: {totalCalories}</Typography>
        </Box>
    );
};

export default FoodSummary;