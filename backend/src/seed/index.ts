import seedType from "./type.seed"
import seedUser from "./user.seed"

export default async function seed() {
    await seedType();
    await seedUser();
    console.log("Seeded database");
}