using System;

namespace PaceMate.Objects;

public class Coordinates
{
    public double Latitude { get; set; } = 0.0;
    public double Longitude { get; set; } = 0.0;
    public override string ToString() => $"{Latitude}, {Longitude}";
}
