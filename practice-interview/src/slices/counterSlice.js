import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    count: 0,
    loading: false,
    error: null,
    data: null
}

// Async Thunk for API call
export const fetchCounterData = createAsyncThunk(
    'counter/fetchCounterData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch data');
        }
    }
);

// Async Thunk for incrementing via API
export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async (amount, { rejectWithValue }) => {
        try {
            // Simulating API call
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                amount,
                title: 'test'
            });
            return amount;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to increment');
        }
    }
);

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        },
        decremantByAmount: (state, action) => {
            state.count -= action.payload
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Counter Data - Pending
        builder.addCase(fetchCounterData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Fetch Counter Data - Fulfilled
        builder.addCase(fetchCounterData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        // Fetch Counter Data - Rejected
        builder.addCase(fetchCounterData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'An error occurred';
        });

        // Increment Async - Pending
        builder.addCase(incrementAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Increment Async - Fulfilled
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.count += action.payload;
            state.error = null;
        });
        // Increment Async - Rejected
        builder.addCase(incrementAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to increment';
        });
    }
})

export const { increment, decrement, incrementByAmount, decremantByAmount, clearError } = counterSlice.actions;

export default counterSlice.reducer;