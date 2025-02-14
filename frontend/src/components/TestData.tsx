import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchTestData,
    selectTestData,
    selectTestError,
} from '../store/slices/testSlice';
import { DynamicTable } from './DynamicTable';

// interface TestResponse {
//   status: string;
//   data: Array<Record<string, unknown>>;
//   timestamp: string;
// }

export const TestData = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectTestData);
    const error = useAppSelector(selectTestError);

    // Redux implementation
    useEffect(() => {
        dispatch(fetchTestData());
    }, [dispatch]);

    //   const [data, setData] = useState<TestResponse | null>(null);
    //   const [error, setError] = useState<string | null>(null);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch("http://localhost:5001/test/supabase");
    //         const result = await response.json();

    //         if (result.error) {
    //           setError(result.error);
    //         } else {
    //           setData(result);
    //         }
    //       } catch (err) {
    //         setError(err instanceof Error ? err.message : "An error occurred");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    if (error) {
        return (
            <div className='error-container'>
                <p className='info error'>{error}</p>
            </div>
        );
    }

    return (
        <div id='test-data-container' className='content-container'>
            <div id='table-details'>
                <h2>Test Data</h2>
                <p>
                    Status: Connected | Last Updated:{' '}
                    {new Date().toLocaleString()}
                </p>
            </div>
            {data.length > 0 && <DynamicTable data={data} />}
        </div>
    );
};
