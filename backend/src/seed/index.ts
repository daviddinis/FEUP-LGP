import seedType from "./type.seed"

export default async function seed() {
    await seedType();
    console.log("Seeded database");
}