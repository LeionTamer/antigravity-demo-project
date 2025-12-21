import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/admin/scholars/$scholarId')({
    component: ScholarForm,
})

function ScholarForm() {
    const { scholarId } = Route.useParams()
    const navigate = useNavigate()
    const isNew = scholarId === 'new'
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        expertise: '',
        writing_style: ''
    })

    useEffect(() => {
        if (!isNew) {
            const fetchScholar = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/scholars/${scholarId}`)
                    if (res.ok) {
                        const data = await res.json()
                        setFormData({
                            name: data.name,
                            expertise: data.expertise,
                            writing_style: data.writing_style
                        })
                    }
                } catch (error) {
                    console.error('Failed to fetch scholar', error)
                }
            }
            fetchScholar()
        }
    }, [scholarId, isNew])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = isNew
                ? 'http://localhost:3000/api/scholars'
                : `http://localhost:3000/api/scholars/${scholarId}`

            const method = isNew ? 'POST' : 'PUT'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                navigate({ to: '/admin' })
            } else {
                console.error('Failed to save scholar')
            }
        } catch (error) {
            console.error('Error saving scholar', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-2 md:p-4">
            <h2 className="text-2xl font-bold mb-6">{isNew ? 'Add New Scholar' : 'Edit Scholar'}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder="e.g. Marcus Aurelius"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="expertise">Expertise</Label>
                    <Textarea
                        id="expertise"
                        value={formData.expertise}
                        onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
                        required
                        className="min-h-[200px]"
                        placeholder="e.g. Stoicism, Philosophy"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="writing_style">Writing Style & Personality (Markdown)</Label>
                    <Textarea
                        id="writing_style"
                        value={formData.writing_style}
                        onChange={(e) => setFormData(prev => ({ ...prev, writing_style: e.target.value }))}
                        required
                        className="min-h-[200px]"
                        placeholder="Describe how this scholar writes and behaves..."
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate({ to: '/admin' })}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Scholar'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
