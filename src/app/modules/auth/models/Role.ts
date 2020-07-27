export enum Role { 
    Admin = 0,
    Manager = 1,
    Guest = 2 
}

export namespace Role {
    export function values() {
      return Object.keys(Role).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
}