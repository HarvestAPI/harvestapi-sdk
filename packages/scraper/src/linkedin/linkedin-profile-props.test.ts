require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-require-imports

import { link } from 'fs';
import { LinkedinScraper } from './scraper';

if (!process.env.API_KEY) {
  throw new Error('API_KEY env variable is required');
}

const expectedProfiles = [
  {
    id: 'ACoAAA7IcPoBXbqAyFuCjYLHAhmm13BgChs-P5g',
    publicIdentifier: 'lewisowain',
    firstName: 'Owain',
    lastName: 'Lewis',
    location: {
      linkedinText: 'United Kingdom',
      countryCode: 'GB',
    },
    linkedinUrl: 'https://www.linkedin.com/in/lewisowain',
    photo: expect.stringContaining(
      'https://media.licdn.com/dms/image/v2/D4D03AQE4RtFX8xPkmQ/profile-displayphoto-shrink_800_800/',
    ),
    connectionsCount: expect.any(Number),
    experience: [
      {
        position: 'Writer',
        location: 'United Kingdom',
        employmentType: null,
        workplaceType: 'Remote',
        companyName: 'Leverage AI',
        companyLinkedinUrl: 'https://www.linkedin.com/company/leverageainewsletter/',
        companyId: '105979801',
        companyUniversalName: 'leverageainewsletter',
        description:
          'Step-by-step tutorials, prompts, and templates. Learn how to use AI and automation to save time and achieve more—all in just 5 minutes a week.',
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2025,
          text: 'Jan 2025',
        },
      },
      {
        position: 'Director, Software Engineering',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Oracle',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1028/',
        companyId: '1028',
        description:
          'Leading an engineering org across three countries. Responsible for Tier 0 and Tier 1 public cloud services operating in 90+ global regions. API management, AI agents, AI.',
        skills: [
          'Software Engineering Management',
          'AI Engineering',
          'Cloud Computing',
          'Java',
          'AI Agents',
        ],
        startDate: {
          month: 'Aug',
          year: 2022,
          text: 'Aug 2022',
        },
      },
      {
        position: 'Senior Software Engineering Manager',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Oracle',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1028/',
        companyId: '1028',
        duration: '4 yrs 5 mos',
        description:
          'Senior Manager and service owner for Oracle API Gateway, a public cloud service deployed and operated in 20+ countries. Responsible for customer engagement, hiring and growing teams, delivery, and roadmap.',
        skills: [
          'Management',
          'Leadership',
          'Automation',
          'Software Development',
          'Hiring',
          'Software Engineering Management',
          'Software Engineering',
        ],
        startDate: {
          month: 'Apr',
          year: 2018,
          text: 'Apr 2018',
        },
        endDate: {
          month: 'Aug',
          year: 2022,
          text: 'Aug 2022',
        },
      },
      {
        position: 'Senior Principal Software Engineer',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Oracle',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1028/',
        companyId: '1028',
        duration: '1 yr 10 mos',
        description:
          'Service owner for CI/CD services. Managed delivery of MySQL Operator for Kubernetes and collaborated with MySQL team to ensure long-term investment in the operator. Led delivery of software used by Oracle Managed Kubernetes (OKE), including MySQL Operator, Cloud Controller Manager, Flex Storage Driver, Volume Provisioners and more. \n\nWorked with Netflix and Google teams on Spinnaker integration for Oracle Cloud.',
        skills: [
          'Team Leadership',
          'Java',
          'Python (Programming Language)',
          'Go (Programming Language)',
          'Kubernetes',
          'Automation',
          'Clojure',
          'Software Engineering',
        ],
        startDate: {
          month: 'Jul',
          year: 2016,
          text: 'Jul 2016',
        },
        endDate: {
          month: 'Apr',
          year: 2018,
          text: 'Apr 2018',
        },
      },
      {
        position: 'Senior Software Engineer',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'FINkit® is Fiserv',
        companyLinkedinUrl: 'https://www.linkedin.com/company/31092/',
        companyId: '31092',
        duration: '1 yr 3 mos',
        description:
          'Built microservices with Scala, Java and Akka on IBM Cloud. Led a global remote team of engineers building secure payment APIs. Led POCs and demos for payment processing solutions to win new business with the UK banking sector. Wrote code generation tooling used by all services and teams to increase efficiency',
        skills: [
          'Team Leadership',
          'Java',
          'Software Architecture',
          'Automation',
          'Scala',
          'Software Engineering',
        ],
        startDate: {
          month: 'May',
          year: 2015,
          text: 'May 2015',
        },
        endDate: {
          month: 'Jul',
          year: 2016,
          text: 'Jul 2016',
        },
      },
      {
        position: 'Senior Software Engineer',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'BBC',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1762/',
        companyId: '1762',
        duration: '1 yr 3 mos',
        description:
          'Built and operated core BBC public services using Scala, Akka, and AWS. Our team were early adopters of Amazon Web Services (AWS) building a fault-tolerant microservice architecture using Scala, DynamoDB, Akka, and Play.',
        skills: ['Automation', 'Distributed Systems', 'Scala', 'Amazon Web Services (AWS)'],
        startDate: {
          month: 'Mar',
          year: 2014,
          text: 'Mar 2014',
        },
        endDate: {
          month: 'May',
          year: 2015,
          text: 'May 2015',
        },
      },
      {
        position: 'Software Engineer',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Box UK',
        companyLinkedinUrl: 'https://www.linkedin.com/company/38538/',
        companyId: '38538',
        duration: '2 yrs',
        description:
          'Software engineering including a Ruby On Rails app for World Vision. Delivered technical projects in C#, Ruby, Clojure, JavaScript',
        skills: ['Ruby on Rails', 'C#', 'JavaScript'],
        startDate: {
          year: 2011,
          text: '2011',
        },
        endDate: {
          year: 2013,
          text: '2013',
        },
      },
      {
        position: 'Software Engineer',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Sequence - Your Digital Agency',
        companyLinkedinUrl: 'https://www.linkedin.com/company/265896/',
        companyId: '265896',
        duration: '2 yrs 1 mo',
        description:
          'Software Engineer working on diverse projects primarily in C#/JavaScript. Worked on projects for large customers such as Disney.',
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2009,
          text: 'Jan 2009',
        },
        endDate: {
          month: 'Jan',
          year: 2011,
          text: 'Jan 2011',
        },
      },
    ],
    skills: [
      {
        name: 'AI Agents',
        positions: ['Director, Software Engineering at Oracle'],
        endorsements: expect.stringContaining('endorsements'),
      },
      {
        name: 'AI Prompting',
        endorsements: expect.stringContaining('endorsements'),
      },
    ],
  },
  {
    id: 'ACoAACLevxsBfWQoDUYkHyCP2jzl81cDAvckQEI',
    publicIdentifier: 'towhid-rahman',
    firstName: 'Towhid',
    lastName: 'Rahman, PharmD',
    linkedinUrl: 'https://www.linkedin.com/in/towhid-rahman',
    openToWork: false,
    hiring: false,
    connectionsCount: expect.any(Number),
    photo: expect.stringContaining('media.licdn.com/dms/'),
    location: {
      linkedinText: 'Los Angeles, California, United States',
      countryCode: 'US',
      parsed: {
        text: 'Los Angeles, CA, United States',
        countryCode: 'US',
        regionCode: null,
        country: 'United States',
        countryFull: 'United States of America',
        state: 'California',
        city: 'Los Angeles',
      },
    },
    registeredAt: '2017-07-29T17:39:39.165Z',
    experience: [
      {
        position:
          'Staff Pharmacist | Prescription Dispensing, Drug Utilization Review, Regulatory Compliance',
        location: 'Thousand Oaks, California, United States',
        employmentType: 'Full-time',
        workplaceType: 'On-site',
        companyName: 'CVS Health',
        companyLinkedinUrl: 'https://www.linkedin.com/company/cvshealth/',
        companyId: '4680',
        companyUniversalName: 'cvshealth',
        description:
          '*Exceeded daily production targets by 15% in a high-demand pharmacy environment while ensuring timely service delivery to over 1000 patients each week without compromising quality or accuracy.\n\n* Managed multiple priorities simultaneously by implementing efficient workflow strategies that significantly reduced prescription processing time by 20%, enhancing overall patient satisfaction scores.\n\n* Conducted comprehensive drug utilization reviews utilizing AI-driven tools to identify potential safety concerns, leading to a 30% reduction in adverse drug interactions reported among patients.\n\n* Delivered expert patient counseling on medication usage and interactions for over 50 individuals weekly, improving adherence rates by approximately 25% through personalized education efforts.\n\n* Executed state and federal controlled substance dispensing audits with zero discrepancies found, ensuring strict compliance with regulatory standards while proactively preventing misuse or fraud.',
        skills: [
          'Scientific Liaison',
          'Cultural Awareness',
          'Resource Optimization',
          'Active Listening',
          'Certified Immunizer',
          'Interpersonal Communication',
          'Medication Dispensing',
          'Regulatory Compliance',
        ],
        startDate: {
          month: 'Jan',
          year: 2024,
          text: 'Jan 2024',
        },
      },
      {
        position:
          'Support Pharmacist | Patient Care Management, Medication Optimization, Healthcare Collaboration',
        location: 'Los Angeles, California, United States',
        employmentType: 'Full-time',
        workplaceType: 'On-site',
        companyName: 'CVS Health',
        companyLinkedinUrl: 'https://www.linkedin.com/company/cvshealth/',
        companyId: '4680',
        companyUniversalName: 'cvshealth',
        duration: '1 yr 2 mos',
        description:
          '* Collaborated with over 30 diverse pharmacy teams across various locations to address unique demographic needs and overcome specific challenges in each community, enhancing service delivery by 25%.\n\n* Mentored pharmacy technicians and trained new staff members to promote teamwork and operational efficiency, reducing onboarding time by 40% through streamlined training processes.\n\n* Evaluated drug storage conditions and optimized handling procedures to maintain medication efficacy while ensuring colleague safety; achieved a compliance rate of 98% during inspections.\n\n* Assisted patients with insurance issues by providing affordable alternatives and encouraging adherence through proactive follow-ups; increased patient adherence rates by 20% over the year.',
        skills: [
          'Healthcare System Knowledge',
          'Drug Utilization Review',
          'Cardiopulmonary Resuscitation (CPR)',
          'Project Management',
          'Medication Adherence',
          'Collaborative Problem Solving',
          'Scientific Communications',
          'Basic Life Support (BLS)',
          'Medical Terminology',
          'Drug Interactions',
          'Professional Networking',
          'Healthcare Compliance',
          'Drug Therapy Optimization',
          'Medication Safety',
        ],
        startDate: {
          month: 'Nov',
          year: 2022,
          text: 'Nov 2022',
        },
        endDate: {
          month: 'Dec',
          year: 2023,
          text: 'Dec 2023',
        },
      },
      {
        position:
          'Intern Pharmacist | Immunization Administration, Patient Counseling, Medication Safety',
        location: 'Los Angeles, California, United States',
        employmentType: 'Part-time',
        workplaceType: 'On-site',
        companyName: 'CVS Health',
        companyLinkedinUrl: 'https://www.linkedin.com/company/cvshealth/',
        companyId: '4680',
        companyUniversalName: 'cvshealth',
        duration: '4 yrs 1 mo',
        description:
          "* Administered over 1,500 immunizations during tenure, significantly enhancing community access to preventive healthcare services and contributing to improved public health outcomes in Los Angeles.\n\n* Conducted health screenings for more than 2,000 patients, providing tailored wellness advice that promoted lifestyle modifications such as smoking cessation and weight management for long-term health benefits.\n\n* Meticulously reviewed prescribers' information (USPI) and medication guides to identify potential drug safety concerns. Educated over 100 patients weekly on safe medication use practices and enhanced their understanding of treatment plans.\n\n* Delivered evidence-based recommendations on medication allergies and interactions that addressed patient-specific concerns, resulting in a notable reduction in adverse drug events within the community.\n\n* Collaborated with pharmacy teams to manage inventory effectively, ensuring accurate stock levels which minimized waste from expired medications by 30% during the internship period.\n\n* Organized medication adherence programs that included refill reminders for over 200 patients monthly, successfully resolving insurance-related access challenges that improved overall patient satisfaction.",
        skills: ['Retail', 'Patient Counseling', 'OTC', 'Immunization', 'Medication Safety'],
        startDate: {
          month: 'Nov',
          year: 2018,
          text: 'Nov 2018',
        },
        endDate: {
          month: 'Nov',
          year: 2022,
          text: 'Nov 2022',
        },
      },
      {
        position:
          'Certified Pharmacy Technician | Prescription Dispensing, Inventory Management, HIPAA Compliance',
        location: 'Los Angeles, California, United States',
        employmentType: 'Part-time',
        workplaceType: 'On-site',
        companyName: 'CVS Health',
        companyLinkedinUrl: 'https://www.linkedin.com/company/cvshealth/',
        companyId: '4680',
        companyUniversalName: 'cvshealth',
        duration: '3 yrs 3 mos',
        description:
          '* Processed over 500 medication orders weekly by accurately labeling prescriptions and verifying dosage instructions, ensuring a 98% accuracy rate in medication dispensing and reducing patient wait times significantly.\n\n* Managed inventory levels by conducting regular checks and placing timely orders that resulted in a 30% reduction in expired products, thereby maintaining compliance with safety regulations and optimizing operational efficiency.\n\n* Conducted insurance verifications and claims processing for patients which streamlined prescription fulfillment processes, leading to a decrease in processing delays by 25% and enhancing patient satisfaction scores.\n\n* Ensured adherence to HIPAA regulations by safeguarding patient information during interactions and transactions, contributing to the pharmacy’s reputation for confidentiality and trustworthiness within the community.\n\n* Supported pharmacists in managing medication recalls effectively while performing quality control checks on medications to uphold safety standards for all patients served at the pharmacy.',
        skills: [
          'Retail',
          'Healthcare System Knowledge',
          'Customer Service',
          'Teamwork',
          'U.S. Health Insurance Portability and Accountability Act (HIPAA)',
          'Insurance Billing',
          'Time Management',
        ],
        startDate: {
          month: 'Sep',
          year: 2015,
          text: 'Sep 2015',
        },
        endDate: {
          month: 'Nov',
          year: 2018,
          text: 'Nov 2018',
        },
      },
      {
        position:
          'Intern Pharmacist | Health-Systems Ambulatory Care, Evidence-Based Therapy, Clinical Research',
        location: 'California, United States',
        employmentType: 'Internship',
        workplaceType: 'Hybrid',
        companyName: 'VA Greater Los Angeles Healthcare System',
        companyLinkedinUrl:
          'https://www.linkedin.com/search/results/all/?keywords=VA+Greater+Los+Angeles+Healthcare+System',
        duration: '5 mos',
        description:
          '* Analyzed over 100 patients’ medical charts to identify high-risk individuals for cardiovascular diseases, significantly improving targeted therapy recommendations and enhancing patient outcomes in the cardiology department.\n\n* Organized and facilitated cardiology clinics that increased patient throughput by 30%, ensuring timely access to essential healthcare services for veterans while collaborating with a multidisciplinary team.\n\n* Completed a comprehensive project on ‘Essential and Evidence-based Cardiovascular Disease Medicine Availability in Low-Cost Generic Drug Plans’, culminating in a poster presentation that informed hospital policy on medication accessibility.',
        skills: [
          'High-quality Actionable Insight',
          'Peer Relationships',
          'Healthcare System Knowledge',
          'Drug Utilization Review',
          'Clinical Research',
          'Data Analysis',
          'Project Management',
          'Research Proposals',
          'Collaborative Problem Solving',
          'Public Speaking',
          'Literature Reviews',
          'Scientific Discussion',
          'Research Skills',
          'Scientific Communications',
          'Presentation Skills',
          'Relationship Building',
          'Professional Networking',
          'Collaboration in Healthcare',
        ],
        startDate: {
          month: 'Jan',
          year: 2022,
          text: 'Jan 2022',
        },
        endDate: {
          month: 'May',
          year: 2022,
          text: 'May 2022',
        },
      },
      {
        position: 'Intern Pharmacist | Ambulatory Care,  Patient Education, Disease Management',
        location: 'California, United States',
        employmentType: 'Internship',
        workplaceType: 'Hybrid',
        companyName: 'Harbor-UCLA Medical Center',
        companyLinkedinUrl: 'https://www.linkedin.com/company/38115891/',
        companyId: '38115891',
        duration: '2 mos',
        description:
          '* Implemented guideline-recommended drug therapy for diabetes and hyperlipidemia patients, positively impacting treatment adherence and health outcomes for a diverse patient population.\n\n* Conducted comprehensive patient interviews focused on disease management education, successfully enhancing patient understanding of their conditions and promoting healthier lifestyle choices.\n\n* Collaborated with healthcare teams to optimize medication regimens, ensuring safe and effective pharmacotherapy aligned with the latest clinical guidelines.\n\n* Documented patient interactions and outcomes meticulously, contributing to improved continuity of care and accurate health records for future reference.',
        skills: [
          'High-quality Actionable Insight',
          'Peer Relationships',
          'Healthcare System Knowledge',
          'Drug Utilization Review',
          'Scientific Discussion',
          'Scientific Communications',
          'Presentation Skills',
          'Relationship Building',
          'Professional Networking',
        ],
        startDate: {
          month: 'Nov',
          year: 2021,
          text: 'Nov 2021',
        },
        endDate: {
          month: 'Dec',
          year: 2021,
          text: 'Dec 2021',
        },
      },
      {
        position: 'Intern Pharmacist | General Medicine, Medication Management, Clinical Analysis',
        location: 'California, United States',
        employmentType: 'Internship',
        workplaceType: 'On-site',
        companyName: 'Olive View-UCLA Medical Center',
        companyLinkedinUrl: 'https://www.linkedin.com/company/62210181/',
        companyId: '62210181',
        duration: '3 mos',
        description:
          '* Participated in daily medical rounds with interdisciplinary teams, delivering medication recommendations that enhanced patient care strategies and improved overall treatment outcomes for diverse patient populations.\n\n* Analyzed over 100 patient medical records to identify critical red flags, leading to tailored treatment plans that significantly improved medication adherence and therapeutic effectiveness for patients in a hospital setting.\n\n* Collaborated with healthcare professionals to ensure accurate medication management, contributing to a streamlined process that reduced potential drug interactions and optimized patient safety during hospital stays.',
        skills: [
          'High-quality Actionable Insight',
          'Peer Relationships',
          'Healthcare System Knowledge',
          'Collaborative Problem Solving',
          'Scientific Discussion',
          'Scientific Communications',
          'Presentation Skills',
          'Relationship Building',
          'Professional Networking',
        ],
        startDate: {
          month: 'Sep',
          year: 2021,
          text: 'Sep 2021',
        },
        endDate: {
          month: 'Nov',
          year: 2021,
          text: 'Nov 2021',
        },
      },
      {
        position:
          'Intern Pharmacist | Transitional Care, Medication Reconciliation, Guideline Directed Therapy',
        location: 'California, United States',
        employmentType: 'Internship',
        workplaceType: 'On-site',
        companyName: 'Olive View-UCLA Medical Center',
        companyLinkedinUrl: 'https://www.linkedin.com/company/62210181/',
        companyId: '62210181',
        duration: '2 mos',
        description:
          '* Participated in the admission and discharge medication reconciliation process for over 50 patients weekly, ensuring accurate medication lists to enhance patient safety and continuity of care.\n\n* Delivered comprehensive patient discharge counseling sessions that improved understanding of medication regimens, leading to a 30% reduction in post-discharge complications among patients.\n\n* Analyzed clinical data to provide evidence-based recommendations for Guideline Directed Medication Therapy, optimizing treatment plans for diverse patient populations.',
        skills: [
          'Drug Utilization Review',
          'Collaborative Problem Solving',
          'Scientific Discussion',
          'Relationship Building',
        ],
        startDate: {
          month: 'Aug',
          year: 2021,
          text: 'Aug 2021',
        },
        endDate: {
          month: 'Sep',
          year: 2021,
          text: 'Sep 2021',
        },
      },
      {
        position:
          'Intern Pharmacist | Health-Systems Practice, Expired Medication Management, Financial Analysis',
        location: 'California, United States',
        employmentType: 'Internship',
        workplaceType: 'On-site',
        companyName: 'Olive View-UCLA Medical Center',
        companyLinkedinUrl: 'https://www.linkedin.com/company/62210181/',
        companyId: '62210181',
        duration: '3 mos',
        description:
          '* Analyzed hospital pharmacy operations to identify inefficiencies, contributing to a 15% improvement in workflow efficiency during the internship period through targeted recommendations for process enhancements.\n\n* Actively participated in the identification and handling of expired medications, successfully reducing potential financial losses by approximately $10,000 through improved inventory management practices.\n\n* Completed a comprehensive project on expired medication management that provided actionable insights to the management team, leading to the implementation of new protocols for medication oversight.',
        skills: [
          'Peer Relationships',
          'Healthcare System Knowledge',
          'Drug Utilization Review',
          'Public Speaking',
          'Scientific Discussion',
          'Scientific Communications',
          'Relationship Building',
        ],
        startDate: {
          month: 'Jun',
          year: 2021,
          text: 'Jun 2021',
        },
        endDate: {
          month: 'Aug',
          year: 2021,
          text: 'Aug 2021',
        },
      },
      {
        position:
          'Application Scientist | Particle Size Analysis, Pharmaceutical Consultation, Training Development',
        location: 'Dhaka, Bangladesh',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Bio-Xin Pvt. Ltd.',
        companyLinkedinUrl:
          'https://www.linkedin.com/search/results/all/?keywords=Bio-Xin+Pvt%2E+Ltd%2E',
        duration: '1 yr 8 mos',
        description:
          '* Delivered expert consultation to over 50 pharmaceutical clients on drug particle size analysis, significantly enhancing their understanding of its impact on drug efficacy and performance metrics.\n\n* Conducted 15+ training sessions and workshops tailored to client needs, improving the operational proficiency of advanced particle size analysis systems for metered-dose inhalers and nasal sprays.\n\n* Collaborated with global cross-functional teams, including pharmaceutical companies and equipment manufacturers, driving innovation that resulted in a 30% increase in product quality standards across projects.\n\n* Developed customized training materials that addressed specific client challenges, leading to a 25% improvement in client satisfaction ratings regarding product performance and usability.',
        skills: [
          'Product Marketing',
          'Customer Engagement',
          'Project Management',
          'Client Relations',
          'Public Speaking',
          'Scientific Communications',
          'Presentation Skills',
          'Relationship Building',
          'Drug Particle Size Analysis',
          'Pharmaceutical Industry Consultation',
          'Training Development',
          'Cross-Functional Collaboration',
        ],
        startDate: {
          month: 'Sep',
          year: 2011,
          text: 'Sep 2011',
        },
        endDate: {
          month: 'Apr',
          year: 2013,
          text: 'Apr 2013',
        },
      },
    ],
    education: [
      {
        schoolName: 'Western University of Health Sciences',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/26345/',
        degree: 'Doctor of Pharmacy',
        fieldOfStudy: 'Pharmacy',
        skills: [
          'Healthcare System Knowledge',
          'Relationship Building',
          'Pharmacodynamics',
          'Scientific Communications',
          'Cross-functional Team Leadership',
          'Research Skills',
          'Professional Networking',
          'Expense Reports',
          'Presentation Skills',
          'Laboratory Skills',
          'Scientific Discussion',
          'Medical Terminology',
          'Collaborative Problem Solving',
          'Public Speaking',
          'Clinical Trials',
          'Drug Utilization Review',
          'Pharmacology',
          'Data Analysis',
          'Project Management',
        ],
        startDate: {
          month: 'Aug',
          year: 2018,
          text: 'Aug 2018',
        },
        endDate: {
          month: 'May',
          year: 2022,
          text: 'May 2022',
        },
        period: 'Aug 2018 - May 2022',
      },
      {
        schoolName: 'KTH Royal Institute of Technology',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/4814/',
        degree: 'Master of Science',
        fieldOfStudy: 'Biotechnology',
        skills: [
          'Scientific Communications',
          'Cross-functional Team Leadership',
          'Research Skills',
          'Professional Networking',
          'Presentation Skills',
          'Laboratory Skills',
          'Scientific Discussion',
          'Collaborative Problem Solving',
          'Public Speaking',
          'Clinical Research',
          'Data Analysis',
          'Project Management',
          'Literature Reviews',
        ],
        startDate: {
          month: 'Aug',
          year: 2007,
          text: 'Aug 2007',
        },
        endDate: {
          month: 'Jan',
          year: 2011,
          text: 'Jan 2011',
        },
        period: 'Aug 2007 - Jan 2011',
      },
      {
        schoolName: 'Khulna University',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/9537234/',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Biotechnology and Genetic Engineering',
        skills: [
          'Scientific Communications',
          'Cross-functional Team Leadership',
          'Professional Networking',
          'Presentation Skills',
          'Laboratory Skills',
          'Scientific Discussion',
          'Public Speaking',
          'Data Analysis',
          'Project Management',
        ],
        startDate: {
          month: 'Aug',
          year: 2001,
          text: 'Aug 2001',
        },
        endDate: {
          month: 'May',
          year: 2005,
          text: 'May 2005',
        },
        period: 'Aug 2001 - May 2005',
      },
      {
        schoolName: 'Los Angeles Pierce College',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/231552/',
        degree: 'Associate of Science',
        fieldOfStudy: null,
        skills: [
          'Cross-functional Team Leadership',
          'Professional Networking',
          'Presentation Skills',
          'Laboratory Skills',
          'Scientific Discussion',
          'Collaborative Problem Solving',
          'Public Speaking',
          'Data Analysis',
          'Project Management',
        ],
        startDate: {
          year: 2015,
          text: '2015',
        },
        endDate: {
          year: 2018,
          text: '2018',
        },
        period: '2015 - 2018',
      },
    ],
    languages: [
      {
        language: 'Bengali',
        proficiency: 'Native or bilingual proficiency',
      },
      {
        language: 'English',
        proficiency: 'Full professional proficiency',
      },
    ],
    projects: [
      {
        title:
          'Essential and Evidence-Based Cardiovascular Disease Medicine Availability in Low-Cost Generic Drug Plans',
        description:
          'The project estimated the availability of essential and guideline-recommended cardiovascular medicines in low-cost generic drug programs in the United States.',
        duration: 'Jan 2022 - May 2022',
        startDate: {
          month: 'Jan',
          year: 2022,
          text: 'Jan 2022',
        },
        endDate: {
          month: 'May',
          year: 2022,
          text: 'May 2022',
        },
      },
      {
        title: 'Androgen Mediated Inhibition of STAT3 Phosphorylation and Lipogenesis in Liver',
        description:
          'The study demonstrated that testosterone-mediated inhibition of pSTAT3 may contribute to the lipogenic gene expression in the liver.',
        duration: 'Apr 2009 - Nov 2009',
        startDate: {
          month: 'Apr',
          year: 2009,
          text: 'Apr 2009',
        },
        endDate: {
          month: 'Nov',
          year: 2009,
          text: 'Nov 2009',
        },
      },
    ],
    publications: [
      {
        title:
          "Evidence-Based Cardiovascular Disease Medicines' Availability in Low-Cost Generic Drug Programs in the United States: A Cross-Sectional Study",
        publishedAt: 'Annals of Internal Medicine · Sep 5, 2023',
        link: 'https://www.acpjournals.org/doi/10.7326/M23-0287',
      },
    ],
    verified: true,
  },
  {
    id: 'ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc',
    publicIdentifier: 'williamhgates',
    firstName: 'Bill',
    lastName: 'Gates',
    websites: ['https://gatesnot.es/tgn'],
    headline: 'Chair, Gates Foundation and Founder, Breakthrough Energy',
    about:
      'Chair of the Gates Foundation. Founder of Breakthrough Energy. Co-founder of Microsoft. Voracious reader. Avid traveler. Active blogger.',
    linkedinUrl: 'https://www.linkedin.com/in/williamhgates',
    openToWork: false,
    hiring: false,
    photo: expect.stringContaining(
      'https://media.licdn.com/dms/image/v2/D5603AQF-RYZP55jmXA/profile-displayphoto-shrink_800_800/',
    ),
    location: {
      linkedinText: 'Seattle, Washington, United States',
      countryCode: 'US',
      parsed: {
        text: 'Seattle, WA, United States',
        countryCode: 'US',
        regionCode: null,
        country: 'United States',
        countryFull: 'United States of America',
        state: 'Washington',
        city: 'Seattle',
      },
    },
    registeredAt: '2013-05-02T19:09:40.840Z',
    connectionsCount: 8,
    currentPosition: [
      {
        companyName: 'Gates Foundation',
      },
    ],
    experience: [
      {
        position: 'Co-chair',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Gates Foundation',
        companyLinkedinUrl: 'https://www.linkedin.com/company/gates-foundation/',
        companyId: '8736',
        companyUniversalName: 'gates-foundation',
        description: null,
        skills: null,
        startDate: {
          year: 2000,
          text: '2000',
        },
        endDate: {
          text: 'Present',
        },
      },
      {
        position: 'Founder',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Breakthrough Energy',
        companyLinkedinUrl: 'https://www.linkedin.com/company/19141006/',
        companyId: '19141006',
        description: null,
        skills: null,
        startDate: {
          year: 2015,
          text: '2015',
        },
        endDate: {
          text: 'Present',
        },
      },
      {
        position: 'Co-founder',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Microsoft',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1035/',
        companyId: '1035',
        description: null,
        skills: null,
        startDate: {
          year: 1975,
          text: '1975',
        },
        endDate: {
          text: 'Present',
        },
      },
    ],
    education: [
      {
        schoolName: 'Harvard University',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/1646/',
        degree: null,
        fieldOfStudy: null,
        skills: [],
        startDate: {
          year: 1973,
          text: '1973',
        },
        endDate: {
          year: 1975,
          text: '1975',
        },
        period: '1973 - 1975',
      },
      {
        schoolName: 'Lakeside School',
        schoolLinkedinUrl: 'https://www.linkedin.com/company/30288/',
        degree: null,
        fieldOfStudy: null,
        skills: [],
      },
    ],
  },
  {
    id: 'ACoAACBg5hYBrMv4Nw5NNrpXa3_LlZJV8s_Pq54',
    publicIdentifier: 'justinshillingford',
    firstName: 'Justin',
    lastName: 'Shillingford',
    linkedinUrl: 'https://www.linkedin.com/in/justinshillingford',
    registeredAt: '2016-12-05T07:43:07.858Z',
    connectionsCount: expect.any(Number),
    photo: expect.stringContaining('media.licdn.com/dms/'),
    experience: [
      {
        position: 'Full Stack Web Developer, Adobe Acrobat Web',
        location: 'San Jose, California, United States',
        employmentType: 'Full-time',
        workplaceType: 'Hybrid',
        companyName: 'Adobe',
        companyLinkedinUrl: 'https://www.linkedin.com/company/adobe/',
        companyId: '1480',
        companyUniversalName: 'adobe',
        description: null,
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2024,
          text: 'Jan 2024',
        },
      },
      {
        position: 'Full Stack Web Developer, Adobe Acrobat Sign',
        location: 'San Jose, California, United States',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Adobe',
        companyLinkedinUrl: 'https://www.linkedin.com/company/adobe/',
        companyId: '1480',
        companyUniversalName: 'adobe',
        duration: '2 yrs 7 mos',
        description: null,
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2021,
          text: 'Jun 2021',
        },
        endDate: {
          month: 'Dec',
          year: 2023,
          text: 'Dec 2023',
        },
      },
      {
        position: 'Teaching Associate (Winter) - Ethics in New Media, Technology and Communication',
        location: 'Ithaca, New York, United States',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '1 mo',
        description: null,
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2021,
          text: 'Jan 2021',
        },
        endDate: {
          month: 'Jan',
          year: 2021,
          text: 'Jan 2021',
        },
      },
      {
        position: 'Graduate Teaching Research Specialist - Computing and Global Development',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '5 mos',
        description:
          '- Designing course content to ensure successful student learning outcomes.\n- Grading and providing feedback on student assignments.\n- Providing guidance to student groups working on an ICTD project for the semester.',
        skills: null,
        startDate: {
          month: 'Aug',
          year: 2020,
          text: 'Aug 2020',
        },
        endDate: {
          month: 'Dec',
          year: 2020,
          text: 'Dec 2020',
        },
      },
      {
        position: 'Software Engineering Intern',
        location: null,
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'TaggiD, Inc.',
        companyLinkedinUrl: 'https://www.linkedin.com/company/42688094/',
        companyId: '42688094',
        duration: '3 mos',
        description:
          '- Developed full-stack software for an iOS social media app built from scratch.\n- Utilized TypeScript React Native in the front-end and Django in the back-end.\n- Followed sprint methodology to meet all development goals.',
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2020,
          text: 'Jun 2020',
        },
        endDate: {
          month: 'Aug',
          year: 2020,
          text: 'Aug 2020',
        },
      },
      {
        position: 'Teaching Assistant - Data-Driven Web Applications',
        location: 'Ithaca, New York',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '5 mos',
        description:
          "- Answering questions and providing helpful tips on the course's Question & Answer forum on Campuswire\n- Hosting Office Hours in order to provide students more in-depth and personal assistance with the understanding of course content, troubleshooting technical issues, and questions about the assigned projects\n- Reviewing the code and the assignments submitted by the students and grading them on code quality, adherence to best practices, and the caliber of the project itself",
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2020,
          text: 'Jan 2020',
        },
        endDate: {
          month: 'May',
          year: 2020,
          text: 'May 2020',
        },
      },
      {
        position: 'Teaching Assistant - Artificial Intelligence',
        location: 'Ithaca, NY',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '7 mos',
        description:
          "- Answering questions and providing helpful tips on the course's Question & Answer forum on Piazza\n- Hosting Office Hours in order to provide students more in-depth and personal assistance with the understanding of course content, troubleshooting technical issues, and questions about the assigned projects\n- Reviewing the code and the assignments submitted by the students and grading them on code quality, adherence to best practices, and the caliber of the project itself",
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2019,
          text: 'Jun 2019',
        },
        endDate: {
          month: 'Dec',
          year: 2019,
          text: 'Dec 2019',
        },
      },
      {
        position: 'Teaching Assistant - Intermediate Design and Programming for the Web',
        location: 'Ithaca, New York',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '5 mos',
        description:
          "- Lead a Lab section once a week in which I teach new concepts and provide assistance to the students of the course via a small lecture and a lab assignment\n- Answering questions and providing helpful tips on the course's Question & Answer forum on Piazza\n- Hosting Office Hours in order to provide students more in-depth and personal assistance with the understanding of course content, troubleshooting technical issues, and questions about the assigned projects\n- Reviewing the code and the actual projects and lab assignments submitted by the students and grading them on code quality, adherence to best practices, and the caliber of the project itself",
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2019,
          text: 'Jan 2019',
        },
        endDate: {
          month: 'May',
          year: 2019,
          text: 'May 2019',
        },
      },
      {
        position: 'Teaching Assistant - Introductory Design & Programming for the Web',
        location: 'Ithaca, New York, United States',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '5 mos',
        description:
          "- Lead a Lab section once a week in which I teach new concepts and provide assistance to the students of the course via a small lecture and a lab assignment\n- Answering questions and providing helpful tips on the course's Question & Answer forum on Piazza\n- Hosting Office Hours in order to provide students more in-depth and personal assistance with the understanding of course content, troubleshooting technical issues, and questions about the assigned projects\n- Reviewing the code and the actual projects and lab assignments submitted by the students and grading them on code quality, adherence to best practices, and the caliber of the project itself",
        skills: null,
        startDate: {
          month: 'Aug',
          year: 2018,
          text: 'Aug 2018',
        },
        endDate: {
          month: 'Dec',
          year: 2018,
          text: 'Dec 2018',
        },
      },
      {
        position: 'Hardware Engineering Intern',
        location: 'Sunnyvale, California',
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'Google',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1441/',
        companyId: '1441',
        duration: '4 mos',
        description:
          "Created an ipynb metric dashboard using Colaboratory and Python's Pandas library to construct accessible, usable, and meaningful data visualizations for the chip DV team\nRefactored entire codebase to upgrade from Python 2 to Python 3 and to comply with best practices Underwent code review including readability, presubmits, and director approval\nPushed code to production leading to a 50% increase in visualized data that was immediately put to use\nComposed formal documentation for the project to aid with future development",
        skills: null,
        startDate: {
          month: 'May',
          year: 2019,
          text: 'May 2019',
        },
        endDate: {
          month: 'Aug',
          year: 2019,
          text: 'Aug 2019',
        },
      },
      {
        position: 'Electrical Team Lead',
        location: 'Ithaca, New York',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell Hyperloop',
        companyLinkedinUrl: 'https://www.linkedin.com/company/17877810/',
        companyId: '17877810',
        duration: '1 yr',
        description:
          "A team of students collaboratively working on constructing a pod to compete in SpaceX's Hyperloop Pod Competition. \nManaging the Hardware and Software Subteams to ensure that we are making significant progress on the electrical system we are creating to dynamically modify our pod's behavior based on sensor input.\nProviding technical assistance to both Subteams as a veteran member and former Subteam Lead of the team.\nCommunicating with the other Team Leads to best inform any decisions I make about the Team's direction.\nKeeping in contact with both our sponsors and SpaceX in order to ensure we have the guidance to increase our chances of being selected to have our Pod compete.",
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2018,
          text: 'Jun 2018',
        },
        endDate: {
          month: 'May',
          year: 2019,
          text: 'May 2019',
        },
      },
      {
        position: 'Electrical Hardware Subteam Lead',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell Hyperloop',
        companyLinkedinUrl: 'https://www.linkedin.com/company/17877810/',
        companyId: '17877810',
        duration: '1 yr',
        description: null,
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2017,
          text: 'Jun 2017',
        },
        endDate: {
          month: 'May',
          year: 2018,
          text: 'May 2018',
        },
      },
      {
        position: 'Electrical Hardware Subteam Member',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell Hyperloop',
        companyLinkedinUrl: 'https://www.linkedin.com/company/17877810/',
        companyId: '17877810',
        duration: '5 mos',
        description: null,
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2017,
          text: 'Jan 2017',
        },
        endDate: {
          month: 'May',
          year: 2017,
          text: 'May 2017',
        },
      },
      {
        position: 'Software Engineering Intern (Front-/Back-end)',
        location: 'Sunnyvale, California',
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'Walmart Labs',
        companyLinkedinUrl: 'https://www.linkedin.com/company/11174522/',
        companyId: '11174522',
        duration: '4 mos',
        description:
          "Produced impactful improvements on the Google Assistant app for Walmart's UK based grocery store, ASDA\nIncreased the amount of data being sent for analysis with each Voice call by ~70%\nEliminated pre-existing bugs, bolstering the app's usability as a result\nPushed code to production during the internship, allowing my work to have immediate significance Handled the front-end with Google's Dialogflow platform and the back-end with Node.js",
        skills: null,
        startDate: {
          month: 'May',
          year: 2018,
          text: 'May 2018',
        },
        endDate: {
          month: 'Aug',
          year: 2018,
          text: 'Aug 2018',
        },
      },
      {
        position: 'Mobile Engineering Intern',
        location: 'Sunnyvale, California',
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'Walmart Labs',
        companyLinkedinUrl: 'https://www.linkedin.com/company/11174522/',
        companyId: '11174522',
        duration: '3 mos',
        description:
          'The sole intern of the 7 person team developing Electrode Native, an Open-Source mobile development platform\nTasked with engineering a Mobile App for iOS that demonstrates the benefits associated with utilizing Electrode Native\nThe app was created completely on Electrode Native, which is built atop the React Native framework\nSpeaking with Executive members of WalmartLabs, about the future of eCommerce and the strides WalmartLabs is making in order to secure a spot as a serious competitor in the eCommerce sphere',
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2017,
          text: 'Jun 2017',
        },
        endDate: {
          month: 'Aug',
          year: 2017,
          text: 'Aug 2017',
        },
      },
      {
        position: 'Software Engineer',
        location: 'San Bruno, California',
        employmentType: null,
        workplaceType: null,
        companyName: 'Walmart Brick & Code 2.0 eCommerce Hackathon',
        companyLinkedinUrl: 'https://www.linkedin.com/company/2646/',
        companyId: '2646',
        duration: '1 mo',
        description:
          'Tasked with identifying and developing a beta test ready innovative solution to the problem statement within the competition hours (26 hours), which is beneficial to both the customer and the business\nAccording to the problem statement, the developed solution should also grow Walmart\'s appeal with millennials\nDeveloped an app that would facilitate a concept my team created called "Shop Sharing" The app, named Basket, allows a group of people to order items from Walmart together and have them shipped in one box. This benefits Walmart by allowing them to cut down on shipping costs and it facilitates discounts to the customers.\nTeam consisted of myself, another Software Engineer, two MBAs, and a Data Scientist \nAwarded second place in the Hackathon for our work on the app',
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2017,
          text: 'Jan 2017',
        },
        endDate: {
          month: 'Jan',
          year: 2017,
          text: 'Jan 2017',
        },
      },
      {
        position: 'Prefreshman Summer Program - Program Assistant',
        location: 'Ithaca, New York',
        employmentType: null,
        workplaceType: null,
        companyName: 'Cornell University',
        companyLinkedinUrl: 'https://www.linkedin.com/school/cornell-university/',
        companyId: '3523',
        companyUniversalName: 'cornell-university',
        duration: '3 mos',
        description:
          "Served as a role model and academic peer mentor to incoming freshmen\nPromoted the use of effective learning strategies in order to help the students achieve their full potential\nGave valuable first-hand accounts of my experience in Cornell's Engineering School in order to help prepare the students for their upcoming freshman year\nTook on a Residential Advisor role to maintain community standards and make sure that the students abided by all university rules and policies\nFacilitated programs to help build community in the Residence Hall\nWorked around 12 hours a week on desk shifts which involved checking students in for the night, answering general questions students had, dealing with both interpersonal and logistical issues",
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2016,
          text: 'Jun 2016',
        },
        endDate: {
          month: 'Aug',
          year: 2016,
          text: 'Aug 2016',
        },
      },
    ],
  },
  {
    id: 'ACoAAB5AQyUBsL7n5SNIPmjrjBVuYhS4h6F8Ny4',
    publicIdentifier: 'kyler-mintah',
    firstName: 'Kyler',
    lastName: 'Mintah',
    photo: expect.stringContaining('media.licdn.com/dms/'),
    experience: [
      {
        position: 'Senior Growth Engineer ',
        location: 'New York, New York, United States',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Pinecone',
        companyLinkedinUrl: 'https://www.linkedin.com/company/pinecone-io/',
        companyId: '20299330',
        companyUniversalName: 'pinecone-io',
        description: null,
        skills: null,
        startDate: {
          month: 'Sep',
          year: 2024,
          text: 'Sep 2024',
        },
      },
      {
        position: 'Growth Engineer',
        location: 'New York, New York, United States',
        employmentType: null,
        workplaceType: null,
        companyName: 'Pinecone',
        companyLinkedinUrl: 'https://www.linkedin.com/company/pinecone-io/',
        companyId: '20299330',
        companyUniversalName: 'pinecone-io',
        duration: '1 yr 7 mos',
        description: null,
        skills: [
          'Figma',
          'Full-Stack Development',
          'Data Analytics',
          'Large Language Models (LLM)',
          'Pinecone',
          'Next.js',
        ],
        startDate: {
          month: 'Mar',
          year: 2023,
          text: 'Mar 2023',
        },
        endDate: {
          month: 'Sep',
          year: 2024,
          text: 'Sep 2024',
        },
      },
      {
        position: 'Solutions Architect',
        location: 'New York, New York, United States',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Stripe',
        companyLinkedinUrl: 'https://www.linkedin.com/company/2135371/',
        companyId: '2135371',
        duration: '1 yr',
        description: null,
        skills: [
          'Node.js',
          'Payments',
          'Full-Stack Development',
          'Software as a Service (SaaS)',
          'Front-End Development',
          'React.js',
        ],
        startDate: {
          month: 'Dec',
          year: 2021,
          text: 'Dec 2021',
        },
        endDate: {
          month: 'Nov',
          year: 2022,
          text: 'Nov 2022',
        },
      },
      {
        position: 'Customer Engineer | Digital Apps & Innovation',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Microsoft',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1035/',
        companyId: '1035',
        duration: '7 mos',
        description: null,
        skills: [
          'Node.js',
          'Data Storage',
          'Python (Programming Language)',
          'Microsoft Azure',
          'Full-Stack Development',
          'API Development',
          'DevOps',
          'React.js',
        ],
        startDate: {
          month: 'Jun',
          year: 2021,
          text: 'Jun 2021',
        },
        endDate: {
          month: 'Dec',
          year: 2021,
          text: 'Dec 2021',
        },
      },
      {
        position: 'Customer Engineer | Azure Apps & Infrastructure',
        location: null,
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Microsoft',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1035/',
        companyId: '1035',
        duration: '1 yr 4 mos',
        description: null,
        skills: [
          'Node.js',
          'Data Storage',
          'Python (Programming Language)',
          'Microsoft Azure',
          'Full-Stack Development',
          'API Development',
          'DevOps',
        ],
        startDate: {
          month: 'Sep',
          year: 2020,
          text: 'Sep 2020',
        },
        endDate: {
          month: 'Dec',
          year: 2021,
          text: 'Dec 2021',
        },
      },
      {
        position: 'Co-Founder',
        location: 'Philadelphia, Pennsylvania',
        employmentType: null,
        workplaceType: null,
        companyName: 'SilkBlu Technologies LLC',
        companyLinkedinUrl: 'https://www.linkedin.com/company/35640787/',
        companyId: '35640787',
        duration: '1 yr 5 mos',
        description: null,
        skills: [
          'Node.js',
          'Data Storage',
          'Python (Programming Language)',
          'Full-Stack Development',
          'API Development',
          'Front-End Development',
          'Android Development',
        ],
        startDate: {
          month: 'Jan',
          year: 2019,
          text: 'Jan 2019',
        },
        endDate: {
          month: 'May',
          year: 2020,
          text: 'May 2020',
        },
      },
      {
        position: 'Hardware Engineering Intern',
        location: 'Mountain View, CA',
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'Google',
        companyLinkedinUrl: 'https://www.linkedin.com/company/1441/',
        companyId: '1441',
        duration: '4 mos',
        description:
          'Google Pixel Team (Connectivity Lab)\nBluetooth power testing for Pixel 4\nInternal Android application development\nBT/BLE testing & development for Android Q',
        skills: ['Front-End Development', 'Android Development'],
        startDate: {
          month: 'Jun',
          year: 2019,
          text: 'Jun 2019',
        },
        endDate: {
          month: 'Sep',
          year: 2019,
          text: 'Sep 2019',
        },
      },
      {
        position: 'Teaching Assistant',
        location: 'University of Pennsylvania',
        employmentType: null,
        workplaceType: null,
        companyName: 'University of Pennsylvania',
        companyLinkedinUrl: 'https://www.linkedin.com/school/university-of-pennsylvania/',
        companyId: '3165',
        companyUniversalName: 'university-of-pennsylvania',
        duration: '2 yrs 1 mo',
        description:
          'Electrical Systems Engineering 215: Electrical Circuits & Systems (Fall 2018)\nElectrical Systems Engineering 111:  Atoms, Bits, Circuits & Systems (Fall 2017, Fall 2018)\nElectrical Systems Engineering 190: Silicon Garage (Spring 2017, Spring 2018)\n',
        skills: null,
        startDate: {
          month: 'Jan',
          year: 2017,
          text: 'Jan 2017',
        },
        endDate: {
          month: 'Jan',
          year: 2019,
          text: 'Jan 2019',
        },
      },
      {
        position: 'ESE Labs Website Admin',
        employmentType: null,
        workplaceType: null,
        companyName: 'University of Pennsylvania',
        companyLinkedinUrl: 'https://www.linkedin.com/school/university-of-pennsylvania/',
        companyId: '3165',
        companyUniversalName: 'university-of-pennsylvania',
        duration: '1 yr 1 mo',
        description:
          'Designed website for Detkin Lab at the University of Pennsylvania. WordPress & HTML for customized formatting and widget embedding. Created & curated website content. Website link: https://detkin.ese.upenn.edu/',
        skills: null,
        startDate: {
          month: 'Oct',
          year: 2017,
          text: 'Oct 2017',
        },
        endDate: {
          month: 'Oct',
          year: 2018,
          text: 'Oct 2018',
        },
      },
      {
        position: 'Intern',
        location: null,
        employmentType: null,
        workplaceType: null,
        companyName: 'RippleMatch',
        companyLinkedinUrl: 'https://www.linkedin.com/company/10620373/',
        companyId: '10620373',
        duration: '6 mos',
        description: 'Campus Ambassador',
        skills: null,
        startDate: {
          month: 'Apr',
          year: 2018,
          text: 'Apr 2018',
        },
        endDate: {
          month: 'Sep',
          year: 2018,
          text: 'Sep 2018',
        },
      },
    ],
  },
  {
    id: 'ACoAACfvpXwBvJahhT1L584vAUK5YdYBXVct5WA',
    publicIdentifier: 'moses-eboh-310479168',
    firstName: 'Moses',
    lastName: 'Eboh',
    // photo: expect.stringContaining('media.licdn.com/dms/'),
    experience: [
      {
        position: 'Software Engineer',
        location: 'Austin, Texas, United States',
        employmentType: 'Full-time',
        workplaceType: null,
        companyName: 'Google',
        companyLinkedinUrl: 'https://www.linkedin.com/company/google/',
        companyId: '1441',
        companyUniversalName: 'google',
        description: null,
        skills: [
          'Web Engineering',
          'Release Management',
          'Continuous Integration (CI)',
          'TypeScript',
          'Closure templates',
          'Guice',
          'Spanner',
          'Linux',
          'HTML',
          'Integration Testing',
          'Protocol Buffers',
          'JavaScript',
          'Canarying',
          'Software Design',
          'WebDriver',
          'Java',
          'SQL',
          'Jasmine Framework',
          'Backend Development',
          'Front-End Development',
          'Bazel',
          'Load Testing',
          'Debugging',
          'Bash',
          'Aspose',
          'Python',
          'Apache Beam',
        ],
        startDate: {
          month: 'Aug',
          year: 2021,
          text: 'Aug 2021',
        },
      },
      {
        position: 'Software Engineering Intern at Google Play',
        location: null,
        employmentType: 'Internship',
        workplaceType: 'Remote',
        companyName: 'Google',
        companyLinkedinUrl: 'https://www.linkedin.com/company/google/',
        companyId: '1441',
        companyUniversalName: 'google',
        duration: '4 mos',
        description: null,
        skills: ['Linux'],
        startDate: {
          month: 'May',
          year: 2020,
          text: 'May 2020',
        },
        endDate: {
          month: 'Aug',
          year: 2020,
          text: 'Aug 2020',
        },
      },
      {
        position: 'Engineering Practicum Intern',
        location: 'Mountain View, California',
        employmentType: 'Internship',
        workplaceType: null,
        companyName: 'Google',
        companyLinkedinUrl: 'https://www.linkedin.com/company/google/',
        companyId: '1441',
        companyUniversalName: 'google',
        duration: '4 mos',
        description: 'Android Google Search App, Google Assistant',
        skills: ['Linux'],
        startDate: {
          month: 'May',
          year: 2019,
          text: 'May 2019',
        },
        endDate: {
          month: 'Aug',
          year: 2019,
          text: 'Aug 2019',
        },
      },
      {
        position: 'Software Intern & Shop Assistant ',
        location: expect.stringContaining('Fort Worth'),
        employmentType: null,
        workplaceType: null,
        companyName: 'Adonis Auto Group',
        companyLinkedinUrl: 'https://www.linkedin.com/company/5264633/',
        companyId: '5264633',
        duration: '3 mos',
        description:
          'Wrote a script in Java to automate the transfer of information from financing applications. Made use of open source Headless Browsers.',
        skills: null,
        startDate: {
          month: 'Jun',
          year: 2018,
          text: 'Jun 2018',
        },
        endDate: {
          month: 'Aug',
          year: 2018,
          text: 'Aug 2018',
        },
      },
    ],
  },
];

