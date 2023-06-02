import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SERVER_ADDRESS || 'http://34.226.140.22:3003';

export const socket = io(URL);
