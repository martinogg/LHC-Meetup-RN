export interface IUserInterest {
    title: string,
    description: string
}

export interface IUser {
    userName: string,
    userLocation: string,
    userContact: string,
    userInterests: IUserInterest[],
}

export interface IUserFromFirebase {
    id: string,
    user: IUser
}

export class User {

    public static create(name: string, location: string, contact: string, interests: IUserInterest[]): IUser {

        const ret: IUser = {
            userName: name,
            userLocation: location,
            userContact: contact,
            userInterests: interests
        }

        return ret
    }
}

export class UserInterest {

    public static create(_title: string, _description: string): IUserInterest {

        const ret: IUserInterest = {
            title: _title,
            description: _description
        }

        return ret
    }
}