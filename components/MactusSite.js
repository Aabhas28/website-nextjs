"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header, Footer, FloatingActions } from "./SiteChrome";
import { ContactForm } from "./ContactForm";
import { Button, Card, Icon, PageBanner, ReadMore, SectionTitle } from "./ui";
import { PRODUCTS, QUICK_LINKS } from "./site-data";

const APPLICATIONS = [
  ["Ceramic", "Ceramic.webp"], ["Cosmetic", "Cometics.webp"], ["Electronics", "Electronics.webp"],
  ["Fertilizer", "fertilizer.webp"], ["Glass", "Glass.webp"], ["Industrial Lubricants", "industrial-lubricants.webp"],
  ["Insulation", "Insulation.webp"], ["Paper", "Paper.webp"], ["Porcelain", "Porcelain.webp"],
];

// Slide images must be text-free: the headline is rendered as live HTML on top of them.
const HERO_SLIDES = [
  { image: "/images/mactus/hero/hero-industrial-clean.webp", position: "left", headline: <>From <strong>Deep</strong> Within<br />the <strong>Earth</strong> to <strong>You</strong></>, sub: "India's largest wet-type feldspar processing plant, supplying ceramic and industrial minerals worldwide." },
  { image: "/images/mactus/hero/hero-minerals-clean.webp", position: "center", headline: <><strong>Nature&apos;s</strong> Finest<br />Minerals</>, sub: "Soda & Potash Feldspar, Talc, Kaolin, Quartz, Ball Clay and Mica, refined for consistent quality." },
];

const STATS = [["20+", "Years of ceramic expertise"], ["550,000+", "TPA processing capacity"], ["7", "Industrial minerals"], ["19+", "Export destinations"]];

const TESTIMONIALS = [
  ["/images/assets/test1.webp", "I would like to take this opportunity to say that the quality of service offered by the Mactus Mineral, our first contact over a year ago has been highly impressive.", "KHIMJIBHAI SAIDVA", "Director  - Accord vitrified private limited"],
  ["/images/assets/test2.webp", "The quality, service and supply commitment from Mactus Mineral have helped us maintain consistent production standards.", "VIMALBHAI SAVSANI", "Director"],
  ["/images/assets/test3.webp", "Mactus Mineral delivers dependable raw materials and support for every ceramic requirement.", "JITENDRA T. AGHARA", "CMD"],
];

const PRODUCT_COPY = {
  "soda-feldspar": "We are accredited for manufacturing quality Soda Feldspar which has diverse application across many industries. Soda Feldspar manufactured from quality raw material procured from our own Mines. We use latest WET GRINDING technology our products are in compliance with the set standards of the industry. We meet customize demands at very nominal price.",
  "potash-feldspar": "Presenting a wide quality range of Potash Feldspar lumps from our own mines, It is known for its unmatched quality and superior surface finish. These Potash Feldspar powder is manufactured by using latest WET GRINDING cutting edge technology and sophisticated engineering.",
  talc: "Talc is the softest mineral  known on our planet earth.It is a hydrated magnesium silicate [Talc chemical formula is Mg3Si4O10(OH)2 ]. Also known as Steatite. It is the main component of soapstone. Its crystals usually develop massive, leafy aggregates with laminar particles.",
  "china-clay": "Kaolin clay, or China clay, is a fine, soft white mineral. Its unique crystalline arrangement contributes to its softness, plasticity, and chemical inertness, making it ideal for various industrial applications. Its non-toxic and absorbent nature makes it ideal for skincare products.",
  quartz: "Quartz is a chemical compound consisting of one part silicon and two parts oxygen. It is the most abundant mineral found at Earth’s surface and its unique properties make it one of the most useful natural substances.",
  "ball-clay": "Ball clay is a mineral formed from the weathering and transportation by water of parent rocks which are deposited in ancient river basins from where it is extracted.",
  mica: "A natural occurring mineral that is based on a collection of silicate minerals and composed of varying amounts of potassium, iron, aluminum, magnesium and water is Mica. It is found having thin-sheet like or plate-like structure with various composition and physical properties. Mica forms flat six-sided monoclinic crystals along with an extraordinary split in the direction of larger surfaces.",
};

const ROUTE_COPY = {
  "company-profile": ["COMPANY PROFILE", "Legacy of 20+ Years in Mineral Supply", "Our Group stands at the forefront of manufacturing, specializing in refined soda and potash feldspar. With over two decades of expertise in the Ceramic Industry, our technocrats lead the charge in producing top-quality materials."],
  achievement: ["ACHIEVEMENT", "Explore Our Premium Minerals", "First time in India premium quality mesh feldspar powder by wet type processing plantinclude dryer. India’s largest wet type processing plant. We produce more than 550000 TPA mesh feldspar powder."],
  quality: ["QUALITY", "Quality Assurance", "We are equipped with the world-class instruments for the quality control. We have two in-house laboratories by which we can produce the world-class products & consistent quality. our separate quality control system helps us to deal with the inspection of every product to ensure quality."],
  "plant-photos": ["PLANT PHOTOS", "Our State-of-the-Art Plant", "Explore our integrated mineral processing facilities, built to supply premium ceramic raw materials consistently."],
  client: ["CLIENTS", "Our Valued Clients", "Our customer relationships are built on consistent quality, timely supply and technical expertise."],
  export: ["EXPORT", "Trusted Exporter of Top-Grade Minerals", "As a premier minerals supplier, Mactus Mineral takes pride in its expertise in mining, processing, and exporting industrial minerals worldwide. Specializing in a diverse array of high-quality minerals such as Soda Feldspar, Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay, and Mica, we ensure that each product meets rigorous quality standards."],
  catalogue: ["CATALOGUE", "MACTUS MINERAL LLP - INDUSTRIAL MINERALS MANUFACTURER AND EXPORTER", ""],
  blog: ["BLOGS", "Mactus Insights", "News, updates and mineral processing insights from the Mactus team."],
  "social-media": ["SOCIAL MEDIA", "Stay Connected", "Follow Mactus Mineral for the latest updates from our business and plants."],
  event: ["EVENTS & EXHIBITION", "Events & Exhibition", "Meet Mactus Mineral at leading ceramic and minerals industry events."],
  contact: ["CONTACT", "Contact Mactus Mineral", "Connect with our team for product information, samples and technical assistance."],
};

