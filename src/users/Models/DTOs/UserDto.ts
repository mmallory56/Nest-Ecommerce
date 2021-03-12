import { UserRoles } from "src/users/enums/rolesEnum";

export interface UserDto{

    username:string;
    
    email:string;
    role?:UserRoles[];

}