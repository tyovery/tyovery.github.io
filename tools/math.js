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

// 矩陣的運算
function mAdd(m0,m1) // 矩陣加法
{
	if(m0.length == m1.length)
	{
		var out = [] ;
		var len = m0.length ;
		for(var x = 0 ; x < len ; x ++)
		{
			out[x] = [] ;
			for(var y = 0 ; y < Math.max(m0[x].length,m1[x].length) ; y ++)
			{
				out[x][y] = m0[x][y]*1 + m1[x][y]*1 ;
			}
		}
		return out ;
	}
	else return "error" ;
}

function mMin(m0,m1) // 矩陣減法
{
	if(m0.length == m1.length)
	{
		var out = [] ;
		var len = m0.length ;
		for(var x = 0 ; x < len ; x ++)
		{
			out[x] = [] ;
			for(var y = 0 ; y < Math.max(m0[x].length,m1[x].length) ; y ++)
			{
				out[x][y] = m0[x][y]*1 - m1[x][y]*1 ;
			}
		}
		return out ;
	}
	else return "error" ;
}

function mTim(m0,m1) // 矩陣乘法
{
	var out = [] ;
	for(var x = 0 ; x < m1.length ; x ++)
	{
		out[x] = [] ;
		for(var y = 0 ; y < m0[0].length ; y ++)
		{
			out[x][y] = 0 ;
			for(var i = 0 ; i < Math.max(m0.length,m1[x].length) ; i++)
			{
				out[x][y] += m0[i][y] * m1[x][i] ;
			}
		}
	}
	return out ;
}

function mT(m0) // 置換矩陣
{
	var out = [] ;
	for(var x = 0 ; x < m0[0].length ; x ++)
	{
		out[x] = [] ;
		for(var y = 0 ; y < m0.length ; y ++)
		{
			out[x][y] = m0[y][x] * 1 ;
		}
	}
	return out ;
}

function mDet(m0) // 行列式
{
	if(m0.length>1)
	{
		var out = 0 ;
		var sign = -1 ; // 正負號
		for(var xx = 0 ; xx < m0.length ; xx++ )
		{
			// 子陣
			var m1 = [] ;
			for(var x = 0 ; x < m0.length ; x++ )
			{
				if(x==xx) continue ;
				m1.push([]) ;
				for(var y = 1 ; y < m0[x].length ; y++ )
				{
					m1[m1.length-1].push(m0[x][y]) ;
				}
			}
			sign *= -1 ;
			out += sign * m0[xx][0] * mDet(m1) ; // 遞歸
		}
		return out ;
	}
	else if(m0.length==1)
	{
		if(m0[0].length==1) // 只乘 1×1
		{
			return m0[0][0]*1 ;
		}
		else
		{
			return "error" ;
		}
	}
}

function mAdj(m0) // 伴隨矩陣
{
	if(m0.length>1)
	{
		var out = [] , m1 = [] ;
		for(var xx = 0 ; xx < m0.length ; xx++ )
		{
			out[xx] = [] ;
			for(var yy = 0 ; yy < m0[xx].length ; yy++ )
			{
				m1 = [] ;
				for(var x = 0 ; x < m0.length ; x ++ )
				{
					if(x==yy) continue ;
					m1.push([]) ;
					for(var y = 0 ; y < m0[x].length ; y ++ )
					{
						if(y==xx) continue ;
						m1[m1.length-1].push(m0[x][y]) ;
					}
				}
				out[xx][yy] = (-1)**(xx+yy) * mDet(m1) ;
			}
		}
		return out ;
	}
	else if(m0.length==1)
	{
		if(m0[0].length==1) // 1×1 格
		{
			return [[1]] ;
		}
		else
		{
			return "error" ;
		}
	}
}

function mInv(m0) // 逆矩陣
{
	var out = [] , adj = mAdj(m0) , det = mDet(m0) ;
	for(var x = 0 ; x < adj.length ; x ++)
	{
		out[x] = [] ;
		for(var y = 0 ; y < adj[x].length ; y ++)
		{
			out[x][y] = adj[x][y] / det ;
		}
	}
	return out ;
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

function zP(a,b,t) // 常態分布: z值(a,b) -> 機率 , t=迫近式的項數(越大越準)
{
	a *= 1 ;
	b *= 1 ;
	if(t>0)
	{
		t *= 1 ;
	}
	else
	{
		var t = 100 ; // 預設精度 = t 項 ( 100項已經很準確，設太大會降低計算效率 )
	}

	var sign = 1 ; // 正負號
	var fact = 1 ; // 階乘
	var bin = 1 ; // 二冪
	var sum = b - a ; // 首項

	for(var k = 1; k < t ; k++)
	{
		sign *= -1 ; // 正負號
        fact *= k ; // 階乘
        bin *= 2 ; // 二冪

		// Σ(k=0,t){ (-1)^k [b^(2n+1)-a^(2n+1)] / [ (2n+1) 2^k k! ] } / √(2π) , t->∞
        sum += ( b**(2*k+1) - a**(2*k+1) ) / (2*k+1) / bin / fact * sign ;
    }

	return sum / Math.sqrt(2*Math.PI) ;
}

function fix46(num,len) // 奇進偶捨(4捨6入5成雙) (數字,小數位)
{
	num = num * 1 + "" ;
	len = len * 1 ;
	
	if( len<0 || len%1>0 ) return undefined ; // len只能是非負整數
	
	// 成雙
	if( num[num.indexOf(".")+len+1] == 5 && // 下一位是5
		num.indexOf(".")+len+2 >= num.length && // 5後沒有數字
		num[num.indexOf(".")+len-(len>0?0:1)] % 2 == 0 ) // 5的前一位是雙數
	{
		num = num.slice(0,-1) + "0" ; // 不須進位
	}

	var fix = Math.round( num * 10**len ) + "" ; // 4捨5入
	if(len>0) fix = fix.slice(0,-len) + "." + fix.slice(-len) ; // 補回小數點
	if(fix[0]==".") fix = "0" + fix ; // 補個位0

	return fix ; // 輸出
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

// 產生指定數列 ( 通項式(n) , 開始項 , 結束項 , 步距 )
function genSeries(series,start,stop,step)
{
	if(!step>0) step = 1 ;
	var array = [] ;
	for(var n = start ; n <= stop ; n += step)
	{
		array.push(eval(series)) ;
	}
	return array ;
}