const BLOG_POSTS = [
  ["Different Grades of Feldspar Lumps and Their Industrial Uses", "different-grades-of-feldspar-lumps-and-their-industrial-uses", "Jul 10, 2025"],
  ["Everything You Need To Know About Kaolin Clay", "everything-you-need-to-know-about-kaolin-clay", "Jul 07, 2025"],
  ["Feldspar Market Analysis: Size, Growth, and Industry Trends", "feldspar-market-analysis-size-growth-and-industry-trends", "Jul 03, 2025"],
  ["High Purity Talc and Kaolin Clay Supplier for Paper Industry", "high-purity-talc-and-kaolin-clay-supplier-for-paper-industry", "Jul 01, 2025"],
  ["What Is Mesh Size in Minerals: A Complete Beginners Guide", "what-is-mesh-size-in-minerals-a-complete-beginners-guide", "Jun 09, 2025"],
  ["High Purity Quartz vs Fused Quartz: Key Differences and Uses", "high-purity-quartz-vs-fused-quartz-key-differences-and-uses", "Jun 06, 2025"],
  ["Feldspar, Talc and Quartz Minerals Exporter to Thailand", "feldspar-talc-and-quartz-minerals-exporter-to-thailand", "Jun 04, 2025"],
  ["Feldspar, Mica and Quartz Industry Minerals Exporter to UAE", "feldspar-mica-and-quartz-industry-minerals-exporter-to-uae", "Jun 02, 2025"],
  ["Everything You Need to Know About Potassium Feldspar", "everything-you-need-to-know-about-potassium-feldspar", "May 10, 2025"],
  ["Everything You Need to Know About Sodium Feldspar", "everything-you-need-to-know-about-sodium-feldspar", "May 06, 2025"],
  ["Soda and Potash Feldspar Manufacturer & Supplier in Vietnam", "soda-and-potash-feldspar-manufacturer-supplier-in-vietnam", "May 03, 2025"],
  ["Feldspar, Talc and Quartz Minerals Exporter to Australia", "feldspar-talc-and-quartz-minerals-exporter-to-australia", "May 01, 2025"],
  ["Feldspar, Mica and Quartz Industry Minerals Exporter to China", "feldspar-mica-and-quartz-industry-minerals-exporter-to-china", "Apr 09, 2025"],
  ["Feldspar, Mica and Quartz Minerals Exporter to Bangladesh", "feldspar-mica-and-quartz-minerals-exporter-to-bangladesh", "Apr 07, 2025"],
  ["Granular Feldspar vs Ground Feldspar", "granular-feldspar-vs-ground-feldspar", "Apr 04, 2025"],
  ["Synthetic Mica vs Natural Mica", "synthetic-mica-vs-natural-mica", "Apr 01, 2025"],
  ["Why Kaolin Clay is the Top Choice for the Cosmetic Industry", "why-kaolin-clay-is-the-top-choice-for-the-cosmetic-industry", "Mar 10, 2025"],
  ["Feldspar, Mica and Quartz Minerals Exporter to Canada", "feldspar-mica-and-quartz-minerals-exporter-to-canada", "Mar 06, 2025"],
  ["The Role of Feldspar in the Soap and Detergent Industry", "the-role-of-feldspar-in-the-soap-and-detergent-industry", "Mar 03, 2025"],
  ["Industrial Feldspar Minerals Exporter to Philippines", "industrial-feldspar-minerals-exporter-to-philippines", "Mar 01, 2025"],
  ["Feldspar, Mica and Quartz Minerals Exporter to Vietnam", "feldspar-mica-and-quartz-minerals-exporter-to-vietnam", "Feb 06, 2025"],
  ["Industrial Feldspar Minerals Exporter to United Kingdom (UK)", "industrial-feldspar-minerals-exporter-to-united-kingdom-uk", "Feb 05, 2025"],
  ["Feldspar Mining in India: Key Challenges and Opportunities", "feldspar-mining-in-india-key-challenges-and-opportunities", "Feb 03, 2025"],
  ["Mica Powder vs Talc Powder", "mica-powder-vs-talc-powder", "Feb 01, 2025"],
  ["Soda and Potash Feldspar Exporter to United States (US)", "soda-and-potash-feldspar-exporter-to-united-states-us", "Jan 10, 2025"],
  ["Soda Feldspar and Potash Feldspar Exporter to Turkey", "soda-feldspar-and-potash-feldspar-exporter-to-turkey", "Jan 08, 2025"],
  ["Role of High Purity Talc in the Cosmetic Industry", "role-of-high-purity-talc-in-the-cosmetic-industry", "Jan 05, 2025"],
  ["Ball Clay vs. Kaolin Clay: Understanding the Differences", "ball-clay-vs-kaolin-clay-understanding-the-differences", "Jan 01, 2025"],
  ["High Purity Quartz Supplier for Handicraft & Decor Industry", "high-purity-quartz-supplier-for-handicraft-decor-industry", "Dec 06, 2024"],
  ["Soda and Potash Feldspar Supplier for Agriculture Industry", "soda-and-potash-feldspar-supplier-for-agriculture-industry", "Dec 05, 2024"],
  ["Which Industry Minerals Are Used in the Rubber Industry?", "which-industry-minerals-are-used-in-the-rubber-industry", "Dec 03, 2024"],
  ["Soda Feldspar vs. Ball Clay: What You Need to Know", "soda-feldspar-vs-ball-clay-what-you-need-to-know", "Dec 02, 2024"],
  ["Soda and Potash Feldspar Supplier for Ceramic Industry", "soda-and-potash-feldspar-supplier-for-ceramic-industry", "Nov 08, 2024"],
  ["Industrial Minerals Manufacturer and Exporter in India", "industrial-minerals-manufacturer-and-exporter-in-india", "Nov 05, 2024"],
  ["Feldspar vs Quartz: Properties, Uses, and Market Demand", "feldspar-vs-quartz-properties-uses-and-market-demand", "Nov 03, 2024"],
  ["How Feldspar is Mined, Refined, & Processed for Industrial Use", "how-feldspar-is-mined-refined-processed-for-industrial-use", "Nov 01, 2024"],
  ["Industrial Applications and uses of China Clay", "industrial-applications-and-uses-of-china-clay", "Oct 04, 2024"],
  ["What is Mica Powder Used For?", "what-is-mica-powder-used-for", "Oct 03, 2024"],
  ["China Clay Supplier for Paints and Coating Industry", "china-clay-supplier-for-paints-and-coating-industry", "Oct 02, 2024"],
  ["Soda Feldspar Supplier for Glass Industry", "soda-feldspar-supplier-for-glass-industry", "Oct 01, 2024"],
  ["Industrial Applications of Talc Powder", "industrial-applications-of-talc-powder", "Sep 04, 2024"],
  ["What is Ball Clay Powder used For?", "what-is-ball-clay-powder-used-for", "Sep 03, 2024"],
  ["Quality Mica Powder Manufacturer & Supplier in India", "quality-mica-powder-manufacturer-supplier-in-india", "Sep 02, 2024"],
  ["High Purity Quartz Manufacturer & Supplier in India", "high-purity-quartz-manufacturer-supplier-in-india", "Sep 01, 2024"],
  ["Industrial Grade Talc Powder Manufacturer & Exporter", "industrial-grade-talc-powder-manufacturer-exporter", "Aug 04, 2024"],
  ["Top Ball Clay Manufacturer & Supplier in India", "top-ball-clay-manufacturer-supplier-in-india", "Aug 03, 2024"],
  ["Industrial Applications of Processed Feldspar", "industrial-applications-of-processed-feldspar", "Aug 02, 2024"],
  ["Different Types of Industrial Clay: Properties and Uses", "different-types-of-industrial-clay-properties-and-uses", "Aug 01, 2024"],
  ["Comparing Soda Feldspar vs Potash Feldspar", "comparing-soda-feldspar-vs-potash-feldspar", "Jul 04, 2024"],
  ["Kaolin China Clay Powder Manufacturer & Supplier in India", "kaolin-china-clay-powder-manufacturer-supplier-in-india", "Jul 03, 2024"],
  ["Processed Feldspar vs Granular Feldspar | Industrial Applications", "processed-feldspar-vs-granular-feldspar-industrial-applications", "Jul 02, 2024"],
  ["What Is Quartz Powder Used For?", "what-is-quartz-powder-used-for", "Jul 01, 2024"],
  ["Challenges in Quartz Mining and Manufacturing: Overcoming Industry Hurdles", "challenges-in-quartz-mining-and-manufacturing-overcoming-industry-hurdles", "Jun 12, 2024"],
  ["Supreme-Quality Potash Feldspar Manufacturer & Supplier in India", "supreme-quality-potash-feldspar-manufacturer-supplier-in-india", "Jun 11, 2024"],
  ["High-Quality Soda Feldspar Manufacturer & Supplier in India", "high-quality-soda-feldspar-manufacturer-supplier-in-india", "Jun 10, 2024"],
  ["The Manufacturing Process of Top-Grade Soda Feldspar", "the-manufacturing-process-of-top-grade-soda-feldspar", "May 20, 2024"],
];

