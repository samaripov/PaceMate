using System;

namespace PaceMate.Objects;

public class SavedRun
{
    public List<Coordinates> Path { get; set; } = new List<Coordinates>();
    public double AvgSpeed { get; set; }
    public string SpeedUnit { get; set; } = "";
    public double Distance { get; set; }
    public string DistanceUnit { get; set; } = "";
    public string[] Time { get; set; } = new string[0];
}
