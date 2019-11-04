// you're going to need to import a few things here:
// react, react-test-renderer, ../store/Customers.stub,
// and the ./CustomerList component (which we're testing)
import React from 'react'
import {render, mount} from 'enzyme'
import {renderToJson, mountToJson} from 'enzyme-to-json'
import getStoreStub from '../store/Customers.stub'
import CustomerList from './CustomerList'


test('should render no customers', () => {
  // create a snapshotCustomerList function and test the default
  //   behavior by calling it without arguments
  // Then use the resulting component to check the snapshot
  snapshotCustomerList();
})

test('should render customers', () => {
  // get a store from the stub and initialize it with two customers
  const {store} = getStoreStub([{name: 'bob'}, {name: 'bobby'}])
  // we need to have the <CustomerList /> component use our stub instead of the singleton store somehow...
  //   We _could_ use Jest's mocking capabilities. Or, we could just alter the CustomerList component to allow you
  //   to specify a store! So go to the CustomerList.js file and add a prop called `store`. Wherever the singleton
  //   `store` is used, use `this.props.store` instead and use defaultProps to have the `store` default to the singleton
  //   `store` (that way actual users of the component don't have to specify the store).
  // Now use the snapshotCustomerList function you wrote to pass the store as a prop
  snapshotCustomerList({store});
})

test('should respond to store updates', () => {
  // get both the store and the updateCustomers from a call to `../store/Customers.stub`
  const{store, updateCustomers} = getStoreStub();
  // render the customer list with the store stub
  const wrapper = mountCustomerList({store})
  // take a snapshot
  expect(mountToJson(wrapper)).toMatchSnapshot()
  // call updateCustomers with a few customers
  updateCustomers([{name: 'bob1'}, {name: 'bobby2'}])
  // take another snapshot
  expect(mountToJson(wrapper)).toMatchSnapshot()
})

test('unsubscribe when unmounted', () => {
  // we want to make sure that the unsubscribe function is called on the store
  // so get the store stub and the unsubscribe mock function from '../store/Customers.stub'
  const {store, unsubscribe} = getStoreStub()
  // Then use enzyme's `mount` function to mount `./CustomerList` with the store stub.
  const wrapper = mountCustomerList({store});
  // Take the resulting wrapper from that `mount` and unmount it by calling `wrapper.unmount`
  wrapper.unmount();
  // Then assert that the `unsubscribe` mock was called once with toHaveBeenCalledTimes(1)
  expect(unsubscribe).toHaveBeenCalledTimes(1)
})

// Create a snapshotCustomerList function that:
//   1. Accepts props
//   2. Creates a component with those props with a call to renderer.create (tip: you may wanna do this in a separate function)
//   3. Asserts on a snapshot of that component with expect(component).toMatchSnapshot()
// Create a renderCustomerList function that:
//   1. Accepts props and defaults the store to the store stub
//   2. Returns a render the CustomerList with those propse
// Create a mountCustomerList function that:
//   1. Accepts props and defaults the store to the store stub
//   2. Returns a mount the CustomerList with those propse

function snapshotCustomerList(props = {}){
  const wrapper = renderCustomerList(props);
  expect(renderToJson(wrapper)).toMatchSnapshot();
}

function renderCustomerList({store = getStoreStub().store}){
  return render(<CustomerList store = {store}/>);
}

function mountCustomerList({store = getStoreStub().store}){
  return mount(<CustomerList store = {store}/>);
}