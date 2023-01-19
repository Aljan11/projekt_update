process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB = "";

if (process.env.NODE_ENV === 'dev'){
    urlDB = "mongodb://localhost:27017/mediumNodeLogin";
} else{
    urlDB = "here write the mongo connection with mongo atlas and other type of connection mode"
};


process.env.urlDB = urlDB;


process.env.TOKEN_EXPIRATION = '48h';


process.env.SEED_AUTENTICATION = process.env.SEED_AUTENTICATION ||  'this-is-the-seed-development';
