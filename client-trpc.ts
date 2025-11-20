import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouter } from './server.ts'


// const proxy = createTRPCClient<AppRouter>({
//     links: [loggerLink(), httpBatchLink({ url: 'http://localhost:3000/trpc' })],
//   })

export const trpc = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      // since we are using Vite, the server is running on the same port,
      // this means in dev the url is `http://localhost:3000/trpc`
      // and since its from the same origin, we don't need to explicitly set the full URL
    //   url: '/trpc',
      url: 'http://127.0.0.1:3000/trpc',
    }),
  ],
})