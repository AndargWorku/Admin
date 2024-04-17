import { createSlice } from '@reduxjs/toolkit';
import { fetchPermissions, createPermission, updatePermission, deletePermission } from '../redux/actions/permissionsActions';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionsState {
  permissions: Permission[];
}

const initialState: PermissionsState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {}, // You can add reducers if needed
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
    });
    builder.addCase(createPermission.fulfilled, (state, action) => {
      state.permissions.push(action.payload);
    });
    builder.addCase(updatePermission.fulfilled, (state, action) => {
      const updatedPermission = action.payload;
      const index = state.permissions.findIndex((p) => p.id === updatedPermission.id);
      if (index !== -1) {
        state.permissions[index] = updatedPermission;
      }
    });
    builder.addCase(deletePermission.fulfilled, (state, action) => {
      const deletedPermissionId = action.payload;
      state.permissions = state.permissions.filter((p) => p.id !== deletedPermissionId);
    });
  },
});

export default permissionsSlice.reducer;
