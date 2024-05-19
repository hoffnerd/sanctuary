"use client"

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";




export default function ClientProvider ({ children }) {

    const [ queryClient ] = useState(()=> new QueryClient({ 
        defaultOptions: { 
            queries: { 
                staleTime: 1000, 
                // refetchOnWindowFocus: true,
                // refetchInterval: 1000,
            }
        } 
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            {children}
        </QueryClientProvider>
    )
}