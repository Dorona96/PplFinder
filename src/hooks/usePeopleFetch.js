import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  let offSet = 0;

  async function fetchUsers() {
    setIsLoading(true);

    const response = await axios.get(
      `https://randomuser.me/api/?results=25&offSet=${offSet}`
    );
    setUsers([...users, ...response.data.results]);
    setIsLoading(false);
    setIsFetching(false)
    offSet += 25;
  }
  function isScrolling() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    } else {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching){
      fetchUsers();
    }
  }, [isFetching]);
  return {
    users,
    isLoading,
    fetchUsers,
  };
};