const BLOG_IMAGES = [
  "o_1iv9u2snud8qlou13v1gjt1kpoa.webp", "o_1iv83r3dbujc1mv510r31qkn9o8a.webp", "o_1iv80q0e7rdmdgv1far12mbsgma.webp", "o_1iv7svjtgh2c1g8q17nl1ljgnta.webp", "o_1isq3stni7o21dnrrvf19rjq76a.webp", "o_1isobd7sf38h1t8b1cui11mu6m2a.webp", "o_1isobc03qrbcjot121l3k8r08a.webp", "o_1isobcgg5eudj9vl5k1iji1e88a.webp", "o_1iq7soe4k1g37l5c1jl9gvpjmla.webp", "o_1iq7rrak7oi7139todv20t3fa.webp", "o_1iq7ppeqhlgdq8j1a2j1lgb1nf8a.webp", "o_1iq7oravk1vgr405249lmo145a.webp", "o_1invoue7013ba1lqviklrtin6ha.webp", "o_1intepl6563126h14sf1ha11a22a.webp", "o_1inocsi5g1ib21djv1qvt16gc3qja.webp", "o_1inobufdm1ols1kph1hgo1108vuta.webp", "o_1ill1eandnca1epgea41ruurapa.webp", "o_1ilkt4hub1qroafthddvio3h4a.webp", "o_1ilggr3891p2r76pctu1itdf89a.webp", "o_1ilgdrtf819ur18hmcmd15hj14a.webp", "o_1ijd27snv341vvo19m1cklk8fa.webp", "o_1ij89semkdn95ra741gvj1h52a.webp", "o_1ij0eiok61tu835t12t31df41un9a.webp", "o_1ij0dq2dq1jne222ld3cin1hija.webp", "o_1iglvhmuj3a0shmuj51l5g18vra.webp", "o_1iglsu905kvg1if61mbr4cd1a48a.webp", "o_1iggkemvf1qm71rdp19ej1oedvvaa.webp", "o_1iggj47b11f6l39116aj11fh1iuta.webp", "o_1ieao0vfa329uuj1096epk8sfg.webp", "o_1ieamkf6014qt1k1f1h3i1jflo6ua.webp", "o_1ie3d2i3iva4lfnvrk1s7emipa.webp", "o_1ie3g33t47791aoj170f1ql91bq1a.webp", "o_1ic52mm0i1o8djm15mp4unq6oa.webp", "o_1ic4v6hnr1thr1uddffjgh12doa.webp", "o_1ib3m7ba51asn17um1ih418jk7b6a.webp", "o_1ib3irltq1j71ctv19n1ndr97ta.webp", "o_1i9av0mpj10i55e0mnf1so11sufa.webp", "o_1i98tcrdl1rim1vl2oenuis1hb8a.webp", "o_1i98qmn837ua928t771u5l525a.webp", "o_1i98ocmnuhv3126b1qlo1au5vk8a.webp", "o_1i6tp3our1img1ct6no81oq11ppqa.webp", "o_1i6tm465l6411ilveu6ekm1rkoa.webp", "o_1i6tlrd57jje3ibkl61rbl1qgia.webp", "o_1i6ru6d9kuk76p61u32pit18epa.webp", "o_1i4bf18331ohp115n1boskkrpdna.webp", "o_1i4bdn8p61bl9hcnvrs175471ta.webp", "o_1i493nft417167gq1m08hecvpca.webp", "o_1i48uk4arqmmlqj18gl10sc1rgda.webp", "o_1i1rnd3draph19b41vrrbkl1p7pa.webp", "o_1i1s5vck7f4e1809lanlhm1ki9a.webp", "o_1i1mi7sqm1nj91gbgi0c103pmi1a.webp", "o_1i1mi5l2rei41vvj19k11a63jfea.webp", "o_1i012laq61cn2187it3tif21qoga.webp", "o_1i0107c19100u11eu13vr11oa1g50a.webp", "o_1i00vrfv46tp1qina4fn3l13q8a.webp", "o_1i00ui39e19541mh91t0he11e0fa.webp",
];

