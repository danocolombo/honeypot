exports.handler = async (event) => {
    // TODO implement
    const uData = {
        id: '6321ee73-3f5c-4fc2-a8e1-3a90b8a4b517',
        name: 'Fortson Guru',
        email: 'fortsonguru@gmail.com',
        phone: '+17066042494',
        defaultClient: 'wbc',
        defaultClientId: '5ee16596c1583dee0d7a6cae',
        role: 'undefined',
        status: 'undefined',
    };
    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify(uData),
    };
    return response;
};
