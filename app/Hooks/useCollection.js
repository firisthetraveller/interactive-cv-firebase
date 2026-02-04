import { useEffect, useState } from "react";
import { projectFirestore } from '../firebase/config';

const useCollection = (collection) => {
    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        const unsubscribe = ref.onSnapshot(snapshot => {
            setPending(true);

            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            })

            // update state
            setData(results);
            setPending(false);
            setError(null);
        }, error => {
            setData(null);
            setPending(false);
            setError('Could not fetch the data.');
        })

        // unsubscribe on unmount
        return () => unsubscribe();
    }, [collection]);

    return { data, isPending, error };
}

export default useCollection;