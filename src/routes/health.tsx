import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '../../client-trpc'


export const Route = createFileRoute('/health')({
    loader: async () => {
        return trpc.hello.query()
    },
    component: RouteComponent
})

function RouteComponent() {
    const data = Route.useLoaderData();
    return (
        <>
            <h1>Health</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}
