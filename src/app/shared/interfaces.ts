export interface IUser {
    login:string;
    password:string;
}
export interface ITask {
    name:string;
    dateStart:Date;
    dateEnd: Date;
    priority:number;
    category:string;
    creator:string;
    complete:boolean;
    id:number;
}
export interface IFilter{
    [key:string]:string|boolean;
}
export interface ICategory {
    key:string|null;
    value:string;
  }