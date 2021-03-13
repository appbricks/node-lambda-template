import { Handler } from 'aws-lambda';

interface HelloEvent {
  name: string;
}

interface HelloResponse {
  body: string;
}

const handler: Handler<HelloEvent, HelloResponse> = (event, context, callback) => {

  console.log('Hello event: ', event);
  console.log('Hello context: ', context);

  const response: HelloResponse = {
    body: JSON.stringify({
      message: 'Hello '+event.name+'!'
    })
  };

  callback(null, response);
};

export { handler }
