export default function AjeitarSelects(dado, name) {
    if (dado[name]) {
        dado[name] = {
            id: dado[name]
        }
    } else {
        dado[name] = null
    }
}