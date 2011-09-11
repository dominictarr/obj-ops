
var d = require('d-utils')

var diff, merge, patch
diff = exports.diff = function (old, nw) {
  var ab = merge(nw,  old)
    , s = {}
     
    d.each(ab, function (ignore, k) {

      console.log(typeof nw[k], typeof old[k], !!old[k])
      //if the property is not in the new object, it must have been deleted.
      if (nw[k] == null)       
        s[k]  = null //null on a diff means to delete that property when it's applied.
      else if ('object' === typeof nw[k] && 'object' === typeof old[k] && old[k]) 
        s[k] = diff(old[k], nw[k])
      else if (nw[k] !== old[k])   
        s[k] = nw[k] === undefined ? null : nw[k]
      
      console.log(k, 'old:', old[k], 'new:',nw[k], 'change:',s[k])

    })
    console.log(s)  
    return s
  
}

var diff, merge, patch
patch = exports.patch = function (old, ptch) {
  var nw = merge({},  old)
    
    d.each(ptch, function (ignore, k) {

      //if the property is not in the new object, it must have been deleted.
      if (ptch[k] === null)        
        delete nw[k]
      else if ('object' === typeof ptch[k]) 
        nw[k] = patch(old[k], ptch[k])
      else 
        nw[k] = ptch[k]
      
      console.log('PATCH', k, 'old:', old[k], 'new:',nw[k], 'ptch:',ptch[k])

    })
    console.log(nw)  
    return nw
  
}


merge = exports.merge = function (old, nw) {
  var ab = d.merge({}, nw,  old)
    , s = Array.isArray(nw) ? [] : {}
    
    d.each(ab, function (ignore, k) {
      
      s[k] = nw[k] === undefined ? old[k] : nw[k]
      if ('object' === typeof nw[k] && 'object' === typeof old[k] && old[k] && nw[k] && old[k]) {
          s[k] = merge(old[k], nw[k])
      }
      
      console.log(k, 'old:', old[k], 'new:',nw[k], 'change:',s[k])

    })
    console.log(s)  
    return s
  
}