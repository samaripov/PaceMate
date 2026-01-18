window.saveRun = (newRun) => {
    console.log(newRun);
    const lastSave = window.getSavedRuns();
    const saveJSON = lastSave ? JSON.parse(lastSave) : { "SavedRuns": {} };
    const newRunJSON = JSON.parse(newRun);

    const date = new Date();
    const offsetHours = -date.getTimezoneOffset() / 60;
    const offsetMinutes = Math.abs(date.getTimezoneOffset() % 60);

    // Format the offset hours and minutes with padded zeros
    const formattedOffsetHours = String(Math.abs(offsetHours)).padStart(2, '0');
    const formattedOffsetMinutes = String(offsetMinutes).padStart(2, '0');

    const timezoneOffset = `${offsetHours >= 0 ? '-' : '+'}${formattedOffsetHours}:${formattedOffsetMinutes}`;
    const standardizedDate = date.toISOString().replace("Z", "+00:00");

    saveJSON["SavedRuns"][standardizedDate] = newRunJSON;
    const newSave = JSON.stringify(saveJSON);

    localStorage.setItem("savedRuns", newSave);
}

window.getSavedRuns = () => localStorage.getItem("savedRuns");