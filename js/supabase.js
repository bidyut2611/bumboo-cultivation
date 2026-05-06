/* ============================================
   BambooConnect India — Supabase Client
   ============================================ */

var SUPABASE_URL = 'https://vislxscjktufcxkakagv.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpc2x4c2Nqa3R1ZmN4a2FrYWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTgwNjgsImV4cCI6MjA5MTk3NDA2OH0.2Vomy2CULMeUvuO9GuTUNktGqxS1xevucMBtIuSYb4s';

// Initialize Supabase client
var _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// PROVIDERS CRUD
// ==========================================

async function sbFetchProviders() {
  var result = await _sb.from('providers').select('*').order('created_at', { ascending: false });
  if (result.error) {
    console.error('Error fetching providers:', result.error);
    return [];
  }
  // Map snake_case DB columns to camelCase JS keys
  return result.data.map(function(p) {
    return {
      id: p.id,
      name: p.name,
      phone: p.phone,
      email: p.email,
      state: p.state,
      district: p.district,
      address: p.address,
      pincode: p.pincode,
      bambooTypes: p.bamboo_types || [],
      capacityTonnes: p.capacity_tonnes,
      landAreaAcres: p.land_area_acres,
      experienceYears: p.experience_years,
      useCategories: p.use_categories || [],
      verified: p.verified,
      registeredDate: p.registered_date
    };
  });
}

async function sbAddProvider(data) {
  var id = 'BCP-' + Date.now().toString().slice(-6);
  var row = {
    id: id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    state: data.state,
    district: data.district,
    address: data.address || '',
    pincode: data.pincode || '',
    bamboo_types: data.bambooTypes || [],
    capacity_tonnes: data.capacityTonnes || 0,
    land_area_acres: data.landAreaAcres || 0,
    experience_years: data.experienceYears || 0,
    use_categories: data.useCategories || [],
    verified: false,
    registered_date: new Date().toISOString().split('T')[0]
  };

  var result = await _sb.from('providers').insert([row]).select();
  if (result.error) {
    console.error('Error adding provider:', result.error);
    return null;
  }
  console.log('Provider added:', result.data[0]);
  return result.data[0];
}

// ==========================================
// REQUIREMENTS CRUD
// ==========================================

async function sbFetchRequirements() {
  var result = await _sb.from('requirements').select('*').order('created_at', { ascending: false });
  if (result.error) {
    console.error('Error fetching requirements:', result.error);
    return [];
  }
  return result.data.map(function(r) {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      species: r.species,
      quantity: r.quantity,
      state: r.state,
      district: r.district,
      urgency: r.urgency,
      postedBy: r.posted_by,
      contact: r.contact,
      postedDate: r.posted_date,
      status: r.status
    };
  });
}

async function sbAddRequirement(data) {
  var id = 'REQ-' + Date.now().toString().slice(-6);
  var row = {
    id: id,
    title: data.title,
    description: data.description,
    species: data.species || 'any',
    quantity: data.quantity,
    state: data.state,
    district: data.district,
    urgency: data.urgency || 'medium',
    posted_by: data.postedBy,
    contact: data.contact,
    posted_date: new Date().toISOString().split('T')[0],
    status: 'open'
  };

  var result = await _sb.from('requirements').insert([row]).select();
  if (result.error) {
    console.error('Error adding requirement:', result.error);
    return null;
  }
  console.log('Requirement added:', result.data[0]);
  return result.data[0];
}

// ==========================================
// STATS
// ==========================================

async function sbFetchStats() {
  var provResult = await _sb.from('providers').select('capacity_tonnes, verified');
  var providers = provResult.data || [];

  var verified = providers.filter(function(p) { return p.verified; }).length;
  var states = new Set();
  // We'll count states from the full providers list
  var fullResult = await _sb.from('providers').select('state');
  if (fullResult.data) {
    fullResult.data.forEach(function(p) { states.add(p.state); });
  }
  var totalCapacity = 0;
  providers.forEach(function(p) { totalCapacity += (p.capacity_tonnes || 0); });

  return {
    totalProviders: providers.length,
    verifiedProviders: verified || providers.length,
    totalStates: states.size,
    totalCapacity: totalCapacity
  };
}

// ==========================================
// SEED DATA (runs once if tables are empty)
// ==========================================

async function sbSeedIfEmpty() {
  // Check if providers table is empty
  var check = await _sb.from('providers').select('id').limit(1);
  if (check.data && check.data.length > 0) {
    console.log('Database already seeded with ' + check.data.length + '+ providers');
    return false;
  }

  console.log('Seeding database with initial data...');

  // Seed providers
  var seedProviders = SEED_PROVIDERS.map(function(p) {
    return {
      id: p.id,
      name: p.name,
      phone: p.phone,
      email: p.email,
      state: p.state,
      district: p.district,
      address: p.address,
      pincode: p.pincode,
      bamboo_types: p.bambooTypes,
      capacity_tonnes: p.capacityTonnes,
      land_area_acres: p.landAreaAcres,
      experience_years: p.experienceYears,
      use_categories: p.useCategories,
      verified: p.verified,
      registered_date: p.registeredDate
    };
  });

  // Insert in batches of 25
  for (var i = 0; i < seedProviders.length; i += 25) {
    var batch = seedProviders.slice(i, i + 25);
    var res = await _sb.from('providers').insert(batch);
    if (res.error) {
      console.error('Seed providers batch error:', res.error);
    } else {
      console.log('Seeded providers batch ' + (Math.floor(i/25)+1));
    }
  }

  // Seed requirements
  var seedReqs = SEED_REQUIREMENTS.map(function(r) {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      species: r.species,
      quantity: r.quantity,
      state: r.state,
      district: r.district,
      urgency: r.urgency,
      posted_by: r.postedBy,
      contact: r.contact,
      posted_date: r.postedDate,
      status: r.status
    };
  });

  var reqRes = await _sb.from('requirements').insert(seedReqs);
  if (reqRes.error) {
    console.error('Seed requirements error:', reqRes.error);
  } else {
    console.log('Seeded ' + seedReqs.length + ' requirements');
  }

  return true;
}
