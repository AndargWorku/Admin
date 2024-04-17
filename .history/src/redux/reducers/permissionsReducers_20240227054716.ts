// permissions/reducers.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
    });
    builder.addCase(createPermission.fulfilled, (state, action) => {
      state.permissions.push(action.payload.permission);
    });
    builder.addCase(updatePermission.fulfilled, (state, action) => {
      const updatedPermission = action.payload.permission;
      const index = state.permissions.findIndex((p) => p.id === updatedPermission.id);
      if (index !== -1) {
        state.permissions[index] = updatedPermission;
      }
    });
    builder.addCase(deletePermission.fulfilled, (state, action) => {
      const deletedPermissionId = action.payload.permissionId;
      state.permissions = state.permissions.filter((p) => p.id !== deletedPermissionId);
    });
  },
});

export default permissionsSlice.reducer;
