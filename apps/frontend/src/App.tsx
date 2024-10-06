import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

import { trpc } from "./trpc";
import UserTable from "./components/UserTable";

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
          <h1 className='text-3xl font-bold mb-4'>User Management</h1>
          <UserTable />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
