import { shallow } from 'enzyme';
import React from 'react';
import { View } from 'react-native';
import LHCButton from '../src/Components/LHCButton/LHCButton'
import renderer from 'react-test-renderer';

test('LHCButton snapshot', () => {

    const navigation = { navigate: jest.fn() };
    expect(renderer.create(<LHCButton onSelected={() => { }} />)).toMatchSnapshot();
})

test('LHCButton press', async () => {

    const callback = jest.fn()
    const wrapper = shallow(<View>
        <LHCButton onSelected={() => { callback() }} />
    </View>);

    await wrapper.find(LHCButton).first().simulate('selected')

    expect(callback).toBeCalledTimes(1)
})