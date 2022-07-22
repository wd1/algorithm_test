
export class Change {
  // int t, n;
  // int ar[20];
  // map<vector<int>, bool > solutions;
  // vector<int> v;
  constructor(){
    this.coinArray=[];
    this.target;
    this.result=[];
  }
  
  calculate(coinArray, target) {
    this.coinArray = coinArray;
    this.target = target;
    if( this.target < 0 ) {
      throw new Error("Negative totals are not allowed.");
    }
    coinArray.sort(function(a, b) {
      return b-a;
    });
    this.sliceArray(this.coinArray, this.target);
    if(this.coinArray == [] || target == 0) {
      return [];
    }
    this.search(this.coinArray, target);
    this.result.sort(function(a, b) {
      return a-b;
    });
    return this.result;     
  }

  search(coinArray, target) {
    if( target == 0 ) {
      return;
    } 
    if( coinArray.length == 0 )
    {
      var temp_pop = this.result.pop();
      var index = this.coinArray.indexOf(temp_pop);
      if (index !== -1 && this.coinArray.length>1) {
        this.coinArray.splice(index, 1);
      } else {
        if(this.result.length>2 && temp_pop != this.result[this.result.length-1]) {
          this.result.pop();    
        } else {
          throw new Error("The total "+ this.target +" cannot be represented in the given currency.");
        }
      }
      coinArray = this.coinArray;
      target = this.target;
      for(var i=0; i<this.result.length; i++) {
        target = target - this.result[i];
      }
      this.search(coinArray,target);
      return;
    } else {for each steps in step law
      if(coinArray[0]>=coinArray[1]*2 || coinArray.length <= 2) {
        var i_coins = Math.floor(target / coinArray[0]);
        target = target - i_coins*coinArray[0];
        for(var i = 0; i<i_coins; i++) {
          this.result.push(coinArray[0]);
        }
        coinArray = coinArray.slice(1);
        this.search(coinArray,target);
      } else {
        coinArray = coinArray.slice(1);
        this.search(coinArray,target);
      }
    }
    return;
  }
  sliceArray(coinArray,target) {
    for(var i=0; i<coinArray.length; i++ )
    {
      if(coinArray[i]<=target)
      {
        this.coinArray = coinArray.slice(i);
        return;
      }
    }
    this.coinArray = [];
    return;
  }
}
