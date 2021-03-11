
//User Interface type Allows keep track of User type being passed around the application
export interface UserInterface{
    _id?:string;
    name:string,
    password?:string,
    email:string, 
    googleId?:string
}