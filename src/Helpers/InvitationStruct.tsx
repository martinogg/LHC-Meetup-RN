export interface IInvitation {
    from: string,
    to: string,
    reason: string
}

export interface IInvitationFromFirebase {
    id: string,
    invitation: IInvitation
}

export interface IInvitationFromAndTo {
    from: IInvitationFromFirebase[],
    to: IInvitationFromFirebase[]
}

export class Invitation {

    public static create(_from: string, _to: string, _reason: string): IInvitation {

        const ret = {
            from: _from,
            to: _to,
            reason: _reason
        }
        return ret
    }
}