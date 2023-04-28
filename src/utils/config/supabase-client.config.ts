import { createClient } from '@supabase/supabase-js';
import { Database } from '@interfaces';
const supabaseUrl = 'https://gqkvfutdnzmbpxypmhmj.supabase.co';

const supabaseKey =
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxa3ZmdXRkbnptYnB4eXBtaG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIwODYyODcsImV4cCI6MTk5NzY2MjI4N30.sux1PT1NG8CJar9EoTwfb514YAMH-5wEI6XpZyQZASo';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
