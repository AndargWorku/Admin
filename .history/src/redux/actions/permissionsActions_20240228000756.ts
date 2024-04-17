import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your actual backend endpoint
const API_ENDPOINT = 'https://sheba-app.onrender.com/api/permissions';

interface Permission {
  id: string;
  name: string;
  description: string;
}

export const fetchPermissions = createAsyncThunk<Permission[]>('permissions/fetchPermissions', async () => {
  const response = await fetch(`${API_ENDPOINT}/all`);
  const data = await response.json();
  return data.permissions;
});

export const createPermission = createAsyncThunk<Permission, { name: string, description: string }>(
  'permissions/createPermission',
  async (payload) => {
    const response = await fetch(`${API_ENDPOINT}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  }
);

export const updatePermission = createAsyncThunk<Permission, { id: string, data: { name: string, description: string } }>(
  'permissions/updatePermission',
  async (payload) => {
    const response = await fetch(`${API_ENDPOINT}/${payload.id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.data),
    });
    const data = await response.json();
    return data;
  }
);

export const deletePermission = createAsyncThunk('permissions/deletePermission', async (permissionId: string) => {
  const response = await fetch(`${API_ENDPOINT}/${permissionId}/delete`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});
