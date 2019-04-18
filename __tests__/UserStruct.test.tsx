import { User, UserInterest } from '../src/Helpers/UserStruct'

it('UserStruct should create object correctly', () => {

    const testName = 'aName'
    const testLocation = 'aLocation'
    const testContact = 'aContact'
    const testInterests = [UserInterest.create('d', 'e'), UserInterest.create('f', 'g')]

    const sut = User.create(testName, testLocation, testContact, testInterests)

    expect(sut.userName).toBe(testName)
    expect(sut.userLocation).toBe(testLocation)
    expect(sut.userContact).toBe(testContact)
    expect(sut.userInterests).toEqual(testInterests)
})

it('UserInterest should create object correctly', () => {

    const testTitle = 'aTitle'
    const testDescription = 'aDescription'

    const sut = UserInterest.create(testTitle, testDescription)

    expect(sut).toEqual({ description: testDescription, title: testTitle })
})