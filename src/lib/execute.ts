/* eslint-disable no-console */
import { Left, type Either } from "@/components/layout/data/either";
import {  type FailureType, Failure } from "@/components/layout/data/failure";
import axios, { type AxiosError } from "axios";

/**
 * @fileoverview Execute utility for safe async function execution with comprehensive error handling
 * 
 * @example
 * // Basic usage
 * const result = await execute(
 *   async () => {
 *     const response = await fetch('/api/users');
 *     const users = await response.json();
 *     return Right({ users });
 *   },
 *   {
 *     funcTitle: 'fetchUsers',
 *     errorMessage: 'Failed to fetch users'
 *   }
 * );
 * 
 * @example
 * // With custom error handlers
 * const result = await execute(
 *   async () => {
 *     const response = await axios.get('/api/cars');
 *     return Right(response.data);
 *   },
 *   {
 *     funcTitle: 'fetchCars',
 *     errorMessage: 'Failed to fetch cars',
 *     takeScreenshotError: true,
 *     onAxiosException: (error) => {
 *       if (error.response?.status === 404) {
 *         return Left({ message: 'Cars not found' });
 *       }
 *       return null; // Let default handling take over
 *     },
 *     onOtherException: (error, stack) => {
 *       console.error('Unexpected error:', error, stack);
 *       return Left({ message: 'Something went wrong' });
 *     }
 *   }
 * );
 * 
 * @example
 * // Using with async operations
 * const createUser = async (userData: UserData) => {
 *   return await execute(
 *     async () => {
 *       const response = await axios.post('/api/users', userData);
 *       return Right(response.data);
 *     },
 *     {
 *       funcTitle: 'createUser',
 *       errorMessage: 'Failed to create user'
 *     }
 *   );
 * };
 * 
 * // Usage
 * const result = await createUser({ name: 'John', email: 'john@example.com' });
 * if (result.isLeft) {
 *   console.error('Error:', result.leftOrNull?.message);
 * } else {
 *   console.log('User created:', result.rightOrNull);
 * }
 */

/**
 * Execute an async function with comprehensive error handling
 * 
 * @param func - The async function to execute that returns Either<Failure, T>
 * @param options - Configuration options for error handling
 * @returns Promise<Either<Failure, T>> - Either success result or failure
 * 
 * @example
 * // Basic usage
 * const result = await execute(
 *   async () => {
 *     const data = await fetchData();
 *     return Right(data);
 *   },
 *   {
 *     funcTitle: 'fetchData',
 *     errorMessage: 'Failed to fetch data'
 *   }
 * );
 */
export async function execute<T>(
  func: () => Promise<Either<FailureType, T>>,
  {
    funcTitle,
    errorMessage,
    takeScreenshotError = false,
    onAxiosException,
    onOtherException,
  }: {
    /** Function title for logging purposes */
    funcTitle: string;
    /** Default error message when no specific error message is available */
    errorMessage: string;
    /** Whether to take screenshot on error (for debugging) */
    takeScreenshotError?: boolean;
    /** Custom handler for Axios errors */
    onAxiosException?: (error: AxiosError) => Either<FailureType, T> | null;
    /** Custom handler for other types of errors */
    onOtherException?: (error: unknown, stack?: string) => Either<FailureType, T> | null;
  }
): Promise<Either<FailureType, T>> {
  try {
    const result = await func();
    return result;
  } catch (err) {
    // --- Axios error ---
    if (axios.isAxiosError(err)) {
      const response = onAxiosException?.(err);
      if (response) {
        console.debug(`[${funcTitle}] handled via onAxiosException`);
        return response;
      }

      const message =
        getNetworkErrorMessage(err) ??
        getServiceErrorMessage(err) ??
        getHttpStatusErrorMessage(err) ??
        errorMessage;

      console.error(`[${funcTitle}] AxiosError:`, message);
      return Left(Failure(message));
    }

    // --- Network or Socket errors ---
    if (err instanceof Error) {
      // DNS resolution errors
      if (err.message.includes("ENOTFOUND") || err.message.includes("EAI_AGAIN")) {
        console.error(`[${funcTitle}] DNS resolution error:`, err);
        return Left(Failure("Cannot resolve server address. Please check your internet connection."));
      }

      // Connection refused
      if (err.message.includes("ECONNREFUSED")) {
        console.error(`[${funcTitle}] Connection refused:`, err);
        return Left(Failure("Connection refused. The server may be down or unreachable."));
      }

      // Network unreachable
      if (err.message.includes("ENETUNREACH")) {
        console.error(`[${funcTitle}] Network unreachable:`, err);
        return Left(Failure("Network unreachable. Please check your network connection."));
      }

      // SSL/TLS errors
      if (err.message.includes("CERT_") || err.message.includes("SSL_")) {
        console.error(`[${funcTitle}] SSL/TLS error:`, err);
        return Left(Failure("Security certificate error. Please contact support."));
      }
    }

    // --- Other errors ---
    const response = onOtherException?.(err, (err as Error)?.stack);
    if (response) return response;

    console.error(`[${funcTitle}] Unexpected error:`, err);
    if (takeScreenshotError) {
      console.error(`[${funcTitle}] Error screenshot:`, err);
    }

    return Left(Failure(errorMessage));
  }
}

// ========== Helper Functions ==========

/**
 * Get network-related error messages from Axios errors
 */
function getNetworkErrorMessage(error: AxiosError): string | null {
  // Request timeout
  if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
    return "Request timeout. Please try again later.";
  }

  // Network error
  if (error.message.includes("Network Error")) {
    return "Network error. Please check your connection.";
  }

  // Connection errors
  if (error.code === "ECONNREFUSED") {
    return "Connection refused. The server may be down.";
  }

  if (error.code === "ENOTFOUND" || error.code === "EAI_AGAIN") {
    return "Cannot resolve server address. Please check your internet connection.";
  }

  if (error.code === "ENETUNREACH") {
    return "Network unreachable. Please check your network connection.";
  }

  return null;
}

/**
 * Get service-related error messages from Axios response data
 */
function getServiceErrorMessage(error: AxiosError): string | null {
  const data = (error.response?.data ?? {}) as Record<string, unknown>;
  
  if (data.error_code || data.message) {
    return (data.message as string) ?? (data.error_code as string) ?? "Unexpected server error.";
  }

  return null;
}

/**
 * Get HTTP status code related error messages
 */
function getHttpStatusErrorMessage(error: AxiosError): string | null {
  const status = error.response?.status;

  switch (status) {
    case 400:
      return "Bad request. Please check your input and try again.";
    case 401:
      return "Unauthorized. Please log in again.";
    case 403:
      return "Access forbidden. You don't have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 408:
      return "Request timeout. Please try again.";
    case 409:
      return "Conflict. The resource already exists or has been modified.";
    case 422:
      return "Validation error. Please check your input.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Internal server error. Please try again later.";
    case 502:
      return "Bad gateway. The server is temporarily unavailable.";
    case 503:
      return "Service unavailable. Please try again later.";
    case 504:
      return "Gateway timeout. Please try again later.";
    default:
      return null;
  }
}