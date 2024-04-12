import axios from "axios";
import { useEffect } from "react";
import { useState } from 'react';

const useFetch = (url) =>{
    const [data, setData] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(url);
                setLoading(true);
                setData(data);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    const reFetch = async () => {
        try {
          setLoading(true);
          const res = await axios.get(url);
          setData(res.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    
      return { data, loading, error, reFetch, setData, setLoading };
}



export default useFetch;