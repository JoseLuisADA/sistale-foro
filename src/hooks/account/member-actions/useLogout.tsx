"use client"
import { useUserContext } from '../../../context/UserContext'; // Ajusta la ruta según sea necesario

const useLogout = () => {
    const { setUser } = useUserContext()

    const logout = async () => {
        try {
            const response = await fetch('/api/account/member-actions/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const data = await response.json();
            setUser({username: '', role: '', token: ''})

            if (!response.ok) {
                throw new Error(data.message || 'Failed to log out');
            }
            
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return { logout };
};

export default useLogout;
