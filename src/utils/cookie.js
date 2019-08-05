export default {
    getCookie(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(`${name}=`);

            if (start !== -1) {
                start = start + name.length + 1;

                let end = document.cookie.indexOf(';', start);
                if (end === -1) end = document.cookie.length;

                const cookieValue = document.cookie.substring(start, end);

                return decodeURIComponent(cookieValue);
            }
        }

        return '';
    },

    setCookie(key, value) {
        const exdate = new Date();
        let cookieValue = '';

        exdate.setDate(exdate.getDate() + 1);
        try {
            cookieValue = encodeURIComponent(value);
        } catch (e) {
            console.log(e);
        }
        document.cookie = `${key}=${cookieValue};expires=${exdate.toGMTString()}`;
    },

    delCookie(name) {
        const exp = new Date();
        const cval = this.getCookie(name);

        exp.setTime(exp.getTime() - 1);

        if (cval !== null) {
            document.cookie = `${name}='';expires=${exp.toGMTString()}`;
        }
    }
};