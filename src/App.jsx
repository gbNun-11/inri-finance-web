import { Button } from './components/ui/button'

const App = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-900">
      <h1 className="text-4xl font-bold">Finance Web</h1>
      <Button className="ml-4" variant="outline">
        Get Started
      </Button>
    </main>
  )
}

export default App
