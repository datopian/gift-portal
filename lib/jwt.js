import jwt from 'jsonwebtoken'

export function encrypt(data, key){
  if(typeof data !== 'string') data = JSON.stringify(data)
  return jwt.sign(data, key || process.env.SIGNING_KEY)
}

export function decrypt(data){
  return jwt.decode(data)
}