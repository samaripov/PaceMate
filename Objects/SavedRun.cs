using System;

namespace PaceMate.Objects;

public class SavedRun
{
    public List<Coordinates> path { get; set; } = new List<Coordinates>();
    public double avgSpeed { get; set; }
    public string speedUnit { get; set; } = "";
    public double distance { get; set; }
    public string distanceUnit { get; set; } = "";
    public string[] time { get; set; } = [];
}
