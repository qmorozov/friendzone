import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMultiSelectItem } from '../../../UI/components/MultiSelect';

export interface IUserLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  accuracy: string;
}

export interface IAuthState {
  signed: boolean;
  loading: boolean;
  user: {
    phone: string;
    email: string;
    lastName: string;
    pictures: string[];
    hobbies: string[];
    username: string;
    firstName: string;
    likesCount: number;
    languages: string[];
    description: string;
    socialMedia: string[];
    location: IUserLocation;
    settings: {
      isDarkModeForced: boolean;
    };
  };
}

const initialState: IAuthState = {
  signed: false,
  loading: false,
  user: {
    phone: '',
    email: '',
    pictures: [],
    hobbies: [],
    lastName: '',
    username: '',
    likesCount: 0,
    location: {
      city: '',
      country: '',
      latitude: 0,
      longitude: 0,
      accuracy: '',
    },
    languages: [],
    firstName: '',
    description: '',
    socialMedia: [],
    settings: {
      isDarkModeForced: false,
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state: IAuthState) => {
      state.signed = true;
    },

    signOut: (state: IAuthState) => {
      state.signed = false;
      state.loading = false;
      state.user = initialState.user;
    },

    setLoading: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    updateProfile: (
      state: IAuthState,
      action: PayloadAction<Partial<IAuthState['user']>>
    ) => {
      state.user = { ...state.user, ...action.payload };
    },

    updateSettings: (
      state: IAuthState,
      action: PayloadAction<Partial<IAuthState['user']['settings']>>
    ) => {
      state.user.settings = { ...state.user.settings, ...action.payload };
    },

    updateLikesCount: (state: IAuthState, action: PayloadAction<number>) => {
      state.user.likesCount = action.payload;
    },
  },
});

export const {
  signIn,
  signOut,
  setLoading,
  updateProfile,
  updateSettings,
  updateLikesCount,
} = authSlice.actions;
export default authSlice;
