// api.ts
import request from "./request";

const login= ({username,password}:{username:string,password:string}) => request.get(`/60bc4bde4a9639001d42754a/example/test`, {username,password})

export {
    login
}

