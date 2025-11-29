import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [data, setData] = useState<{ message: string } | null>(null)

    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then(setData)
            .catch(console.error)
    }, [])

    return (
        <div style={{ padding: '10px' }}>
            <h3>Welcome to the Monorepo!</h3>
            <p>Backend says: {data ? data.message : 'Loading...'}</p>
        </div>
    )
}
