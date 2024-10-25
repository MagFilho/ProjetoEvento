export default function AjeitarMaskKm(dado, name) {
    if (dado[name]) {
        dado[name] = dado[name].replaceAll("\.", "").replaceAll("km", "")
    } else {
        dado[name] = null
    }
}