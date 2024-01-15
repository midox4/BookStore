import { useEffect, useState } from "react";
import Api from "../Api/axios";

const useFetch  = (url) =>  {
  const [load, setload] = useState(false);
  const [error, setError] = useState(false);
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setload(true);
      try {
        const { data: allBooks } = await Api.get(url);
        setDATA(allBooks);
      } catch (err) {
        setError(err);
      }
      setload(false);
    };
    fetchData();
  }, [url]);

  return { DATA, load, error };
}

export default useFetch
