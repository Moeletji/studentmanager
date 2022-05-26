export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    jobTitle: string;
    imageUrl: string;
    userCode: string;
    courses?: string[];
}