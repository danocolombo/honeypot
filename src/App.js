import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const myAPI = 'apihpot';
const path = '/client';

const App = () => {
    const [input, setInput] = useState('');
    const [clients, setClient] = useState([]);

    //Function to fetch from our backend and update customers array
    function getClient(e) {
        let clientCode = e.input;
        // this line actually makes the API call passing the input value as parameter.
        API.get(myAPI, path + '/' + clientCode)
            .then((response) => {
                //log response
                console.log('response', response);
                // add current response to client array
                let newClient = [...clients];
                newClient.push(response);
                setClient(newClient);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log('clients:', clients);
    }
    function getSampleUser() {
        const apiName = 'HoneyPot';
        const path = '/users';
        const myInit = {
            body: {
                operation: 'authenticate',
                payload: {
                    uid: '6321ee73-3f5c-4fc2-a8e1-3a90b8a4b517',
                },
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };

        API.post(apiName, path, myInit)
            .then((response) => {
                //log response
                console.log('response', response);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    return (
        <div className='App'>
            <h1>Super Simple React App</h1>
            <div>
                <input
                    placeholder='customer id'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <br />
            <button onClick={() => getClient({ input })}>
                Get Client From Backend
            </button>
            <button onClick={() => getSampleUser()}>Sample User</button>
            <h2
                style={{
                    visibility: clients.length > 0 ? 'visible' : 'hidden',
                }}
            >
                Response
            </h2>
            {clients.map((thisClient, index) => {
                return (
                    <div key={thisClient.code}>
                        <span>
                            <b>Code:</b> {thisClient.code} - <b>Client Name</b>:{' '}
                            {thisClient.clientName}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
