// you'll need to import react, enzyme's render and mount functions,
// and ./Toggle
import React from 'react'
import {render, mount} from 'enzyme'
import Toggle from './Toggle'

test('has toggle--off class applied by default', () => {
  // create a renderToggle function and call that without arguments to get a wrapper with the defaults
  // expect the first child to have the class toggle--off (tip: create rootHasClass(wrapper, className) function)
  const wrapper = renderToggle()
  expect(rootHasClass(wrapper, 'toggle--off')).toBe(true)
})

test('has toggle--on class applied when initialToggledOn specified to true', () => {
  // use the renderToggle function and call it with {initialToggledOn: true}
  // expect the first child to have the class toggle--on
  const wrapper = renderToggle({initialToggledOn:true})
  expect(rootHasClass(wrapper, 'toggle--on')).toBe(true);
})

test('invokes the onToggle prop when clicked', () => {
  // create a mock function of onToggle with jest.fn()
  const onToggle = jest.fn()
  // create a mountToggle function and call that with {onToggle}
  const wrapper = mountToggle({onToggle})
  // take the returned enzyme wrapper and simulate a click event on the button
  clickButton(wrapper)
  // assert that onToggle was called once
  expect(onToggle).toHaveBeenCalledTimes(1)
  // assert that it was called with `true`
  expect(onToggle).toBeCalledWith(true)
})


// create a renderToggle function that accepts some props and applies those to a render of the <Toggle /> component
//   you should also provide defaults for any required props
// create a mountToggle function that does basically the same thing except with mount
// Also a clickButton(wrapper) function would be handy to create here as well as both tests will need to do that.
function mountToggle(props = {}) {
  return mount(
    <Toggle
      onToggle={() => {}}
      children="Toggle Me"
      {...props}
    />
  )
}
function renderToggle(props = []){
  return render(
    <Toggle
      onToggle={() => {}}
      children = "Toggle me"
      {...props}/>
  )
}
function rootHasClass(wrapper, className) {
  return wrapper.children().first().hasClass(className)
}
function clickButton(wrapper) {
  wrapper.find('button').first().simulate('click')
}