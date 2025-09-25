// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Memory extends APIResource {
  /**
   * Performs semantic search across stored memories and returns relevant results.
   * Uses vector similarity to find the most relevant user memories extracted from
   * conversations.
   *
   * @example
   * ```ts
   * const response = await client.memory.searchMemories({
   *   query: 'user preferences for outdoor activities',
   * });
   * ```
   */
  searchMemories(
    body: MemorySearchMemoriesParams,
    options?: RequestOptions,
  ): APIPromise<MemorySearchMemoriesResponse> {
    return this._client.post('/api/memory/query', { body, ...options });
  }

  /**
   * Processes a conversation and triggers memory extraction workflow. Automatically
   * extracts user facts from conversation messages and makes them searchable through
   * semantic search.
   *
   * @example
   * ```ts
   * const response = await client.memory.storeConversation({
   *   content: [
   *     {
   *       role: 'user',
   *       content:
   *         'I love hiking and prefer mountain trails over coastal walks.',
   *     },
   *     {
   *       role: 'assistant',
   *       content:
   *         "That's great! Mountain trails offer beautiful scenery and fresh air.",
   *     },
   *   ],
   *   userId: 'user_12345',
   * });
   * ```
   */
  storeConversation(
    body: MemoryStoreConversationParams,
    options?: RequestOptions,
  ): APIPromise<MemoryStoreConversationResponse> {
    return this._client.post('/api/memory', { body, ...options });
  }
}

export interface MemorySearchMemoriesResponse {
  /**
   * Limit used for this search
   */
  limit: number;

  /**
   * Time taken to process the query in milliseconds
   */
  processingTimeMs: number;

  /**
   * Original search query
   */
  query: string;

  /**
   * Array of matching memory search results
   */
  results: Array<MemorySearchMemoriesResponse.Result>;

  /**
   * Total number of results returned
   */
  totalResults: number;
}

export namespace MemorySearchMemoriesResponse {
  export interface Result {
    /**
     * Unique identifier for the memory chunk
     */
    chunkId: string;

    /**
     * Index position of this chunk within the source
     */
    chunkIndex: number;

    /**
     * Text content of the memory
     */
    content: string;

    /**
     * Similarity score between 0 and 1 indicating relevance to the query
     */
    similarityScore: number;

    /**
     * Number of tokens in the content
     */
    tokens: number;

    /**
     * Type of search result
     */
    type: 'memory';

    memory?: Result.Memory;

    /**
     * Additional metadata about the memory
     */
    metadata?: { [key: string]: unknown };
  }

  export namespace Result {
    export interface Memory {
      /**
       * Unique memory identifier
       */
      id: string;

      /**
       * Category of memory classification
       */
      category:
        | 'conversation_history'
        | 'working_memory'
        | 'attention_context'
        | 'factual'
        | 'episodic'
        | 'semantic'
        | 'other';

      /**
       * Source conversation identifier
       */
      conversationId: string;

      /**
       * Unix timestamp when memory was created
       */
      createdAt: number;

      /**
       * Importance score of the memory
       */
      importance: number;

      /**
       * Type of memory storage
       */
      type: 'short_term' | 'long_term' | 'other';

      /**
       * User associated with this memory
       */
      userId: string;
    }
  }
}

export interface MemoryStoreConversationResponse {
  /**
   * Unique identifier for the processed conversation
   */
  conversationId: string;

  /**
   * Session identifier used or generated for this conversation
   */
  sessionId: string;

  /**
   * Current processing status of the conversation
   */
  status: 'processing';
}

export interface MemorySearchMemoriesParams {
  /**
   * Search query text for semantic similarity matching
   */
  query: string;

  /**
   * Maximum number of results to return
   */
  limit?: number;

  /**
   * Search mode - semantic uses vector similarity, filter uses exact matching,
   * hybrid combines both
   */
  mode?: 'semantic' | 'filter' | 'hybrid';

  /**
   * Optional user filter - only return memories for this user
   */
  userId?: string;
}

export interface MemoryStoreConversationParams {
  /**
   * Array of messages in the conversation
   */
  content: Array<MemoryStoreConversationParams.Content>;

  /**
   * External user identifier
   */
  userId: string;

  /**
   * Optional session identifier for grouping related conversations
   */
  sessionId?: string;
}

export namespace MemoryStoreConversationParams {
  export interface Content {
    /**
     * Content of the message
     */
    content: string;

    /**
     * Role of the message sender
     */
    role: 'user' | 'assistant' | 'system' | 'function' | 'tool';
  }
}

export declare namespace Memory {
  export {
    type MemorySearchMemoriesResponse as MemorySearchMemoriesResponse,
    type MemoryStoreConversationResponse as MemoryStoreConversationResponse,
    type MemorySearchMemoriesParams as MemorySearchMemoriesParams,
    type MemoryStoreConversationParams as MemoryStoreConversationParams,
  };
}
