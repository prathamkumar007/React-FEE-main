import jwt_decode from 'jwt-decode';

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return 'guest';
    
    try {
        const decoded = jwt_decode(token);
        return decoded.role || 'user';
    } catch (error) {
        console.error('Error decoding token:', error);
        return 'guest';
    }
};

export const isAdmin = () => {
    return getUserRole() === 'admin';
};

export const requireAdmin = (navigate) => {
    if (!isAdmin()) {
        navigate('/');
        return false;
    }
    return true;
};
