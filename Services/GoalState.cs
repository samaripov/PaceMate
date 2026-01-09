
public class GoalState 
{
    public double? distanceGoal { get; set; } = null;
    public double distanceTraveled { get; set; } = 0.0;

    public bool isGoalReached() => distanceGoal <= distanceTraveled;
    
    public string untilGoalReachedLabel() {
        var distanceLeft = distanceGoal - distanceTraveled;
        distanceLeft = distanceLeft < 0 ? 0 : distanceLeft;
        if(distanceLeft < 1) {
            var distanceInMeters = (int)((distanceLeft - Math.Truncate(distanceLeft ?? 0.0)) * 1000);
            return $"{distanceInMeters}m";
        } else {
            return $"{distanceLeft}km";
        }
    }

    public void resetState()
    {
        distanceGoal = null;
        distanceTraveled = 0.0;
    }
}
