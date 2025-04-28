// seed.js
const Product = require('./product.model'); // Adjust the path if needed

const sampleProducts = [
  // Bones category (6 products)
  {
      name: "OsteoMax",
      description: "A supplement for improving bone density.",
      price: 300,
      category: "Bones",
      quantity: 5,
      image: "images/OsteoMax.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "BoneCare Plus",
      description: "Calcium-rich supplement to prevent osteoporosis.",
      price: 200,
      category: "Bones",
      quantity: 5,
      image: "images/BoneCare_Plus.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "FlexCal",
      description: "Joint and bone health supplement.",
      price: 220,
      category: "Bones",
      quantity: 5,
      image: "images/FlexCal.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "DuraBone",
      description: "Bone strength supplement with added vitamin D.",
      price: 280,
      category: "Bones",
      quantity: 5,
      image: "images/DuraBone.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "CalciMax",
      description: "Essential calcium and vitamin D3 formula.",
      price: 150,
      category: "Bones",
      quantity: 5,
      image: "images/CalciMax.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "BoneViva",
      description: "Bone health supplement for adults.",
      price: 190,
      category: "Bones",
      quantity: 5,
      image: "images/BoneViva.jpg",
      bestSeller: false,
      offer: false
  },

  // Internal Diseases category (6 products)
  {
      name: "Amoxicillin",
      description: "Amoxicillin contains the active ingredient amoxicillin, used to treat bacterial infections like respiratory and skin infections.",
      price: 28,
      category: "Internal Diseases",
      quantity: 15,
      image: "images/Amoxicillin.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Metformin",
      description: "Metformin contains the active ingredient metformin hydrochloride, used to control blood sugar in type 2 diabetes.",
      price: 26,
      category: "Internal Diseases",
      quantity: 12,
      image: "images/Metformin.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Lisinopril",
      description: "Lisinopril contains the active ingredient lisinopril, which lowers blood pressure and reduces the risk of heart attacks.",
      price: 21,
      category: "Internal Diseases",
      quantity: 10,
      image: "images/Lisinopril.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Omeprazole",
      description: "Omeprazole contains the active ingredient omeprazole, which reduces stomach acid and treats GERD and ulcers.",
      price: 47,
      category: "Internal Diseases",
      quantity: 20,
      image: "images/Omeprazole.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Atorvastatin",
      description: "Atorvastatin contains the active ingredient atorvastatin, used to lower cholesterol and prevent heart disease.",
      price: 38,
      category: "Internal Diseases",
      quantity: 5,
      image: "images/Atorvastatin.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Levothyroxine",
      description: "Levothyroxine contains the active ingredient levothyroxine sodium, used for thyroid hormone replacement therapy.",
      price: 58,
      category: "Internal Diseases",
      quantity: 9,
      image: "images/Levothyroxine.jpg",
      bestSeller: false,
      offer: false
  },

  // Depression and Mental illnesses category (6 products)
  {
      name: "Fluoxetine",
      description: "An SSRI that increases serotonin levels, helping to improve mood and reduce symptoms of depression.",
      price: 50,
      category: "Depression and Mental illnesses",
      quantity: 55,
      image: "images/Fluoxetine.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Sertraline",
      description: "An SSRI used to treat depression, anxiety disorders, and PTSD by boosting serotonin levels in the brain",
      price: 80,
      category: "Depression and Mental illnesses",
      quantity: 55,
      image: "images/Sertraline.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Citalopram",
      description: "An SSRI effective in treating major depressive disorder and anxiety.",
      price: 60,
      category: "Depression and Mental illnesses",
      quantity: 55,
      image: "images/Citalopram.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Escitalopram",
      description: "An improved version of citalopram, used for treating major depressive disorder and generalized anxiety disorder.",
      price: 100,
      category: "Depression and Mental illnesses",
      quantity: 55,
      image: "images/Escitalopram.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Venlafaxine",
      description: "An SNRI that treats major depressive disorder and anxiety disorders by increasing serotonin and norepinephrine levels.",
      price: 200,
      category: "Depression and Mental illnesses",
      quantity: 59,
      image: "images/Venlafaxine.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Duloxetine",
      description: "An SNRI that treats major depressive disorder and anxiety while also addressing chronic pain.",
      price: 250,
      category: "Depression and Mental illnesses",
      quantity: 59,
      image: "images/Duloxetine.jpg",
      bestSeller: false,
      offer: false
  },

  // Head category (6 products)
  {
      name: "Paracetamol-500",
      description: "Paracetamol 500mg Pain Relief Tablets are ideal for treating pain from headaches, toothache, and sore throats, and helps to reduce temperature to provide relief from cold and flu-like symptoms.",
      price: 15,
      category: "Head",
      quantity: 20,
      image: "images/Paracetamol-500.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Brufen-400",
      description: "Treating moderate to severe pain, such as headaches of all kinds, and menstrual pain.",
      price: 78,
      category: "Head",
      quantity: 33,
      image: "images/Brufen-400.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Aspocid 75 mg",
      description: "Acetylsalicylic acid is used in many indications including relief of mild to moderate pain.",
      price: 22.5,
      category: "Head",
      quantity: 30,
      image: "images/Aspocid_75_mg.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Panadol Extra",
      description: "A fast-acting pain reliever that combines paracetamol with caffeine to enhance its effectiveness.",
      price: 54,
      category: "Head",
      quantity: 50,
      image: "images/Panadol_Extra.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Cataflam 25mg",
      description: "An NSAID that provides rapid relief from pain and inflammation.",
      price: 34,
      category: "Head",
      quantity: 55,
      image: "images/Cataflam_25mg.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Saridon",
      description: "A multi-ingredient pain reliever that acts quickly to relieve headache symptoms.",
      price: 34,
      category: "Head",
      quantity: 88,
      image: "images/Saridon.jpg",
      bestSeller: false,
      offer: false
  },

  // Haircare category (6 products)
  {
      name: "L'OREAL PARIS Elvive Hyaluron Moisture",
      description: "The perfect shampoo for you who have dry and lifeless hair. This ultra-moisturizing shampoo keeps your hair moisturized for up to 72 hours.",
      price: 185,
      category: "Haircare",
      quantity: 15,
      image: "images/LOREAL_PARIS_Elvive_Hyaluron_Moisture.jpg",
      bestSeller: true,
      offer: true
  },
  {
      name: "L'Oréal Elvive Extraordinary Oil Replacement",
      description: "Feels light on the roots and nourishing on the ends. This transparent formula will leave your hair feeling beautifully nourished.",
      price: 139,
      category: "Haircare",
      quantity: 10,
      image: "images/LOréal_Elvive_Extraordinary_Oil_Replacement.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Follicle Booster Green",
      description: "Follicle Booster helps fill in gaps in hair and eyebrows and is suitable for beards in men.",
      price: 306,
      category: "Haircare",
      quantity: null,
      image: "images/Follicle_Booster_Green.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Hair Conditioner with Aloe Vera",
      description: "For deeply moisturized and softer hair with no frizz. Suitable for split ends and frizzy hair",
      price: 70,
      category: "Haircare",
      quantity: 6,
      image: "images/Hair_Conditioner_with_Aloe_Vera.jpg",
      bestSeller: true,
      offer: true
  },
  {
      name: "Ultra Doux Smoothing Hair Food",
      description: "With 98% natural origin and 100% vegan blends, it is enriched with super food extracts for super hair.",
      price: 280,
      category: "Haircare",
      quantity: 4,
      image: "images/Ultra_Doux_Smoothing_Hair_Food.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Kesh King",
      description: "Kesh King Scalp And Hair Medicine Anti Hairfall Shampoo",
      price: 450,
      category: "Haircare",
      quantity: 12,
      image: "images/Kesh_King.jpg",
      bestSeller: false,
      offer: true
  },

  // Skin care category (6 products)
  {
      name: "ARGENTO",
      description: "Argento Clear Facial Cleanser For All Skin Types, 200 M + 1 Free",
      price: 280,
      category: "Skin care",
      quantity: 20,
      image: "images/ARGENTO.jpg",
      bestSeller: false,
      offer: true
  },
  {
      name: "Bioderma sensibio gel",
      description: "Sensibio Gel Moussant Pink 200ml",
      price: 840,
      category: "Skin care",
      quantity: 19,
      image: "images/Bioderma_sensibio_gel.jpg",
      bestSeller: false,
      offer: true
  },
  {
      name: "CeraVe Foaming Cleanser",
      description: "Foaming Cleanser For Normal To Oily Skin With Hyaluronic Acid 473ml",
      price: 749,
      category: "Skin care",
      quantity: 20,
      image: "images/CeraVe_Foaming_Cleanser.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Cleo Clear Purifing Cleanser",
      description: "Cleo Clear Purifying Cleansing Gel - 150 ml",
      price: 280,
      category: "Skin care",
      quantity: 19,
      image: "images/Cleo_Clear_Purifing_Cleanser.jpg",
      bestSeller: false,
      offer: true
  },
  {
      name: "DEROICE Daily Facial Cleanser",
      description: "Daily Facial Unitone Cleanser 150ml",
      price: 320,
      category: "Skin care",
      quantity: 20,
      image: "images/DEROICE_Daily_Facial_Cleanser.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Garnier Skin Active",
      description: "Skin Active Fast Bright Face Wash with Vitamin C And Lemon Clear 100ml",
      price: 75,
      category: "Skin care",
      quantity: 20,
      image: "images/Garnier_Skin_Active.jpg",
      bestSeller: true,
      offer: false
  },

  // Pain killer category (6 products)
  {
      name: "Adol",
      description: "A pain reliever and antipyretic, it is used to treat mild to moderate pain (headache, muscle aches) and reduce fever.",
      price: 32,
      category: "Pain killer",
      quantity: 20,
      image: "images/Adol.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Amaryl",
      description: "An oral antidiabetic drug used to control blood sugar levels in people with type 2 diabetes.",
      price: 80,
      category: "Pain killer",
      quantity: 20,
      image: "images/Amaryl.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Aspirin",
      description: "A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.",
      price: 36,
      category: "Pain killer",
      quantity: null,
      image: "images/Aspirin.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Brufen",
      description: "An NSAID that reduces hormones causing inflammation and pain.",
      price: 50,
      category: "Pain killer",
      quantity: null,
      image: "images/Brufen.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "Cataflam",
      description: "A fast-acting NSAID that reduces pain and inflammation.",
      price: 31,
      category: "Pain killer",
      quantity: null,
      image: "images/Cataflam.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Celebrex",
      description: "A selective COX-2 inhibitor NSAID, used to relieve pain and inflammation.",
      price: 30,
      category: "Pain killer",
      quantity: null,
      image: "images/Celebrex.jpg",
      bestSeller: false,
      offer: false
  },

  // Eyes category (6 products)
  {
      name: "Nepafenac",
      description: "To relieve pain and inflammation associated with cataract surgery.",
      price: 27,
      category: "Eyes",
      quantity: null,
      image: "images/Nepafenac.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Patanol",
      description: "It is used to treat temporary eye itching caused by allergies, such as pollen, dust, and animal dander.",
      price: 39,
      category: "Eyes",
      quantity: 0,
      image: "images/Patanol.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Systane",
      description: "To treat dry and irritated eyes, it helps to moisturize the eyes and provides instant relief from burning and pain",
      price: 250,
      category: "Eyes",
      quantity: 4,
      image: "images/Systane.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Optive Fusion",
      description: "Maintaining eye moisture by preserving surface tension and protecting the eyes from injury and inflammation.",
      price: 63,
      category: "Eyes",
      quantity: 15,
      image: "images/Optive_Fusion.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Hylo-Comod",
      description: "To treat dry eye conditions. To relieve the sensation of a foreign object in the eye or eye pain.",
      price: 100,
      category: "Eyes",
      quantity: 8,
      image: "images/Hylo-Comod.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "Allergan",
      description: "Drops specifically designed for allergies, providing relief from irritation and itching.",
      price: 200,
      category: "Eyes",
      quantity: 2,
      image: "images/Allergan.jpg",
      bestSeller: false,
      offer: false
  },

  // Ear category (6 products)
  {
      name: "EarCare Pro",
      description: "Anti-inflammatory ear drops for infections.",
      price: 120,
      category: "Ear",
      quantity: 5,
      image: "images/EarCare_Pro.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "OtoPlus Drops",
      description: "Reduces earache and irritation.",
      price: 130,
      category: "Ear",
      quantity: 5,
      image: "images/OtoPlus_Drops.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "EarSilence",
      description: "Helps with tinnitus relief and ear sensitivity.",
      price: 170,
      category: "Ear",
      quantity: 5,
      image: "images/EarSilence.jpg",
      bestSeller: false,
      offer: false
  },
  {
      name: "ClearTone",
      description: "Eardrops for tinnitus relief and calming ear noise.",
      price: 120,
      category: "Ear",
      quantity: 5,
      image: "images/ClearTone.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "EarEase",
      description: "Relieves earache and reduces inflammation.",
      price: 100,
      category: "Ear",
      quantity: 5,
      image: "images/EarEase.jpg",
      bestSeller: true,
      offer: false
  },
  {
      name: "OtoPure",
      description: "Cleanses and purifies the ear canal.",
      price: 130,
      category: "Ear",
      quantity: 5,
      image: "images/OtoPure.jpg",
      bestSeller: true,
      offer: false
  }
];




async function seedProducts() {
  try {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(sampleProducts);
    console.log('Database seeded!');
  } catch (err) {
    console.error('Error seeding:', err);
  }
}



module.exports = seedProducts;

