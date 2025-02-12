import { hashPassword } from "./utils/bcrypt";
import { prisma } from "./utils/database";

async function main(){
    const user = await prisma.userInformation.findFirst({
        where: {
            Account: {
                username: "admin"
            }
        }
    })

    if(!user){
        await prisma.userInformation.create({
            data: {
                fullName: "Admin",
                email: "admin@mysk",
                phone: "000000000000",
                role: "ADMIN",
                Account: {
                    create: {
                        username: "admin",
                        password: await hashPassword("admin")
                    }
                }
            }
        })
    }
    else {
        await prisma.account.update({
            data: {
                username: "admin",
                password: await hashPassword("admin"),
                UserInformation: {
                    update: {
                        fullName: "Admin",
                        email: "admin@mysk",
                        phone: "000000000000",
                        role: "ADMIN",
                    }
                }
            },
            where: {
                username: "admin"
            }
        })
    }
}

main()