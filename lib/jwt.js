import jwt from 'jsonwebtoken'

export function encrypt(data){
  if(typeof data !== 'string') data = JSON.stringify(data)
  return jwt.sign(data, process.env.SIGNING_KEY)
}

export function decrypt(data){
  return jwt.decode(data)
}