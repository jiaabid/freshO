const passport = require("passport")
const googleStrategy = require("passport-google-oauth20").Strategy
const user = require("../models/customer")

const client = "769335255564-k91dmagncopuerg7kvf091s6fardhvor.apps.googleusercontent.com"
const secret = "Kcu1poRRMcUFaIPjcc4RGW8M"
passport.use(
    new googleStrategy({
        clientID: client,
        clientSecret: secret,
        callbackURL: "/customer/auth/google/callback",
        passReqToCallback:true
    },
    async(req,accessToken, refreshToken, profile, done) => {
        try{
            console.log(accessToken)
            console.log("profile", profile)
            if(req.user){
                req.user.methods = "google",
                req.user.google = {
                    mail:profile.emails[0].value,
                    id:profile.id
                }
                req.user.name = profile.displayName
                await req.user.save()
                return done(null,req.user)
            }
            const exist = await user.findOne({"google.id":profile.id})
            if(exist){
                console.log(exist)
                req.user = exist
                return done(null,exist);
            }
            const newUser = new user({
                method:"google",
                google:{
                    id:profile.id,
                    mail:profile.emails[0].value
                },
                name:profile.displayName
            })
            await newUser.save()
            req.user = newUser
            done(null,req.user);
        }catch(err){
            done(err,null);
        }
        
    })
    
)