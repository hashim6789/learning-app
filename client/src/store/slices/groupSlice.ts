import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sampleGroups } from "../../shared/sample/sampleGroups";
import { string } from "zod";

const learners = ["Alice", "John Doe", "Mark", "Sarah"];
const mentor = { name: "Prof. Smith", expertise: "Web Development" };
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Group {
  _id: string;
  title: string;
  thumbnail: string;
  memberCount: number;
  mentor: User | null;
  learners: User[];
}

interface GroupState {
  groups: Group[];
  selectedGroupId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  //   groups: [],
  groups: [],
  selectedGroupId: null,
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    fetchGroupsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsSuccess(state, action: PayloadAction<Group[]>) {
      state.loading = false;
      state.groups = action.payload;
    },
    fetchGroupsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    updateGroup(state, action: PayloadAction<Group>) {
      const index = state.groups.findIndex(
        (group) => group._id === action.payload._id
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup(state, action: PayloadAction<string>) {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload
      );
    },
    selectGroup(state, action: PayloadAction<string>) {
      state.selectedGroupId = action.payload;
    },
  },
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  addGroup,
  updateGroup,
  deleteGroup,
  selectGroup,
} = groupSlice.actions;

export default groupSlice.reducer;
