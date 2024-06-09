//sistaleforo-web-final/src/hooks/useGetUser.tsx
import { useEffect } from 'react';
import { useUserContext } from '../../../context/UserContext';

const useGetUser = () => {
  const { setUser } = useUserContext();
  const fetchUser = async () => {
    console.log("ENTRANDO EN EL HOOK useGetUser")
    try {
      const response = await fetch('/api/account/member-actions/getUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("response data HOOK useGetUser :");
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log("Error in HOOK useGetUser :");
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return { fetchUser }
};

export default useGetUser;
