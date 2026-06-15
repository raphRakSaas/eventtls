export type UserRole = 'user' | 'organizer';

export interface UserProfile {
    id: string;
    display_name: string;
    avatar_url: string | null;
    role: UserRole;
    bio: string | null;
    created_at: string;
}