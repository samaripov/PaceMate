
public class GoalState 
{
    public double? distanceGoal { get; set; } = null;
    public double distanceTraveled { get; set; }

    public bool isGoalReached() => distanceGoal <= distanceTraveled;
    
    public string untilGoalReachedLabel() {
        var distanceLeft = distanceGoal - distanceTraveled;
        return (distanceLeft < 1) ? $"{distanceLeft} meters" : $"{distanceLeft} km";
    }
}
