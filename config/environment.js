const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name : 'development',
    asset_path : '/assets',
    session_cookie_key: 'blahsomething',
    db : 'codeial_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
        }
    },
    google_client_ID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
    google_client_Secret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream:accessLogStream}
    }
}

const production = { 
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE,
    db : 'codeial_production',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_EMAIL,
            pass: process.env.CODEIAL_PASSWORD
        }
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT,
    google_client_Secret: process.env.CODEIAL_GOOGLE_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream:accessLogStream}
    }
}

console.log(process.env.CODEIAL_ASSET_PATH); 
console.log(eval(process.env.CODEIAL_ENVIRONMENT)== undefined? development : eval(process.env.CODEIAL_ENVIRONMENT))
module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined? development : eval(process.env.CODEIAL_ENVIRONMENT);