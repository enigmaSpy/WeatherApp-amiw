import { getWeatherInfo } from "../../utils/weatherDescription";

interface DailyViewProps {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  } | null;
  isLoading: boolean;
}

export const DailyView = ({ daily, isLoading }: DailyViewProps) => {
  const getDayName = (dateStr: string) => {
    return new Intl.DateTimeFormat("pl-PL", { weekday: "short" }).format(new Date(dateStr));
  };

  if (isLoading || !daily) {
    return (
      <div className="flex flex-wrap items-center m-6 w-fit gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="min-w-25 h-32 bg-slate-800/50 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="m-6 w-fit">
      <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-4 px-2">Prognoza na 7 dni</h3>
      <div className="flex gap-3 flex-wrap overflow-x-auto pb-4 scrollbar-hide  items-center">
        {daily.time.map((date, index) => {
          const info = getWeatherInfo(daily.weather_code[index]);
          
          return (
            <div 
              key={date}
              className="min-w-25 w-fit bg-slate-800 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-between hover:bg-slate-700 transition-colors"
            >
              <span className="text-xs text-white font-medium uppercase">
                {index === 0 ? "Dziś" : getDayName(date)}
              </span>
              
              <span className="text-3xl my-2">{info.icon}</span>
              
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-100">
                  {Math.round(daily.temperature_2m_max[index])}°
                </span>
                <span className="text-[10px] text-slate-500">
                  {Math.round(daily.temperature_2m_min[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};