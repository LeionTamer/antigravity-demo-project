import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { SelectScholar } from 'shared'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash, Edit, Plus } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
    component: AdminDashboard,
})

function AdminDashboard() {
    const [scholars, setScholars] = useState<SelectScholar[]>([])

    const fetchScholars = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/scholars')
            if (res.ok) {
                const data = await res.json()
                setScholars(data)
            }
        } catch (error) {
            console.error('Failed to fetch scholars', error)
        }
    }

    useEffect(() => {
        fetchScholars()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this scholar?')) return

        try {
            const res = await fetch(`http://localhost:3000/api/scholars/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setScholars(scholars.filter(s => s.id !== id))
            }
        } catch (error) {
            console.error('Failed to delete scholar', error)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Scholars</h2>
                <Link to="/admin/scholars/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Scholar
                    </Button>
                </Link>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scholars.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                    No scholars found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            scholars.map((scholar) => (
                                <TableRow key={scholar.id}>
                                    <TableCell className="font-medium">{scholar.name}</TableCell>
                                    <TableCell>{scholar.expertise}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/scholars/${scholar.id}`}>
                                                <Button variant="outline" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(scholar.id)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