const PRODUCT_APPLICATIONS = {
  "soda-feldspar": ["Soda FeldSpar", "Enamel frits and glazes", "Fillers", "Ceramics", "Glass"],
  "potash-feldspar": ["Potash Feldspar", "Fillers", "Ceramics", "Glass"],
  talc: ["Talc", "Paper", "Coatings", "Ceramics", "Agriculture and Food"],
  "china-clay": ["China Clay", "Fibreglass", "Refractories", "Rubber", "Paint", "Fillers", "Ceramics", "Paper", "Sanitaryware"],
  quartz: ["Quartz", "Metallurgical Industry", "Chemicals", "Agriculture", "Paints and Plastics, Polymer Compounds, Rubber, Sealants and Adhesives", "Foundry Casting", "Glass", "Ceramics"],
  "ball-clay": ["Ball Clay", "Chemical applications", "Electrical porcelain insulators", "Construction ceramics", "Refractory clays", "Glazes and engobes", "Wall and floor tiles", "Tableware", "Sanitaryware"],
  mica: ["Mica", "Automotive", "Brake pads & Clutches", "Decoratives", "Drilling", "Fibre Cement", "Fire extinguisher", "Foundry", "Paints & Coatings", "Paper coatings", "Plastics", "Plasterboard & Joint compound", "Rubber", "Welding rods"],
};

const PRODUCT_APPLICATION_TEXT = {
  "soda-feldspar": "Glass, Vitrified Tiles, Special Electrical Porcelain insulators, Wind Plates, Sanitaryware, Bone china wares, Pottery, Vitrified Enamels, Frites, Tableware, Paint and more.",
  "potash-feldspar": "Ceramics, Glass, Vitrified Tiles, Special Electrical Porcelain insulators, Wind Plates, Sanitary wares, Bone china wares, Pottery, Vitrified Enamels, Frites, Tableware, Paint",
  talc: "Ceramic, sanitaryware, technical ceramics, paint, foundaries, plastic & rubber, cosmetic.",
  "china-clay": "Ceramics, Cosmetics, Paint, Rubber, Oraganic Farming and Agriculture, Paper, as a Filler in Edison Diamond Discs, Fibre Glass.",
  quartz: "Ceramic, Glassmaking, Abrasivematerial, Foundarysand, Petroleum industry, Quartz Slabs",
  "ball-clay": "Ceramic,tableware,sanitaryware,technicalceramic,electricporcetain",
};

const PRODUCT_IMAGE_FILES = {
  "soda-feldspar": "Soda FeldSpar.webp",
  "potash-feldspar": "Potash Feldspar.webp",
  talc: "Talc.webp",
  "china-clay": "China Clay.webp",
  quartz: "Quartz.webp",
  "ball-clay": "Ball Clay.webp",
  mica: "Mica.webp",
};

const EVENT_POSTS = [
  ["Indian Ceramics Gandhinagar 2025", "indian-ceramics-gandhinagar-2025", "o_1intscc4j1l0fviirk12dd1mv6a.webp"],
  ["Canton Fair China 2025", "canton-fair-china-2025", "o_1ints397j1ruh1prc1b1v1h9a4pa.webp"],
  ["ASEAN Ceramics 2024", "asean-ceramics-2024", "o_1ienflb6l1tq0hrk1un8d4pjca.webp"],
  ["Mactus Mineral at Unicera Istanbul 2024", "mactus-mineral-at-unicera-istanbul-2024", "o_1ia9qi11kn7113621pudcc718qsa.webp"],
  ["Cambuild Expo 2024", "cambuild-expo-2024", "o_1i5v04k7g1crrikv1ghnpggu1ea.webp"],
  ["Buildexpo Africa 2024", "buildexpo-africa-2024", "o_1i5uvmpgtn4415nu1ci01lhn1h16a.webp"],
  ["CONSTRUCT IRAQ Erbil 2024", "construct-iraq-erbil-2024", "o_1i5uved94170k1bk81rtprf0lkta.webp"],
  ["TECNA 2024", "tecna-2024", "o_1i5uuktku1l8ddnm1igbqp94p9a.webp"],
  ["Big5 Construct Nigeria 2024", "big5-construct-nigeria-2024", "o_1i5uua6b31das1jd6b81ept75aa.webp"],
  ["Japan Build Osaka 2024", "japan-build-osaka-2024", "o_1i5utiv6ul38f4e1fnv2vh1ss6a.webp"],
  ["Cersaie 2024", "cersaie-2024", "o_1i5ut417i1oo1sam13qu1c8h48ea.webp"],
  ["Kazbuild 2024", "kazbuild-2024", "o_1i5usmq221ur91p3f1cur1h1c17dva.webp"],
  ["The Los Angeles Build Expo 2024", "the-los-angeles-build-expo-2024", "o_1i3cnt9fe1bmt1drd75j1u94rr5a.webp"],
  ["EXPO DECONARQ 2024", "expo-deconarq-2024", "o_1i3cngakb182tbsledt17ub1860a.webp"],
  ["The Uganda Buildcon International Expo 2024", "the-uganda-buildcon-international-expo-2024", "o_1i3cmqdjq1ach1sqt1d8t1at415h9a.webp"],
  ["The Cachoeiro Stone Fair 2024", "the-cachoeiro-stone-fair-2024", "o_1i3clsmoja5lliv1bfm7cf1l63a.webp"],
  ["Korea Build Seoul 2024", "korea-build-seoul-2024", "o_1i0qucksb1i2pk5m1dgk12c1154na.webp"],
  ["The HBLF Show Jaipur 2024", "the-hblf-show-jaipur-2024", "o_1i0qtlor01lv7e9d2mmr1h1ra.webp"],
  ["MEGA CERAMICA MOROCCO 2024", "mega-ceramica-morocco-2024", "o_1i0qtesu6vo81sidauk1oqd1hi3a.webp"],
  ["ABI Expo Chennai 2024", "abi-expo-chennai-2024", "o_1i0qt7ink1iht16g6cm5167eqoea.webp"],
  ["Ceramic China 2024", "ceramic-china-2024", "o_1hvetrgk71u773t8rv31bbpd0pa.webp"],
  ["IndoBuildTech Tangerang 2024", "indobuildtech-tangerang-2024", "o_1hvetdl7c1ofsqpugj85ammaqa.webp"],
  ["D Cube 2024", "d-cube-2024", "o_1hvesfog31lk2jt81svb1okgf21a.webp"],
  ["ArchiBuild Expo 2024", "archibuild-expo-2024", "o_1hves3cmbjanveo75m1a031edfa.webp"],
  ["Kitchen+ Bathroom Show 2024", "kitchen-bathroom-show-2024", "o_1hverpf9c58a19i21vt71lmr1p5ha.webp"],
  ["The Architect & Interior Expo 2024", "the-architect-interior-expo-2024", "o_1hveqtg4p19rlrbq1fe91s4o8oma.webp"],
  ["Jakarta Surface Show 2024", "jakarta-surface-show-2024", "o_1hvel9kjfijrqlprqr10gg1vjpa.webp"],
  ["BuildExpo Kenya 2024", "buildexpo-kenya-2024", "o_1hvejv1qk17md410kjt1so62oa.webp"],
  ["Ace Reflect Chennai 2024", "ace-reflect-chennai-2024", "o_1ht6thcis19q91q9n1sfu10ss1in7a.webp"],
  ["Mega Ceramica Nigeria Expo 2024", "mega-ceramica-nigeria-expo-2024", "o_1ht6tavsl1j331if35vk1dlr1m73a.webp"],
  ["Kuwait Build 2024", "kuwait-build-2024", "o_1ht6stmafr0iodi1uhi1oinokna.webp"],
  ["Astana Build Kazakhstan 2024", "astana-build-kazakhstan-2024", "o_1hsvb98ss40k183b13881ob41hbja.webp"],
  ["Index Plus Mumbai 2024", "index-plus-mumbai-2024", "o_1hsvapbjm10g0131l1dpc15oecka.webp"],
  ["UK Construction Week 2024", "uk-construction-week-2024", "o_1hsvaalucpns6q21vid11td15tba.webp"],
  ["KERAMIKA Indonesia Expo 2024", "keramika-indonesia-expo-2024", "o_1hsv4ilq6to51m3b1mj61vl61sela.webp"],
  ["Vietnam Exhibition 2018", "vietnam-exhibition-2018", "o_1hsri3cg41ovlgfa19e7lm31v14a.webp"],
];

