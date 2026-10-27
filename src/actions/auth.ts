'use server'

import { apiFetch } from '@/lib/api'
import { User } from '@/types/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface LoginApiResponse {
  token: string;
  user: User
}

export async function loginAction(email: string, password: string) {
  try {
    
    const response = await apiFetch<LoginApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    ;(await cookies()).set({
      name: 'auth_token',
      value: response.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 1
    })

    ;(await cookies()).set({
      name: 'user_data', 
      value: JSON.stringify(response.user),
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 1
    })

    return { success: true, user: response.user };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function registerAction(name: string, email: string, password: string, role: string) {
  try {
    await apiFetch<LoginApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role })
    })

    redirect('/login')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro na requisição';
    return { success: false, message };
  }
}

export async function logoutAction() {
  (await cookies()).delete('auth_token')
  ;(await cookies()).delete('user_data')

  redirect('/login')
}

export async function getTokenAndDataAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value 
  const userStored = cookieStore.get("user_data")?.value 

  const user = userStored ? (JSON.parse(userStored) as User) : null;

  return { user, token} 
}