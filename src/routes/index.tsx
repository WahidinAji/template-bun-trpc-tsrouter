import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '../../client-trpc'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    try {
      return await trpc.shoulderr.query();
    } catch (error) {
      console.error(error);
    }
  },
  onError: (error) => {
    console.error('Query error:', error);
    // Display a toast notification or update UI based on the error
  },
})

function Index() {
  const data = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}