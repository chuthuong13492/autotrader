/* eslint-disable no-console */
/**
 * @fileoverview Examples demonstrating how to use the execute utility function
 * 
 * This file contains practical examples of using the execute function
 * for safe async operations with comprehensive error handling.
 */

import { execute } from './execute';
import { Left, Right } from '@/components/layout/data/either';
import { Failure } from '@/components/layout/data/failure';
import axios from 'axios';

// ========== Example Types ==========
interface User {
  id: number;
  name: string;
  email: string;
}

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
}

// ========== Example 1: Basic Usage ==========
export async function fetchUsersExample(): Promise<void> {
  const result = await execute(
    async () => {
      // Simulate API call
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const users = await response.json();
      return Right(users);
    },
    {
      funcTitle: 'fetchUsers',
      errorMessage: 'Failed to fetch users'
    }
  );

  if (result.isLeft) {
    console.error('Error fetching users:', result.leftOrNull?.message);
  } else {
    console.log('Users fetched successfully:', result.rightOrNull);
  }
}

// ========== Example 2: With Axios and Custom Error Handling ==========
export async function fetchCarsExample(): Promise<void> {
  const result = await execute(
    async () => {
      const response = await axios.get<Car[]>('/api/cars');
      return Right(response.data);
    },
    {
      funcTitle: 'fetchCars',
      errorMessage: 'Failed to fetch cars',
      takeScreenshotError: true,
      onAxiosException: (error) => {
        // Custom handling for specific status codes
        if (error.response?.status === 404) {
          return Left(Failure('Cars endpoint not found' ));
        }
        if (error.response?.status === 403) {
          return Left(Failure('You do not have permission to view cars'));
        }
        // Return null to let default handling take over
        return null;
      },
      onOtherException: (error, stack) => {
        console.error('Unexpected error in fetchCars:', error, stack);
        return Left(Failure('Something unexpected happened while fetching cars'));
      }
    }
  );

  result.fold(
    (failure) => console.error('Failed to fetch cars:', failure.message),
    (cars) => console.log('Cars fetched:', cars)
  );
}

// ========== Example 3: Creating Resources ==========
export async function createUserExample(userData: Omit<User, 'id'>): Promise<User | null> {
  const result = await execute(
    async () => {
      const response = await axios.post<User>('/api/users', userData);
      return Right(response.data);
    },
    {
      funcTitle: 'createUser',
      errorMessage: 'Failed to create user',
      onAxiosException: (error) => {
        if (error.response?.status === 409) {
          return Left(Failure('User with this email already exists'));
        }
        if (error.response?.status === 422) {
          return Left(Failure('Invalid user data provided'));
        }
        return null;
      }
    }
  );

  return result.foldLeft((failure) => {
    console.error('Failed to create user:', failure.message);
    return null;
  }) ?? result.rightOrNull;
}

// ========== Example 4: Complex Operation with Multiple Steps ==========
export async function updateUserWithCarExample(
  userId: number,
  userData: Partial<User>,
  carData: Omit<Car, 'id'>
): Promise<{ user: User; car: Car } | null> {
  const result = await execute(
    async () => {
      // Step 1: Update user
      const userResponse = await axios.patch<User>(`/api/users/${userId}`, userData);
      const updatedUser = userResponse.data;

      // Step 2: Create car for user
      const carResponse = await axios.post<Car>('/api/cars', {
        ...carData,
        userId: updatedUser.id
      });
      const newCar = carResponse.data;

      return Right({ user: updatedUser, car: newCar });
    },
    {
      funcTitle: 'updateUserWithCar',
      errorMessage: 'Failed to update user and create car',
      onAxiosException: (error) => {
        if (error.response?.status === 404) {
          return Left(Failure('User not found'));
        }
        if (error.response?.status === 422) {
          return Left(Failure('Invalid data provided'));
        }
        return null;
      }
    }
  );

  return result.foldLeft((failure) => {
    console.error('Failed to update user with car:', failure.message);
    return null;
  }) ?? result.rightOrNull;
}

// ========== Example 5: Using in React Hook ==========
export function useUserOperations() {
  const fetchUser = async (userId: number): Promise<User | null> => {
    const result = await execute(
      async () => {
        const response = await axios.get<User>(`/api/users/${userId}`);
        return Right(response.data);
      },
      {
        funcTitle: 'fetchUser',
        errorMessage: 'Failed to fetch user'
      }
    );

    return result.foldLeft((failure) => {
      console.error('Error fetching user:', failure.message);
      return null;
    }) ?? result.rightOrNull;
  };

  const updateUser = async (userId: number, data: Partial<User>): Promise<boolean> => {
    const result = await execute(
      async () => {
        await axios.patch(`/api/users/${userId}`, data);
        return Right(true);
      },
      {
        funcTitle: 'updateUser',
        errorMessage: 'Failed to update user',
        onAxiosException: (error) => {
          if (error.response?.status === 404) {
            return Left(Failure('User not found'));
          }
          return null;
        }
      }
    );

    return result.isRight;
  };

  return { fetchUser, updateUser };
}

// ========== Example 6: Batch Operations ==========
export async function batchCreateUsersExample(usersData: Omit<User, 'id'>[]): Promise<{
  successful: User[];
  failed: { index: number; error: string }[];
}> {
  const successful: User[] = [];
  const failed: { index: number; error: string }[] = [];

  for (let i = 0; i < usersData.length; i++) {
    const userData = usersData[i];
    
    const result = await execute(
      async () => {
        const response = await axios.post<User>('/api/users', userData);
        return Right(response.data);
      },
      {
        funcTitle: `createUser-${i}`,
        errorMessage: 'Failed to create user',
        onAxiosException: (error) => {
          if (error.response?.status === 409) {
            return Left(Failure('Email already exists'));
          }
          return null;
        }
      }
    );

    result.fold(
      (failure) => failed.push({ index: i, error: failure.message }),
      (user) => successful.push(user)
    );
  }

  return { successful, failed };
}

// ========== Example Usage in Components ==========
export async function exampleUsageInComponent(): Promise<void> {
  // Example 1: Simple fetch
  console.log('=== Example 1: Basic Usage ===');
  await fetchUsersExample();

  // Example 2: With custom error handling
  console.log('\n=== Example 2: Custom Error Handling ===');
  await fetchCarsExample();

  // Example 3: Create user
  console.log('\n=== Example 3: Create User ===');
  const newUser = await createUserExample({
    name: 'John Doe',
    email: 'john@example.com'
  });
  console.log('Created user:', newUser);

  // Example 4: Complex operation
  console.log('\n=== Example 4: Complex Operation ===');
  if (newUser) {
    const result = await updateUserWithCarExample(
      newUser.id,
      { name: 'John Updated' },
      { brand: 'Toyota', model: 'Camry', year: 2023 }
    );
    console.log('Updated user with car:', result);
  }

  // Example 5: Batch operations
  console.log('\n=== Example 5: Batch Operations ===');
  const batchResult = await batchCreateUsersExample([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
  ]);
  console.log('Batch result:', batchResult);
}
