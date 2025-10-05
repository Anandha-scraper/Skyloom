import { randomUUID } from 'crypto';
import { User, CreateUserSchema } from '@skyloom/shared';
import { z } from 'zod';

type CreateUserData = z.infer<typeof CreateUserSchema>;

export class UserService {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    // Add demo user
    this.users.set('demo-user-id', {
      id: 'demo-user-id',
      username: 'demo',
      password: 'demo', // In production, this would be hashed
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const id = randomUUID();
    const user: User = { ...userData, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<CreateUserData>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser: User = {
      ...user,
      ...updates,
      id, // Ensure ID doesn't change
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }

    this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Future: Add database integration methods
  async saveToDatabase(): Promise<void> {
    // This would save users to a database
    // For now, it's in-memory storage
  }

  async loadFromDatabase(): Promise<void> {
    // This would load users from a database
    // For now, it's in-memory storage
  }
}