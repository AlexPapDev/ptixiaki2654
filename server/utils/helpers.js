const transliterateString = (str) => {
  return str.split('').map(char => GREEK_TO_ENGLISH_MAP[char] || char).join('');
}

const removeGreekTonos = (str) => {
  return str.split('').map(char => TONOS_MAP[char] || char).join('');
}

const getAddressDetails = async (lat, lon) => {
  try {
    const response = await axios.get(GEOCODE_API_URL, {
      params: {
        lat,
        lon,
        format: 'json',
      },
    })
    return response.data.address
  } catch (error) {
    return { street: null, house_number: null, city: null, postcode: null }
  }
}

export { transliterateString, removeGreekTonos, getAddressDetails }