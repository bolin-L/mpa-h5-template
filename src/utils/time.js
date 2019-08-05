function dateFormat(date, format = 'yy-mm-dd hh:nn:ss') {
    const p = {
        'm+': String(date.getMonth() + 1),
        'd+': String(date.getDate()),
        'h+': String(date.getHours()),
        'n+': String(date.getMinutes()),
        's+': String(date.getSeconds()),
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - (RegExp.$1.length)));
    }

    for (const i in p) {
        if (new RegExp(`(${i})`).test(format)) {
            const v = RegExp.$1.length === 1 ? p[i] : (`00${p[i]}`).substr(p[i].length);
            format = format.replace(RegExp.$1, v);
        }
    }

    return format;
}

function countDown(startTime, endTime) {
    const remainTime = endTime - startTime;
    if (remainTime < 0) {
        return [];
    }
    const h = Math.floor(remainTime / (60 * 60 * 1000));
    const m = Math.floor((remainTime - (h * 60 * 60 * 1000)) / (60 * 1000));
    const s = Math.floor((remainTime - (h * 60 * 60 * 1000) - (m * 60 * 1000)) / 1000);

    return [h, m, s];
}

function newDate(dateStr) {
    // 安卓不支持 2008-02-34格式
    return new Date((dateStr + '').replace(/-/g, '/'));
}

export default {
    dateFormat,
    countDown,
    newDate
};
