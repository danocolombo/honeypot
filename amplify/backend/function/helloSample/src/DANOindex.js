var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event) => {
    // TODO implement
    var operation = event.operation;

    switch (operation) {
        case 'authenticate':
            //--------------------------------------------
            // input: uid (sub)
            // 1. get user
            // 2. take user.defaultClient, get permissons
            // 3. return results
            //--------------------------------------------
            // default payload
            let payload = {
                statusCode: '400',
                body: {
                    // message: 'Honeypot System Error',
                },
            };

            const user = await getUser(event.payload.uid);

            if (user.Count != 1) {
                let failResponse = {
                    statusCode: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },
                    body: JSON.stringify('user not found'),
                };
                return failResponse;
            } else {
                payload.statusCode = '200';
                payload.body._id = event.payload.uid;
                payload.body.name =
                    user.Items[0].firstName + ' ' + user.Items[0].lastName;
                payload.body.email = user.Items[0].email;
                payload.body.phone = user.Items[0].phone;
                payload.body.defaultClient = user.Items[0].defaultClient;
                payload.body.defaultClientId = user.Items[0].defaultClientId;
            }
            //==================================
            // now get client permissons
            const client = await getClient(user.Items[0].defaultClient);

            if (client.Count !== 1) {
                payload.body.role = 'undefined';
                payload.body.status = 'undefind';
            } else {
                //==============================
                // we got client info find user
                //==============================
                const users = client.Items[0].users;
                let userRole = 'undefined';
                let userStatus = 'undefined';
                for (var i = 0; i < users.length; i++) {
                    var u = users[i];
                    if (u.id == payload.body._id) {
                        userRole = u.role;
                        userStatus = u.status;
                    }
                }
                payload.body.role = userRole;
                payload.body.status = userStatus;
            }
            const successfulResponse = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify(payload.body),
            };
            return successfulResponse;
        default:
            payload.body.message =
                'Honeypot System Error: operation (' +
                operation +
                ') unsupport';

            let defaultOpResponse = {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify(payload.body),
            };
            return defaultOpResponse;
    }

    //---BELOW THIS LINE IS BOILERPLATE ----//
    // const response = {
    //     statusCode: 200,
    //     //  Uncomment below to enable CORS requests
    //     //  headers: {
    //     //      "Access-Control-Allow-Origin": "*",
    //     //      "Access-Control-Allow-Headers": "*"
    //     //  },
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    // return response;
};
async function getUser(var1) {
    const uParams = {
        TableName: 'meeterUserProfiles',
        // indexName: 'userName-password-index',
        KeyConditionExpression: 'uid = :v_uid',
        ExpressionAttributeValues: {
            ':v_uid': var1,
        },
    };
    try {
        // console.log('BEFORE dynamo query');
        const data = await dynamo.query(uParams).promise();
        // console.log(data);
        return data;
    } catch (err) {
        console.log('FAILURE in dynamoDB call', err.message);
    }
}
async function getClient(var1) {
    //return var1 + var2;
    const tParams = {
        TableName: 'meeterClientProfiles',
        KeyConditionExpression: 'clientId = :v_clientId',
        ExpressionAttributeValues: {
            ':v_clientId': var1,
        },
    };
    try {
        // console.log('BEFORE dynamo query');
        const data = await dynamo.query(tParams).promise();
        // console.log(data);
        return data;
    } catch (err) {
        console.log('FAILURE in dynamoDB call', err.message);
    }
}
