import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import api from '@/lib/axios';
import { message } from "antd";
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// --- SIGNUP ---
export const signup = createAsyncThunk(
  'auth/signup',
  async (
    formData: { name: string; email: string; password: string; password_confirmation: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/signup', formData);
      return res.data.user;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string | Record<string, string[]> } } };

      if (error.response?.data?.message && typeof error.response.data.message === 'object') {
        const allErrors = Object.values(error.response.data.message).flat();
        return thunkAPI.rejectWithValue(allErrors); // return array
      }

      return thunkAPI.rejectWithValue([error.response?.data?.message || 'Signup failed']);
    }
  }
);


// --- LOGIN ---
export const login = createAsyncThunk(
  'auth/login',
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post('/login', formData);
      return res.data.user;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string | Record<string, string[]> } } };
      
      // Handle Laravel validation errors (422 status)
      if (error.response?.data?.message && typeof error.response.data.message === 'object') {
        // Extract all validation error messages
        const allErrors = Object.values(error.response.data.message).flat();
        const errorMessage = allErrors.join(', ');
        return thunkAPI.rejectWithValue(errorMessage || "Validation failed");
      }
      
      // Handle other errors
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// --- LOGOUT ---
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/logout');
      return true;
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// --- GET AUTH USER ---
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/user');
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(state.user);
        state.isAuthenticated = true;
        state.error = null;
        notification.success({
          message: 'Account Created Successfully!',
          description: `Welcome ${action.payload.name}! Your account has been created.`,
          placement: 'topRight',
        });
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notification.error({
          message: 'Signup Failed',
          description: action.payload as string,
          placement: 'topRight',
        });
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        notification.success({
          message: 'Login Successful!',
          description: `Welcome back, ${action.payload.name}!`,
          placement: 'topRight',
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notification.error({
          message: 'Login Failed',
          description: action.payload as string,
          placement: 'topRight',
        });
      })
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
