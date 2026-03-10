class ThirdPartyApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getDestinations() {
    return fetch(`${this._baseUrl}/destinations`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  saveFavorite(destinationId) {
    return fetch(`${this._baseUrl}/favorites`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ destinationId }),
    }).then(this._checkResponse);
  }
}

const api = new ThirdPartyApi({
  baseUrl: "https://my-json-server.typicode.com/DayanaDGam/eco-traveler-frontend-v2",
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;