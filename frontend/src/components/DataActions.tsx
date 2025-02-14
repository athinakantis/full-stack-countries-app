import { Pencil, Trash2 } from 'lucide-react';
import { TestData } from '../types/test';

interface DataActionsProps {
    row: TestData;
    onEdit: (data: TestData) => void;
    onDelete: () => void;
}

export const DataActions = ({ row, onEdit, onDelete }: DataActionsProps) => {
    return (
        <>
            <div>
                <h3>Edit</h3>
                <button onClick={() => onEdit(row)}>
                    <Pencil />
                </button>
            </div>
            <div>
                <h3>Delete</h3>
                <button onClick={() => onDelete()}>
                    <Trash2 />
                </button>

            </div>
        </>
    );
};
