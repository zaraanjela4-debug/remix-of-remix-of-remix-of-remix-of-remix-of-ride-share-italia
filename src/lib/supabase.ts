import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Using mock mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types for type safety
export type User = {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
};

export type Bike = {
  id: string;
  name: string;
  category: string;
  hourly_rate: number;
  daily_rate: number;
  description: string;
  specs: Record<string, string>;
  available_count: number;
  image_url: string;
  rating: number;
  reviews_count: number;
};

export type Location = {
  id: string;
  city: string;
  spot_name: string;
  address: string;
  latitude: number;
  longitude: number;
  bike_count: number;
  opening_hours: string;
  image_url: string;
};

export type Booking = {
  id: string;
  user_id: string;
  bike_id: string;
  location_id: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  created_at: string;
};

export type Favorite = {
  user_id: string;
  bike_id: string;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  bike_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

// Auth functions
export async function signUp(email: string, password: string, phone?: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    phone,
  });
  
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  if (!supabase) {
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Bike functions
export async function getBikes(category?: string) {
  if (!supabase) {
    // Return mock data in development
    return [];
  }
  
  let query = supabase.from('bikes').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBikeById(id: string) {
  if (!supabase) {
    return null;
  }
  
  const { data, error } = await supabase.from('bikes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Location functions
export async function getLocations() {
  if (!supabase) {
    return [];
  }
  
  const { data, error } = await supabase.from('locations').select('*');
  if (error) throw error;
  return data;
}

// Booking functions
export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'status'>) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase.from('bookings').insert({
    ...booking,
    status: 'pending',
  }).select().single();
  
  if (error) throw error;
  return data;
}

export async function getUserBookings(userId: string) {
  if (!supabase) {
    return [];
  }
  
  const { data, error } = await supabase.from('bookings')
    .select('*, bikes(*), locations(*)')
    .eq('user_id', userId)
    .order('start_time', { ascending: false });
    
  if (error) throw error;
  return data;
}

// Favorites functions
export async function toggleFavorite(userId: string, bikeId: string) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  // Check if already exists
  const { data: existing } = await supabase.from('favorites')
    .select()
    .eq('user_id', userId)
    .eq('bike_id', bikeId)
    .single();
    
  if (existing) {
    // Remove favorite
    const { error } = await supabase.from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('bike_id', bikeId);
    if (error) throw error;
    return false; // Removed
  } else {
    // Add favorite
    const { error } = await supabase.from('favorites').insert({
      user_id: userId,
      bike_id: bikeId,
    });
    if (error) throw error;
    return true; // Added
  }
}

export async function getUserFavorites(userId: string) {
  if (!supabase) {
    return [];
  }
  
  const { data, error } = await supabase.from('favorites')
    .select('*, bikes(*)')
    .eq('user_id', userId);
    
  if (error) throw error;
  return data;
}

// Review functions
export async function createReview(review: Omit<Review, 'id' | 'created_at'>) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const { data, error } = await supabase.from('reviews').insert(review).select().single();
  if (error) throw error;
  return data;
}

export async function getBikeReviews(bikeId: string) {
  if (!supabase) {
    return [];
  }
  
  const { data, error } = await supabase.from('reviews')
    .select('*, users(name, avatar_url)')
    .eq('bike_id', bikeId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}
