var tem={
    math:function(v){
        var v=parseFloat(v)
        return v.toFixed(2)
    },
    fang:function(a,b){
        var a=parseFloat(a)
        var b=parseFloat(b)
        return Math.pow(a,b)
    }
}
module.exports=tem;