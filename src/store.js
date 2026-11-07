// ============================================
// LEO NEXUS PORTAL — DATA STORE
// LocalStorage persistence + seed data
// ============================================

import { PROJECT_CATEGORIES_DATA, PROJECT_AWARD_GROUPS, checkCategoryCompletion } from './data/projectCategories.js';

const STORAGE_KEY = 'leo_nexus_portal';

// ---------- Seed Data ----------
function getDefaultData() {
  const data = {
    users: [
      { id: 'u1', email: 'admin@leo.org', password: 'admin123', name: 'Leo Lion Dinath Wijesooriya', role: 'admin', clubId: null, avatar: 'LD', createdAt: '2026-01-01' },
      { id: 'u2', email: 'president.d1@leo.org', password: 'vinuk123', name: 'Leo Lion Vinuk Thismalpola', role: 'district_president', clubId: null, avatar: 'VT', createdAt: '2026-06-18' },
      { id: 'u3', email: 'vicepresident.d1@leo.org', password: 'manish123', name: 'Leo Lion Manish Perera', role: 'district_vp', clubId: null, avatar: 'MP', createdAt: '2026-06-18' },
      { id: 'u4', email: 'sec.d1@leo.org', password: 'hashini123', name: 'Leo Hashini Nethmika', role: 'district_secretary', clubId: null, avatar: 'HN', createdAt: '2026-06-18' },
      { id: 'u5', email: 'treasurer.d1@leo.org', password: 'bathisha123', name: 'Leo Bathisha Kavinda', role: 'district_treasurer', clubId: null, avatar: 'BK', createdAt: '2026-06-18' },
      { id: 'u6', email: 'admin.d1@leo.org', password: 'senuth123', name: 'Leo Lion Senuth Dilnada', role: 'district_admin', clubId: null, avatar: 'SD', createdAt: '2026-06-18' },
      { id: 'u7', email: 'president.iit@leo.org', password: 'sithuli123', name: 'Leo Lion Sithuli Amunuthuduwa', role: 'club_president', clubId: 'c6', avatar: 'SA', createdAt: '2026-06-18' },
      { id: 'u8', email: 'asstsec.d1@leo.org', password: 'prabhavee123', name: 'Leo Lion Prabhavee Mayasha', role: 'district_assistant_secretary', clubId: null, avatar: 'PM', createdAt: '2026-06-18' },
      { id: 'u9', email: 'assttreasurer.d1@leo.org', password: 'chamal123', name: 'Leo Lion Chamal Pramod', role: 'district_assistant_treasurer', clubId: null, avatar: 'CP', createdAt: '2026-06-18' },
      { id: 'u10', email: 'membership.d1@leo.org', altEmail: 'leo.sandunitheekshana@gmail.com', password: 'sanduni123', name: 'Leo Lion Sanduni Theekshana', role: 'district_membership', clubId: null, avatar: 'ST', phone: '0758650060', memberId: '5727258', createdAt: '2026-06-18' }
    ],

    clubs: [
      // Zone A1
      {
        id: 'c9',
        name: 'Leo Club of Colombo (Host)',
        code: 'LC-004',
        track: 'Omega Leo',
        president: 'Anju Gayathri',
        charter_date: '2020-05-10',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 40,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 32, '2026-08-09': 32, '2026-09-01': 32, '2026-09-30': 32, '2026-10-31': 40 },
        email: 'colombo.host@leo.org',
        phone: '+94 77 123 0001',
        meetingDay: 'Every Sunday',
        description: 'The pioneering Colombo Host club dedicated to community services.'
      },
      {
        id: 'c10',
        name: 'Leo Club of Colombo Millennium',
        code: 'LC-005',
        track: 'Omega Leo',
        president: 'Vinuthi Thisansa',
        charter_date: '2021-06-15',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 21,
        projectsCompleted: 10,
        membershipCheckpoints: { '2026-07-01': 21, '2026-08-09': 21, '2026-09-01': 24, '2026-09-30': 21, '2026-10-31': 21 },
        email: 'millennium@leo.org',
        phone: '+94 77 123 0002',
        meetingDay: 'Every Saturday',
        description: 'Fostering millennium leaders in youth community service.'
      },
      {
        id: 'c11',
        name: 'Leo Club of Colombo Six New Stars',
        code: 'LC-006',
        track: 'Omega Leo',
        president: 'K.A Sathmi Dinethra',
        charter_date: '2023-08-20',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 31,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 31, '2026-08-09': 31, '2026-09-01': 31, '2026-09-30': 31, '2026-10-31': 31 },
        email: 'sixstars@leo.org',
        phone: '+94 77 123 0003',
        meetingDay: 'Every Saturday',
        description: 'Guiding young leaders towards astronomical service impacts.'
      },
      {
        id: 'c12',
        name: 'Leo Club of UOC Alumni',
        code: 'LC-007',
        track: 'Omega Leo',
        president: 'Sasun Nimjaya Wijeratne',
        charter_date: '2024-10-01',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 48,
        projectsCompleted: 4,
        membershipCheckpoints: { '2026-07-01': 17, '2026-08-09': 40, '2026-09-01': 40, '2026-09-30': 40, '2026-10-31': 48 },
        email: 'uoc.alumni@leo.org',
        phone: '+94 77 123 0004',
        meetingDay: 'Every Sunday',
        description: 'Alumni of UOC uniting to continue their Leostic journey.'
      },

      // Zone A2
      {
        id: 'c6',
        name: 'Leo Club of Informatics Institute of Technology',
        code: 'LC-001',
        track: 'Omega Leo',
        president: 'Sithuli Pehansa Amunuthuduwa',
        charter_date: '2025-05-10',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 86,
        projectsCompleted: 8,
        membershipCheckpoints: { '2026-07-01': 27, '2026-08-09': 58, '2026-09-01': 60, '2026-09-30': 72, '2026-10-31': 86 },
        email: 'iit@leo.org',
        phone: '+94 77 987 6543',
        meetingDay: 'Every Wednesday',
        description: 'Fostering technology-driven service and leadership at Informatics Institute of Technology.'
      },
      {
        id: 'c7',
        name: 'Leo Club of University of Colombo Faculty of Science',
        code: 'LC-003',
        track: 'Omega Leo',
        president: 'G.D Thevindu Nirmitha',
        charter_date: '2025-02-15',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 82,
        projectsCompleted: 1,
        membershipCheckpoints: { '2026-07-01': 50, '2026-08-09': 60, '2026-09-01': 64, '2026-09-30': 65, '2026-10-31': 82 },
        email: 'fos@leo.org',
        phone: '+94 77 111 2222',
        meetingDay: 'Every Monday',
        description: 'Empowering science students to lead and serve the community.'
      },
      {
        id: 'c8',
        name: 'Leo Club of University of Colombo Faculty of Arts',
        code: 'LC-002',
        track: 'Omega Leo',
        president: 'Manampeli Mahapatabadiralalage Vimukthi Rukshika Cooray',
        charter_date: '2025-03-20',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 130,
        projectsCompleted: 2,
        membershipCheckpoints: { '2026-07-01': 76, '2026-08-09': 50, '2026-09-01': 50, '2026-09-30': 65, '2026-10-31': 130 },
        email: 'foa@leo.org',
        phone: '+94 77 333 4444',
        meetingDay: 'Every Tuesday',
        description: 'Promoting social harmony and leadership development through creative service.'
      },
      {
        id: 'c13',
        name: 'Leo Club of UOC FOA Alumni',
        code: 'LC-008',
        track: 'Omega Leo',
        president: 'Yoshani Sasanthika',
        charter_date: '2025-01-15',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 49,
        projectsCompleted: 2,
        membershipCheckpoints: { '2026-07-01': 48, '2026-08-09': 49, '2026-09-01': 49, '2026-09-30': 49, '2026-10-31': 49 },
        email: 'uoc.foaalumni@leo.org',
        phone: '+94 77 123 0005',
        meetingDay: 'Every Saturday',
        description: 'Arts Faculty alumni contributing to creative societal development.'
      },

      // Zone B1
      {
        id: 'c14',
        name: 'Leo Club of Prince of Wales College',
        code: 'LC-009',
        track: 'Alpha Leo',
        president: 'Randidu Tadeesha Jayawardena',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 27,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 23, '2026-08-09': 23, '2026-09-01': 23, '2026-09-30': 23, '2026-10-31': 27 },
        email: 'princeofwales@leo.org',
        phone: '+94 77 123 0014',
        meetingDay: 'Every Saturday',
        description: 'Dedicated to fostering leadership and school community service.'
      },
      {
        id: 'c15',
        name: 'Leo Club of Princess of Wales’ College',
        code: 'LC-010',
        track: 'Alpha Leo',
        president: 'Vinuri Nihara Aponso',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 47,
        projectsCompleted: 1,
        membershipCheckpoints: { '2026-07-01': 39, '2026-08-09': 38, '2026-09-01': 38, '2026-09-30': 38, '2026-10-31': 47 },
        email: 'princessofwales@leo.org',
        phone: '+94 77 123 0015',
        meetingDay: 'Every Sunday',
        description: 'Empowering young women leaders through impact-driven service.'
      },
      {
        id: 'c16',
        name: 'Leo Club of Sri Sumangala College',
        code: 'LC-011',
        track: 'Alpha Leo',
        president: 'Danidu Damsith',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 15,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 43, '2026-08-09': 43, '2026-09-01': 43, '2026-09-30': 44, '2026-10-31': 15 },
        email: 'srisumangala@leo.org',
        phone: '+94 77 123 0016',
        meetingDay: 'Every Saturday',
        description: 'Creating positive changes in the community through dedicated efforts.'
      },
      {
        id: 'c17',
        name: 'Leo Club of Kalutara Vidyalaya',
        code: 'LC-012',
        track: 'Alpha Leo',
        president: 'Ometh Nethsanda',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 39,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 29, '2026-08-09': 29, '2026-09-01': 29, '2026-09-30': 29, '2026-10-31': 39 },
        email: 'kalutaravidyalaya@leo.org',
        phone: '+94 77 123 0017',
        meetingDay: 'Every Saturday',
        description: 'Developing youth potentials and building active citizens.'
      },
      {
        id: 'c18',
        name: 'Leo Club of Kalutara Balika Vidyalaya',
        code: 'LC-013',
        track: 'Alpha Leo',
        president: 'Sethmi Sonaya',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 63,
        projectsCompleted: 1,
        membershipCheckpoints: { '2026-07-01': 78, '2026-08-09': 35, '2026-09-01': 33, '2026-09-30': 34, '2026-10-31': 63 },
        email: 'kalutarabalika@leo.org',
        phone: '+94 77 123 0018',
        meetingDay: 'Every Sunday',
        description: 'Committed to humanitarian support and leadership excellence.'
      },
      {
        id: 'c19',
        name: 'Leo Club of Moratuwa 2020',
        code: 'LC-014',
        track: 'Omega Leo',
        president: 'Pumudu Ramuditha',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 28,
        projectsCompleted: 1,
        membershipCheckpoints: { '2026-07-01': 35, '2026-08-09': 36, '2026-09-01': 37, '2026-09-30': 28, '2026-10-31': 28 },
        email: 'moratuwa2020@leo.org',
        phone: '+94 77 123 0019',
        meetingDay: 'Every Saturday',
        description: 'Promoting mutual cooperation and impactful social work.'
      },
      {
        id: 'c20',
        name: 'Leo Club of Royal Achievers',
        code: 'LC-015',
        track: 'Omega Leo',
        president: 'Geemeth Methmika Bodiyabadu',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 56,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 68, '2026-08-09': 68, '2026-09-01': 49, '2026-09-30': 48, '2026-10-31': 56 },
        email: 'royalachievers@leo.org',
        phone: '+94 77 123 0020',
        meetingDay: 'Every Saturday',
        description: 'Achieving milestones in community service and personal development.'
      },
      {
        id: 'c21',
        name: 'Leo Club of Moratuwa Rathmalana',
        code: 'LC-016',
        track: 'Omega Leo',
        president: 'Chamithu Senuja Kaluarachchi',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 69,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 57, '2026-08-09': 58, '2026-09-01': 58, '2026-09-30': 58, '2026-10-31': 69 },
        email: 'moratuwaratmalana@leo.org',
        phone: '+94 77 123 0021',
        meetingDay: 'Every Sunday',
        description: 'Bridging communities together through sustainable development projects.'
      },
      {
        id: 'c22',
        name: 'Leo Club of Cosmopolitan Creators',
        code: 'LC-017',
        track: 'Alpha Leo',
        president: 'Risindu Gunasekara',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 22,
        projectsCompleted: 1,
        membershipCheckpoints: { '2026-07-01': 33, '2026-08-09': 33, '2026-09-01': 18, '2026-09-30': 18, '2026-10-31': 22 },
        email: 'cosmopolitan@leo.org',
        phone: '+94 77 123 0022',
        meetingDay: 'Every Saturday',
        description: 'Inspiring creative ideas and cosmopolitan unity in social services.'
      },
      {
        id: 'c23',
        name: 'Leo Club of Mount Lavinia Orient Centennial',
        code: 'LC-018',
        track: 'Omega Leo',
        president: 'Senura De Silva',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 27,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 45, '2026-08-09': 43, '2026-09-01': 36, '2026-09-30': 36, '2026-10-31': 27 },
        email: 'mtlavinia@leo.org',
        phone: '+94 77 123 0023',
        meetingDay: 'Every Saturday',
        description: 'Serving with pride and building future leaders since the centennial.'
      },
      {
        id: 'c24',
        name: 'Leo Club of Moratuwa',
        code: 'LC-019',
        track: 'Omega Leo',
        president: 'Nuran Nayanajith',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 81,
        projectsCompleted: 5,
        membershipCheckpoints: { '2026-07-01': 31, '2026-08-09': 33, '2026-09-01': 37, '2026-09-30': 37, '2026-10-31': 81 },
        email: 'moratuwa@leo.org',
        phone: '+94 77 123 0024',
        meetingDay: 'Every Sunday',
        description: 'A legacy of service and fellowship in the heart of Moratuwa.'
      },
      {
        id: 'c25',
        name: 'Leo Club of General Sir John Kotelawala Defence University',
        code: 'LC-020',
        track: 'Omega Leo',
        president: 'Kasun Jayawardena',
        charter_date: '2026-06-15',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 122,
        projectsCompleted: 0,
        membershipCheckpoints: { '2026-07-01': 139, '2026-08-09': 21, '2026-09-01': 21, '2026-09-30': 31, '2026-10-31': 122 },
        email: 'kdu@leo.org',
        phone: '+94 77 123 0025',
        meetingDay: 'Every Friday',
        description: 'Disciplined leaders serving the nation through active volunteerism.'
      }
    ],

    members: [
      // Zone A1: Leo Club of Colombo (Host)
      { id: 'm89', clubId: 'c9', name: 'Anju Gayathri', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm90', clubId: 'c9', name: 'Hiruni Fernando', role: 'Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm91', clubId: 'c9', name: 'Sanduni Theekshana', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm26', clubId: 'c9', name: 'Amesh Silva', role: 'Member', status: 'active', joinDate: '2020-05-10', phone: '+94 77 123 0001', email: 'amesh@email.com' },
      { id: 'm27', clubId: 'c9', name: 'Janaki Perera', role: 'Member', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0011', email: 'janaki@email.com' },
      { id: 'm28', clubId: 'c9', name: 'Tharindu Silva', role: 'Member', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0012', email: 'tharindu@email.com' },

      // Zone A1: Leo Club of Colombo Millennium
      { id: 'm92', clubId: 'c10', name: 'Vinuthi Thisansa', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm93', clubId: 'c10', name: 'Dasun Amanda', role: 'Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm94', clubId: 'c10', name: 'Zaini Ashraf Zahie', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm95', clubId: 'c10', name: 'Ramasinghage Nethum Nimsilu', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm29', clubId: 'c10', name: 'Ruvini Perera', role: 'Member', status: 'active', joinDate: '2021-06-15', phone: '+94 77 123 0002', email: 'ruvini@email.com' },
      { id: 'm30', clubId: 'c10', name: 'Saman Kumara', role: 'Member', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0021', email: 'saman@email.com' },
      { id: 'm31', clubId: 'c10', name: 'Nipuni Jayasuriya', role: 'Member', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0022', email: 'nipuni.j@email.com' },

      // Zone A1: Leo Club of Colombo Six New Stars
      { id: 'm96', clubId: 'c11', name: 'K.A Sathmi Dinethra', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm97', clubId: 'c11', name: 'Chehan Nethmika Dulsen', role: 'Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm98', clubId: 'c11', name: 'Sethupa Samarasingha', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm99', clubId: 'c11', name: 'Risadi Malkini', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm32', clubId: 'c11', name: 'Kavindu Fernando', role: 'Member', status: 'active', joinDate: '2023-08-20', phone: '+94 77 123 0003', email: 'kavindu.f@email.com' },
      { id: 'm33', clubId: 'c11', name: 'Hashini Alwis', role: 'Member', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0031', email: 'hashini@email.com' },
      { id: 'm34', clubId: 'c11', name: 'Roshan De Silva', role: 'Member', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0032', email: 'roshan@email.com' },

      // Zone A1: Leo Club of UOC Alumni
      { id: 'm100', clubId: 'c12', name: 'Sasun Nimjaya Wijeratne', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm101', clubId: 'c12', name: 'Shakya Randima Siriwardena', role: 'First Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm102', clubId: 'c12', name: 'Thisula Mahawaththa', role: 'Second Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm103', clubId: 'c12', name: 'Lithira Kalubowila', role: 'Third Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm104', clubId: 'c12', name: 'Ranasinghage Don Sasmith Devmina', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm105', clubId: 'c12', name: 'Imasha Sandeepani Kumarasiri', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm106', clubId: 'c12', name: 'Mahapatabandige Himansa Gagana Perera', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm35', clubId: 'c12', name: 'Dulaj Senanayake', role: 'Member', status: 'active', joinDate: '2024-10-01', phone: '+94 77 123 0004', email: 'dulaj@email.com' },
      { id: 'm36', clubId: 'c12', name: 'Menaka Jayawardena', role: 'Member', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0041', email: 'menaka@email.com' },
      { id: 'm37', clubId: 'c12', name: 'Piyumi Fernando', role: 'Member', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0042', email: 'piyumi@email.com' },

      // Zone A2: Leo Club of University of Colombo Faculty of Science
      { id: 'm77', clubId: 'c7', name: 'Sajeetharan Mahadevan', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm78', clubId: 'c7', name: 'Ramachandran Dilelshan', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm79', clubId: 'c7', name: 'Kenuli Ruwanya Samarawickrama', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm80', clubId: 'c7', name: 'Dahamahanage Pamudi Kaushalya Piyarathna', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm81', clubId: 'c7', name: 'Pramod Abeysingha', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm16', clubId: 'c7', name: 'Dulani Bandara', role: 'Member', status: 'active', joinDate: '2025-02-15', phone: '+94 77 111 2222', email: 'dulani@email.com' },
      { id: 'm17', clubId: 'c7', name: 'Kavinda Perera', role: 'Member', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2223', email: 'kavinda@email.com' },
      { id: 'm18', clubId: 'c7', name: 'Minoli Silva', role: 'Member', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2224', email: 'minoli@email.com' },
      { id: 'm19', clubId: 'c7', name: 'Ruwan Kumara', role: 'Member', status: 'active', joinDate: '2025-03-01', phone: '+94 77 111 2225', email: 'ruwan@email.com' },
      { id: 'm20', clubId: 'c7', name: 'Shalini Fernando', role: 'Member', status: 'active', joinDate: '2025-03-10', phone: '+94 77 111 2226', email: 'shalini@email.com' },

      // Zone A2: Leo Club of University of Colombo Faculty of Arts
      { id: 'm82', clubId: 'c8', name: 'Manampeli Mahapatabadiralalage Vimukthi Rukshika Cooray', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm83', clubId: 'c8', name: 'Dona Sanduni Hansika Kannangara', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm84', clubId: 'c8', name: 'Nadeeja Dayarathna', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm85', clubId: 'c8', name: 'Kossinhala Vithanage Kushlani Parindya', role: 'Vice President 3', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm86', clubId: 'c8', name: 'Gustinna Wadu Tharushi Hiranya Sarathchandra', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm87', clubId: 'c8', name: 'R.M.Dewdini Hasarangi Rathnayake', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm88', clubId: 'c8', name: 'Singhabahu Arachchilage Aruni Lakshika Singhabahu', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm21', clubId: 'c8', name: 'Heshan Perera', role: 'Member', status: 'active', joinDate: '2025-03-20', phone: '+94 77 333 4444', email: 'heshan@email.com' },
      { id: 'm22', clubId: 'c8', name: 'Nipuni Jayasinghe', role: 'Member', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4445', email: 'nipuni@email.com' },
      { id: 'm23', clubId: 'c8', name: 'Sajith De Silva', role: 'Member', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4446', email: 'sajith@email.com' },
      { id: 'm24', clubId: 'c8', name: 'Pooja Rajapakse', role: 'Member', status: 'active', joinDate: '2025-04-05', phone: '+94 77 333 4447', email: 'pooja@email.com' },
      { id: 'm25', clubId: 'c8', name: 'Dilshan Perera', role: 'Member', status: 'active', joinDate: '2025-04-10', phone: '+94 77 333 4448', email: 'dilshan@email.com' },

      // Zone A2: Leo Club of UOC FOA Alumni
      { id: 'm107', clubId: 'c13', name: 'Yoshani Sasanthika', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm108', clubId: 'c13', name: 'Virajini Maduwanthi', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm109', clubId: 'c13', name: 'M.R.P.H.Gamage', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm110', clubId: 'c13', name: 'Jeewani Hansika', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm38', clubId: 'c13', name: 'Sanduni Jayawardena', role: 'Member', status: 'active', joinDate: '2025-01-15', phone: '+94 77 123 0005', email: 'sanduni.j@email.com' },
      { id: 'm39', clubId: 'c13', name: 'Chathura Rajapakse', role: 'Member', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0051', email: 'chathura@email.com' },
      { id: 'm40', clubId: 'c13', name: 'Dilani Gamage', role: 'Member', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0052', email: 'dilani@email.com' },

      // Zone A2: Leo Club of Informatics Institute of Technology
      { id: 'm111', clubId: 'c6', name: 'Sithuli Pehansa Amunuthuduwa', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm112', clubId: 'c6', name: 'Senumi Sithunima Somaweera', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm113', clubId: 'c6', name: 'Asini Ashcharya Wickramasinghe', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm114', clubId: 'c6', name: 'Nethulya Devindi', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm115', clubId: 'c6', name: 'Sanuli Liyansa Herath', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm116', clubId: 'c6', name: 'Methuli Nisalna Bandara', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm117', clubId: 'c6', name: 'Sahan Fernando', role: 'Member', status: 'active', joinDate: '2025-05-10', phone: '+94 77 987 6543', email: 'sahan@email.com' },

      // Zone B1: Leo Club of Moratuwa
      { id: 'm165', clubId: 'c24', name: 'Nuran Nayanajith', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm166', clubId: 'c24', name: 'Vihanga Kothalwala', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm167', clubId: 'c24', name: 'Dineththra Prabhashwari', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm168', clubId: 'c24', name: 'Dewmini Chamodya Samarakoon', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm169', clubId: 'c24', name: 'Mamith Fernando', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm71', clubId: 'c24', name: 'Thilina Perera', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0024', email: 'thilina@email.com' },
      { id: 'm72', clubId: 'c24', name: 'Chamara Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0124', email: 'chamara.f@email.com' },
      { id: 'm73', clubId: 'c24', name: 'Sandun Peiris', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0224', email: 'sandun@email.com' },

      // Zone B1: Leo Club of Moratuwa Rathmalana
      { id: 'm155', clubId: 'c21', name: 'Chamithu Senuja Kaluarachchi', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm156', clubId: 'c21', name: 'Sasadu Semuthu Dissanayake', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm157', clubId: 'c21', name: 'W.A.Muvindu Methsara Silva', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm158', clubId: 'c21', name: 'MOHOTTIGE KALIDU RANMITH DAYARATNA', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm159', clubId: 'c21', name: 'Isuru Sathsara Gunasinghe', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm62', clubId: 'c21', name: 'Ruwantha Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0021', email: 'ruwantha@email.com' },
      { id: 'm63', clubId: 'c21', name: 'Kasun Peiris', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0121', email: 'kasun.p@email.com' },
      { id: 'm64', clubId: 'c21', name: 'Mahesh Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0221', email: 'mahesh@email.com' },

      // Zone B1: Leo Club of Moratuwa 2020
      { id: 'm144', clubId: 'c19', name: 'Pumudu Ramuditha', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm145', clubId: 'c19', name: 'Hansi Nanayakkara', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm146', clubId: 'c19', name: 'Raasheed Mohomed', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm147', clubId: 'c19', name: 'Yenushi Weerasuriya', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm148', clubId: 'c19', name: 'Nuwandi Nimthara', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm149', clubId: 'c19', name: 'Hashini Himasha Perera', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm56', clubId: 'c19', name: 'Sahan Jayasuriya', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0019', email: 'sahan.j@email.com' },
      { id: 'm57', clubId: 'c19', name: 'Asanka Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0119', email: 'asanka@email.com' },
      { id: 'm58', clubId: 'c19', name: 'Thilina Mendis', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0219', email: 'thilina.m@email.com' },

      // Zone B1: Leo Club of Mount Lavinia Orient Centennial
      { id: 'm68', clubId: 'c23', name: 'Senura De Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0023', email: 'senura@email.com' },
      { id: 'm69', clubId: 'c23', name: 'Menaka Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0123', email: 'menaka.f@email.com' },
      { id: 'm70', clubId: 'c23', name: 'Ravindu Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0223', email: 'ravindu.s@email.com' },

      // Zone B1: Leo Club of Royal Achievers
      { id: 'm150', clubId: 'c20', name: 'Geemeth Methmika Bodiyabadu', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm151', clubId: 'c20', name: 'Sachithra Jalitha Godakanda', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm152', clubId: 'c20', name: 'B Manodya Kalhara', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm153', clubId: 'c20', name: 'Kasun Gamika Pathiraja', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm154', clubId: 'c20', name: 'K.D.Kavishka Perera', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm59', clubId: 'c20', name: 'Praveen Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0020', email: 'praveen@email.com' },
      { id: 'm60', clubId: 'c20', name: 'Gayan Perera', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0120', email: 'gayan@email.com' },
      { id: 'm61', clubId: 'c20', name: 'Harsha Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0220', email: 'harsha@email.com' },

      // Zone B1: Leo Club of General Sir John Kotelawala Defence University
      { id: 'm74', clubId: 'c25', name: 'Kasun Jayawardena', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0025', email: 'kasun.j@email.com' },
      { id: 'm75', clubId: 'c25', name: 'Nimna Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0125', email: 'nimna@email.com' },
      { id: 'm76', clubId: 'c25', name: 'Dulaj Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0225', email: 'dulaj.f@email.com' },

      // Zone B1: Leo Club of Cosmopolitan Creators
      { id: 'm160', clubId: 'c22', name: 'Risindu Gunasekara', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm161', clubId: 'c22', name: 'Mithum Wikramasinge', role: 'Vice President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm162', clubId: 'c22', name: 'Anuja Budvin', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm163', clubId: 'c22', name: 'Shanuk Malaka', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm164', clubId: 'c22', name: 'Methuni Sidasna', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm65', clubId: 'c22', name: 'Dilini Cooray', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0022', email: 'dilini.c@email.com' },
      { id: 'm66', clubId: 'c22', name: 'Supun Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0122', email: 'supun@email.com' },
      { id: 'm67', clubId: 'c22', name: 'Ishara Perera', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0222', email: 'ishara.p@email.com' },

      // Zone B1: Leo Club of Prince of Wales College
      { id: 'm118', clubId: 'c14', name: 'Randidu Tadeesha Jayawardena', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm119', clubId: 'c14', name: 'Ravindu chathuranga perera', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm120', clubId: 'c14', name: 'P.A.Lakindu Bhanuka Jayawardena', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm121', clubId: 'c14', name: 'J. Rivinu Sandev De Silva', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm122', clubId: 'c14', name: 'Yenuka Yoshitha De Silva', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm41', clubId: 'c14', name: 'Devinda Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0014', email: 'devinda@email.com' },
      { id: 'm42', clubId: 'c14', name: 'Janith Perera', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0114', email: 'janith@email.com' },
      { id: 'm43', clubId: 'c14', name: 'Lahiru Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0214', email: 'lahiru@email.com' },

      // Zone B1: Leo Club of Princess of Wales’ College
      { id: 'm123', clubId: 'c15', name: 'Vinuri Nihara Aponso', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm124', clubId: 'c15', name: 'Sewmini Vihanga Wijerathne', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm125', clubId: 'c15', name: 'Lashini Rohansi Goonawardene', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm126', clubId: 'c15', name: 'Theri Panchali Nethra', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm127', clubId: 'c15', name: 'Ayana Kashmi Ranasinghe', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm44', clubId: 'c15', name: 'Shehani Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0015', email: 'shehani@email.com' },
      { id: 'm45', clubId: 'c15', name: 'Amanda Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0115', email: 'amanda@email.com' },
      { id: 'm46', clubId: 'c15', name: 'Dilini Peiris', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0215', email: 'dilini.p@email.com' },

      // Zone B1: Leo Club of Sri Sumangala College
      { id: 'm128', clubId: 'c16', name: 'Danidu Damsith', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm129', clubId: 'c16', name: 'Manuga Thawasara', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm130', clubId: 'c16', name: 'Dinul Perera', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm131', clubId: 'c16', name: 'Thevindu Seniya', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm132', clubId: 'c16', name: 'Praveen Hansana', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm47', clubId: 'c16', name: 'Kusal Mendis', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0016', email: 'kusal@email.com' },
      { id: 'm48', clubId: 'c16', name: 'Tharindu Rajapakse', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0116', email: 'tharindu.r@email.com' },
      { id: 'm49', clubId: 'c16', name: 'Ruchira De Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0216', email: 'ruchira@email.com' },

      // Zone B1: Leo Club of Kalutara Vidyalaya
      { id: 'm133', clubId: 'c17', name: 'Ometh Nethsanda', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm134', clubId: 'c17', name: 'Methuka Mansara', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm135', clubId: 'c17', name: 'Dasith Damsara', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm136', clubId: 'c17', name: 'Inupa Navith', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm137', clubId: 'c17', name: 'Sadew Akash', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm138', clubId: 'c17', name: 'Yenuka Munasingha', role: 'Membership Chairperson', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm50', clubId: 'c17', name: 'Dilan Perera', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0017', email: 'dilan@email.com' },
      { id: 'm51', clubId: 'c17', name: 'Kavindu Jayasinghe', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0117', email: 'kavindu.j@email.com' },
      { id: 'm52', clubId: 'c17', name: 'Sajith Cooray', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0217', email: 'sajith.c@email.com' },

      // Zone B1: Leo Club of Kalutara Balika Vidyalaya
      { id: 'm139', clubId: 'c18', name: 'Sethmi Sonaya', role: 'President', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm140', clubId: 'c18', name: 'Teesha Sonali', role: 'Vice President 1', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm141', clubId: 'c18', name: 'Senadi Senulya', role: 'Vice President 2', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm142', clubId: 'c18', name: 'Devli Dehansa Liyanaarachchi', role: 'Secretary', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm143', clubId: 'c18', name: 'Shashikala Amandi Gunasinghe', role: 'Treasurer', status: 'active', joinDate: '', phone: '', email: '' },
      { id: 'm53', clubId: 'c18', name: 'Nethmi Fernando', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0018', email: 'nethmi@email.com' },
      { id: 'm54', clubId: 'c18', name: 'Piyumi Jayawardena', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0118', email: 'piyumi.j@email.com' },
      { id: 'm55', clubId: 'c18', name: 'Hansini Silva', role: 'Member', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0218', email: 'hansini@email.com' },
    ],

    finances: [
      // IIT finances
      { id: 'f-iit-1', clubId: 'c6', type: 'income', category: 'Membership Fees', amount: 45000, date: '2026-01-05', description: 'Annual membership collection', reference: 'MF-IIT-001' },
      { id: 'f-iit-2', clubId: 'c6', type: 'income', category: 'Sponsorship', amount: 75000, date: '2026-01-20', description: 'Corporate sponsor - Virtusa', reference: 'SP-IIT-001' },
      { id: 'f-iit-3', clubId: 'c6', type: 'expense', category: 'Projects', amount: 35000, date: '2026-03-15', description: 'Tech workshop materials', reference: 'EX-IIT-001' },
      { id: 'f-iit-4', clubId: 'c6', type: 'expense', category: 'Administration', amount: 5000, date: '2026-01-10', description: 'Stationery and printing', reference: 'EX-IIT-002' },
      // District-level finances
      { id: 'f15', clubId: 'district', type: 'income', category: 'Membership Fees', amount: 85800, date: '2026-06-30', description: 'Consolidated settled district membership dues from clubs (INV-001, INV-005, INV-007, INV-010)', reference: 'DIST-INC-001' },
      { id: 'f16', clubId: 'district', type: 'income', category: 'Sponsorship', amount: 200000, date: '2026-02-15', description: 'Main Sponsor - Dialog Axiata', reference: 'DIST-INC-002' },
      { id: 'f17', clubId: 'district', type: 'expense', category: 'Administration', amount: 45000, date: '2026-01-20', description: 'District office stationery and postage', reference: 'DIST-EXP-001' },
      { id: 'f18', clubId: 'district', type: 'expense', category: 'Events', amount: 120000, date: '2026-03-05', description: 'Leadership seminar hall booking & catering', reference: 'DIST-EXP-002' },
      // District project seed transactions (linked to p-dist-1)
      { id: 'f-proj-p-dist-1-0', clubId: 'district', type: 'expense', category: 'Projects', amount: 35000, date: '2026-06-12', description: 'Project: District Officers School of Instruction - Hall Rental & Catering', reference: 'PROJ-p-dist-1', projectId: 'p-dist-1' },
      { id: 'f-proj-p-dist-1-1', clubId: 'district', type: 'expense', category: 'Projects', amount: 15000, date: '2026-06-12', description: 'Project: District Officers School of Instruction - Training Materials & Printing', reference: 'PROJ-p-dist-1', projectId: 'p-dist-1' },
      // UOC Faculty of Science finances
      { id: 'f19', clubId: 'c7', type: 'income', category: 'Membership Fees', amount: 35000, date: '2026-02-20', description: 'Annual membership fees collection', reference: 'MF-FOS-001' },
      { id: 'f20', clubId: 'c7', type: 'income', category: 'Sponsorship', amount: 40000, date: '2026-03-05', description: 'Corporate sponsor - SciTech Solutions', reference: 'SP-FOS-001' },
      { id: 'f21', clubId: 'c7', type: 'expense', category: 'Projects', amount: 25000, date: '2026-03-10', description: 'Science Day Exhibition expenses', reference: 'EX-FOS-001' },
      { id: 'f22', clubId: 'c7', type: 'expense', category: 'Administration', amount: 3000, date: '2026-02-25', description: 'Stationery and postage dues', reference: 'EX-FOS-002' },
      // UOC Faculty of Arts finances
      { id: 'f23', clubId: 'c8', type: 'income', category: 'Membership Fees', amount: 40000, date: '2026-03-25', description: 'Annual membership collection', reference: 'MF-FOA-001' },
      { id: 'f24', clubId: 'c8', type: 'income', category: 'Fundraising', amount: 30000, date: '2026-04-10', description: 'Art exhibition ticket sales', reference: 'FR-FOA-001' },
      { id: 'f25', clubId: 'c8', type: 'expense', category: 'Events', amount: 15000, date: '2026-04-10', description: 'Venue booking and logistics', reference: 'EX-FOA-001' },
      { id: 'f26', clubId: 'c8', type: 'expense', category: 'Administration', amount: 4000, date: '2026-03-30', description: 'Meeting refreshments and flyers', reference: 'EX-FOA-002' },
      // Colombo Host finances
      { id: 'f27', clubId: 'c9', type: 'income', category: 'Membership Fees', amount: 25000, date: '2026-02-15', description: 'Annual membership fees collection', reference: 'MF-CH-001' },
      // Colombo Millennium finances
      { id: 'f28', clubId: 'c10', type: 'income', category: 'Membership Fees', amount: 30000, date: '2026-02-20', description: 'Annual membership collection', reference: 'MF-CM-001' },
      // Colombo Six New Stars finances
      { id: 'f29', clubId: 'c11', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-03-01', description: 'Annual membership collection', reference: 'MF-CSNS-001' },
      // UOC Alumni finances
      { id: 'f30', clubId: 'c12', type: 'income', category: 'Membership Fees', amount: 35000, date: '2026-03-05', description: 'Annual membership fees collection', reference: 'MF-UA-001' },
      // UOC FOA Alumni finances
      { id: 'f31', clubId: 'c13', type: 'income', category: 'Membership Fees', amount: 28000, date: '2026-03-10', description: 'Annual membership collection', reference: 'MF-UAA-001' },
      // Prince of Wales finances
      { id: 'f32', clubId: 'c14', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-PW-001' },
      // Princess of Wales finances
      { id: 'f33', clubId: 'c15', type: 'income', category: 'Membership Fees', amount: 22000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-PRW-001' },
      // Sri Sumangala finances
      { id: 'f34', clubId: 'c16', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-SS-001' },
      // Kalutara Vidyalaya finances
      { id: 'f35', clubId: 'c17', type: 'income', category: 'Membership Fees', amount: 25000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KV-001' },
      // Kalutara Balika finances
      { id: 'f36', clubId: 'c18', type: 'income', category: 'Membership Fees', amount: 24000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KBV-001' },
      // Moratuwa 2020 finances
      { id: 'f37', clubId: 'c19', type: 'income', category: 'Membership Fees', amount: 18000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-M20-001' },
      // Royal Achievers finances
      { id: 'f38', clubId: 'c20', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-RA-001' },
      // Moratuwa Ratmalana finances
      { id: 'f39', clubId: 'c21', type: 'income', category: 'Membership Fees', amount: 22000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-MR-001' },
      // Cosmopolitan Creators finances
      { id: 'f40', clubId: 'c22', type: 'income', category: 'Membership Fees', amount: 19000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-CC-001' },
      // Mount Lavinia Orient Centennial finances
      { id: 'f41', clubId: 'c23', type: 'income', category: 'Membership Fees', amount: 21000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-ML-001' },
      // Moratuwa finances
      { id: 'f42', clubId: 'c24', type: 'income', category: 'Membership Fees', amount: 23000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-M-001' },
      // KDU finances
      { id: 'f43', clubId: 'c25', type: 'income', category: 'Membership Fees', amount: 30000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KDU-001' }
    ],

    projects: [
      {
        id: 'p-dist-1',
        clubId: 'district',
        name: 'District Officers School of Instruction',
        category: 'Leadership',
        status: 'completed',
        startDate: '2026-06-10',
        endDate: '2026-06-12',
        participants: 120,
        budget: 50000,
        description: 'Comprehensive school of instruction for all club presidents, secretaries, and treasurers in District 306 D1.',
        impact: '120 officers trained across 30 clubs',
        report: {
          summary: 'The training sessions were successfully conducted over two days with external professional trainers. All participants received official certificates.',
          outcomes: 'Officer competency levels improved, compliance reporting guidelines aligned.',
          submittedAt: '2026-06-13'
        },
        budgetDetails: [
          { description: 'Hall Rental & Catering', type: 'expense', amount: 35000 },
          { description: 'Training Materials & Printing', type: 'expense', amount: 15000 }
        ]
      },
      {
        id: 'p-dist-2',
        clubId: 'district',
        name: 'District Environment Day Tree Plantation',
        category: 'Environment',
        status: 'planned',
        startDate: '2026-08-15',
        endDate: '2026-08-15',
        participants: 0,
        budget: 20000,
        description: 'Unified project across all zones to plant 1000 trees on Environment Day.',
        impact: 'Target: 1000 trees planted',
        report: {
          summary: '',
          outcomes: '',
          submittedAt: ''
        },
        budgetDetails: [
          { description: 'Saplings purchase', type: 'expense', amount: 15000 },
          { description: 'Publicity materials', type: 'expense', amount: 5000 }
        ]
      },

      // Colombo Millennium II (c10) — 10 Completed Projects
      { id: 'p-mil-1', clubId: 'c10', name: 'Youth Career & Higher Education Fair', category: 'Education', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 45, budget: 35000, description: 'Career fair and higher education guidance for school leavers.', impact: '250+ youth guided' },
      { id: 'p-mil-2', clubId: 'c10', name: 'Community Healthcare & Vision Screening', category: 'Health', status: 'completed', startDate: '2026-03-24', endDate: '2026-03-24', participants: 30, budget: 22000, description: 'Free eye screening and medical health camp for seniors.', impact: '120 citizens checked' },
      { id: 'p-mil-3', clubId: 'c10', name: 'Coastal Mangrove Restoration Drive', category: 'Environment', status: 'completed', startDate: '2026-04-12', endDate: '2026-04-12', participants: 28, budget: 18000, description: 'Planting mangroves to protect coastal biodiversity.', impact: '300 saplings planted' },
      { id: 'p-mil-4', clubId: 'c10', name: 'Leadership & Public Speaking Bootcamp', category: 'Leadership', status: 'completed', startDate: '2026-05-02', endDate: '2026-05-02', participants: 35, budget: 15000, description: 'Public speaking workshop for aspiring school prefects.', impact: '60 students trained' },
      { id: 'p-mil-5', clubId: 'c10', name: 'Digital Literacy for Primary Students', category: 'Education', status: 'completed', startDate: '2026-05-18', endDate: '2026-05-18', participants: 25, budget: 20000, description: 'Basic computer skills and internet safety lessons.', impact: '85 children taught' },
      { id: 'p-mil-6', clubId: 'c10', name: 'National Blood Donation Campaign', category: 'Health', status: 'completed', startDate: '2026-06-04', endDate: '2026-06-04', participants: 50, budget: 28000, description: 'Blood donation camp in collaboration with National Blood Transfusion Service.', impact: '94 pints collected' },
      { id: 'p-mil-7', clubId: 'c10', name: 'Zero Plastic Beach Cleanup Campaign', category: 'Environment', status: 'completed', startDate: '2026-06-22', endDate: '2026-06-22', participants: 32, budget: 8000, description: 'Cleanup of coastal waste and awareness on single-use plastics.', impact: '180kg plastic collected' },
      { id: 'p-mil-8', clubId: 'c10', name: 'Elderly Care Home Support & Nutrition', category: 'Health', status: 'completed', startDate: '2026-07-10', endDate: '2026-07-10', participants: 20, budget: 25000, description: 'Provision of dry rations and medicine to elders home.', impact: '45 elders supported' },
      { id: 'p-mil-9', clubId: 'c10', name: 'School Library Book Donation & Renovation', category: 'Education', status: 'completed', startDate: '2026-07-28', endDate: '2026-07-28', participants: 22, budget: 30000, description: 'Donated 500 books and renovated reading space.', impact: '350 students benefited' },
      { id: 'p-mil-10', clubId: 'c10', name: 'Stray Animal Welfare & Rabies Vaccination', category: 'Environment', status: 'completed', startDate: '2026-08-14', endDate: '2026-08-14', participants: 18, budget: 12000, description: 'Anti-rabies vaccination and feeding drive for stray animals.', impact: '65 dogs vaccinated' },

      // Informatics Institute of Technology (c6) — 8 Completed Projects
      { id: 'p-iit-1', clubId: 'c6', name: 'STEM & Robotics Workshop', category: 'Education', status: 'completed', startDate: '2026-02-01', endDate: '2026-03-15', participants: 24, budget: 35000, description: 'Introduced robotics and programming to underprivileged school children.', impact: '350 students benefited' },
      { id: 'p-iit-2', clubId: 'c6', name: 'E-Waste Recycling Drive', category: 'Environment', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 30, budget: 5000, description: 'Collected and responsibly recycled electronic waste.', impact: '500kg e-waste recycled' },
      { id: 'p-iit-3', clubId: 'c6', name: 'Tech Innovators Hackathon for Good', category: 'Leadership', status: 'completed', startDate: '2026-04-20', endDate: '2026-04-20', participants: 60, budget: 45000, description: 'Hackathon creating tech solutions for local charities.', impact: '12 social tech prototypes' },
      { id: 'p-iit-4', clubId: 'c6', name: 'CodeCraft: Python for School Children', category: 'Education', status: 'completed', startDate: '2026-05-12', endDate: '2026-05-12', participants: 35, budget: 12000, description: 'Free introductory coding bootcamps for teens.', impact: '100+ students certified' },
      { id: 'p-iit-5', clubId: 'c6', name: 'Cyber Safety & Digital Wellbeing Seminar', category: 'Education', status: 'completed', startDate: '2026-06-02', endDate: '2026-06-02', participants: 40, budget: 10000, description: 'Workshops protecting youth from cyberbullying and phishing.', impact: '200 participants reached' },
      { id: 'p-iit-6', clubId: 'c6', name: 'AI & Future Careers Symposium', category: 'Leadership', status: 'completed', startDate: '2026-06-18', endDate: '2026-06-18', participants: 55, budget: 30000, description: 'Industry panel session on artificial intelligence applications.', impact: '180 students attended' },
      { id: 'p-iit-7', clubId: 'c6', name: 'Campus Energy Conservation Campaign', category: 'Environment', status: 'completed', startDate: '2026-07-05', endDate: '2026-07-05', participants: 28, budget: 15000, description: 'Green audit and energy efficiency signage at university.', impact: '15% reduction in campus power waste' },
      { id: 'p-iit-8', clubId: 'c6', name: 'Refurbished PC Donation to Rural School', category: 'Education', status: 'completed', startDate: '2026-07-22', endDate: '2026-07-22', participants: 20, budget: 50000, description: 'Refurbished and donated 10 desktop computers to rural lab.', impact: '150 rural students empowered' },

      // Leo Club of Moratuwa (c24) — 5 Completed Projects
      { id: 'p-mor-1', clubId: 'c24', name: 'Moratuwa Beach Cleanup & Coastal Safety', category: 'Environment', status: 'completed', startDate: '2026-03-15', endDate: '2026-03-15', participants: 30, budget: 12000, description: 'Beach cleaning campaign along Lunawa coastal belt.', impact: '150kg ocean waste removed' },
      { id: 'p-mor-2', clubId: 'c24', name: 'Community Health & Diabetes Screening Camp', category: 'Health', status: 'completed', startDate: '2026-04-18', endDate: '2026-04-18', participants: 25, budget: 25000, description: 'Free sugar test and wellness counseling for residents.', impact: '110 adults tested' },
      { id: 'p-mor-3', clubId: 'c24', name: 'Fisherfolk Community Welfare & Dry Rations', category: 'Health', status: 'completed', startDate: '2026-05-10', endDate: '2026-05-10', participants: 22, budget: 35000, description: 'Distribution of dry rations and food packs during rough sea season.', impact: '80 families supported' },
      { id: 'p-mor-4', clubId: 'c24', name: 'Traditional Carpentry Craft Workshop', category: 'Education', status: 'completed', startDate: '2026-06-08', endDate: '2026-06-08', participants: 20, budget: 18000, description: 'Heritage skills training for young vocational trainees.', impact: '35 youths trained' },
      { id: 'p-mor-5', clubId: 'c24', name: 'Youth Leadership Outbound Challenge', category: 'Leadership', status: 'completed', startDate: '2026-07-15', endDate: '2026-07-15', participants: 35, budget: 40000, description: 'Team building and outdoor survival challenge for Leos.', impact: '35 youth leaders trained' },

      // Leo Club of UOC Alumni (c12) — 4 Completed Projects
      { id: 'p-uoca-1', clubId: 'c12', name: 'Undergraduate Mentorship Program', category: 'Education', status: 'completed', startDate: '2026-03-12', endDate: '2026-03-12', participants: 25, budget: 15000, description: 'One-on-one professional mentorship for fresh graduates.', impact: '50 undergraduates mentored' },
      { id: 'p-uoca-2', clubId: 'c12', name: 'Higher Studies & Scholarship Guidance Forum', category: 'Education', status: 'completed', startDate: '2026-04-25', endDate: '2026-04-25', participants: 40, budget: 12000, description: 'Session with alumni studying abroad regarding postgraduate scholarships.', impact: '120 applicants guided' },
      { id: 'p-uoca-3', clubId: 'c12', name: 'Corporate Ethics & Workplace Transition Seminar', category: 'Leadership', status: 'completed', startDate: '2026-05-30', endDate: '2026-05-30', participants: 35, budget: 18000, description: 'Guidance on navigating professional careers for university students.', impact: '90 participants' },
      { id: 'p-uoca-4', clubId: 'c12', name: 'Colombo Community Health & Nutrition Project', category: 'Health', status: 'completed', startDate: '2026-06-25', endDate: '2026-06-25', participants: 28, budget: 22000, description: 'Nutrition counseling and balanced meal kits for urban families.', impact: '60 families assisted' },

      // University of Colombo Faculty of Arts (c8) — 2 Completed Projects
      { id: 'p-arts-1', clubId: 'c8', name: 'Art Therapy & Emotional Wellness Workshop', category: 'Health', status: 'completed', startDate: '2026-03-05', endDate: '2026-03-05', participants: 20, budget: 15000, description: 'Conducted expressive art therapy workshop for university students.', impact: '45 students participated' },
      { id: 'p-arts-2', clubId: 'c8', name: 'Inter-Cultural Harmony & Folklore Exchange', category: 'Education', status: 'completed', startDate: '2026-05-20', endDate: '2026-05-20', participants: 35, budget: 20000, description: 'Exhibition and discussion on preserving indigenous Sri Lankan folk arts.', impact: '150 visitors engaged' },

      // UOC FOA Alumni (c13) — 2 Completed Projects
      { id: 'p-foa-1', clubId: 'c13', name: 'Heritage Folklore Digital Archive', category: 'Education', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 14, budget: 15000, description: 'Preserving local oral folklore stories into open access digital audio archive.', impact: '50 folktales recorded' },
      { id: 'p-foa-2', clubId: 'c13', name: 'Creative Writing & Media Literacy Workshop', category: 'Education', status: 'completed', startDate: '2026-06-12', endDate: '2026-06-12', participants: 25, budget: 14000, description: 'Workshops for youth on critical news evaluation and narrative writing.', impact: '70 students trained' },

      // Colombo University Faculty of Science (c7) — 1 Completed Project
      { id: 'p-sci-1', clubId: 'c7', name: 'Science Day Exhibition & Lab Demonstrations', category: 'Education', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 25, budget: 25000, description: 'Organized interactive science experiment demonstrations for school children.', impact: '150+ students attended' },

      // Cosmopolitan Creators (c22) — 1 Completed Project
      { id: 'p-cosmo-1', clubId: 'c22', name: 'Creative Arts & Craft Workshop for Children', category: 'Education', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 12, budget: 9000, description: 'Art supplies donation and painting lessons for children in care home.', impact: '25 children participated' },

      // Kalutara Balika Maha Vidyalaya (c18) — 1 Completed Project
      { id: 'p-kbmv-1', clubId: 'c18', name: 'Child Care & Health Education Seminar', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 14, budget: 8000, description: 'Seminar on nutrition and primary hygiene for young school girls.', impact: '60 students guided' },

      // Moratuwa 2020 (c19) — 1 Completed Project
      { id: 'p-mor2020-1', clubId: 'c19', name: 'Urban Green Belt Tree Plantation', category: 'Environment', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 16, budget: 6000, description: 'Planting indigenous shade trees along community parkway.', impact: '50 trees planted' },

      // Princess of Wales College (c15) — 1 Completed Project
      { id: 'p-pwc-1', clubId: 'c15', name: 'Princess Health Camp & Eye Checkup', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 18, budget: 15000, description: 'Organized free general health and eye screening camp for students.', impact: '100+ students checked' }
    ],

    announcements: [
      {
        id: 'a1',
        title: 'District Convention 2026 — Registration Open',
        content: 'We are pleased to announce that registration for the Annual District Convention 2026 is now open. All clubs are required to register their delegates by July 15, 2026. The convention will be held at the Grand Ballroom, Colombo from August 10-12, 2026.',
        priority: 'urgent',
        targetClubs: 'all',
        createdAt: '2026-06-01',
        author: 'District Governor',
        read: ['c9']
      },
      {
        id: 'a2',
        title: 'Monthly Activity Report Deadline',
        content: 'All clubs are reminded to submit their monthly activity reports by the 5th of each month. Reports must include project summaries, financial updates, and membership changes. Late submissions will affect club performance points.',
        priority: 'important',
        targetClubs: 'all',
        createdAt: '2026-06-10',
        author: 'District Secretary',
        read: []
      },
      {
        id: 'a3',
        title: 'New Point Criteria Updated',
        content: 'The district administration has updated the club performance point criteria for the 2026-2027 term. Please review the updated point table in the Points section of your dashboard. Key changes include increased weightage for community service projects.',
        priority: 'important',
        targetClubs: 'all',
        createdAt: '2026-06-12',
        author: 'District Governor',
        read: []
      },
      {
        id: 'a4',
        title: 'Zone A1 Joint Meeting Invitation',
        content: 'All Zone A1 clubs are invited to attend the quarterly joint meeting on June 25, 2026 at 4:00 PM. Venue: Colombo. Agenda includes zone project planning and inter-club collaboration opportunities.',
        priority: 'normal',
        targetClubs: ['c9', 'c10'],
        createdAt: '2026-06-14',
        author: 'Zone Chairperson',
        read: []
      },
      {
        id: 'a5',
        title: 'Congratulations to Leo Club of Informatics Institute of Technology!',
        content: 'We congratulate the Leo Club of Informatics Institute of Technology for winning the Best Community Project Award for their STEM & Robotics Workshop. Outstanding work by the entire club!',
        priority: 'normal',
        targetClubs: 'all',
        createdAt: '2026-05-28',
        author: 'District Governor',
        read: ['c6', 'c7']
      }
    ],

    events: [
      {
        id: 'e1',
        name: 'Annual District Convention 2026',
        date: '2026-08-10',
        endDate: '2026-08-12',
        venue: 'Grand Ballroom, Colombo',
        capacity: 500,
        registrationDeadline: '2026-07-15',
        description: 'The flagship annual gathering of all Leo clubs in the district. Features keynote speakers, workshops, awards ceremony, and fellowship activities.',
        status: 'open',
        registrations: [
          { clubId: 'c6', participants: ['m111', 'm112', 'm113'], registeredAt: '2026-06-05', status: 'confirmed' },
          { clubId: 'c7', participants: ['m77', 'm78'], registeredAt: '2026-06-08', status: 'confirmed' },
        ]
      },
      {
        id: 'e2',
        name: 'Inter-Club Sports Meet',
        date: '2026-07-20',
        endDate: '2026-07-20',
        venue: 'Municipal Stadium, Kandy',
        capacity: 300,
        registrationDeadline: '2026-07-10',
        description: 'Annual sports competition between Leo clubs. Events include cricket, volleyball, athletics, and team challenges.',
        status: 'open',
        registrations: [
          { clubId: 'c6', participants: ['m111', 'm114', 'm115'], registeredAt: '2026-06-12', status: 'confirmed' },
        ]
      },
      {
        id: 'e3',
        name: 'Leadership Development Seminar',
        date: '2026-09-05',
        endDate: '2026-09-05',
        venue: 'Conference Center, Negombo',
        capacity: 150,
        registrationDeadline: '2026-08-25',
        description: 'A full-day seminar focused on developing leadership skills for current and incoming club officers.',
        status: 'upcoming',
        registrations: []
      },
      {
        id: 'e4',
        name: 'District Community Service Day',
        date: '2026-06-28',
        endDate: '2026-06-28',
        venue: 'Multiple Locations',
        capacity: 1000,
        registrationDeadline: '2026-06-22',
        description: 'A unified district-wide community service day where all clubs participate in service activities simultaneously across different locations.',
        status: 'open',
        registrations: [
          { clubId: 'c6', participants: ['m111', 'm112', 'm113', 'm114', 'm115', 'm116'], registeredAt: '2026-06-15', status: 'confirmed' },
          { clubId: 'c7', participants: ['m77', 'm78', 'm79', 'm80'], registeredAt: '2026-06-16', status: 'confirmed' },
          { clubId: 'c8', participants: ['m82', 'm83', 'm84'], registeredAt: '2026-06-16', status: 'confirmed' },
        ]
      }
    ],

    pointCriteria: [
      // 1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)
      { id: 'ad1_1', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 10000, description: 'Submitting Monthly Activity Report (MAR) to the District Secretary on or before 10th day of the following month (11.59 PM) ex: July MAR on or before 10th Aug (11.59 PM)', perUnit: 10000, unit: 'submission' },
      { id: 'ad1_2', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 100000, description: 'Updating every service activity on MYLCI and sending the evidence with the MAR Report', perUnit: 100000, unit: 'update' },
      { id: 'ad1_3', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 10000, description: 'Submitting the Monthly Membership Report (MMR should be attached with the following month MAR)', perUnit: 10000, unit: 'submission' },
      { id: 'ad1_4', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 100000, description: 'Implementing five (5) Newsletters throughout the Leostic year', perUnit: 20000, unit: 'newsletter' },
      { id: 'ad1_5', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 20000, description: 'Induction of a new member via MYLCI (per new member) (except October)', perUnit: 20000, unit: 'member' },
      { id: 'ad1_6', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 1000000, description: 'Timely submission of Leo72 form or reporting officers via MYLCI before 14th of July', perUnit: 1000000, unit: 'submission' },
      { id: 'ad1_7', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 100000, description: 'MYLEO Leo Club profile updating before 31st of August', perUnit: 100000, unit: 'update' },
      { id: 'ad1_8', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 100000, description: 'MYLEO Leo Club officer updating within the 1st quarter', perUnit: 100000, unit: 'update' },
      { id: 'ad1_9', category: '1.1. ACTIVITY AND MEMBERSHIP REPORTING (AD 1)', maxPoints: 20000, description: 'Maintaining same membership count on both MYLCI & MYLEO platforms (per month)', perUnit: 20000, unit: 'month' },

      // 1.2. BUDGETING & FINANCIAL PLANNING (AD 2)
      { id: 'ad2_1', category: '1.2. BUDGETING & FINANCIAL PLANNING (AD 2)', maxPoints: 10000, description: 'Submission of Monthly Treasurer Report (MTR) with the activity report on or before the 10th day of the following month via MYLEO (11.59 PM)', perUnit: 10000, unit: 'submission' },
      { id: 'ad2_2', category: '1.2. BUDGETING & FINANCIAL PLANNING (AD 2)', maxPoints: 10000, description: 'Manual submission of the Monthly Treasurer\'s Report before 10th of the following month', perUnit: 10000, unit: 'submission' },
      { id: 'ad2_3', category: '1.2. BUDGETING & FINANCIAL PLANNING (AD 2)', maxPoints: 500000, description: 'Timely payment of Leo District Council dues (On or before 15th of January 2026)', perUnit: 500000, unit: 'payment' },
      { id: 'ad2_4', category: '1.2. BUDGETING & FINANCIAL PLANNING (AD 2)', maxPoints: 1000000, description: 'Conducting an audit and submitting it to the district on the final reporting deadline of the year', perUnit: 1000000, unit: 'audit' },
      { id: 'ad2_5', category: '1.2. BUDGETING & FINANCIAL PLANNING (AD 2)', maxPoints: 200000, description: 'Annual budget approved by the parent Lions club within the 1st quarter (A proof of email/letter confirmation must be attached)', perUnit: 200000, unit: 'approval' },

      // 1.3. MEETINGS, ATTENDANCE & MEMBERSHIP DEVELOPMENT (AD 3) - 1.3.1 General Meetings
      { id: 'ad3_1_1', category: '1.3.1. General Meetings (AD 3)', maxPoints: 100000, description: 'Attendance at Monthly General Meetings 75% or more (Exclusive of Member at Large)', perUnit: 100000, unit: 'achievement' },
      { id: 'ad3_1_2', category: '1.3.1. General Meetings (AD 3)', maxPoints: 50000, description: 'Attendance at Monthly General Meetings 50% or more (Exclusive of Member at Large)', perUnit: 50000, unit: 'achievement' },
      { id: 'ad3_1_3', category: '1.3.1. General Meetings (AD 3)', maxPoints: 50000, description: 'Presence of Leo Advisor or a Parent Lions Club Representative', perUnit: 50000, unit: 'achievement' },
      { id: 'ad3_1_4', category: '1.3.1. General Meetings (AD 3)', maxPoints: 5000, description: 'Presence of Guests (per guest) (Special Guest should be Zone Director or Zone Director\'s representative(RD/ZD))', perUnit: 5000, unit: 'guest' },

      // 1.3.2 Board Meetings
      { id: 'ad3_2_1', category: '1.3.2. Board Meetings (AD 3)', maxPoints: 20000, description: 'Attendance at Board Meetings 75% or more', perUnit: 20000, unit: 'achievement' },
      { id: 'ad3_2_2', category: '1.3.2. Board Meetings (AD 3)', maxPoints: 10000, description: 'Attendance at Board Meetings 50% or more', perUnit: 10000, unit: 'achievement' },
      { id: 'ad3_2_3', category: '1.3.2. Board Meetings (AD 3)', maxPoints: 10000, description: 'Presence of Leo Advisor or a Parent Lions Club Representative', perUnit: 10000, unit: 'achievement' },

      // 1.3.3 Special Points for the General meeting & Official Visits
      { id: 'ad3_3_1', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 50000, description: 'Conducting all the General meetings from July to April (Onsite 60% / Online 40%)', perUnit: 50000, unit: 'achievement' },
      { id: 'ad3_3_2', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 50000, description: 'Completing DP & DVP visits within the 2nd quarter (Only Onsite)', perUnit: 50000, unit: 'achievement' },
      { id: 'ad3_3_3', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 50000, description: 'Completing MDP visit (Only Onsite)', perUnit: 50000, unit: 'achievement' },
      { id: 'ad3_3_4', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 25000, description: 'Completing DS visit (Online/Onsite)', perUnit: 25000, unit: 'achievement' },
      { id: 'ad3_3_5', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 25000, description: 'Completing DT visit (Online/Onsite)', perUnit: 25000, unit: 'achievement' },
      { id: 'ad3_3_6', category: '1.3.3. Special Points for General Meetings & Official Visits (AD 3)', maxPoints: 25000, description: 'Completing Regional Director visit (Online/Onsite)', perUnit: 25000, unit: 'achievement' },

      // 1.3.4 Membership Development
      { id: 'ad3_4_1', category: '1.3.4. Membership Development (AD 3)', maxPoints: 10000, description: 'A Member inducted during October (Leo Club Membership Growth Month) (Name and details should be certified by the Leo Advisor)', perUnit: 10000, unit: 'achievement' },
      { id: 'ad3_4_2', category: '1.3.4. Membership Development (AD 3)', maxPoints: 10000, description: 'Received Membership Growth certificate (per each) (October Membership Growth Month)', perUnit: 10000, unit: 'certificate' },
      { id: 'ad3_4_3', category: '1.3.4. Membership Development (AD 3)', maxPoints: 20000, description: 'Membership Development Publicity campaigns conducted during April (Leo Club Awareness Month) (Proofs of the campaign should be separately provided)', perUnit: 20000, unit: 'campaign' },
      { id: 'ad3_4_4', category: '1.3.4. Membership Development (AD 3)', maxPoints: 10000, description: 'An Orientation program conducted within a quarter (At least 03 orientations must be conducted. Only one orientation can be online.) (per quarter)', perUnit: 10000, unit: 'orientation' },

      // 1.3.5 General Club Administration
      { id: 'ad3_5_1', category: '1.3.5. General Club Administration (AD 3)', maxPoints: 500000, description: 'Approval granted for the club officers and committees appointed, from the parent Lions club (should be done and informed to the district via email before 31st of July)', perUnit: 500000, unit: 'approval' },
      { id: 'ad3_5_2', category: '1.3.5. General Club Administration (AD 3)', maxPoints: 500000, description: 'Club bank account created / access granted by 30th of September', perUnit: 500000, unit: 'achievement' },

      // 1.3.6 Miscellaneous
      { id: 'ad3_6_1', category: '1.3.6. Miscellaneous (AD 3)', maxPoints: 20000, description: 'Joint meeting with a Leo Club of District 306 D1', perUnit: 20000, unit: 'meeting' },
      { id: 'ad3_6_2', category: '1.3.6. Miscellaneous (AD 3)', maxPoints: 30000, description: 'Joint meeting with a Parent Lions Club', perUnit: 30000, unit: 'meeting' },
      { id: 'ad3_6_3', category: '1.3.6. Miscellaneous (AD 3)', maxPoints: 200000, description: 'Conducting the Installation Ceremony on or before 31st of August', perUnit: 200000, unit: 'ceremony' },
      { id: 'ad3_6_4', category: '1.3.6. Miscellaneous (AD 3)', maxPoints: 100000, description: 'Conducting the nomination & Election meetings on or before 15th April 2025', perUnit: 100000, unit: 'meeting' },

      // 1.4. PROJECT MONETARY VALUE (AC 1)
      { id: 'ac1_2', category: '1.4. PROJECT MONETARY VALUE (AC 1)', maxPoints: 10000, description: 'Joint Project (per organization) Project with a Lions Club will receive an extra 1,000,000 points after providing proof of application of the "Serving Together" banner patch from International.', perUnit: 10000, unit: 'project' },
      { id: 'ac1_3', category: '1.4. PROJECT MONETARY VALUE (AC 1)', maxPoints: 50000, description: 'Project on behalf of the Leo District Council', perUnit: 50000, unit: 'project' },
      { id: 'ac1_4', category: '1.4. PROJECT MONETARY VALUE (AC 1)', maxPoints: 100000, description: 'Project on behalf of the Leo Multiple District 306', perUnit: 100000, unit: 'project' },

      // 1.5. PR AND MARKETING POINTS (AC 2)
      { id: 'ac2_1', category: '1.5. PR AND MARKETING POINTS (AC 2)', maxPoints: 200000, description: 'Maintain a website', perUnit: 200000, unit: 'website' },
      { id: 'ac2_2', category: '1.5. PR AND MARKETING POINTS (AC 2)', maxPoints: 50000, description: 'Maintain a Social Media Platform (per platform)', perUnit: 50000, unit: 'platform' },
      { id: 'ac2_3', category: '1.5. PR AND MARKETING POINTS (AC 2)', maxPoints: 100000, description: 'Publicity for the event using social media (Quality is important) Criteria: 2 minimum flyers, event photo album & promoting through 2 different social media (e.g., Facebook & Instagram or Facebook & WhatsApp, etc.)', perUnit: 100000, unit: 'campaign' },
      { id: 'ac2_4', category: '1.5. PR AND MARKETING POINTS (AC 2)', maxPoints: 100000, description: 'Publicity for the event using other media such as newspaper advertisements, public billboards and electronic media (per tool and per display) [NOTE: These points can be claimed only per design basis]', perUnit: 100000, unit: 'display' },

      // 1.6. SPECIAL POINTS FOR PROJECTS & PROJECT CATEGORIES (AC 3)
      { id: 'ac3_1', category: '1.6. SPECIAL POINTS FOR PROJECTS & PROJECT CATEGORIES (AC 3)', maxPoints: 1000000, description: 'Completing all project categories', perUnit: 1000000, unit: 'achievement' },
      { id: 'ac3_2', category: '1.6. SPECIAL POINTS FOR PROJECTS & PROJECT CATEGORIES (AC 3)', maxPoints: 100000, description: 'Completing all Lions Global Challenges categories', perUnit: 100000, unit: 'achievement' },
      { id: 'ac3_3', category: '1.6. SPECIAL POINTS FOR PROJECTS & PROJECT CATEGORIES (AC 3)', maxPoints: 500000, description: 'Completing 3 fundraising projects', perUnit: 500000, unit: 'achievement' },

      // 2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)
      { id: 'int1_1', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 1000, description: 'Presence of a club member (per head)', perUnit: 1000, unit: 'head' },
      { id: 'int1_2', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 5000, description: 'Presence of the Leo Advisor/ Lion from a parent Lions Club (per head)', perUnit: 5000, unit: 'head' },
      { id: 'int1_3', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 1000, description: 'Presence of the Lions (per head)', perUnit: 1000, unit: 'head' },
      { id: 'int1_4', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 1000, description: 'General participants (per head)', perUnit: 1000, unit: 'head' },
      { id: 'int1_5', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 5000, description: 'Presence of a Visiting Leos, Leo District Council Officers & Multiple Council Officers at the capacity of an invitee (per head)', perUnit: 5000, unit: 'head' },
      { id: 'int1_6', category: '2.1. PARTICIPATION AT CLUB PROJECTS - ONSITE (INT 1)', maxPoints: 10000, description: 'Inviting Guests (Chief Guest & Guests of Honor) for the event (if claimed, omit 1.4 for the Chief Guest if re-applies) [Invitation Emails should be attached in Project Report]', perUnit: 10000, unit: 'guest' },

      // 2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)
      { id: 'int2_1', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 500, description: 'Presence of a club member (per head)', perUnit: 500, unit: 'head' },
      { id: 'int2_2', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 2000, description: 'Presence of the Leo Advisor/ Lion from a parent Lions Club (per head)', perUnit: 2000, unit: 'head' },
      { id: 'int2_3', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 500, description: 'Presence of the Lions (per head)', perUnit: 500, unit: 'head' },
      { id: 'int2_4', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 200, description: 'General participants (per head)', perUnit: 200, unit: 'head' },
      { id: 'int2_5', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 300, description: 'Presence of a Visiting Leos, Leo District Council Officers & Multiple Council Officers at the capacity of an invitee (per head)', perUnit: 300, unit: 'head' },
      { id: 'int2_6', category: '2.2. PARTICIPATION AT CLUB PROJECTS - ONLINE (INT 2)', maxPoints: 1000, description: 'Inviting Guests (Chief Guest & Guests of Honor) for the event (if claimed, omit 1.4 for the Chief Guest if re-applies) [Invitation Emails should be attached in Project Report]', perUnit: 1000, unit: 'guest' },

      // 2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)
      { id: 'int3_1', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 10000, description: 'Club President', perUnit: 10000, unit: 'achievement' },
      { id: 'int3_2', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 8000, description: 'Club Vice President', perUnit: 8000, unit: 'achievement' },
      { id: 'int3_3', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 5000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 5000, unit: 'achievement' },
      { id: 'int3_4', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 3000, description: 'Club Board of Directors', perUnit: 3000, unit: 'achievement' },
      { id: 'int3_5', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 1000, description: 'Club Member', perUnit: 1000, unit: 'achievement' },
      { id: 'int3_6', category: '2.3. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONSITE (INT 3)', maxPoints: 10000, description: 'Club Leo Advisor', perUnit: 10000, unit: 'achievement' },

      // 2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)
      { id: 'int4_1', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 5000, description: 'Club President', perUnit: 5000, unit: 'achievement' },
      { id: 'int4_2', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 3000, description: 'Club Vice President', perUnit: 3000, unit: 'achievement' },
      { id: 'int4_3', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 3000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 3000, unit: 'achievement' },
      { id: 'int4_4', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 2000, description: 'Club Board of Directors', perUnit: 2000, unit: 'achievement' },
      { id: 'int4_5', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 500, description: 'Club Member', perUnit: 500, unit: 'achievement' },
      { id: 'int4_6', category: '2.4. PARTICIPATION AT OTHER LEO CLUB ACTIVITIES - ONLINE (INT 4)', maxPoints: 5000, description: 'Club Leo Advisor', perUnit: 5000, unit: 'achievement' },

      // 2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)
      { id: 'int5_1', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 20000, description: 'Club President', perUnit: 20000, unit: 'achievement' },
      { id: 'int5_2', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 10000, description: 'Club Vice President', perUnit: 10000, unit: 'achievement' },
      { id: 'int5_3', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 8000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 8000, unit: 'achievement' },
      { id: 'int5_4', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 8000, description: 'Club Board of Directors', perUnit: 8000, unit: 'achievement' },
      { id: 'int5_5', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 4000, description: 'Club Member', perUnit: 4000, unit: 'achievement' },
      { id: 'int5_6', category: '2.5. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONSITE (INT 5)', maxPoints: 20000, description: 'Club Leo Advisor', perUnit: 20000, unit: 'achievement' },

      // 2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)
      { id: 'int6_1', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 10000, description: 'Club President', perUnit: 10000, unit: 'achievement' },
      { id: 'int6_2', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 5000, description: 'Club Vice President', perUnit: 5000, unit: 'achievement' },
      { id: 'int6_3', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 5000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 5000, unit: 'achievement' },
      { id: 'int6_4', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 3000, description: 'Club Board of Directors', perUnit: 3000, unit: 'achievement' },
      { id: 'int6_5', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 1000, description: 'Club Member', perUnit: 1000, unit: 'achievement' },
      { id: 'int6_6', category: '2.6. SPECIAL PARTICIPATION POINTS FOR LEO COUNCIL 306 D1 & MD ACTIVITIES - ONLINE (INT 6)', maxPoints: 10000, description: 'Club Leo Advisor', perUnit: 10000, unit: 'achievement' },

      // 2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)
      { id: 'int7_1', category: '2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)', maxPoints: 20000, description: 'Club President', perUnit: 20000, unit: 'achievement' },
      { id: 'int7_2', category: '2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)', maxPoints: 10000, description: 'Club Vice President', perUnit: 10000, unit: 'achievement' },
      { id: 'int7_3', category: '2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)', maxPoints: 8000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 8000, unit: 'achievement' },
      { id: 'int7_4', category: '2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)', maxPoints: 8000, description: 'Club Board of Directors', perUnit: 8000, unit: 'achievement' },
      { id: 'int7_5', category: '2.7. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONSITE (INT 7)', maxPoints: 4000, description: 'Club Member', perUnit: 4000, unit: 'achievement' },

      // 2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)
      { id: 'int8_1', category: '2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)', maxPoints: 10000, description: 'Club President', perUnit: 10000, unit: 'achievement' },
      { id: 'int8_2', category: '2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)', maxPoints: 5000, description: 'Club Vice President', perUnit: 5000, unit: 'achievement' },
      { id: 'int8_3', category: '2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)', maxPoints: 5000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 5000, unit: 'achievement' },
      { id: 'int8_4', category: '2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)', maxPoints: 3000, description: 'Club Board of Directors', perUnit: 3000, unit: 'achievement' },
      { id: 'int8_5', category: '2.8. SPECIAL PARTICIPATION POINTS FOR LIONS CLUB ACTIVITIES - ONLINE (INT 8)', maxPoints: 1000, description: 'Club Member', perUnit: 1000, unit: 'achievement' },

      // 2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)
      { id: 'int9_1', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 20000, description: 'Club President', perUnit: 20000, unit: 'achievement' },
      { id: 'int9_2', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 10000, description: 'Club Vice President', perUnit: 10000, unit: 'achievement' },
      { id: 'int9_3', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 8000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 8000, unit: 'achievement' },
      { id: 'int9_4', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 8000, description: 'Club Board of Directors', perUnit: 8000, unit: 'achievement' },
      { id: 'int9_5', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 4000, description: 'Club Member', perUnit: 4000, unit: 'achievement' },
      { id: 'int9_6', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: 20000, description: 'Club Leo Advisor', perUnit: 20000, unit: 'achievement' },
      { id: 'int9_7', category: '2.9. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONSITE (INT 9)', maxPoints: -100000, description: 'If anyone from the Leo club not representing at the Council Meeting (Negative points will be calculated)', perUnit: -100000, unit: 'penalty' },

      // 2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)
      { id: 'int10_1', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 10000, description: 'Club President', perUnit: 10000, unit: 'achievement' },
      { id: 'int10_2', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 5000, description: 'Club Vice President', perUnit: 5000, unit: 'achievement' },
      { id: 'int10_3', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 5000, description: 'Club Secretary/Club Treasurer/Asst.Secretary/Asst.Treasurer', perUnit: 5000, unit: 'achievement' },
      { id: 'int10_4', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 3000, description: 'Club Board of Directors', perUnit: 3000, unit: 'achievement' },
      { id: 'int10_5', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 1000, description: 'Club Member', perUnit: 1000, unit: 'achievement' },
      { id: 'int10_6', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: 10000, description: 'Club Leo Advisor', perUnit: 10000, unit: 'achievement' },
      { id: 'int10_7', category: '2.10. SPECIAL PARTICIPATION POINTS LEO DISTRICT COUNCIL MEETINGS - ONLINE (INT 10)', maxPoints: -100000, description: 'If anyone from the Leo club not representing at the Council Meeting (Negative points will be calculated)', perUnit: -100000, unit: 'penalty' },

      // 3.1. LEO DISTRICT EVENTS POINTS (SP 1)
      { id: 'sp1_1', category: '3.1. LEO DISTRICT EVENTS POINTS (SP 1)', maxPoints: 100000, description: 'Highest participation for the District Events (per event)', perUnit: 100000, unit: 'event' },
      { id: 'sp1_2', category: '3.1. LEO DISTRICT EVENTS POINTS (SP 1)', maxPoints: 150000, description: 'Participated more than 50 members for district event (per event)', perUnit: 150000, unit: 'event' },
      { id: 'sp1_3', category: '3.1. LEO DISTRICT EVENTS POINTS (SP 1)', maxPoints: 100000, description: 'Participated more than 30 members for district event (per event)', perUnit: 100000, unit: 'event' },
      { id: 'sp1_4', category: '3.1. LEO DISTRICT EVENTS POINTS (SP 1)', maxPoints: 75000, description: 'Participated more than 20 members for district event (per event)', perUnit: 75000, unit: 'event' },
      { id: 'sp1_5', category: '3.1. LEO DISTRICT EVENTS POINTS (SP 1)', maxPoints: 50000, description: 'Participated more than 10 members for district event (per event)', perUnit: 50000, unit: 'event' },

      // 3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)
      { id: 'sp2_1', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 100000, description: 'Highest participation for the District Events (per event)', perUnit: 100000, unit: 'event' },
      { id: 'sp2_2', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 150000, description: 'Participated more than 50 members for district event (per event)', perUnit: 150000, unit: 'event' },
      { id: 'sp2_3', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 100000, description: 'Participated more than 30 members for district event (per event)', perUnit: 100000, unit: 'event' },
      { id: 'sp2_4', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 75000, description: 'Participated more than 20 members for district event (per event)', perUnit: 75000, unit: 'event' },
      { id: 'sp2_5', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 50000, description: 'Participated more than 10 members for district event (per event)', perUnit: 50000, unit: 'event' },
      { id: 'sp2_6', category: '3.2. LEO MULTIPLE DISTRICT EVENTS POINTS (SP 2)', maxPoints: 30000, description: 'Join as the organizing club for Multiple District Events (per event)', perUnit: 30000, unit: 'event' },

      // 3.3. SPECIAL RECOGNITION FOR COMPLETING SERVICE HOURS (SP 3)
      { id: 'sp3_1', category: '3.3. SPECIAL RECOGNITION FOR COMPLETING SERVICE HOURS (SP 3)', maxPoints: 50000, description: 'Completing 200+ Service hours (per member)', perUnit: 50000, unit: 'member' },
      { id: 'sp3_2', category: '3.3. SPECIAL RECOGNITION FOR COMPLETING SERVICE HOURS (SP 3)', maxPoints: 25000, description: 'Completing 100+ Service hours (per member)', perUnit: 25000, unit: 'member' },
      { id: 'sp3_3', category: '3.3. SPECIAL RECOGNITION FOR COMPLETING SERVICE HOURS (SP 3)', maxPoints: 15000, description: 'Completing 50+ Service hours (per member)', perUnit: 15000, unit: 'member' },

      // 3.4. DEDUCTIONS (SP 4)
      { id: 'sp4_1', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -100000, description: 'Failure on submission of Monthly Activity Report (per month)', perUnit: -100000, unit: 'month' },
      { id: 'sp4_2', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -100000, description: 'Failure on timely submission of Monthly Membership Report (per month)', perUnit: -100000, unit: 'month' },
      { id: 'sp4_3', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -100000, description: 'Failure on timely submission of Monthly Treasurer Report (per month)', perUnit: -100000, unit: 'month' },
      { id: 'sp4_4', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -20000, description: 'Failure on timely submission of Project Reports', perUnit: -20000, unit: 'report' },
      { id: 'sp4_5', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -100000, description: 'Failure on timely submission of Monthly Treasurer Report', perUnit: -100000, unit: 'submission' },
      { id: 'sp4_6', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -1000000, description: 'Consumption of Alcohol or any illegal drug during a Leo Events', perUnit: -1000000, unit: 'occurrence' },

      // 4.1. CULTURAL INITIATIVES & HERITAGE (CUL 1)
      { id: 'cul1_1', category: '4.1. CULTURAL INITIATIVES & HERITAGE (CUL 1)', maxPoints: 50000, description: 'Organizing a District or Club Cultural Showcase, Traditional Arts & Drama Festival', perUnit: 50000, unit: 'event' },
      { id: 'cul1_2', category: '4.1. CULTURAL INITIATIVES & HERITAGE (CUL 1)', maxPoints: 40000, description: 'Inter-Club Music, Dance, or Cultural Competition', perUnit: 40000, unit: 'competition' },
      { id: 'cul1_3', category: '4.1. CULTURAL INITIATIVES & HERITAGE (CUL 1)', maxPoints: 30000, description: 'Cultural Heritage Preservation & Community Arts Workshop', perUnit: 30000, unit: 'workshop' },
      { id: 'cul1_4', category: '4.1. CULTURAL INITIATIVES & HERITAGE (CUL 1)', maxPoints: 35000, description: 'International Cultural Exchange & Multilingual Youth Evening', perUnit: 35000, unit: 'exchange' },

      // 4.2. TECHNICAL INNOVATION & STEM OUTREACH (TECH 1)
      { id: 'tech1_1', category: '4.2. TECHNICAL INNOVATION & STEM OUTREACH (TECH 1)', maxPoints: 60000, description: 'Organizing a Hackathon, IT Innovation Challenge, or App Development Competition', perUnit: 60000, unit: 'hackathon' },
      { id: 'tech1_2', category: '4.2. TECHNICAL INNOVATION & STEM OUTREACH (TECH 1)', maxPoints: 40000, description: 'Conducting Tech Literacy, AI, Coding, or STEM Education Workshops', perUnit: 40000, unit: 'workshop' },
      { id: 'tech1_3', category: '4.2. TECHNICAL INNOVATION & STEM OUTREACH (TECH 1)', maxPoints: 50000, description: 'Technical Solution Deployment for Community Service (Website/App for NGO)', perUnit: 50000, unit: 'deployment' },
      { id: 'tech1_4', category: '4.2. TECHNICAL INNOVATION & STEM OUTREACH (TECH 1)', maxPoints: 45000, description: 'Digital Transformation & Technical Infrastructure Upgrades for Leo Portal/Clubs', perUnit: 45000, unit: 'project' }
    ],

    clubPoints: [
      { clubId: 'c6', points: {} },
      { clubId: 'c7', points: {} },
      { clubId: 'c8', points: {} },
      { clubId: 'c9', points: {} },
      { clubId: 'c10', points: {} },
      { clubId: 'c11', points: {} },
      { clubId: 'c12', points: {} },
      { clubId: 'c13', points: {} },
      { clubId: 'c14', points: {} },
      { clubId: 'c15', points: {} },
      { clubId: 'c16', points: {} },
      { clubId: 'c17', points: {} },
      { clubId: 'c18', points: {} },
      { clubId: 'c19', points: {} },
      { clubId: 'c20', points: {} },
      { clubId: 'c21', points: {} },
      { clubId: 'c22', points: {} },
      { clubId: 'c23', points: {} },
      { clubId: 'c24', points: {} },
      { clubId: 'c25', points: {} }
    ],
    memberPayments: [
      { id: 'mp1', eventId: 'e1', clubId: 'c6', memberId: 'm111', name: 'Leo Lion Sithuli Amunuthuduwa', amount: 1000, status: 'paid', date: '2026-06-05', method: 'Bank Transfer', reference: 'REF-M-101', registrationStatus: 'approved', paymentStatus: 'paid' },
      { id: 'mp2', eventId: 'e1', clubId: 'c6', memberId: 'm112', name: 'Leo Dinath Wijesooriya', amount: 1000, status: 'paid', date: '2026-06-06', method: 'Cash', reference: 'REF-M-102', registrationStatus: 'approved', paymentStatus: 'paid' },
      { id: 'mp3', eventId: 'e1', clubId: 'c6', memberId: 'm113', name: 'Leo Thimira Anjana', amount: 1000, status: 'pending', date: '2026-06-12', method: 'Bank Transfer', reference: 'REF-M-103', registrationStatus: 'pending', paymentStatus: 'unpaid' }
    ],
    clubPayments: [
      { id: 'cp1', eventId: 'e1', clubId: 'c6', amount: 3000, status: 'paid', date: '2026-06-12', method: 'Bank Deposit', reference: 'REF-DIST-101', receiptUrl: 'receipt_c6_e1.png', registeredCount: 3 }
    ],
    clubEventSettings: [
      { id: 'ces1', clubId: 'c6', eventId: 'e1', visibleToMembers: true },
      { id: 'ces2', clubId: 'c6', eventId: 'e2', visibleToMembers: true },
      { id: 'ces3', clubId: 'c6', eventId: 'e3', visibleToMembers: false },
      { id: 'ces4', clubId: 'c6', eventId: 'e4', visibleToMembers: true }
    ],
    invoices: [
      {
        id: 'inv1',
        invoiceNumber: 'INV-2026-001',
        clubId: 'c6',
        clubName: 'Leo Club of Informatics Institute of Technology',
        amount: 25800,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (86 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'paid',
        receiptUrl: 'receipt_c6_dues.png',
        reference: 'DEP-90801',
        remarks: 'Approved by District Treasurer',
        eventId: null
      },
      {
        id: 'inv4',
        invoiceNumber: 'INV-2026-004',
        clubId: 'c7',
        clubName: 'Leo Club of University of Colombo Faculty of Science',
        amount: 24600,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (82 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv5',
        invoiceNumber: 'INV-2026-005',
        clubId: 'c8',
        clubName: 'Leo Club of University of Colombo Faculty of Arts',
        amount: 39000,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (130 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'paid',
        receiptUrl: 'receipt_c8_dues.png',
        reference: 'DEP-70701',
        remarks: 'Approved by District Treasurer',
        eventId: null
      },
      {
        id: 'inv6',
        invoiceNumber: 'INV-2026-006',
        clubId: 'c9',
        clubName: 'Leo Club of Colombo (Host)',
        amount: 12000,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (40 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv7',
        invoiceNumber: 'INV-2026-007',
        clubId: 'c10',
        clubName: 'Leo Club of Colombo Millennium',
        amount: 6300,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (21 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'paid',
        receiptUrl: 'receipt_c10_dues.png',
        reference: 'DEP-80801',
        remarks: 'Approved by District Treasurer',
        eventId: null
      },
      {
        id: 'inv8',
        invoiceNumber: 'INV-2026-008',
        clubId: 'c11',
        clubName: 'Leo Club of Colombo Six New Stars',
        amount: 9300,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (31 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv9',
        invoiceNumber: 'INV-2026-009',
        clubId: 'c12',
        clubName: 'Leo Club of UOC Alumni',
        amount: 14400,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (48 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv10',
        invoiceNumber: 'INV-2026-010',
        clubId: 'c13',
        clubName: 'Leo Club of UOC FOA Alumni',
        amount: 14700,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (49 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'paid',
        receiptUrl: 'receipt_c13_dues.png',
        reference: 'DEP-90901',
        remarks: 'Approved by District Treasurer',
        eventId: null
      },
      {
        id: 'inv11',
        invoiceNumber: 'INV-2026-011',
        clubId: 'c14',
        clubName: 'Leo Club of Prince of Wales’ College',
        amount: 6750,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (27 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv12',
        invoiceNumber: 'INV-2026-012',
        clubId: 'c15',
        clubName: 'Leo Club of Princess of Wales’ College',
        amount: 11750,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (47 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv13',
        invoiceNumber: 'INV-2026-013',
        clubId: 'c16',
        clubName: 'Leo Club of Sri Sumangala College',
        amount: 3750,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (15 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv14',
        invoiceNumber: 'INV-2026-014',
        clubId: 'c17',
        clubName: 'Leo Club of Kalutara Vidyalaya',
        amount: 9750,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (39 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv15',
        invoiceNumber: 'INV-2026-015',
        clubId: 'c18',
        clubName: 'Leo Club of Kalutara Balika Vidyalaya',
        amount: 15750,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (63 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv16',
        invoiceNumber: 'INV-2026-016',
        clubId: 'c19',
        clubName: 'Leo Club of Moratuwa 2020',
        amount: 8400,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (28 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv17',
        invoiceNumber: 'INV-2026-017',
        clubId: 'c20',
        clubName: 'Leo Club of Royal Achievers',
        amount: 16800,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (56 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv18',
        invoiceNumber: 'INV-2026-018',
        clubId: 'c21',
        clubName: 'Leo Club of Moratuwa Ratmalana',
        amount: 20700,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (69 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv19',
        invoiceNumber: 'INV-2026-019',
        clubId: 'c22',
        clubName: 'Leo Club of Cosmopolitian Creators',
        amount: 5500,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (22 members @ Rs. 250)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv20',
        invoiceNumber: 'INV-2026-020',
        clubId: 'c23',
        clubName: 'Leo Club of Mount Lavinia Orient Centennial',
        amount: 8100,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (27 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv21',
        invoiceNumber: 'INV-2026-021',
        clubId: 'c24',
        clubName: 'Leo Club of Moratuwa',
        amount: 24300,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (81 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      },
      {
        id: 'inv22',
        invoiceNumber: 'INV-2026-022',
        clubId: 'c25',
        clubName: 'Leo Club of Kothalawala Defense University',
        amount: 36600,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (122 members @ Rs. 300)',
        category: 'Membership Fees',
        status: 'unpaid',
        receiptUrl: '',
        reference: '',
        remarks: '',
        eventId: null
      }
    ],
    invoiceTemplate: {
      fileName: 'clear_cultural_technical_template.html',
      uploadedAt: '2026-06-01'
    },
    districtProfile: {
      title: 'Leo District 306 D1',
      tagline: 'Serve with Passion, Lead with Integrity',
      description: 'Leo District 306 D1 Sri Lanka spans over a wide network of active Leo clubs in Colombo, Gampaha, and the North-Western province. We guide and empower young leaders to execute sustainable service projects that make a difference.',
      dg: 'Lion Samantha Perera PMJF',
      dp: 'Leo Lion Vinuk Thismalpola',
      ipdp: 'Leo Lion Yashika Nethmini',
      dvp: 'Leo Lion Manish Perera',
      leoChair: 'Lion Suranjani Wickramarathne',
      deputyLeoChair: 'Leo Lion Dilshan Pieris',
      ds: 'Leo Lion Hashini Nethmika',
      dt: 'Leo Lion Bathisha Kavinda',
      dmc: 'Leo Lion Sanduni Theekshana',
      goals: [
        { title: '1. Membership Growth & Retention', desc: 'Targeting 15% net membership growth and introducing leadership training modules to reduce drop-out rates.' },
        { title: '2. Environmental Stewardship', desc: 'Planting 5,000 trees district-wide and organizing coordinated beach cleanups in coastal areas.' },
        { title: '3. Joint Service Collaborations', desc: 'Encouraging clubs to partner on large-scale medical camps, computer literacy workshops, and library donation projects.' }
      ],
      council: {
        ipdp: 'Leo Lion Yashika Nethmini',
        advisor: 'Lion Suranjani Wickramarathne',
        coordinators: '7 Chief Coordinators & Editor',
        regions: '2 Region Directors (Region A & B)',
        zones: '4 Zone Directors (Zone A1, A2, B1, B2)'
      },
      officers: [
      {
            "order": 1,
            "role": "District President",
            "name": "Leo Lion Vinuk Thismalpola",
            "club": "Leo Club of University of Colombo Faculty of Science",
            "memberId": "6005220",
            "phone": "0765624434",
            "email": "vthismalpola@gmail.com",
            "address": "78/B, Ananda Balika Mawatha, Pitakotte",
            "dob": "18/09/2001",
            "category": "Executive Committee",
            "badge": "DP"
      },
      {
            "order": 2,
            "role": "Immediate Past District President",
            "name": "Leo Lion Yashika Nethmini",
            "club": "Leo Club of Mount Lavinia Orient Centennial",
            "memberId": "",
            "phone": "0769916688",
            "email": "yashi.nethmini@gmail.com",
            "address": "",
            "dob": "",
            "category": "Executive Committee",
            "badge": "IPDP"
      },
      {
            "order": 3,
            "role": "District Vice President",
            "name": "Leo Lion Manish Perera",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "6163565",
            "phone": "0774338308",
            "email": "manishperera0205@gmail.com",
            "address": "194, Udakanampella, Pugoda",
            "dob": "02/05/2002",
            "category": "Executive Committee",
            "badge": "DVP"
      },
      {
            "order": 4,
            "role": "District Leo Chairperson",
            "name": "Lion Suranjani Wickramarathne",
            "club": "Lions Club of Colombo Host",
            "memberId": "",
            "phone": "0777281750",
            "email": "suranjani567@yahoo.com",
            "address": "",
            "dob": "",
            "category": "Executive Committee",
            "badge": "DLC"
      },
      {
            "order": 5,
            "role": "Deputy Leo Chairperson",
            "name": "Leo Lion Dilshan Pieris",
            "club": "Lions Club of Moratuwa",
            "memberId": "",
            "phone": "",
            "email": "",
            "address": "",
            "dob": "",
            "category": "Executive Committee",
            "badge": "Deputy DLC"
      },
      {
            "order": 6,
            "role": "District Secretary",
            "name": "Leo Lion Hashini Nethmika",
            "club": "Leo Club of University of Colombo Faculty of Arts",
            "memberId": "6270352",
            "phone": "0752770922",
            "email": "nethmikahashini64@gmail.com",
            "address": "",
            "dob": "06/09/2002",
            "category": "Executive Committee",
            "badge": "DS"
      },
      {
            "order": 7,
            "role": "District Treasurer",
            "name": "Leo Lion Bathisha Kavinda",
            "club": "Leo Club of University of Colombo Faculty of Science",
            "memberId": "6196553",
            "phone": "0703593154",
            "email": "iambathisha@gmail.com",
            "address": "344/H, Batagama north, jaela",
            "dob": "20/11/2001",
            "category": "Executive Committee",
            "badge": "DT"
      },
      {
            "order": 8,
            "role": "District Membership Chairperson",
            "name": "Leo Lion Sanduni Theekshana",
            "club": "Leo Club of Colombo (Host)",
            "memberId": "5727258",
            "phone": "0758650060",
            "email": "leo.sandunitheekshana@gmail.com",
            "address": "294/C, Mulleriyawa North, Angoda.",
            "dob": "21/06/1999",
            "category": "Executive Committee",
            "badge": "DMC"
      },
      {
            "order": 9,
            "role": "District Assistant Secretary",
            "name": "Leo Lion Prabhavee Mayasha",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "6208905",
            "phone": "0770045416",
            "email": "prabhaveemayasha2002@gmail.com",
            "address": "251/1/A, Moratuwa Road, Suwarapola, Piliyandala",
            "dob": "28/12/2002",
            "category": "Executive Committee",
            "badge": "DAS"
      },
      {
            "order": 10,
            "role": "District Assistant Secretary",
            "name": "Leo Dulari Christoper",
            "club": "Leo Club of UOC Alumni",
            "memberId": "5379433",
            "phone": "0719933330",
            "email": "christopherdulari@gmail.com",
            "address": "96, Vystwyke rd, Colombo 15",
            "dob": "07/12/1998",
            "category": "Executive Committee",
            "badge": "DAS"
      },
      {
            "order": 11,
            "role": "District Assistant Treasurer",
            "name": "Leo Lion Chamal Pramod",
            "club": "Leo Club of Moratuwa",
            "memberId": "6012135",
            "phone": "0711952062",
            "email": "chamalps21@gmail.com",
            "address": "365/65, Wimalarathana rd, Kudaarukgoda, Alubomulla",
            "dob": "21/04/1996",
            "category": "Executive Committee",
            "badge": "DAT"
      },
      {
            "order": 12,
            "role": "District Assistant Treasurer",
            "name": "Leo Oshada Tharusha",
            "club": "Leo Club of Mount Lavinia Orient Centennial",
            "memberId": "6394323",
            "phone": "0707032981",
            "email": "oshadhatharusha1@gmail.com",
            "address": "102/11, Udapeekwalla rd, Maddawatta, Matara.",
            "dob": "17/05/2005",
            "category": "Executive Committee",
            "badge": "DAT"
      },
      {
            "order": 13,
            "role": "Chief Council Coordinator",
            "name": "Leo Lion Randiv De Silva",
            "club": "Leo Club of Moratuwa 2020",
            "memberId": "6350895",
            "phone": "0767658129",
            "email": "Sanuth.desilva@gmail.com",
            "address": "116/5, Justin Dias Mawatha, Egodauyana, Moratuwa",
            "dob": "25/06/2004",
            "category": "Chief Coordinators & Editor",
            "badge": "CCC"
      },
      {
            "order": 14,
            "role": "Chief Regional Coordinator",
            "name": "Leo Lion Kasun Sapumohotti",
            "club": "Leo Club of Moratuwa",
            "memberId": "6047384",
            "phone": "0779935395",
            "email": "kasunsapumohotti30@gmail.com",
            "address": "No.05, Nadun Uyana, Andugoda, Dikkumbura, Galle",
            "dob": "29/02/2000",
            "category": "Chief Coordinators & Editor",
            "badge": "CRC"
      },
      {
            "order": 15,
            "role": "Chief Operational Coordinator",
            "name": "Leo Kulindu Thenuka Bopage",
            "club": "Leo Club of Royal Achievers",
            "memberId": "",
            "phone": "0715289759",
            "email": "kulinduthenuka.lcra@gmail.com",
            "address": "\"Randi\", Malegoda, Payagala",
            "dob": "12/12/2000",
            "category": "Chief Coordinators & Editor",
            "badge": "COC"
      },
      {
            "order": 16,
            "role": "Chief Performance Coordinator",
            "name": "Leo Lion Savidya Ranawaka",
            "club": "Leo Club of University of Colombo Faculty of Science",
            "memberId": "26815475",
            "phone": "0777644824",
            "email": "savidyaranawaka17@gmail.com",
            "address": "282/B, Lumbini Place, Thalawathugoda",
            "dob": "17/06/2002",
            "category": "Chief Coordinators & Editor",
            "badge": "CPC"
      },
      {
            "order": 17,
            "role": "Chief IT and Strategic Coordinator",
            "name": "Leo Lion Senuth Wanniarachchi",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "26866603",
            "phone": "0774158788",
            "email": "senuthdilnadarox@gmail.com",
            "address": "No 4-B, Maitipe 2nd Lane, Galle",
            "dob": "20/10/2006",
            "category": "Chief Coordinators & Editor",
            "badge": "CITSC"
      },
      {
            "order": 18,
            "role": "Chief PR and Branding Coordinator",
            "name": "Leo Lion Dinath Wijesooriya",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "26761326",
            "phone": "0761087967",
            "email": "dinathwijesooriya@gmail.com",
            "address": "38/6A Wekunagoda Road, Galle",
            "dob": "13/08/2003",
            "category": "Chief Coordinators & Editor",
            "badge": "CPRBC"
      },
      {
            "order": 19,
            "role": "Chief Editor",
            "name": "Leo Lion Uvini Imalna",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "27194977",
            "phone": "0743423494",
            "email": "uviniwa1123@gmail.com",
            "address": "No:38, Kingscourt, Thalpawila, Kekanadura, Matara",
            "dob": "23/11/2007",
            "category": "Chief Coordinators & Editor",
            "badge": "CE"
      },
      {
            "order": 20,
            "role": "Regional Director - Region A",
            "name": "Leo Dewmi Tharunya",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "26866618",
            "phone": "0770538457",
            "email": "dewmitharunya2@gmail.com",
            "address": "\"Damruk\", Walahanduwa, Galle",
            "dob": "24/10/2006",
            "category": "Regional & Zonal Leadership",
            "badge": "RD-A"
      },
      {
            "order": 21,
            "role": "Regional Director - Region B",
            "name": "Leo Hiruni Fernando",
            "club": "Leo Club of Colombo (Host)",
            "memberId": "5577538",
            "phone": "0719267661",
            "email": "hirufernando26@gmail.com",
            "address": "\"Aneeta\", Jude Road, Diyalagoda, Maggona",
            "dob": "11/06/1998",
            "category": "Regional & Zonal Leadership",
            "badge": "RD-B"
      },
      {
            "order": 22,
            "role": "Zonal Director - Zone A1",
            "name": "Leo Nadeesha Mayomi Ekanayaka",
            "club": "Leo Club of University of Colombo Faculty of Arts",
            "memberId": "26867439",
            "phone": "0781895516",
            "email": "mayomiekanayaka2002@gmail.com",
            "address": "Behind the Fair Road, Galapitiyagama, Nikaweratiya",
            "dob": "04/03/2002",
            "category": "Regional & Zonal Leadership",
            "badge": "ZD-A1"
      },
      {
            "order": 23,
            "role": "Zonal Director - Zone A2",
            "name": "Leo Lion Udara Nawarathna",
            "club": "Leo Club of University of Colombo Faculty of Science",
            "memberId": "6260655",
            "phone": "0776952731",
            "email": "udaran92@gmail.com",
            "address": "No.90/1, Nagolla Road, Kegalle",
            "dob": "14/01/2003",
            "category": "Regional & Zonal Leadership",
            "badge": "ZD-A2"
      },
      {
            "order": 24,
            "role": "Zonal Director - Zone B1",
            "name": "Leo Vihanga Kothalawala",
            "club": "Leo Club of Moratuwa",
            "memberId": "27033559",
            "phone": "0741612668",
            "email": "vihangakothalawsla@gmail.com",
            "address": "No.08, 1st Lane, Rawathawaththa, Moratuwa.",
            "dob": "06/09/2004",
            "category": "Regional & Zonal Leadership",
            "badge": "ZD-B1"
      },
      {
            "order": 25,
            "role": "Zonal Director - Zone B2",
            "name": "Leo Meuni Liyanage",
            "club": "Leo Club of Kalutara Balika Vidyalaya",
            "memberId": "6219400",
            "phone": "0741140564",
            "email": "meuniliyanage726@gmail.com",
            "address": "\"Kalhari\", Bombuwala, Kalutara",
            "dob": "26/07/2007",
            "category": "Regional & Zonal Leadership",
            "badge": "ZD-B2"
      },
      {
            "order": 26,
            "role": "Co-Head - District Service Committee",
            "name": "Leo Sudam Jayawardana",
            "club": "Leo Club of Mount Lavinia Orient Centennial",
            "memberId": "6005154",
            "phone": "0771646116",
            "email": "sudamjayawardana06@gmail.com",
            "address": "156/5G, 6th lane, Weragala place, Thalawathugoda",
            "dob": "06/11/2000",
            "category": "District Committee Leadership",
            "badge": "DSC"
      },
      {
            "order": 27,
            "role": "Co-Head - District Service Committee",
            "name": "Leo Treveen Rozairo",
            "club": "Leo Club of Prince of Wales College",
            "memberId": "26935999",
            "phone": "0705631777",
            "email": "treveenrozairo500@gmail.com",
            "address": "16/A, 5th Lane, Rawathawatta, Moratuwa",
            "dob": "10/07/2007",
            "category": "District Committee Leadership",
            "badge": "DSC"
      },
      {
            "order": 28,
            "role": "Head - District Talent Committee",
            "name": "Leo Lion Thenuji Jayakody",
            "club": "Leo Club of Princess of Wales College",
            "memberId": "27005837",
            "phone": "0702901180",
            "email": "thenujijayakody@gmail.com",
            "address": "28/3/1, Gangaboda Road, Wewala, Piliyandala",
            "dob": "05/08/2008",
            "category": "District Committee Leadership",
            "badge": "DTC"
      },
      {
            "order": 29,
            "role": "Head - District Sports Committee",
            "name": "Leo Lithira Kalubowila",
            "club": "Leo Club of UOC Alumni",
            "memberId": "27154893",
            "phone": "0710495670",
            "email": "lithiratk@gmail.com",
            "address": "7/2, Temple road, Kalutara north",
            "dob": "31/05/2007",
            "category": "District Committee Leadership",
            "badge": "DSC"
      },
      {
            "order": 30,
            "role": "Head - IT and Infastructure Committee",
            "name": "Leo Buddika Ashan",
            "club": "Leo Club of Colombo (Host)",
            "memberId": "27202047",
            "phone": "0788861811",
            "email": "BuddikaAshanSilva@Hotmail.com",
            "address": "36/13, Vijayaraja MW, Nadimala, Dehiwala",
            "dob": "18/05/2003",
            "category": "District Committee Leadership",
            "badge": "ITC"
      },
      {
            "order": 31,
            "role": "Head - PR Committee",
            "name": "Leo Lion Deveen Rathnayaka",
            "club": "Leo Club of Informatics Institute of Technology (IIT)",
            "memberId": "",
            "phone": "",
            "email": "",
            "address": "",
            "dob": "",
            "category": "District Committee Leadership",
            "badge": "PRC"
      }
]
    },
    mdProfile: {
      title: 'Leo Multiple District 306',
      subtitle: 'National administrative structure and Multiple District Council coordinates',
      description: 'Leo Multiple District 306 Sri Lanka unites twelve individual sub-districts under one unified council. It is led by the Multiple District President and coordinates nationwide community campaigns, youth leadership development, and inter-district cooperation.',
      councilChairperson: 'Leo Nisal Dulmith FLM',
      sponsoringLionChairperson: 'Lion Dr. Lasantha Goonewardene',
      activeDistricts: '12 Districts (D1 – D12)',
      totalMembers: '8,500+ Leos',
      secretariat: 'Lions Activity Center, No 41, Albert Crescent, Colombo 07.',
      email: 'md306@leosrilanka.org',
      web: 'www.leosrilanka.org',
      publications: '"The Sri Lankan Leo" Magazine — published quarterly celebrating club service achievements nationwide.',
      officers: [
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
      ]
    },
    pointsSubmissions: [],
    projectCategorySubmissions: [
      {
        id: "pcs_1",
        clubId: "c6",
        clubName: "Leo Club of Informatics Institute of Technology",
        month: "2026-07",
        status: "approved",
        submittedAt: "2026-07-28T15:45:00Z",
        submittedBy: "Leo Lion Manish Perera",
        subClaims: {
          cat_1_sub_1: { ticked: true, proofs: [{ name: "MyLion_Activity_Report_Jul26.pdf", type: "application/pdf", size: "1.2 MB", url: "#" }] },
          cat_1_sub_2: { ticked: true, proofs: [{ name: "Children_Attendance_Register.jpg", type: "image/jpeg", size: "840 KB", url: "#" }] },
          cat_1_sub_3: { ticked: true, proofs: [{ name: "Storytelling_Reading_Corner_Photos.pdf", type: "application/pdf", size: "2.4 MB", url: "#" }] },
          cat_3_sub_1: { ticked: true, proofs: [{ name: "MyLion_Nutrition_Camp.pdf", type: "application/pdf", size: "1.2 MB", url: "#" }] },
          cat_3_sub_2: { ticked: true, proofs: [{ name: "Food_Safety_Awareness.pdf", type: "application/pdf", size: "1.4 MB", url: "#" }] },
          cat_5_sub_1: { ticked: true, proofs: [{ name: "MyLion_Sports_Cricket.pdf", type: "application/pdf", size: "980 KB", url: "#" }] },
          cat_5_sub_2: { ticked: true, proofs: [{ name: "Sports_Kit_Distribution.jpg", type: "image/jpeg", size: "1.6 MB", url: "#" }] },
          cat_8_sub_1: { ticked: true, proofs: [{ name: "MyLion_PR_July.pdf", type: "application/pdf", size: "750 KB", url: "#" }] },
          cat_8_sub_2: { ticked: true, proofs: [{ name: "Branding_Media_Reach.pdf", type: "application/pdf", size: "1.1 MB", url: "#" }] },
          cat_9_sub_1: { ticked: true, proofs: [{ name: "MyLion_Fundraiser_Log.pdf", type: "application/pdf", size: "900 KB", url: "#" }] },
          cat_9_sub_2: { ticked: true, proofs: [{ name: "Audited_Accounts_Ledger.pdf", type: "application/pdf", size: "1.8 MB", url: "#" }] },
          cat_25_sub_1: { ticked: true, proofs: [{ name: "Serving_Together_Banner_Patch.jpg", type: "image/jpeg", size: "1.5 MB", url: "#" }] },
          cat_25_sub_2: { ticked: true, proofs: [{ name: "Lions_Club_Confirmation_Letter.pdf", type: "application/pdf", size: "800 KB", url: "#" }] },
          cat_28_sub_1: { ticked: true, proofs: [{ name: "MyLion_IntraDistrict_Joint.pdf", type: "application/pdf", size: "1.1 MB", url: "#" }] },
          cat_28_sub_2: { ticked: true, proofs: [{ name: "IntraDistrict_Hosting_Letter.pdf", type: "application/pdf", size: "850 KB", url: "#" }] },
          cat_31_sub_1: { ticked: true, proofs: [{ name: "MyLion_Diabetes_Camp.pdf", type: "application/pdf", size: "1.1 MB", url: "#" }] },
          cat_31_sub_2: { ticked: true, proofs: [{ name: "Diabetes_Screening_Photos.jpg", type: "image/jpeg", size: "1.9 MB", url: "#" }] },
          cat_32_sub_1: { ticked: true, proofs: [{ name: "MyLion_Environment_Reforest.pdf", type: "application/pdf", size: "1.4 MB", url: "#" }] },
          cat_32_sub_2: { ticked: true, proofs: [{ name: "Tree_Planting_GPS_Log.pdf", type: "application/pdf", size: "2.1 MB", url: "#" }] },
          cat_36_sub_1: { ticked: true, proofs: [{ name: "MyLion_Youth_Tech_Summit.pdf", type: "application/pdf", size: "2.1 MB", url: "#" }] },
          cat_36_sub_2: { ticked: true, proofs: [{ name: "Coding_Bootcamp_Attendance.pdf", type: "application/pdf", size: "1.5 MB", url: "#" }] }
        },
        completedCategories: [
          { categoryId: "cat_1", categoryNumber: 1, categoryName: "Best Project for Spotlight on Children", groupId: "project_awards" },
          { categoryId: "cat_3", categoryNumber: 3, categoryName: "Best Project for Health, Nutrition & Food Safety", groupId: "project_awards" },
          { categoryId: "cat_5", categoryNumber: 5, categoryName: "Best Project for Sports & Recreation", groupId: "project_awards" },
          { categoryId: "cat_8", categoryNumber: 8, categoryName: "Best Project for Public Relations", groupId: "project_awards" },
          { categoryId: "cat_9", categoryNumber: 9, categoryName: "Best Project for Fundraiser", groupId: "project_awards" },
          { categoryId: "cat_25", categoryNumber: 25, categoryName: "Best Serving Together Project", groupId: "joint_project_awards" },
          { categoryId: "cat_28", categoryNumber: 28, categoryName: "Best Joint Intra-District Project", groupId: "joint_project_awards" },
          { categoryId: "cat_31", categoryNumber: 31, categoryName: "Best Project for Diabetes", groupId: "lions_global_service" },
          { categoryId: "cat_32", categoryNumber: 32, categoryName: "Best Project for the Environment", groupId: "lions_global_service" },
          { categoryId: "cat_36", categoryNumber: 36, categoryName: "Best Project for Youth", groupId: "lions_global_service" }
        ],
        completedCount: 10,
        totalPossible: 37
      },
      {
        id: "pcs_2",
        clubId: "c7",
        clubName: "Leo Club of University of Colombo Faculty of Science",
        month: "2026-07",
        status: "approved",
        submittedAt: "2026-07-28T14:30:00Z",
        submittedBy: "Leo Lion G.D Thevindu Nirmitha",
        subClaims: {
          cat_2_sub_1: { ticked: true, proofs: [{ name: "MyLion_WasteMgmt_Report.pdf", type: "application/pdf", size: "1.1 MB", url: "#" }] },
          cat_2_sub_2: { ticked: true, proofs: [{ name: "Recycling_Drive_Receipts.pdf", type: "application/pdf", size: "890 KB", url: "#" }] },
          cat_10_sub_1: { ticked: true, proofs: [{ name: "MyLion_Education_Report.pdf", type: "application/pdf", size: "1.3 MB", url: "#" }] },
          cat_10_sub_2: { ticked: true, proofs: [{ name: "School_SmartClassroom_Handover.pdf", type: "application/pdf", size: "2.0 MB", url: "#" }] },
          cat_16_sub_1: { ticked: true, proofs: [{ name: "MyLion_RnD_Project.pdf", type: "application/pdf", size: "2.5 MB", url: "#" }] },
          cat_16_sub_2: { ticked: true, proofs: [{ name: "Water_Quality_Analysis_Data.pdf", type: "application/pdf", size: "3.1 MB", url: "#" }] },
          cat_26_sub_1: { ticked: true, proofs: [{ name: "MyLion_NGO_Joint.pdf", type: "application/pdf", size: "1.0 MB", url: "#" }] },
          cat_26_sub_2: { ticked: true, proofs: [{ name: "Rotaract_Partner_MOU.pdf", type: "application/pdf", size: "1.2 MB", url: "#" }] },
          cat_33_sub_1: { ticked: true, proofs: [{ name: "MyLion_Hunger_Relief.pdf", type: "application/pdf", size: "950 KB", url: "#" }] },
          cat_33_sub_2: { ticked: true, proofs: [{ name: "Community_Kitchen_Photos.jpg", type: "image/jpeg", size: "1.7 MB", url: "#" }] },
          cat_35_sub_1: { ticked: true, proofs: [{ name: "MyLion_Eye_Screening.pdf", type: "application/pdf", size: "1.3 MB", url: "#" }] },
          cat_35_sub_2: { ticked: true, proofs: [{ name: "National_Eye_Bank_Collaboration.pdf", type: "application/pdf", size: "1.8 MB", url: "#" }] }
        },
        completedCategories: [
          { categoryId: "cat_2", categoryNumber: 2, categoryName: "Best Project for Responsible Consumption & Waste Management", groupId: "project_awards" },
          { categoryId: "cat_10", categoryNumber: 10, categoryName: "Best Project for Quality Education & Literacy", groupId: "project_awards" },
          { categoryId: "cat_16", categoryNumber: 16, categoryName: "Best Project for Research & Development", groupId: "project_awards" },
          { categoryId: "cat_26", categoryNumber: 26, categoryName: "Best Joint Project with a Non-Leo/Outside Organisation", groupId: "joint_project_awards" },
          { categoryId: "cat_33", categoryNumber: 33, categoryName: "Best Project for Hunger", groupId: "lions_global_service" },
          { categoryId: "cat_35", categoryNumber: 35, categoryName: "Best Project for Vision", groupId: "lions_global_service" }
        ],
        completedCount: 6,
        totalPossible: 37
      },
      {
        id: "pcs_3",
        clubId: "c8",
        clubName: "Leo Club of University of Colombo Faculty of Arts",
        month: "2026-07",
        status: "approved",
        submittedAt: "2026-07-29T10:15:00Z",
        submittedBy: "Leo Lion Hashini Nethmika",
        subClaims: {
          cat_4_sub_1: { ticked: true, proofs: [{ name: "MyLion_Cultural_Festival.pdf", type: "application/pdf", size: "1.6 MB", url: "#" }] },
          cat_4_sub_2: { ticked: true, proofs: [{ name: "InterCultural_Dialogue_Cert.pdf", type: "application/pdf", size: "900 KB", url: "#" }] },
          cat_11_sub_1: { ticked: true, proofs: [{ name: "MyLion_WomenEmpowerment.pdf", type: "application/pdf", size: "1.2 MB", url: "#" }] },
          cat_11_sub_2: { ticked: true, proofs: [{ name: "Sanitary_Hygiene_Dist_Photos.jpg", type: "image/jpeg", size: "1.4 MB", url: "#" }] },
          cat_27_sub_1: { ticked: true, proofs: [{ name: "MyLion_InterDistrict_Report.pdf", type: "application/pdf", size: "1.5 MB", url: "#" }] },
          cat_27_sub_2: { ticked: true, proofs: [{ name: "MD306_InterDistrict_Approval.pdf", type: "application/pdf", size: "1.1 MB", url: "#" }] },
          cat_34_sub_1: { ticked: true, proofs: [{ name: "MyLion_Childhood_Cancer.pdf", type: "application/pdf", size: "1.0 MB", url: "#" }] },
          cat_34_sub_2: { ticked: true, proofs: [{ name: "Apeksha_Hospital_Donation.pdf", type: "application/pdf", size: "2.3 MB", url: "#" }] }
        },
        completedCategories: [
          { categoryId: "cat_4", categoryNumber: 4, categoryName: "Best Project for Peace & Cultural Activities", groupId: "project_awards" },
          { categoryId: "cat_11", categoryNumber: 11, categoryName: "Best Project for Women Empowerment", groupId: "project_awards" },
          { categoryId: "cat_27", categoryNumber: 27, categoryName: "Best Joint Inter-District Project", groupId: "joint_project_awards" },
          { categoryId: "cat_34", categoryNumber: 34, categoryName: "Best Project for Childhood Cancer", groupId: "lions_global_service" }
        ],
        completedCount: 4,
        totalPossible: 37
      }
    ],
    districtSchedules: [
      {
        id: 'ds1',
        title: 'District President Official Visit — Leo Club of Informatics Institute of Technology',
        date: '2026-06-20',
        time: '10:00 AM',
        executive: 'District President',
        description: 'Official club visit, meeting with the board of directors, and project review.',
        type: 'visit'
      },
      {
        id: 'ds2',
        title: 'District Council Meeting & Leadership Workshop',
        date: '2026-06-25',
        time: '09:00 AM',
        executive: 'District Executive Committee',
        description: 'First district council meeting followed by a leadership seminar for club officers.',
        type: 'meeting'
      },
      {
        id: 'ds3',
        title: 'Charter Ceremony — Leo Club of Moratuwa 2020',
        date: '2026-07-02',
        time: '06:00 PM',
        executive: 'District President & Vice President',
        description: 'Inaugural charter ceremony and induction of new members.',
        type: 'ceremony'
      }
    ],
    membershipHistory: [
      {
        date: '2026-07-01',
        label: 'July 2026 (1 July)',
        shortLabel: '1 Jul 2026',
        month: '2026-07',
        totalMembers: 922,
        countsByClub: {
          c9: 32, c10: 21, c11: 31, c7: 50, c22: 33, c6: 27, c18: 78, c17: 29, c25: 139,
          c24: 31, c19: 35, c21: 57, c23: 45, c14: 23, c15: 39, c20: 68, c16: 43, c8: 76,
          c12: 17, c13: 48
        }
      },
      {
        date: '2026-08-09',
        label: 'August 2026 (9 August)',
        shortLabel: '9 Aug 2026',
        month: '2026-08',
        totalMembers: 801,
        countsByClub: {
          c9: 32, c10: 21, c11: 31, c7: 60, c22: 33, c6: 58, c18: 35, c17: 29, c25: 21,
          c24: 33, c19: 36, c21: 58, c23: 43, c14: 23, c15: 38, c20: 68, c16: 43, c8: 50,
          c12: 40, c13: 49
        }
      },
      {
        date: '2026-09-01',
        label: 'September 2026 (1 September)',
        shortLabel: '1 Sep 2026',
        month: '2026-09-01',
        totalMembers: 772,
        countsByClub: {
          c9: 32, c10: 24, c11: 31, c7: 64, c22: 18, c6: 60, c18: 33, c17: 29, c25: 21,
          c24: 37, c19: 37, c21: 58, c23: 36, c14: 23, c15: 38, c20: 49, c16: 43, c8: 50,
          c12: 40, c13: 49
        }
      },
      {
        date: '2026-09-30',
        label: 'September 2026 (30 September)',
        shortLabel: '30 Sep 2026',
        month: '2026-09-30',
        totalMembers: 799,
        countsByClub: {
          c9: 32, c10: 21, c11: 31, c7: 65, c22: 18, c6: 72, c18: 34, c17: 29, c25: 31,
          c24: 37, c19: 28, c21: 58, c23: 36, c14: 23, c15: 38, c20: 48, c16: 44, c8: 65,
          c12: 40, c13: 49
        }
      },
      {
        date: '2026-10-31',
        label: 'October 2026 (31 October)',
        shortLabel: '31 Oct 2026',
        month: '2026-10',
        totalMembers: 1083,
        countsByClub: {
          c9: 40, c10: 21, c11: 31, c7: 82, c22: 22, c6: 86, c18: 63, c17: 39, c25: 122,
          c24: 81, c19: 28, c21: 69, c23: 27, c14: 27, c15: 47, c20: 56, c16: 15, c8: 130,
          c12: 48, c13: 49
        }
      }
    ]
  };

  return data;
}

// ---------- Store Class ----------
class Store {
  constructor() {
    this._listeners = {};
    this._data = null;
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this._data = JSON.parse(raw);
        if (this._data.membership_version !== '2026_membership_v1' || this._data.clubOfficers_version !== '2026_club_officers_v2' || this._data.projects_version !== '2026_projects_v1') {
          const fresh = getDefaultData();
          this._data.clubs = fresh.clubs;
          this._data.membershipHistory = fresh.membershipHistory;
          this._data.members = fresh.members;
          this._data.finances = fresh.finances;
          this._data.projects = fresh.projects;
          this._data.events = fresh.events;
          this._data.announcements = fresh.announcements;
          this._data.clubPoints = fresh.clubPoints;
          this._data.memberPayments = fresh.memberPayments;
          this._data.clubPayments = fresh.clubPayments;
          this._data.clubEventSettings = fresh.clubEventSettings;
          this._data.invoices = fresh.invoices;
          this._data.pointsSubmissions = fresh.pointsSubmissions;
          this._data.projectCategorySubmissions = fresh.projectCategorySubmissions;
          if (this._data.districtProfile) {
            this._data.districtProfile.title = 'Leo District 306 D1';
            this._data.districtProfile.description = fresh.districtProfile.description;
          }
          this._data.clubOfficers_version = '2026_club_officers_v2';
          this._data.membership_version = '2026_membership_v1';
          this._data.projects_version = '2026_projects_v1';
          this.save();
        }

        // Explicitly purge any remaining mock clubs c1-c5 and associated data
        const mockClubIds = ['c1', 'c2', 'c3', 'c4', 'c5'];
        if (this._data.clubs && this._data.clubs.some(c => mockClubIds.includes(c.id))) {
          this._data.clubs = this._data.clubs.filter(c => !mockClubIds.includes(c.id));
          if (this._data.members) this._data.members = this._data.members.filter(m => !mockClubIds.includes(m.clubId));
          if (this._data.finances) this._data.finances = this._data.finances.filter(f => !mockClubIds.includes(f.clubId));
          if (this._data.projects) this._data.projects = this._data.projects.filter(p => !mockClubIds.includes(p.clubId));
          if (this._data.clubPoints) this._data.clubPoints = this._data.clubPoints.filter(cp => !mockClubIds.includes(cp.clubId));
          if (this._data.invoices) this._data.invoices = this._data.invoices.filter(inv => !mockClubIds.includes(inv.clubId));
          if (this._data.memberPayments) this._data.memberPayments = this._data.memberPayments.filter(mp => !mockClubIds.includes(mp.clubId));
          if (this._data.clubPayments) this._data.clubPayments = this._data.clubPayments.filter(cp => !mockClubIds.includes(cp.clubId));
          if (this._data.clubEventSettings) this._data.clubEventSettings = this._data.clubEventSettings.filter(ces => !mockClubIds.includes(ces.clubId));
          if (this._data.pointsSubmissions) this._data.pointsSubmissions = this._data.pointsSubmissions.filter(ps => !mockClubIds.includes(ps.clubId));
          if (this._data.projectCategorySubmissions) this._data.projectCategorySubmissions = this._data.projectCategorySubmissions.filter(pcs => !mockClubIds.includes(pcs.clubId));
          this.save();
        }
        // Ensure new collections exist in case of upgrade
        if (!this._data.memberPayments) {
          const fresh = getDefaultData();
          this._data.memberPayments = fresh.memberPayments;
          this._data.clubPayments = fresh.clubPayments;
          this._data.clubEventSettings = fresh.clubEventSettings;
          // also merge or overwrite finances to include district ones
          this._data.finances = fresh.finances;
          this.save();
        }
        if (!this._data.usersRemovedExceptAdmin) {
          const fresh = getDefaultData();
          this._data.users = fresh.users;
          this._data.usersRemovedExceptAdmin = true;
          this.save();
        }
        // Update admin user to "Leo Lion Dinath Wijesooriya" and avatar to "LD"
        const adminUser = (this._data.users || []).find(u => u.email === 'admin@leo.org');
        if (adminUser && (adminUser.name === 'Admin' || adminUser.name !== 'Leo Lion Dinath Wijesooriya' || adminUser.avatar !== 'LD')) {
          adminUser.name = 'Leo Lion Dinath Wijesooriya';
          adminUser.avatar = 'LD';
          this.save();
        }

        // Ensure new seed logins exist in local storage users collection
        const requiredUsers = [
          { id: 'u2', email: 'president.d1@leo.org', password: 'vinuk123', name: 'Leo Lion Vinuk Thismalpola', role: 'district_president', clubId: null, avatar: 'VT', createdAt: '2026-06-18' },
          { id: 'u3', email: 'vicepresident.d1@leo.org', password: 'manish123', name: 'Leo Lion Manish Perera', role: 'district_vp', clubId: null, avatar: 'MP', createdAt: '2026-06-18' },
          { id: 'u4', email: 'sec.d1@leo.org', password: 'hashini123', name: 'Leo Hashini Nethmika', role: 'district_secretary', clubId: null, avatar: 'HN', createdAt: '2026-06-18' },
          { id: 'u5', email: 'treasurer.d1@leo.org', password: 'bathisha123', name: 'Leo Bathisha Kavinda', role: 'district_treasurer', clubId: null, avatar: 'BK', createdAt: '2026-06-18' },
          { id: 'u6', email: 'admin.d1@leo.org', password: 'senuth123', name: 'Leo Lion Senuth Dilnada', role: 'district_admin', clubId: null, avatar: 'SD', createdAt: '2026-06-18' },
          { id: 'u7', email: 'president.iit@leo.org', password: 'sithuli123', name: 'Leo Lion Sithuli Amunuthuduwa', role: 'club_president', clubId: 'c6', avatar: 'SA', createdAt: '2026-06-18' },
          { id: 'u8', email: 'asstsec.d1@leo.org', password: 'prabhavee123', name: 'Leo Lion Prabhavee Mayasha', role: 'district_assistant_secretary', clubId: null, avatar: 'PM', createdAt: '2026-06-18' },
          { id: 'u9', email: 'assttreasurer.d1@leo.org', password: 'chamal123', name: 'Leo Lion Chamal Pramod', role: 'district_assistant_treasurer', clubId: null, avatar: 'CP', createdAt: '2026-06-18' },
          { id: 'u10', email: 'membership.d1@leo.org', altEmail: 'leo.sandunitheekshana@gmail.com', password: 'sanduni123', name: 'Leo Lion Sanduni Theekshana', role: 'district_membership', clubId: null, avatar: 'ST', phone: '0758650060', memberId: '5727258', createdAt: '2026-06-18' }
        ];
        let usersUpdated = false;
        if (!this._data.users) this._data.users = [];
        requiredUsers.forEach(ru => {
          if (!this._data.users.some(u => u.email === ru.email)) {
            this._data.users.push(ru);
            usersUpdated = true;
          } else {
            // Also ensure password/name/role/clubId/avatar matches just in case they changed or need update
            const existingUser = this._data.users.find(u => u.email === ru.email);
            if (existingUser) {
              let updated = false;
              if (existingUser.password !== ru.password) {
                existingUser.password = ru.password;
                updated = true;
              }
              if (existingUser.name !== ru.name) {
                existingUser.name = ru.name;
                updated = true;
              }
              if (existingUser.role !== ru.role) {
                existingUser.role = ru.role;
                updated = true;
              }
              if (existingUser.clubId !== ru.clubId) {
                existingUser.clubId = ru.clubId;
                updated = true;
              }
              if (existingUser.avatar !== ru.avatar) {
                existingUser.avatar = ru.avatar;
                updated = true;
              }
              if (updated) {
                usersUpdated = true;
              }
            }
          }
        });
        if (usersUpdated) {
          this.save();
        }

        if (!this._data.invoices) {
          const fresh = getDefaultData();
          this._data.invoices = fresh.invoices;
          this.save();
        }

        // Migrate legacy member event payments to include registrationStatus and paymentStatus
        if (this._data.memberPayments) {
          let updated = false;
          this._data.memberPayments.forEach(mp => {
            if (!mp.registrationStatus) {
              mp.registrationStatus = mp.status === 'paid' ? 'approved' : 'pending';
              updated = true;
            }
            if (!mp.paymentStatus) {
              mp.paymentStatus = mp.status === 'paid' ? 'paid' : 'unpaid';
              updated = true;
            }
          });
          if (updated) {
            this.save();
          }
        }
        if (!this._data.invoiceTemplate) {
          this._data.invoiceTemplate = {
            fileName: 'default_district_invoice_template.html',
            uploadedAt: '2026-06-01'
          };
          this.save();
        }
        if (!this._data.districtProfile || !Array.isArray(this._data.districtProfile.officers) || this._data.districtProfile.officers.length < 31 || this._data.districtProfile_version !== '2026_officers_v6') {
          const fresh = getDefaultData();
          this._data.districtProfile = fresh.districtProfile;
          this._data.districtProfile_version = '2026_officers_v6';
          this.save();
        }
        if (!this._data.mdProfile) {
          const fresh = getDefaultData();
          this._data.mdProfile = fresh.mdProfile;
          this.save();
        }
        
        if (!this._data.pointsSubmissions) {
          const fresh = getDefaultData();
          this._data.pointsSubmissions = fresh.pointsSubmissions;
          this.save();
        }

        if (!this._data.projectCategorySubmissions || !Array.isArray(this._data.projectCategorySubmissions) || this._data.projectCategorySubmissions.length === 0) {
          const fresh = getDefaultData();
          this._data.projectCategorySubmissions = fresh.projectCategorySubmissions;
          this.save();
        }

        if (this._data.points_june_cleanup_version !== '2026_june_cleanup_v2') {
          if (Array.isArray(this._data.projectCategorySubmissions)) {
            this._data.projectCategorySubmissions = this._data.projectCategorySubmissions.filter(s => s.month !== '2026-06');
          }
          if (Array.isArray(this._data.pointsSubmissions)) {
            this._data.pointsSubmissions = this._data.pointsSubmissions.filter(s => s.month !== '2026-06');
          }
          if (!this._data.projectCategorySubmissions || this._data.projectCategorySubmissions.length === 0) {
            const fresh = getDefaultData();
            this._data.projectCategorySubmissions = fresh.projectCategorySubmissions;
          }
          this._data.points_june_cleanup_version = '2026_june_cleanup_v2';
          this.save();
        }
        
        if (!this._data.pointCriteria || this._data.pointCriteria.some(c => c.id === 'pc1')) {
          const fresh = getDefaultData();
          this._data.pointCriteria = fresh.pointCriteria;
          this._data.clubPoints = fresh.clubPoints;
          this.save();
        }

        if (!this._data.districtSchedules) {
          const fresh = getDefaultData();
          this._data.districtSchedules = fresh.districtSchedules;
          this.save();
        }
        
        // Migrate legacy club zones and regions in existing localStorage
        let hasLegacyClub = false;
        if (this._data.clubs) {
          this._data.clubs.forEach(c => {
            if (c.id === 'c6' && c.code !== 'LC-001') { c.code = 'LC-001'; hasLegacyClub = true; }
            else if (c.id === 'c7' && c.code !== 'LC-003') { c.code = 'LC-003'; hasLegacyClub = true; }
            else if (c.id === 'c8' && c.code !== 'LC-002') { c.code = 'LC-002'; hasLegacyClub = true; }
            else if (c.id === 'c9' && c.code !== 'LC-004') { c.code = 'LC-004'; hasLegacyClub = true; }
            else if (c.id === 'c10' && c.code !== 'LC-005') { c.code = 'LC-005'; hasLegacyClub = true; }
            else if (c.id === 'c11' && c.code !== 'LC-006') { c.code = 'LC-006'; hasLegacyClub = true; }
            else if (c.id === 'c12' && c.code !== 'LC-007') { c.code = 'LC-007'; hasLegacyClub = true; }
            else if (c.id === 'c13' && c.code !== 'LC-008') { c.code = 'LC-008'; hasLegacyClub = true; }
            else if (c.id === 'c14' && c.code !== 'LC-009') { c.code = 'LC-009'; hasLegacyClub = true; }
            else if (c.id === 'c15' && c.code !== 'LC-010') { c.code = 'LC-010'; hasLegacyClub = true; }
            else if (c.id === 'c16' && c.code !== 'LC-011') { c.code = 'LC-011'; hasLegacyClub = true; }
            else if (c.id === 'c17' && c.code !== 'LC-012') { c.code = 'LC-012'; hasLegacyClub = true; }
            else if (c.id === 'c18' && c.code !== 'LC-013') { c.code = 'LC-013'; hasLegacyClub = true; }
            else if (c.id === 'c19' && c.code !== 'LC-014') { c.code = 'LC-014'; hasLegacyClub = true; }
            else if (c.id === 'c20' && c.code !== 'LC-015') { c.code = 'LC-015'; hasLegacyClub = true; }
            else if (c.id === 'c21' && c.code !== 'LC-016') { c.code = 'LC-016'; hasLegacyClub = true; }
            else if (c.id === 'c22' && c.code !== 'LC-017') { c.code = 'LC-017'; hasLegacyClub = true; }
            else if (c.id === 'c23' && c.code !== 'LC-018') { c.code = 'LC-018'; hasLegacyClub = true; }
            else if (c.id === 'c24' && c.code !== 'LC-019') { c.code = 'LC-019'; hasLegacyClub = true; }
            else if (c.id === 'c25' && c.code !== 'LC-020') { c.code = 'LC-020'; hasLegacyClub = true; }

            if (c.zone && c.zone.startsWith('Zone ')) {
              hasLegacyClub = true;
              c.zone = c.zone.replace('Zone ', 'A');
            }
            if (c.region && c.region.startsWith('Region ')) {
              hasLegacyClub = true;
              c.region = c.region.replace('Region ', '');
            }
            if (c.region === 'C') {
              c.region = 'B';
              hasLegacyClub = true;
            }
          });
        }
        if (this._data.announcements) {
          const a4 = this._data.announcements.find(a => a.id === 'a4');
          if (a4 && a4.title.includes('Zone A ')) {
            a4.title = a4.title.replace('Zone A ', 'Zone A1 ');
            a4.content = a4.content.replace('Zone A ', 'Zone A1 ');
            hasLegacyClub = true;
          }
        }
        if (hasLegacyClub) {
          this.save();
        }

        // Add Leo Club of Informatics Institute of Technology (c6) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c6')) {
          this._data.clubs.push({
            id: 'c6',
            name: 'Leo Club of Informatics Institute of Technology',
            code: 'LC-001',
            president: 'Sithuli Pehansa Amunuthuduwa',
            charter_date: '2025-05-10',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 22,
            email: 'iit@leo.org',
            phone: '+94 77 987 6543',
            meetingDay: 'Every Wednesday',
            description: 'Fostering technology-driven service and leadership at Informatics Institute of Technology.'
          });
          this.save();
        }

        // Add Leo Club of University of Colombo Faculty of Science (c7) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c7')) {
          this._data.clubs.push({
            id: 'c7',
            name: 'Leo Club of University of Colombo Faculty of Science',
            code: 'LC-003',
            president: 'Sajeetharan Mahadevan',
            charter_date: '2025-02-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 35,
            email: 'fos@leo.org',
            phone: '+94 77 111 2222',
            meetingDay: 'Every Monday',
            description: 'Empowering science students to lead and serve the community.'
          });
          this.save();
        }

        // Add Leo Club of University of Colombo Faculty of Arts (c8) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c8')) {
          this._data.clubs.push({
            id: 'c8',
            name: 'Leo Club of University of Colombo Faculty of Arts',
            code: 'LC-002',
            president: 'Manampeli Mahapatabadiralalage Vimukthi Rukshika Cooray',
            charter_date: '2025-03-20',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 40,
            email: 'foa@leo.org',
            phone: '+94 77 333 4444',
            meetingDay: 'Every Tuesday',
            description: 'Promoting social harmony and leadership development through creative service.'
          });
          this.save();
        }



        // Add points data for IIT if missing from local storage
        if (this._data.clubPoints && !this._data.clubPoints.some(cp => cp.clubId === 'c6')) {
          this._data.clubPoints.push({
            clubId: 'c6',
            points: {}
          });
          this.save();
        }

        // Add points data for UOC Faculty of Science if missing from local storage
        if (this._data.clubPoints && !this._data.clubPoints.some(cp => cp.clubId === 'c7')) {
          this._data.clubPoints.push({
            clubId: 'c7',
            points: {}
          });
          this.save();
        }

        // Add points data for UOC Faculty of Arts if missing from local storage
        if (this._data.clubPoints && !this._data.clubPoints.some(cp => cp.clubId === 'c8')) {
          this._data.clubPoints.push({
            clubId: 'c8',
            points: {}
          });
          this.save();
        }

        // Add members for c7 if missing from local storage
        if (this._data.members && !this._data.members.some(m => m.clubId === 'c7')) {
          this._data.members.push(
            { id: 'm16', clubId: 'c7', name: 'Dulani Bandara', role: 'President', status: 'active', joinDate: '2025-02-15', phone: '+94 77 111 2222', email: 'dulani@email.com' },
            { id: 'm17', clubId: 'c7', name: 'Kavinda Perera', role: 'Secretary', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2223', email: 'kavinda@email.com' },
            { id: 'm18', clubId: 'c7', name: 'Minoli Silva', role: 'Treasurer', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2224', email: 'minoli@email.com' },
            { id: 'm19', clubId: 'c7', name: 'Ruwan Kumara', role: 'VP', status: 'active', joinDate: '2025-03-01', phone: '+94 77 111 2225', email: 'ruwan@email.com' },
            { id: 'm20', clubId: 'c7', name: 'Shalini Fernando', role: 'Member', status: 'active', joinDate: '2025-03-10', phone: '+94 77 111 2226', email: 'shalini@email.com' }
          );
          this.save();
        }

        // Add members for c8 if missing from local storage
        if (this._data.members && !this._data.members.some(m => m.clubId === 'c8')) {
          this._data.members.push(
            { id: 'm21', clubId: 'c8', name: 'Heshan Perera', role: 'President', status: 'active', joinDate: '2025-03-20', phone: '+94 77 333 4444', email: 'heshan@email.com' },
            { id: 'm22', clubId: 'c8', name: 'Nipuni Jayasinghe', role: 'Secretary', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4445', email: 'nipuni@email.com' },
            { id: 'm23', clubId: 'c8', name: 'Sajith De Silva', role: 'Treasurer', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4446', email: 'sajith@email.com' },
            { id: 'm24', clubId: 'c8', name: 'Pooja Rajapakse', role: 'VP', status: 'active', joinDate: '2025-04-05', phone: '+94 77 333 4447', email: 'pooja@email.com' },
            { id: 'm25', clubId: 'c8', name: 'Dilshan Perera', role: 'Member', status: 'active', joinDate: '2025-04-10', phone: '+94 77 333 4448', email: 'dilshan@email.com' }
          );
          this.save();
        }

        // Add projects for c7 if missing from local storage
        if (this._data.projects && !this._data.projects.some(p => p.clubId === 'c7')) {
          this._data.projects.push(
            { id: 'p8', clubId: 'c7', name: 'Science Day Exhibition', category: 'Education', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 25, budget: 25000, description: 'Organized science exhibition for school children.', impact: '150+ students attended' },
            { id: 'p9', clubId: 'c7', name: 'Lab Safety Seminar', category: 'Health', status: 'in_progress', startDate: '2026-06-15', endDate: '2026-06-15', participants: 18, budget: 5000, description: 'Lab safety and first aid training for university students.', impact: 'Ongoing: 40 students enrolled' }
          );
          this.save();
        }

        // Add projects for c8 if missing from local storage
        if (this._data.projects && !this._data.projects.some(p => p.clubId === 'c8')) {
          this._data.projects.push(
            { id: 'p10', clubId: 'c8', name: 'Art Therapy Workshop', category: 'Health', status: 'completed', startDate: '2026-03-05', endDate: '2026-03-05', participants: 20, budget: 15000, description: 'Conducted art therapy workshop for mental well-being.', impact: '30+ participants benefited' },
            { id: 'p11', clubId: 'c8', name: 'Cultural Heritage Exhibition', category: 'Education', status: 'planned', startDate: '2026-07-25', endDate: '2026-07-26', participants: 0, budget: 20000, description: 'Exhibition showcasing traditional Sri Lankan arts and crafts.', impact: 'Expected: 200+ visitors' }
          );
          this.save();
        }

        // Add finances for c7 if missing from local storage
        if (this._data.finances && !this._data.finances.some(f => f.clubId === 'c7')) {
          this._data.finances.push(
            { id: 'f19', clubId: 'c7', type: 'income', category: 'Membership Fees', amount: 35000, date: '2026-02-20', description: 'Annual membership fees collection', reference: 'MF-FOS-001' },
            { id: 'f20', clubId: 'c7', type: 'income', category: 'Sponsorship', amount: 40000, date: '2026-03-05', description: 'Corporate sponsor - SciTech Solutions', reference: 'SP-FOS-001' },
            { id: 'f21', clubId: 'c7', type: 'expense', category: 'Projects', amount: 25000, date: '2026-03-10', description: 'Science Day Exhibition expenses', reference: 'EX-FOS-001' },
            { id: 'f22', clubId: 'c7', type: 'expense', category: 'Administration', amount: 3000, date: '2026-02-25', description: 'Stationery and postage dues', reference: 'EX-FOS-002' }
          );
          this.save();
        }

        // Add finances for c8 if missing from local storage
        if (this._data.finances && !this._data.finances.some(f => f.clubId === 'c8')) {
          this._data.finances.push(
            { id: 'f23', clubId: 'c8', type: 'income', category: 'Membership Fees', amount: 40000, date: '2026-03-25', description: 'Annual membership collection', reference: 'MF-FOA-001' },
            { id: 'f24', clubId: 'c8', type: 'income', category: 'Fundraising', amount: 30000, date: '2026-04-10', description: 'Art exhibition ticket sales', reference: 'FR-FOA-001' },
            { id: 'f25', clubId: 'c8', type: 'expense', category: 'Events', amount: 15000, date: '2026-04-10', description: 'Venue booking and logistics', reference: 'EX-FOA-001' },
            { id: 'f26', clubId: 'c8', type: 'expense', category: 'Administration', amount: 4000, date: '2026-03-30', description: 'Meeting refreshments and flyers', reference: 'EX-FOA-002' }
          );
          this.save();
        }

        // Add invoices for c7 if missing from local storage
        if (this._data.invoices && !this._data.invoices.some(inv => inv.clubId === 'c7')) {
          this._data.invoices.push({
            id: 'inv4',
            invoiceNumber: 'INV-2026-004',
            clubId: 'c7',
            clubName: 'Leo Club of University of Colombo Faculty of Science',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          });
          this.save();
        }

        // Add invoices for c8 if missing from local storage
        if (this._data.invoices && !this._data.invoices.some(inv => inv.clubId === 'c8')) {
          this._data.invoices.push({
            id: 'inv5',
            invoiceNumber: 'INV-2026-005',
            clubId: 'c8',
            clubName: 'Leo Club of University of Colombo Faculty of Arts',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'paid',
            receiptUrl: 'receipt_c8_dues.png',
            reference: 'DEP-70701',
            remarks: 'Approved by District Treasurer',
            eventId: null
          });
          this.save();
        }

        // Add Leo Club of Colombo (Host) (c9) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c9')) {
          this._data.clubs.push({
            id: 'c9',
            name: 'Leo Club of Colombo (Host)',
            code: 'LC-004',
            president: 'Amesh Silva',
            charter_date: '2020-05-10',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 25,
            email: 'colombo.host@leo.org',
            phone: '+94 77 123 0001',
            meetingDay: 'Every Sunday',
            description: 'The pioneering Colombo Host club dedicated to community services.'
          });
          this.save();
        }

        // Add Leo Club of Colombo Millennium (c10) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c10')) {
          this._data.clubs.push({
            id: 'c10',
            name: 'Leo Club of Colombo Millennium',
            code: 'LC-005',
            president: 'Ruvini Perera',
            charter_date: '2021-06-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 28,
            email: 'millennium@leo.org',
            phone: '+94 77 123 0002',
            meetingDay: 'Every Saturday',
            description: 'Fostering millennium leaders in youth community service.'
          });
          this.save();
        }

        // Add Leo Club of Colombo Six New Stars (c11) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c11')) {
          this._data.clubs.push({
            id: 'c11',
            name: 'Leo Club of Colombo Six New Stars',
            code: 'LC-006',
            president: 'Kavindu Fernando',
            charter_date: '2023-08-20',
            zone: 'B1',
            region: 'B',
            status: 'active',
            memberCount: 24,
            email: 'sixstars@leo.org',
            phone: '+94 77 123 0003',
            meetingDay: 'Every Saturday',
            description: 'Guiding young leaders towards astronomical service impacts.'
          });
          this.save();
        }

        // Add Leo Club of UOC Alumni (c12) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c12')) {
          this._data.clubs.push({
            id: 'c12',
            name: 'Leo Club of UOC Alumni',
            code: 'LC-007',
            president: 'Dulaj Senanayake',
            charter_date: '2024-10-01',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 30,
            email: 'uoc.alumni@leo.org',
            phone: '+94 77 123 0004',
            meetingDay: 'Every Sunday',
            description: 'Alumni of UOC uniting to continue their Leostic journey.'
          });
          this.save();
        }

        // Add Leo Club of UOC FOA Alumni (c13) if missing from local storage
        if (this._data.clubs && !this._data.clubs.some(c => c.id === 'c13')) {
          this._data.clubs.push({
            id: 'c13',
            name: 'Leo Club of UOC FOA Alumni',
            code: 'LC-008',
            president: 'Sanduni Jayawardena',
            charter_date: '2025-01-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 26,
            email: 'uoc.foaalumni@leo.org',
            phone: '+94 77 123 0005',
            meetingDay: 'Every Saturday',
            description: 'Arts Faculty alumni contributing to creative societal development.'
          });
          this.save();
        }



        // Add points data for c9 to c13 if missing from local storage
        const newClubPoints = [
          { clubId: 'c9', points: {} },
          { clubId: 'c10', points: {} },
          { clubId: 'c11', points: {} },
          { clubId: 'c12', points: {} },
          { clubId: 'c13', points: {} }
        ];
        if (this._data.clubPoints) {
          newClubPoints.forEach(cp => {
            if (!this._data.clubPoints.some(existingCp => existingCp.clubId === cp.clubId)) {
              this._data.clubPoints.push(cp);
              this.save();
            }
          });
        }

        // Add members for c9 to c13 if missing from local storage
        const newMembers = [
          { id: 'm26', clubId: 'c9', name: 'Amesh Silva', role: 'President', status: 'active', joinDate: '2020-05-10', phone: '+94 77 123 0001', email: 'amesh@email.com' },
          { id: 'm27', clubId: 'c9', name: 'Janaki Perera', role: 'Secretary', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0011', email: 'janaki@email.com' },
          { id: 'm28', clubId: 'c9', name: 'Tharindu Silva', role: 'Treasurer', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0012', email: 'tharindu@email.com' },
          { id: 'm29', clubId: 'c10', name: 'Ruvini Perera', role: 'President', status: 'active', joinDate: '2021-06-15', phone: '+94 77 123 0002', email: 'ruvini@email.com' },
          { id: 'm30', clubId: 'c10', name: 'Saman Kumara', role: 'Secretary', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0021', email: 'saman@email.com' },
          { id: 'm31', clubId: 'c10', name: 'Nipuni Jayasuriya', role: 'Treasurer', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0022', email: 'nipuni.j@email.com' },
          { id: 'm32', clubId: 'c11', name: 'Kavindu Fernando', role: 'President', status: 'active', joinDate: '2023-08-20', phone: '+94 77 123 0003', email: 'kavindu.f@email.com' },
          { id: 'm33', clubId: 'c11', name: 'Hashini Alwis', role: 'Secretary', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0031', email: 'hashini@email.com' },
          { id: 'm34', clubId: 'c11', name: 'Roshan De Silva', role: 'Treasurer', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0032', email: 'roshan@email.com' },
          { id: 'm35', clubId: 'c12', name: 'Dulaj Senanayake', role: 'President', status: 'active', joinDate: '2024-10-01', phone: '+94 77 123 0004', email: 'dulaj@email.com' },
          { id: 'm36', clubId: 'c12', name: 'Menaka Jayawardena', role: 'Secretary', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0041', email: 'menaka@email.com' },
          { id: 'm37', clubId: 'c12', name: 'Piyumi Fernando', role: 'Treasurer', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0042', email: 'piyumi@email.com' },
          { id: 'm38', clubId: 'c13', name: 'Sanduni Jayawardena', role: 'President', status: 'active', joinDate: '2025-01-15', phone: '+94 77 123 0005', email: 'sanduni.j@email.com' },
          { id: 'm39', clubId: 'c13', name: 'Chathura Rajapakse', role: 'Secretary', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0051', email: 'chathura@email.com' },
          { id: 'm40', clubId: 'c13', name: 'Dilani Gamage', role: 'Treasurer', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0052', email: 'dilani@email.com' }
        ];
        if (this._data.members) {
          newMembers.forEach(m => {
            if (!this._data.members.some(existingM => existingM.id === m.id)) {
              this._data.members.push(m);
              this.save();
            }
          });
        }

        // Add projects for c9 to c13 if missing from local storage
        const newProjects = [
          { id: 'p12', clubId: 'c9', name: 'Community Kitchen', category: 'Health', status: 'completed', startDate: '2026-04-10', endDate: '2026-04-10', participants: 15, budget: 18000, description: 'Provided meals to families in need.', impact: '100+ meals served' },
          { id: 'p13', clubId: 'c10', name: 'Youth Career Fair', category: 'Education', status: 'completed', startDate: '2026-05-15', endDate: '2026-05-15', participants: 25, budget: 35000, description: 'Career fair for school leavers.', impact: '200+ youth participated' },
          { id: 'p14', clubId: 'c11', name: 'Street Animal Welfare', category: 'Environment', status: 'completed', startDate: '2026-03-20', endDate: '2026-03-20', participants: 12, budget: 8000, description: 'Feeding and vaccination drive for stray dogs.', impact: '40 stray dogs treated' },
          { id: 'p15', clubId: 'c12', name: 'Scholar Mentorship', category: 'Education', status: 'in_progress', startDate: '2026-05-01', endDate: '2026-07-01', participants: 10, budget: 12000, description: 'Mentoring university freshmen.', impact: 'Ongoing: 25 mentees' },
          { id: 'p16', clubId: 'c13', name: 'Heritage Preservation', category: 'Education', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 14, budget: 15000, description: 'Preserving local folklore stories digital archive.', impact: '50 folktales archived' }
        ];
        if (this._data.projects) {
          newProjects.forEach(p => {
            if (!this._data.projects.some(existingP => existingP.id === p.id)) {
              this._data.projects.push(p);
              this.save();
            }
          });
        }

        // Add finances for c9 to c13 if missing from local storage
        const newFinances = [
          { id: 'f27', clubId: 'c9', type: 'income', category: 'Membership Fees', amount: 25000, date: '2026-02-15', description: 'Annual membership fees collection', reference: 'MF-CH-001' },
          { id: 'f28', clubId: 'c10', type: 'income', category: 'Membership Fees', amount: 30000, date: '2026-02-20', description: 'Annual membership collection', reference: 'MF-CM-001' },
          { id: 'f29', clubId: 'c11', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-03-01', description: 'Annual membership collection', reference: 'MF-CSNS-001' },
          { id: 'f30', clubId: 'c12', type: 'income', category: 'Membership Fees', amount: 35000, date: '2026-03-05', description: 'Annual membership fees collection', reference: 'MF-UA-001' },
          { id: 'f31', clubId: 'c13', type: 'income', category: 'Membership Fees', amount: 28000, date: '2026-03-10', description: 'Annual membership collection', reference: 'MF-UAA-001' }
        ];
        if (this._data.finances) {
          newFinances.forEach(f => {
            if (!this._data.finances.some(existingF => existingF.id === f.id)) {
              this._data.finances.push(f);
              this.save();
            }
          });
        }

        // Add invoices for c9 to c13 if missing from local storage
        const newInvoices = [
          {
            id: 'inv6',
            invoiceNumber: 'INV-2026-006',
            clubId: 'c9',
            clubName: 'Leo Club of Colombo (Host)',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv7',
            invoiceNumber: 'INV-2026-007',
            clubId: 'c10',
            clubName: 'Leo Club of Colombo Millennium',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'paid',
            receiptUrl: 'receipt_c10_dues.png',
            reference: 'DEP-80801',
            remarks: 'Approved by District Treasurer',
            eventId: null
          },
          {
            id: 'inv8',
            invoiceNumber: 'INV-2026-008',
            clubId: 'c11',
            clubName: 'Leo Club of Colombo Six New Stars',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv9',
            invoiceNumber: 'INV-2026-009',
            clubId: 'c12',
            clubName: 'Leo Club of UOC Alumni',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv10',
            invoiceNumber: 'INV-2026-010',
            clubId: 'c13',
            clubName: 'Leo Club of UOC FOA Alumni',
            amount: 15000,
            issueDate: '2026-06-01',
            dueDate: '2026-06-30',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
            category: 'Membership Fees',
            status: 'paid',
            receiptUrl: 'receipt_c13_dues.png',
            reference: 'DEP-90901',
            remarks: 'Approved by District Treasurer',
            eventId: null
          }
        ];
        if (this._data.invoices) {
          newInvoices.forEach(inv => {
            if (!this._data.invoices.some(existingInv => existingInv.clubId === inv.clubId)) {
              this._data.invoices.push(inv);
              this.save();
            }
          });
        }

        // Add Leo Clubs c14 to c25 if missing from local storage
        const newClubsC14toC25 = [
          {
            id: 'c14',
            name: 'Leo Club of Prince of Wales’ College',
            code: 'LC-009',
            president: 'Devinda Silva',
            charter_date: '2026-06-15',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 20,
            email: 'princeofwales@leo.org',
            phone: '+94 77 123 0014',
            meetingDay: 'Every Saturday',
            description: 'Dedicated to fostering leadership and school community service.'
          },
          {
            id: 'c15',
            name: 'Leo Club of Princess of Wales’ College',
            code: 'LC-010',
            president: 'Shehani Fernando',
            charter_date: '2026-06-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 22,
            email: 'princessofwales@leo.org',
            phone: '+94 77 123 0015',
            meetingDay: 'Every Sunday',
            description: 'Empowering young women leaders through impact-driven service.'
          },
          {
            id: 'c16',
            name: 'Leo Club of Sri Sumangala College',
            code: 'LC-011',
            president: 'Kusal Mendis',
            charter_date: '2026-06-15',
            zone: 'B1',
            region: 'B',
            status: 'active',
            memberCount: 20,
            email: 'srisumangala@leo.org',
            phone: '+94 77 123 0016',
            meetingDay: 'Every Saturday',
            description: 'Creating positive changes in the community through dedicated efforts.'
          },
          {
            id: 'c17',
            name: 'Leo Club of Kalutara Vidyalaya',
            code: 'LC-012',
            president: 'Dilan Perera',
            charter_date: '2026-06-15',
            zone: 'B2',
            region: 'B',
            status: 'active',
            memberCount: 25,
            email: 'kalutaravidyalaya@leo.org',
            phone: '+94 77 123 0017',
            meetingDay: 'Every Saturday',
            description: 'Developing youth potentials and building active citizens.'
          },
          {
            id: 'c18',
            name: 'Leo Club of Kalutara Balika Vidyalaya',
            code: 'LC-013',
            president: 'Nethmi Fernando',
            charter_date: '2026-06-15',
            zone: 'B1',
            region: 'B',
            status: 'active',
            memberCount: 24,
            email: 'kalutarabalika@leo.org',
            phone: '+94 77 123 0018',
            meetingDay: 'Every Sunday',
            description: 'Committed to humanitarian support and leadership excellence.'
          },
          {
            id: 'c19',
            name: 'Leo Club of Moratuwa 2020',
            code: 'LC-014',
            president: 'Sahan Jayasuriya',
            charter_date: '2026-06-15',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 18,
            email: 'moratuwa2020@leo.org',
            phone: '+94 77 123 0019',
            meetingDay: 'Every Saturday',
            description: 'Promoting mutual cooperation and impactful social work.'
          },
          {
            id: 'c20',
            name: 'Leo Club of Royal Achievers',
            code: 'LC-015',
            president: 'Praveen Silva',
            charter_date: '2026-06-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 20,
            email: 'royalachievers@leo.org',
            phone: '+94 77 123 0020',
            meetingDay: 'Every Saturday',
            description: 'Achieving milestones in community service and personal development.'
          },
          {
            id: 'c21',
            name: 'Leo Club of Moratuwa Ratmalana',
            code: 'LC-016',
            president: 'Ruwantha Fernando',
            charter_date: '2026-06-15',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 22,
            email: 'moratuwaratmalana@leo.org',
            phone: '+94 77 123 0021',
            meetingDay: 'Every Sunday',
            description: 'Bridging communities together through sustainable development projects.'
          },
          {
            id: 'c22',
            name: 'Leo Club of Cosmopolitian Creators',
            code: 'LC-017',
            president: 'Dilini Cooray',
            charter_date: '2026-06-15',
            zone: 'B2',
            region: 'B',
            status: 'active',
            memberCount: 19,
            email: 'cosmopolitan@leo.org',
            phone: '+94 77 123 0022',
            meetingDay: 'Every Saturday',
            description: 'Inspiring creative ideas and cosmopolitan unity in social services.'
          },
          {
            id: 'c23',
            name: 'Leo Club of Mount Lavinia Orient Centennial',
            code: 'LC-018',
            president: 'Senura De Silva',
            charter_date: '2026-06-15',
            zone: 'A2',
            region: 'A',
            status: 'active',
            memberCount: 21,
            email: 'mtlavinia@leo.org',
            phone: '+94 77 123 0023',
            meetingDay: 'Every Saturday',
            description: 'Serving with pride and building future leaders since the centennial.'
          },
          {
            id: 'c24',
            name: 'Leo Club of Moratuwa',
            code: 'LC-019',
            president: 'Thilina Perera',
            charter_date: '2026-06-15',
            zone: 'A1',
            region: 'A',
            status: 'active',
            memberCount: 23,
            email: 'moratuwa@leo.org',
            phone: '+94 77 123 0024',
            meetingDay: 'Every Sunday',
            description: 'A legacy of service and fellowship in the heart of Moratuwa.'
          },
          {
            id: 'c25',
            name: 'Leo Club of Kothalawala Defense University',
            code: 'LC-020',
            president: 'Kasun Jayawardena',
            charter_date: '2026-06-15',
            zone: 'B1',
            region: 'B',
            status: 'active',
            memberCount: 30,
            email: 'kdu@leo.org',
            phone: '+94 77 123 0025',
            meetingDay: 'Every Friday',
            description: 'Disciplined leaders serving the nation through active volunteerism.'
          }
        ];
        if (this._data.clubs) {
          newClubsC14toC25.forEach(c => {
            if (!this._data.clubs.some(existingClub => existingClub.id === c.id)) {
              this._data.clubs.push(c);
              this.save();
            }
          });
        }



        // Add points data for c14 to c25 if missing from local storage
        const newClubPointsC14toC25 = [
          { clubId: 'c14', points: {} },
          { clubId: 'c15', points: {} },
          { clubId: 'c16', points: {} },
          { clubId: 'c17', points: {} },
          { clubId: 'c18', points: {} },
          { clubId: 'c19', points: {} },
          { clubId: 'c20', points: {} },
          { clubId: 'c21', points: {} },
          { clubId: 'c22', points: {} },
          { clubId: 'c23', points: {} },
          { clubId: 'c24', points: {} },
          { clubId: 'c25', points: {} }
        ];
        if (this._data.clubPoints) {
          newClubPointsC14toC25.forEach(cp => {
            if (!this._data.clubPoints.some(existingCp => existingCp.clubId === cp.clubId)) {
              this._data.clubPoints.push(cp);
              this.save();
            }
          });
        }

        // Add members for c14 to c25 if missing from local storage
        const newMembersC14toC25 = [
          { id: 'm41', clubId: 'c14', name: 'Devinda Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0014', email: 'devinda@email.com' },
          { id: 'm42', clubId: 'c14', name: 'Janith Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0114', email: 'janith@email.com' },
          { id: 'm43', clubId: 'c14', name: 'Lahiru Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0214', email: 'lahiru@email.com' },
          { id: 'm44', clubId: 'c15', name: 'Shehani Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0015', email: 'shehani@email.com' },
          { id: 'm45', clubId: 'c15', name: 'Amanda Silva', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0115', email: 'amanda@email.com' },
          { id: 'm46', clubId: 'c15', name: 'Dilini Peiris', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0215', email: 'dilini.p@email.com' },
          { id: 'm47', clubId: 'c16', name: 'Kusal Mendis', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0016', email: 'kusal@email.com' },
          { id: 'm48', clubId: 'c16', name: 'Tharindu Rajapakse', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0116', email: 'tharindu.r@email.com' },
          { id: 'm49', clubId: 'c16', name: 'Ruchira De Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0216', email: 'ruchira@email.com' },
          { id: 'm50', clubId: 'c17', name: 'Dilan Perera', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0017', email: 'dilan@email.com' },
          { id: 'm51', clubId: 'c17', name: 'Kavindu Jayasinghe', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0117', email: 'kavindu.j@email.com' },
          { id: 'm52', clubId: 'c17', name: 'Sajith Cooray', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0217', email: 'sajith.c@email.com' },
          { id: 'm53', clubId: 'c18', name: 'Nethmi Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0018', email: 'nethmi@email.com' },
          { id: 'm54', clubId: 'c18', name: 'Piyumi Jayawardena', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0118', email: 'piyumi.j@email.com' },
          { id: 'm55', clubId: 'c18', name: 'Hansini Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0218', email: 'hansini@email.com' },
          { id: 'm56', clubId: 'c19', name: 'Sahan Jayasuriya', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0019', email: 'sahan.j@email.com' },
          { id: 'm57', clubId: 'c19', name: 'Asanka Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0119', email: 'asanka@email.com' },
          { id: 'm58', clubId: 'c19', name: 'Thilina Mendis', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0219', email: 'thilina.m@email.com' },
          { id: 'm59', clubId: 'c20', name: 'Praveen Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0020', email: 'praveen@email.com' },
          { id: 'm60', clubId: 'c20', name: 'Gayan Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0120', email: 'gayan@email.com' },
          { id: 'm61', clubId: 'c20', name: 'Harsha Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0220', email: 'harsha@email.com' },
          { id: 'm62', clubId: 'c21', name: 'Ruwantha Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0021', email: 'ruwantha@email.com' },
          { id: 'm63', clubId: 'c21', name: 'Kasun Peiris', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0121', email: 'kasun.p@email.com' },
          { id: 'm64', clubId: 'c21', name: 'Mahesh Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0221', email: 'mahesh@email.com' },
          { id: 'm65', clubId: 'c22', name: 'Dilini Cooray', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0022', email: 'dilini.c@email.com' },
          { id: 'm66', clubId: 'c22', name: 'Supun Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0122', email: 'supun@email.com' },
          { id: 'm67', clubId: 'c22', name: 'Ishara Perera', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0222', email: 'ishara.p@email.com' },
          { id: 'm68', clubId: 'c23', name: 'Senura De Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0023', email: 'senura@email.com' },
          { id: 'm69', clubId: 'c23', name: 'Menaka Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0123', email: 'menaka.f@email.com' },
          { id: 'm70', clubId: 'c23', name: 'Ravindu Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0223', email: 'ravindu.s@email.com' },
          { id: 'm71', clubId: 'c24', name: 'Thilina Perera', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0024', email: 'thilina@email.com' },
          { id: 'm72', clubId: 'c24', name: 'Chamara Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0124', email: 'chamara.f@email.com' },
          { id: 'm73', clubId: 'c24', name: 'Sandun Peiris', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0224', email: 'sandun@email.com' },
          { id: 'm74', clubId: 'c25', name: 'Kasun Jayawardena', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0025', email: 'kasun.j@email.com' },
          { id: 'm75', clubId: 'c25', name: 'Nimna Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0125', email: 'nimna@email.com' },
          { id: 'm76', clubId: 'c25', name: 'Dulaj Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0225', email: 'dulaj.f@email.com' }
        ];
        if (this._data.members) {
          newMembersC14toC25.forEach(m => {
            if (!this._data.members.some(existingM => existingM.id === m.id)) {
              this._data.members.push(m);
              this.save();
            }
          });
        }

        // Add projects for c14 to c25 if missing from local storage
        const newProjectsC14toC25 = [
          { id: 'p17', clubId: 'c14', name: 'Prince School Support', category: 'Education', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 15, budget: 10000, description: 'Donated stationeries to students.', impact: '50 students supported' },
          { id: 'p18', clubId: 'c15', name: 'Princess Health Camp', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 18, budget: 15000, description: 'Organized free health camp.', impact: '100+ citizens checked' },
          { id: 'p19', clubId: 'c16', name: 'Sri Sumangala Library Book Donation', category: 'Education', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 12, budget: 12000, description: 'Donated library books.', impact: '300 students benefited' },
          { id: 'p20', clubId: 'c17', name: 'Kalutara Shramadana Campaign', category: 'Environment', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 20, budget: 5000, description: 'Cleaned public bus stand.', impact: 'Enhanced public hygiene' },
          { id: 'p21', clubId: 'c18', name: 'Kalutara Balika Child Care Seminar', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 14, budget: 8000, description: 'Seminar on early child development.', impact: '50 mothers participated' },
          { id: 'p22', clubId: 'c19', name: 'Moratuwa Beach Cleanup', category: 'Environment', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 16, budget: 6000, description: 'Beach cleaning campaign.', impact: 'Collected 100kg plastic waste' },
          { id: 'p23', clubId: 'c20', name: 'Royal Achievers Elder Care Visit', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 10, budget: 10000, description: 'Visited elders home with lunch.', impact: '30 elders supported' },
          { id: 'p24', clubId: 'c21', name: 'Ratmalana Tree Planting Initiative', category: 'Environment', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 15, budget: 7000, description: 'Planted trees around railway station.', impact: '50 saplings planted' },
          { id: 'p25', clubId: 'c22', name: 'Cosmopolitan Creators Creative Art Class', category: 'Education', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 12, budget: 9000, description: 'Art lessons for orphan kids.', impact: '25 children participated' },
          { id: 'p26', clubId: 'c23', name: 'Mount Lavinia Beach Safety Awareness', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 14, budget: 8000, description: 'Beach safety and lifesaving awareness.', impact: '120 public participants' },
          { id: 'p27', clubId: 'c24', name: 'Moratuwa Community Food Drive', category: 'Health', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 15, budget: 20000, description: 'Distribution of dry rations to needy.', impact: '80 families benefited' },
          { id: 'p28', clubId: 'c25', name: 'KDU Disaster Management Awareness', category: 'Education', status: 'completed', startDate: '2026-06-15', endDate: '2026-06-15', participants: 25, budget: 15000, description: 'Disaster management simulation seminar.', impact: '200+ students trained' }
        ];
        if (this._data.projects) {
          newProjectsC14toC25.forEach(p => {
            if (!this._data.projects.some(existingP => existingP.id === p.id)) {
              this._data.projects.push(p);
              this.save();
            }
          });
        }

        // Add finances for c14 to c25 if missing from local storage
        const newFinancesC14toC25 = [
          { id: 'f32', clubId: 'c14', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-PW-001' },
          { id: 'f33', clubId: 'c15', type: 'income', category: 'Membership Fees', amount: 22000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-PRW-001' },
          { id: 'f34', clubId: 'c16', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-SS-001' },
          { id: 'f35', clubId: 'c17', type: 'income', category: 'Membership Fees', amount: 25000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KV-001' },
          { id: 'f36', clubId: 'c18', type: 'income', category: 'Membership Fees', amount: 24000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KBV-001' },
          { id: 'f37', clubId: 'c19', type: 'income', category: 'Membership Fees', amount: 18000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-M20-001' },
          { id: 'f38', clubId: 'c20', type: 'income', category: 'Membership Fees', amount: 20000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-RA-001' },
          { id: 'f39', clubId: 'c21', type: 'income', category: 'Membership Fees', amount: 22000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-MR-001' },
          { id: 'f40', clubId: 'c22', type: 'income', category: 'Membership Fees', amount: 19000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-CC-001' },
          { id: 'f41', clubId: 'c23', type: 'income', category: 'Membership Fees', amount: 21000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-ML-001' },
          { id: 'f42', clubId: 'c24', type: 'income', category: 'Membership Fees', amount: 23000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-M-001' },
          { id: 'f43', clubId: 'c25', type: 'income', category: 'Membership Fees', amount: 30000, date: '2026-06-15', description: 'Annual membership collection', reference: 'MF-KDU-001' }
        ];
        if (this._data.finances) {
          newFinancesC14toC25.forEach(f => {
            if (!this._data.finances.some(existingF => existingF.id === f.id)) {
              this._data.finances.push(f);
              this.save();
            }
          });
        }

        // Add invoices for c14 to c25 if missing from local storage
        const newInvoicesC14toC25 = [
          {
            id: 'inv11',
            invoiceNumber: 'INV-2026-011',
            clubId: 'c14',
            clubName: 'Leo Club of Prince of Wales’ College',
            amount: 6750,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (27 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv12',
            invoiceNumber: 'INV-2026-012',
            clubId: 'c15',
            clubName: 'Leo Club of Princess of Wales’ College',
            amount: 11750,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (47 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv13',
            invoiceNumber: 'INV-2026-013',
            clubId: 'c16',
            clubName: 'Leo Club of Sri Sumangala College',
            amount: 3750,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (15 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv14',
            invoiceNumber: 'INV-2026-014',
            clubId: 'c17',
            clubName: 'Leo Club of Kalutara Vidyalaya',
            amount: 9750,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (39 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv15',
            invoiceNumber: 'INV-2026-015',
            clubId: 'c18',
            clubName: 'Leo Club of Kalutara Balika Vidyalaya',
            amount: 15750,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (63 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv16',
            invoiceNumber: 'INV-2026-016',
            clubId: 'c19',
            clubName: 'Leo Club of Moratuwa 2020',
            amount: 8400,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (28 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv17',
            invoiceNumber: 'INV-2026-017',
            clubId: 'c20',
            clubName: 'Leo Club of Royal Achievers',
            amount: 16800,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (56 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv18',
            invoiceNumber: 'INV-2026-018',
            clubId: 'c21',
            clubName: 'Leo Club of Moratuwa Ratmalana',
            amount: 20700,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (69 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv19',
            invoiceNumber: 'INV-2026-019',
            clubId: 'c22',
            clubName: 'Leo Club of Cosmopolitian Creators',
            amount: 5500,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (22 members @ Rs. 250)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv20',
            invoiceNumber: 'INV-2026-020',
            clubId: 'c23',
            clubName: 'Leo Club of Mount Lavinia Orient Centennial',
            amount: 8100,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (27 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv21',
            invoiceNumber: 'INV-2026-021',
            clubId: 'c24',
            clubName: 'Leo Club of Moratuwa',
            amount: 24300,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (81 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          },
          {
            id: 'inv22',
            invoiceNumber: 'INV-2026-022',
            clubId: 'c25',
            clubName: 'Leo Club of Kothalawala Defense University',
            amount: 36600,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (122 members @ Rs. 300)',
            category: 'Membership Fees',
            status: 'unpaid',
            receiptUrl: '',
            reference: '',
            remarks: '',
            eventId: null
          }
        ];
        if (this._data.invoices) {
          newInvoicesC14toC25.forEach(inv => {
            if (!this._data.invoices.some(existingInv => existingInv.clubId === inv.clubId)) {
              this._data.invoices.push(inv);
              this.save();
            }
          });
        }

        // Standardize District Membership Dues (Rs. 250 for Alpha Leo, Rs. 300 for Omega Leo)
        if (this._data.membership_dues_version !== '2026_dues_standard_v1') {
          if (this._data.invoices && this._data.clubs) {
            const clubMap = new Map((this._data.clubs || []).map(c => [c.id, c]));
            this._data.invoices.forEach(inv => {
              if (inv.category === 'Membership Fees' && (inv.description?.includes('Annual District Membership Dues') || inv.description?.includes('Annual membership') || inv.id?.startsWith('inv'))) {
                const club = clubMap.get(inv.clubId);
                if (club) {
                  const isAlpha = (club.track || '').toLowerCase().includes('alpha');
                  const rate = isAlpha ? 250 : 300;
                  const members = club.memberCount || 0;
                  inv.amount = members * rate;
                  inv.description = `Annual District Membership Dues (${members} members @ Rs. ${rate})`;
                }
              }
            });

            // Re-sync consolidated district finance entry f15 with total paid membership dues
            const paidDuesTotal = this._data.invoices
              .filter(inv => inv.category === 'Membership Fees' && inv.status === 'paid')
              .reduce((sum, inv) => sum + (inv.amount || 0), 0);
            const f15 = (this._data.finances || []).find(f => f.id === 'f15');
            if (f15 && paidDuesTotal > 0) {
              f15.amount = paidDuesTotal;
              f15.description = 'Consolidated settled district membership dues from clubs (INV-001, INV-005, INV-007, INV-010)';
            }
          }
          this._data.membership_dues_version = '2026_dues_standard_v1';
          this.save();
        }

        // Reset all club points and submissions across the portal
        if (this._data.points_reset_version !== '2026_points_reset_v1') {
          const allClubs = this._data.clubs || [];
          this._data.clubPoints = allClubs.map(c => ({
            id: this.generateId(),
            clubId: c.id,
            points: {}
          }));
          this._data.pointsSubmissions = [];
          this._data.points_reset_version = '2026_points_reset_v1';
          this.save();
        }
      } else {
        this._data = getDefaultData();
        this.save();
      }
    } catch {
      this._data = getDefaultData();
      this.save();
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  reset() {
    this._data = getDefaultData();
    this.save();
    this.emit('reset');
  }

  // ---------- Event System ----------
  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    if (!this._listeners[event]) return;
    this._listeners[event].forEach(cb => cb(data));
  }

  // ---------- Generic CRUD ----------
  getAll(collection) {
    const list = this._data[collection] || [];
    if (collection === 'clubs') {
      return [...list].sort((a, b) => (a.code || '').localeCompare(b.code || ''));
    }
    return list;
  }

  getById(collection, id) {
    return (this._data[collection] || []).find(item => item.id === id);
  }

  getByField(collection, field, value) {
    return (this._data[collection] || []).filter(item => item[field] === value);
  }

  create(collection, item) {
    if (!this._data[collection]) this._data[collection] = [];
    const newItem = { ...item, id: item.id || this.generateId() };
    this._data[collection].push(newItem);
    this.save();
    this.emit(`${collection}:created`, newItem);
    this.emit(`${collection}:changed`);

    // Sync district project budgets to the district wallet
    if (collection === 'projects' && newItem.clubId === 'district') {
      this.syncProjectToDistrictWallet(newItem);
    }

    return newItem;
  }

  update(collection, id, updates) {
    const index = (this._data[collection] || []).findIndex(item => item.id === id);
    if (index === -1) return null;
    this._data[collection][index] = { ...this._data[collection][index], ...updates };
    this.save();
    this.emit(`${collection}:updated`, this._data[collection][index]);
    this.emit(`${collection}:changed`);

    // Sync district project budgets to the district wallet
    if (collection === 'projects') {
      const project = this._data[collection][index];
      if (project.clubId === 'district') {
        this.syncProjectToDistrictWallet(project);
      }
    }

    return this._data[collection][index];
  }

  delete(collection, id) {
    const index = (this._data[collection] || []).findIndex(item => item.id === id);
    if (index === -1) return false;
    const deleted = this._data[collection].splice(index, 1)[0];
    this.save();
    this.emit(`${collection}:deleted`, deleted);
    this.emit(`${collection}:changed`);

    // Cleanup synced finances if a district project is deleted
    if (collection === 'projects') {
      if (this._data.finances) {
        const originalLen = this._data.finances.length;
        this._data.finances = this._data.finances.filter(f => f.projectId !== id);
        if (this._data.finances.length !== originalLen) {
          this.save();
          this.emit('finances:changed');
        }
      }
    }

    return true;
  }

  syncProjectToDistrictWallet(project) {
    if (project.clubId !== 'district') return;

    if (!this._data.finances) this._data.finances = [];
    
    // Purge any existing transactions synced to this project
    this._data.finances = this._data.finances.filter(f => f.projectId !== project.id);

    // If project is completed, synchronize its budget levels
    if (project.status === 'completed') {
      const budgetDetails = project.budgetDetails || [];
      if (budgetDetails.length > 0) {
        budgetDetails.forEach((item, index) => {
          this._data.finances.push({
            id: `f-proj-${project.id}-${index}-${this.generateId().substring(0, 4)}`,
            clubId: 'district',
            type: item.type || 'expense',
            category: 'Projects',
            amount: parseFloat(item.amount) || 0,
            date: project.endDate || new Date().toISOString().split('T')[0],
            description: `Project: ${project.name} - ${item.description}`,
            reference: `PROJ-${project.id}`,
            projectId: project.id
          });
        });
      } else {
        // Fallback to total budget
        const totalAmt = parseFloat(project.budget) || 0;
        if (totalAmt > 0) {
          this._data.finances.push({
            id: `f-proj-${project.id}-total`,
            clubId: 'district',
            type: 'expense',
            category: 'Projects',
            amount: totalAmt,
            date: project.endDate || new Date().toISOString().split('T')[0],
            description: `Project: ${project.name} (Total Budget)`,
            reference: `PROJ-${project.id}`,
            projectId: project.id
          });
        }
      }
    }

    this.save();
    this.emit('finances:changed');
  }

  // ---------- Helpers ----------
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Club-specific queries
  getClubMembers(clubId) {
    return this.getByField('members', 'clubId', clubId);
  }

  getClubFinances(clubId) {
    return this.getByField('finances', 'clubId', clubId);
  }

  getClubProjects(clubId) {
    return this.getByField('projects', 'clubId', clubId);
  }

  getClubCompletedProjectsCount(clubId) {
    const club = this.getById('clubs', clubId);
    if (club && typeof club.projectsCompleted === 'number') {
      return club.projectsCompleted;
    }
    return this.getClubProjects(clubId).filter(p => p.status === 'completed').length;
  }

  getClubAnnouncements(clubId) {
    return this.getAll('announcements').filter(a =>
      a.targetClubs === 'all' || (Array.isArray(a.targetClubs) && a.targetClubs.includes(clubId))
    );
  }

  getClubPoints(clubId) {
    return (this._data.clubPoints || []).find(cp => cp.clubId === clubId);
  }

  updateClubPoints(clubId, points) {
    if (!this._data.clubPoints) this._data.clubPoints = [];
    const cp = this._data.clubPoints.find(item => item.clubId === clubId);
    if (cp) {
      cp.points = points;
    } else {
      this._data.clubPoints.push({ id: this.generateId(), clubId, points });
    }
    this.save();
    this.emit('clubPoints:changed');
  }

  getTotalClubPoints(clubId) {
    const cp = this.getClubPoints(clubId);
    if (!cp) return 0;
    return Object.values(cp.points).reduce((sum, v) => sum + v, 0);
  }

  resetAllClubPoints() {
    const allClubs = this._data.clubs || [];
    this._data.clubPoints = allClubs.map(c => ({
      id: this.generateId(),
      clubId: c.id,
      points: {}
    }));
    this._data.pointsSubmissions = [];
    this._data.points_reset_version = '2026_points_reset_v1';
    this.save();
    this.emit('clubPoints:changed');
    this.emit('pointsSubmissions:changed');
    return true;
  }

  getClubFinanceSummary(clubId) {
    const finances = this.getClubFinances(clubId);
    const income = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
    const expenses = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
    return { income, expenses, balance: income - expenses };
  }

  getClubEventRegistrations(clubId) {
    return this.getAll('events').map(e => {
      const reg = (e.registrations || []).find(r => r.clubId === clubId);
      return { event: e, registration: reg || null };
    });
  }

  getMembershipHistory() {
    if (!this._data.membershipHistory) {
      this._data.membershipHistory = getDefaultData().membershipHistory;
      this.save();
    }
    return this._data.membershipHistory;
  }

  // Rate formula: Rs. 250 for Alpha Leo clubs, Rs. 300 for Omega Leo clubs
  getClubMembershipDueRate(clubIdOrTrack) {
    if (!clubIdOrTrack) return 300;
    let track = clubIdOrTrack;
    if (typeof clubIdOrTrack === 'string' && (clubIdOrTrack.startsWith('c') || this.getById('clubs', clubIdOrTrack))) {
      const club = this.getById('clubs', clubIdOrTrack);
      track = club ? club.track : clubIdOrTrack;
    }
    return String(track).toLowerCase().includes('alpha') ? 250 : 300;
  }

  calculateClubMembershipIncome(clubId, checkpointKey = null) {
    const club = this.getById('clubs', clubId);
    if (!club) return 0;
    let count = club.memberCount || 0;
    if (checkpointKey) {
      const history = this.getMembershipHistory();
      const cp = (history.checkpoints || []).find(c => c.key === checkpointKey);
      if (cp && cp.clubCounts && cp.clubCounts[clubId] !== undefined) {
        count = cp.clubCounts[clubId];
      }
    }
    const rate = this.getClubMembershipDueRate(club.track);
    return count * rate;
  }

  getDistrictMembershipIncomeBreakdown(checkpointKey = null) {
    const clubs = this.getAll('clubs') || [];
    const history = this.getMembershipHistory();
    const cp = checkpointKey ? (history.checkpoints || []).find(c => c.key === checkpointKey) : null;

    let alphaCount = 0;
    let omegaCount = 0;
    let alphaClubsCount = 0;
    let omegaClubsCount = 0;

    clubs.forEach(c => {
      let members = c.memberCount || 0;
      if (cp && cp.clubCounts && cp.clubCounts[c.id] !== undefined) {
        members = cp.clubCounts[c.id];
      }
      const isAlpha = (c.track || '').toLowerCase().includes('alpha');
      if (isAlpha) {
        alphaClubsCount++;
        alphaCount += members;
      } else {
        omegaClubsCount++;
        omegaCount += members;
      }
    });

    const alphaIncome = alphaCount * 250;
    const omegaIncome = omegaCount * 300;
    const totalIncome = alphaIncome + omegaIncome;
    const totalMembers = alphaCount + omegaCount;

    return {
      alphaClubsCount,
      omegaClubsCount,
      alphaCount,
      omegaCount,
      alphaRate: 250,
      omegaRate: 300,
      alphaIncome,
      omegaIncome,
      totalIncome,
      totalMembers,
      totalClubs: clubs.length
    };
  }

  getTotalDistrictMembershipIncome(checkpointKey = null) {
    return this.getDistrictMembershipIncomeBreakdown(checkpointKey).totalIncome;
  }

  updateClubMembershipData(clubId, data = {}) {
    const club = this.getById('clubs', clubId);
    if (!club) return false;

    if (data.track) {
      club.track = data.track;
    }

    if (!club.membershipCheckpoints) {
      club.membershipCheckpoints = {};
    }

    if (data.checkpoints && typeof data.checkpoints === 'object') {
      Object.keys(data.checkpoints).forEach(key => {
        const val = parseInt(data.checkpoints[key], 10);
        if (!isNaN(val) && val >= 0) {
          club.membershipCheckpoints[key] = val;
        }
      });
    }

    if (data.memberCount !== undefined && data.memberCount !== null && data.memberCount !== '') {
      club.memberCount = Math.max(0, parseInt(data.memberCount, 10) || 0);
      club.membershipCheckpoints['2026-10-31'] = club.memberCount;
    } else if (club.membershipCheckpoints['2026-10-31'] !== undefined) {
      club.memberCount = club.membershipCheckpoints['2026-10-31'];
    }

    // Sync checkpoints into membershipHistory
    if (this._data.membershipHistory && Array.isArray(this._data.membershipHistory)) {
      this._data.membershipHistory.forEach(ch => {
        if (!ch.countsByClub) ch.countsByClub = {};
        if (ch.date && club.membershipCheckpoints[ch.date] !== undefined) {
          ch.countsByClub[clubId] = club.membershipCheckpoints[ch.date];
        }
        // Recalculate total checkpoint members across all clubs
        ch.totalMembers = Object.values(ch.countsByClub).reduce((sum, v) => sum + (Number(v) || 0), 0);
      });
    }

    // Sync club's district dues invoice
    const rate = this.getClubMembershipDueRate(club.track);
    const invoice = (this._data.invoices || []).find(inv => inv.clubId === clubId && inv.category === 'Membership Fees');
    if (invoice) {
      invoice.amount = club.memberCount * rate;
      invoice.description = `Annual District Membership Dues (${club.memberCount} members @ Rs. ${rate})`;
    }

    // Re-sync f15 (total settled dues from paid invoices)
    const paidDuesTotal = (this._data.invoices || [])
      .filter(inv => inv.category === 'Membership Fees' && inv.status === 'paid')
      .reduce((sum, inv) => sum + (inv.amount || 0), 0);
    const f15 = (this._data.finances || []).find(f => f.id === 'f15');
    if (f15 && paidDuesTotal > 0) {
      f15.amount = paidDuesTotal;
    }

    this.save();
    this.emit('clubs:changed');
    this.emit('invoices:changed');
    this.emit('finances:changed');
    return true;
  }

  getDistrictStats() {
    const clubs = this.getAll('clubs');
    const members = this.getAll('members');
    const projects = this.getAll('projects');
    const events = this.getAll('events');
    const totalClubMembers = clubs.reduce((sum, c) => sum + (c.memberCount || 0), 0);

    return {
      totalClubs: clubs.length,
      activeClubs: clubs.filter(c => c.status === 'active').length,
      totalMembers: totalClubMembers || members.length,
      activeMembers: totalClubMembers || members.filter(m => m.status === 'active').length,
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      totalEvents: events.length,
      avgPoints: Math.round(
        clubs.reduce((sum, c) => sum + this.getTotalClubPoints(c.id), 0) / (clubs.length || 1)
      )
    };
  }

  getInvoiceTemplate() {
    return this._data.invoiceTemplate || { fileName: 'default_district_invoice_template.html', uploadedAt: '2026-06-01' };
  }

  updateInvoiceTemplate(fileName) {
    this._data.invoiceTemplate = {
      fileName: fileName,
      uploadedAt: new Date().toISOString()
    };
    this.save();
    this.emit('invoiceTemplate:updated', this._data.invoiceTemplate);
  }

  getDistrictProfile() {
    if (!this._data.districtProfile || !Array.isArray(this._data.districtProfile.officers) || this._data.districtProfile.officers.length < 31 || this._data.districtProfile_version !== '2026_officers_v6') {
      const fresh = getDefaultData();
      this._data.districtProfile = fresh.districtProfile;
      this._data.districtProfile_version = '2026_officers_v6';
      this.save();
    }
    return this._data.districtProfile;
  }

  resetDistrictProfile() {
    const fresh = getDefaultData();
    this._data.districtProfile = fresh.districtProfile;
    this._data.districtProfile_version = '2026_officers_v6';
    this.save();
    this.emit('districtProfile:updated', this._data.districtProfile);
    return this._data.districtProfile;
  }

  updateDistrictProfile(updates) {
    this._data.districtProfile = { ...this.getDistrictProfile(), ...updates };
    this.save();
    this.emit('districtProfile:updated', this._data.districtProfile);
  }

  getMDProfile() {
    if (!this._data.mdProfile || !Array.isArray(this._data.mdProfile.officers) || this._data.mdProfile.officers.length < 28) {
      const fresh = getDefaultData();
      this._data.mdProfile = { ...fresh.mdProfile, ...(this._data.mdProfile || {}) };
      this._data.mdProfile.officers = fresh.mdProfile.officers;
      this._data.mdProfile_version = '2026_md_officers_v1';
      this.save();
    }
    return this._data.mdProfile;
  }

  resetMDProfile() {
    const fresh = getDefaultData();
    this._data.mdProfile = fresh.mdProfile;
    this._data.mdProfile_version = '2026_md_officers_v1';
    this.save();
    this.emit('mdProfile:updated', this._data.mdProfile);
    return this._data.mdProfile;
  }

  updateMDProfile(updates) {
    this._data.mdProfile = { ...this.getMDProfile(), ...updates };
    this.save();
    this.emit('mdProfile:updated', this._data.mdProfile);
  }

  getLeaderboard() {
    const clubs = store.getAll('clubs');
    return clubs
      .map(c => ({
        ...c,
        totalPoints: this.getTotalClubPoints(c.id),
        pointBreakdown: this.getClubPoints(c.id)
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  submitMonthlyPoints(clubId, clubName, month, checkedCriteria, pointsClaimed, submittedBy, proofAttachments = {}) {
    if (!this._data.pointsSubmissions) this._data.pointsSubmissions = [];
    
    // Check if there's already an active submission for this month (pending or approved)
    const existing = this._data.pointsSubmissions.find(s => s.clubId === clubId && s.month === month && s.status !== 'rejected' && s.status !== 'reversed');
    if (existing) {
      throw new Error(`A submission for ${month} is already ${existing.status}.`);
    }

    const totalPoints = Object.values(pointsClaimed).reduce((sum, v) => sum + v, 0);

    const submission = {
      id: 'ps_' + this.generateId(),
      clubId,
      clubName,
      month,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      submittedBy,
      checkedCriteria,
      pointsClaimed,
      totalPoints,
      proofAttachments: proofAttachments || {},
      reviewedBy: '',
      reviewedAt: '',
      comment: ''
    };

    this._data.pointsSubmissions.push(submission);
    this.save();
    this.emit('pointsSubmissions:created', submission);
    this.emit('pointsSubmissions:changed');
    return submission;
  }

  approvePointsSubmission(submissionId, reviewedBy, comment, adjustedPoints = null) {
    if (!this._data.pointsSubmissions) return null;
    const sub = this._data.pointsSubmissions.find(s => s.id === submissionId);
    if (!sub) return null;

    if (sub.status !== 'pending') {
      throw new Error(`Submission is already ${sub.status}.`);
    }

    if (adjustedPoints) {
      sub.pointsClaimed = adjustedPoints;
      sub.totalPoints = Object.values(adjustedPoints).reduce((sum, v) => sum + v, 0);
      sub.checkedCriteria = Object.entries(adjustedPoints)
        .filter(([_, v]) => v !== 0)
        .map(([k, _]) => k);
    }

    sub.status = 'approved';
    sub.reviewedBy = reviewedBy;
    sub.reviewedAt = new Date().toISOString();
    sub.comment = comment;

    if (!this._data.clubPoints) this._data.clubPoints = [];
    let cp = this._data.clubPoints.find(item => item.clubId === sub.clubId);
    if (!cp) {
      cp = { id: this.generateId(), clubId: sub.clubId, points: {} };
      this._data.clubPoints.push(cp);
    }

    for (const [critId, points] of Object.entries(sub.pointsClaimed)) {
      cp.points[critId] = (cp.points[critId] || 0) + points;
    }

    this.save();
    this.emit('pointsSubmissions:updated', sub);
    this.emit('pointsSubmissions:changed');
    this.emit('clubPoints:changed');
    return sub;
  }

  rejectPointsSubmission(submissionId, reviewedBy, comment) {
    if (!this._data.pointsSubmissions) return null;
    const sub = this._data.pointsSubmissions.find(s => s.id === submissionId);
    if (!sub) return null;

    if (sub.status !== 'pending') {
      throw new Error(`Submission is already ${sub.status}.`);
    }

    sub.status = 'rejected';
    sub.reviewedBy = reviewedBy;
    sub.reviewedAt = new Date().toISOString();
    sub.comment = comment;

    this.save();
    this.emit('pointsSubmissions:updated', sub);
    this.emit('pointsSubmissions:changed');
    return sub;
  }

  reversePointsSubmission(submissionId, reversedBy, reason = '', userRole = null) {
    if (userRole && userRole !== 'admin' && userRole !== 'district_president' && userRole !== 'district_vp') {
      throw new Error('Unauthorized: Only District President, District Vice President, and Super Admin can reverse reviewed submissions.');
    }
    if (!this._data.pointsSubmissions) return null;
    const sub = this._data.pointsSubmissions.find(s => s.id === submissionId);
    if (!sub) return null;

    if (sub.status !== 'approved' && sub.status !== 'rejected') {
      throw new Error('Only reviewed (approved or rejected) submissions can be reversed.');
    }

    const previousStatus = sub.status;

    // If previously approved, deduct points from clubPoints
    if (previousStatus === 'approved' && this._data.clubPoints) {
      const cp = this._data.clubPoints.find(item => item.clubId === sub.clubId);
      if (cp && cp.points && sub.pointsClaimed) {
        for (const [critId, points] of Object.entries(sub.pointsClaimed)) {
          if (cp.points[critId] !== undefined) {
            cp.points[critId] = (cp.points[critId] || 0) - (points || 0);
            if (cp.points[critId] <= 0) {
              delete cp.points[critId];
            }
          }
        }
      }
    }

    sub.status = 'reversed';
    sub.reversedBy = reversedBy;
    sub.reversedAt = new Date().toISOString();
    sub.reverseReason = reason;

    this.save();
    this.emit('pointsSubmissions:updated', sub);
    this.emit('pointsSubmissions:changed');
    if (previousStatus === 'approved') {
      this.emit('clubPoints:changed');
    }
    return sub;
  }

  getClubPointsLedger(clubId) {
    const totalPoints = this.getTotalClubPoints(clubId);
    
    const approvedSubs = (this._data.pointsSubmissions || [])
      .filter(s => s.clubId === clubId && s.status === 'approved' && s.month !== '2026-06')
      .sort((a, b) => a.month.localeCompare(b.month));
    
    const sumApproved = approvedSubs.reduce((sum, s) => sum + s.totalPoints, 0);
    const basePoints = Math.max(0, totalPoints - sumApproved);
    
    const ledger = [];
    
    ledger.push({
      month: 'Base Points',
      description: 'Points carried forward from legacy data',
      addedPoints: basePoints,
      cumulativePoints: basePoints,
      status: 'approved',
      date: '2026-05-01'
    });
    
    let runningTotal = basePoints;
    approvedSubs.forEach(sub => {
      runningTotal += sub.totalPoints;
      ledger.push({
        month: sub.month,
        description: `Monthly Points Submission`,
        addedPoints: sub.totalPoints,
        cumulativePoints: runningTotal,
        status: 'approved',
        date: sub.submittedAt
      });
    });
    
    return ledger;
  }

  // ---------- Project Categories (37 Categories across 3 Groups) ----------
  getProjectCategories(groupId = null) {
    if (!groupId || groupId === 'all') return PROJECT_CATEGORIES_DATA;
    return PROJECT_CATEGORIES_DATA.filter(c => c.groupId === groupId);
  }

  getProjectAwardGroups() {
    return PROJECT_AWARD_GROUPS;
  }

  getProjectCategory(catId) {
    return PROJECT_CATEGORIES_DATA.find(c => c.id === catId || String(c.number) === String(catId)) || null;
  }

  getProjectCategorySubmissions(clubId = null, month = null) {
    if (!this._data.projectCategorySubmissions) this._data.projectCategorySubmissions = [];
    return this._data.projectCategorySubmissions.filter(s => {
      if (s.month === '2026-06') return false;
      if (clubId && s.clubId !== clubId) return false;
      if (month && month !== 'all' && s.month !== month) return false;
      return true;
    });
  }

  submitProjectCategoryClaims(clubId, clubName, month, subClaims, submittedBy) {
    if (!this._data.projectCategorySubmissions) this._data.projectCategorySubmissions = [];

    // Calculate completed categories using checkCategoryCompletion
    const completedCategories = [];
    PROJECT_CATEGORIES_DATA.forEach(cat => {
      const check = checkCategoryCompletion(cat, subClaims);
      if (check.isComplete) {
        completedCategories.push({
          categoryId: cat.id,
          categoryNumber: cat.number,
          categoryName: cat.name,
          groupId: cat.groupId,
          fulfilledCount: check.fulfilledCount,
          totalCount: check.totalCount
        });
      }
    });

    const existingIdx = this._data.projectCategorySubmissions.findIndex(
      s => s.clubId === clubId && s.month === month
    );

    const submission = {
      id: existingIdx >= 0 ? this._data.projectCategorySubmissions[existingIdx].id : 'pcs_' + this.generateId(),
      clubId,
      clubName,
      month,
      status: 'approved',
      submittedAt: new Date().toISOString(),
      submittedBy: submittedBy || 'Club Officer',
      subClaims: subClaims || {},
      completedCategories,
      completedCount: completedCategories.length,
      totalPossible: PROJECT_CATEGORIES_DATA.length
    };

    if (existingIdx >= 0) {
      this._data.projectCategorySubmissions[existingIdx] = submission;
    } else {
      this._data.projectCategorySubmissions.push(submission);
    }

    this.save();
    this.emit('projectCategorySubmissions:changed');
    return submission;
  }

  getMonthlyCategoryCompletionStats(month = null) {
    const subs = this.getProjectCategorySubmissions(null, month);
    const clubs = this.getAll('clubs') || [];
    
    // Per-category completion count across clubs
    const categoryStats = {};
    PROJECT_CATEGORIES_DATA.forEach(cat => {
      categoryStats[cat.id] = {
        category: cat,
        completedClubCount: 0,
        completingClubs: []
      };
    });

    // Group stats
    const groupStats = {
      project_awards: { totalCategories: 24, completedSum: 0, completedClubs: new Set() },
      joint_project_awards: { totalCategories: 6, completedSum: 0, completedClubs: new Set() },
      lions_global_service: { totalCategories: 7, completedSum: 0, completedClubs: new Set() }
    };

    subs.forEach(s => {
      (s.completedCategories || []).forEach(cc => {
        if (categoryStats[cc.categoryId]) {
          categoryStats[cc.categoryId].completedClubCount++;
          categoryStats[cc.categoryId].completingClubs.push({
            clubId: s.clubId,
            clubName: s.clubName,
            month: s.month,
            submittedAt: s.submittedAt
          });
        }
        if (groupStats[cc.groupId]) {
          groupStats[cc.groupId].completedSum++;
          groupStats[cc.groupId].completedClubs.add(s.clubId);
        }
      });
    });

    return {
      month: month || 'all',
      totalSubmissions: subs.length,
      totalClubs: clubs.length,
      categoryStats,
      groupStats: {
        project_awards: {
          totalCategories: groupStats.project_awards.totalCategories,
          completedSum: groupStats.project_awards.completedSum,
          activeClubCount: groupStats.project_awards.completedClubs.size
        },
        joint_project_awards: {
          totalCategories: groupStats.joint_project_awards.totalCategories,
          completedSum: groupStats.joint_project_awards.completedSum,
          activeClubCount: groupStats.joint_project_awards.completedClubs.size
        },
        lions_global_service: {
          totalCategories: groupStats.lions_global_service.totalCategories,
          completedSum: groupStats.lions_global_service.completedSum,
          activeClubCount: groupStats.lions_global_service.completedClubs.size
        }
      }
    };
  }
}

export const store = new Store();
