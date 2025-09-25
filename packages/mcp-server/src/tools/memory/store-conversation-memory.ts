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
  httpPath: '/api/memory',
  operationId: 'storeConversation',
};

export const tool: Tool = {
  name: 'store_conversation_memory',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nProcesses a conversation and triggers memory extraction workflow. Automatically extracts user facts from conversation messages and makes them searchable through semantic search.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    conversationId: {\n      type: 'string',\n      description: 'Unique identifier for the processed conversation'\n    },\n    sessionId: {\n      type: 'string',\n      description: 'Session identifier used or generated for this conversation'\n    },\n    status: {\n      type: 'string',\n      description: 'Current processing status of the conversation',\n      enum: [        'processing'\n      ]\n    }\n  },\n  required: [    'conversationId',\n    'sessionId',\n    'status'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'array',
        description: 'Array of messages in the conversation',
        items: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'Content of the message',
            },
            role: {
              type: 'string',
              description: 'Role of the message sender',
              enum: ['user', 'assistant', 'system', 'function', 'tool'],
            },
          },
          required: ['content', 'role'],
        },
      },
      userId: {
        type: 'string',
        description: 'External user identifier',
      },
      sessionId: {
        type: 'string',
        description: 'Optional session identifier for grouping related conversations',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['content', 'userId'],
  },
  annotations: {},
};

export const handler = async (client: Retriever, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.memory.storeConversation(body)));
};

export default { metadata, tool, handler };
