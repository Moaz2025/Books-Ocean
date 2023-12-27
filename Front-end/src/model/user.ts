export interface IUser{
    firstName:string
    lastName:string
    email:string
    password:string
}
export interface IBuyer extends IUser{
    address?:string;
}
export interface IAdmin extends IUser{
    phone?:string
}
export class User{
    private info!:IUser;
    constructor(info:IUser){
        this.info = info;
    }
    login():void{
        
    }
}
export interface UserCredentials{
    userType:string
    email:string
    token:string
}

export interface GetBuyersResponse{
    massage: string
    buyersList?: IUser[]
}