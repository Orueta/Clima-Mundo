const axios = require('axios');

const getLugarLatLng = async(dir) => {
    //* Preparando direccion para poder usar el argv.direccion en la peticion a la api
    // const encodeUrl = encodeURI(argv.direccion);

    const instance = axios.create({
        baseURL: `https://geocode.xyz/Hauptstr.,+57632+"${dir}"?json=1`,
    });

    const resp = await instance.get();

    // Disparar un error si los resultados son null
    if (resp.data.standard.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    // Para obtener los datos seleccionados de la api
    const data = resp.data[0];
    const direccion = resp.data.standard.city;
    const lat = resp.data.latt;
    const lng = resp.data.longt


    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}