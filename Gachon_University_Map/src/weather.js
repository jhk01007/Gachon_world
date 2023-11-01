const apiKey = 'cbf68a21c804508fdfdbb7a0a527cab6';
// 가천대 글캠 위도,경도
const lat = 37.45056167680355; 
const lon = 127.12943622540755;

export const getWeather = async (latitude = lat, longitude = lon, key = apiKey) => {
    try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
        );
        const json = await response.json();
        const weatherId = json.weather[0].id;
        return weatherId;
      } catch (error) {
        throw error;
      }
}
