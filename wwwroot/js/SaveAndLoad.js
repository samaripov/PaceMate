window.saveRun = (newRun) => {
    console.log(newRun);
    const lastSave = window.getSavedRun();
    const saveJSON = lastSave ? JSON.parse(lastSave) : {};
    const newRunJSON = JSON.parse(newRun);

    saveJSON[new Date()] = newRunJSON;
    const newSave = JSON.stringify(saveJSON);

    localStorage.setItem("savedRuns", newSave);
}

window.getSavedRun = () => localStorage.getItem("savedRuns");