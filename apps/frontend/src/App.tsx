import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { trpc } from "./trpc";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUser";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className='p-4'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <h1 className='text-4xl font-bold mb-4'>User Management</h1>
                  <AddUserForm />
                  <UserTable />
                </>
              }
            />
            <Route path='/user-profile/:id' element={<UserProfile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