const PRODUCT_SPECS = {
  "potash-feldspar": ["K2O: 10% - 12%", "SiO2: 66% - 69%", "Al2O3: 17% - 19%", "Whiteness: >65°"],
  "china-clay": ["SiO2: 46% - 53%", "Al2O2: 32% - 38%", "Whiteness: >85°"],
};

function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeMineral, setActiveMineral] = useState(0);
  const [mineralsTouched, setMineralsTouched] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const currentTestimonial = TESTIMONIALS[testimonial];
  useEffect(() => {
    const id = window.setInterval(() => setHeroSlide((value) => (value + 1) % HERO_SLIDES.length), 7000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    // On small screens the strip is an accordion: rotate it until the visitor taps one.
    if (mineralsTouched || !window.matchMedia("(max-width: 960px)").matches) return undefined;
    const id = window.setInterval(() => setActiveMineral((value) => (value + 1) % PRODUCTS.length), 3800);
    return () => window.clearInterval(id);
  }, [mineralsTouched]);
  useEffect(() => {
    const id = window.setInterval(() => setTestimonial((value) => (value + 1) % TESTIMONIALS.length), 6000);
    return () => window.clearInterval(id);
  }, []);
  return <>
    <section className="ref-hero" aria-label="Mactus Mineral">
      {HERO_SLIDES.map(({ image }, index) => <img key={image} src={image} alt="" className={`ref-hero-image ${heroSlide === index ? "is-active" : ""}`} />)}
      <div className="ref-hero-shade" />
      <div className={`ref-hero-copy is-${HERO_SLIDES[heroSlide].position}`}>
        <h1 key={heroSlide}>{HERO_SLIDES[heroSlide].headline}</h1>
        <p className="ref-hero-sub">{HERO_SLIDES[heroSlide].sub}</p>
        <div className="ref-hero-actions"><Button href="/product/soda-feldspar">Explore minerals <Icon name="arrow" size={16} /></Button><Button href="/contact" variant="outline">Inquire now</Button></div>
      </div>
      <div className="ref-hero-controls" aria-label="Hero slides">{HERO_SLIDES.map((_, index) => <button type="button" key={index} aria-label={`Show slide ${index + 1}`} className={heroSlide === index ? "is-active" : ""} onClick={() => setHeroSlide(index)} />)}</div>
    </section>
    <section className="ref-about"><div className="ref-content ref-about-copy"><SectionTitle eyebrow="20+ YEARS EXPERT MINERAL SUPPLIER" title="Leading the Way in Ceramic Industry" /><p>Our group stands at the forefront of manufacturing, specializing in Refined Soda and Potash Feldspar. With technocrats boasting over 20 years of collective expertise in the Ceramic Industry, we guarantee products of the highest quality. From mining to processing and global distribution, we&apos;re committed to excellence every step of the way. In addition to feldspar, we pride ourselves on our extensive range of industrial minerals, including Talc,Kaolin Clay, Quartz, Ball Clay, Mica.</p><Button href="/company-profile">About Mactus <Icon name="arrow" size={16} /></Button></div></section>
    <section className="ref-minerals ref-content"><SectionTitle eyebrow="OUR MINERALS" title="Explore Our Premium Minerals" /><p className="ref-intro">As a leading manufacturer and supplier, we specialize in mining, processing, and selling industrial minerals. Our extensive range includes Soda Feldspar, Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay, and Mica. Equipped with fully integrated facilities, we oversee every stage of production, from mining and crushing to refining and testing.</p><div className="ref-mineral-strip">{PRODUCTS.map(([name, slug, image], index) => <Link key={slug} href={`/product/${slug}`} className={`ref-mineral ${activeMineral === index ? "is-active" : ""}`} style={{ backgroundImage: `linear-gradient(rgba(10,18,40,.45), rgba(10,18,40,.62)), url("${image}")` }} onMouseEnter={() => setActiveMineral(index)} onFocus={() => setActiveMineral(index)} onClick={(event) => { if (activeMineral !== index && window.matchMedia("(max-width: 960px)").matches) { event.preventDefault(); setActiveMineral(index); setMineralsTouched(true); } }}><span>{name}</span><em>View product <Icon name="arrow" size={14} /></em></Link>)}</div></section>
    <section className="ref-stats"><div className="ref-content ref-stats-grid">{STATS.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="ref-ventures ref-content"><SectionTitle eyebrow="MACTUS VENTURES" title="A Collective Force" /><p className="ref-intro">Mactus Group comprises a dynamic network of companies dedicated to excellence in providing premium-quality ceramic raw materials.With a commitment to innovation and quality, our group of companies stands as a beacon of reliability and sustainability in the industry.</p><div className="ref-venture-grid"><div><img src="/images/assets/aj-microns.svg" alt="A&J Microns" /><h3>A&J MICRONS Pvt. Ltd</h3></div><div><img src="/images/assets/Mactus_Logo.svg" alt="Mactus Mineral" /><h3>MACTUS MINERAL LLP</h3></div></div></section>
    <section className="ref-testimonials ref-content"><div className="ref-testimonial-images"><img src={currentTestimonial[0]} alt={currentTestimonial[2]} /></div><div className="ref-testimonial-copy"><SectionTitle eyebrow="WHAT OUR CLIENTS SAY" title="Testimonials" /><p>{currentTestimonial[1]}</p><h3>{currentTestimonial[2]}</h3><span>{currentTestimonial[3]}</span><div className="ref-dots">{TESTIMONIALS.map((_, index) => <button key={index} className={index === testimonial ? "is-current" : ""} aria-label={`Show testimonial ${index + 1}`} onClick={() => setTestimonial(index)} />)}</div></div></section>
    <section className="ref-applications"><div className="ref-content"><SectionTitle eyebrow="" title="Best Suited Applications" /><div className="ref-application-grid">{APPLICATIONS.map(([name, image]) => <div key={name}><img src={`/images/assets/${image}`} alt={name} /><span>{name}</span></div>)}</div></div></section>
  </>;
}

function ContactPage() {
  return <main className="ref-contact-page">
    <PageBanner eyebrow="GET IN TOUCH" title="Contact us" image="https://mactus.co.in/images/banner/contact%20us.webp" />
    <section className="ref-contact-details ref-content">
      <Card><span className="ref-contact-icon"><Icon name="phone" size={30} /></span><h2>Contact Us</h2><a href="tel:+919824066283">+91 98240 66283</a><a href="tel:+917575053447">+91 75750 53447</a></Card>
      <Card><span className="ref-contact-icon"><Icon name="pin" size={30} /></span><h2>Factory Address</h2><p>8-A National Highway,<br />Sokhada Road, Vaghpur(Piludi),<br />Morbi-363642 (Gujarat) India.</p></Card>
      <Card><span className="ref-contact-icon"><Icon name="mail" size={30} /></span><h2>Get In Touch With us</h2><a href="mailto:info@mactus.co.in">info@mactus.co.in</a><a href="mailto:niks@mactus.co.in">niks@mactus.co.in</a></Card>
    </section>
    <section className="ref-contact-form-wrap">
      <div className="ref-content ref-contact-layout">
        <ContactForm />
        <iframe className="ref-contact-map" title="A&J Minechem Pvt. Ltd. location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6916934689557!2d70.80355997531422!3d23.035089679164987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598d592ba54ecd%3A0x575d3f1b666fdd1b!2sAJ%20Minechem%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1714985532638!5m2!1sen!2sin" loading="lazy" />
      </div>
    </section>
  </main>;
}

function CompanyProfilePage() {
  return <main className="ref-detail ref-profile-page">
    <PageBanner eyebrow="COMPANY PROFILE" title="Legacy of 20+ Years in Mineral Supply" image="/images/mactus/hero/hero-minerals-clean.webp" />
    <section className="ref-profile-content ref-content">
      <div className="ref-profile-mark"><img src="/images/assets/Mactus_Logo.svg" alt="MACTUS — THE TRUSTED SOLUTION PARTNER" /></div>
      <div className="ref-profile-copy"><SectionTitle eyebrow="COMPANY PROFILE" title="Legacy of 20+ Years in Mineral Supply" />
        <p>Our Group stands at the forefront of manufacturing, specializing in refined soda and potash feldspar. With over two decades of expertise in the Ceramic Industry, our technocrats lead the charge in producing top-quality materials.</p>
        <ul><li>Advanced Mineral Processing</li><li>Consistent Quality</li><li>Reliable Supply Chain</li><li>Client-Centric Approach</li></ul>
        <h3>Your Trusted Mineral Solutions Partner</h3>
      </div>
    </section>
  </main>;
}

function ProductPage({ product }) {
  const [tab, setTab] = useState("Properties");
  const [name, slug] = product;
  const image = `https://mactus.co.in/uploads/media/${encodeURIComponent(PRODUCT_IMAGE_FILES[slug])}`;
  const tabs = ["Properties", "Technical Specification", "Packing Sizes", "Key Features"];
  const specs = PRODUCT_SPECS[slug];
  return <main className="ref-product-page">
    <PageBanner eyebrow="" title="PRODUCTS" />
    <section className="ref-product-intro ref-content"><img src={image} alt={name} /><div><SectionTitle eyebrow="mactus" title={name} /><p>{PRODUCT_COPY[slug]}</p><h2>Application</h2><p>{PRODUCT_APPLICATION_TEXT[slug] || ""}</p><div className="ref-product-actions"><Button href="/contact">Product inquiry <Icon name="arrow" size={16} /></Button><Button href="/catalogue" variant="outline">Catalogue</Button></div></div></section>
    <section className="ref-product-data ref-content"><div className="ref-product-tabs" role="tablist" aria-label={`${name} details`}>{tabs.map((label) => <button key={label} type="button" role="tab" aria-selected={tab === label} className={tab === label ? "is-selected" : ""} onClick={() => setTab(label)}>{label}</button>)}</div>
      <div className="ref-product-tab-panel" role="tabpanel">{tab === "Properties" ? <h2>{name}</h2> : tab === "Technical Specification" && specs ? <dl>{specs.map((spec) => <div key={spec}><dt>{spec.split(":")[0]}</dt><dd>{spec.split(":").slice(1).join(":").trim()}</dd></div>)}</dl> : <h2>Coming Soon</h2>}</div>
    </section>
    <section className="ref-product-applications ref-content"><SectionTitle eyebrow="" title={`Applications Of ${name}`} /><div className="ref-product-application-grid">{(PRODUCT_APPLICATIONS[slug] || [name]).map((application) => <Card key={application}><img src={`https://mactus.co.in/uploads/media/thumbnails/${encodeURIComponent(`${application}.webp`)}`} alt="" loading="lazy" /><h3>{application}</h3></Card>)}</div></section>
  </main>;
}

function NotFound() {
  return <main className="ref-route-content ref-content"><h1>Page not found</h1><ReadMore href="/">Back to home</ReadMore></main>;
}

function CompanyRoutePage({ route }) {
  if (route === "company-profile") return <CompanyProfilePage />;
  if (route === "contact") return <ContactPage />;
  const page = ROUTE_COPY[route];
  const isDetail = route.startsWith("blog-detail/") || route.startsWith("event-detail/");
  if (!page && !isDetail) return <NotFound />;
  const [eyebrow, title, copy] = page || [];
  if (route === "quality") return <main><PageBanner eyebrow="" title="QUALITY" /><section className="ref-route-content ref-content"><div className="ref-quality-intro"><img src="/images/mactus/quality/aboutus-1.webp" alt="Mactus Mineral quality control" /><div><SectionTitle eyebrow="" title="Quality Assurance" /><p>{copy}</p><p>Our quality people can characterize in details your products’ samples and consequently help you get the most out of your product. This service is available on our platforms, notably in developing countries. our separate quality control system helps us to deal with the inspection of every product to ensure quality.</p></div></div><h2>Choose Your Support Online</h2><div className="ref-support-grid">{["Knowledge Base", "Customer 360", "Task and Alerts", "Automation", "Database Software", "Articles"].map((item) => <Card key={item}><h3>{item}</h3><p>Knowledge base that organized collection system</p></Card>)}</div><h2>Research &amp; Development</h2><div className="ref-lab-grid">{[["Gradient Kiln", "GradientKiln.jpg"], ["ED-XRF Spectrometer", "ED-XRFSpectrometer.jpeg"], ["Color Spectrometer", "ColorSpectrometer1.jpg"], ["Water Absorption", "4.jpg"], ["Dilatometer", "Dilatometer.jpeg"], ["Particle Size Analyser", "ParticleSizeAnalyer.jpeg"]].map(([item, image]) => <Card key={item}><img src={`/images/mactus/quality/${image}`} alt={item} /><h3>{item}</h3></Card>)}</div></section></main>;
  if (route === "plant-photos") return <main><PageBanner eyebrow="" title="PLANT PHOTOS" image="https://mactus.co.in/images/banner/plant.webp" /><section className="ref-route-content ref-content"><div className="ref-plant-gallery">{["o_1hsmp8qou1na6g0g54vr9ejssg.webp", "o_1hsmp8qou1shu1n8tlsjpptfifh.webp", "o_1hsmp8qoubvv65ppb3t111st3i.webp", "o_1hsmp8qou3b01rov1fb2or4tg0j.webp", "o_1hsmp8qou1vpls2h1l981lomlgek.webp", "o_1hsmp8qougtq64ccblrjr1903l.webp", "o_1hsmp8qouf8q1lvjf8hianki2m.webp"].map((image) => <img key={image} src={`https://mactus.co.in/uploads/infrastructure/${image}`} alt="Mactus Mineral plant" />)}</div></section></main>;
  if (route === "achievement") return <main><PageBanner eyebrow="" title="ACHIEVEMENT" /><section className="ref-route-content ref-content"><SectionTitle eyebrow="" title="Explore Our Premium Minerals" /><p>{copy}</p><div className="ref-achievement-list"><Card><b>01</b><h2>India’s first premium quality 200 mesh feldspar powder</h2><p>First time in India premium quality mesh feldspar powder by wet type processing plantinclude dryer.</p></Card><Card><b>02</b><h2>India’s largest wet type processing plant.</h2><p>We produce more than 550000 TPA mesh feldspar powder.</p></Card></div></section></main>;
  if (route === "export") return <main><PageBanner eyebrow="" title="EXPORT" /><section className="ref-export-content ref-content"><img src="https://mactus.co.in/images/export.webp" alt="Export" /><div><SectionTitle eyebrow="" title={title} /><p>{copy}</p><p>Our commitment as a trusted provider of ceramic raw materials worldwide is reflected in our diverse product range and our ability to customize solutions to meet the unique needs of our clients. Bolstering our global presence, we are backed by a robust logistics network spanning roads, railways, and maritime routes, allowing us to effectively manage fluctuating order demands through streamlined supply chain management.</p></div></section><section className="ref-export-countries ref-content"><h2>Exporting to various Places Like</h2><div>{[["Australia", "australia"], ["Azerbaijan", "azerbaijan"], ["Canada", "canada"], ["Colombia", "colombia"], ["Jordan", "jordan"], ["Kosovo", "kosovo"], ["Oman", "oman"], ["Peru", "peru"], ["Poland", "poland"], ["Qatar", "qatar"], ["Romania", "romania"], ["Russia", "russia"], ["Saudi Arabia", "saudi_arabia"], ["UAE", "united_arab_emirates"], ["United Kingdom", "united_kingdom"], ["USA", "united_states"], ["Venezuela", "venezuela"], ["Vietnam", "vietnam"], ["Yemen", "yemen"]].map(([country, image]) => <Card key={country}><img src={`https://mactus.co.in/images/export/${image}.webp`} alt={country} /><span>{country}</span></Card>)}</div></section></main>;
  if (route === "catalogue") return <main><PageBanner eyebrow="" title="CATALOGUE" /><section className="ref-catalogue-content ref-content"><SectionTitle eyebrow="" title="MACTUS MINERAL LLP - INDUSTRIAL MINERALS MANUFACTURER AND EXPORTER" /><Button href="https://mactus.co.in/uploads/catalogue/MACTUS_MINERAL_LLP.pdf">Download catalogue <Icon name="download" size={16} /></Button></section></main>;
  if (route === "blog") return <main><PageBanner eyebrow="NEWS & BLOG" title="NEWS & BLOG" image="https://mactus.co.in/images/banner/blog.webp" /><section className="ref-blog-list ref-content">{BLOG_POSTS.map(([post, slug, date], i) => <Card key={slug}><Link href={`/blog-detail/${slug}`}><img src={`https://mactus.co.in/uploads/media/${BLOG_IMAGES[i]}`} alt={post} /></Link><time>{date}</time><h2><Link href={`/blog-detail/${slug}`}>{post}</Link></h2><Link className="ref-read-more" href={`/blog-detail/${slug}`}>Read More</Link></Card>)}</section></main>;
  if (route === "social-media") return <main><PageBanner eyebrow="" title="SOCIAL MEDIA" /><section className="ref-route-content ref-content"><p>NO ANY INSTAGRAM POST FOUND ...</p></section></main>;
  if (route === "client") return <main><PageBanner eyebrow="" title="CLIENTS" image="/images/mactus/clients/clients-banner.webp" /><section className="ref-client-grid ref-content">{[["acecon", "Acecon"], ["cosa", "Cosa"], ["creanza", "Creanza"], ["duracon", "Duracon"], ["eracon", "Eracon"], ["jaxx", "Jaxx"], ["koyo", "Koyo"], ["maps", "Maps"], ["nexion", "Nexion"], ["ramest_granito", "Ramest Granito"], ["redstone", "Redstone"], ["royal_touch", "Royal Touch"], ["sega", "Sega"], ["sentosa", "Sentosa"], ["simpolo", "Simpolo"], ["sims", "Sims"], ["siyaram", "Siyaram"], ["sonet", "Sonet"]].map(([image, name]) => <div key={image}><img src={`/images/mactus/clients/${image}.webp`} alt={name} /></div>)}</section></main>;
  if (route === "event") return <main><PageBanner eyebrow="" title="NEWS & EVENTS" image="https://mactus.co.in/images/banner/plant.webp" /><section className="ref-blog-list ref-event-list ref-content">{EVENT_POSTS.map(([title, slug, image]) => <Card key={slug}><Link href={`/event-detail/${slug}`}><img src={`https://mactus.co.in/uploads/media/${image}`} alt={title} /></Link><h2><Link href={`/event-detail/${slug}`}>{title}</Link></h2><Link className="ref-read-more" href={`/event-detail/${slug}`}>Read More</Link></Card>)}</section></main>;
  if (route.startsWith("blog-detail/")) {
    const slug = route.slice("blog-detail/".length);
    const post = BLOG_POSTS.find((entry) => entry[1] === slug);
    if (!post) return <NotFound />;
    return <main><PageBanner eyebrow={post[0].toUpperCase()} title={post[0]} image={`https://mactus.co.in/uploads/media/${BLOG_IMAGES[BLOG_POSTS.indexOf(post)]}`} /><section className="ref-article-content ref-content"><h1>{post[0]}</h1><time>{post[2]}</time>{slug === "different-grades-of-feldspar-lumps-and-their-industrial-uses" ? <><p>Feldspar is one of the most common minerals on the earth and it comprises a major constituent of igneous rocks, metamorphic rocks as well as sedimentary rocks. Its special chemical composition (mainly aluminosilicates of potassium, sodium, and calcium) makes it invaluable to a vast number of industries. The choice of the appropriate grades of feldspar lumps is important in obtaining the intended performance in glass, ceramics, fillers, etc.</p><h2>Types and Grades of Feldspar</h2><p>Feldspar is commercially classified based on its dominant alkali content:</p><ul><li>Soda Feldspar (Sodium Feldspar): High in Na₂O, low in K₂O; prized for glassmaking due to its fluxing properties and low iron content.</li><li>Potash Feldspar (Potassium Feldspar): High in K₂O, low in Na₂O; preferred in ceramics for its ability to enhance vitrification and strength.</li><li>Mixed Feldspars: Contain significant amounts of both sodium and potassium, offering a balance of properties for blended industrial applications.</li></ul><h2>Processing and Grading of Feldspar Lumps</h2><p>After mining, feldspar lumps undergo several processing steps:</p><ul><li>Drying: Removes moisture for easier handling and storage.</li><li>Milling: Achieves the required particle size for specific applications.</li><li>Blending: Customizes the alkali and alumina content by mixing different grades.</li></ul></> : null}<ReadMore href="/blog">News & Blog</ReadMore></section></main>;
  }
  if (route.startsWith("event-detail/")) {
    const event = EVENT_POSTS.find((item) => item[1] === route.slice("event-detail/".length));
    if (!event) return <main className="ref-route-content ref-content"><h1>Page not found</h1><ReadMore href="/event">NEWS & EVENTS</ReadMore></main>;
    const [title, slug, image] = event;
    return <main><PageBanner eyebrow="" title="NEWS & EVENTS" image="https://mactus.co.in/images/banner/plant.webp" /><article className="ref-event-detail ref-content"><img src={`https://mactus.co.in/uploads/media/${image}`} alt={title} /><div><h1>{title}</h1>{slug === "indian-ceramics-gandhinagar-2025" && <><p>Indian Ceramics Gandhinagar 2025 is India’s premier trade fair for the ceramic and brick industry. It will be held at the Helipad Exhibition Centre, Gandhinagar from March 5 to March 7, 2025. The event offers a unique opportunity for leading industry manufacturers, suppliers, and ceramic production to display the scene of ceramic making, raw materials, and machinery. The exhibition is a global meeting point and has enabled participants from every part of the world to build partnerships and enable knowledge sharing that sustains innovation and growth in the sector.</p><p>This will be an all-encompassing exhibition that includes every product category within the manufacturing chain of various segments of the ceramic industry. The mentioned products are ceramics tiles, sanitaryware, tableware, heavy clay ceramics, advanced ceramics, kilns &amp; equipment, glazing &amp; decoration materials, and raw materials. It will also feature the latest in automated, digital printing, energy efficient and green manufacturing technologies. Live demonstrations, interaction with industry experts, and discovering the latest trends that will be shaping the future of ceramics in the ceramics manufacturing process.</p><p>Mactus Minerals, a leading manufacturer and supplier of industrial minerals, will be exhibiting at Booth No. C205. Mactus Minerals has a strong presence in the mineral industry and supplies high-quality minerals for ceramics, glass, construction and paints and coatings. Visitors will have an opportunity to discover their vast product portfolio, comprehend the effect of the mineral on various industries, and connect with professionals to learn more about customized mineral solutions during their participation in Indian Ceramics Gandhinagar 2025. Don&apos;t forget to come to see Booth C205 to experience the best in mineral quality designed to increase industrial performance and efficiency!</p><p>Date: 5th to 7th March 2025</p><p>Venue: Booth No. C205, Helipad Exhibition Centre, Gandhinagar</p></>}</div><ReadMore href="/event">NEWS &amp; EVENTS</ReadMore></article></main>;
  }
  return <main><PageBanner eyebrow={eyebrow} title={title} /><section className="ref-route-content ref-content"><SectionTitle eyebrow={eyebrow} title={title} /><p>{copy}</p></section></main>;
}

function DetailPage({ route }) {
  if (route.startsWith("product/")) {
    const product = PRODUCTS.find(([, slug]) => route === `product/${slug}`);
    return product ? <ProductPage key={product[1]} product={product} /> : <NotFound />;
  }
  return <CompanyRoutePage route={route} />;
}

export default function MactusSite({ route = "" }) {
  const pathname = usePathname();
  // Every page change starts at the top, instantly (smooth scrolling made it land at random offsets).
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  // Keyed by path so the header (and its open mobile menu) resets after each navigation.
  return <><Header key={pathname} />{route ? <DetailPage route={route} /> : <main><Home /></main>}<Footer /><FloatingActions /></>;
}
