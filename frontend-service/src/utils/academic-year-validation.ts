export function academicYearValidation(year: string, setErrorValidation: React.Dispatch<React.SetStateAction<string>>){
    const split = year.split("/")
    if(split.length != 2){
        setErrorValidation("Academic Year must formatted by startYear/endYear")
        return
    }

    const startYear = parseInt(split[0])
    const endYear = parseInt(split[1])

    if(startYear >= endYear){
        setErrorValidation("Start academic year couldn't more than or equal than end year")
        return
    }

    if(endYear != startYear + 1){
        setErrorValidation("End year must be equal to start year + 1")
        return
    }

    setErrorValidation("")
    console.log(`${startYear}/${endYear}`)
}