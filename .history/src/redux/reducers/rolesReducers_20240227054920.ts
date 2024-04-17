// roles/reducers.ts

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.roles.push(action.payload.role);
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      const updatedRole = action.payload.role;
      const index = state.roles.findIndex((r) => r.id === updatedRole.id);
      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      const deletedRoleId = action.payload.roleId;
      state.roles = state.roles.filter((r) => r.id !== deletedRoleId);
    });
  },
});

export default rolesSlice.reducer;
