// ============================================
// LEO NEXUS PORTAL — 37 PROJECT CATEGORIES & CRITERIA
// Categorized into 3 Award Groups:
// 1. Project Awards (1 - 24)
// 2. Joint Project Awards (25 - 30)
// 3. Lions Global Service Challenge Awards (31 - 37)
// ============================================

export const PROJECT_AWARD_GROUPS = {
  project_awards: {
    id: 'project_awards',
    name: 'Project Awards',
    range: '1–24',
    badgeClass: 'badge-primary',
    color: '#0066ff',
    icon: 'award',
    description: 'Individual club service excellence and thematic community projects'
  },
  joint_project_awards: {
    id: 'joint_project_awards',
    name: 'Joint Project Awards',
    range: '25–30',
    badgeClass: 'badge-warning',
    color: '#f59e0b',
    icon: 'users',
    description: 'Collaborative projects with Lions Clubs, external bodies, and fellow Leo clubs'
  },
  lions_global_service: {
    id: 'lions_global_service',
    name: 'Lions Global Service Challenge Awards',
    range: '31–37',
    badgeClass: 'badge-success',
    color: '#14b8a6',
    icon: 'globe',
    description: 'High-impact projects addressing Lions International global causes and youth development'
  }
};

export const PROJECT_CATEGORIES_DATA = [
  // -------------------------------------------------------------
  // Group 1: Project Awards (1 - 24)
  // -------------------------------------------------------------
  {
    id: 'cat_1',
    number: 1,
    name: 'Best Project for Spotlight on Children',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'smile',
    subCriteria: [
      { id: 'cat_1_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_1_sub_2', text: 'Projects conducted for groups under the age of 18.' },
      { id: 'cat_1_sub_3', text: 'Projects shall include educational, health, safety, or developmental support, such as storytelling, hygiene-kit distribution, nutrition awareness, basic health check-ups, personal-safety education, reading corners, drawing, and games.' },
      { id: 'cat_1_sub_4', text: 'Promoting children’s digital safety, including cyberbullying prevention and managing online addiction.' }
    ]
  },
  {
    id: 'cat_2',
    number: 2,
    name: 'Best Project for Responsible Consumption & Waste Management',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'recycle',
    subCriteria: [
      { id: 'cat_2_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_2_sub_2', text: 'Restoration and recycling of products for renewed use, including items sold to support another individual’s livelihood.' },
      { id: 'cat_2_sub_3', text: 'Community awareness on responsible consumption, reducing wastage, and household-level waste management/recycling.' },
      { id: 'cat_2_sub_4', text: 'Proper disposal of e-waste and harmful electronics, such as CFL bulbs containing mercury.' }
    ]
  },
  {
    id: 'cat_3',
    number: 3,
    name: 'Best Project for Health, Nutrition & Food Safety',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'heart-pulse',
    subCriteria: [
      { id: 'cat_3_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_3_sub_2', text: 'Nutrition-awareness programmes, including healthy-food awareness.' },
      { id: 'cat_3_sub_3', text: 'Sanitation and healthy-lifestyle awareness.' },
      { id: 'cat_3_sub_4', text: 'Affordable nutritional food plans.' },
      { id: 'cat_3_sub_5', text: 'Community gardens for fresh fruits and vegetables.' },
      { id: 'cat_3_sub_6', text: 'Training on safe food handling, storage, and preparation.' },
      { id: 'cat_3_sub_7', text: 'Projects improving maternal and child nutrition.' },
      { id: 'cat_3_sub_8', text: 'Identifying disease burdens caused by food-related physical, chemical, and microbial hazards; unhealthy diets; malnutrition; overweight; and obesity.' },
      { id: 'cat_3_sub_9', text: 'Awareness on cancer, kidney-related diseases, and non-communicable diseases.' },
      { id: 'cat_3_sub_10', text: 'Blood donations and medicine distribution must be under a doctor’s prescription.' },
      { id: 'cat_3_sub_11', text: 'Professional workshops or awareness sessions on stress reduction, mental health, and gratitude.' }
    ]
  },
  {
    id: 'cat_4',
    number: 4,
    name: 'Best Project for Peace & Cultural Activities',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'palette',
    subCriteria: [
      { id: 'cat_4_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_4_sub_2', text: 'Projects promoting reconciliation and understanding among different cultures, customs, and communities.' },
      { id: 'cat_4_sub_3', text: 'Educational programmes to overcome language and communication barriers.' },
      { id: 'cat_4_sub_4', text: 'Activities that preserve and share beliefs, customs, traditions, art, dance, poetry, music, clothing, gastronomy, theatre, and literature.' },
      { id: 'cat_4_sub_5', text: 'Training in conflict resolution and mediation.' }
    ]
  },
  {
    id: 'cat_5',
    number: 5,
    name: 'Best Project for Sports & Recreation',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'trophy',
    subCriteria: [
      { id: 'cat_5_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_5_sub_2', text: 'Activities promoting health, fitness, discipline, and unity.' },
      { id: 'cat_5_sub_3', text: 'Low-impact fitness, yoga, swimming, and active-ageing programmes for senior citizens.' },
      { id: 'cat_5_sub_4', text: 'Sports-equipment distribution, coaching, guidance, and infrastructure development.' },
      { id: 'cat_5_sub_5', text: 'Enhancement of community recreational centres with sports and fitness facilities.' }
    ]
  },
  {
    id: 'cat_6',
    number: 6,
    name: 'Best Project for Senior Citizens Development',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'user-check',
    subCriteria: [
      { id: 'cat_6_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_6_sub_2', text: 'For groups above 60 years, with a focus on dignity, wellbeing, education, self-employment, and recreation.' },
      { id: 'cat_6_sub_3', text: 'Income-generation opportunities such as crafting, gardening, and consultancy.' },
      { id: 'cat_6_sub_4', text: 'Intergenerational learning and cultural exchange programmes.' },
      { id: 'cat_6_sub_5', text: 'Digital-literacy training and tech-assisted care tools.' },
      { id: 'cat_6_sub_6', text: 'Retirement, pension-plan, and wealth-management awareness may include groups below 60 years.' }
    ]
  },
  {
    id: 'cat_7',
    number: 7,
    name: 'Best Project for Helping Hand to Differently Abled',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'hand-heart',
    subCriteria: [
      { id: 'cat_7_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_7_sub_2', text: 'Programmes improving facilities, enjoyment, and living standards.' },
      { id: 'cat_7_sub_3', text: 'Individual skill development, including art, crafts, and music.' },
      { id: 'cat_7_sub_4', text: 'Employer-awareness initiatives regarding job opportunities.' },
      { id: 'cat_7_sub_5', text: 'Support for special medical treatments, such as mental-health care and physiotherapy.' },
      { id: 'cat_7_sub_6', text: 'Community awareness to prevent discrimination.' },
      { id: 'cat_7_sub_7', text: 'Accessibility facilities such as ramps and accessible restrooms.' }
    ]
  },
  {
    id: 'cat_8',
    number: 8,
    name: 'Best Project for Public Relations',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'share-2',
    subCriteria: [
      { id: 'cat_8_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_8_sub_2', text: 'Projects building strong relationships between the public and Leo activities through communication and branding.' },
      { id: 'cat_8_sub_3', text: 'Strong promotions, effective marketing tools, and wider community reach.' },
      { id: 'cat_8_sub_4', text: 'Public visibility for Leo and Lions Clubs through media, social, and online campaigns.' },
      { id: 'cat_8_sub_5', text: 'Use of engagement rates, impressions, and innovative media platforms is encouraged.' }
    ]
  },
  {
    id: 'cat_9',
    number: 9,
    name: 'Best Project for Fundraiser',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'wallet',
    subCriteria: [
      { id: 'cat_9_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_9_sub_2', text: 'Proper accounts and ledgers must be maintained; net profit must be visible.' },
      { id: 'cat_9_sub_3', text: 'For joint projects, the Leo Club’s profit share must be stated.' },
      { id: 'cat_9_sub_4', text: 'A supporting letter is required from a partner club regarding profit sharing/fund allocation.' },
      { id: 'cat_9_sub_5', text: 'Bills, invoices, and supporting documents are required.' },
      { id: 'cat_9_sub_6', text: 'Installations, charters, and anniversaries are excluded, though attached projects may qualify.' },
      { id: 'cat_9_sub_7', text: 'Only net profit — funds raised less project expenses — will be considered.' },
      { id: 'cat_9_sub_8', text: 'Service activities using raised funds are encouraged.' }
    ]
  },
  {
    id: 'cat_10',
    number: 10,
    name: 'Best Project for Quality Education & Literacy',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'book-open',
    subCriteria: [
      { id: 'cat_10_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_10_sub_2', text: 'Projects addressing an identified education need for an individual or group.' },
      { id: 'cat_10_sub_3', text: 'Literacy programmes, smart classrooms, and digitised learning methods are considered.' },
      { id: 'cat_10_sub_4', text: 'Skill development, literacy improvement, education, and opportunities that improve lives.' },
      { id: 'cat_10_sub_5', text: 'Scholarship and education-aid programmes.' },
      { id: 'cat_10_sub_6', text: 'Higher-education and vocational-training guidance.' },
      { id: 'cat_10_sub_7', text: 'Scholarship schemes for students from low-income families.' }
    ]
  },
  {
    id: 'cat_11',
    number: 11,
    name: 'Best Project for Women Empowerment',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'shield',
    subCriteria: [
      { id: 'cat_11_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_11_sub_2', text: 'Projects that develop, encourage, and strengthen women through opportunities and platforms.' },
      { id: 'cat_11_sub_3', text: 'Sanitation and hygiene initiatives.' },
      { id: 'cat_11_sub_4', text: 'Awareness and prevention of abuse, discrimination, unequal rights, and labour-law issues.' },
      { id: 'cat_11_sub_5', text: 'Self-employment and women-entrepreneurship programmes.' }
    ]
  },
  {
    id: 'cat_12',
    number: 12,
    name: 'Best Project for Poverty & Better Life',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'home',
    subCriteria: [
      { id: 'cat_12_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_12_sub_2', text: 'Projects uplifting the living standard of an individual or family.' },
      { id: 'cat_12_sub_3', text: 'Employment, self-employment, microfinance, and aid for poverty-affected households.' },
      { id: 'cat_12_sub_4', text: 'Counselling to overcome poor living standards.' },
      { id: 'cat_12_sub_5', text: 'Vocational-training centres for in-demand trades.' }
    ]
  },
  {
    id: 'cat_13',
    number: 13,
    name: 'Best Project for Clean Water & Energy Conservation',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'droplets',
    subCriteria: [
      { id: 'cat_13_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_13_sub_2', text: 'Awareness on energy conservation and responsible energy use.' },
      { id: 'cat_13_sub_3', text: 'Renewable-energy initiatives, including solar panels and wind turbines.' },
      { id: 'cat_13_sub_4', text: 'Water-pollution awareness.' },
      { id: 'cat_13_sub_5', text: 'Clean drinking-water access, water-purification equipment, purification awareness, and tube-well construction.' }
    ]
  },
  {
    id: 'cat_14',
    number: 14,
    name: 'Best Project for Crime & Accident Prevention',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'alert-triangle',
    subCriteria: [
      { id: 'cat_14_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_14_sub_2', text: 'Road-accident prevention and public-awareness programmes.' },
      { id: 'cat_14_sub_3', text: 'Crime awareness and prevention related to abuse, assault, cyberbullying, scams, and psychological manipulation.' },
      { id: 'cat_14_sub_4', text: 'Self-defence training for women, men, and children.' },
      { id: 'cat_14_sub_5', text: 'Neighbourhood-watch initiatives and collaboration with law enforcement.' },
      { id: 'cat_14_sub_6', text: 'Broad accident-prevention awareness programmes.' }
    ]
  },
  {
    id: 'cat_15',
    number: 15,
    name: 'Best Project for Infrastructure Development',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'building',
    subCriteria: [
      { id: 'cat_15_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_15_sub_2', text: 'Acknowledgement letter from beneficiary communities, schools, or institutions.' },
      { id: 'cat_15_sub_3', text: 'Development, refurbishment, and repair of public/common property, including bus halts, classrooms, signboards, wells, and libraries.' },
      { id: 'cat_15_sub_4', text: 'Proper budgets, approvals, and financial evidence are advised.' }
    ]
  },
  {
    id: 'cat_16',
    number: 16,
    name: 'Best Project for Research & Development',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'microscope',
    subCriteria: [
      { id: 'cat_16_sub_1', text: 'Need assessment and MyLion reporting are compulsory.', compulsory: true },
      { id: 'cat_16_sub_2', text: 'Qualitative and quantitative research addressing a timely community need.' },
      { id: 'cat_16_sub_3', text: 'Research must run for at least one month.' },
      { id: 'cat_16_sub_4', text: 'Primary and secondary research, with Leo involvement clearly evidenced.' },
      { id: 'cat_16_sub_5', text: 'Questionnaires and photographs of Leo efforts are required in appendices.' },
      { id: 'cat_16_sub_6', text: 'The resulting proposal must be implemented with a niche or mass sample, with outcomes included in the R&D report.' },
      { id: 'cat_16_sub_7', text: 'Creative and innovative products/services for the community are considered.' }
    ]
  },
  {
    id: 'cat_17',
    number: 17,
    name: 'Best Project for Drug Prevention & Rehabilitation',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'activity',
    subCriteria: [
      { id: 'cat_17_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_17_sub_2', text: 'Drug-prevention awareness campaigns and projects for rehabilitation centres/residents.' },
      { id: 'cat_17_sub_3', text: 'Identifying people with drug addiction and encouraging rehabilitation.' },
      { id: 'cat_17_sub_4', text: 'Campaigns reducing alcohol, cigarettes, and dangerous-drug consumption.' },
      { id: 'cat_17_sub_5', text: 'Awareness of health effects of drugs.' },
      { id: 'cat_17_sub_6', text: 'Prevention of drug alternatives among school students/minors.' },
      { id: 'cat_17_sub_7', text: 'Youth clubs and peer-support groups promoting drug-free living.' },
      { id: 'cat_17_sub_8', text: 'Leo contribution must be clear when conducted with other organisations.' }
    ]
  },
  {
    id: 'cat_18',
    number: 18,
    name: 'Best Project for Street Animals, Wildlife & Life Below Water',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'feather',
    subCriteria: [
      { id: 'cat_18_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_18_sub_2', text: 'Reforestation and forest/wildlife protection.' },
      { id: 'cat_18_sub_3', text: 'Protection of restricted or endangered animal and fish species.' },
      { id: 'cat_18_sub_4', text: 'Underwater-pollution prevention and cleaning programmes.' },
      { id: 'cat_18_sub_5', text: 'Wildlife sanctuaries, breeding programmes, and feeding stations.' },
      { id: 'cat_18_sub_6', text: 'Awareness through field trips, bird watching, cleaning initiatives, and signboards.' },
      { id: 'cat_18_sub_7', text: 'Humane care, adoption homes, breeding, and feeding initiatives for street animals.' }
    ]
  },
  {
    id: 'cat_19',
    number: 19,
    name: 'Best Project for Fellowship',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'coffee',
    subCriteria: [
      { id: 'cat_19_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_19_sub_2', text: 'Projects primarily enhancing fellowship and uplifting the Leo movement.' },
      { id: 'cat_19_sub_3', text: 'Team spirit and unity among club, district, and multiple-district members.' },
      { id: 'cat_19_sub_4', text: 'Individual club celebrations, including birthdays, are not considered.' }
    ]
  },
  {
    id: 'cat_20',
    number: 20,
    name: 'Best Project for Betterment of Leoism',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'compass',
    subCriteria: [
      { id: 'cat_20_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_20_sub_2', text: 'Developing ethical and diplomatic service leaders.' },
      { id: 'cat_20_sub_3', text: 'Ethics and etiquette guidance in engaging environments.' },
      { id: 'cat_20_sub_4', text: 'Leadership, skill development, and career guidance for Leo members.' },
      { id: 'cat_20_sub_5', text: 'Seminars on professional ethics and social etiquette using interactive methods.' },
      { id: 'cat_20_sub_6', text: 'Innovative membership-development programmes, including team building and orientations.' }
    ]
  },
  {
    id: 'cat_21',
    number: 21,
    name: 'Most Outstanding Service Project',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'star',
    subCriteria: [
      { id: 'cat_21_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_21_sub_2', text: 'Outstanding Leo effort in a humanitarian project.' },
      { id: 'cat_21_sub_3', text: 'Correctly identified community need or an uncommon issue addressed.' },
      { id: 'cat_21_sub_4', text: 'High programme magnitude and beneficiary impact.' },
      { id: 'cat_21_sub_5', text: 'Priority is given to projects conducted by a single club.' },
      { id: 'cat_21_sub_6', text: 'Publicity through media, especially newspapers, radio, and television.' },
      { id: 'cat_21_sub_7', text: 'Clear Leo contribution and effort.' },
      { id: 'cat_21_sub_8', text: 'Projects covering Lions Global Causes are mainly considered.' }
    ]
  },
  {
    id: 'cat_22',
    number: 22,
    name: 'Most Innovative Project',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'zap',
    subCriteria: [
      { id: 'cat_22_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_22_sub_2', text: 'New service opportunities for an identified community need.' },
      { id: 'cat_22_sub_3', text: 'Innovative approaches to common Leo service opportunities.' },
      { id: 'cat_22_sub_4', text: 'Innovative tools developed for Leo Club operations.' }
    ]
  },
  {
    id: 'cat_23',
    number: 23,
    name: 'Most Outstanding Continuous Project',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'repeat',
    subCriteria: [
      { id: 'cat_23_sub_1', text: 'MyLion reporting is compulsory for each phase.', compulsory: true },
      { id: 'cat_23_sub_2', text: 'Must continue for six consecutive months in the current Leoistic year under the same concept.' },
      { id: 'cat_23_sub_3', text: 'Each phase must be reported in MyLion during the relevant month, with the month clearly stated.' },
      { id: 'cat_23_sub_4', text: 'Annual projects are not considered.' }
    ]
  },
  {
    id: 'cat_24',
    number: 24,
    name: 'Most Outstanding Service Project by a New Leo',
    groupId: 'project_awards',
    groupName: 'Project Awards',
    icon: 'user-plus',
    subCriteria: [
      { id: 'cat_24_sub_1', text: 'Must be chaired by a Leo inducted during the current Leoistic year and registered in MyLCI.', compulsory: true },
      { id: 'cat_24_sub_2', text: 'Must meet the requirements of Category 21 (Most Outstanding Service Project).' },
      { id: 'cat_24_sub_3', text: 'May be conducted as a joint project.' },
      { id: 'cat_24_sub_4', text: 'Innovation is an added advantage.' },
      { id: 'cat_24_sub_5', text: 'The New Leo’s contribution must be clearly evidenced through photographs, letters, and the report.' }
    ]
  },

  // -------------------------------------------------------------
  // Group 2: Joint Project Awards (25 - 30)
  // -------------------------------------------------------------
  {
    id: 'cat_25',
    number: 25,
    name: 'Best Serving Together Project',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'link-2',
    subCriteria: [
      { id: 'cat_25_sub_1', text: 'Joint project with a Lions Club or sponsoring Lions Club.', compulsory: true },
      { id: 'cat_25_sub_2', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_25_sub_3', text: 'Serving Together banner patch or Lions International confirmation email/letter is required.' },
      { id: 'cat_25_sub_4', text: 'Leo contributions to planning, organising, conducting, finance, support, or material donations must be specified.' },
      { id: 'cat_25_sub_5', text: 'A confirmation letter from the Lions Club is required.' }
    ]
  },
  {
    id: 'cat_26',
    number: 26,
    name: 'Best Joint Project with a Non-Leo/Outside Organisation',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'external-link',
    subCriteria: [
      { id: 'cat_26_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_26_sub_2', text: 'Approval under the District President’s procedure is required 14 days before the project, except emergencies.' },
      { id: 'cat_26_sub_3', text: 'Specific Leo Club contribution must be clear.' },
      { id: 'cat_26_sub_4', text: 'The club must make a considerable contribution beyond event-day coordination.' },
      { id: 'cat_26_sub_5', text: 'An acknowledgement letter from the partner organisation is compulsory.' }
    ]
  },
  {
    id: 'cat_27',
    number: 27,
    name: 'Best Joint Inter-District Project',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'shuffle',
    subCriteria: [
      { id: 'cat_27_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_27_sub_2', text: 'Joint project between clubs from different Leo Districts.' },
      { id: 'cat_27_sub_3', text: 'Need analysis, descriptions, and reports should be the same for all partner clubs.' },
      { id: 'cat_27_sub_4', text: 'Each club’s contribution must be stated.' },
      { id: 'cat_27_sub_5', text: 'Proposal, invitation, acknowledgement, and the duly completed Multiple District form are required.' },
      { id: 'cat_27_sub_6', text: 'Approval must be received at least 14 days before the project.' }
    ]
  },
  {
    id: 'cat_28',
    number: 28,
    name: 'Best Joint Intra-District Project',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'git-merge',
    subCriteria: [
      { id: 'cat_28_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_28_sub_2', text: 'Joint project between clubs within the same Leo District.' },
      { id: 'cat_28_sub_3', text: 'Projects involving clubs from different districts are not eligible.' },
      { id: 'cat_28_sub_4', text: 'Reports and need analysis should be consistent among partner clubs.' },
      { id: 'cat_28_sub_5', text: 'Each club’s contribution must be stated.' },
      { id: 'cat_28_sub_6', text: 'Proposal, invitation, and acknowledgement from the hosting Leo Club are required.' }
    ]
  },
  {
    id: 'cat_29',
    number: 29,
    name: 'Joint Projects with Foreign Leo Clubs / Best International Joint Project',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'plane',
    subCriteria: [
      { id: 'cat_29_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_29_sub_2', text: 'A project conducted with foreign Leos.' },
      { id: 'cat_29_sub_3', text: 'Local and international activities, along with specific Leo contributions, must be described.' },
      { id: 'cat_29_sub_4', text: 'Acknowledgement from the foreign Leo Club is required.' },
      { id: 'cat_29_sub_5', text: 'Proposal, invitation, acknowledgement from the host club in MD 306, and the completed MD form are required.' },
      { id: 'cat_29_sub_6', text: 'Approval must be obtained 14 days before the project.' }
    ]
  },
  {
    id: 'cat_30',
    number: 30,
    name: 'Most Outstanding Joint Service Project',
    groupId: 'joint_project_awards',
    groupName: 'Joint Project Awards',
    icon: 'layers',
    subCriteria: [
      { id: 'cat_30_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_30_sub_2', text: 'Only joint service projects are eligible.' },
      { id: 'cat_30_sub_3', text: 'Category 21 requirements apply, except the single-club requirement.' },
      { id: 'cat_30_sub_4', text: 'At least two Leo Clubs must participate.' },
      { id: 'cat_30_sub_5', text: 'Club collectiveness should be demonstrated.' },
      { id: 'cat_30_sub_6', text: 'Each club’s contribution must be clearly reported.' }
    ]
  },

  // -------------------------------------------------------------
  // Group 3: Lions Global Service Challenge Awards (31 - 37)
  // -------------------------------------------------------------
  {
    id: 'cat_31',
    number: 31,
    name: 'Best Project for Diabetes',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'activity',
    subCriteria: [
      { id: 'cat_31_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_31_sub_2', text: 'Diabetes-prevention awareness for targeted groups.' },
      { id: 'cat_31_sub_3', text: 'Strides events, screening, treatment access, diabetes camps, and community recreation.' },
      { id: 'cat_31_sub_4', text: 'Support groups for people living with diabetes.' },
      { id: 'cat_31_sub_5', text: 'Partnerships with businesses, healthcare providers, and community organisations.' }
    ]
  },
  {
    id: 'cat_32',
    number: 32,
    name: 'Best Project for the Environment',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'tree-pine',
    subCriteria: [
      { id: 'cat_32_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_32_sub_2', text: 'Climate action, global-warming reduction, conservation, and pollution-management projects.' },
      { id: 'cat_32_sub_3', text: 'Awareness and prevention programmes are eligible; prevention receives higher weight.' },
      { id: 'cat_32_sub_4', text: 'Waste reduction, recycling, and composting initiatives.' },
      { id: 'cat_32_sub_5', text: 'Long-term sustainable projects receive higher weight.' }
    ]
  },
  {
    id: 'cat_33',
    number: 33,
    name: 'Best Project for Hunger',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'utensils',
    subCriteria: [
      { id: 'cat_33_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_33_sub_2', text: 'Hunger-relief projects for identified communities, including homeless groups.' },
      { id: 'cat_33_sub_3', text: 'Vegetable and fruit gardening that benefits less-fortunate people.' },
      { id: 'cat_33_sub_4', text: 'Healthy-lifestyle and malnutrition awareness, especially for children, pregnant mothers, and elderly people.' },
      { id: 'cat_33_sub_5', text: 'Food-safety awareness, including avoidance of food poisoning and harmful food-consumption practices.' }
    ]
  },
  {
    id: 'cat_34',
    number: 34,
    name: 'Best Project for Childhood Cancer',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'heart',
    subCriteria: [
      { id: 'cat_34_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_34_sub_2', text: 'Paediatric-cancer awareness.' },
      { id: 'cat_34_sub_3', text: 'Improved access to life-saving treatment and support for children and families.' },
      { id: 'cat_34_sub_4', text: 'Holistic support addressing physical, emotional, and social needs.' }
    ]
  },
  {
    id: 'cat_35',
    number: 35,
    name: 'Best Project for Vision',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'eye',
    subCriteria: [
      { id: 'cat_35_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_35_sub_2', text: 'Eye screening and distribution of spectacles and visual aids.' },
      { id: 'cat_35_sub_3', text: 'Eye-health awareness among targeted groups.' },
      { id: 'cat_35_sub_4', text: 'Projects for blind/partially blind communities and joint programmes with the National Eye Bank.' },
      { id: 'cat_35_sub_5', text: 'Telemedicine for eye consultations, follow-ups, and vision assessments.' },
      { id: 'cat_35_sub_6', text: 'Cataract-surgery assistance receives higher consideration.' },
      { id: 'cat_35_sub_7', text: 'Low-vision rehabilitation programmes are considered.' }
    ]
  },
  {
    id: 'cat_36',
    number: 36,
    name: 'Best Project for Youth',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'sparkles',
    subCriteria: [
      { id: 'cat_36_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_36_sub_2', text: 'Projects for community members aged 18–30 with an identified need.' },
      { id: 'cat_36_sub_3', text: 'Leadership development for Leos and non-Leos receives higher weight.' },
      { id: 'cat_36_sub_4', text: 'Youth empowerment through vocational, soft-skill, and technical-skill programmes.' },
      { id: 'cat_36_sub_5', text: 'Programmes on leadership, decision making, self-control, moral values, and life skills.' },
      { id: 'cat_36_sub_6', text: 'Critical thinking, design thinking, decision-making, high-end technology, and creative-learning programmes.' },
      { id: 'cat_36_sub_7', text: 'Entrepreneurial skills, including business planning, marketing, and financial management.' },
      { id: 'cat_36_sub_8', text: 'Mentorship programmes with experienced professionals.' },
      { id: 'cat_36_sub_9', text: 'Financial-literacy programmes covering budgeting, saving, investing, and credit.' }
    ]
  },
  {
    id: 'cat_37',
    number: 37,
    name: 'Best Project for Disaster Management and Prevention',
    groupId: 'lions_global_service',
    groupName: 'Lions Global Service Challenge Awards',
    icon: 'life-buoy',
    subCriteria: [
      { id: 'cat_37_sub_1', text: 'MyLion reporting is compulsory.', compulsory: true },
      { id: 'cat_37_sub_2', text: 'Awareness and prevention programmes reducing natural/man-made disaster impacts in Sri Lanka.' },
      { id: 'cat_37_sub_3', text: 'Disaster-response activities.' },
      { id: 'cat_37_sub_4', text: 'Beneficiaries may be any age group or community where risk and need are identified.' },
      { id: 'cat_37_sub_5', text: 'Collaboration with government or related entities is encouraged.' },
      { id: 'cat_37_sub_6', text: 'Volunteer training in first aid, search and rescue, fire safety, and disaster response.' }
    ]
  }
];

/**
 * Evaluates whether a category is auto-ticked/completed given the active sub-criteria claims and proofs.
 * A category is completed when:
 * 1. At least one sub-criterion is checked AND has at least one proof attachment.
 * 2. If a compulsory sub-criterion exists (e.g., MyLion reporting), it must be ticked with proof.
 */
export function checkCategoryCompletion(category, subClaims = {}) {
  if (!category || !category.subCriteria) return { isComplete: false, fulfilledCount: 0, totalCount: 0 };
  
  const totalCount = category.subCriteria.length;
  let fulfilledCount = 0;
  let compulsorySatisfied = true;

  category.subCriteria.forEach(sub => {
    const claim = subClaims[sub.id];
    const isTicked = !!claim?.ticked;
    const hasProof = Array.isArray(claim?.proofs) && claim.proofs.length > 0;
    
    if (isTicked && hasProof) {
      fulfilledCount++;
    }

    if (sub.compulsory) {
      if (!isTicked || !hasProof) {
        compulsorySatisfied = false;
      }
    }
  });

  // A category is auto-ticked if compulsory criteria are satisfied and at least 1 substantive criterion has proof
  const isComplete = compulsorySatisfied && fulfilledCount >= 1;
  return {
    isComplete,
    fulfilledCount,
    totalCount,
    percentage: Math.round((fulfilledCount / totalCount) * 100)
  };
}
