/* =============================================
   DATABASE SEEDER
   File: seed.js
   Run: node seed.js
   ============================================= */

const mongoose = require('mongoose');
require('dotenv').config();

const Skill         = require('./models/Skill');
const Certification = require('./models/Certification');
const Project       = require('./models/Project');

const skills = [
  {
    icon: '[C]',
    name: 'C Programming',
    description: 'Low-level systems programming, memory management, and security tool development',
    order: 1
  },
  {
    icon: '[PY]',
    name: 'Python',
    description: 'Scripting, automation, threat analysis tooling, and security workflows',
    order: 2
  },
  {
    icon: '[//]',
    name: 'Threat Analysis',
    description: 'Identifying, assessing, and mitigating cybersecurity threats and vulnerabilities',
    order: 3
  },
  {
    icon: '[#!]',
    name: 'Network Security',
    description: 'Monitoring network traffic, detecting anomalies, and securing infrastructure',
    order: 4
  }
];

const certifications = [
  {
    issuer: 'Infosys',
    name: 'Infosys Certified Professional',
    badge: 'CERT',
    order: 1
  },
  {
    issuer: 'Cisco',
    name: 'Cisco Certification',
    badge: 'CERT',
    order: 2
  },
  {
    issuer: 'NASSCOM',
    name: 'NASSCOM Certification',
    badge: 'CERT',
    order: 3
  }
];

const projects = [
  {
    title: 'Network Vulnerability Scanner',
    description: 'A Python-based tool that scans local network hosts for open ports and common vulnerabilities, generating a detailed security report.',
    tags: ['Python', 'Networking', 'Security'],
    githubUrl: 'https://github.com/alaynasameerKhan',
    featured: true,
    order: 1
  },
  {
    title: 'Log Anomaly Detector',
    description: 'C program that parses system logs and flags suspicious patterns indicative of intrusion attempts or privilege escalation.',
    tags: ['C', 'Log Analysis', 'Threat Detection'],
    githubUrl: 'https://github.com/alaynasameerKhan',
    featured: true,
    order: 2
  },
  {
    title: 'Port Sniffer CLI Tool',
    description: 'Command-line port sniffing utility built with Python sockets to monitor and log incoming/outgoing traffic on specified interfaces.',
    tags: ['Python', 'Sockets', 'CLI'],
    githubUrl: 'https://github.com/alaynasameerKhan',
    featured: false,
    order: 3
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Skill.deleteMany({});
    await Certification.deleteMany({});
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert fresh data
    await Skill.insertMany(skills);
    console.log(`✅ Seeded ${skills.length} skills`);

    await Certification.insertMany(certifications);
    console.log(`✅ Seeded ${certifications.length} certifications`);

    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
}

seed();
