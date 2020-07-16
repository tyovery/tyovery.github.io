function rad(deg) { return deg * Math.PI / 180 ; } // 角度 轉 弧度
function deg(rad) { return rad * 180 / Math.PI ; } // 弧度 轉 角度

// 複數的四則運算
function cAdd(z0,z1) // 複數加法
{
	while(z0.length<2) z0.push(0);
	while(z1.length<2) z1.push(0);
	return [z0[0]+z1[0],z0[1]+z1[1]] ;
}
function cMin(z0,z1) // 複數減法
{
	while(z0.length<2) z0.push(0);
	while(z1.length<2) z1.push(0);
	return [z0[0]-z1[0],z0[1]-z1[1]] ;
}
function cTim(z0,z1) // 複數乘法
{
	if(z0.length<1) z0.push(1);
	if(z0.length<2) z0.push(0);
	if(z1.length<1) z1.push(1);
	if(z1.length<2) z1.push(0);
	return [z0[0]*z1[0]-z0[1]*z1[1],z0[1]*z1[0]+z0[0]*z1[1]] ;
}
function cDiv(z0,z1) // 複數除法
{
	if(z0.length<1) z0.push(1);
	if(z0.length<2) z0.push(0);
	if(z1.length<1) z1.push(1);
	if(z1.length<2) z1.push(0);
	var r = z1[0]**2+z1[1]**2 ; // 分母
	return [ (z0[0]*z1[0]+z0[1]*z1[1])/r , (z0[1]*z1[0]-z0[0]*z1[1])/r ] ;
}
function cxAdd(list) // 複數連加
{
	var sum = [] ;
	for(var n = 0 ; n < list.length ; n++)
	{
		sum = cAdd(sum , list[n]) ;
	}
	return sum ;
}
function cxTim(list) // 複數連乘
{
	var sum = [] ;
	for(var n = 0 ; n < list.length ; n++)
	{
		sum = cTim(sum , list[n]) ;
	}
	return sum ;
}

function fact_near(x) // 階乘 近似式
{
	if(x>0) // (x/e)^x √(2πx)
	{
		var lg = ( x * ( Math.log(x)-1 ) + Math.log(2*Math.PI*x)/2 ) / Math.log(10);
		var exp = Math.floor(lg) ; // 10^exp
		var eff = lg - exp // 有效數字
		var preOut = 10**eff + (exp>=0?"e+":"e") + exp ;
		return preOut * 1 ;
	}
	else if(x==0) return 1 ; // 0! = 1
	else // (-x)^x √(-2πx) cosh(x)/-sin(πx)
	{
		var lg = ( x * Math.log(-x) + Math.log(-2*Math.PI*x)/2 + Math.log(Math.cosh(x)) ) / Math.log(10);
		var exp = Math.floor(lg) ; // 10^exp
		var eff = lg - exp // 有效數字
		var preOut = 10**eff + (exp>=0?"e+":"e") + exp ;
		return preOut / (-Math.sin(Math.PI*x));
	}
}

function fact_det(n,x,terms) // 階乘 積分定義 展開
{	// n! = lim(x->∞,terms->∞){ sum(k=0,terms){(-1)^k * x^(n+k+1) / ((n+k+1)*k!) } }
	var x = 21 , terms = 200 ; // x不需太大 , terms較需要大
	var sum = x**(n+1)/(n+1) ; // 第一項
	var sign = 1 ; // 正負號
	var m = 1 ; // 階乘
	
	for(var k = 1 ; k < terms ; k++)
	{
		sign *= -1 ; // 正負號
		m *= k ; // k!
		sum += sign * x**(n+k+1) / ((n+k+1)*m) ;
	}
	return sum ;
}

function fact(x) // 階乘(實數)
{
	var m=1 ;
	for(; x>1 ; x--) m*=x ;
	for(; x<0 ; x++) m/=x+1 ;
	if(x%1!=0) m *= fact_det(x) ;
	return m ;

	/*
	if(x>1) return x * fact(x-1) ;
	else if(x<0) return fact(x+1) / (x+1) ;
	else if(x%1!=0) return fact_det(x) ;
	else return 1 ;
	*/
}

function gamma(x) // Γ(x) = (x-1)!
{
	return fact(x-1) ;
}

function P(n,r) // nPr
{
	var m = 1 ;
	if(r>=0)
	{
		for(var k=0 ; k < r ; k++ ) m*=(n-k) ;
		return m ;
	}
	else
	{
		if(r%1==0)
		{
			for(var k=1 ; k <= -r ; k++ ) m/=(n+k) ;
			return m ;
		}
		else
		{
			return fact(n)/fact(n-r) ;
		}
	}
}

function C(n,r) // nCr
{
	var m = 1 ;
	if(r>=0)
	{
		
		for(var k=0 ; k < r ; k++ ) m*=(n-k)/(k+1) ;
		return m ;
	}
	else
	{
		if(r%1==0) return 0 ;
		/*{
			for(var k=1 ; k <= -r ; k++ ) m*=(1-k)/(n+k) ;
			return m ;
		}*/
		else
		{
			return fact(n)/fact(n-r)/fact(r) ;
		}
	}
}

function separ(number,digit,symbol) // 數位分隔符 (字串 , 間隔位數 , 分隔符)
{
	if(!(digit>0)) digit = 3 ; // 預設 3位
	symbol += "" ;
	if(!(symbol.length>0) || symbol == "undefined") symbol = "'" ; // 預設 分隔符
	number += "" ; // 化作 String
	number = number.split("") ; // 化作 Array

	var dot_pos = number.length ; // 小數點位置
	for(var k = 0 ; k < number.length ; k ++ )
	{
		if(number[k] == ".")
		{
			dot_pos = k ; // 記錄小數點位置
			break ;
		}
	}

	var number_length = number.length ;
	for(var k = 1 ; k <= Math.floor((dot_pos-1)/digit) ; k++)
	{
		number.splice(1-(digit+1)*k +dot_pos-number_length , 0 , symbol); // 插入分隔符
	}
	return number.join("") ;
}

function floatFix(number) // 處理 多於一個小數點 的狀況
{
	number += "" ;
	var array = number.split(".") ;
	if(array.length>2) number = array.shift()+"."+array.join("");
	return number ;
}
