import U51Login from './index';

const all = { };

export default function getHub(id) {
    if (all[id]) return all[id];
    all[id] = new U51Login.Vue();
    return all[id];
}
