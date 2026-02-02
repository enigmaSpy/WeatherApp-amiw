export const weatherDescriptions: Record<number, { label: string; icon: string }> = {
  0: { label: "Czyste niebo", icon: "☀️" },
  1: { label: "Głównie bezchmurnie", icon: "🌤️" },
  2: { label: "Częściowe zachmurzenie", icon: "⛅" },
  3: { label: "Pochmurno", icon: "☁️" },
  45: { label: "Mgła", icon: "🌫️" },
  48: { label: "Mgła osadzająca szadź", icon: "🌫️" },
  51: { label: "Lekka mżawka", icon: "🌦️" },
  53: { label: "Umiarkowana mżawka", icon: "🌦️" },
  55: { label: "Gęsta mżawka", icon: "🌧️" },
  61: { label: "Lekki deszcz", icon: "🌧️" },
  63: { label: "Umiarkowany deszcz", icon: "🌧️" },
  65: { label: "Ulewny deszcz", icon: "🌧️" },
  71: { label: "Lekki śnieg", icon: "🌨️" },
  73: { label: "Umiarkowany śnieg", icon: "🌨️" },
  75: { label: "Silny śnieg", icon: "❄️" },
  80: { label: "Przelotne opady", icon: "🌦️" },
  95: { label: "Burza", icon: "⛈️" },
  96: { label: "Burza z gradem", icon: "⛈️" },
};

export const getWeatherInfo =(code: number)=> weatherDescriptions[code] ||{label:"N/A",icon:"N/A"}; 