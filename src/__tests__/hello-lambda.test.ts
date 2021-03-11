import { hello } from '../';

const context = require('aws-lambda-mock-context');

it('calls the hello lambda function', () => {

  hello(
    {
      name: 'Tester'
    }, 
    context(),
    (error, result) => {
      expect(error).toBeNull()
      expect(result!.body).toEqual('{"message":"Hello Tester!"}')
    }
  );
});
