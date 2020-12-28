  /**
   * 
   * @param {String} requestScope - repository scope requested
   */
  export function isValidScope(dataset, requestScope, org= this.defaultOrg){
   const validScopes = ['read', 'write', 'admin']
    if(!validScopes.includes(requestScope)) {
      throw new Error(`Invalid scope. Scope should be of form "${org}/${dataset}:read/write/admin"`)
    }
  }