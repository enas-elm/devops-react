    /* Amplify Params - DO NOT EDIT
        ENV
        REGION
        STORAGE_USERS_ARN
        STORAGE_USERS_NAME
        STORAGE_USERS_STREAMARN
    Amplify Params - DO NOT EDIT */

    /**
     * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
     */
    const AWS = require('aws-sdk');
    const ddb = new AWS.DynamoDB.DocumentClient();

    exports.handler = async (event) => {
        console.log(event)
        const params = {
            TableName: process.env.STORAGE_USERS_NAME,
        };

        try {
            const data = await ddb.scan(params).promise();
            console.log(data)
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", 
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
                },
                body: JSON.stringify(data.Items),
            };
        } catch (error) {
            console.error('Error querying DynamoDB', error);
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE"
                },
                body: JSON.stringify({ error: 'Error querying user data' }),
            };
        }
    };
