import { getAcademicYear, getSemester, setEndAcademicYear, setSemester, setStartAcademicYear } from "../repositories/config";
import { ErrorHandler } from "../utils/error-handler";
import { ResponseBuilder } from "../utils/response-builder";

export async function GetConfigService(){
    const academicYear = await getAcademicYear()
    const semester = await getSemester()

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Success get configuration",
        {
            academicYear,
            semester
        }
    )
}

export async function SetConfigService(academicYear: string, semester: string){
    const split = academicYear.split("/")
    if(split.length != 2){
        throw new ErrorHandler(400, "BAD_REQUEST", "Academic Year must formatted by startYear/endYear")
    }

    const startYear = parseInt(split[0])
    const endYear = parseInt(split[1])

    if(startYear >= endYear){
        throw new ErrorHandler(400, "BAD_REQUEST", "Start Academic Year Couldn't More Than Or Equal Than End Year")
    }

    if(endYear != startYear + 1){
        throw new ErrorHandler(400, "BAD_REQUEST", "End Year Must Be Equal To Start Year + 1")
    }

    await setStartAcademicYear(startYear.toString())
    await setEndAcademicYear(endYear.toString())
    await setSemester(semester)

    return ResponseBuilder(
        200,
        "SUCCESS",
        "Update config was successfuly",
        {}
    )
}