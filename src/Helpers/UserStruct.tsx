export interface IUser {
    userName: string,
    userLocation: string,
    userContact: string,
    userInterests: string,
}

export interface IUserFromFirebase {
    id: string,
    user: IUser
}

export class User {

    public static create(name: string, location: string, contact: string, interests: string): IUser {

        const ret: IUser = {
            userName: name,
            userLocation: location,
            userContact: contact,
            userInterests: interests
        }

        return ret
    }
}