import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, CssBaseline, ThemeProvider, createTheme, Stack } from '@mui/material';
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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0D3B66', // Darker blue color
            paper: '#0D3B66', // Darker blue color
        },
        primary: {
            main: '#23B5D3', // Light Blue
        },
        secondary: {
            main: '#75ABBC', // Another shade of blue
        },
        text: {
            primary: '#ffffff', // White
            secondary: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Roboto, Montserrat, sans-serif',
        h3: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
        },
        body1: {
            fontFamily: 'Roboto, sans-serif',
        },
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: '#000000', // Black text color for input fields
                },
            },
        },
    },
});

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFood = { ...newFood, [name]: name === 'name' || name === 'mealType' ? value : parseInt(value) || 0 };

        if (name === 'protein' || name === 'carbs' || name === 'fats') {
            updatedFood.calories = (updatedFood.protein * 4) + (updatedFood.carbs * 4) + (updatedFood.fats * 9);
        }

        setNewFood(updatedFood);
    };

    const handleAddFood = () => {
        axios.post<Food>('http://localhost:3000/foods', newFood)
            .then(response => {
                setFoods([...foods, response.data]);
                setNewFood({
                    name: '',
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    calories: 0,
                    mealType: 'Breakfast',
                });
            })
            .catch(error => console.error('Error adding food:', error));
    };

    const handleDeleteFood = (id: string) => {
        axios.delete(`http://localhost:3000/foods/${id}`)
            .then(() => setFoods(foods.filter(food => food._id !== id)))
            .catch(error => console.error('Error deleting food:', error));
    };

    const mealTypes: ('Breakfast' | 'Lunch' | 'Dinner' | 'Snacks')[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Macro Tracker
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 4, mb: 4, color: 'text.secondary' }}>
                    <FoodForm newFood={newFood} handleInputChange={handleInputChange} handleAddFood={handleAddFood} />
                </Paper>
                <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                    {mealTypes.map(mealType => (
                        <Paper key={mealType} elevation={3} sx={{ p: 4 }}>
                            <Stack spacing={2}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {mealType}
                                </Typography>
                                <FoodSummary foods={foods} mealType={mealType} />
                                <FoodList foods={foods} mealType={mealType} handleDeleteFood={handleDeleteFood} />
                            </Stack>
                        </Paper>
                    ))}
                </Box>
                <Box mt={4}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <FoodSummary foods={foods} />
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default HomePage;