const oauth = require('./oauth')
const express = require('express')
const router = express.Router()

router.use((req, res, next)=>{
  res.set({
    'Access-Control-Allow-Origin':'*', // Allow AJAX access from any domain
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',// Allow methods for 'preflight'
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',// Allow headers for 'preflight
  });

  if(req.method == 'OPTIONS'){// if this is a preflight, we're done and can send the response with our headers
    return res.status(200).end();
  }
  next();
})


// SignUp Route
router.post('/signup',(req, res)=>{
  oauth.signUp(req.body.name, req.body.email, req.body.password)
    .then((user)=>{
      res.status(201).json(user)
    })
    .catch((err)=>{
      res.status(400).json({error: err.message})
    })
})


// SignIn Route
router.post('/signin',(req, res)=>{
  oauth.signIn(req.body.username, req.body.password)
    .then((user)=>{
      res.json(user)
    })
    .catch((err)=>{
      res.status(401).json({error: err.message})
    })
})


//Delete User Route
router.delete('/delete',(req, res)=>{
  oauth.deleteUser(req.body.username, req.body.password)
    .then((user)=>{
      res.json(user)
    })
    .catch((err)=>{
      res.status(401).json({error: err.message})
    })
})


// Change Password Route
router.put('/changepassword',(req, res)=>{
  oauth.changePassword(req.body.username, req.body.prev_password, req.body.new_password)
    .then((user)=>{
      res.status(200).end();
    })
    .catch((err)=>{
      res.status(401).json({error: err.message})
    })
})


//Forgot Password Route
router.put('/forgotpassword', (req, res)=>{
  oauth.forgotPassword(req.body.username)
    .then((user)=>{
      res.status(200).end()
    })
    .catch((err)=>{
      res.status(400).end()
    })
})


// Confirm Password Route
router.put('/confirmforgotpassword', (req, res)=>{
  oauth.confirmForgotPassword(req.body.username, req.body.new_password, req.body.code)
    .then((user)=>{
      res.status(200).end()
    })
    .catch((err)=>{
      res.status(400).end()
    })
})


module.exports = router
