// roles/actions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your actual backend endpoint
const API_ENDPOINT = 'https://sheba-app.onrender.com/api/roles';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await fetch(API_ENDPOINT);
  const data = await response.json();
  return data.roles;
});

export const createRole = createAsyncThunk('roles/createRole', async (payload: any) => {
  const response = await fetch(API_ENDPOINT + '/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
});

export const updateRole = createAsyncThunk('roles/updateRole', async (payload: any) => {
  const response = await fetch(`${API_ENDPOINT}/${payload.id}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.data),
  });
  const data = await response.json();
  return data;
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (roleId: string) => {
  const response = await fetch(`${API_ENDPOINT}/${roleId}/delete`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
});
