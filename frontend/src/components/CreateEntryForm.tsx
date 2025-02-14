import { useState } from 'react';
import { supabase } from '../config/supabase';
import { Send } from 'lucide-react';

interface CreateEntryFormProps {
    onSuccess: () => void;
}

export const CreateEntryForm = ({ onSuccess }: CreateEntryFormProps) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('protected_data')
                .insert([{ name, description, is_active: true }])
                .select();

            if (error) throw Error;
            setName('');
            setDescription('');

            onSuccess()
        } catch (error) {
            const err = error as { message: string; code?: string };
            let errorMessage = err.message;
            if (err.code === '42501') {
                errorMessage =
                    'Authentication error, please try logging out and back in again';
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="nameInput">Name: </label>
            <input
                type='text'
                id='nameInput'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="descriptionInput">Description: </label>
            <input
                type='text'
                id='descriptionInput'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {error && <div className='error'>{error}</div>}
            {isSubmitting && <div>Submitting...</div>}
            <button type='submit'>
                Submit
                <Send />
            </button>
        </form>
    );
};
