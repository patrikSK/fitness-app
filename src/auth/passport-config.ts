const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
function initialize(passport: any, getUserByEmail: any, getUserById: any) {
    const authenticateUser = async (email: any, password: any, done: any) => {
      
      const user = await getUserByEmail(email)
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    }
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user: any, done: any) => done(null, user.id))
    passport.deserializeUser((id: any, done: any) => done(null, getUserById(id)))
  }

export default initialize