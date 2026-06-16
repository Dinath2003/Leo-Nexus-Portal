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
      { id: 'u12', email: 'district@leo.org', password: 'district123', name: 'District Governor (Legacy)', role: 'district_president', clubId: null, avatar: 'DG', createdAt: '2026-01-01' }
    ],

    clubs: [
      {
        id: 'c1',
        name: 'Leo Club of Sapphire Coast',
        code: 'LC-SAP',
        president: 'Kasun Perera',
        charter_date: '2024-03-15',
        zone: 'Zone A',
        region: 'Region 1',
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
        zone: 'Zone B',
        region: 'Region 1',
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
        zone: 'Zone A',
        region: 'Region 2',
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
        zone: 'Zone C',
        region: 'Region 2',
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
        zone: 'Zone B',
        region: 'Region 3',
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
        title: 'Zone A Joint Meeting Invitation',
        content: 'All Zone A clubs are invited to attend the quarterly joint meeting on June 25, 2026 at 4:00 PM. Venue: Lions Hall, Galle. Agenda includes zone project planning and inter-club collaboration opportunities.',
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
      { id: 'pc1', category: 'Community Service Projects', maxPoints: 30, description: 'Points based on number and impact of community service projects completed', perUnit: 5, unit: 'project' },
      { id: 'pc2', category: 'Membership Growth', maxPoints: 15, description: 'Points for net membership growth during the term', perUnit: 1, unit: 'new member' },
      { id: 'pc3', category: 'District Event Participation', maxPoints: 15, description: 'Attendance and participation in district-organized events', perUnit: 3, unit: 'event' },
      { id: 'pc4', category: 'Financial Reporting', maxPoints: 10, description: 'Timely and accurate financial report submissions', perUnit: 2, unit: 'report' },
      { id: 'pc5', category: 'Meeting Regularity', maxPoints: 10, description: 'Regular club meetings held as per schedule', perUnit: 1, unit: 'meeting' },
      { id: 'pc6', category: 'Activity Report Submissions', maxPoints: 10, description: 'Monthly activity reports submitted on time', perUnit: 2, unit: 'report' },
      { id: 'pc7', category: 'Social Media & PR', maxPoints: 5, description: 'Active social media presence and public relations efforts', perUnit: 1, unit: 'post' },
      { id: 'pc8', category: 'Inter-Club Collaboration', maxPoints: 5, description: 'Joint projects or activities with other Leo clubs', perUnit: 5, unit: 'collaboration' },
    ],

    clubPoints: [
      { clubId: 'c1', points: { pc1: 25, pc2: 8, pc3: 12, pc4: 8, pc5: 9, pc6: 8, pc7: 4, pc8: 5 } },
      { clubId: 'c2', points: { pc1: 20, pc2: 5, pc3: 9, pc4: 6, pc5: 8, pc6: 6, pc7: 3, pc8: 0 } },
      { clubId: 'c3', points: { pc1: 10, pc2: 10, pc3: 6, pc4: 4, pc5: 7, pc6: 4, pc7: 2, pc8: 5 } },
      { clubId: 'c4', points: { pc1: 15, pc2: 7, pc3: 9, pc4: 8, pc5: 8, pc6: 6, pc7: 3, pc8: 0 } },
      { clubId: 'c5', points: { pc1: 5, pc2: 3, pc3: 3, pc4: 2, pc5: 4, pc6: 2, pc7: 1, pc8: 0 } },
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
    ]
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

  getLeaderboard() {
    const clubs = this.getAll('clubs');
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
