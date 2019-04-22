import { Invitation } from '../src/Helpers/InvitationStruct'

it('Invitation should create object correctly', () => {

    const sut = Invitation.create('a', 'b', 'c')

    expect(sut.from).toBe('a')
    expect(sut.to).toBe('b')
    expect(sut.reason).toBe('c')
})