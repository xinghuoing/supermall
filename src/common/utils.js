 // 刷新频繁的防抖处理
// setTimeout是异步操作本身是有延迟时间的

export function debounce(fuc, delay) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fuc.apply(this, args)
    },delay)
  } 
}


export function formatDate(date, fmt) {
   if (typeof date == 'string') {
       return date;
   }

   if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";

   if (!date || date == null) return null;
   // 将传入的date准换为时间对象，*1000是为了将秒转成毫秒；
     date = new Date(date *1000);
     var o = {
       'M+': date.getMonth() + 1, // 月份
       'd+': date.getDate(), // 日
       'h+': date.getHours(), // 小时
       'm+': date.getMinutes(), // 分
       's+': date.getSeconds(), // 秒
       'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
       'S': date.getMilliseconds() // 毫秒
     }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
       if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
       return fmt;
  }


