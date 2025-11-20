// import { initTRPC } from '@trpc/server';
// import { z } from 'zod';
// import { createHTTPServer } from "@trpc/server/adapters/standalone";

// type User = { id: string; name: string };
// // Imaginary database
// const users: User[] = [];
// export const db = {
//     user: {
//         findMany: async () => users,
//         findById: async (id: string) => users.find((user) => user.id === id),
//         create: async (data: { name: string }) => {
//             const user = { id: String(users.length + 1), ...data };
//             users.push(user);
//             return user;
//         },
//     },
// };



// export const t = initTRPC.create();
// const publicProcedure = t.procedure;
// export const appRouter = t.router({
//     userList: publicProcedure
//         .query(async () => {
//             const users = await db.user.findMany();
//             return users;
//         }),
//     userById: publicProcedure
//         .input(z.string())
//         .query(async (opts) => {
//             const { input } = opts;
//             const user = await db.user.findById(input);
//             return user;
//         }),
//     userCreate: publicProcedure
//         .input(z.object({ name: z.string() }))
//         .mutation(async (opts) => {
//             const { input } = opts;
//             const user = await db.user.create(input);
//             return user;
//         }),
// });
// // export type definition of API
// // export type AppRouter = typeof appRouter;

// export type AppRouter = typeof appRouter;

// const server = createHTTPServer({
//     router: appRouter,
// });

// server.listen(3000)


import { initTRPC, TRPCError } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

let id = 0;

const db = {
  posts: [
    {
      id: ++id,
      title: 'hello',
    },
  ],
};

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const postRouter = router({
  createPost: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      };
      db.posts.push(post);
      return post;
    }),
  listPosts: publicProcedure.query(() => db.posts),
});

export const appRouter = router({
  post: postRouter,
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `hello ${input ?? 'world'}`;
  }),
  shoulderr: publicProcedure.query(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'something went wrong',
      cause: new Error('something went wrong'),
    })
  })
});
export type AppRouter = typeof appRouter;

import cors from 'cors';
createHTTPServer({
  middleware: cors(),
  router: appRouter,
  basePath: "/trpc/"
}).listen(3000);

// import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// Bun.serve({
//   port: 3000,
//   fetch(req) {
//     if (req.method === 'HEAD') {
//       return new Response();
//     }

//     if (new URL(req.url).pathname === '/') {
//       return new Response('hello world');
//     }
//     return fetchRequestHandler({
//       endpoint: '/trpc',
//       req: req,
//       router: appRouter,
//       createContext: () => ({}),
//     });
//   }
// })


// // import { appRouter } from './router';

// Bun.serve({
//   port: 3000,
//   fetch(request) {
//     // Only used for start-server-and-test package that
//     // expects a 200 OK to start testing the server
//     if (request.method === 'HEAD') {
//       return new Response();
//     }

//     if (new URL(request.url).pathname === '/') {
//       return new Response('hello world');
//     }

//     return fetchRequestHandler({
//       endpoint: '/trpc',
//       req: request,
//       router: appRouter,
//       createContext: () => ({}),
//     });
//   },
// });