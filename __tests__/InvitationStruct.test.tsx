import { Invitation, InvitationStatus } from '../src/Helpers/InvitationStruct'

it('Invitation should create object correctly', () => {

    const sut = Invitation.create('a', 'b', 'c', InvitationStatus.New)

    expect(sut.from).toBe('a')
    expect(sut.to).toBe('b')
    expect(sut.reason).toBe('c')
    expect(sut.status).toBe(InvitationStatus.New)
})