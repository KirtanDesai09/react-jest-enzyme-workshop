import Customers from './Customers';

test('should start with empty', () => {
  // get the store from your setup function
  const {store} = setup();
  // call getCustomers on it
  const customers = store.getCustomers();
  // assert that the lenth of customers is 0
  expect(customers.length).toBe(0)
})

test('should allow you to set customers and get them', () => {
  // get the store
  const {store} = setup();
  // create two customers and set the store to them
  const cust1 = {name: 'bob'}
  const cust2 = {name: 'bobby'}
  store.setCustomers([cust1,cust2]);
  // get the customers from the store
  const customers = store.getCustomers();
  // assert that there are two customers
  expect(customers.length).toBe(2)
  // assert that the customers you got are the ones you set
  expect(customers[0]).toBe(cust1)
  expect(customers[1]).toBe(cust2)
})

test('should allow you to subscribe to the store', () => {
  // get the store
  const {store} = setup();
  // setup a jest mock function (jest.fn()) for your subscriber
  const subscriber = jest.fn();
  // subscribe to the store with that function
  const unsubscribe = store.subscribe(subscriber);
  // call setCustomers
  store.setCustomers();
  // assert your subscriber was called once
  expect(subscriber).toHaveBeenCalledTimes(1);
  // clear your subscriber mock function (subscriber.mockClear())
  subscriber.mockClear(0);
  // call the unsubscribe function you got when subscribing
  unsubscribe();
  // call setCustomers
  store.setCustomers();
  // assert that your mock function was not called
  expect(subscriber).not.toHaveBeenCalled();
})

// Create a `setup` function:
// clear the require cache with jest.resetModules() so you can require a fresh copy of the store
// require the ./Customers module (note: because it's using `export default`,
//   the store is on the `default` property of what you're requiring)
// return {store}
function setup(){
  jest.resetModules();
  const store = require('./Customers').default
  return {store};
}