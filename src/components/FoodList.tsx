import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
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
        <Box>
            <List>
                {filteredFoods.map(food => (
                    <ListItem key={food._id} sx={{ border: 1, mb: 2 }}>
                        <ListItemText
                            primary={`${food.name} - ${food.protein}g Protein, ${food.carbs}g Carbs, ${food.fats}g Fats, ${food.calories} Calories`}
                        />
                        <IconButton onClick={() => handleDeleteFood(food._id!)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FoodList;