// ============================================
// LEO NEXUS PORTAL — DISTRICT & MULTIPLE DISTRICT PROFILES
// ============================================

import { auth } from '../auth.js';
import { store } from '../store.js?v=20261102_v12';
import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderHeader, initHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { showModal } from '../components/modal.js';

function getInitials(name) {
  if (!name) return 'LO';
  const clean = String(name).replace(/^(Leo Lion|Lion|Leo)\s+/i, '').trim();
  const parts = clean.split(' ').filter(Boolean);
  if (parts.length === 0) return 'LO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatPhone(phone) {
  if (!phone) return '';
  const clean = String(phone).replace(/\D/g, '');
  if (clean.length === 10 && clean.startsWith('0')) {
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
  }
  if (clean.length === 9) {
    return `0${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`;
  }
  return String(phone);
}

function rawPhone(phone) {
  if (!phone) return '';
  const clean = String(phone).replace(/\D/g, '');
  if (clean.length === 9 && !clean.startsWith('0')) {
    return '0' + clean;
  }
  return clean;
}

export const DEFAULT_DISTRICT_OFFICERS = [
  {
    order: 1,
    role: "District President",
    name: "Leo Lion Vinuk Thismalpola",
    club: "Leo Club of University of Colombo Faculty of Science",
    memberId: "6005220",
    phone: "0765624434",
    email: "vthismalpola@gmail.com",
    address: "78/B, Ananda Balika Mawatha, Pitakotte",
    dob: "18/09/2001",
    category: "Executive Committee",
    badge: "DP"
  },
  {
    order: 2,
    role: "Immediate Past District President",
    name: "Leo Lion Yashika Nethmini",
    club: "Leo Club of Mount Lavinia Orient Centennial",
    memberId: "",
    phone: "0769916688",
    email: "yashi.nethmini@gmail.com",
    address: "",
    dob: "",
    category: "Executive Committee",
    badge: "IPDP"
  },
  {
    order: 3,
    role: "District Vice President",
    name: "Leo Lion Manish Perera",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "6163565",
    phone: "0774338308",
    email: "manishperera0205@gmail.com",
    address: "194, Udakanampella, Pugoda",
    dob: "02/05/2002",
    category: "Executive Committee",
    badge: "DVP"
  },
  {
    order: 4,
    role: "District Leo Chairperson",
    name: "Lion Suranjani Wickramarathne",
    club: "Lions Club of Colombo Host",
    memberId: "",
    phone: "0777281750",
    email: "suranjani567@yahoo.com",
    address: "",
    dob: "",
    category: "Executive Committee",
    badge: "DLC"
  },
  {
    order: 5,
    role: "Deputy Leo Chairperson",
    name: "Leo Lion Dilshan Pieris",
    club: "Lions Club of Moratuwa",
    memberId: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    category: "Executive Committee",
    badge: "Deputy DLC"
  },
  {
    order: 6,
    role: "District Secretary",
    name: "Leo Lion Hashini Nethmika",
    club: "Leo Club of University of Colombo Faculty of Arts",
    memberId: "6270352",
    phone: "0752770922",
    email: "nethmikahashini64@gmail.com",
    address: "",
    dob: "06/09/2002",
    category: "Executive Committee",
    badge: "DS"
  },
  {
    order: 7,
    role: "District Treasurer",
    name: "Leo Lion Bathisha Kavinda",
    club: "Leo Club of University of Colombo Faculty of Science",
    memberId: "6196553",
    phone: "0703593154",
    email: "iambathisha@gmail.com",
    address: "344/H, Batagama north, jaela",
    dob: "20/11/2001",
    category: "Executive Committee",
    badge: "DT"
  },
  {
    order: 8,
    role: "District Membership Chairperson",
    name: "Leo Lion Sanduni Theekshana",
    club: "Leo Club of Colombo (Host)",
    memberId: "5727258",
    phone: "0758650060",
    email: "leo.sandunitheekshana@gmail.com",
    address: "294/C, Mulleriyawa North, Angoda.",
    dob: "21/06/1999",
    category: "Executive Committee",
    badge: "DMC"
  },
  {
    order: 9,
    role: "District Assistant Secretary",
    name: "Leo Lion Prabhavee Mayasha",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "6208905",
    phone: "0770045416",
    email: "prabhaveemayasha2002@gmail.com",
    address: "251/1/A, Moratuwa Road, Suwarapola, Piliyandala",
    dob: "28/12/2002",
    category: "Executive Committee",
    badge: "DAS"
  },
  {
    order: 10,
    role: "District Assistant Secretary",
    name: "Leo Dulari Christoper",
    club: "Leo Club of UOC Alumni",
    memberId: "5379433",
    phone: "0719933330",
    email: "christopherdulari@gmail.com",
    address: "96, Vystwyke rd, Colombo 15",
    dob: "07/12/1998",
    category: "Executive Committee",
    badge: "DAS"
  },
  {
    order: 11,
    role: "District Assistant Treasurer",
    name: "Leo Lion Chamal Pramod",
    club: "Leo Club of Moratuwa",
    memberId: "6012135",
    phone: "0711952062",
    email: "chamalps21@gmail.com",
    address: "365/65, Wimalarathana rd, Kudaarukgoda, Alubomulla",
    dob: "21/04/1996",
    category: "Executive Committee",
    badge: "DAT"
  },
  {
    order: 12,
    role: "District Assistant Treasurer",
    name: "Leo Oshada Tharusha",
    club: "Leo Club of Mount Lavinia Orient Centennial",
    memberId: "6394323",
    phone: "0707032981",
    email: "oshadhatharusha1@gmail.com",
    address: "102/11, Udapeekwalla rd, Maddawatta, Matara.",
    dob: "17/05/2005",
    category: "Executive Committee",
    badge: "DAT"
  },
  {
    order: 13,
    role: "Chief Council Coordinator",
    name: "Leo Lion Randiv De Silva",
    club: "Leo Club of Moratuwa 2020",
    memberId: "6350895",
    phone: "0767658129",
    email: "Sanuth.desilva@gmail.com",
    address: "116/5, Justin Dias Mawatha, Egodauyana, Moratuwa",
    dob: "25/06/2004",
    category: "Chief Coordinators & Editor",
    badge: "CCC"
  },
  {
    order: 14,
    role: "Chief Regional Coordinator",
    name: "Leo Lion Kasun Sapumohotti",
    club: "Leo Club of Moratuwa",
    memberId: "6047384",
    phone: "0779935395",
    email: "kasunsapumohotti30@gmail.com",
    address: "No.05, Nadun Uyana, Andugoda, Dikkumbura, Galle",
    dob: "29/02/2000",
    category: "Chief Coordinators & Editor",
    badge: "CRC"
  },
  {
    order: 15,
    role: "Chief Operational Coordinator",
    name: "Leo Kulindu Thenuka Bopage",
    club: "Leo Club of Royal Achievers",
    memberId: "",
    phone: "0715289759",
    email: "kulinduthenuka.lcra@gmail.com",
    address: "\"Randi\", Malegoda, Payagala",
    dob: "12/12/2000",
    category: "Chief Coordinators & Editor",
    badge: "COC"
  },
  {
    order: 16,
    role: "Chief Performance Coordinator",
    name: "Leo Lion Savidya Ranawaka",
    club: "Leo Club of University of Colombo Faculty of Science",
    memberId: "26815475",
    phone: "0777644824",
    email: "savidyaranawaka17@gmail.com",
    address: "282/B, Lumbini Place, Thalawathugoda",
    dob: "17/06/2002",
    category: "Chief Coordinators & Editor",
    badge: "CPC"
  },
  {
    order: 17,
    role: "Chief IT and Strategic Coordinator",
    name: "Leo Lion Senuth Wanniarachchi",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "26866603",
    phone: "0774158788",
    email: "senuthdilnadarox@gmail.com",
    address: "No 4-B, Maitipe 2nd Lane, Galle",
    dob: "20/10/2006",
    category: "Chief Coordinators & Editor",
    badge: "CITSC"
  },
  {
    order: 18,
    role: "Chief PR and Branding Coordinator",
    name: "Leo Lion Dinath Wijesooriya",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "26761326",
    phone: "0761087967",
    email: "dinathwijesooriya@gmail.com",
    address: "38/6A Wekunagoda Road, Galle",
    dob: "13/08/2003",
    category: "Chief Coordinators & Editor",
    badge: "CPRBC"
  },
  {
    order: 19,
    role: "Chief Editor",
    name: "Leo Lion Uvini Imalna",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "27194977",
    phone: "0743423494",
    email: "uviniwa1123@gmail.com",
    address: "No:38, Kingscourt, Thalpawila, Kekanadura, Matara",
    dob: "23/11/2007",
    category: "Chief Coordinators & Editor",
    badge: "CE"
  },
  {
    order: 20,
    role: "Regional Director - Region A",
    name: "Leo Dewmi Tharunya",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "26866618",
    phone: "0770538457",
    email: "dewmitharunya2@gmail.com",
    address: "\"Damruk\", Walahanduwa, Galle",
    dob: "24/10/2006",
    category: "Regional & Zonal Leadership",
    badge: "RD-A"
  },
  {
    order: 21,
    role: "Regional Director - Region B",
    name: "Leo Hiruni Fernando",
    club: "Leo Club of Colombo (Host)",
    memberId: "5577538",
    phone: "0719267661",
    email: "hirufernando26@gmail.com",
    address: "\"Aneeta\", Jude Road, Diyalagoda, Maggona",
    dob: "11/06/1998",
    category: "Regional & Zonal Leadership",
    badge: "RD-B"
  },
  {
    order: 22,
    role: "Zonal Director - Zone A1",
    name: "Leo Nadeesha Mayomi Ekanayaka",
    club: "Leo Club of University of Colombo Faculty of Arts",
    memberId: "26867439",
    phone: "0781895516",
    email: "mayomiekanayaka2002@gmail.com",
    address: "Behind the Fair Road, Galapitiyagama, Nikaweratiya",
    dob: "04/03/2002",
    category: "Regional & Zonal Leadership",
    badge: "ZD-A1"
  },
  {
    order: 23,
    role: "Zonal Director - Zone A2",
    name: "Leo Lion Udara Nawarathna",
    club: "Leo Club of University of Colombo Faculty of Science",
    memberId: "6260655",
    phone: "0776952731",
    email: "udaran92@gmail.com",
    address: "No.90/1, Nagolla Road, Kegalle",
    dob: "14/01/2003",
    category: "Regional & Zonal Leadership",
    badge: "ZD-A2"
  },
  {
    order: 24,
    role: "Zonal Director - Zone B1",
    name: "Leo Vihanga Kothalawala",
    club: "Leo Club of Moratuwa",
    memberId: "27033559",
    phone: "0741612668",
    email: "vihangakothalawsla@gmail.com",
    address: "No.08, 1st Lane, Rawathawaththa, Moratuwa.",
    dob: "06/09/2004",
    category: "Regional & Zonal Leadership",
    badge: "ZD-B1"
  },
  {
    order: 25,
    role: "Zonal Director - Zone B2",
    name: "Leo Meuni Liyanage",
    club: "Leo Club of Kalutara Balika Vidyalaya",
    memberId: "6219400",
    phone: "0741140564",
    email: "meuniliyanage726@gmail.com",
    address: "\"Kalhari\", Bombuwala, Kalutara",
    dob: "26/07/2007",
    category: "Regional & Zonal Leadership",
    badge: "ZD-B2"
  },
  {
    order: 26,
    role: "Co-Head - District Service Committee",
    name: "Leo Sudam Jayawardana",
    club: "Leo Club of Mount Lavinia Orient Centennial",
    memberId: "6005154",
    phone: "0771646116",
    email: "sudamjayawardana06@gmail.com",
    address: "156/5G, 6th lane, Weragala place, Thalawathugoda",
    dob: "06/11/2000",
    category: "District Committee Leadership",
    badge: "DSC"
  },
  {
    order: 27,
    role: "Co-Head - District Service Committee",
    name: "Leo Treveen Rozairo",
    club: "Leo Club of Prince of Wales College",
    memberId: "26935999",
    phone: "0705631777",
    email: "treveenrozairo500@gmail.com",
    address: "16/A, 5th Lane, Rawathawatta, Moratuwa",
    dob: "10/07/2007",
    category: "District Committee Leadership",
    badge: "DSC"
  },
  {
    order: 28,
    role: "Head - District Talent Committee",
    name: "Leo Lion Thenuji Jayakody",
    club: "Leo Club of Princess of Wales College",
    memberId: "27005837",
    phone: "0702901180",
    email: "thenujijayakody@gmail.com",
    address: "28/3/1, Gangaboda Road, Wewala, Piliyandala",
    dob: "05/08/2008",
    category: "District Committee Leadership",
    badge: "DTC"
  },
  {
    order: 29,
    role: "Head - District Sports Committee",
    name: "Leo Lithira Kalubowila",
    club: "Leo Club of UOC Alumni",
    memberId: "27154893",
    phone: "0710495670",
    email: "lithiratk@gmail.com",
    address: "7/2, Temple road, Kalutara north",
    dob: "31/05/2007",
    category: "District Committee Leadership",
    badge: "DSC"
  },
  {
    order: 30,
    role: "Head - IT and Infastructure Committee",
    name: "Leo Buddika Ashan",
    club: "Leo Club of Colombo (Host)",
    memberId: "27202047",
    phone: "0788861811",
    email: "BuddikaAshanSilva@Hotmail.com",
    address: "36/13, Vijayaraja MW, Nadimala, Dehiwala",
    dob: "18/05/2003",
    category: "District Committee Leadership",
    badge: "ITC"
  },
  {
    order: 31,
    role: "Head - PR Committee",
    name: "Leo Lion Deveen Rathnayaka",
    club: "Leo Club of Informatics Institute of Technology (IIT)",
    memberId: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    category: "District Committee Leadership",
    badge: "PRC"
  }
];

