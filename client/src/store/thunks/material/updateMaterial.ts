import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/utils/api";
import { IMaterial } from "../../../shared/types/Material";
import { config } from "../../../shared/configs/config";
import { User } from "../../../shared/types/User";

const host = config.API_BASE_URL;

type newMaterial = Partial<IMaterial>;

// Create an async thunk for the login API request
export const updateMaterial = createAsyncThunk(
  "material/update",
  async ({ data, user }: { data: newMaterial; user: User }, thunkAPI) => {
    try {
      const response = await api.put(
        `${host}/${user}/materials/${data.id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
