function isSorted(a){  
    for ( var i = 0; i < a.length - 1 ; i++ ) {
        if ( a[i] > a[i+1] )
          return false;
    }
    return true;
}