export function academicYearValidation(year: string, setErrorValidation: React.Dispatch<React.SetStateAction<string>>){
    const split = year.split("/")
    if(split.length != 2){
        setErrorValidation("The academic year must be formatted as startYear/endYear")
        return
    }

    const startYear = parseInt(split[0])
    const endYear = parseInt(split[1])

    if(startYear >= endYear){
        setErrorValidation("Start academic year couldn't be greater than or equal to end year")
        return
    }

    if(endYear != startYear + 1){
        setErrorValidation("The end year must be equal to the start year + 1.")
        return
    }

    setErrorValidation("")
    console.log(`${startYear}/${endYear}`)
}