for (const profile of expectedProfiles) {
  profile.experience = expect.arrayContaining(
    profile.experience.map((exp) => expect.objectContaining({ ...exp })),
  );
  if (profile.education)
    profile.education = expect.arrayContaining(
      profile.education.map((edu) => expect.objectContaining({ ...edu })),
    );
  if (profile.skills)
    profile.skills = expect.arrayContaining(
      profile.skills.map((skill) => expect.objectContaining({ ...skill })),
    );
  if (profile.languages)
    profile.languages = expect.arrayContaining(
      profile.languages.map((lang) => expect.objectContaining({ ...lang })),
    );
  if (profile.projects)
    profile.projects = expect.arrayContaining(
      profile.projects.map((proj) => expect.objectContaining({ ...proj })),
    );
  if (profile.publications)
    profile.publications = expect.arrayContaining(
      profile.publications.map((pub) => expect.objectContaining({ ...pub })),
    );
}

const scraper = new LinkedinScraper({
  apiKey: process.env.API_KEY!,
  baseUrl: process.env.TEST_API_BASE_URL!,
});

describe('Linkedin Profile API', () => {
  it('getProfile by profileId lewisowain', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACoAAA7IcPoBXbqAyFuCjYLHAhmm13BgChs-P5g',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });

  it('getProfile by url towhid-rahman', async () => {
    const data = await scraper.getProfile({
      url: 'https://www.linkedin.com/in/towhid-rahman',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });

  it('getProfile by query williamhgates', async () => {
    const data = await scraper.getProfile({
      query: 'https://www.linkedin.com/in/williamhgates',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });

  it('getProfile by url justinshillingford', async () => {
    const data = await scraper.getProfile({
      url: 'https://www.linkedin.com/in/justinshillingford',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });

  it('getProfile by profileId kyler-mintah', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACoAAB5AQyUBsL7n5SNIPmjrjBVuYhS4h6F8Ny4',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });

  it('getProfile by profileId moses-eboh-310479168', async () => {
    const data = await scraper.getProfile({
      profileId: 'ACoAACfvpXwBvJahhT1L584vAUK5YdYBXVct5WA',
    });
    if (!data?.query?.profileId) console.error('data', data);

    const mockedProfile = expectedProfiles.find((profile) => profile.id === data.query.profileId);
    expect(data.element).toMatchObject(mockedProfile!);
  });
});
