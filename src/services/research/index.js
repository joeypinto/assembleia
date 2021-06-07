const insertAnsweredResearchInStorage = (researchId) => {
    var answeredResearches = localStorage.getItem("answeredResearches")
    answeredResearches = answeredResearches ? JSON.parse(answeredResearches) : []
    answeredResearches.push(researchId)
    localStorage.setItem("answeredResearches", JSON.stringify(answeredResearches))
}

const isResearchInStorage = (researchId) => {
    var answeredResearches = localStorage.getItem("answeredResearches")
    answeredResearches = answeredResearches ? JSON.parse(answeredResearches) : []
    var researchInStorage = answeredResearches.find(e => e === researchId)

    return researchInStorage
}

export default insertAnsweredResearchInStorage

export { insertAnsweredResearchInStorage, isResearchInStorage }