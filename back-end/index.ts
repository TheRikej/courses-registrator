import createUser from "./src/repositories/user/createUser";
import prisma from './src/repositories/client';


const a= 5;

console.log(a);

async function main() {
    const user = await createUser({
        userName: 'the.mf.billy.butcher',
        email: 'butcher.b@fbi.gov',
        hashedPassword: 'f5e24c095c5f09e125ac80c54e06b1116d038836de9e48887813cf93f84df4ed',
        salt: 'd59367KfG1wkK5HrFc5cmE37MMeu8YEMGf12W0nMV7R7c3aAw61eg8Lk3AGNk82bXl9o6m999bIc14iP0zCKb2LFcqbKEC4SythOUyggkieailM5USAL684b1v9L8ee9',
    });
    console.log(user)
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

//console.log(showcaseRepositories())