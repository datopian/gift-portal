import { encrypt, decrypt } from '../../lib/jwt'

const key = 'testkey'

describe('JWT encryption function', ()=> {
  it('should encrypt an object', ()=>{
    const obj = { name: 'test' }

    const result = encrypt(obj, key)
    expect(result)
      // eslint-disable-next-line max-len
      .toEqual('eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCJ9.ZaQ6eyatiHmB8wLqyAbG19HwC8jVaXckjXEQyuhL4VA')
  })

  it('should encrypt a string', ()=>{
    const string = 'testing string'
    
    const result = encrypt(string, key)
    expect(result)
      // eslint-disable-next-line max-len
      .toEqual('eyJhbGciOiJIUzI1NiJ9.dGVzdGluZyBzdHJpbmc.cw_yz3baYDx75DMySt_i0MiGnqRnJi89D7xiJG3v4RY')
  })

  it('should decrypt a encrypted value', ()=>{
    // eslint-disable-next-line max-len
    const hash = 'eyJhbGciOiJIUzI1NiJ9.dGVzdGluZyBzdHJpbmc.cw_yz3baYDx75DMySt_i0MiGnqRnJi89D7xiJG3v4RY'
    
    const result = decrypt(hash)
    expect(result).toEqual('testing string')
  })
})