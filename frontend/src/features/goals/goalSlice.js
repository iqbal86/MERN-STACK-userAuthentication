import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(text, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getGoals = createAsyncThunk(
  'goals/getGoals',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (goalID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(goalID, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isLoading = false
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id,
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  },
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
