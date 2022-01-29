exports.handler = async (event) => {
    console.log(event)
    const clientCode = event.pathParameters.code;
    const client = {'code': clientCode, 'clientName': String(clientCode).toUpperCase() };
    // const client = {'code': 'TBD', 'message': 'would be'};
    const response = {
        statusCode: 200,
    //  below to enables localhost testing and configures CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(client),
    };
    return response;
};