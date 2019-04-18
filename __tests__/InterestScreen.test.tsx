import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import { Alert } from 'react-native'
import { User, IUser, UserInterest } from '../src/Helpers/UserStruct'
import LHCButton from '../src/Components/LHCButton/LHCButton'
import { InterestScreen } from '../src/Screens/Interest/InterestScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
    navigation: {
        navigate: jest.fn(),
        replace: jest.fn(),
        dispatch: jest.fn()
    },
    ...props
});

it('should display InterestScreen with no errors', () => {

    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return {} },
        },
        previousUserInterest: UserInterest.create('a', 'b'),
        screenProp: {

        }
    });

    expect(renderer.create(<InterestScreen {...props} />)).toMatchSnapshot();
});

test('InterestScreen constructor ', () => {

    const mockInterest = UserInterest.create('a', 'b')
    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return mockInterest },
        },
        previousUserInterest: UserInterest.create('a', 'b'),
        screenProp: {

        }
    });

    const sut: any = new InterestScreen(props)

    expect(sut.state.title).toBe(mockInterest.title)
    expect(sut.state.description).toBe(mockInterest.description)
    expect(sut.state.userInterest).toBe(mockInterest)
});

test('InterestScreen saveButtonPressed function', () => {

    const mockCallbackFunc = jest.fn()
    let getParamCallback: (param: string) => any = (param) => { return {} }
    const mockInterest = UserInterest.create('a', 'b')
    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return getParamCallback(param) },
            pop: jest.fn()
        },
        previousUserInterest: UserInterest.create('a', 'b'),
        screenProp: {

        }
    });

    const sut: any = new InterestScreen(props)
    getParamCallback = (param: string) => {
        expect(param).toEqual('saveCallback')
        return mockCallbackFunc
    }

    sut.state.title = mockInterest.title
    sut.state.description = mockInterest.description

    sut.saveButtonPressed()

    expect(mockCallbackFunc).toHaveBeenCalledTimes(1)
    expect(mockCallbackFunc).toHaveBeenCalledWith(expect.objectContaining(mockInterest))
    expect(props.navigation.pop).toHaveBeenCalledTimes(1)
})

test('InterestScreen removeButtonPressed function', () => {

    const mockCallbackFunc = jest.fn()
    let getParamCallback: (param: string) => any = (param) => { return {} }
    const mockInterest = UserInterest.create('a', 'b')
    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return getParamCallback(param) },
            pop: jest.fn()
        },
        previousUserInterest: UserInterest.create('a', 'b'),
        screenProp: {

        }
    });

    const sut: any = new InterestScreen(props)

    getParamCallback = (param: string) => {
        expect(param).toEqual('removeCallback')
        return mockCallbackFunc
    }

    sut.state.title = mockInterest.title
    sut.state.description = mockInterest.description

    sut.removeButtonPressed()

    expect(mockCallbackFunc).toHaveBeenCalledTimes(1)
    expect(props.navigation.pop).toHaveBeenCalledTimes(1)
})

test('InterestScreen handleTitleChange function', () => {

    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return {} },
        }
    });
    const changeText = 'change'

    const wrapper = shallow(<InterestScreen {...props} />);
    const sut: any = wrapper.instance()
    sut.handleTitleChange(changeText)
    expect(sut.state.title).toEqual(changeText)
})

test('InterestScreen handleDescriptionChange function', () => {

    const props = createTestProps({
        navigation: {
            getParam: (param: string) => { return {} },
        }
    });
    const changeText = 'change'

    const wrapper = shallow(<InterestScreen {...props} />);
    const sut: any = wrapper.instance()
    sut.handleDescriptionChange(changeText)
    expect(sut.state.description).toEqual(changeText)
})
