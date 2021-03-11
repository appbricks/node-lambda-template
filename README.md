# Node Typescript Module Template

## Overview

Typescript "Hello World" lambda node module template with unit tests. 

### Running unit tests

```
npm run test
```

### Deploying lambda function to AWS

Follow the steps below to deploy and test the lambda function in AWS. 

1. Create execution role for the lambda function.

```
aws iam create-role \
  --role-name hello-lambda \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      { 
        "Effect": "Allow", 
        "Principal": {
          "Service": "lambda.amazonaws.com"
        }, 
        "Action": "sts:AssumeRole"
      }
    ]
  }'
```

2. Add basic execution permissions.

  ```
  aws iam attach-role-policy \
    --role-name hello-lambda \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  ```

3. Build lambda function deployment zip

  Run the following to build and create a zip of the compiled function code. This should create a file named `hello-lambda.zip` in the project root.

```
npm run build
npm run pack
```

4. Upload the function to AWS

```
ACCT_ID=$(aws sts get-caller-identity --output text | cut -f3)

aws lambda create-function \
  --function-name hello-lambda \
  --runtime nodejs14.x \
  --handler index.hello \
  --role arn:aws:iam::${ACCT_ID}:role/hello-lambda \
  --zip-file fileb://$(pwd)/hello-lambda.zip
```

To update the code run.

```
aws lambda update-function-code \
  --function-name hello-lambda \
  --zip-file fileb://$(pwd)/hello-lambda.zip
```

5. Test the function

```
RESPONSE_FILE=$(mktemp)

aws lambda invoke \
  --function-name hello-lambda \
  --invocation-type RequestResponse \
  --cli-binary-format raw-in-base64-out \
  --payload '{ "name": "AWS" }' \
  ${RESPONSE_FILE}

cat ${RESPONSE_FILE}
```
