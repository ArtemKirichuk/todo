export interface ifUser {
    login:string
    password:string
}
export interface ifTask {
    name:string
    dateStart:Date
    dateEnd: Date
    priority:number
    category:string
    creator:string
    complete:boolean
}
export interface ifFilter{
    [key:string]:string|boolean
}