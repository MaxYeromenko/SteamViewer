import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import cors from "cors";

const app = express();

// CORS для фронта на Vercel
app.use(cors({
    origin: "https://myfrontend.vercel.app",
    credentials: true
}));

// Сессии
app.use(session({
    secret: "steam-secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Steam стратегия
passport.use(new SteamStrategy({
    returnURL: "https://mybackend.onrender.com/auth/steam/return",
    realm: "https://mybackend.onrender.com/",
    apiKey: "ВАШ_STEAM_API_KEY"
}, (_identifier: any, profile: any, done: (arg0: null, arg1: any) => any) => {
    return done(null, profile); // profile содержит steamid, ник, аватар
}));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => any) => done(null, user));
passport.deserializeUser((obj: any, done: (arg0: null, arg1: any) => any) => done(null, obj));

// Роут редиректа на Steam
app.get("/auth/steam", passport.authenticate("steam"));

// Callback после логина
app.get("/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "https://myfrontend.vercel.app/login" }),
    (req: any, res: { redirect: (arg0: string) => void; }) => {
        // После успешного логина → редирект на фронт
        res.redirect("https://myfrontend.vercel.app/profile");
    }
);

// Эндпоинт для получения текущего пользователя
app.get("/auth/user", (req: { user: any; }, res: { send: (arg0: any) => void; }) => {
    res.send(req.user || null);
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
