export  class i18n{
    private constructor(){}
    static instance:i18n = new i18n();
    static readonly BAD_AUTH = 'Неверный логин или пароль.';
    static readonly USER_NOT_EXIST='Данного пользователя не существует!';
    static readonly USER_EXIST_UP_PASS='Данный пользователь уже существует. Пароль обнавлён.';
    static readonly DEFF_PASS='Пароль отличается';
    static readonly SELECT_ROW='Выберите строку.';
    static readonly USER_REGISTERED=(user:string)=>{
        return `Пользователь ${user} зарегистрирован.`
    }
    // private aList:string[]= [];
    // static addText =(text:string)=>{
    //     i18n.instance.aList.push(text);
    // }
}