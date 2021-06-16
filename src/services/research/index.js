import axios from '../axios';
import Swal from 'sweetalert2'

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

const getResearchListByLiveId = async (liveId) => {
    const response = await axios.get('/admin/research?live_id='+liveId).catch(err => {
        Swal.fire('Erro', 'Erro ao listar as enquetes', 'error')
    })

    if(!response) {
        return []
    }

    return response.data
}

export default insertAnsweredResearchInStorage

export { insertAnsweredResearchInStorage, isResearchInStorage, getResearchListByLiveId }