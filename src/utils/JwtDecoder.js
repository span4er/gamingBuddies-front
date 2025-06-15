import {jwtDecode} from 'jwt-decode';

// Функция для декодирования JWT-токена и проверки роли
export function isAdmin(token) {
   const decodedToken = jwtDecode(token);
   console.log(decodedToken);
   return decodedToken.usertypeid === 'ADMIN'; // Предположим, что роль хранит ключ userType
}