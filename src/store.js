// ============================================
// LEO NEXUS PORTAL — DATA STORE
// LocalStorage persistence + seed data
// ============================================

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
      { id: 'u7', email: 'president.iit@leo.org', password: 'sithuli123', name: 'Leo Lion Sithuli Amunuthuduwa', role: 'club_president', clubId: 'c6', avatar: 'SA', createdAt: '2026-06-18' }
    ],

    clubs: [
      {
        id: 'c1',
        name: 'Leo Club of Sapphire Coast',
        code: 'LC-024',
        president: 'Kasun Perera',
        charter_date: '2024-03-15',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 32,
        email: 'sapphire@leo.org',
        phone: '+94 77 123 4567',
        meetingDay: 'Every Saturday',
        description: 'A vibrant Leo club dedicated to community service and youth leadership development.'
      },
      {
        id: 'c2',
        name: 'Leo Club of Phoenix Rising',
        code: 'LC-025',
        president: 'Amaya Silva',
        charter_date: '2023-08-20',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 28,
        email: 'phoenix@leo.org',
        phone: '+94 77 234 5678',
        meetingDay: 'Every Sunday',
        description: 'Committed to serving communities through innovative projects and teamwork.'
      },
      {
        id: 'c7',
        name: 'Leo Club of University of Colombo Faculty of Science',
        code: 'LC-003',
        president: 'Dulani Bandara',
        charter_date: '2025-02-15',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 35,
        email: 'fos@leo.org',
        phone: '+94 77 111 2222',
        meetingDay: 'Every Monday',
        description: 'Empowering science students to lead and serve the community.'
      },
      {
        id: 'c3',
        name: 'Leo Club of Horizon',
        code: 'LC-021',
        president: 'Nimal Fernando',
        charter_date: '2025-01-10',
        zone: 'B1',
        region: 'B',
        status: 'active',
        memberCount: 20,
        email: 'horizon@leo.org',
        phone: '+94 77 345 6789',
        meetingDay: 'Every Friday',
        description: 'Focusing on environmental sustainability and educational empowerment.'
      },
      {
        id: 'c4',
        name: 'Leo Club of Aurora',
        code: 'LC-022',
        president: 'Tharindu Jayawardena',
        charter_date: '2024-11-05',
        zone: 'B2',
        region: 'B',
        status: 'active',
        memberCount: 25,
        email: 'aurora@leo.org',
        phone: '+94 77 456 7890',
        meetingDay: 'Every Saturday',
        description: 'Driven by creativity and compassion, making a difference one project at a time.'
      },
      {
        id: 'c5',
        name: 'Leo Club of Nebula',
        code: 'LC-023',
        president: 'Dilshan Bandara',
        charter_date: '2025-06-01',
        zone: 'B1',
        region: 'B',
        status: 'inactive',
        memberCount: 15,
        email: 'nebula@leo.org',
        phone: '+94 77 567 8901',
        meetingDay: 'Every Sunday',
        description: 'A newly chartered club aiming to expand outreach and membership.'
      },
      {
        id: 'c6',
        name: 'Leo Club of Informatics Institute of Technology',
        code: 'LC-001',
        president: 'Sahan Fernando',
        charter_date: '2025-05-10',
        zone: 'A1',
        region: 'A',
        status: 'active',
        memberCount: 22,
        email: 'iit@leo.org',
        phone: '+94 77 987 6543',
        meetingDay: 'Every Wednesday',
        description: 'Fostering technology-driven service and leadership at Informatics Institute of Technology.'
      },
      {
        id: 'c8',
        name: 'Leo Club of University of Colombo Faculty of Arts',
        code: 'LC-002',
        president: 'Heshan Perera',
        charter_date: '2025-03-20',
        zone: 'A2',
        region: 'A',
        status: 'active',
        memberCount: 40,
        email: 'foa@leo.org',
        phone: '+94 77 333 4444',
        meetingDay: 'Every Tuesday',
        description: 'Promoting social harmony and leadership development through creative service.'
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
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
    ],

    members: [
      // Sapphire Coast members
      { id: 'm1', clubId: 'c1', name: 'Kasun Perera', role: 'President', status: 'active', joinDate: '2024-03-15', phone: '+94 77 100 0001', email: 'kasun@email.com' },
      { id: 'm2', clubId: 'c1', name: 'Sanduni Rajapaksa', role: 'Secretary', status: 'active', joinDate: '2024-03-15', phone: '+94 77 100 0002', email: 'sanduni@email.com' },
      { id: 'm3', clubId: 'c1', name: 'Dinesh Kumara', role: 'Treasurer', status: 'active', joinDate: '2024-04-01', phone: '+94 77 100 0003', email: 'dinesh@email.com' },
      { id: 'm4', clubId: 'c1', name: 'Ishara Wickrama', role: 'Member', status: 'active', joinDate: '2024-05-10', phone: '+94 77 100 0004', email: 'ishara@email.com' },
      { id: 'm5', clubId: 'c1', name: 'Tharushi Gamage', role: 'Member', status: 'active', joinDate: '2024-06-20', phone: '+94 77 100 0005', email: 'tharushi@email.com' },
      { id: 'm6', clubId: 'c1', name: 'Ravindu Seneviratne', role: 'VP', status: 'active', joinDate: '2024-03-15', phone: '+94 77 100 0006', email: 'ravindu@email.com' },
      { id: 'm7', clubId: 'c1', name: 'Chamari Herath', role: 'Member', status: 'inactive', joinDate: '2024-07-01', phone: '+94 77 100 0007', email: 'chamari@email.com' },
      { id: 'm8', clubId: 'c1', name: 'Lakshan Peris', role: 'Member', status: 'active', joinDate: '2025-01-15', phone: '+94 77 100 0008', email: 'lakshan@email.com' },
      // Phoenix Rising members
      { id: 'm9', clubId: 'c2', name: 'Amaya Silva', role: 'President', status: 'active', joinDate: '2023-08-20', phone: '+94 77 200 0001', email: 'amaya@email.com' },
      { id: 'm10', clubId: 'c2', name: 'Nuwan Jayasuriya', role: 'Secretary', status: 'active', joinDate: '2023-08-20', phone: '+94 77 200 0002', email: 'nuwan@email.com' },
      { id: 'm11', clubId: 'c2', name: 'Kavindi Rathnayake', role: 'Treasurer', status: 'active', joinDate: '2023-09-01', phone: '+94 77 200 0003', email: 'kavindi@email.com' },
      { id: 'm12', clubId: 'c2', name: 'Shehan Gunasekara', role: 'Member', status: 'active', joinDate: '2024-01-10', phone: '+94 77 200 0004', email: 'shehan@email.com' },
      // Horizon members
      { id: 'm13', clubId: 'c3', name: 'Nimal Fernando', role: 'President', status: 'active', joinDate: '2025-01-10', phone: '+94 77 300 0001', email: 'nimal@email.com' },
      { id: 'm14', clubId: 'c3', name: 'Rashika Mendis', role: 'Secretary', status: 'active', joinDate: '2025-01-10', phone: '+94 77 300 0002', email: 'rashika@email.com' },
      { id: 'm15', clubId: 'c3', name: 'Chamara Weerasinghe', role: 'Member', status: 'active', joinDate: '2025-02-20', phone: '+94 77 300 0003', email: 'chamara@email.com' },
      // UOC Faculty of Science members
      { id: 'm16', clubId: 'c7', name: 'Dulani Bandara', role: 'President', status: 'active', joinDate: '2025-02-15', phone: '+94 77 111 2222', email: 'dulani@email.com' },
      { id: 'm17', clubId: 'c7', name: 'Kavinda Perera', role: 'Secretary', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2223', email: 'kavinda@email.com' },
      { id: 'm18', clubId: 'c7', name: 'Minoli Silva', role: 'Treasurer', status: 'active', joinDate: '2025-02-20', phone: '+94 77 111 2224', email: 'minoli@email.com' },
      { id: 'm19', clubId: 'c7', name: 'Ruwan Kumara', role: 'VP', status: 'active', joinDate: '2025-03-01', phone: '+94 77 111 2225', email: 'ruwan@email.com' },
      { id: 'm20', clubId: 'c7', name: 'Shalini Fernando', role: 'Member', status: 'active', joinDate: '2025-03-10', phone: '+94 77 111 2226', email: 'shalini@email.com' },
      // UOC Faculty of Arts members
      { id: 'm21', clubId: 'c8', name: 'Heshan Perera', role: 'President', status: 'active', joinDate: '2025-03-20', phone: '+94 77 333 4444', email: 'heshan@email.com' },
      { id: 'm22', clubId: 'c8', name: 'Nipuni Jayasinghe', role: 'Secretary', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4445', email: 'nipuni@email.com' },
      { id: 'm23', clubId: 'c8', name: 'Sajith De Silva', role: 'Treasurer', status: 'active', joinDate: '2025-03-22', phone: '+94 77 333 4446', email: 'sajith@email.com' },
      { id: 'm24', clubId: 'c8', name: 'Pooja Rajapakse', role: 'VP', status: 'active', joinDate: '2025-04-05', phone: '+94 77 333 4447', email: 'pooja@email.com' },
      { id: 'm25', clubId: 'c8', name: 'Dilshan Perera', role: 'Member', status: 'active', joinDate: '2025-04-10', phone: '+94 77 333 4448', email: 'dilshan@email.com' },
      // Colombo Host members
      { id: 'm26', clubId: 'c9', name: 'Amesh Silva', role: 'President', status: 'active', joinDate: '2020-05-10', phone: '+94 77 123 0001', email: 'amesh@email.com' },
      { id: 'm27', clubId: 'c9', name: 'Janaki Perera', role: 'Secretary', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0011', email: 'janaki@email.com' },
      { id: 'm28', clubId: 'c9', name: 'Tharindu Silva', role: 'Treasurer', status: 'active', joinDate: '2020-05-15', phone: '+94 77 123 0012', email: 'tharindu@email.com' },
      // Colombo Millennium members
      { id: 'm29', clubId: 'c10', name: 'Ruvini Perera', role: 'President', status: 'active', joinDate: '2021-06-15', phone: '+94 77 123 0002', email: 'ruvini@email.com' },
      { id: 'm30', clubId: 'c10', name: 'Saman Kumara', role: 'Secretary', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0021', email: 'saman@email.com' },
      { id: 'm31', clubId: 'c10', name: 'Nipuni Jayasuriya', role: 'Treasurer', status: 'active', joinDate: '2021-06-20', phone: '+94 77 123 0022', email: 'nipuni.j@email.com' },
      // Colombo Six New Stars members
      { id: 'm32', clubId: 'c11', name: 'Kavindu Fernando', role: 'President', status: 'active', joinDate: '2023-08-20', phone: '+94 77 123 0003', email: 'kavindu.f@email.com' },
      { id: 'm33', clubId: 'c11', name: 'Hashini Alwis', role: 'Secretary', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0031', email: 'hashini@email.com' },
      { id: 'm34', clubId: 'c11', name: 'Roshan De Silva', role: 'Treasurer', status: 'active', joinDate: '2023-08-25', phone: '+94 77 123 0032', email: 'roshan@email.com' },
      // UOC Alumni members
      { id: 'm35', clubId: 'c12', name: 'Dulaj Senanayake', role: 'President', status: 'active', joinDate: '2024-10-01', phone: '+94 77 123 0004', email: 'dulaj@email.com' },
      { id: 'm36', clubId: 'c12', name: 'Menaka Jayawardena', role: 'Secretary', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0041', email: 'menaka@email.com' },
      { id: 'm37', clubId: 'c12', name: 'Piyumi Fernando', role: 'Treasurer', status: 'active', joinDate: '2024-10-05', phone: '+94 77 123 0042', email: 'piyumi@email.com' },
      // UOC FOA Alumni members
      { id: 'm38', clubId: 'c13', name: 'Sanduni Jayawardena', role: 'President', status: 'active', joinDate: '2025-01-15', phone: '+94 77 123 0005', email: 'sanduni.j@email.com' },
      { id: 'm39', clubId: 'c13', name: 'Chathura Rajapakse', role: 'Secretary', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0051', email: 'chathura@email.com' },
      { id: 'm40', clubId: 'c13', name: 'Dilani Gamage', role: 'Treasurer', status: 'active', joinDate: '2025-01-20', phone: '+94 77 123 0052', email: 'dilani@email.com' },
      // Prince of Wales members
      { id: 'm41', clubId: 'c14', name: 'Devinda Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0014', email: 'devinda@email.com' },
      { id: 'm42', clubId: 'c14', name: 'Janith Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0114', email: 'janith@email.com' },
      { id: 'm43', clubId: 'c14', name: 'Lahiru Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0214', email: 'lahiru@email.com' },
      // Princess of Wales members
      { id: 'm44', clubId: 'c15', name: 'Shehani Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0015', email: 'shehani@email.com' },
      { id: 'm45', clubId: 'c15', name: 'Amanda Silva', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0115', email: 'amanda@email.com' },
      { id: 'm46', clubId: 'c15', name: 'Dilini Peiris', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0215', email: 'dilini.p@email.com' },
      // Sri Sumangala members
      { id: 'm47', clubId: 'c16', name: 'Kusal Mendis', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0016', email: 'kusal@email.com' },
      { id: 'm48', clubId: 'c16', name: 'Tharindu Rajapakse', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0116', email: 'tharindu.r@email.com' },
      { id: 'm49', clubId: 'c16', name: 'Ruchira De Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0216', email: 'ruchira@email.com' },
      // Kalutara Vidyalaya members
      { id: 'm50', clubId: 'c17', name: 'Dilan Perera', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0017', email: 'dilan@email.com' },
      { id: 'm51', clubId: 'c17', name: 'Kavindu Jayasinghe', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0117', email: 'kavindu.j@email.com' },
      { id: 'm52', clubId: 'c17', name: 'Sajith Cooray', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0217', email: 'sajith.c@email.com' },
      // Kalutara Balika members
      { id: 'm53', clubId: 'c18', name: 'Nethmi Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0018', email: 'nethmi@email.com' },
      { id: 'm54', clubId: 'c18', name: 'Piyumi Jayawardena', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0118', email: 'piyumi.j@email.com' },
      { id: 'm55', clubId: 'c18', name: 'Hansini Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0218', email: 'hansini@email.com' },
      // Moratuwa 2020 members
      { id: 'm56', clubId: 'c19', name: 'Sahan Jayasuriya', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0019', email: 'sahan.j@email.com' },
      { id: 'm57', clubId: 'c19', name: 'Asanka Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0119', email: 'asanka@email.com' },
      { id: 'm58', clubId: 'c19', name: 'Thilina Mendis', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0219', email: 'thilina.m@email.com' },
      // Royal Achievers members
      { id: 'm59', clubId: 'c20', name: 'Praveen Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0020', email: 'praveen@email.com' },
      { id: 'm60', clubId: 'c20', name: 'Gayan Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0120', email: 'gayan@email.com' },
      { id: 'm61', clubId: 'c20', name: 'Harsha Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0220', email: 'harsha@email.com' },
      // Moratuwa Ratmalana members
      { id: 'm62', clubId: 'c21', name: 'Ruwantha Fernando', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0021', email: 'ruwantha@email.com' },
      { id: 'm63', clubId: 'c21', name: 'Kasun Peiris', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0121', email: 'kasun.p@email.com' },
      { id: 'm64', clubId: 'c21', name: 'Mahesh Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0221', email: 'mahesh@email.com' },
      // Cosmopolitan Creators members
      { id: 'm65', clubId: 'c22', name: 'Dilini Cooray', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0022', email: 'dilini.c@email.com' },
      { id: 'm66', clubId: 'c22', name: 'Supun Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0122', email: 'supun@email.com' },
      { id: 'm67', clubId: 'c22', name: 'Ishara Perera', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0222', email: 'ishara.p@email.com' },
      // Mount Lavinia Orient Centennial members
      { id: 'm68', clubId: 'c23', name: 'Senura De Silva', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0023', email: 'senura@email.com' },
      { id: 'm69', clubId: 'c23', name: 'Menaka Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0123', email: 'menaka.f@email.com' },
      { id: 'm70', clubId: 'c23', name: 'Ravindu Silva', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0223', email: 'ravindu.s@email.com' },
      // Moratuwa members
      { id: 'm71', clubId: 'c24', name: 'Thilina Perera', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0024', email: 'thilina@email.com' },
      { id: 'm72', clubId: 'c24', name: 'Chamara Fernando', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0124', email: 'chamara.f@email.com' },
      { id: 'm73', clubId: 'c24', name: 'Sandun Peiris', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0224', email: 'sandun@email.com' },
      // KDU members
      { id: 'm74', clubId: 'c25', name: 'Kasun Jayawardena', role: 'President', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0025', email: 'kasun.j@email.com' },
      { id: 'm75', clubId: 'c25', name: 'Nimna Perera', role: 'Secretary', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0125', email: 'nimna@email.com' },
      { id: 'm76', clubId: 'c25', name: 'Dulaj Fernando', role: 'Treasurer', status: 'active', joinDate: '2026-06-15', phone: '+94 77 123 0225', email: 'dulaj.f@email.com' }
    ],

    finances: [
      // Sapphire Coast finances
      { id: 'f1', clubId: 'c1', type: 'income', category: 'Membership Fees', amount: 45000, date: '2026-01-05', description: 'Annual membership collection', reference: 'MF-001' },
      { id: 'f2', clubId: 'c1', type: 'income', category: 'Sponsorship', amount: 75000, date: '2026-01-20', description: 'Corporate sponsor - ABC Corp', reference: 'SP-001' },
      { id: 'f3', clubId: 'c1', type: 'income', category: 'Fundraising', amount: 32000, date: '2026-02-14', description: 'Valentine charity dinner proceeds', reference: 'FR-001' },
      { id: 'f4', clubId: 'c1', type: 'expense', category: 'Events', amount: 28000, date: '2026-02-14', description: 'Valentine charity dinner costs', reference: 'EX-001' },
      { id: 'f5', clubId: 'c1', type: 'expense', category: 'Administration', amount: 5000, date: '2026-01-10', description: 'Stationery and printing', reference: 'EX-002' },
      { id: 'f6', clubId: 'c1', type: 'income', category: 'Donations', amount: 20000, date: '2026-03-01', description: 'Individual donor contribution', reference: 'DN-001' },
      { id: 'f7', clubId: 'c1', type: 'expense', category: 'Projects', amount: 35000, date: '2026-03-15', description: 'School renovation project materials', reference: 'EX-003' },
      { id: 'f8', clubId: 'c1', type: 'expense', category: 'Travel', amount: 12000, date: '2026-04-01', description: 'District convention transport', reference: 'EX-004' },
      { id: 'f9', clubId: 'c1', type: 'income', category: 'Fundraising', amount: 55000, date: '2026-04-20', description: 'Annual fundraising gala', reference: 'FR-002' },
      { id: 'f10', clubId: 'c1', type: 'expense', category: 'Events', amount: 22000, date: '2026-04-20', description: 'Gala event expenses', reference: 'EX-005' },
      // Phoenix Rising finances
      { id: 'f11', clubId: 'c2', type: 'income', category: 'Membership Fees', amount: 38000, date: '2026-01-10', description: 'Annual membership fees', reference: 'MF-001' },
      { id: 'f12', clubId: 'c2', type: 'income', category: 'Sponsorship', amount: 50000, date: '2026-02-01', description: 'Sponsor - XYZ Ltd', reference: 'SP-001' },
      { id: 'f13', clubId: 'c2', type: 'expense', category: 'Projects', amount: 40000, date: '2026-03-10', description: 'Community health camp', reference: 'EX-001' },
      { id: 'f14', clubId: 'c2', type: 'expense', category: 'Administration', amount: 8000, date: '2026-02-15', description: 'Office supplies and meeting costs', reference: 'EX-002' },
      // District-level finances
      { id: 'f15', clubId: 'district', type: 'income', category: 'Membership Fees', amount: 150000, date: '2026-01-10', description: 'Consolidated district dues from clubs', reference: 'DIST-INC-001' },
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
        description: 'Comprehensive school of instruction for all club presidents, secretaries, and treasurers in District 306 B2.',
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
      { id: 'p1', clubId: 'c1', name: 'School Renovation Drive', category: 'Education', status: 'completed', startDate: '2026-02-01', endDate: '2026-03-15', participants: 24, budget: 35000, description: 'Renovated classrooms and library at Gamini Maha Vidyalaya.', impact: '350 students benefited' },
      { id: 'p2', clubId: 'c1', name: 'Beach Cleanup Campaign', category: 'Environment', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 30, budget: 5000, description: 'Organized coastal cleanup along 2km stretch.', impact: '500kg waste collected' },
      { id: 'p3', clubId: 'c1', name: 'Blood Donation Camp', category: 'Health', status: 'in_progress', startDate: '2026-06-20', endDate: '2026-06-20', participants: 20, budget: 15000, description: 'Annual blood donation campaign in partnership with National Blood Bank.', impact: 'Target: 100 pints' },
      { id: 'p4', clubId: 'c1', name: 'Youth Leadership Workshop', category: 'Leadership', status: 'planned', startDate: '2026-07-10', endDate: '2026-07-12', participants: 0, budget: 25000, description: 'Three-day leadership development workshop for Leo members.', impact: 'Expected: 50 participants' },
      { id: 'p5', clubId: 'c2', name: 'Community Health Screening', category: 'Health', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 22, budget: 40000, description: 'Free medical screening camp for underprivileged communities.', impact: '200+ people screened' },
      { id: 'p6', clubId: 'c2', name: 'Tree Planting Initiative', category: 'Environment', status: 'completed', startDate: '2026-04-22', endDate: '2026-04-22', participants: 28, budget: 10000, description: 'Earth Day tree planting across 3 locations.', impact: '500 trees planted' },
      { id: 'p7', clubId: 'c3', name: 'Digital Literacy Program', category: 'Education', status: 'in_progress', startDate: '2026-05-01', endDate: '2026-08-30', participants: 15, budget: 30000, description: 'Teaching basic computer skills to rural youth.', impact: 'Ongoing: 60 students enrolled' },
      // UOC Faculty of Science projects
      { id: 'p8', clubId: 'c7', name: 'Science Day Exhibition', category: 'Education', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 25, budget: 25000, description: 'Organized science exhibition for school children.', impact: '150+ students attended' },
      { id: 'p9', clubId: 'c7', name: 'Lab Safety Seminar', category: 'Health', status: 'in_progress', startDate: '2026-06-15', endDate: '2026-06-15', participants: 18, budget: 5000, description: 'Lab safety and first aid training for university students.', impact: 'Ongoing: 40 students enrolled' },
      // UOC Faculty of Arts projects
      { id: 'p10', clubId: 'c8', name: 'Art Therapy Workshop', category: 'Health', status: 'completed', startDate: '2026-03-05', endDate: '2026-03-05', participants: 20, budget: 15000, description: 'Conducted art therapy workshop for mental well-being.', impact: '30+ participants benefited' },
      { id: 'p11', clubId: 'c8', name: 'Cultural Heritage Exhibition', category: 'Education', status: 'planned', startDate: '2026-07-25', endDate: '2026-07-26', participants: 0, budget: 20000, description: 'Exhibition showcasing traditional Sri Lankan arts and crafts.', impact: 'Expected: 200+ visitors' },
      // Colombo Host projects
      { id: 'p12', clubId: 'c9', name: 'Community Kitchen', category: 'Health', status: 'completed', startDate: '2026-04-10', endDate: '2026-04-10', participants: 15, budget: 18000, description: 'Provided meals to families in need.', impact: '100+ meals served' },
      // Colombo Millennium projects
      { id: 'p13', clubId: 'c10', name: 'Youth Career Fair', category: 'Education', status: 'completed', startDate: '2026-05-15', endDate: '2026-05-15', participants: 25, budget: 35000, description: 'Career fair for school leavers.', impact: '200+ youth participated' },
      // Colombo Six New Stars projects
      { id: 'p14', clubId: 'c11', name: 'Street Animal Welfare', category: 'Environment', status: 'completed', startDate: '2026-03-20', endDate: '2026-03-20', participants: 12, budget: 8000, description: 'Feeding and vaccination drive for stray dogs.', impact: '40 stray dogs treated' },
      // UOC Alumni projects
      { id: 'p15', clubId: 'c12', name: 'Scholar Mentorship', category: 'Education', status: 'in_progress', startDate: '2026-05-01', endDate: '2026-07-01', participants: 10, budget: 12000, description: 'Mentoring university freshmen.', impact: 'Ongoing: 25 mentees' },
      // UOC FOA Alumni projects
      { id: 'p16', clubId: 'c13', name: 'Heritage Preservation', category: 'Education', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 14, budget: 15000, description: 'Preserving local folklore stories digital archive.', impact: '50 folktales archived' },
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
        read: ['c1']
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
        content: 'All Zone A1 clubs are invited to attend the quarterly joint meeting on June 25, 2026 at 4:00 PM. Venue: Lions Hall, Galle. Agenda includes zone project planning and inter-club collaboration opportunities.',
        priority: 'normal',
        targetClubs: ['c1', 'c3'],
        createdAt: '2026-06-14',
        author: 'Zone Chairperson',
        read: []
      },
      {
        id: 'a5',
        title: 'Congratulations to Leo Club of Sapphire Coast!',
        content: 'We congratulate the Leo Club of Sapphire Coast for winning the Best Community Project Award for their School Renovation Drive. Outstanding work by the entire club!',
        priority: 'normal',
        targetClubs: 'all',
        createdAt: '2026-05-28',
        author: 'District Governor',
        read: ['c1', 'c2']
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
          { clubId: 'c1', participants: ['m1', 'm2', 'm6'], registeredAt: '2026-06-05', status: 'confirmed' },
          { clubId: 'c2', participants: ['m9', 'm10'], registeredAt: '2026-06-08', status: 'confirmed' },
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
          { clubId: 'c1', participants: ['m1', 'm4', 'm5', 'm8'], registeredAt: '2026-06-12', status: 'confirmed' },
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
          { clubId: 'c1', participants: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm8'], registeredAt: '2026-06-15', status: 'confirmed' },
          { clubId: 'c2', participants: ['m9', 'm10', 'm11', 'm12'], registeredAt: '2026-06-16', status: 'pending' },
          { clubId: 'c3', participants: ['m13', 'm14', 'm15'], registeredAt: '2026-06-16', status: 'confirmed' },
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
      {
        clubId: 'c1',
        points: {
          ad1_1: 10000, ad1_2: 100000, ad1_3: 10000, ad1_6: 1000000,
          ad2_3: 500000, ad2_4: 1000000,
          ad3_1_1: 100000, ad3_5_1: 500000,
          ac1_3: 50000, ac2_1: 200000, ac3_1: 1000000,
          int1_1: 15000, int3_1: 10000,
          sp1_1: 100000, sp2_1: 100000,
          cul1_1: 50000, tech1_1: 60000,
          sp4_1: -100000
        }
      },
      {
        clubId: 'c2',
        points: {
          ad1_1: 10000, ad1_2: 100000, ad1_6: 1000000,
          ad2_3: 500000,
          ad3_1_2: 50000, ad3_5_2: 500000,
          ac1_2: 10000, ac2_2: 50000, ac3_2: 100000,
          int1_1: 10000, int3_2: 8000,
          sp1_2: 150000,
          sp4_2: -100000
        }
      },
      {
        clubId: 'c3',
        points: {
          ad1_1: 10000, ad1_3: 10000,
          ad2_1: 10000, ad2_5: 200000,
          ad3_2_1: 20000, ad3_6_3: 200000,
          ac1_3: 50000, ac2_3: 100000, ac3_3: 500000,
          int2_1: 5000, int4_1: 5000,
          sp2_2: 150000,
          sp4_3: -100000
        }
      },
      {
        clubId: 'c4',
        points: {
          ad1_1: 10000, ad1_2: 100000,
          ad2_3: 500000,
          ad3_3_1: 50000, ad3_4_1: 10000,
          ac1_4: 100000, ac2_4: 100000,
          int1_2: 5000, int5_1: 20000,
          sp1_3: 100000,
          sp4_4: -20000
        }
      },
      {
        clubId: 'c5',
        points: {
          ad1_3: 10000,
          ad2_2: 10000,
          ad3_1_3: 50000,
          ac2_2: 50000,
          int2_2: 2000,
          sp2_3: 100000,
          sp4_5: -100000
        }
      },
      {
        clubId: 'c6',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000, sp1_1: 100000
        }
      },
      {
        clubId: 'c7',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c8',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c9',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c10',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c11',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c12',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      {
        clubId: 'c13',
        points: {
          ad1_1: 10000, ad1_3: 10000, ad2_1: 10000
        }
      },
      { clubId: 'c14', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c15', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c16', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c17', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c18', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c19', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c20', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c21', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c22', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c23', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c24', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
      { clubId: 'c25', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } }
    ],
    memberPayments: [
      { id: 'mp1', eventId: 'e1', clubId: 'c1', memberId: 'm1', name: 'Kasun Perera', amount: 1000, status: 'paid', date: '2026-06-05', method: 'Bank Transfer', reference: 'REF-M-101', registrationStatus: 'approved', paymentStatus: 'paid' },
      { id: 'mp2', eventId: 'e1', clubId: 'c1', memberId: 'm2', name: 'Sanduni Rajapaksa', amount: 1000, status: 'paid', date: '2026-06-06', method: 'Cash', reference: 'REF-M-102', registrationStatus: 'approved', paymentStatus: 'paid' },
      { id: 'mp3', eventId: 'e1', clubId: 'c1', memberId: 'm6', name: 'Ravindu Seneviratne', amount: 1000, status: 'pending', date: '2026-06-12', method: 'Bank Transfer', reference: 'REF-M-103', registrationStatus: 'pending', paymentStatus: 'unpaid' }
    ],
    clubPayments: [
      { id: 'cp1', eventId: 'e1', clubId: 'c1', amount: 3000, status: 'paid', date: '2026-06-12', method: 'Bank Deposit', reference: 'REF-DIST-101', receiptUrl: 'receipt_c1_e1.png', registeredCount: 3 }
    ],
    clubEventSettings: [
      { id: 'ces1', clubId: 'c1', eventId: 'e1', visibleToMembers: true },
      { id: 'ces2', clubId: 'c1', eventId: 'e2', visibleToMembers: true },
      { id: 'ces3', clubId: 'c1', eventId: 'e3', visibleToMembers: false },
      { id: 'ces4', clubId: 'c1', eventId: 'e4', visibleToMembers: true }
    ],
    invoices: [
      {
        id: 'inv1',
        invoiceNumber: 'INV-2026-001',
        clubId: 'c1',
        clubName: 'Leo Club of Sapphire Coast',
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
        id: 'inv2',
        invoiceNumber: 'INV-2026-002',
        clubId: 'c2',
        clubName: 'Leo Club of Phoenix Rising',
        amount: 12000,
        issueDate: '2026-06-01',
        dueDate: '2026-06-30',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
        category: 'Membership Fees',
        status: 'paid',
        receiptUrl: 'receipt_c2_dues.png',
        reference: 'DEP-90801',
        remarks: 'Approved by District Treasurer',
        eventId: null
      },
      {
        id: 'inv3',
        invoiceNumber: 'INV-2026-003',
        clubId: 'c3',
        clubName: 'Leo Club of Horizon',
        amount: 10000,
        issueDate: '2026-06-05',
        dueDate: '2026-06-25',
        description: 'District Conference Admin & Levy Fee',
        category: 'Conference Levy',
        status: 'pending',
        receiptUrl: 'receipt_c3_levy.png',
        reference: 'DEP-88923',
        remarks: '',
        eventId: 'e1'
      },
      {
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
      },
      {
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
      },
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
      },
      {
        id: 'inv11',
        invoiceNumber: 'INV-2026-011',
        clubId: 'c14',
        clubName: 'Leo Club of Prince of Wales’ College',
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
        amount: 15000,
        issueDate: '2026-06-15',
        dueDate: '2026-07-15',
        description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
      title: 'Leo District 306 B2',
      tagline: 'Serve with Passion, Lead with Integrity',
      description: 'Leo District 306 B2 Sri Lanka spans over a wide network of active Leo clubs in Colombo, Gampaha, and the North-Western province. We guide and empower young leaders to execute sustainable service projects that make a difference.',
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
    pointsSubmissions: [
      {
        id: "ps_1",
        clubId: "c1",
        clubName: "Leo Club of Sapphire Coast",
        month: "2026-05",
        status: "approved",
        submittedAt: "2026-05-08T14:30:00Z",
        submittedBy: "Kasun Perera",
        checkedCriteria: ["ad1_1", "ad1_3", "ad2_1", "sp1_1"],
        pointsClaimed: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000, sp1_1: 100000 },
        totalPoints: 130000,
        proofAttachments: {
          ad1_1: [{ name: "May_2026_MAR_Report.pdf", type: "application/pdf", size: "1.4 MB", url: "#" }],
          sp1_1: [{ name: "Event_Attendance_List.jpg", type: "image/jpeg", size: "850 KB", url: "#" }]
        },
        reviewedBy: "District President",
        reviewedAt: "2026-05-10T09:15:00Z",
        comment: "All monthly reports submitted on time. Approved!"
      },
      {
        id: "ps_2",
        clubId: "c2",
        clubName: "Leo Club of Phoenix Rising",
        month: "2026-05",
        status: "approved",
        submittedAt: "2026-05-09T18:45:00Z",
        submittedBy: "Amaya Silva",
        checkedCriteria: ["ad1_1", "ad2_1", "sp1_2"],
        pointsClaimed: { ad1_1: 10000, ad2_1: 10000, sp1_2: 150000 },
        totalPoints: 170000,
        proofAttachments: {
          ad2_1: [{ name: "MTR_Receipt_May.pdf", type: "application/pdf", size: "920 KB", url: "#" }]
        },
        reviewedBy: "District President",
        reviewedAt: "2026-05-10T09:20:00Z",
        comment: "MAR and MTR approved."
      },
      {
        id: "ps_3",
        clubId: "c3",
        clubName: "Leo Club of Horizon",
        month: "2026-05",
        status: "pending",
        submittedAt: "2026-06-05T10:15:00Z",
        submittedBy: "Nimal Fernando",
        checkedCriteria: ["ad1_1", "ad1_3"],
        pointsClaimed: { ad1_1: 10000, ad1_3: 10000 },
        totalPoints: 20000,
        proofAttachments: {
          ad1_1: [{ name: "Horizon_Activity_Proof.pdf", type: "application/pdf", size: "2.1 MB", url: "#" }]
        },
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
    ]
  };

  // Adjust default member counts to meet district requirements:
  // Total members: 1312. IIT (c6) = 192. Arts (c8) = 175. Science (c7) = 157.
  // The rest (22 clubs) share 788 members (18 clubs with 36, 4 clubs with 35).
  if (data.clubs) {
    const iitClub = data.clubs.find(c => c.id === 'c6');
    const artsClub = data.clubs.find(c => c.id === 'c8');
    const scienceClub = data.clubs.find(c => c.id === 'c7');
    if (iitClub) iitClub.memberCount = 192;
    if (artsClub) artsClub.memberCount = 175;
    if (scienceClub) scienceClub.memberCount = 157;
    
    const otherClubs = data.clubs.filter(c => c.id !== 'c6' && c.id !== 'c8' && c.id !== 'c7');
    otherClubs.forEach((c, idx) => {
      if (idx < 18) {
        c.memberCount = 36;
      } else {
        c.memberCount = 35;
      }
    });
  }

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
          { id: 'u7', email: 'president.iit@leo.org', password: 'sithuli123', name: 'Leo Lion Sithuli Amunuthuduwa', role: 'club_president', clubId: 'c6', avatar: 'SA', createdAt: '2026-06-18' }
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
            if (c.id === 'c1' && c.code !== 'LC-024') { c.code = 'LC-024'; hasLegacyClub = true; }
            else if (c.id === 'c2' && c.code !== 'LC-025') { c.code = 'LC-025'; hasLegacyClub = true; }
            else if (c.id === 'c3' && c.code !== 'LC-021') { c.code = 'LC-021'; hasLegacyClub = true; }
            else if (c.id === 'c4' && c.code !== 'LC-022') { c.code = 'LC-022'; hasLegacyClub = true; }
            else if (c.id === 'c5' && c.code !== 'LC-023') { c.code = 'LC-023'; hasLegacyClub = true; }
            else if (c.id === 'c6' && c.code !== 'LC-001') { c.code = 'LC-001'; hasLegacyClub = true; }
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
              if (c.id === 'c1') c.zone = 'A1';
              else if (c.id === 'c2') c.zone = 'A2';
              else if (c.id === 'c3') c.zone = 'B1';
              else if (c.id === 'c4') c.zone = 'B2';
              else if (c.id === 'c5') c.zone = 'B1';
              else c.zone = c.zone.replace('Zone ', 'A');
            }
            if (c.region && c.region.startsWith('Region ')) {
              hasLegacyClub = true;
              if (c.id === 'c1' || c.id === 'c2') c.region = 'A';
              else if (c.id === 'c3' || c.id === 'c4' || c.id === 'c5') c.region = 'B';
              else c.region = c.region.replace('Region ', '');
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
            president: 'Sahan Fernando',
            charter_date: '2025-05-10',
            zone: 'A1',
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
            president: 'Dulani Bandara',
            charter_date: '2025-02-15',
            zone: 'A1',
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
            president: 'Heshan Perera',
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
            points: {
              ad1_1: 10000,
              ad1_3: 10000,
              ad2_1: 10000,
              sp1_1: 100000
            }
          });
          this.save();
        }

        // Add points data for UOC Faculty of Science if missing from local storage
        if (this._data.clubPoints && !this._data.clubPoints.some(cp => cp.clubId === 'c7')) {
          this._data.clubPoints.push({
            clubId: 'c7',
            points: {
              ad1_1: 10000,
              ad1_3: 10000,
              ad2_1: 10000
            }
          });
          this.save();
        }

        // Add points data for UOC Faculty of Arts if missing from local storage
        if (this._data.clubPoints && !this._data.clubPoints.some(cp => cp.clubId === 'c8')) {
          this._data.clubPoints.push({
            clubId: 'c8',
            points: {
              ad1_1: 10000,
              ad1_3: 10000,
              ad2_1: 10000
            }
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
          { clubId: 'c9', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c10', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c11', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c12', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c13', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } }
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
          { clubId: 'c14', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c15', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c16', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c17', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c18', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c19', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c20', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c21', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c22', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c23', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c24', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } },
          { clubId: 'c25', points: { ad1_1: 10000, ad1_3: 10000, ad2_1: 10000 } }
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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
            amount: 15000,
            issueDate: '2026-06-15',
            dueDate: '2026-07-15',
            description: 'Annual District Membership Dues (Leostic Year 2026/27)',
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

        // Migrate club member counts to align with district total of 1312 members
        if (this._data.clubs) {
          let updatedCounts = false;
          const iitClub = this._data.clubs.find(c => c.id === 'c6');
          const artsClub = this._data.clubs.find(c => c.id === 'c8');
          const scienceClub = this._data.clubs.find(c => c.id === 'c7');
          const otherClubs = this._data.clubs.filter(c => c.id !== 'c6' && c.id !== 'c8' && c.id !== 'c7');

          if (iitClub && iitClub.memberCount !== 192) {
            iitClub.memberCount = 192;
            updatedCounts = true;
          }
          if (artsClub && artsClub.memberCount !== 175) {
            artsClub.memberCount = 175;
            updatedCounts = true;
          }
          if (scienceClub && scienceClub.memberCount !== 157) {
            scienceClub.memberCount = 157;
            updatedCounts = true;
          }

          // Check if others are distributed correctly (18 clubs with 36, 4 clubs with 35)
          let othersCorrect = true;
          let count36 = 0;
          let count35 = 0;
          otherClubs.forEach(c => {
            if (c.memberCount === 36) count36++;
            else if (c.memberCount === 35) count35++;
            else othersCorrect = false;
          });
          if (count36 !== 18 || count35 !== 4) othersCorrect = false;

          if (!othersCorrect) {
            otherClubs.forEach((c, idx) => {
              if (idx < 18) {
                c.memberCount = 36;
              } else {
                c.memberCount = 35;
              }
            });
            updatedCounts = true;
          }

          if (updatedCounts) {
            this.save();
          }
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

  getDistrictStats() {
    const clubs = this.getAll('clubs');
    const members = this.getAll('members');
    const projects = this.getAll('projects');
    const events = this.getAll('events');

    return {
      totalClubs: clubs.length,
      activeClubs: clubs.filter(c => c.status === 'active').length,
      totalMembers: members.length,
      activeMembers: members.filter(m => m.status === 'active').length,
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
    
    // Check if there's already a submission for this month (pending or approved)
    const existing = this._data.pointsSubmissions.find(s => s.clubId === clubId && s.month === month && s.status !== 'rejected');
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

  getClubPointsLedger(clubId) {
    const totalPoints = this.getTotalClubPoints(clubId);
    
    const approvedSubs = (this._data.pointsSubmissions || [])
      .filter(s => s.clubId === clubId && s.status === 'approved')
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
}

export const store = new Store();
