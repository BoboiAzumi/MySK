import { prisma } from "../utils/database";

export async function setStartAcademicYear(value: string){
    return await prisma.config.upsert({
        where: {
            key: "start_academic_year"
        },
        update: {
            value
        },
        create: {
            key: "start_academic_year",
            value,
        }
    })
}

export async function setEndAcademicYear(value: string){
    return await prisma.config.upsert({
        where: {
            key: "end_academic_year"
        },
        update: {
            value
        },
        create: {
            key: "end_academic_year",
            value,
        }
    })
}

export async function getAcademicYear(){
    const start = await prisma.config.findFirst({
        where: {
            key: "start_academic_year"
        }
    })
    const end = await prisma.config.findFirst({
        where: {
            key: "end_academic_year"
        }
    })

    return `${start?.value}/${end?.value}`
}

export async function setSemester(value: string){
    return await prisma.config.upsert({
        where: {
            key: "semester"
        },
        update: {
            value
        },
        create: {
            key: "semester",
            value,
        }
    })
}

export async function getSemester(){
    return (await prisma.config.findFirst({
        where: {
            key: "semester"
        }
    }))?.value
}