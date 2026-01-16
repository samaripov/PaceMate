window.saveRun = (newRun) => {
    console.log(newRun);
    const lastSave = window.getSavedRuns();
    const saveJSON = lastSave ? JSON.parse(lastSave) : {};
    const newRunJSON = JSON.parse(newRun);

    saveJSON["SavedRuns"][new Date()] = newRunJSON;
    const newSave = JSON.stringify(saveJSON);

    localStorage.setItem("savedRuns", newSave);
}

window.getSavedRuns = () => localStorage.getItem("savedRuns");