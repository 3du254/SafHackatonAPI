Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
  };
  
  var arr = [ 1, 2, 3, 4, 5];
  arr.move(3,1);
  console.log(arr);
  
  var arr = [ 1, 2, 3, 4, 5];
  arr.move(0,2);
  console.log(arr);