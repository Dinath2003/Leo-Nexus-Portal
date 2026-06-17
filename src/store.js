// ============================================
// LEO NEXUS PORTAL — DATA STORE
// LocalStorage persistence + seed data
// ============================================

const STORAGE_KEY = 'leo_nexus_portal';

// ---------- Seed Data ----------
function getDefaultData() {
  return {
    users: [
      { id: 'u1', email: 'admin@leo.org', password: 'admin123', name: 'Admin', role: 'admin', clubId: null, avatar: 'AD', createdAt: '2026-01-01' },
      { id: 'u2', email: 'president.dist@leo.org', password: 'president123', name: 'District President', role: 'district_president', clubId: null, avatar: 'DP', createdAt: '2026-01-01' },
      { id: 'u3', email: 'vp.dist@leo.org', password: 'vp123', name: 'District Vice President', role: 'district_vp', clubId: null, avatar: 'DV', createdAt: '2026-01-01' },
      { id: 'u4', email: 'secretary.dist@leo.org', password: 'secretary123', name: 'District Secretary', role: 'district_secretary', clubId: null, avatar: 'DS', createdAt: '2026-01-01' },
      { id: 'u5', email: 'membership.dist@leo.org', password: 'membership123', name: 'District Membership Chair', role: 'district_membership', clubId: null, avatar: 'DM', createdAt: '2026-01-01' },
      { id: 'u6', email: 'president.club@leo.org', password: 'president123', name: 'Kasun Perera', role: 'club_president', clubId: 'c1', avatar: 'KP', createdAt: '2026-01-15' },
      { id: 'u7', email: 'secretary.club@leo.org', password: 'secretary123', name: 'Sanduni Rajapaksa', role: 'club_secretary', clubId: 'c1', avatar: 'SR', createdAt: '2026-01-15' },
      { id: 'u8', email: 'treasurer.club@leo.org', password: 'treasurer123', name: 'Dinesh Kumara', role: 'club_treasurer', clubId: 'c1', avatar: 'DK', createdAt: '2026-01-15' },
      { id: 'u9', email: 'membership.club@leo.org', password: 'membership123', name: 'Ishara Wickrama', role: 'club_membership', clubId: 'c1', avatar: 'IW', createdAt: '2026-01-15' },
      { id: 'u10', email: 'member.club@leo.org', password: 'member123', name: 'Tharushi Gamage', role: 'club_member', clubId: 'c1', avatar: 'TG', createdAt: '2026-02-01' },
      { id: 'u11', email: 'club@leo.org', password: 'club123', name: 'Kasun Perera (Legacy)', role: 'club_president', clubId: 'c1', avatar: 'KP', createdAt: '2026-01-15' },
      { id: 'u12', email: 'district@leo.org', password: 'district123', name: 'District Governor (Legacy)', role: 'district_president', clubId: null, avatar: 'DG', createdAt: '2026-01-01' },
      { id: 'u13', email: 'treasurer.dist@leo.org', password: 'treasurer123', name: 'District Treasurer', role: 'district_treasurer', clubId: null, avatar: 'DT', createdAt: '2026-01-01' }
    ],

    clubs: [
      {
        id: 'c1',
        name: 'Leo Club of Sapphire Coast',
        code: 'LC-SAP',
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
        code: 'LC-PHX',
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
        id: 'c3',
        name: 'Leo Club of Horizon',
        code: 'LC-HRZ',
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
        code: 'LC-AUR',
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
        code: 'LC-NEB',
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
      { id: 'f18', clubId: 'district', type: 'expense', category: 'Events', amount: 120000, date: '2026-03-05', description: 'Leadership seminar hall booking & catering', reference: 'DIST-EXP-002' }
    ],

    projects: [
      { id: 'p1', clubId: 'c1', name: 'School Renovation Drive', category: 'Education', status: 'completed', startDate: '2026-02-01', endDate: '2026-03-15', participants: 24, budget: 35000, description: 'Renovated classrooms and library at Gamini Maha Vidyalaya.', impact: '350 students benefited' },
      { id: 'p2', clubId: 'c1', name: 'Beach Cleanup Campaign', category: 'Environment', status: 'completed', startDate: '2026-04-05', endDate: '2026-04-05', participants: 30, budget: 5000, description: 'Organized coastal cleanup along 2km stretch.', impact: '500kg waste collected' },
      { id: 'p3', clubId: 'c1', name: 'Blood Donation Camp', category: 'Health', status: 'in_progress', startDate: '2026-06-20', endDate: '2026-06-20', participants: 20, budget: 15000, description: 'Annual blood donation campaign in partnership with National Blood Bank.', impact: 'Target: 100 pints' },
      { id: 'p4', clubId: 'c1', name: 'Youth Leadership Workshop', category: 'Leadership', status: 'planned', startDate: '2026-07-10', endDate: '2026-07-12', participants: 0, budget: 25000, description: 'Three-day leadership development workshop for Leo members.', impact: 'Expected: 50 participants' },
      { id: 'p5', clubId: 'c2', name: 'Community Health Screening', category: 'Health', status: 'completed', startDate: '2026-03-10', endDate: '2026-03-10', participants: 22, budget: 40000, description: 'Free medical screening camp for underprivileged communities.', impact: '200+ people screened' },
      { id: 'p6', clubId: 'c2', name: 'Tree Planting Initiative', category: 'Environment', status: 'completed', startDate: '2026-04-22', endDate: '2026-04-22', participants: 28, budget: 10000, description: 'Earth Day tree planting across 3 locations.', impact: '500 trees planted' },
      { id: 'p7', clubId: 'c3', name: 'Digital Literacy Program', category: 'Education', status: 'in_progress', startDate: '2026-05-01', endDate: '2026-08-30', participants: 15, budget: 30000, description: 'Teaching basic computer skills to rural youth.', impact: 'Ongoing: 60 students enrolled' },
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
      { id: 'sp4_6', category: '3.4. DEDUCTIONS (SP 4)', maxPoints: -1000000, description: 'Consumption of Alcohol or any illegal drug during a Leo Events', perUnit: -1000000, unit: 'occurrence' }
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
      }
    ],
    memberPayments: [
      { id: 'mp1', eventId: 'e1', clubId: 'c1', memberId: 'm1', name: 'Kasun Perera', amount: 1000, status: 'paid', date: '2026-06-05', method: 'Bank Transfer', reference: 'REF-M-101' },
      { id: 'mp2', eventId: 'e1', clubId: 'c1', memberId: 'm2', name: 'Sanduni Rajapaksa', amount: 1000, status: 'paid', date: '2026-06-06', method: 'Cash', reference: 'REF-M-102' },
      { id: 'mp3', eventId: 'e1', clubId: 'c1', memberId: 'm6', name: 'Ravindu Seneviratne', amount: 1000, status: 'pending', date: '2026-06-12', method: 'Bank Transfer', reference: 'REF-M-103' }
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
      }
    ],
    invoiceTemplate: {
      fileName: 'default_district_invoice_template.html',
      uploadedAt: '2026-06-01'
    },
    districtProfile: {
      title: 'Leo District 306 B2',
      tagline: 'Serve with Passion, Lead with Integrity',
      description: 'Leo District 306 B2 Sri Lanka spans over a wide network of active Leo clubs in Colombo, Gampaha, and the North-Western province. We guide and empower young leaders to execute sustainable service projects that make a difference.',
      dg: 'Lion Samantha Perera PMJF',
      dp: 'Leo Rahul De Silva',
      dvp: 'Leo Kavinda Wijetunga',
      ds: 'Leo Mithila Gunawardena',
      dt: 'Leo Shehan Kuruppu',
      goals: [
        { title: '1. Membership Growth & Retention', desc: 'Targeting 15% net membership growth and introducing leadership training modules to reduce drop-out rates.' },
        { title: '2. Environmental Stewardship', desc: 'Planting 5,000 trees district-wide and organizing coordinated beach cleanups in coastal areas.' },
        { title: '3. Joint Service Collaborations', desc: 'Encouraging clubs to partner on large-scale medical camps, computer literacy workshops, and library donation projects.' }
      ],
      council: {
        ipdp: 'Leo Dilshan Fernando',
        advisor: 'Lion Johnathan Silva',
        coordinators: '8 District Coordinators',
        regions: '4 Region Chairpersons',
        zones: '8 Zone Chairpersons'
      }
    },
    mdProfile: {
      title: 'Leo Multiple District 306',
      subtitle: 'National administrative structure and Multiple District Council coordinates',
      description: 'Leo Multiple District 306 Sri Lanka unites six individual sub-districts under one unified council. It is led by the Multiple District Council Chairperson and coordinates nationwide community campaigns.',
      councilChairperson: 'Leo Senath Jayawickrama',
      sponsoringLionChairperson: 'Lion Dr. Lasantha Goonewardene',
      activeDistricts: '6 Districts (A1, A2, B1, B2, C1, C2)',
      totalMembers: '8,500+ Leos',
      secretariat: 'Lions Activity Center, No 41, Albert Crescent, Colombo 07.',
      email: 'md306@leosrilanka.org',
      web: 'www.leosrilanka.org',
      publications: '"The Sri Lankan Leo" Magazine — published quarterly celebrating club service achievements nationwide.'
    }
  };
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
        if (!this._data.memberPayments || this._data.users.length < 10) {
          const fresh = getDefaultData();
          this._data.users = fresh.users;
          this._data.memberPayments = fresh.memberPayments;
          this._data.clubPayments = fresh.clubPayments;
          this._data.clubEventSettings = fresh.clubEventSettings;
          // also merge or overwrite finances to include district ones
          this._data.finances = fresh.finances;
          this.save();
        }
        const hasTreasurer = (this._data.users || []).some(u => u.role === 'district_treasurer');
        if (!hasTreasurer) {
          this._data.users.push({
            id: 'u13',
            email: 'treasurer.dist@leo.org',
            password: 'treasurer123',
            name: 'District Treasurer',
            role: 'district_treasurer',
            clubId: null,
            avatar: 'DT',
            createdAt: '2026-01-01'
          });
          this.save();
        }
        if (!this._data.invoices) {
          const fresh = getDefaultData();
          this._data.invoices = fresh.invoices;
          this.save();
        }
        if (!this._data.invoiceTemplate) {
          this._data.invoiceTemplate = {
            fileName: 'default_district_invoice_template.html',
            uploadedAt: '2026-06-01'
          };
          this.save();
        }
        if (!this._data.districtProfile) {
          const fresh = getDefaultData();
          this._data.districtProfile = fresh.districtProfile;
          this.save();
        } else {
          let updated = false;
          if (!this._data.districtProfile.dvp) {
            this._data.districtProfile.dvp = 'Leo Kavinda Wijetunga';
            updated = true;
          }
          if (!this._data.districtProfile.council) {
            this._data.districtProfile.council = {
              ipdp: 'Leo Dilshan Fernando',
              advisor: 'Lion Johnathan Silva',
              coordinators: '8 District Coordinators',
              regions: '4 Region Chairpersons',
              zones: '8 Zone Chairpersons'
            };
            updated = true;
          }
          if (updated) {
            this.save();
          }
        }
        if (!this._data.mdProfile) {
          const fresh = getDefaultData();
          this._data.mdProfile = fresh.mdProfile;
          this.save();
        }
        
        if (!this._data.pointCriteria || this._data.pointCriteria.some(c => c.id === 'pc1')) {
          const fresh = getDefaultData();
          this._data.pointCriteria = fresh.pointCriteria;
          this._data.clubPoints = fresh.clubPoints;
          this.save();
        }
        
        // Migrate legacy club zones and regions in existing localStorage
        let hasLegacyClub = false;
        if (this._data.clubs) {
          this._data.clubs.forEach(c => {
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
    return this._data[collection] || [];
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
    return newItem;
  }

  update(collection, id, updates) {
    const index = (this._data[collection] || []).findIndex(item => item.id === id);
    if (index === -1) return null;
    this._data[collection][index] = { ...this._data[collection][index], ...updates };
    this.save();
    this.emit(`${collection}:updated`, this._data[collection][index]);
    this.emit(`${collection}:changed`);
    return this._data[collection][index];
  }

  delete(collection, id) {
    const index = (this._data[collection] || []).findIndex(item => item.id === id);
    if (index === -1) return false;
    const deleted = this._data[collection].splice(index, 1)[0];
    this.save();
    this.emit(`${collection}:deleted`, deleted);
    this.emit(`${collection}:changed`);
    return true;
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
    return this._data.districtProfile || getDefaultData().districtProfile;
  }

  updateDistrictProfile(updates) {
    this._data.districtProfile = { ...this.getDistrictProfile(), ...updates };
    this.save();
    this.emit('districtProfile:updated', this._data.districtProfile);
  }

  getMDProfile() {
    return this._data.mdProfile || getDefaultData().mdProfile;
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
}

export const store = new Store();
