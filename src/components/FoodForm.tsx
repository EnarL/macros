import React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

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
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleAddFood: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ newFood, handleInputChange, handleAddFood }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <TextField
                label="Name"
                name="name"
                value={newFood.name}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mr: 2, mb: 2, '& .MuiInputBase-input': { color: '#ffffff' } }}
            />
            <TextField
                label="Protein"
                name="protein"
                value={newFood.protein}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mr: 2, mb: 2, '& .MuiInputBase-input': { color: '#ffffff' } }}
            />
            <TextField
                label="Carbs"
                name="carbs"
                value={newFood.carbs}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mr: 2, mb: 2, '& .MuiInputBase-input': { color: '#ffffff' } }}
            />
            <TextField
                label="Fats"
                name="fats"
                value={newFood.fats}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mr: 2, mb: 2, '& .MuiInputBase-input': { color: '#ffffff' } }}
            />
            <TextField
                select
                label="Meal Type"
                name="mealType"
                value={newFood.mealType}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mr: 2, mb: 2, '& .MuiInputBase-input': { color: '#ffffff' } }}
            >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snacks">Snacks</MenuItem>
            </TextField>
            <Button onClick={handleAddFood} variant="contained" color="primary">
                Add Food
            </Button>
        </Box>
    );
};

export default FoodForm;