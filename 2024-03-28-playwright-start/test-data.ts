interface User {
    username: string | undefined,
    password: string | undefined
}

interface Api {
    url: string | undefined,
    key: string | undefined
}

export const USER: User = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
}

export const API: Api = {
    url: process.env.API_URL,
    key: process.env.API_KEY
}

export const URL: string | undefined = process.env.URL;

export const API_URL: string | undefined = process.env.API_URL;

export const API_KEY: string | undefined = process.env.API_KEY;
