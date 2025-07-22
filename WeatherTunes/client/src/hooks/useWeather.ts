import { useMutation } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/weatherApi";

export function useWeather() {
  return useMutation({
    mutationFn: fetchWeather,
  });
}
