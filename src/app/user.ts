export interface User {
    id: number;
    name: string
    role: 'USER' | 'ADMIN'
    loggedIn: boolean
}

export const newUser: User = {
    id: 0,
    name: 'Grzeogrz',
    role: 'USER',
    loggedIn: false
}