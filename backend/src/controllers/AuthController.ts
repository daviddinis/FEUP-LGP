import LocalStrategy from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';

import User from '../models/user';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from "../config";

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user)).catch(err => done(err, null));
});

passport.use('login', new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
        const user : any = await User.findOne({ email });
        if (user === null || !await checkPassword(password, user.passwordDigest))
            return done('Invalid credentials.', null);
        return done(null, user);
    }
));

// check out bcrypt's docs for more info on their hashing function
const hashPassword = (password, salt = 12) => bcrypt.hash(password, salt);
const checkPassword = (password, digest) => bcrypt.compare(password, digest);

export default class AuthController {
    static useSession(app) {
        app.use(session({
            store: MongoStore.create({ mongoUrl: config.mongoUrl }),
            resave: false,
            saveUninitialized: true,
            secret: "changethislater",
            name: 'sessionId',
            maxAge: new Date(Date.now() + 3600000),
        }));
        app.use(passport.initialize({}));
        app.use(passport.session({}));
    }

    static async check(req, res) {
        if (req.user) {
            return res.status(200).json(req.user);
        }
        return res.status(204).send();
    }

    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(401).json("Invalid credentials");

        passport.authenticate("login", {}, (err, user) => {
            if (err)
                return res.status(401).json(err);
            req.login(user, console.error);
            return res.status(200).json(user);
        })(req, res);
    }

    static async register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json("Invalid register");

        const user = await User.create({
            username,
            email,
            passwordDigest: await hashPassword(password),
        });

        req.login(user, console.error);

        return res.status(201).json(user);
    }

    static async logout(req, res) {
        req.logout();
        return res.status(204).send();
    }

    static async ensureLogin(req, res, next){
        if (req.user) {
            next();
        }
        return res.status(401).send();
    }

    static async ensureAdminLogin(req, res, next){
        if (req.user && req.user.isAdmin) {
            next();
        }
        return res.status(401).send();
    }
}

module.exports = AuthController;