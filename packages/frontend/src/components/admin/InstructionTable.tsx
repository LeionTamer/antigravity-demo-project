import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Pencil, Trash2 } from 'lucide-react'

interface Instruction {
    id: string
    name: string
    content: string
    createdAt: string
    updatedAt: string
}

export function InstructionTable() {
    const [instructions, setInstructions] = useState<Instruction[]>([])
    const [isInstructionOpen, setIsInstructionOpen] = useState(false)
    const [editingInstruction, setEditingInstruction] = useState<Instruction | null>(null)
    const [newInstruction, setNewInstruction] = useState({ name: '', content: '' })

    useEffect(() => {
        fetchInstructions()
    }, [])

    const fetchInstructions = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/instructions')
            const data = await res.json()
            setInstructions(data)
        } catch (error) {
            console.error('Failed to fetch instructions:', error)
        }
    }

    const handleDeleteInstruction = async (id: string) => {
        if (!confirm('Are you sure you want to delete this instruction?')) return
        try {
            const res = await fetch(`http://localhost:3000/api/instructions/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                fetchInstructions()
            }
        } catch (error) {
            console.error('Failed to delete instruction:', error)
        }
    }

    const handleSubmitInstruction = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editingInstruction
                ? `http://localhost:3000/api/instructions/${editingInstruction.id}`
                : 'http://localhost:3000/api/instructions'

            const method = editingInstruction ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInstruction),
            })
            if (res.ok) {
                setIsInstructionOpen(false)
                setNewInstruction({ name: '', content: '' })
                setEditingInstruction(null)
                fetchInstructions()
            } else {
                const text = await res.text();
                alert(text || "Failed to save instruction");
            }
        } catch (error) {
            console.error('Failed to create/update instruction:', error)
        }
    }

    const handleEditInstruction = (instruction: Instruction) => {
        setEditingInstruction(instruction)
        setNewInstruction({
            name: instruction.name,
            content: instruction.content,
        })
        setIsInstructionOpen(true)
    }

    const handleInstructionOpenChange = (open: boolean) => {
        setIsInstructionOpen(open)
        if (!open) {
            setEditingInstruction(null)
            setNewInstruction({ name: '', content: '' })
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mt-8">
                <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
                <Dialog open={isInstructionOpen} onOpenChange={handleInstructionOpenChange}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setEditingInstruction(null)
                            setNewInstruction({ name: '', content: '' })
                        }}>Add Instruction</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingInstruction ? 'Edit Instruction' : 'Add New Instruction'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmitInstruction} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="instruction-name">Name (Max 20 chars)</Label>
                                <Input
                                    id="instruction-name"
                                    maxLength={20}
                                    value={newInstruction.name}
                                    onChange={(e) => setNewInstruction({ ...newInstruction, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instruction-content">Instructions</Label>
                                <Textarea
                                    id="instruction-content"
                                    value={newInstruction.content}
                                    onChange={(e) => setNewInstruction({ ...newInstruction, content: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {editingInstruction ? 'Update Instruction' : 'Create Instruction'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-2">Name</TableHead>
                            <TableHead className="py-2">Instructions</TableHead>
                            <TableHead className="py-2">Created At</TableHead>
                            <TableHead className="py-2 w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {instructions.map((instruction) => (
                            <TableRow key={instruction.id}>
                                <TableCell className="font-medium py-2">{instruction.name}</TableCell>
                                <TableCell className="max-w-xs truncate py-2">{instruction.content}</TableCell>
                                <TableCell className="py-2">{new Date(instruction.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="py-2">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditInstruction(instruction)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteInstruction(instruction.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {instructions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">
                                    No instructions found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