export const DEFAULT_MD_OFFICERS = [
  {
    order: 1,
    role: "Multiple District President",
    name: "Leo Nisal Dulmith FLM",
    district: "Multiple District 306",
    phone: "0774497047",
    email: "leonisaldulmith@gmail.com",
    dob: "12/09/1997",
    category: "Executive Committee",
    badge: "MDP"
  },
  {
    order: 2,
    role: "Immediate Past Multiple District President",
    name: "Leo Lion Rageesh Yogeswaran MJF PMAF PFLM RLLI",
    district: "Multiple District 306",
    phone: "0772639274",
    email: "rageesh@leomd306.org",
    dob: "26/06/1996",
    category: "Executive Committee",
    badge: "IPMDP"
  },
  {
    order: 3,
    role: "Multiple District Vice President",
    name: "Leo Lion Sunera Naveed MAF FLM",
    district: "Multiple District 306",
    phone: "0767891020",
    email: "sunera@leomd306.org",
    dob: "20/10/2000",
    category: "Executive Committee",
    badge: "MDVP"
  },
  {
    order: 4,
    role: "Multiple District Secretary",
    name: "Leo Lion Sajani Wijesuriya",
    district: "Multiple District 306",
    phone: "0715577228",
    email: "wanthilawijesuriya@gmail.com",
    dob: "16/09/1996",
    category: "Executive Committee",
    badge: "MDS"
  },
  {
    order: 5,
    role: "Multiple District Treasurer",
    name: "Leo Lion Lasikumar Parameswaran",
    district: "Multiple District 306",
    phone: "0755828387",
    email: "Lasikumar1996@gmail.com",
    dob: "28/07/1996",
    category: "Executive Committee",
    badge: "MDT"
  },
  {
    order: 6,
    role: "Multiple District Membership Chairperson",
    name: "Leo Anjana Udesh FLM",
    district: "Multiple District 306",
    phone: "0710417588",
    email: "anjanaudesh123@gmail.com",
    dob: "27/05/1997",
    category: "Executive Committee",
    badge: "MDMC",
    additionalRoles: ["Orientation Committee", "Operations Committee"],
    portfolioNote: "Head - Orientation & Operations Committees"
  },
  {
    order: 7,
    role: "Multiple District Assistant Secretary",
    name: "Leo Sachith Lakshan",
    district: "Multiple District 306",
    phone: "0711489927",
    email: "sachithl.leo@gmail.com",
    dob: "20/01/1999",
    category: "Executive Committee",
    badge: "MDAS"
  },
  {
    order: 8,
    role: "Multiple District Assistant Secretary",
    name: "Leo Devinda Perera",
    district: "Multiple District 306",
    phone: "0714085967",
    email: "devinda2001perera@gmail.com",
    dob: "02/10/2001",
    category: "Executive Committee",
    badge: "MDAS"
  },
  {
    order: 9,
    role: "Multiple District Assistant Treasurer",
    name: "Leo Lion Laxshan Arunasalam",
    district: "Multiple District 306",
    phone: "0764649634",
    email: "laxshana.leolion@gmail.com",
    dob: "06/06/2002",
    category: "Executive Committee",
    badge: "MDAT"
  },
  {
    order: 10,
    role: "Multiple District Assistant Treasurer",
    name: "Leo Peenaka Wedamulla",
    district: "Multiple District 306",
    phone: "0703189612",
    email: "peenakawedamulla123@gmail.com",
    dob: "21/08/2001",
    category: "Executive Committee",
    badge: "MDAT"
  },
  {
    order: 11,
    role: "District President",
    name: "Leo Lion Vinuk Thismalpola",
    district: "District 306 D1",
    phone: "0765624434",
    email: "vthismalpola@gmail.com",
    dob: "18/09/2001",
    category: "District Presidents Council",
    badge: "DP-D1"
  },
  {
    order: 12,
    role: "District President",
    name: "Leo Lion Buddhika Abenayake",
    district: "District 306 D2",
    phone: "0774598115",
    email: "buddhika@leodistrict306a2.org",
    dob: "06/01/2000",
    category: "District Presidents Council",
    badge: "DP-D2"
  },
  {
    order: 13,
    role: "District President",
    name: "Leo Lion Chanuka Wijeweera",
    district: "District 306 D3",
    phone: "0772874743",
    email: "chanukawvk@gmail.com",
    dob: "24/04/2003",
    category: "District Presidents Council",
    badge: "DP-D3"
  },
  {
    order: 14,
    role: "District President",
    name: "Leo Lion Dimithri Ranawake MAF PFLM",
    district: "District 306 D4",
    phone: "0773560904",
    email: "dimithraranawake1999@gmail.com",
    dob: "23/08/1999",
    category: "District Presidents Council",
    badge: "DP-D4"
  },
  {
    order: 15,
    role: "District President",
    name: "Leo Lion Abilash Gnanasekaram",
    district: "District 306 D5",
    phone: "0777878617",
    email: "Abilashg.leo@gmail.com",
    dob: "25/11/1999",
    category: "District Presidents Council",
    badge: "DP-D5"
  },
  {
    order: 16,
    role: "District President",
    name: "Leo Lion Ravindi Hettiarachchi PFLM",
    district: "District 306 D6",
    phone: "0710169819",
    email: "ravindi.hettiarachchi@gmail.com",
    dob: "06/04/1998",
    category: "District Presidents Council",
    badge: "DP-D6"
  },
  {
    order: 17,
    role: "District President",
    name: "Leo Lion Nipuni Wijesekara",
    district: "District 306 D7",
    phone: "0705714939",
    email: "nipuniwijesekara.d7@gmail.com",
    dob: "03/01/2000",
    category: "District Presidents Council",
    badge: "DP-D7"
  },
  {
    order: 18,
    role: "District President",
    name: "Leo Lohan Devasurendra",
    district: "District 306 D8",
    phone: "0779642190",
    email: "leolohandevasurendra@gmail.com",
    dob: "05/08/1999",
    category: "District Presidents Council",
    badge: "DP-D8"
  },
  {
    order: 19,
    role: "District President",
    name: "Leo Lion Udara Herath",
    district: "District 306 D9",
    phone: "0711525865",
    email: "udaraherath2001@gmail.com",
    dob: "02/04/2001",
    category: "District Presidents Council",
    badge: "DP-D9"
  },
  {
    order: 20,
    role: "District President",
    name: "Leo Sahan Panditharathna",
    district: "District 306 D10",
    phone: "0774113454",
    email: "panditharathnasahan@gmail.com",
    dob: "15/12/1999",
    category: "District Presidents Council",
    badge: "DP-D10"
  },
  {
    order: 21,
    role: "District President",
    name: "Leo Lion Pasindu Karunarathna",
    district: "District 306 D11",
    phone: "0722564344",
    email: "lpasindu.k27@gmail.com",
    dob: "27/02/2006",
    category: "District Presidents Council",
    badge: "DP-D11"
  },
  {
    order: 22,
    role: "District President",
    name: "Leo Lion Balasivanujan Balashanker",
    district: "District 306 D12",
    phone: "0767066351",
    email: "Sivanujansiva26@gmail.com",
    dob: "26/05/2000",
    category: "District Presidents Council",
    badge: "DP-D12"
  },
  {
    order: 23,
    role: "Head - Evaluation & Administration Committees",
    name: "Leo Lion Sajithraj Puganeskumar PFLM",
    district: "Multiple District 306",
    phone: "0774073512",
    email: "sajithraj@leomd306.org",
    dob: "30/07/2002",
    category: "Multiple District Committees",
    badge: "EVAL-ADMIN",
    additionalRoles: ["Evaluation Committee", "Administration Committee"]
  },
  {
    order: 24,
    role: "Head - Legal & Editorial Committees",
    name: "Leo Nimasha Jayakody FLM",
    district: "Multiple District 306",
    phone: "0710547510",
    email: "nimashaj.leo@gmail.com",
    dob: "11/01/2001",
    category: "Multiple District Committees",
    badge: "LEGAL-ED",
    additionalRoles: ["Legal Committee", "Editorial Committee"]
  },
  {
    order: 25,
    role: "Head - IT & PR Committee",
    name: "Leo Supasan Deemantha",
    district: "Multiple District 306",
    phone: "0705804110",
    email: "supasandeeemantha@gmail.com",
    dob: "20/10/1999",
    category: "Multiple District Committees",
    badge: "IT-PR"
  },
  {
    order: 26,
    role: "Head - Finance Committee",
    name: "Leo Anushka Liyanage",
    district: "Multiple District 306",
    phone: "0777339036",
    email: "anushkaliyanageleo@gmail.com",
    dob: "14/01/1998",
    category: "Multiple District Committees",
    badge: "FIN"
  },
  {
    order: 27,
    role: "Head - Web & App Development Committee",
    name: "Leo Thameera Dananjaya",
    district: "Multiple District 306",
    phone: "0701205186",
    email: "",
    dob: "",
    category: "Multiple District Committees",
    badge: "DEV"
  },
  {
    order: 28,
    role: "Head - Outstation Admin & Operations",
    name: "Leo Harishanthan Sivakumaran",
    district: "Multiple District 306",
    phone: "0752880245",
    email: "sharishanthan@gmail.com",
    dob: "10/12/1995",
    category: "Multiple District Committees",
    badge: "OUT-ADMIN"
  }
];

