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
	if(x>1) return x * fact(x-1) ;
	else if(x<0) return fact(x+1) / (x+1) ;
	else if(x%1!=0) return fact_det(x) ;
	else return 1 ;
}

function P(n,r) // nPr
{
	if(n<0 && n%1==0) return (-1)**r * P(r-(n+1),r) ; // 修正因 負階乘 做成的錯誤
	else return fact(n) / fact(n-r) ;
}

function C(n,r) // nCr
{
	if(n<0 && n%1==0 && r<=n) return C(n,n-r) ; // 修正
	else return P(n,r) / fact(r) ;
}



