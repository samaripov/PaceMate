window.saveRun = (newRun) => {
    const lastSave = window.getSavedRuns();
    const saveJSON = lastSave ? JSON.parse(lastSave) : { "SavedRuns": {} };
    const newRunJSON = JSON.parse(newRun);

    const date = new Date();
    const standardizedDate = date.toISOString().replace("Z", "+00:00");

    saveJSON["SavedRuns"][standardizedDate] = newRunJSON;
    const newSave = JSON.stringify(saveJSON);

    localStorage.setItem("savedRuns", newSave);
}

window.getSavedRuns = () => localStorage.getItem("savedRuns");

window.getSavedRunByDate = (date) => {
    const lastSave = window.getSavedRuns();
    const saveJSON = lastSave ? JSON.parse(lastSave) : null;
    return saveJSON ? JSON.stringify(saveJSON["SavedRuns"][date]) : "";
};