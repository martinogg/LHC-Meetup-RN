export interface IInvitation {
    from: string,
    to: string,
    reason: string,
    status: InvitationStatus
}

export interface IInvitationFromFirebase {
    id: string,
    invitation: IInvitation
}

export interface IInvitationFromAndTo {
    from: IInvitationFromFirebase[],
    to: IInvitationFromFirebase[]
}

export enum InvitationStatus {
    New = 'New',
    Accepted = 'Accepted',
    Rejected = 'Rejected'
}

export class Invitation {

    public static create(_from: string, _to: string, _reason: string, _status: InvitationStatus): IInvitation {

        const ret = {
            from: _from,
            to: _to,
            reason: _reason,
            status: _status
        }
        return ret
    }
}