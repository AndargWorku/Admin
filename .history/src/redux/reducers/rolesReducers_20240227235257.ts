import { createSlice } from '@reduxjs/toolkit';
import { fetchRoles, createRole, updateRole, deleteRole } from "../actions/rolesActions"
//  '../redux/actions/rolesActions';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Assuming permission IDs are stored in an array
  default: boolean;
}

interface RolesState {
  roles: Role[];
}

const initialState: RolesState = {
  roles: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {}, // You can add reducers if needed
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.roles.push(action.payload);
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      const updatedRole = action.payload;
      const index = state.roles.findIndex((r) => r.id === updatedRole.id);
      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      const deletedRoleId = action.payload;
      state.roles = state.roles.filter((r) => r.id !== deletedRoleId);
    });
  },
});

export default rolesSlice.reducer;
