
import { useSpaceWeather } from '@/hooks/useSpaceWeather';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Sun, Loader } from 'lucide-react';

const SpaceWeatherSection = () => {
  const { data, isLoading, error } = useSpaceWeather();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-space-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <AlertTriangle className="w-6 h-6 mr-2" />
        <span>Failed to load space weather data</span>
      </div>
    );
  }

  const { solarFlares, cmeEvents, geomagneticStorms } = data || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Solar Activity Card */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">
            <Sun className="inline-block mr-2 text-space-warning" />
            Solar Activity
          </CardTitle>
          {solarFlares?.[0] && (
            <span className="text-xs text-space-muted">
              Latest update: {new Date(solarFlares[0].startTime).toLocaleString()}
            </span>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {solarFlares?.slice(0, 3).map((flare) => (
              <div
                key={flare.activityID}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">Class {flare.classType}</span>
                  <span className="text-sm text-space-muted">
                    {new Date(flare.startTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-space-muted line-clamp-2">{flare.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CME Events Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Coronal Mass Ejections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              className="h-full"
              config={{
                speed: {
                  theme: {
                    light: "hsl(252, 94%, 67%)",
                    dark: "hsl(252, 94%, 67%)",
                  },
                },
              }}
            >
              <LineChart data={cmeEvents?.map(event => ({
                time: new Date(event.startTime).toLocaleDateString(),
                speed: event.cmeAnalyses?.[0]?.speed || 0,
              })) || []}>
                <XAxis dataKey="time" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="var(--color-speed)"
                  strokeWidth={2}
                />
                <ChartTooltip />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceWeatherSection;
