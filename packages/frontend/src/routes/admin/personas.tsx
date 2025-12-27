
import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/admin/personas')({
    component: AdminPersonas,
})

interface Persona {
    id: string
    name: string
    writingStyle: string
    expertise: string
    createdAt: string
    updatedAt: string
}

function AdminPersonas() {
    const [personas, setPersonas] = useState<Persona[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
    const [newPersona, setNewPersona] = useState({ name: '', writingStyle: '', expertise: '' })

    useEffect(() => {
        fetchPersonas()
    }, [])

    const fetchPersonas = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/personas')
            const data = await res.json()
            setPersonas(data)
        } catch (error) {
            console.error('Failed to fetch personas:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this persona?')) return
        try {
            const res = await fetch(`http://localhost:3000/api/personas/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                fetchPersonas()
            }
        } catch (error) {
            console.error('Failed to delete persona:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editingPersona
                ? `http://localhost:3000/api/personas/${editingPersona.id}`
                : 'http://localhost:3000/api/personas'

            const method = editingPersona ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPersona),
            })
            if (res.ok) {
                setIsOpen(false)
                setNewPersona({ name: '', writingStyle: '', expertise: '' })
                setEditingPersona(null)
                fetchPersonas()
            }
        } catch (error) {
            console.error('Failed to create/update persona:', error)
        }
    }

    const handleEdit = (persona: Persona) => {
        setEditingPersona(persona)
        setNewPersona({
            name: persona.name,
            writingStyle: persona.writingStyle,
            expertise: persona.expertise,
        })
        setIsOpen(true)
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setEditingPersona(null)
            setNewPersona({ name: '', writingStyle: '', expertise: '' })
        }
    }

    return (
        <div className="space-y-4 p-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Personas</h2>
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setEditingPersona(null)
                            setNewPersona({ name: '', writingStyle: '', expertise: '' })
                        }}>Add Persona</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingPersona ? 'Edit Persona' : 'Add New Persona'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newPersona.name}
                                    onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="writingStyle">Writing Style</Label>
                                <Textarea
                                    id="writingStyle"
                                    value={newPersona.writingStyle}
                                    onChange={(e) => setNewPersona({ ...newPersona, writingStyle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">Expertise</Label>
                                <Textarea
                                    id="expertise"
                                    value={newPersona.expertise}
                                    onChange={(e) => setNewPersona({ ...newPersona, expertise: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {editingPersona ? 'Update Persona' : 'Create Persona'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Writing Style</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {personas.map((persona) => (
                            <TableRow key={persona.id}>
                                <TableCell className="font-medium">{persona.name}</TableCell>
                                <TableCell className="max-w-xs truncate">{persona.writingStyle}</TableCell>
                                <TableCell className="max-w-xs truncate">{persona.expertise}</TableCell>
                                <TableCell>{new Date(persona.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(persona)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(persona.id)}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {personas.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No personas found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
