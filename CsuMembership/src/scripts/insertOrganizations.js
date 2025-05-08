import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://arugpqegrgzayagahysc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydWdwcWVncmd6YXlhZ2FoeXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDIzMjAsImV4cCI6MjA2MTIxODMyMH0.f5A09bXErBmO6UWaRz6Fvc7wqUuqZhy6O89rL2zmIoA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const organizations = [
  {
    organization_name: 'Upsilon Phi Sigma – Sigma Lambda Chapter',
    program: 'A fraternity emphasizing unity, peace, and prosperity. They engage in leadership training, community service, and cultural events.'
  },
  {
    organization_name: 'Gamma Kappa Phi Fraternity and Sorority',
    program: 'An international organization promoting service, friendship, and equality through strong brotherhood and sisterhood.'
  },
  {
    organization_name: 'Caraga State University – Karatedo Club',
    program: 'A martial arts club focusing on discipline, respect, and perseverance. They conduct training sessions and participate in competitions.'
  },
  {
    organization_name: 'Kapisanan ng mga Mag-aaral sa Filipino (KaMaFil)',
    program: 'An organization dedicated to promoting the Filipino language and culture through various activities and events.'
  },
  {
    organization_name: 'Samahang Makasining (Artist Club)',
    program: 'A national art organization fostering arts community service, youth development, and cultural preservation. Known for popularizing traditional Filipino games.'
  },
  {
    organization_name: 'League of Campus Organizations (LCO)',
    program: 'The umbrella organization for all accredited student groups at CSU, coordinating events and ensuring active student participation.'
  },
  {
    organization_name: 'University Student Government (USG)',
    program: 'The official student governing body representing the student population, advocating for student rights, and organizing university-wide activities.'
  },
  {
    organization_name: 'Association of Mining Engineering Students (AMINES)',
    program: 'A professional organization for mining engineering students, focusing on academic excellence and industry engagement.'
  },
  {
    organization_name: 'Agricultural and Biosystems Engineering Students Society (ABESS)',
    program: 'A society for students in agricultural and biosystems engineering, promoting sustainable practices and technological advancements.'
  },
  {
    organization_name: 'Computer Science Society',
    program: 'An academic organization for computer science students, encouraging innovation, coding skills, and tech-driven projects.'
  },
  {
    organization_name: 'CSU Main - Information Systems Society',
    program: 'We empower Information System students through academic growth, industry partnerships, and student development.'
  }
];

async function insertOrganizations() {
  for (const org of organizations) {
    const { data, error } = await supabase
      .from('organizations')
      .insert([org]);
    
    if (error) {
      console.error('Error inserting organization:', org.organization_name, error.message);
    } else {
      console.log('Successfully inserted organization:', org.organization_name);
    }
  }
}

insertOrganizations();
