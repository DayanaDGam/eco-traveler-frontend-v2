// utils/ThirdPartyApi.js

class ThirdPartyApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Método privado para manejar la respuesta
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Solicitud GET para obtener destinos
  getDestinations() {
    return fetch(`${this._baseUrl}/destinations`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Solicitud POST (ejemplo: guardar un destino favorito en servidor)
  saveFavorite(destinationId) {
    return fetch(`${this._baseUrl}/favorites`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ destinationId }),
    }).then(this._checkResponse);
  }
}

// Configuración de la API (Aquí pones tu clave API si es necesaria)
const api = new ThirdPartyApi({
  baseUrl: "https://my-json-server.typicode.com/DayanaDGam/eco-traveler-frontend-v2", // URL de tu API
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer TU_KEY_AQUI" 
  }
});

export default api;