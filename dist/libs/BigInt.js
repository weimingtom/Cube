function isInstance(i){return i instanceof BigInt}function setMaxDigits(i){maxDigits=i,ZERO_ARRAY=new Array(maxDigits);for(var t=0;t<ZERO_ARRAY.length;t++)ZERO_ARRAY[t]=0;bigZero=new BigInt,bigOne=new BigInt,bigOne.digits[0]=1}function BigInt(i){this.digits="boolean"==typeof i&&1==i?null:ZERO_ARRAY.slice(0),this.isNeg=!1}function biCopy(i){var t=new BigInt(!0);return t.digits=i.digits.slice(0),t.isNeg=i.isNeg,t}function biFromNumber(i){var t=new BigInt;t.isNeg=0>i,i=Math.abs(i);for(var r=0;i>0;)t.digits[r++]=i&maxDigitVal,i>>=biRadixBits;return t}function reverseStr(i){for(var t="",r=i.length-1;r>-1;--r)t+=i.charAt(r);return t}function digitToHex(t){var r=15,e="";for(i=0;i<4;++i)e+=hexToChar[t&r],t>>>=4;return reverseStr(e)}function biToHex(i){for(var t="",r=(biHighIndex(i),biHighIndex(i));r>-1;--r)t+=digitToHex(i.digits[r]);return t}function charToHex(i){var t,r=48,e=r+9,g=97,s=g+25,n=65,d=90;return t=i>=r&&e>=i?i-r:i>=n&&d>=i?10+i-n:i>=g&&s>=i?10+i-g:0}function hexToDigit(i){for(var t=0,r=Math.min(i.length,4),e=0;r>e;++e)t<<=4,t|=charToHex(i.charCodeAt(e));return t}function biFromHex(i){for(var t=new BigInt,r=i.length,e=r,g=0;e>0;e-=4,++g)t.digits[g]=hexToDigit(i.substr(Math.max(e-4,0),Math.min(e,4)));return t}function biFromString(i,t){var r="-"==i.charAt(0),e=r?1:0,g=new BigInt,s=new BigInt;s.digits[0]=1;for(var n=i.length-1;n>=e;n--){var d=i.charCodeAt(n),a=charToHex(d),o=biMultiplyDigit(s,a);g=biAdd(g,o),s=biMultiplyDigit(s,t)}return g.isNeg=r,g}function biDump(i){return(i.isNeg?"-":"")+i.digits.join(" ")}function biAdd(i,t){var r;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,r=biSubtract(i,t),t.isNeg=!t.isNeg;else{r=new BigInt;for(var e,g=0,s=0;s<i.digits.length;++s)e=i.digits[s]+t.digits[s]+g,r.digits[s]=65535&e,g=Number(e>=biRadix);r.isNeg=i.isNeg}return r}function biSubtract(i,t){var r;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,r=biAdd(i,t),t.isNeg=!t.isNeg;else{r=new BigInt;var e,g;g=0;for(var s=0;s<i.digits.length;++s)e=i.digits[s]-t.digits[s]+g,r.digits[s]=65535&e,r.digits[s]<0&&(r.digits[s]+=biRadix),g=0-Number(0>e);if(-1==g){g=0;for(var s=0;s<i.digits.length;++s)e=0-r.digits[s]+g,r.digits[s]=65535&e,r.digits[s]<0&&(r.digits[s]+=biRadix),g=0-Number(0>e);r.isNeg=!i.isNeg}else r.isNeg=i.isNeg}return r}function biHighIndex(i){for(var t=i.digits.length-1;t>0&&0==i.digits[t];)--t;return t}function biNumBits(i){var t,r=biHighIndex(i),e=i.digits[r],g=(r+1)*bitsPerDigit;for(t=g;t>g-bitsPerDigit&&0==(32768&e);--t)e<<=1;return t}function biMultiply(i,t){for(var r,e,g,s=new BigInt,n=biHighIndex(i),d=biHighIndex(t),a=0;d>=a;++a){for(r=0,g=a,j=0;j<=n;++j,++g)e=s.digits[g]+i.digits[j]*t.digits[a]+r,s.digits[g]=e&maxDigitVal,r=e>>>biRadixBits;s.digits[a+n+1]=r}return s.isNeg=i.isNeg!=t.isNeg,s}function biMultiplyDigit(i,t){var r,e,g;result=new BigInt,r=biHighIndex(i),e=0;for(var s=0;r>=s;++s)g=result.digits[s]+i.digits[s]*t+e,result.digits[s]=g&maxDigitVal,e=g>>>biRadixBits;return result.digits[1+r]=e,result}function arrayCopy(i,t,r,e,g){for(var s=Math.min(t+g,i.length),n=t,d=e;s>n;++n,++d)r[d]=i[n]}function biShiftLeft(i,t){var r=Math.floor(t/bitsPerDigit),e=new BigInt;arrayCopy(i.digits,0,e.digits,r,e.digits.length-r);for(var g=t%bitsPerDigit,s=bitsPerDigit-g,n=e.digits.length-1,d=n-1;n>0;--n,--d)e.digits[n]=e.digits[n]<<g&maxDigitVal|(e.digits[d]&highBitMasks[g])>>>s;return e.digits[0]=e.digits[n]<<g&maxDigitVal,e.isNeg=i.isNeg,e}function biShiftRight(i,t){var r=Math.floor(t/bitsPerDigit),e=new BigInt;arrayCopy(i.digits,r,e.digits,0,i.digits.length-r);for(var g=t%bitsPerDigit,s=bitsPerDigit-g,n=0,d=n+1;n<e.digits.length-1;++n,++d)e.digits[n]=e.digits[n]>>>g|(e.digits[d]&lowBitMasks[g])<<s;return e.digits[e.digits.length-1]>>>=g,e.isNeg=i.isNeg,e}function biMultiplyByRadixPower(i,t){var r=new BigInt;return arrayCopy(i.digits,0,r.digits,t,r.digits.length-t),r}function biDivideByRadixPower(i,t){var r=new BigInt;return arrayCopy(i.digits,t,r.digits,0,r.digits.length-t),r}function biModuloByRadixPower(i,t){var r=new BigInt;return arrayCopy(i.digits,0,r.digits,0,t),r}function biCompare(i,t){if(i.isNeg!=t.isNeg)return 1-2*Number(i.isNeg);for(var r=i.digits.length-1;r>=0;--r)if(i.digits[r]!=t.digits[r])return i.isNeg?1-2*Number(i.digits[r]>t.digits[r]):1-2*Number(i.digits[r]<t.digits[r]);return 0}function biDivideModulo(i,t){var r,e,g=biNumBits(i),s=biNumBits(t),n=t.isNeg;if(s>g)return i.isNeg?(r=biCopy(bigOne),r.isNeg=!t.isNeg,i.isNeg=!1,t.isNeg=!1,e=biSubtract(t,i),i.isNeg=!0,t.isNeg=n):(r=new BigInt,e=biCopy(i)),new Array(r,e);r=new BigInt,e=i;for(var d=Math.ceil(s/bitsPerDigit)-1,a=0;t.digits[d]<biHalfRadix;)t=biShiftLeft(t,1),++a,++s,d=Math.ceil(s/bitsPerDigit)-1;e=biShiftLeft(e,a),g+=a;for(var o=Math.ceil(g/bitsPerDigit)-1,u=biMultiplyByRadixPower(t,o-d);-1!=biCompare(e,u);)++r.digits[o-d],e=biSubtract(e,u);for(var b=o;b>d;--b){var l=b>=e.digits.length?0:e.digits[b],h=b-1>=e.digits.length?0:e.digits[b-1],f=b-2>=e.digits.length?0:e.digits[b-2],x=d>=t.digits.length?0:t.digits[d],c=d-1>=t.digits.length?0:t.digits[d-1];r.digits[b-d-1]=l==x?maxDigitVal:Math.floor((l*biRadix+h)/x);for(var M=r.digits[b-d-1]*(x*biRadix+c),N=l*biRadixSquared+(h*biRadix+f);M>N;)--r.digits[b-d-1],M=r.digits[b-d-1]*(x*biRadix|c),N=l*biRadix*biRadix+(h*biRadix+f);u=biMultiplyByRadixPower(t,b-d-1),e=biSubtract(e,biMultiplyDigit(u,r.digits[b-d-1])),e.isNeg&&(e=biAdd(e,u),--r.digits[b-d-1])}return e=biShiftRight(e,a),r.isNeg=i.isNeg!=n,i.isNeg&&(r=n?biAdd(r,bigOne):biSubtract(r,bigOne),t=biShiftRight(t,a),e=biSubtract(t,e)),0==e.digits[0]&&0==biHighIndex(e)&&(e.isNeg=!1),new Array(r,e)}function biDivide(i,t){return biDivideModulo(i,t)[0]}function biModulo(i,t){return biDivideModulo(i,t)[1]}function biMultiplyMod(i,t,r){return biModulo(biMultiply(i,t),r)}function biPow(i,t){for(var r=bigOne,e=i;;){if(0!=(1&t)&&(r=biMultiply(r,e)),t>>=1,0==t)break;e=biMultiply(e,e)}return r}function biPowMod(i,t,r){for(var e=bigOne,g=i,s=t;;){if(0!=(1&s.digits[0])&&(e=biMultiplyMod(e,g,r)),s=biShiftRight(s,1),0==s.digits[0]&&0==biHighIndex(s))break;g=biMultiplyMod(g,g,r)}return e}function BarrettMu(i){this.modulus=biCopy(i),this.k=biHighIndex(this.modulus)+1;var t=new BigInt;t.digits[2*this.k]=1,this.mu=biDivide(t,this.modulus),this.bkplus1=new BigInt,this.bkplus1.digits[this.k+1]=1,this.modulo=BarrettMu_modulo,this.multiplyMod=BarrettMu_multiplyMod,this.powMod=BarrettMu_powMod}function BarrettMu_modulo(i){var t=biDivideByRadixPower(i,this.k-1),r=biMultiply(t,this.mu),e=biDivideByRadixPower(r,this.k+1),g=biModuloByRadixPower(i,this.k+1),s=biMultiply(e,this.modulus),n=biModuloByRadixPower(s,this.k+1),d=biSubtract(g,n);d.isNeg&&(d=biAdd(d,this.bkplus1));for(var a=biCompare(d,this.modulus)>=0;a;)d=biSubtract(d,this.modulus),a=biCompare(d,this.modulus)>=0;return d}function BarrettMu_multiplyMod(i,t){var r=biMultiply(i,t);return this.modulo(r)}function BarrettMu_powMod(i,t){var r=new BigInt;r.digits[0]=1;for(var e=i,g=t;;){if(0!=(1&g.digits[0])&&(r=this.multiplyMod(r,e)),g=biShiftRight(g,1),0==g.digits[0]&&0==biHighIndex(g))break;e=this.multiplyMod(e,e)}return r}module.exports={newInstance:function(i,t){if(!i)return new BigInt;if(isInstance(i))return 16==t?new BarrettMu(i):biCopy(i);if("number"==typeof i)return biFromNumber(i);if(t=Number(t),isNaN(t))throw"radix must be integer";return t=t||10,16==t?biFromHex(i):biFromString(i,t)},isInstance:isInstance,setLimit:setMaxDigits,highIndex:biHighIndex},BigInt.prototype.toString=function(i){return"hex"==i?biToHex(this,10):biToString(this)};var biRadixBase=2,biRadixBits=16,bitsPerDigit=biRadixBits,biRadix=65536,biHalfRadix=biRadix>>>1,biRadixSquared=biRadix*biRadix,maxDigitVal=biRadix-1,maxInteger=9999999999999998,maxDigits,ZERO_ARRAY,bigZero,bigOne;setMaxDigits(131);var hexToChar=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"),highBitMasks=new Array(0,32768,49152,57344,61440,63488,64512,65024,65280,65408,65472,65504,65520,65528,65532,65534,65535),lowBitMasks=new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);