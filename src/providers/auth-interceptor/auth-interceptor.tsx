"use client";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/services';

export function AuthInterceptor() {
    const { data: session } = useSession();

    useEffect(() => {
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {
                if (session?.accessToken) {
                    config.headers.Authorization = `Bearer ${session.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    console.error("Não autorizado. Redirecionando...");
                    window.location.href = "/";
                }
                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.response.eject(responseInterceptor);
        };
    }, [session]);

    return null;
}