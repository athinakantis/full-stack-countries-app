import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {TestData} from '../../types/test'
import { supabase } from '../../config/supabase';
import { DynamicTable } from '../DynamicTable';
import { CreateEntryForm } from '../CreateEntryForm';

export const ProtectedTestData = () => {
    const [data, setData] = useState<TestData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuth();
    console.log(user);

    const fetchProtectedData = async() => {
        try {
            const { data: protectedData, error } = await supabase
            .from('protected_data')
            .select('*')
            if (error) throw error;
            setData(protectedData)
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occured")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProtectedData()
    }, [])
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div id='protected-data-container' className='content-container'>
            <h2>This data is only accessible to authenticated users</h2>
            <h3>Logged in as {user!.user_metadata.full_name}</h3>
            <CreateEntryForm onSuccess={fetchProtectedData} />
            {data.length > 0 ? <DynamicTable data={data}/> : <p>No protected data available, please create some</p>}
        </div>
    );
};
