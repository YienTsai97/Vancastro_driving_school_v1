import { LicenseClass, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create lesson types
  const lessonTypes = [
    {
      lessonName: "Road lesson 60 min",
      licenseClass: LicenseClass.CLASS_5,
      lessonLength: 60,
      price: 70,
      count: 1,
    },
    {
      lessonName: "Road lesson 90 min",
      licenseClass: LicenseClass.CLASS_5,
      lessonLength: 90,
      price: 90,
      count: 1,
    },
    {
      lessonName: "Road lesson Pack of 2 classes of 90 min",
      licenseClass: LicenseClass.CLASS_5,
      lessonLength: 90,
      price: 170,
      count: 2,
    },
    {
      lessonName: "Road lesson Pack of 3 classes of 90 min",
      licenseClass: LicenseClass.CLASS_5,
      lessonLength: 90,
      price: 250,
      count: 3,
    },
    {
      lessonName: "Road test 45 min warm-up plus rental car",
      licenseClass: LicenseClass.CLASS_5,
      lessonLength: 90,
      price: 150,
      count: 1,
    },
    {
      lessonName: "Road lesson 60 min",
      licenseClass: LicenseClass.CLASS_7,
      lessonLength: 60,
      price: 90,
      count: 1,
    },
    {
      lessonName: "Road lesson 90 min",
      licenseClass: LicenseClass.CLASS_7,
      lessonLength: 90,
      price: 100,
      count: 1,
    },
    {
      lessonName: "Road lesson Pack of 10 classes of 60 min",
      licenseClass: LicenseClass.CLASS_7,
      lessonLength: 60,
      price: 850,
      count: 10,
    },
    {
      lessonName: "Road test 45 min warm-up plus rental car",
      licenseClass: LicenseClass.CLASS_7,
      lessonLength: 90,
      price: 150,
      count: 1,
    },
    {
      lessonName: "Road lesson 60 min",
      licenseClass: LicenseClass.CLASS_4,
      lessonLength: 60,
      price: 120,
      count: 1,
    },
    {
      lessonName: "Road lesson 90 min",
      licenseClass: LicenseClass.CLASS_4,
      lessonLength: 90,
      price: 150,
      count: 1,
    },
    {
      lessonName: "Road test 45 min warm-up plus rental car",
      licenseClass: LicenseClass.CLASS_4,
      lessonLength: 90,
      price: 250,
      count: 1,
    },
  ];

  await prisma.lessonType.createMany({
    data: lessonTypes,
    skipDuplicates: true,
  });

  // Create travel times
  const travelTimes = [
    {
      location1: "Vancouver",
      location2: "North Vancouver",
      durationMinutes: 30,
    },
    {
      location1: "Vancouver",
      location2: "Burnaby",
      durationMinutes: 30,
    },
    {
      location1: "Vancouver",
      location2: "Surrey",
      durationMinutes: 60,
    },
    {
      location1: "North Vancouver",
      location2: "Burnaby",
      durationMinutes: 60,
    },
    {
      location1: "North Vancouver",
      location2: "Surrey",
      durationMinutes: 90,
    },
    {
      location1: "Burnaby",
      location2: "Surrey",
      durationMinutes: 30,
    },
  ];

  await prisma.travelTime.createMany({
    data: travelTimes,
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