export function renderDistrictProfile() {
  const app = document.getElementById('app');
  let activeCategory = 'all';
  let searchQuery = '';
  let viewMode = 'grid'; // 'grid' or 'table'

  function getInitials(name) {
    if (!name) return 'LO';
    const clean = String(name).replace(/^(Leo Lion|Lion|Leo)\s+/i, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length === 0) return 'LO';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function formatPhone(phone) {
    if (!phone) return '';
    const clean = String(phone).replace(/\D/g, '');
    if (clean.length === 10 && clean.startsWith('0')) {
      return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)}`;
    }
    if (clean.length === 9) {
      return `0${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5)}`;
    }
    return String(phone);
  }

  function rawPhone(phone) {
    if (!phone) return '';
    const clean = String(phone).replace(/\D/g, '');
    if (clean.length === 9 && !clean.startsWith('0')) {
      return '0' + clean;
    }
    return clean;
  }

  function render() {
    try {
      let profile = {};
      try {
        if (typeof store?.getDistrictProfile === 'function') {
          profile = store.getDistrictProfile() || {};
        }
      } catch (storeErr) {
        console.warn('Error fetching profile from store:', storeErr);
      }

      let allOfficers = (Array.isArray(profile?.officers) && profile.officers.length >= 31)
        ? profile.officers
        : DEFAULT_DISTRICT_OFFICERS;

      // Sync into store in background if store is missing full officers list
      if (!profile?.officers || !Array.isArray(profile.officers) || profile.officers.length < 31) {
        try {
          if (typeof store?.resetDistrictProfile === 'function') {
            const freshProfile = store.resetDistrictProfile();
            if (freshProfile && Array.isArray(freshProfile.officers) && freshProfile.officers.length >= 31) {
              allOfficers = freshProfile.officers;
              profile = freshProfile;
            }
          } else if (store && typeof store.updateDistrictProfile === 'function') {
            store.updateDistrictProfile({ officers: DEFAULT_DISTRICT_OFFICERS });
          } else if (store?._data) {
            store._data.districtProfile = { ...(store._data.districtProfile || {}), officers: DEFAULT_DISTRICT_OFFICERS };
            if (typeof store.save === 'function') store.save();
          }
        } catch (syncErr) {
          console.warn('Silent sync error:', syncErr);
        }
      }

      const isAdmin = auth?.isAdmin ?? false;

      const categories = [
        { id: 'all', label: 'All Officers', count: allOfficers.length },
        { id: 'Executive Committee', label: 'Executive Committee', count: allOfficers.filter(o => o.category === 'Executive Committee').length },
        { id: 'Chief Coordinators & Editor', label: 'Chief Coordinators & Editor', count: allOfficers.filter(o => o.category === 'Chief Coordinators & Editor').length },
        { id: 'Regional & Zonal Leadership', label: 'Regional & Zonal Leadership', count: allOfficers.filter(o => o.category === 'Regional & Zonal Leadership').length },
        { id: 'District Committee Leadership', label: 'District Committee Leadership', count: allOfficers.filter(o => o.category === 'District Committee Leadership').length }
      ];

      const filteredOfficers = allOfficers.filter(officer => {
        const matchesCategory = activeCategory === 'all' || officer.category === activeCategory;
        if (!matchesCategory) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          (officer.name && String(officer.name).toLowerCase().includes(q)) ||
          (officer.role && String(officer.role).toLowerCase().includes(q)) ||
          (officer.club && String(officer.club).toLowerCase().includes(q)) ||
          (officer.memberId && String(officer.memberId).toLowerCase().includes(q)) ||
          (officer.email && String(officer.email).toLowerCase().includes(q)) ||
          (officer.phone && String(officer.phone).toLowerCase().includes(q)) ||
          (officer.address && String(officer.address).toLowerCase().includes(q))
        );
      });

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('District Profile', ['Info', 'District'])}
          <div class="page-content">

            <!-- Page Header -->
            <div class="page-header" style="margin-bottom:24px;">
              <div>
                <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">DISTRICT 306 D1</span>
                <h1 style="margin:0; font-size:26px; font-weight:800; color:var(--color-text-primary);">${profile.title || 'Leo District 306 D1'}</h1>
                <p style="color:var(--color-text-muted); margin-top:4px; font-size:14px;">Official leadership directory and administration for the Leoistic Year 2026/2027</p>
              </div>
              <div class="page-header-actions" style="display:flex; gap:10px; align-items:center;">
                <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-weight:700; padding:6px 14px; border-radius:20px; font-size:12px;">
                  <i data-lucide="users" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> 31 Council Officers
                </span>
                ${isAdmin ? `
                  <button class="btn btn-primary edit-profile-btn" id="edit-district-btn">
                    <i data-lucide="pencil" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i> Edit Profile
                  </button>
                ` : ''}
              </div>
            </div>

            <!-- District Banner -->
            <div class="card" style="background: var(--color-surface); border:1px solid var(--color-border); padding: 26px 30px; display:flex; flex-wrap:wrap; align-items:center; gap:24px; position:relative; overflow:hidden; border-radius:var(--radius-2xl); box-shadow:var(--shadow-sm); margin-bottom:24px;">
              <div style="width:76px; height:76px; border-radius:20px; background:var(--color-primary-alpha); border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <i data-lucide="globe" style="width:38px; height:38px; color:var(--color-primary);"></i>
              </div>
              <div style="flex:1; min-width:280px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span class="section-badge" style="font-size:10px; padding:2px 8px;">DISTRICT MOTTO</span>
                  <span style="font-size:12px; color:var(--color-text-muted); font-weight:600;">Multiple District 306 Sri Lanka</span>
                </div>
                <h2 style="margin:0; font-size:20px; font-weight:800; color:var(--color-text-primary);">"${profile.tagline || 'Serve with Passion, Lead with Integrity'}"</h2>
                <p style="margin:8px 0 0; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                  ${profile.description || ''}
                </p>
              </div>
              <div style="display:flex; gap:14px; flex-wrap:wrap;">
                <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                  <div style="font-size:20px; font-weight:800; color:var(--color-primary);">31</div>
                  <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Officers</div>
                </div>
                <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                  <div style="font-size:20px; font-weight:800; color:#0284c7;">2</div>
                  <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Regions</div>
                </div>
                <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                  <div style="font-size:20px; font-weight:800; color:#10b981;">4</div>
                  <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Zones</div>
                </div>
              </div>
            </div>

            <!-- Complete District Council Directory -->
            <div class="card" style="border:1px solid var(--color-border); border-radius:var(--radius-2xl); background:var(--color-surface); overflow:hidden; margin-bottom:32px;">
              <div class="card-header" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; padding:20px 24px; border-bottom:1px solid var(--color-border);">
                <div>
                  <h3 class="card-title" style="margin:0; font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
                    <i data-lucide="award" style="color:var(--color-primary); width:20px; height:20px;"></i>
                    Complete District Council Directory
                  </h3>
                  <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-muted);">
                    All 31 official district officers with complete portfolio, contact, and club affiliations
                  </p>
                </div>

                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                  <!-- View Switcher -->
                  <div style="display:flex; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px; padding:2px;">
                    <button class="btn btn-sm view-mode-btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}" data-view="grid" style="padding:4px 10px; font-size:11px; border-radius:8px;">
                      <i data-lucide="grid" style="width:13px; height:13px; margin-right:4px;"></i> Grid
                    </button>
                    <button class="btn btn-sm view-mode-btn ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}" data-view="table" style="padding:4px 10px; font-size:11px; border-radius:8px;">
                      <i data-lucide="list" style="width:13px; height:13px; margin-right:4px;"></i> Table
                    </button>
                  </div>

                  <!-- Search Input -->
                  <div style="position:relative; width:260px;">
                    <i data-lucide="search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--color-text-muted);"></i>
                    <input type="text" id="officer-search-input" class="form-input" placeholder="Search officer, role, club, ID..." value="${searchQuery}" style="padding-left:34px; border-radius:20px; height:36px; font-size:12px;" />
                  </div>
                </div>
              </div>

              <!-- Category Filter Tabs -->
              <div style="display:flex; gap:8px; padding:12px 24px; background:var(--color-surface-muted); border-bottom:1px solid var(--color-border); overflow-x:auto;">
                ${categories.map(cat => `
                  <button class="btn btn-sm category-tab-btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}" data-category="${cat.id}" style="padding:6px 14px; border-radius:20px; font-size:11px; white-space:nowrap;">
                    ${cat.label} (${cat.count})
                  </button>
                `).join('')}
              </div>

              <!-- Content Area: Grid or Table -->
              ${viewMode === 'grid' ? `
                <div style="padding:24px; display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:16px;">
                  ${filteredOfficers.length > 0 ? filteredOfficers.map(off => `
                    <div class="card" style="padding:18px; border:1px solid var(--color-border); border-radius:16px; background:var(--color-surface); display:flex; flex-direction:column; justify-content:space-between; gap:12px; box-shadow:none;">
                      <div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                          <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-size:11px; font-weight:800; padding:2px 8px; border-radius:12px;">
                            #${off.order}
                          </span>
                          <span class="badge" style="background:var(--color-surface-muted); color:var(--color-text-muted); font-size:10px; font-weight:700; padding:2px 8px; border-radius:12px;">
                            ${off.category}
                          </span>
                        </div>

                        <div style="display:flex; gap:12px; align-items:flex-start;">
                          <div style="width:44px; height:44px; border-radius:12px; background:var(--color-primary-alpha); color:var(--color-primary); font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(37,99,235,0.2);">
                            ${getInitials(off.name)}
                          </div>
                          <div style="flex:1; min-width:0;">
                            <div style="font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.3px;">
                              ${off.role}
                            </div>
                            <h4 style="margin:2px 0 0; font-size:15px; font-weight:800; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                              ${off.name}
                            </h4>
                            <div style="font-size:11px; color:var(--color-text-secondary); margin-top:4px; display:flex; align-items:center; gap:5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                              <i data-lucide="building" style="width:12px; height:12px; flex-shrink:0;"></i> ${off.club}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style="display:flex; flex-direction:column; gap:6px; padding:10px 12px; background:var(--color-surface-muted); border-radius:10px; font-size:11px; color:var(--color-text-secondary);">
                        ${off.memberId ? `
                          <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:var(--color-text-muted);">Leo ID:</span>
                            <span class="font-mono" style="font-weight:700; color:var(--color-text-primary);">${off.memberId}</span>
                          </div>
                        ` : ''}
                        ${off.phone ? `
                          <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:var(--color-text-muted);">Phone:</span>
                            <a href="tel:${rawPhone(off.phone)}" style="font-weight:600; color:var(--color-primary); text-decoration:none;">${formatPhone(off.phone)}</a>
                          </div>
                        ` : ''}
                        ${off.email ? `
                          <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:var(--color-text-muted);">Email:</span>
                            <a href="mailto:${off.email}" style="font-weight:600; color:var(--color-text-primary); text-decoration:none; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:180px;">${off.email}</a>
                          </div>
                        ` : ''}
                        ${off.dob ? `
                          <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:var(--color-text-muted);">Birthday:</span>
                            <span style="font-weight:600; color:var(--color-text-primary);">${off.dob}</span>
                          </div>
                        ` : ''}
                      </div>

                      <div style="display:flex; gap:8px;">
                        ${off.phone ? `
                          <a href="tel:${rawPhone(off.phone)}" class="btn btn-sm btn-secondary" style="flex:1; justify-content:center; text-decoration:none; padding:6px 10px;">
                            <i data-lucide="phone" style="width:13px; height:13px; margin-right:4px;"></i> Call
                          </a>
                        ` : ''}
                        ${off.email ? `
                          <a href="mailto:${off.email}" class="btn btn-sm btn-secondary" style="flex:1; justify-content:center; text-decoration:none; padding:6px 10px;">
                            <i data-lucide="mail" style="width:13px; height:13px; margin-right:4px;"></i> Email
                          </a>
                        ` : ''}
                        <button class="btn btn-sm btn-ghost view-officer-btn" data-officer-order="${off.order}" style="padding:6px 10px;" title="Full Dossier">
                          <i data-lucide="eye" style="width:14px; height:14px;"></i>
                        </button>
                      </div>
                    </div>
                  `).join('') : `
                    <div style="grid-column: 1 / -1; padding:48px; text-align:center; color:var(--color-text-muted);">
                      <i data-lucide="search" style="width:36px; height:36px; margin-bottom:8px; opacity:0.5;"></i>
                      <div>No officers found matching "${searchQuery}".</div>
                    </div>
                  `}
                </div>
              ` : `
                <!-- Table View -->
                <div style="overflow-x:auto;">
                  <table class="table" style="width:100%; border-collapse:collapse;">
                    <thead>
                      <tr style="border-bottom:1px solid var(--color-border); background:var(--color-surface-muted); text-align:left;">
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted); width:50px;">#</th>
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted);">Officer & Portfolio</th>
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted);">Home Club</th>
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted);">Member ID</th>
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted);">Contact Details</th>
                        <th style="padding:12px 18px; font-size:11px; font-weight:700; color:var(--color-text-muted); text-align:right;">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${filteredOfficers.length > 0 ? filteredOfficers.map(off => `
                        <tr style="border-bottom:1px solid var(--color-border);">
                          <td style="padding:14px 18px; font-size:12px; font-weight:700; color:var(--color-text-muted);">
                            #${off.order}
                          </td>
                          <td style="padding:14px 18px;">
                            <div style="display:flex; align-items:center; gap:12px;">
                              <div style="width:36px; height:36px; border-radius:10px; background:var(--color-primary-alpha); color:var(--color-primary); font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${getInitials(off.name)}
                              </div>
                              <div>
                                <div style="font-size:14px; font-weight:700; color:var(--color-text-primary);">
                                  ${off.name}
                                </div>
                                <div style="font-size:11px; color:var(--color-text-muted); display:flex; align-items:center; gap:6px; margin-top:2px;">
                                  <span class="badge" style="background:rgba(37,99,235,0.08); color:var(--color-primary); font-size:10px; padding:1px 6px; border-radius:6px;">
                                    ${off.role}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style="padding:14px 18px; font-size:12px; color:var(--color-text-secondary); max-width:240px;">
                            <div style="display:flex; align-items:center; gap:6px;">
                              <i data-lucide="building" style="width:14px; height:14px; color:var(--color-text-muted); flex-shrink:0;"></i>
                              <span>${off.club}</span>
                            </div>
                          </td>
                          <td style="padding:14px 18px; font-size:12px;">
                            ${off.memberId ? `
                              <span class="font-mono badge" style="background:var(--color-surface-muted); color:var(--color-text-primary); font-weight:700; padding:3px 8px; border-radius:6px; border:1px solid var(--color-border);">
                                ${off.memberId}
                              </span>
                            ` : `
                              <span style="color:var(--color-text-muted); font-size:11px;">—</span>
                            `}
                          </td>
                          <td style="padding:14px 18px; font-size:12px;">
                            <div style="display:flex; flex-direction:column; gap:4px;">
                              ${off.phone ? `
                                <a href="tel:${rawPhone(off.phone)}" style="color:var(--color-primary); text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                                  <i data-lucide="phone" style="width:12px; height:12px;"></i> ${formatPhone(off.phone)}
                                </a>
                              ` : ''}
                              ${off.email ? `
                                <a href="mailto:${off.email}" style="color:var(--color-text-secondary); text-decoration:none; display:flex; align-items:center; gap:6px; font-size:11px;">
                                  <i data-lucide="mail" style="width:12px; height:12px;"></i> ${off.email}
                                </a>
                              ` : ''}
                              ${!off.phone && !off.email ? `
                                <span style="color:var(--color-text-muted); font-size:11px;">No direct contact listed</span>
                              ` : ''}
                            </div>
                          </td>
                          <td style="padding:14px 18px; text-align:right;">
                            <button class="btn btn-sm btn-secondary view-officer-btn" data-officer-order="${off.order}" style="padding:5px 12px; border-radius:8px; font-size:11px;">
                              <i data-lucide="eye" style="width:13px; height:13px; margin-right:4px;"></i> Details
                            </button>
                          </td>
                        </tr>
                      `) : `
                        <tr>
                          <td colspan="6" style="padding:36px; text-align:center; color:var(--color-text-muted);">
                            <i data-lucide="search" style="width:32px; height:32px; margin-bottom:8px; opacity:0.5;"></i>
                            <div>No officers match your search query.</div>
                          </td>
                        </tr>
                      `}
                    </tbody>
                  </table>
                </div>
              `}
            </div>

            <!-- Strategic Goals & Council Structure Grid -->
            <div class="grid-2" style="margin-top:24px;">
              <!-- District Strategic Goals -->
              <div class="card">
                <div class="card-header"><h3 class="card-title"><i data-lucide="target" style="color:#f59e0b"></i> Core Strategic Goals</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                  ${(profile.goals || []).map((g) => `
                    <div style="padding:14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:12px;">
                      <div style="font-size:14px; font-weight:700; color:var(--color-text-primary);">${g.title || ''}</div>
                      <p style="margin:6px 0 0; font-size:12px; color:var(--color-text-secondary); line-height:1.5;">${g.desc || ''}</p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- District Council Structure -->
              <div class="card">
                <div class="card-header"><h3 class="card-title"><i data-lucide="shield" style="color:var(--color-primary)"></i> Administrative Structure</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px;">
                    <span style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">Immediate Past District President (IPDP)</span>
                    <strong style="font-size:13px; color:var(--color-text-primary);">${profile.council?.ipdp || profile.ipdp || 'Leo Lion Yashika Nethmini'}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px;">
                    <span style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">District Leo Chairperson</span>
                    <strong style="font-size:13px; color:var(--color-text-primary);">${profile.council?.advisor || profile.leoChair || 'Lion Suranjani Wickramarathne'}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px;">
                    <span style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">Chief Coordinators & Editor</span>
                    <strong style="font-size:13px; color:var(--color-primary);">${profile.council?.coordinators || '7 Chief Coordinators & Editor'}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px;">
                    <span style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">Region Directors</span>
                    <strong style="font-size:13px; color:var(--color-primary);">${profile.council?.regions || '2 Region Directors (Region A & B)'}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px;">
                    <span style="font-size:12px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600;">Zone Directors</span>
                    <strong style="font-size:13px; color:var(--color-primary);">${profile.council?.zones || '4 Zone Directors (Zone A1, A2, B1, B2)'}</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

      try {
        if (typeof lucide !== 'undefined' && lucide?.createIcons) {
          lucide.createIcons();
        }
      } catch (iconErr) {
        console.warn('Lucide icon warning:', iconErr);
      }

      try { initSidebar(); } catch (e) { console.warn('Sidebar init warning:', e); }
      try { initHeader(); } catch (e) { console.warn('Header init warning:', e); }
      try { setupDistrictEventListeners(profile, allOfficers); } catch (e) { console.warn('Events setup warning:', e); }
    } catch (err) {
      console.error('Fatal error rendering District Profile:', err);
      app.innerHTML = `
        <div class="dashboard-layout">
          ${renderSidebar()}
          <div class="main-content">
            ${renderHeader('District Profile', ['Info', 'District'])}
            <div class="page-content" style="padding:24px;">
              <div class="card" style="padding:32px; text-align:center; border:1px solid var(--color-border); border-radius:16px;">
                <h3 style="color:var(--color-danger); margin-bottom:8px;">Unable to Display District Profile</h3>
                <p style="color:var(--color-text-secondary); margin-bottom:16px;">${err?.message || 'An unexpected rendering error occurred.'}</p>
                <button class="btn btn-primary" id="reset-profile-data-btn">Reset Data to Defaults & Reload</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById('reset-profile-data-btn')?.addEventListener('click', () => {
        try {
          if (typeof store?.resetDistrictProfile === 'function') {
            store.resetDistrictProfile();
          } else {
            localStorage.removeItem('leo_nexus_storage');
          }
        } catch (_) {
          try { localStorage.removeItem('leo_nexus_storage'); } catch (__) {}
        }
        window.location.reload();
      });
      try { if (typeof lucide !== 'undefined' && lucide?.createIcons) lucide.createIcons(); } catch (_) {}
      try { initSidebar(); } catch (_) {}
      try { initHeader(); } catch (_) {}
    }
  }

  function setupDistrictEventListeners(profile, allOfficers) {
    // Search input
    const searchInput = document.getElementById('officer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
        const updatedInput = document.getElementById('officer-search-input');
        if (updatedInput) {
          updatedInput.focus();
          updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
        }
      });
    }

    // Category tabs
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        render();
      });
    });

    // View mode buttons
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.view;
        render();
      });
    });

    // View Officer Detail Modal
    document.querySelectorAll('.view-officer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const order = parseInt(btn.dataset.officerOrder, 10);
        const officer = allOfficers.find(o => o.order === order);
        if (!officer) return;

        const modalHtml = `
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; align-items:center; gap:16px; padding:16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:16px;">
              <div style="width:56px; height:56px; border-radius:14px; background:var(--color-primary-alpha); color:var(--color-primary); font-size:18px; font-weight:800; display:flex; align-items:center; justify-content:center; border:2px solid rgba(37,99,235,0.2);">
                ${getInitials(officer.name)}
              </div>
              <div style="flex:1;">
                <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; margin-bottom:4px; display:inline-block;">
                  #${officer.order} — ${officer.role}
                </span>
                <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--color-text-primary);">${officer.name}</h3>
                <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">${officer.category}</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="padding:12px; background:var(--color-surface-muted); border-radius:12px; border:1px solid var(--color-border);">
                <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Home Club</div>
                <div style="font-size:13px; font-weight:700; color:var(--color-text-primary); margin-top:2px;">${officer.club || '—'}</div>
              </div>
              <div style="padding:12px; background:var(--color-surface-muted); border-radius:12px; border:1px solid var(--color-border);">
                <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Leo Member ID</div>
                <div style="font-size:13px; font-weight:700; color:var(--color-primary); margin-top:2px;" class="font-mono">${officer.memberId || 'N/A'}</div>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="phone" style="width:14px; height:14px;"></i> Phone Number
                </span>
                ${officer.phone ? `
                  <a href="tel:${rawPhone(officer.phone)}" style="font-weight:700; color:var(--color-primary); text-decoration:none;">${formatPhone(officer.phone)}</a>
                ` : `<span style="color:var(--color-text-muted);">—</span>`}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="mail" style="width:14px; height:14px;"></i> Email Address
                </span>
                ${officer.email ? `
                  <a href="mailto:${officer.email}" style="font-weight:700; color:var(--color-primary); text-decoration:none;">${officer.email}</a>
                ` : `<span style="color:var(--color-text-muted);">—</span>`}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="map-pin" style="width:14px; height:14px;"></i> Address
                </span>
                <span style="font-weight:600; color:var(--color-text-primary); text-align:right; max-width:60%;">${officer.address || '—'}</span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="calendar" style="width:14px; height:14px;"></i> Date of Birth
                </span>
                <span style="font-weight:600; color:var(--color-text-primary);">${officer.dob || '—'}</span>
              </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:6px;">
              ${officer.phone ? `
                <a href="tel:${rawPhone(officer.phone)}" class="btn btn-primary" style="flex:1; justify-content:center; text-decoration:none;">
                  <i data-lucide="phone" style="width:15px; height:15px; margin-right:6px;"></i> Call Officer
                </a>
              ` : ''}
              ${officer.email ? `
                <a href="mailto:${officer.email}" class="btn btn-secondary" style="flex:1; justify-content:center; text-decoration:none;">
                  <i data-lucide="mail" style="width:15px; height:15px; margin-right:6px;"></i> Send Email
                </a>
              ` : ''}
            </div>
          </div>
        `;

        showModal('Council Officer Profile', modalHtml, { showFooter: false, size: 'md' });
        lucide.createIcons();
      });
    });

    // Edit Profile Modal
    document.getElementById('edit-district-btn')?.addEventListener('click', () => {
      const editFormHtml = `
        <form id="edit-district-form">
          <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">General Information</div>
          <div class="form-group">
            <label class="form-label">District Title *</label>
            <input type="text" class="form-input" id="edit-dist-title" value="${profile.title || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Tagline *</label>
            <input type="text" class="form-input" id="edit-dist-tagline" value="${profile.tagline || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-textarea" id="edit-dist-desc" rows="3" required>${profile.description || ''}</textarea>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">Principal Executive Officers</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Governor (DG)</label>
              <input type="text" class="form-input" id="edit-dist-dg" value="${profile.dg || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District President (DP)</label>
              <input type="text" class="form-input" id="edit-dist-dp" value="${profile.dp || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Vice President (DVP)</label>
              <input type="text" class="form-input" id="edit-dist-dvp" value="${profile.dvp || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District Secretary (DS)</label>
              <input type="text" class="form-input" id="edit-dist-ds" value="${profile.ds || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Treasurer (DT)</label>
              <input type="text" class="form-input" id="edit-dist-dt" value="${profile.dt || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District Membership Chairperson (DMC)</label>
              <input type="text" class="form-input" id="edit-dist-dmc" value="${profile.dmc || ''}" />
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">Core Strategic Goals</div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 1 Title</label>
              <input type="text" class="form-input" id="edit-dist-g1-title" value="${profile.goals?.[0]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 1 Description</label>
              <textarea class="form-textarea" id="edit-dist-g1-desc" rows="2">${profile.goals?.[0]?.desc || ''}</textarea>
            </div>
            <div style="border-top: 1px dashed var(--color-border); padding-top: 12px;">
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 2 Title</label>
              <input type="text" class="form-input" id="edit-dist-g2-title" value="${profile.goals?.[1]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 2 Description</label>
              <textarea class="form-textarea" id="edit-dist-g2-desc" rows="2">${profile.goals?.[1]?.desc || ''}</textarea>
            </div>
            <div style="border-top: 1px dashed var(--color-border); padding-top: 12px;">
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 3 Title</label>
              <input type="text" class="form-input" id="edit-dist-g3-title" value="${profile.goals?.[2]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 3 Description</label>
              <textarea class="form-textarea" id="edit-dist-g3-desc" rows="2">${profile.goals?.[2]?.desc || ''}</textarea>
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">District Council Structure</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Immediate Past District President (IPDP)</label>
              <input type="text" class="form-input" id="edit-dist-ipdp" value="${profile.council?.ipdp || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District Advisor</label>
              <input type="text" class="form-input" id="edit-dist-advisor" value="${profile.council?.advisor || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Coordinators</label>
              <input type="text" class="form-input" id="edit-dist-coordinators" value="${profile.council?.coordinators || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Region Chairpersons</label>
              <input type="text" class="form-input" id="edit-dist-regions" value="${profile.council?.regions || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Zone Chairpersons</label>
              <input type="text" class="form-input" id="edit-dist-zones" value="${profile.council?.zones || ''}" />
            </div>
          </div>
        </form>
      `;

      showModal('Edit District Profile', editFormHtml, {
        submitText: 'Save Changes',
        size: 'lg',
        onSubmit: (close) => {
          const title = document.getElementById('edit-dist-title').value.trim();
          const tagline = document.getElementById('edit-dist-tagline').value.trim();
          const description = document.getElementById('edit-dist-desc').value.trim();
          const dg = document.getElementById('edit-dist-dg').value.trim();
          const dp = document.getElementById('edit-dist-dp').value.trim();
          const dvp = document.getElementById('edit-dist-dvp').value.trim();
          const ds = document.getElementById('edit-dist-ds').value.trim();
          const dt = document.getElementById('edit-dist-dt').value.trim();
          const dmc = document.getElementById('edit-dist-dmc')?.value.trim() || profile.dmc;
          
          const g1Title = document.getElementById('edit-dist-g1-title').value.trim();
          const g1Desc = document.getElementById('edit-dist-g1-desc').value.trim();
          const g2Title = document.getElementById('edit-dist-g2-title').value.trim();
          const g2Desc = document.getElementById('edit-dist-g2-desc').value.trim();
          const g3Title = document.getElementById('edit-dist-g3-title').value.trim();
          const g3Desc = document.getElementById('edit-dist-g3-desc').value.trim();

          const ipdp = document.getElementById('edit-dist-ipdp').value.trim();
          const advisor = document.getElementById('edit-dist-advisor').value.trim();
          const coordinators = document.getElementById('edit-dist-coordinators').value.trim();
          const regions = document.getElementById('edit-dist-regions').value.trim();
          const zones = document.getElementById('edit-dist-zones').value.trim();

          if (!title || !tagline || !description) {
            showToast('error', 'Validation Error', 'Title, tagline, and description are required.');
            return;
          }

          store.updateDistrictProfile({
            title,
            tagline,
            description,
            dg,
            dp,
            dvp,
            ds,
            dt,
            dmc,
            goals: [
              { title: g1Title, desc: g1Desc },
              { title: g2Title, desc: g2Desc },
              { title: g3Title, desc: g3Desc }
            ],
            council: {
              ipdp,
              advisor,
              coordinators,
              regions,
              zones
            }
          });

          showToast('success', 'Profile Updated', 'District Profile details updated successfully.');
          close();
          render();
        }
      });
    });
  }

  render();
}

export function renderMDProfile() {
  const app = document.getElementById('app');
  let activeCategory = 'all';
  let searchQuery = '';
  let viewMode = 'grid'; // 'grid' or 'table'

  function render() {
    try {
      let profile = {};
      try {
        if (typeof store?.getMDProfile === 'function') {
          profile = store.getMDProfile() || {};
        }
      } catch (storeErr) {
        console.warn('Error fetching MD profile from store:', storeErr);
      }

      let allOfficers = (Array.isArray(profile?.officers) && profile.officers.length >= 28)
        ? profile.officers
        : DEFAULT_MD_OFFICERS;

      // Sync into store in background if store is missing full officers list
      if (!profile?.officers || !Array.isArray(profile.officers) || profile.officers.length < 28) {
        try {
          if (typeof store?.resetMDProfile === 'function') {
            const fresh = store.resetMDProfile();
            if (fresh?.officers?.length >= 28) {
              allOfficers = fresh.officers;
              profile = fresh;
            }
          } else if (store && typeof store.updateMDProfile === 'function') {
            store.updateMDProfile({ officers: DEFAULT_MD_OFFICERS });
          } else if (store?._data) {
            store._data.mdProfile = { ...(store._data.mdProfile || {}), officers: DEFAULT_MD_OFFICERS };
            if (typeof store.save === 'function') store.save();
          }
        } catch (syncErr) {
          console.warn('Silent sync error for MD profile:', syncErr);
        }
      }

      const isAdmin = auth?.isAdmin ?? false;

      const categories = [
        { id: 'all', label: 'All Officers', count: allOfficers.length },
        { id: 'Executive Committee', label: 'Executive Committee', count: allOfficers.filter(o => o.category === 'Executive Committee').length },
        { id: 'District Presidents Council', label: 'District Presidents Council', count: allOfficers.filter(o => o.category === 'District Presidents Council').length },
        { id: 'Multiple District Committees', label: 'Multiple District Committees', count: allOfficers.filter(o => o.category === 'Multiple District Committees' || (Array.isArray(o.additionalRoles) && o.additionalRoles.length > 0)).length }
      ];

      const filteredOfficers = allOfficers.filter(officer => {
        let matchesCategory = false;
        if (activeCategory === 'all') {
          matchesCategory = true;
        } else if (activeCategory === 'Multiple District Committees') {
          matchesCategory = officer.category === 'Multiple District Committees' || (Array.isArray(officer.additionalRoles) && officer.additionalRoles.length > 0);
        } else {
          matchesCategory = officer.category === activeCategory;
        }
        if (!matchesCategory) return false;

        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          (officer.name && String(officer.name).toLowerCase().includes(q)) ||
          (officer.role && String(officer.role).toLowerCase().includes(q)) ||
          (officer.district && String(officer.district).toLowerCase().includes(q)) ||
          (officer.phone && String(officer.phone).toLowerCase().includes(q)) ||
          (officer.email && String(officer.email).toLowerCase().includes(q)) ||
          (officer.dob && String(officer.dob).toLowerCase().includes(q)) ||
          (officer.portfolioNote && String(officer.portfolioNote).toLowerCase().includes(q))
        );
      });

      app.innerHTML = `
        <div class="dashboard-layout">
          ${renderSidebar()}
          <div class="main-content">
            ${renderHeader('Multiple District Profile', ['Info', 'MD Profile'])}
            <div class="page-content">

              <!-- Page Header -->
              <div class="page-header" style="margin-bottom:24px;">
                <div>
                  <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">MULTIPLE DISTRICT 306</span>
                  <h1 style="margin:0; font-size:26px; font-weight:800; color:var(--color-text-primary);">${profile.title || 'Leo Multiple District 306 Sri Lanka'}</h1>
                  <p style="color:var(--color-text-muted); margin-top:4px; font-size:14px;">${profile.subtitle || 'National administrative structure, council coordinates, and leadership directory'}</p>
                </div>
                <div class="page-header-actions" style="display:flex; gap:10px; align-items:center;">
                  <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-weight:700; padding:6px 14px; border-radius:20px; font-size:12px;">
                    <i data-lucide="users" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> 28 Council Officers
                  </span>
                  <span class="badge" style="background:rgba(2,132,199,0.12); color:#0284c7; font-weight:700; padding:6px 14px; border-radius:20px; font-size:12px;">
                    <i data-lucide="shield" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> 12 Sub-Districts
                  </span>
                  ${isAdmin ? `
                    <button class="btn btn-primary edit-profile-btn" id="edit-md-btn">
                      <i data-lucide="pencil" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i> Edit Profile
                    </button>
                  ` : ''}
                </div>
              </div>

              <!-- National Council Banner -->
              <div class="card" style="background: var(--color-surface); border:1px solid var(--color-border); padding: 26px 30px; display:flex; flex-wrap:wrap; align-items:center; gap:24px; position:relative; overflow:hidden; border-radius:var(--radius-2xl); box-shadow:var(--shadow-sm); margin-bottom:24px;">
                <div style="width:76px; height:76px; border-radius:20px; background:var(--color-primary-alpha); border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                  <i data-lucide="shield" style="width:38px; height:38px; color:var(--color-primary);"></i>
                </div>
                <div style="flex:1; min-width:280px;">
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                    <span class="section-badge" style="font-size:10px; padding:2px 8px;">APEX LEADERSHIP</span>
                    <span style="font-size:12px; color:var(--color-text-muted); font-weight:600;">Multiple District 306 Sri Lanka</span>
                  </div>
                  <h2 style="margin:0; font-size:20px; font-weight:800; color:var(--color-text-primary);">Unified National Council & Governance</h2>
                  <p style="margin:8px 0 0; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                    ${profile.description || 'Uniting 12 sub-districts under one national council to coordinate nationwide youth development, humanitarian initiatives, and leadership excellence.'}
                  </p>
                </div>
                <div style="display:flex; gap:14px; flex-wrap:wrap;">
                  <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:var(--color-primary);">28</div>
                    <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Officers</div>
                  </div>
                  <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:#0284c7;">12</div>
                    <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Districts</div>
                  </div>
                  <div style="padding:10px 16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:14px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:#10b981;">8,500+</div>
                    <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Leos</div>
                  </div>
                </div>
              </div>

              <!-- MD Info Grid -->
              <div class="grid-2" style="margin-bottom:28px;">
                <div class="card">
                  <div class="card-header"><h3 class="card-title"><i data-lucide="shield" style="color:var(--color-primary)"></i> National Council Structure</h3></div>
                  <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                    <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6; margin:0;">
                      The Multiple District Council coordinates national operations across all twelve sub-districts and is governed by the Executive Committee and District Presidents.
                    </p>
                    
                    <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                        <span>Multiple District President</span>
                        <strong style="color:var(--color-text-primary);">${profile.councilChairperson || 'Leo Nisal Dulmith FLM'}</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                        <span>Sponsoring Lion Chairperson</span>
                        <strong style="color:var(--color-text-primary);">${profile.sponsoringLionChairperson || 'Lion Dr. Lasantha Goonewardene'}</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                        <span>Active Sub-Districts</span>
                        <strong style="color:var(--color-primary);">${profile.activeDistricts || '12 Districts (D1 – D12)'}</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:13px;">
                        <span>Total Members Nationwide</span>
                        <strong style="color:#10b981;">${profile.totalMembers || '8,500+ Leos'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header"><h3 class="card-title"><i data-lucide="help-circle" style="color:var(--color-cyan)"></i> Frequently Contacted Coordinates</h3></div>
                  <div class="card-body" style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                    <div>
                      <strong style="color:var(--color-text-primary);">Multiple District Secretariat:</strong>
                      <div style="margin-top:4px;">${profile.secretariat || 'Lions Activity Center, No 41, Albert Crescent, Colombo 07.'}</div>
                    </div>
                    <div>
                      <strong style="color:var(--color-text-primary);">Official Channels:</strong>
                      <div style="margin-top:4px;">Email: <a href="mailto:${profile.email || 'md306@leosrilanka.org'}" style="color:var(--color-primary); text-decoration:none;">${profile.email || 'md306@leosrilanka.org'}</a></div>
                      <div>Web: <a href="https://${profile.web || 'www.leosrilanka.org'}" target="_blank" rel="noopener" style="color:var(--color-primary); text-decoration:none;">${profile.web || 'www.leosrilanka.org'}</a></div>
                    </div>
                    <div>
                      <strong style="color:var(--color-text-primary);">Annual Publications:</strong>
                      <div style="margin-top:4px;">${profile.publications || '"The Sri Lankan Leo" Magazine — published quarterly celebrating club service achievements nationwide.'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Complete Multiple District Council Directory -->
              <div class="card" style="border:1px solid var(--color-border); border-radius:var(--radius-2xl); background:var(--color-surface); overflow:hidden; margin-bottom:32px;">
                <div class="card-header" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; padding:20px 24px; border-bottom:1px solid var(--color-border);">
                  <div>
                    <h3 class="card-title" style="margin:0; font-size:18px; font-weight:800; display:flex; align-items:center; gap:8px;">
                      <i data-lucide="award" style="color:var(--color-primary); width:20px; height:20px;"></i>
                      Complete Multiple District Council Directory
                    </h3>
                    <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-muted);">
                      All 28 council officers across Executive Committee, District Presidents (D1–D12), and Committee Leadership without duplicate entries
                    </p>
                  </div>

                  <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                    <!-- View Switcher -->
                    <div style="display:flex; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:10px; padding:2px;">
                      <button class="btn btn-sm md-view-mode-btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}" data-view="grid" style="padding:4px 10px; font-size:11px; border-radius:8px;">
                        <i data-lucide="grid" style="width:13px; height:13px; margin-right:4px;"></i> Grid
                      </button>
                      <button class="btn btn-sm md-view-mode-btn ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}" data-view="table" style="padding:4px 10px; font-size:11px; border-radius:8px;">
                        <i data-lucide="list" style="width:13px; height:13px; margin-right:4px;"></i> Table
                      </button>
                    </div>

                    <!-- Officer count pill -->
                    <span class="badge" style="background:var(--color-surface-muted); color:var(--color-text-secondary); border:1px solid var(--color-border); padding:6px 12px; border-radius:20px; font-size:12px; font-weight:600;">
                      Showing: <strong>${filteredOfficers.length}</strong> of ${allOfficers.length}
                    </span>
                  </div>
                </div>

                <!-- Filters & Search Toolbar -->
                <div style="padding:16px 24px; background:var(--color-surface-muted); border-bottom:1px solid var(--color-border); display:flex; flex-wrap:wrap; gap:16px; align-items:center; justify-content:space-between;">
                  <!-- Category Tabs -->
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    ${categories.map(cat => `
                      <button class="btn btn-sm md-category-tab-btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}" data-category="${cat.id}" style="font-size:12px; padding:6px 14px; border-radius:20px;">
                        ${cat.label}
                        <span class="badge" style="margin-left:6px; font-size:10px; padding:2px 6px; border-radius:10px; background:${activeCategory === cat.id ? 'rgba(255,255,255,0.25)' : 'var(--color-border)'}; color:${activeCategory === cat.id ? '#ffffff' : 'var(--color-text-muted)'};">
                          ${cat.count}
                        </span>
                      </button>
                    `).join('')}
                  </div>

                  <!-- Search Input -->
                  <div style="position:relative; width:100%; max-width:320px;">
                    <i data-lucide="search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--color-text-muted);"></i>
                    <input
                      type="text"
                      id="md-officer-search-input"
                      class="form-input"
                      placeholder="Search MD officers by name, role, district, phone..."
                      value="${searchQuery}"
                      style="padding-left:34px; padding-right:30px; font-size:12px; height:36px; border-radius:20px; width:100%;"
                    />
                    ${searchQuery ? `
                      <button id="clear-md-search-btn" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; padding:0; color:var(--color-text-muted);">
                        <i data-lucide="x" style="width:14px; height:14px;"></i>
                      </button>
                    ` : ''}
                  </div>
                </div>

                <!-- Directory Body -->
                <div style="padding:24px;">
                  ${filteredOfficers.length === 0 ? `
                    <div style="text-align:center; padding:48px 24px;">
                      <div style="width:56px; height:56px; border-radius:50%; background:var(--color-surface-muted); display:inline-flex; align-items:center; justify-content:center; margin-bottom:12px;">
                        <i data-lucide="search" style="width:24px; height:24px; color:var(--color-text-muted);"></i>
                      </div>
                      <h4 style="margin:0 0 6px; font-size:16px; color:var(--color-text-primary);">No Officers Found</h4>
                      <p style="margin:0; font-size:13px; color:var(--color-text-muted);">No council officers matched "${searchQuery}". Try adjusting your search or category filter.</p>
                      <button class="btn btn-secondary btn-sm" id="reset-md-filter-btn" style="margin-top:16px;">
                        Reset Filters
                      </button>
                    </div>
                  ` : viewMode === 'grid' ? `
                    <!-- Grid View -->
                    <div class="officers-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">
                      ${filteredOfficers.map(officer => `
                        <div class="card officer-card" style="border:1px solid var(--color-border); border-radius:16px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; background:var(--color-surface); position:relative; overflow:hidden;">
                          <div>
                            <!-- Header with Avatar & Badge -->
                            <div style="display:flex; align-items:flex-start; gap:14px; margin-bottom:14px;">
                              <div style="width:52px; height:52px; border-radius:14px; background:var(--color-primary-alpha); color:var(--color-primary); font-size:16px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:2px solid rgba(37,99,235,0.2);">
                                ${getInitials(officer.name)}
                              </div>
                              <div style="flex:1; min-width:0;">
                                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
                                  <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:10px;">
                                    #${officer.order} — ${officer.badge || 'MD'}
                                  </span>
                                  <span class="badge" style="background:var(--color-surface-muted); color:var(--color-text-muted); font-size:10px; padding:2px 6px; border-radius:8px;">
                                    ${officer.category}
                                  </span>
                                </div>
                                <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--color-text-primary); line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${officer.name}">
                                  ${officer.name}
                                </h4>
                                <div style="font-size:12px; font-weight:600; color:var(--color-primary); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${officer.role}">
                                  ${officer.role}
                                </div>
                              </div>
                            </div>

                            <!-- Details list -->
                            <div style="display:flex; flex-direction:column; gap:8px; font-size:12px; padding:12px; background:var(--color-surface-muted); border-radius:12px; margin-bottom:14px;">
                              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:5px;">
                                  <i data-lucide="shield" style="width:12px; height:12px;"></i> Jurisdiction
                                </span>
                                <span style="font-weight:700; color:var(--color-text-primary); text-align:right;">${officer.district || 'Multiple District 306'}</span>
                              </div>

                              ${officer.portfolioNote ? `
                                <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; border-top:1px dashed var(--color-border); padding-top:6px;">
                                  <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:5px;">
                                    <i data-lucide="award" style="width:12px; height:12px;"></i> Portfolios
                                  </span>
                                  <span style="font-weight:700; color:#10b981; font-size:11px; text-align:right;">${officer.portfolioNote}</span>
                                </div>
                              ` : ''}

                              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; border-top:1px dashed var(--color-border); padding-top:6px;">
                                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:5px;">
                                  <i data-lucide="phone" style="width:12px; height:12px;"></i> Phone
                                </span>
                                ${officer.phone ? `
                                  <a href="tel:${rawPhone(officer.phone)}" style="font-weight:700; color:var(--color-primary); text-decoration:none;">
                                    ${formatPhone(officer.phone)}
                                  </a>
                                ` : `<span style="color:var(--color-text-muted);">—</span>`}
                              </div>

                              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; border-top:1px dashed var(--color-border); padding-top:6px;">
                                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:5px;">
                                  <i data-lucide="mail" style="width:12px; height:12px;"></i> Email
                                </span>
                                ${officer.email ? `
                                  <a href="mailto:${officer.email}" style="font-weight:600; color:var(--color-primary); text-decoration:none; max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${officer.email}">
                                    ${officer.email}
                                  </a>
                                ` : `<span style="color:var(--color-text-muted);">—</span>`}
                              </div>

                              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; border-top:1px dashed var(--color-border); padding-top:6px;">
                                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:5px;">
                                  <i data-lucide="calendar" style="width:12px; height:12px;"></i> Birthday
                                </span>
                                <span style="font-weight:600; color:var(--color-text-secondary);">${officer.dob || '—'}</span>
                              </div>
                            </div>
                          </div>

                          <!-- Actions -->
                          <div style="display:flex; gap:8px; padding-top:6px;">
                            ${officer.phone ? `
                              <a href="tel:${rawPhone(officer.phone)}" class="btn btn-secondary btn-sm" style="padding:6px 10px; text-decoration:none;" title="Call ${officer.name}">
                                <i data-lucide="phone" style="width:13px; height:13px;"></i>
                              </a>
                            ` : ''}
                            ${officer.email ? `
                              <a href="mailto:${officer.email}" class="btn btn-secondary btn-sm" style="padding:6px 10px; text-decoration:none;" title="Email ${officer.name}">
                                <i data-lucide="mail" style="width:13px; height:13px;"></i>
                              </a>
                            ` : ''}
                            <button class="btn btn-primary btn-sm view-md-officer-btn" data-officer-order="${officer.order}" style="flex:1; justify-content:center; font-size:12px; padding:6px 12px;">
                              <i data-lucide="user" style="width:13px; height:13px; margin-right:4px;"></i> View Details
                            </button>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <!-- Table View -->
                    <div class="data-table-wrapper" style="overflow-x:auto;">
                      <table class="data-table" style="width:100%; border-collapse:collapse; font-size:13px;">
                        <thead>
                          <tr style="border-bottom:2px solid var(--color-border); text-align:left; background:var(--color-surface-muted);">
                            <th style="padding:12px 14px; width:60px;">#</th>
                            <th style="padding:12px 14px;">Officer Name & District</th>
                            <th style="padding:12px 14px;">Official Role</th>
                            <th style="padding:12px 14px;">Category</th>
                            <th style="padding:12px 14px;">Phone</th>
                            <th style="padding:12px 14px;">Email</th>
                            <th style="padding:12px 14px;">Birthday</th>
                            <th style="padding:12px 14px; text-align:right;">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${filteredOfficers.map(officer => `
                            <tr style="border-bottom:1px solid var(--color-border);">
                              <td style="padding:12px 14px; font-weight:800; color:var(--color-primary);">${officer.order}</td>
                              <td style="padding:12px 14px;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                  <div style="width:36px; height:36px; border-radius:10px; background:var(--color-primary-alpha); color:var(--color-primary); font-size:12px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    ${getInitials(officer.name)}
                                  </div>
                                  <div>
                                    <strong style="color:var(--color-text-primary);">${officer.name}</strong>
                                    <div style="font-size:11px; color:var(--color-text-muted);">${officer.district || 'Multiple District 306'}</div>
                                  </div>
                                </div>
                              </td>
                              <td style="padding:12px 14px;">
                                <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-weight:700; font-size:11px;">
                                  ${officer.role}
                                </span>
                                ${officer.portfolioNote ? `<div style="font-size:10px; color:#10b981; margin-top:2px; font-weight:600;">${officer.portfolioNote}</div>` : ''}
                              </td>
                              <td style="padding:12px 14px; font-size:12px; color:var(--color-text-secondary);">${officer.category}</td>
                              <td style="padding:12px 14px;">
                                ${officer.phone ? `<a href="tel:${rawPhone(officer.phone)}" style="color:var(--color-primary); text-decoration:none; font-weight:600;">${formatPhone(officer.phone)}</a>` : '—'}
                              </td>
                              <td style="padding:12px 14px;">
                                ${officer.email ? `<a href="mailto:${officer.email}" style="color:var(--color-primary); text-decoration:none;">${officer.email}</a>` : '—'}
                              </td>
                              <td style="padding:12px 14px; color:var(--color-text-secondary);">${officer.dob || '—'}</td>
                              <td style="padding:12px 14px; text-align:right;">
                                <button class="btn btn-secondary btn-sm view-md-officer-btn" data-officer-order="${officer.order}">
                                  View
                                </button>
                              </td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  `}
                </div>
              </div>

            </div>
          </div>
        </div>
      `;

      try {
        if (typeof lucide !== 'undefined' && lucide?.createIcons) {
          lucide.createIcons();
        }
      } catch (iconErr) {
        console.warn('Lucide icon warning:', iconErr);
      }

      try { initSidebar(); } catch (e) { console.warn('Sidebar init warning:', e); }
      try { initHeader(); } catch (e) { console.warn('Header init warning:', e); }
      try { setupMDEventListeners(profile, allOfficers); } catch (e) { console.warn('Events setup warning:', e); }
    } catch (err) {
      console.error('Fatal error rendering MD Profile:', err);
      app.innerHTML = `
        <div class="dashboard-layout">
          ${renderSidebar()}
          <div class="main-content">
            ${renderHeader('Multiple District Profile', ['Info', 'MD Profile'])}
            <div class="page-content" style="padding:24px;">
              <div class="card" style="padding:32px; text-align:center; border:1px solid var(--color-border); border-radius:16px;">
                <h3 style="color:var(--color-danger); margin-bottom:8px;">Unable to Display MD Profile</h3>
                <p style="color:var(--color-text-secondary); margin-bottom:16px;">${err?.message || 'An unexpected rendering error occurred.'}</p>
                <button class="btn btn-primary" id="reset-md-data-btn">Reset MD Data to Defaults & Reload</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById('reset-md-data-btn')?.addEventListener('click', () => {
        try {
          if (typeof store?.resetMDProfile === 'function') {
            store.resetMDProfile();
          }
        } catch (_) {}
        window.location.reload();
      });
      try { if (typeof lucide !== 'undefined' && lucide?.createIcons) lucide.createIcons(); } catch (_) {}
      try { initSidebar(); } catch (_) {}
      try { initHeader(); } catch (_) {}
    }
  }

  function setupMDEventListeners(profile, allOfficers) {
    // Search input
    const searchInput = document.getElementById('md-officer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
        const updatedInput = document.getElementById('md-officer-search-input');
        if (updatedInput) {
          updatedInput.focus();
          updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
        }
      });
    }

    // Clear search
    document.getElementById('clear-md-search-btn')?.addEventListener('click', () => {
      searchQuery = '';
      render();
    });

    // Reset filters from empty state
    document.getElementById('reset-md-filter-btn')?.addEventListener('click', () => {
      searchQuery = '';
      activeCategory = 'all';
      render();
    });

    // Category tabs
    document.querySelectorAll('.md-category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        render();
      });
    });

    // View mode buttons
    document.querySelectorAll('.md-view-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.view;
        render();
      });
    });

    // View Officer Detail Modal
    document.querySelectorAll('.view-md-officer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const order = parseInt(btn.dataset.officerOrder, 10);
        const officer = allOfficers.find(o => o.order === order);
        if (!officer) return;

        const modalHtml = `
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; align-items:center; gap:16px; padding:16px; background:var(--color-surface-muted); border:1px solid var(--color-border); border-radius:16px;">
              <div style="width:56px; height:56px; border-radius:14px; background:var(--color-primary-alpha); color:var(--color-primary); font-size:18px; font-weight:800; display:flex; align-items:center; justify-content:center; border:2px solid rgba(37,99,235,0.2);">
                ${getInitials(officer.name)}
              </div>
              <div style="flex:1;">
                <span class="badge" style="background:var(--color-primary-alpha); color:var(--color-primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; margin-bottom:4px; display:inline-block;">
                  #${officer.order} — ${officer.role}
                </span>
                <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--color-text-primary);">${officer.name}</h3>
                <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">${officer.category} • ${officer.district || 'Multiple District 306'}</div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="padding:12px; background:var(--color-surface-muted); border-radius:12px; border:1px solid var(--color-border);">
                <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Sub-District / Region</div>
                <div style="font-size:13px; font-weight:700; color:var(--color-text-primary); margin-top:2px;">${officer.district || 'Multiple District 306'}</div>
              </div>
              <div style="padding:12px; background:var(--color-surface-muted); border-radius:12px; border:1px solid var(--color-border);">
                <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Role Designation</div>
                <div style="font-size:13px; font-weight:700; color:var(--color-primary); margin-top:2px;">${officer.badge || 'MD Officer'}</div>
              </div>
            </div>

            ${officer.portfolioNote || (Array.isArray(officer.additionalRoles) && officer.additionalRoles.length > 0) ? `
              <div style="padding:12px 14px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); border-radius:12px;">
                <div style="font-size:11px; font-weight:700; color:#10b981; text-transform:uppercase; margin-bottom:4px;">Portfolios / Committees</div>
                <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">
                  ${officer.portfolioNote || officer.additionalRoles.join(', ')}
                </div>
              </div>
            ` : ''}

            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="phone" style="width:14px; height:14px;"></i> Phone Number
                </span>
                ${officer.phone ? `
                  <a href="tel:${rawPhone(officer.phone)}" style="font-weight:700; color:var(--color-primary); text-decoration:none;">${formatPhone(officer.phone)}</a>
                ` : `<span style="color:var(--color-text-muted);">—</span>`}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="mail" style="width:14px; height:14px;"></i> Email Address
                </span>
                ${officer.email ? `
                  <a href="mailto:${officer.email}" style="font-weight:700; color:var(--color-primary); text-decoration:none;">${officer.email}</a>
                ` : `<span style="color:var(--color-text-muted);">—</span>`}
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--color-surface-muted); border-radius:10px; border:1px solid var(--color-border); font-size:13px;">
                <span style="color:var(--color-text-muted); display:flex; align-items:center; gap:6px;">
                  <i data-lucide="calendar" style="width:14px; height:14px;"></i> Date of Birth
                </span>
                <span style="font-weight:600; color:var(--color-text-primary);">${officer.dob || '—'}</span>
              </div>
            </div>

            <div style="display:flex; gap:10px; margin-top:6px;">
              ${officer.phone ? `
                <a href="tel:${rawPhone(officer.phone)}" class="btn btn-primary" style="flex:1; justify-content:center; text-decoration:none;">
                  <i data-lucide="phone" style="width:15px; height:15px; margin-right:6px;"></i> Call Officer
                </a>
              ` : ''}
              ${officer.email ? `
                <a href="mailto:${officer.email}" class="btn btn-secondary" style="flex:1; justify-content:center; text-decoration:none;">
                  <i data-lucide="mail" style="width:15px; height:15px; margin-right:6px;"></i> Send Email
                </a>
              ` : ''}
            </div>
          </div>
        `;

        showModal('Council Officer Profile', modalHtml, { showFooter: false, size: 'md' });
        try { if (typeof lucide !== 'undefined' && lucide?.createIcons) lucide.createIcons(); } catch (_) {}
      });
    });

    // Edit MD Profile Modal
    document.getElementById('edit-md-btn')?.addEventListener('click', () => {
      const editFormHtml = `
        <form id="edit-md-form">
          <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">General Information</div>
          <div class="form-group">
            <label class="form-label">Multiple District Title *</label>
            <input type="text" class="form-input" id="edit-md-title" value="${profile.title || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Subtitle *</label>
            <input type="text" class="form-input" id="edit-md-subtitle" value="${profile.subtitle || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-textarea" id="edit-md-desc" rows="3" required>${profile.description || ''}</textarea>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">National Council Structure</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Multiple District President / Council Chairperson</label>
              <input type="text" class="form-input" id="edit-md-cc" value="${profile.councilChairperson || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sponsoring Lion Chairperson</label>
              <input type="text" class="form-input" id="edit-md-slc" value="${profile.sponsoringLionChairperson || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Active Districts</label>
              <input type="text" class="form-input" id="edit-md-districts" value="${profile.activeDistricts || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Members Nationwide</label>
              <input type="text" class="form-input" id="edit-md-members" value="${profile.totalMembers || ''}" />
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid var(--color-border); padding-bottom: 4px; color: var(--color-primary);">Frequently Contacted Coordinates</div>
          <div class="form-group">
            <label class="form-label">Multiple District Secretariat</label>
            <input type="text" class="form-input" id="edit-md-secretariat" value="${profile.secretariat || ''}" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Official Email</label>
              <input type="email" class="form-input" id="edit-md-email" value="${profile.email || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Web Address</label>
              <input type="text" class="form-input" id="edit-md-web" value="${profile.web || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Annual Publications</label>
            <textarea class="form-textarea" id="edit-md-pubs" rows="2">${profile.publications || ''}</textarea>
          </div>
        </form>
      `;

      showModal('Edit Multiple District Profile', editFormHtml, {
        submitText: 'Save Changes',
        size: 'lg',
        onSubmit: (close) => {
          const title = document.getElementById('edit-md-title').value.trim();
          const subtitle = document.getElementById('edit-md-subtitle').value.trim();
          const description = document.getElementById('edit-md-desc').value.trim();
          const councilChairperson = document.getElementById('edit-md-cc').value.trim();
          const sponsoringLionChairperson = document.getElementById('edit-md-slc').value.trim();
          const activeDistricts = document.getElementById('edit-md-districts').value.trim();
          const totalMembers = document.getElementById('edit-md-members').value.trim();
          const secretariat = document.getElementById('edit-md-secretariat').value.trim();
          const email = document.getElementById('edit-md-email').value.trim();
          const web = document.getElementById('edit-md-web').value.trim();
          const publications = document.getElementById('edit-md-pubs').value.trim();

          if (!title || !subtitle || !description) {
            showToast('error', 'Validation Error', 'Title, subtitle, and description are required.');
            return;
          }

          store.updateMDProfile({
            title,
            subtitle,
            description,
            councilChairperson,
            sponsoringLionChairperson,
            activeDistricts,
            totalMembers,
            secretariat,
            email,
            web,
            publications
          });

          showToast('success', 'Profile Updated', 'Multiple District Profile details updated successfully.');
          close();
          render();
        }
      });
    });
  }

  render();
}
