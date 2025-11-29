import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [data, setData] = useState<{ message: string } | null>(null)

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '/api'
        fetch(`${apiUrl}/hello`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error)
    }, [])

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-2xl font-bold">Welcome to the Monorepo!</h3>
            <p className="text-muted-foreground">Backend says: {data ? data.message : 'Loading...'}</p>
            <Button onClick={() => alert('Clicked!')}>Click me</Button>
        </div>
    )
}
