import React from 'react';
import { Alert, Linking } from 'react-native';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { AboutAppScreen, CommentMode } from '../src/Screens/AboutApp/AboutAppScreen'

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    dispatch: jest.fn()
  },
  ...props
});

it('should display AboutAppScreen with no errors', () => {

  const props: any = createTestProps({})
  expect(renderer.create(<AboutAppScreen {...props} />)).toMatchSnapshot();
});

test('send Comment button', () => {

  jest.resetAllMocks()

  jest.mock('Alert', () => {
    return {
      alert: jest.fn()
    }
  });

  const props: any = createTestProps({
    screenProps: {
      firebaseConnection: {
        sendComment: jest.fn()
      }
    }
  })

  const wrapper = shallow(<AboutAppScreen {...props} />)
  const sut: any = wrapper.instance()

  const sendComment = 'aComment'
  sut.setState({ commentText: sendComment })
  sut.sendComment()

  expect(sut.render()).toMatchSnapshot('1')
  expect(sut.state.showSendComment).toBe(CommentMode.HideAll)
  expect(props.screenProps.firebaseConnection.sendComment).toHaveBeenCalledTimes(1)
  expect(props.screenProps.firebaseConnection.sendComment).toHaveBeenCalledWith(sendComment)
  expect(Alert.alert).toHaveBeenCalledTimes(1)
  expect(Alert.alert).toHaveBeenCalledWith('Thanks for your comment')
  expect(sut.render()).toMatchSnapshot('2')
})

test('showCommentField', () => {

  const props: any = createTestProps({})
  const wrapper = shallow(<AboutAppScreen {...props} />)
  const sut: any = wrapper.instance()

  expect(sut.render()).toMatchSnapshot('1')
  sut.showCommentField()
  expect(sut.render()).toMatchSnapshot('2')
})

test('handleCommentTextChange', () => {

  const props: any = createTestProps({})
  const wrapper = shallow(<AboutAppScreen {...props} />)
  const sut: any = wrapper.instance()

  const testComment = 'aComment'
  sut.handleCommentTextChange(testComment)
  expect(sut.state.commentText).toBe(testComment)
})

test('linkToProject function', () => {

  jest.clearAllMocks()
  jest.mock('Linking', () => {
    return {
      openURL: jest.fn()
    }
  });

  const props: any = createTestProps({})
  const wrapper = shallow(<AboutAppScreen {...props} />)
  const sut: any = wrapper.instance()

  sut.linkToProject()
  expect(Linking.openURL).toHaveBeenCalledTimes(1)
  expect(Linking.openURL).toHaveBeenCalledWith('https://github.com/martinogg/LHC-Meetup')
})