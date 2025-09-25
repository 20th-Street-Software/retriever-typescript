// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'retriever-mcp/filtering';
import { Metadata, asTextContentResult } from 'retriever-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Retriever from 'retriever';

export const metadata: Metadata = {
  resource: 'memory',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/memory/query',
  operationId: 'queryMemories',
};

export const tool: Tool = {
  name: 'search_memories_memory',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPerforms semantic search across stored memories and returns relevant results. Uses vector similarity to find the most relevant user memories extracted from conversations.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    limit: {\n      type: 'integer',\n      description: 'Limit used for this search'\n    },\n    processingTimeMs: {\n      type: 'number',\n      description: 'Time taken to process the query in milliseconds'\n    },\n    query: {\n      type: 'string',\n      description: 'Original search query'\n    },\n    results: {\n      type: 'array',\n      description: 'Array of matching memory search results',\n      items: {\n        type: 'object',\n        properties: {\n          chunkId: {\n            type: 'string',\n            description: 'Unique identifier for the memory chunk'\n          },\n          chunkIndex: {\n            type: 'integer',\n            description: 'Index position of this chunk within the source'\n          },\n          content: {\n            type: 'string',\n            description: 'Text content of the memory'\n          },\n          similarityScore: {\n            type: 'number',\n            description: 'Similarity score between 0 and 1 indicating relevance to the query'\n          },\n          tokens: {\n            type: 'integer',\n            description: 'Number of tokens in the content'\n          },\n          type: {\n            type: 'string',\n            description: 'Type of search result',\n            enum: [              'memory'\n            ]\n          },\n          memory: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique memory identifier'\n              },\n              category: {\n                type: 'string',\n                description: 'Category of memory classification',\n                enum: [                  'conversation_history',\n                  'working_memory',\n                  'attention_context',\n                  'factual',\n                  'episodic',\n                  'semantic',\n                  'other'\n                ]\n              },\n              conversationId: {\n                type: 'string',\n                description: 'Source conversation identifier'\n              },\n              createdAt: {\n                type: 'integer',\n                description: 'Unix timestamp when memory was created'\n              },\n              importance: {\n                type: 'integer',\n                description: 'Importance score of the memory'\n              },\n              type: {\n                type: 'string',\n                description: 'Type of memory storage',\n                enum: [                  'short_term',\n                  'long_term',\n                  'other'\n                ]\n              },\n              userId: {\n                type: 'string',\n                description: 'User associated with this memory'\n              }\n            },\n            required: [              'id',\n              'category',\n              'conversationId',\n              'createdAt',\n              'importance',\n              'type',\n              'userId'\n            ]\n          },\n          metadata: {\n            type: 'object',\n            description: 'Additional metadata about the memory',\n            additionalProperties: true\n          }\n        },\n        required: [          'chunkId',\n          'chunkIndex',\n          'content',\n          'similarityScore',\n          'tokens',\n          'type'\n        ]\n      }\n    },\n    totalResults: {\n      type: 'integer',\n      description: 'Total number of results returned'\n    }\n  },\n  required: [    'limit',\n    'processingTimeMs',\n    'query',\n    'results',\n    'totalResults'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query text for semantic similarity matching',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of results to return',
      },
      mode: {
        type: 'string',
        description:
          'Search mode - semantic uses vector similarity, filter uses exact matching, hybrid combines both',
        enum: ['semantic', 'filter', 'hybrid'],
      },
      userId: {
        type: 'string',
        description: 'Optional user filter - only return memories for this user',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['query'],
  },
  annotations: {},
};

export const handler = async (client: Retriever, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.memory.searchMemories(body)));
};

export default { metadata, tool, handler };
