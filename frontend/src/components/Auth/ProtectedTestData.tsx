import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { TestData } from '../../types/test'
import { supabase } from '../../config/supabase';
import { DynamicTable } from '../DynamicTable';
import { CreateEntryForm } from '../CreateEntryForm';
import { Spinner } from '../Spinner';
import { Error } from '../Error';

export const ProtectedTestData = () => {
    const [data, setData] = useState<TestData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuth();

    const fetchProtectedData = async () => {
        try {
            const { data: protectedData, error } = await supabase
                .from('protected_data')
                .select('*')
            if (error) throw error;
            setData(protectedData)
        } catch (error) {
            setError("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProtectedData()
    }, [])

    if (loading) return <Spinner />
    if (error) return <Error error={error} />

    return (
        <div id='protected-data-container' className='content-container'>
            <h2>This data is only accessible to authenticated users</h2>
            <h3>Logged in as {user!.user_metadata.full_name}</h3>
            <CreateEntryForm onSuccess={fetchProtectedData} />
            {data.length > 0 ? <DynamicTable data={data} /> : <p>No protected data available, please create some</p>}
        </div>
    );
};
