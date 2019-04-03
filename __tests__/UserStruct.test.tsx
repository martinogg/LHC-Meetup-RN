import { User } from '../src/Helpers/UserStruct'

it('UserStruct should create object correctly', () => {

    const testName = 'aName'
    const testLocation = 'aLocation'
    const testContact = 'aContact'
    const testInterests = 'anInterest'

    const sut = User.create(testName, testLocation, testContact, testInterests)

    expect(sut.userName).toBe(testName)
    expect(sut.userLocation).toBe(testLocation)
    expect(sut.userContact).toBe(testContact)
    expect(sut.userInterests).toBe(testInterests)
})